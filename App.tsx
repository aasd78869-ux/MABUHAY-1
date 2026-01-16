
import React, { useState, useEffect, useRef } from 'react';
import { ViewState, Language, Attraction, SiteData, HeroSlide } from './types';
import { DEFAULT_SITE_DATA, VISA_DATA } from './constants';
import { db, storage } from './firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  setDoc, 
  deleteDoc, 
  query,
  getDocs,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// --- Utilities ---

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// --- Components ---

const SectionBanner: React.FC<{ image: string; title: string; subtitle: string; lang: Language }> = ({ image, title, subtitle, lang }) => (
  <div className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden mb-16">
    <img src={image} className="absolute inset-0 w-full h-full object-cover scale-105" alt="" />
    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-950/40 to-white"></div>
    <div className="relative z-10 text-center container mx-auto px-4">
      <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-xl">{title}</h1>
      <p className="text-white/90 text-sm md:text-xl max-w-2xl mx-auto font-bold">{subtitle}</p>
    </div>
  </div>
);

const PHLogo = () => (
  <div className="flex items-center gap-2 cursor-pointer group">
    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 group-hover:scale-110 transition-transform">
      <div className="relative w-6 h-6 md:w-8 md:h-8">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#0038A8" strokeWidth="2" />
          <circle cx="50" cy="50" r="15" fill="#FCD116" />
        </svg>
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-lg md:text-xl font-black text-blue-900 leading-none uppercase tracking-tighter">MABUHAY</span>
      <span className="text-[8px] md:text-[10px] font-bold text-red-600 tracking-[0.2em] uppercase">Philippines</span>
    </div>
  </div>
);

const PlanningBar: React.FC<{ lang: Language; onAction: () => void; isVisible: boolean }> = ({ lang, onAction, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[140] bg-white/95 backdrop-blur-xl border-t border-blue-50 shadow-[0_-15px_40px_rgba(0,0,0,0.1)] p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className={`flex items-center gap-4 ${lang === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🗺️</div>
          <div className={`flex flex-col ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
            <h4 className="text-base md:text-lg font-black text-blue-900 leading-tight">
              {lang === 'AR' ? 'خطّط لرحلتك مع مستشار مابوهاي' : 'Plan your trip with Mabuhay Expert'}
            </h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Customized Itineraries & Booking</p>
          </div>
        </div>
        <button onClick={onAction} className="w-full md:w-auto bg-red-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-red-600/30 shadow-2xl hover:scale-105 active:scale-95 transition-all">
          {lang === 'AR' ? 'ابدأ التخطيط الآن' : 'Start Planning Now'}
        </button>
      </div>
    </div>
  );
};

// --- Admin Editor Modal ---

const AdminItemModal: React.FC<{ 
  item: any; 
  onSave: (data: any) => void; 
  onClose: () => void; 
  lang: Language;
  category: string;
}> = ({ item, onSave, onClose, lang, category }) => {
  const [formData, setFormData] = useState(item || {
    id: `item-${Date.now()}`,
    name: { AR: '', EN: '' },
    description: { AR: '', EN: '' },
    location: { AR: '', EN: '' },
    title: { AR: '', EN: '' }, 
    subtitle: { AR: '', EN: '' }, 
    images: [''],
    image: '', 
    category: category.toUpperCase(),
    hidden: false
  });
  const [uploading, setUploading] = useState(false);

  const isHeroSlide = category === 'heroSlides';

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Use convertToBase64 as requested for better integration
      const base64 = await convertToBase64(file);
      if (isHeroSlide) {
        setFormData({ ...formData, image: base64 });
      } else {
        setFormData({ ...formData, images: [base64] });
      }
    } catch (err) {
      console.error(err);
      alert("Error processing image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-blue-950/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-xl font-black text-blue-900">{item ? 'تعديل العنصر' : 'إضافة عنصر جديد'}</h3>
          <button onClick={onClose} className="text-gray-400 text-2xl">×</button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase">الاسم/العنوان (عربي)</label>
              <input 
                value={isHeroSlide ? formData.title.AR : formData.name.AR} 
                onChange={e => {
                  if (isHeroSlide) setFormData({...formData, title: {...formData.title, AR: e.target.value}});
                  else setFormData({...formData, name: {...formData.name, AR: e.target.value}});
                }} 
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-900" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase">Name/Title (EN)</label>
              <input 
                value={isHeroSlide ? formData.title.EN : formData.name.EN} 
                onChange={e => {
                  if (isHeroSlide) setFormData({...formData, title: {...formData.title, EN: e.target.value}});
                  else setFormData({...formData, name: {...formData.name, EN: e.target.value}});
                }} 
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-900" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase">الوصف/العنوان الفرعي (عربي)</label>
            <textarea 
              value={isHeroSlide ? formData.subtitle.AR : formData.description.AR} 
              onChange={e => {
                if (isHeroSlide) setFormData({...formData, subtitle: {...formData.subtitle, AR: e.target.value}});
                else setFormData({...formData, description: {...formData.description, AR: e.target.value}});
              }} 
              className="w-full p-4 bg-gray-50 rounded-2xl h-24 outline-none focus:ring-2 focus:ring-blue-900" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase">Description/Subtitle (EN)</label>
            <textarea 
              value={isHeroSlide ? formData.subtitle.EN : formData.description.EN} 
              onChange={e => {
                if (isHeroSlide) setFormData({...formData, subtitle: {...formData.subtitle, EN: e.target.value}});
                else setFormData({...formData, description: {...formData.description, EN: e.target.value}});
              }} 
              className="w-full p-4 bg-gray-50 rounded-2xl h-24 outline-none focus:ring-2 focus:ring-blue-900" 
            />
          </div>

          {!isHeroSlide && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase">الموقع (عربي)</label>
                <input value={formData.location.AR} onChange={e => setFormData({...formData, location: {...formData.location, AR: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-900" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase">Location (EN)</label>
                <input value={formData.location.EN} onChange={e => setFormData({...formData, location: {...formData.location, EN: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-900" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase">الصورة (Base64)</label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 bg-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200">
                {(isHeroSlide ? formData.image : formData.images[0]) && (
                  <img src={isHeroSlide ? formData.image : formData.images[0]} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="bg-blue-900 text-white px-6 py-3 rounded-xl cursor-pointer text-xs font-bold hover:bg-red-600 transition inline-block text-center">
                  {uploading ? 'جاري التحويل...' : 'رفع صورة (Base64)'}
                </label>
                <textarea 
                  value={isHeroSlide ? formData.image : formData.images[0]} 
                  onChange={e => {
                    if (isHeroSlide) setFormData({...formData, image: e.target.value});
                    else setFormData({...formData, images: [e.target.value]});
                  }} 
                  placeholder="رابط الصورة أو كود Base64" 
                  className="w-full p-3 bg-gray-50 rounded-xl text-[8px] h-12 outline-none overflow-hidden" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4">
          <button onClick={() => onSave(formData)} className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition">حفظ التغييرات</button>
          <button onClick={onClose} className="px-8 py-4 text-gray-400 font-bold">إلغاء</button>
        </div>
      </div>
    </div>
  );
};

// --- View Components ---

const VisaInfoView: React.FC<{ lang: Language; onBook: () => void }> = ({ lang, onBook }) => (
  <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
    <SectionBanner 
      image="https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=2000" 
      title={lang === 'AR' ? 'دليل التأشيرة للفلبين' : 'Philippines Visa Guide'} 
      subtitle={lang === 'AR' ? 'كل ما تحتاج معرفته عن دخول الفلبين' : 'Everything you need to know about entering the Philippines'} 
      lang={lang} 
    />
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {VISA_DATA.map((section, idx) => (
        <div key={idx} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-50">
          <h2 className={`text-2xl font-black text-blue-900 mb-8 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
            {(section.category as any)[lang] || section.category.EN}
          </h2>
          <div className="grid gap-6">
            {section.items.map((item, iIdx) => (
              <div key={iIdx} className={`p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors ${lang === 'AR' ? 'text-right border-r-4 border-blue-900' : 'text-left border-l-4 border-blue-900'}`}>
                <h3 className="font-black text-blue-900 mb-2">{(item.title as any)[lang] || item.title.EN}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{(item.details as any)[lang] || item.details.EN}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center pt-8">
        <button onClick={onBook} className="bg-red-600 text-white px-12 py-5 rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 transition">
          {lang === 'AR' ? 'تواصل معنا للمساعدة عبر الواتساب' : 'Contact us for help via WhatsApp'}
        </button>
      </div>
    </div>
  </div>
);

// --- App Main ---

export default function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [lang, setLang] = useState<Language>('AR');
  const [siteData, setSiteData] = useState<SiteData>(DEFAULT_SITE_DATA);
  const [userRole, setUserRole] = useState<'VISITOR' | 'ADMIN'>('VISITOR');
  const [editItem, setEditItem] = useState<any>(null);
  const [currentAdminTab, setCurrentAdminTab] = useState('islands');
  const [portfolioData, setPortfolioData] = useState<{ imageBase64?: string }>({});

  // Real-time Firestore sync
  useEffect(() => {
    const categories = ['islands', 'manilaDistricts', 'shopping', 'restaurants', 'activities', 'heroSlides'];
    const unsubscribes = categories.map(cat => {
      const q = collection(db, cat);
      return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        if (items.length > 0) {
          setSiteData(prev => ({ ...prev, [cat]: items }));
        }
      });
    });

    // Portfolio/main sync
    const portfolioUnsub = onSnapshot(doc(db, 'portfolio', 'main'), (doc) => {
      if (doc.exists()) {
        setPortfolioData(doc.data());
      }
    });

    return () => {
      unsubscribes.forEach(unsub => unsub());
      portfolioUnsub();
    };
  }, []);

  const navigateTo = (newView: ViewState) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const saveToFirebase = async (data: any) => {
    try {
      await setDoc(doc(db, currentAdminTab, data.id), data);
      setEditItem(null);
    } catch (err) {
      console.error(err);
      alert("Error saving data to Firestore");
    }
  };

  const deleteFromFirebase = async (id: string) => {
    if (!confirm("هل أنت متأكد من الحذف نهائياً؟")) return;
    try {
      await deleteDoc(doc(db, currentAdminTab, id));
    } catch (err) {
      console.error(err);
      alert("Error deleting item");
    }
  };

  const toggleVisibility = async (item: any) => {
    try {
      await updateDoc(doc(db, currentAdminTab, item.id), { hidden: !item.hidden });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePortfolioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await convertToBase64(file);
      await setDoc(doc(db, 'portfolio', 'main'), { 
        imageBase64: base64,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      alert("تم رفع الصورة وتخزينها كـ Base64 بنجاح!");
    } catch (err) {
      console.error(err);
      alert("فشل رفع الصورة");
    }
  };

  const getActive = (list: any[] = []) => list.filter(i => !i.hidden);

  return (
    <div className={`min-h-screen ${lang === 'AR' ? "font-['Cairo']" : "font-sans"}`}>
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-2xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div onClick={() => navigateTo('HOME')}><PHLogo /></div>
          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => setLang(lang === 'AR' ? 'EN' : 'AR')} className="bg-blue-900 text-white px-4 py-2 rounded-xl text-[10px] font-black">{lang === 'AR' ? 'EN' : 'AR'}</button>
            <button onClick={() => navigateTo('HOME')} className="text-xs font-black text-gray-400">الرئيسية</button>
            <button onClick={() => navigateTo('ISLANDS')} className="text-xs font-black text-gray-400">الجزر</button>
            <button onClick={() => navigateTo('VISA_INFO')} className="text-xs font-black text-gray-400">الفيزا</button>
            <button onClick={() => navigateTo('BOOKING')} className="bg-red-600 text-white px-6 py-3 rounded-2xl font-black text-xs shadow-xl">احجز الآن</button>
            <button onClick={() => navigateTo('ADMIN_LOGIN')} className="text-[9px] font-black text-gray-300">ADMIN</button>
          </div>
        </div>
      </nav>

      <main className="min-h-[70vh] pb-32">
        {view === 'HOME' && (
          <div className="animate-in fade-in duration-1000">
            <section className="h-[80vh] relative flex items-center justify-center overflow-hidden bg-blue-900">
              <img src={siteData.heroSlides[0]?.image} className="absolute inset-0 w-full h-full object-cover opacity-50" />
              <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-5xl md:text-8xl font-black mb-6">{siteData.heroSlides[0]?.title[lang]}</h1>
                <p className="text-xl md:text-2xl font-bold mb-10 opacity-90">{siteData.heroSlides[0]?.subtitle[lang]}</p>
                <button onClick={() => navigateTo('BOOKING')} className="bg-red-600 px-12 py-5 rounded-3xl font-black text-xl shadow-2xl hover:scale-105 transition">ابدأ المغامرة</button>
              </div>
            </section>
            
            <div className="container mx-auto px-4 py-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <button onClick={() => navigateTo('ISLANDS')} className="bg-white p-8 rounded-[2.5rem] shadow-xl text-center hover:shadow-2xl transition border border-gray-50 flex flex-col items-center gap-3">
                <span className="text-4xl">🏝️</span>
                <span className="text-[10px] font-black text-blue-900 uppercase">استكشف الجزر</span>
              </button>
              <button onClick={() => navigateTo('MANILA')} className="bg-white p-8 rounded-[2.5rem] shadow-xl text-center hover:shadow-2xl transition border border-gray-50 flex flex-col items-center gap-3">
                <span className="text-4xl">🏙️</span>
                <span className="text-[10px] font-black text-blue-900 uppercase">أحياء مانيلا</span>
              </button>
              <button onClick={() => navigateTo('RESTAURANTS')} className="bg-white p-8 rounded-[2.5rem] shadow-xl text-center hover:shadow-2xl transition border border-gray-50 flex flex-col items-center gap-3">
                <span className="text-4xl">🍲</span>
                <span className="text-[10px] font-black text-blue-900 uppercase">مطاعم عربية</span>
              </button>
              <button onClick={() => navigateTo('ACTIVITIES')} className="bg-white p-8 rounded-[2.5rem] shadow-xl text-center hover:shadow-2xl transition border border-gray-50 flex flex-col items-center gap-3">
                <span className="text-4xl">🎉</span>
                <span className="text-[10px] font-black text-blue-900 uppercase">الفعاليات</span>
              </button>
              <button onClick={() => navigateTo('SHOPPING')} className="bg-white p-8 rounded-[2.5rem] shadow-xl text-center hover:shadow-2xl transition border border-gray-50 flex flex-col items-center gap-3">
                <span className="text-4xl">🛍️</span>
                <span className="text-[10px] font-black text-blue-900 uppercase">التسوق</span>
              </button>
              <button onClick={() => navigateTo('VISA_INFO')} className="bg-red-50 p-8 rounded-[2.5rem] shadow-xl text-center hover:shadow-2xl transition border border-red-100 flex flex-col items-center gap-3">
                <span className="text-4xl">🛂</span>
                <span className="text-[10px] font-black text-red-600 uppercase">دليل الفيزا</span>
              </button>
            </div>

            {portfolioData.imageBase64 && (
              <div className="container mx-auto px-4 py-20 text-center">
                <h3 className="text-2xl font-black text-blue-900 mb-8">صورة الملف التعريفي (Base64)</h3>
                <div className="max-w-4xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img src={portfolioData.imageBase64} className="w-full h-auto object-cover" alt="Portfolio Main" />
                </div>
              </div>
            )}
          </div>
        )}

        {(['ISLANDS', 'MANILA', 'SHOPPING', 'RESTAURANTS', 'ACTIVITIES'] as ViewState[]).includes(view) && view !== 'HOME' && (
          <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
            <SectionBanner 
              image={view === 'ISLANDS' ? "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2000" : "https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=2000"} 
              title={view === 'ISLANDS' ? "أجمل جزر الفلبين" : siteData.translations[`nav${view.charAt(0) + view.slice(1).toLowerCase()}`]?.[lang] || view} 
              subtitle="استمتع بسحر الفلبين" 
              lang={lang} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {getActive((siteData as any)[view === 'ISLANDS' ? 'islands' : view === 'MANILA' ? 'manilaDistricts' : view.toLowerCase()]).map((item: Attraction) => (
                <div key={item.id} className="bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition group flex flex-col h-full">
                  <div className="h-64 relative overflow-hidden">
                    <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="" />
                  </div>
                  <div className={`p-8 flex flex-col flex-grow ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-xl font-black text-blue-900 mb-4">{item.name[lang]}</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">{item.description[lang]}</p>
                    <button onClick={() => navigateTo('BOOKING')} className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-red-600 transition">إضافة إلى البرنامج</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'VISA_INFO' && <VisaInfoView lang={lang} onBook={() => navigateTo('BOOKING')} />}

        {view === 'BOOKING' && (
          <div className="container mx-auto px-4 py-32 text-center animate-in zoom-in duration-500">
            <span className="text-8xl mb-8 block">✅</span>
            <h2 className="text-4xl font-black text-blue-900 mb-4">تم إرسال طلبك!</h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-10">سيتواصل معك أحد مستشاري مابوهاي عبر الواتساب خلال دقائق لتنسيق برنامجك السياحي المثالي.</p>
            <button onClick={() => navigateTo('HOME')} className="bg-blue-900 text-white px-10 py-4 rounded-2xl font-black shadow-xl">العودة للرئيسية</button>
          </div>
        )}

        {view === 'ADMIN_LOGIN' && (
          <div className="max-w-md mx-auto py-32 px-4 animate-in slide-in-from-bottom duration-500">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl">
              <h2 className="text-2xl font-black text-blue-900 mb-8 text-center">دخول الإدارة</h2>
              <form onSubmit={e => { e.preventDefault(); setUserRole('ADMIN'); navigateTo('ADMIN_DASHBOARD'); }} className="space-y-4">
                <input placeholder="البريد الإلكتروني" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-blue-900" required />
                <input type="password" placeholder="كلمة المرور" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-blue-900" required />
                <button type="submit" className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black shadow-xl">دخول</button>
              </form>
            </div>
          </div>
        )}

        {view === 'ADMIN_DASHBOARD' && userRole === 'ADMIN' && (
          <div className="container mx-auto px-4 py-12 text-right animate-in fade-in duration-700">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-blue-900">لوحة التحكم بالمحتوى</h2>
              <button onClick={() => { setUserRole('VISITOR'); navigateTo('HOME'); }} className="bg-red-600 text-white px-6 py-2 rounded-xl text-xs font-black shadow-lg">خروج</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mb-10">
              {['islands', 'manilaDistricts', 'shopping', 'restaurants', 'activities', 'heroSlides', 'settings'].map(tab => (
                <button key={tab} onClick={() => setCurrentAdminTab(tab)} className={`p-4 rounded-xl text-[10px] font-black transition ${currentAdminTab === tab ? 'bg-blue-900 text-white shadow-lg' : 'bg-white text-gray-400'}`}>
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="bg-white p-8 rounded-[3rem] shadow-xl min-h-[500px] border border-gray-50">
              {currentAdminTab === 'settings' ? (
                <div className="max-w-2xl mx-auto py-10">
                  <h3 className="text-2xl font-black text-blue-900 mb-6">إعدادات الملف الشخصي (Base64)</h3>
                  <div className="bg-gray-50 p-8 rounded-[2rem] border-2 border-dashed border-gray-200 text-center">
                    <input type="file" onChange={handlePortfolioUpload} className="hidden" id="portfolio-upload" />
                    <label htmlFor="portfolio-upload" className="bg-blue-900 text-white px-10 py-4 rounded-2xl cursor-pointer font-black shadow-xl hover:scale-105 transition inline-block mb-6">
                      اختر صورة لتحويلها وتخزينها كـ Base64
                    </label>
                    <p className="text-xs text-gray-400">يتم تخزين الصورة في Firestore بمستند portfolio/main</p>
                    {portfolioData.imageBase64 && (
                      <div className="mt-10">
                        <p className="text-xs font-black text-blue-900 mb-4 uppercase">معاينة الصورة الحالية</p>
                        <img src={portfolioData.imageBase64} className="w-48 h-48 mx-auto object-cover rounded-2xl shadow-lg border-4 border-white" />
                        <button 
                          onClick={async () => {
                            if(confirm("حذف الصورة؟")) {
                              await updateDoc(doc(db, 'portfolio', 'main'), { imageBase64: "" });
                            }
                          }}
                          className="mt-4 text-red-500 text-[10px] font-black underline"
                        >
                          حذف الصورة
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-black text-blue-900">إدارة {currentAdminTab}</h3>
                    <button onClick={() => setEditItem({})} className="bg-green-600 text-white px-6 py-3 rounded-2xl font-black text-xs shadow-lg hover:scale-105 transition">+ إضافة جديد</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {((siteData as any)[currentAdminTab] || []).map((item: any) => (
                      <div key={item.id} className={`p-6 rounded-3xl border-2 flex flex-col gap-4 transition ${item.hidden ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-blue-50 shadow-sm'}`}>
                        <div className="flex justify-between items-start">
                          <img src={currentAdminTab === 'heroSlides' ? item.image : item.images?.[0]} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                          <div className="flex gap-2">
                            <button onClick={() => setEditItem(item)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition">✏️</button>
                            <button onClick={() => deleteFromFirebase(item.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition">🗑️</button>
                            <button onClick={() => toggleVisibility(item)} className={`p-3 rounded-xl transition ${item.hidden ? 'bg-gray-200' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>{item.hidden ? '👁️‍🗨️' : '👁️'}</button>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-black text-blue-900">{currentAdminTab === 'heroSlides' ? item.title[lang] : item.name[lang]}</h4>
                          <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">{item.id}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <PlanningBar lang={lang} onAction={() => navigateTo('BOOKING')} isVisible={view !== 'ADMIN_DASHBOARD' && view !== 'ADMIN_LOGIN' && view !== 'BOOKING'} />

      {editItem && (
        <AdminItemModal 
          item={Object.keys(editItem).length > 0 ? editItem : null} 
          category={currentAdminTab} 
          lang={lang} 
          onSave={saveToFirebase} 
          onClose={() => setEditItem(null)} 
        />
      )}
    </div>
  );
}
