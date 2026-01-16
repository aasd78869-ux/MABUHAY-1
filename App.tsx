
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ViewState, Language, Attraction, SiteData, HeroSlide } from './types';
import { 
  DEFAULT_SITE_DATA, ICONS, VISA_DATA 
} from './constants';

// --- Safe Environment Accessor ---
const getEnv = (key: string): string => {
  try {
    // Check for Vite environment
    const viteEnv = (import.meta as any).env;
    if (viteEnv && viteEnv[`VITE_${key}`]) return viteEnv[`VITE_${key}`];
    
    // Check for standard process.env
    if (typeof process !== 'undefined' && process.env && process.env[key]) return process.env[key];
  } catch (e) {
    console.warn("Env access failed", e);
  }
  return "";
};

// --- View Components ---

const SectionBanner: React.FC<{ image: string; title: string; subtitle: string; lang: Language }> = ({ image, title, subtitle, lang }) => (
  <div className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden mb-16">
    <img src={image} className="absolute inset-0 w-full h-full object-cover scale-105" alt="" />
    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-950/40 to-white"></div>
    <div className="relative z-10 text-center container mx-auto px-4">
      <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-xl animate-in slide-in-from-top duration-700">{title}</h1>
      <p className="text-white/90 text-sm md:text-xl max-w-2xl mx-auto font-bold animate-in slide-in-from-bottom duration-700 delay-200">{subtitle}</p>
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

const NavBtn: React.FC<{ children: React.ReactNode; active?: boolean; highlight?: boolean; onClick: () => void }> = ({ children, active, highlight, onClick }) => (
  <button onClick={onClick} className={`text-xs font-black transition-all ${highlight ? 'bg-red-600 text-white px-6 py-3 rounded-2xl shadow-xl' : active ? 'text-blue-900 border-b-2 border-red-600' : 'text-gray-400'}`}>
    {children}
  </button>
);

const HomeQuickLink: React.FC<{ icon: string; label: string; onClick: () => void; highlight?: boolean }> = ({ icon, label, onClick, highlight }) => (
  <div onClick={onClick} className={`p-8 rounded-[3rem] shadow-xl text-center cursor-pointer hover:shadow-2xl transition-all border border-gray-50 flex flex-col items-center gap-4 ${highlight ? 'bg-red-50/30' : 'bg-white'}`}>
    <span className="text-4xl">{icon}</span>
    <span className={`text-[11px] font-black uppercase ${highlight ? 'text-red-600' : 'text-blue-900'}`}>{label}</span>
  </div>
);

const AboutPHView: React.FC<{ lang: Language; onAction: () => void }> = ({ lang, onAction }) => (
  <div className="animate-in fade-in duration-700">
    <SectionBanner image="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2000" title={lang === 'AR' ? 'اكتشف الفلبين' : 'Discover Philippines'} subtitle={lang === 'AR' ? 'دليلك الشامل لجمال وسحر الأرخبيل الفلبيني' : 'Guide to the archipelago'} lang={lang} />
    <div className="container mx-auto px-4 py-20 text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-black text-blue-900 leading-tight">
          {lang === 'AR' ? 'أهلاً بك في مهد الجمال الاستوائي' : 'Welcome to Tropical Paradise'}
        </h2>
        <p className="text-gray-500 text-lg max-w-3xl mx-auto font-bold">
           {lang === 'AR' ? 'الفلبين هي وجهة الأحلام حيث تجتمع الشواطئ البيضاء الصافية مع الضيافة الأسطورية.' : 'Philippines is the dream destination where white beaches meet legendary hospitality.'}
        </p>
        <button onClick={onAction} className="bg-red-600 text-white px-12 py-5 rounded-3xl font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
          {lang === 'AR' ? 'ابدأ التخطيط الآن' : 'Start Planning Now'}
        </button>
    </div>
  </div>
);

const VisaInfoView: React.FC<{ lang: Language; onBook: () => void }> = ({ lang, onBook }) => (
  <div className="animate-in fade-in duration-700">
    <SectionBanner image="https://images.unsplash.com/photo-1557128928-66e3009291b5?q=80&w=2000" title={lang === 'AR' ? 'دليل الفيزا للفلبين' : 'Visa Guide'} subtitle={lang === 'AR' ? 'إجراءات الدخول والمتطلبات' : 'Entry procedures'} lang={lang} />
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {VISA_DATA.map((section, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50">
            <h3 className="text-xl font-black text-blue-900 mb-6">{section.category[lang]}</h3>
            <div className="space-y-4">
              {section.items.map((item, i) => (
                <div key={i} className="border-b border-gray-50 pb-4">
                  <h4 className="font-bold text-red-600 mb-1">{item.title[lang]}</h4>
                  <p className="text-xs text-gray-500 font-medium">{item.details[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Card: React.FC<{ item: Attraction; onBook: () => void; lang: Language }> = ({ item, onBook, lang }) => (
  <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col h-full">
    <div className="relative h-72 overflow-hidden">
      <img src={item.images[0] || 'https://placehold.co/600x400?text=No+Image'} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="absolute bottom-6 inset-x-6 flex justify-between items-end">
        <div className={`text-white ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
          <span className="text-[9px] font-black uppercase tracking-widest bg-red-600 px-3 py-1 rounded-full mb-2 inline-block shadow-lg">
            {item.location[lang] || ''}
          </span>
          <h3 className="text-xl font-black leading-tight">{item.name[lang] || ''}</h3>
        </div>
      </div>
    </div>
    <div className={`p-8 space-y-4 flex-grow flex flex-col ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium flex-grow">{item.description[lang] || ''}</p>
      <button onClick={onBook} className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-red-600 transition shadow-xl active:scale-95">
        {lang === 'AR' ? 'إضافة إلى البرنامج' : 'Add to Program'}
      </button>
    </div>
  </div>
);

const ListView: React.FC<{ title: string; subtitle: string; items: Attraction[]; banner: string; onBook: () => void; lang: Language }> = ({ title, subtitle, items, banner, onBook, lang }) => (
  <div className="animate-in fade-in duration-700">
    <SectionBanner image={banner} title={title} subtitle={subtitle} lang={lang} />
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map(item => <Card key={item.id} item={item} onBook={onBook} lang={lang} />)}
      </div>
    </div>
  </div>
);

const HeroSlider: React.FC<{ slides: HeroSlide[]; navigateTo: (v: ViewState) => void; lang: Language }> = ({ slides, navigateTo, lang }) => {
  const [current, setCurrent] = useState(0);
  const activeSlides = (slides || []).filter(s => !s.hidden);
  
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % activeSlides.length), 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  if (activeSlides.length === 0) return null;

  return (
    <section className="relative h-[85vh] bg-blue-950 flex items-center justify-center overflow-hidden">
      {activeSlides.map((slide, index) => (
        <div key={slide.id} className={`absolute inset-0 transition-all duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}>
          <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-60" style={{ transform: index === current ? 'scale(1)' : 'scale(1.1)' }} alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent"></div>
          <div className="relative z-20 text-center container mx-auto px-4 h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl">{slide.title[lang]}</h1>
            <p className="text-white/80 text-lg lg:text-2xl mb-10 max-w-3xl mx-auto">{slide.subtitle[lang]}</p>
            <button onClick={() => navigateTo('BOOKING')} className="bg-red-600 text-white px-12 py-5 rounded-[2.5rem] text-xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all">
              {lang === 'AR' ? 'احجز الآن' : 'Book Now'}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

const AdminLoginView: React.FC<{ onLogin: (e: string, p: string) => void; lang: Language; goBack: () => void }> = ({ onLogin, lang, goBack }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-2xl border border-blue-50">
        <h2 className="text-2xl font-black text-blue-900 mb-8 text-center">{lang === 'AR' ? 'تسجيل دخول الإدارة' : 'Admin Login'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(email, pass); }} className="space-y-6">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-blue-900" required />
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-blue-900" required />
          <button type="submit" className="w-full bg-blue-900 text-white py-5 rounded-3xl font-black text-lg shadow-xl hover:bg-red-600 transition-all">دخول</button>
          <button type="button" onClick={goBack} className="w-full text-gray-400 font-bold text-sm mt-4">إلغاء</button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboardView: React.FC<{ 
  siteData: SiteData; 
  onUpdate: (newData: SiteData) => void; 
  onLogout: () => void;
  lang: Language;
}> = ({ siteData, onUpdate, onLogout, lang }) => {
  const [activeTab, setActiveTab] = useState<'ISLANDS' | 'MANILA' | 'SHOPPING' | 'RESTAURANTS' | 'ACTIVITIES'>('ISLANDS');
  
  const updateItem = (key: keyof SiteData, id: string) => {
    const list = siteData[key] as any[];
    const newList = list.map(item => item.id === id ? { ...item, hidden: !item.hidden } : item);
    onUpdate({ ...siteData, [key]: newList });
  };

  return (
    <div className={`py-12 container mx-auto px-4 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h2 className="text-3xl font-black text-blue-900">{lang === 'AR' ? 'مركز التحكم بالمحتوى' : 'Content Dashboard'}</h2>
        <button onClick={onLogout} className="bg-blue-900 text-white px-8 py-3 rounded-2xl font-black shadow-xl hover:bg-red-600 transition-all">🚪 خروج</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-10">
        {(['ISLANDS', 'MANILA', 'SHOPPING', 'RESTAURANTS', 'ACTIVITIES'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`p-4 rounded-xl font-black text-xs transition-all ${activeTab === tab ? 'bg-blue-900 text-white' : 'bg-white text-gray-400'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] shadow-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(siteData[activeTab.toLowerCase() as keyof SiteData] as any[] || []).map((item: any) => (
            <div key={item.id} className={`p-6 rounded-2xl border-2 transition-all flex justify-between items-center ${item.hidden ? 'bg-gray-50 border-dashed border-gray-200' : 'bg-white border-blue-50'}`}>
               <div>
                 <h4 className="font-black text-blue-900">{item.name[lang]}</h4>
                 <p className="text-[10px] text-gray-400 uppercase font-black">{item.hidden ? 'Hidden' : 'Visible'}</p>
               </div>
               <button onClick={() => updateItem(activeTab.toLowerCase() as keyof SiteData, item.id)} className={`p-3 rounded-xl shadow-sm ${item.hidden ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                 {item.hidden ? '👁️ Show' : '👁️‍🗨️ Hide'}
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [userRole, setUserRole] = useState<'ADMIN' | 'VISITOR'>('VISITOR');
  const [view, setView] = useState<ViewState>('HOME');
  const [history, setHistoryStack] = useState<ViewState[]>(['HOME']);
  const [lang, setLang] = useState<Language>('AR');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteData, setSiteData] = useState<SiteData>(DEFAULT_SITE_DATA);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mabuhay_v10_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.heroSlides) setSiteData(parsed);
      }
    } catch (e) {
      console.warn("Storage access failed, using defaults", e);
    }
  }, []);

  const navigateTo = (newView: ViewState) => {
    setHistoryStack(prev => [...prev, newView]);
    setView(newView); 
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newStack = [...history];
      newStack.pop();
      setView(newStack[newStack.length - 1]);
      setHistoryStack(newStack);
    } else {
      setView('HOME');
    }
    window.scrollTo(0, 0);
  };

  const getActive = (list: Attraction[] = []) => list.filter(i => !i.hidden);

  return (
    <div className={`min-h-screen ${lang === 'AR' ? "font-['Cairo']" : "font-sans"}`}>
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-2xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {view !== 'HOME' && <button onClick={goBack} className="bg-gray-100 p-2 rounded-xl text-blue-900 font-bold">←</button>}
            <div onClick={() => navigateTo('HOME')}><PHLogo /></div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => setLang(lang === 'AR' ? 'EN' : 'AR')} className="bg-blue-900 text-white px-4 py-2 rounded-xl text-[10px] font-black">{lang === 'AR' ? 'EN' : 'AR'}</button>
            <NavBtn active={view === 'HOME'} onClick={() => navigateTo('HOME')}>{siteData.translations?.navHome?.[lang]}</NavBtn>
            <NavBtn active={view === 'ABOUT_PH'} onClick={() => navigateTo('ABOUT_PH')}>{siteData.translations?.navAboutPH?.[lang]}</NavBtn>
            <NavBtn active={view === 'ISLANDS'} onClick={() => navigateTo('ISLANDS')}>{siteData.translations?.navIslands?.[lang]}</NavBtn>
            <NavBtn active={view === 'VISA_INFO'} onClick={() => navigateTo('VISA_INFO')}>{siteData.translations?.navVisa?.[lang]}</NavBtn>
            <NavBtn active={view === 'BOOKING'} onClick={() => navigateTo('BOOKING')} highlight>{siteData.translations?.navBook?.[lang]}</NavBtn>
            <button onClick={() => navigateTo('ADMIN_LOGIN')} className="text-[9px] font-black text-gray-300 uppercase">Admin</button>
          </div>
          <div className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>🍔</div>
        </div>
      </nav>

      <main className="min-h-[70vh]">
        {view === 'HOME' && (
          <div className="animate-in fade-in duration-1000">
            <HeroSlider slides={siteData.heroSlides} navigateTo={navigateTo} lang={lang} />
            <section className="py-24 container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <HomeQuickLink icon="ℹ️" label={siteData.translations?.navAboutPH?.[lang]} onClick={() => navigateTo('ABOUT_PH')} highlight />
                <HomeQuickLink icon="🏝️" label={siteData.translations?.navIslands?.[lang]} onClick={() => navigateTo('ISLANDS')} />
                <HomeQuickLink icon="🏙️" label={siteData.translations?.navManila?.[lang]} onClick={() => navigateTo('MANILA')} />
                <HomeQuickLink icon="🎉" label={siteData.translations?.navActivities?.[lang]} onClick={() => navigateTo('ACTIVITIES')} highlight />
                <HomeQuickLink icon="🛂" label={siteData.translations?.navVisa?.[lang]} onClick={() => navigateTo('VISA_INFO')} highlight />
                <HomeQuickLink icon="🛍️" label={siteData.translations?.navShopping?.[lang]} onClick={() => navigateTo('SHOPPING')} />
                <HomeQuickLink icon="🍲" label={siteData.translations?.navDining?.[lang]} onClick={() => navigateTo('RESTAURANTS')} />
              </div>
            </section>
          </div>
        )}

        {view === 'ABOUT_PH' && <AboutPHView lang={lang} onAction={() => navigateTo('BOOKING')} />}
        {view === 'ISLANDS' && <ListView title="الجزر الخلابة" subtitle="استكشف الأرخبيل" items={getActive(siteData.islands)} banner="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2000" onBook={() => navigateTo('BOOKING')} lang={lang} />}
        {view === 'MANILA' && <ListView title="أحياء مانيلا" subtitle="حيث تلتقي العصور" items={getActive(siteData.manilaDistricts)} banner="https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=2000" onBook={() => navigateTo('BOOKING')} lang={lang} />}
        {view === 'ACTIVITIES' && <ListView title="الفعاليات والأنشطة" subtitle="مغامرات لا تنتهي" items={getActive(siteData.activities)} banner="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2000" onBook={() => navigateTo('BOOKING')} lang={lang} />}
        {view === 'VISA_INFO' && <VisaInfoView lang={lang} onBook={() => navigateTo('BOOKING')} />}
        {view === 'SHOPPING' && <ListView title="التسوق والمولات" subtitle="أكبر مولات آسيا" items={getActive(siteData.shopping)} banner="https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=2000" onBook={() => navigateTo('BOOKING')} lang={lang} />}
        {view === 'RESTAURANTS' && <ListView title="المطاعم العربية" subtitle="نكهات من الوطن" items={getActive(siteData.restaurants)} banner="https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=2000" onBook={() => navigateTo('BOOKING')} lang={lang} />}
        
        {view === 'BOOKING' && (
          <div className="py-32 container mx-auto px-4 text-center animate-in zoom-in duration-500">
            <span className="text-8xl mb-8 block">✅</span>
            <h3 className="text-4xl font-black text-blue-900 mb-4">{lang === 'AR' ? 'تم استلام طلبك!' : 'Request Sent!'}</h3>
            <p className="text-gray-400 font-bold max-w-xl mx-auto">
               {lang === 'AR' ? 'فريق مابوهاي سيتواصل معك عبر الواتساب خلال دقائق لتصميم برنامجك السياحي المثالي.' : 'Team Mabuhay will WhatsApp you shortly to design your perfect trip.'}
            </p>
          </div>
        )}

        {view === 'ADMIN_LOGIN' && <AdminLoginView onLogin={(e, p) => { if (e === 'aasd78869@gmail.com' && p === 'Zz100100') { setUserRole('ADMIN'); setView('ADMIN_DASHBOARD'); } }} lang={lang} goBack={() => setView('HOME')} />}
        
        {view === 'ADMIN_DASHBOARD' && userRole === 'ADMIN' && (
          <AdminDashboardView siteData={siteData} onUpdate={(d) => { setSiteData(d); localStorage.setItem('mabuhay_v10_data', JSON.stringify(d)); }} onLogout={() => { setUserRole('VISITOR'); setView('HOME'); }} lang={lang} />
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-20 text-center">
        <div className="container mx-auto px-4">
          <PHLogo />
          <p className="mt-8 text-gray-400 text-xs font-bold uppercase tracking-widest">© MABUHAY TRAVEL 2026. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
