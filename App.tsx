
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ViewState, Language, Attraction, SiteData, HeroSlide } from './types';
import { 
  DEFAULT_SITE_DATA, ICONS, VISA_DATA 
} from './constants';

// --- New Component: AboutPHView ---

const AboutPHView: React.FC<{ lang: Language; onAction: () => void }> = ({ lang, onAction }) => {
  const sections = [
    {
      id: 'geography',
      title: { AR: 'نبذة عامة عن الفلبين', EN: 'General Overview' },
      content: { 
        AR: 'تقع الفلبين في جنوب شرق آسيا وتتكون من أكثر من 7,641 جزيرة ساحرة. يتميز مناخها بالاستوائية الدافئة طوال العام, مما يجعلها وجهة سياحية عالمية رائدة بفضل تنوعها البيئي والجغرافي الفريد.',
        EN: 'Located in Southeast Asia, the Philippines consists of over 7,641 enchanting islands. Its tropical climate year-round makes it a leading global tourist destination with unique biodiversity.'
      },
      images: [
        'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800',
        'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=800',
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800'
      ]
    },
    {
      id: 'people',
      title: { AR: 'عن الشعب الفلبيني', EN: 'The Filipino People' },
      content: { 
        AR: 'يُعرف الشعب الفلبيني بودّه وحسن ضيافته الأسطورية. "مابوهاي" هي الكلمة التي ستسمعها دائماً، وهي تعكس روح الترحيب والحياة التي يعيشها السكان المحليون، مما يجعل المسافر يشعر وكأنه في وطنه.',
        EN: 'Filipinos are known for their legendary friendliness and hospitality. "Mabuhay" is the word you will always hear, reflecting the welcoming spirit and zest for life that makes travelers feel at home.'
      },
      images: [
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800',
        'https://images.unsplash.com/photo-1528150230182-163f97194600?q=80&w=800',
        'https://images.unsplash.com/photo-1533481405265-e9ce0c044abb?q=80&w=800'
      ]
    },
    {
      id: 'nature',
      title: { AR: 'جمال الطبيعة الخلاب', EN: 'Natural Beauty' },
      content: { 
        AR: 'تمتلك الفلبين بعضاً من أنقى الشواطئ البيضاء في العالم، وغابات استوائية بكر، وشلالات منحدرة وجبال خضراء شاهقة. من تلال الشوكولاتة في بوهول إلى مياه الكريستال في بالوان، الطبيعة هنا لا تتوقف عن إبهارك.',
        EN: 'The Philippines boasts some of the world\'s purest white beaches, virgin tropical forests, cascading waterfalls, and lush mountains. From Bohol\'s Chocolate Hills to Palawan\'s crystal waters, nature here never stops amazing you.'
      },
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
        'https://images.unsplash.com/photo-1511497584788-8767fe7718f2?q=80&w=800',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800'
      ]
    },
    {
      id: 'manila',
      title: { AR: 'مانيلا: التطور والحياة', EN: 'Manila: Modern Life' },
      content: { 
        AR: 'تجمع العاصمة مانيلا بين التاريخ العريق في "إنتراموروس" والتطور العمراني المذهل في "BGC". ناطحات السحاب، المولات الضخمة، والحياة الليلية النابضة تجعل منها مركزاً حيوياً لا يهدأ في قلب آسيا.',
        EN: 'Metro Manila blends history in Intramuros with stunning modern development in BGC. Skyscrapers, mega malls, and vibrant nightlife make it a non-stop hub in the heart of Asia.'
      },
      images: [
        'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=800',
        'https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=800',
        'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=800'
      ]
    },
    {
      id: 'islands',
      title: { AR: 'جزر مصنفة عالمياً', EN: 'World-Class Islands' },
      content: { 
        AR: 'بوراكاي، إل نيدو، وسيبو ليست مجرد أسماء، بل هي وجهات حصدت ألقاب "الأفضل في العالم" لسنوات متتالية. سواء كنت تبحث عن الرومانسية، الغوص، أو مغامرات ركوب الأمواج، ستجد جزيرتك المثالية هنا.',
        EN: 'Boracay, El Nido, and Cebu are destinations that have consistently won "Best in the World" titles. Whether you seek romance, diving, or surfing adventures, you will find your perfect island here.'
      },
      images: [
        'https://images.unsplash.com/photo-1540202404-a2f29016bb5d?q=80&w=800',
        'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=800',
        'https://images.unsplash.com/photo-1536733022204-78593a23a3cb?q=80&w=800'
      ]
    }
  ];

  const airports = [
    {
      id: 'naia',
      name: { AR: 'مطار نينوي أكينو الدولي (مانيلا)', EN: 'Ninoy Aquino Int\'l Airport (MNL)' },
      desc: { AR: 'البوابة الرئيسية للفلبين، يضم 4 مبانٍ ركاب تخدم مئات الرحلات الدولية والمحلية يومياً.', EN: 'The main gateway to the Philippines, with 4 terminals serving hundreds of daily flights.' },
      img: 'https://images.unsplash.com/photo-1542296332-2e4473fac563?q=80&w=800',
      services: { AR: 'تاكسي مطار، حافلات ترددية، صرف عملات، صالات VIP.', EN: 'Airport taxis, shuttle buses, currency exchange, VIP lounges.' }
    },
    {
      id: 'mactan',
      name: { AR: 'مطار ماكتان سيبو الدولي', EN: 'Mactan-Cebu Int\'l Airport (CEB)' },
      desc: { AR: 'ثاني أكبر مطار في البلاد، مصنف كأحد أجمل المطارات في آسيا بتصميمه الخشبي المميز.', EN: 'The country\'s second busiest airport, known for its award-winning wooden architecture.' },
      img: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=800',
      services: { AR: 'بوابة جزر بيسايا، وصول مباشر من الخليج، تأجير سيارات.', EN: 'Gateway to Visayas, direct flights from Gulf, car rentals.' }
    },
    {
      id: 'clark',
      name: { AR: 'مطار كلارك الدولي', EN: 'Clark International Airport (CRK)' },
      desc: { AR: 'يقع شمال مانيلا ويعد البديل الأسرع والأحدث لتجنب زحام العاصمة، يخدم منطقة لوزون المركزية.', EN: 'Located north of Manila, it\'s a modern alternative to avoid the capital\'s traffic.' },
      img: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=800',
      services: { AR: 'مبنى ركاب ذكي، حافلات مباشرة لمانيلا، رحلات دولية مباشرة.', EN: 'Smart terminal, direct buses to Manila, direct international flights.' }
    },
    {
      id: 'boracay-air',
      name: { AR: 'مطار بوراكاي كاتيكلان', EN: 'Caticlan (MPH) - Boracay' },
      desc: { AR: 'أقرب مطار لجزيرة بوراكاي، حيث يفصلك عنه رحلة بحرية قصيرة جداً لمدة 10 دقائق فقط.', EN: 'The closest airport to Boracay, just a 10-minute boat ride away.' },
      img: 'https://images.unsplash.com/photo-1540202816353-85e783457585?q=80&w=800',
      services: { AR: 'خدمة النقل المتكاملة (قارب + سيارة) متوفرة بكثرة.', EN: 'Integrated transfer services (boat + van) are widely available.' }
    },
    {
      id: 'palawan-air',
      name: { AR: 'مطار بالاوان الدولي', EN: 'Puerto Princesa Int\'l Airport (PPS)' },
      desc: { AR: 'بوابة الدخول الرئيسية لجزيرة بالوان، حيث تبدأ مغامرتك إلى النهر الجوفي وإل نيدو.', EN: 'The main entry point to Palawan island, gateway to the Underground River.' },
      img: 'https://images.unsplash.com/photo-1521447483764-5853f0959082?q=80&w=800',
      services: { AR: 'رحلات داخلية يومية، جولات سياحية مباشرة من المطار.', EN: 'Daily domestic flights, tours starting directly from the airport.' }
    }
  ];

  const transports = [
    {
      id: 'air-domestic',
      name: { AR: 'الطيران الداخلي (Airlines)', EN: 'Domestic Airlines' },
      desc: { AR: 'أفضل وسيلة للتنقل بين الجزر البعيدة. أشهر الشركات: سيبو باسيفيك والخطوط الفلبينية.', EN: 'Best way to travel between distant islands. Major airlines: Cebu Pacific, Philippine Airlines.' },
      tips: { AR: 'احجز مبكراً للحصول على أسعار مخفضة جداً.', EN: 'Book early for significantly lower fares.' },
      img: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?q=80&w=800'
    },
    {
      id: 'ferries',
      name: { AR: 'العبّارات والقوارب البحرية', EN: 'Ferries & Boats' },
      desc: { AR: 'تربط الجزر القريبة ببعضها (مثل سيبو وبوهول). تتوفر عبّارات سريعة وسياحية.', EN: 'Connects nearby islands (e.g., Cebu to Bohol). Fast crafts and tourist ferries available.' },
      tips: { AR: 'استخدم شركات موثوقة مثل OceanJet لضمان السرعة والراحة.', EN: 'Use reliable companies like OceanJet for speed and comfort.' },
      img: 'https://images.unsplash.com/photo-1500930287596-c1ecadcfe76b?q=80&w=800'
    },
    {
      id: 'grab-taxis',
      name: { AR: 'سيارات الأجرة وتطبيق Grab', EN: 'Taxis & Grab App' },
      desc: { AR: 'تطبيق Grab هو الخيار الأكثر أماناً وسهولة في مانيلا والمدن الكبرى لتجنب الزحام والأسعار غير الواضحة.', EN: 'Grab app is the safest and easiest option in Manila and big cities to avoid traffic and unclear pricing.' },
      tips: { AR: 'تأكد من تفعيل عداد التاكسي دائماً إذا لم تستخدم Grab.', EN: 'Always ensure the taxi meter is on if not using Grab.' },
      img: 'https://images.unsplash.com/photo-1549194382-349880594892?q=80&w=800'
    },
    {
      id: 'manila-lrt',
      name: { AR: 'مواصلات العاصمة مانيلا', EN: 'Manila Metro & Jeepneys' },
      desc: { AR: 'تضم مانيلا شبكة قطارات LRT/MRT، بالإضافة إلى "الجيبني" الملون الذي يعد رمزاً وطنياً.', EN: 'Manila features LRT/MRT trains, plus the colorful "Jeepney" which is a national symbol.' },
      tips: { AR: 'الجيبني تجربة ممتعة ولكن يفضل استخدامها للمسافات القصيرة.', EN: 'Jeepneys are a fun experience but best for short distances.' },
      img: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=800'
    },
    {
      id: 'rentals',
      name: { AR: 'تأجير السيارات والدراجات', EN: 'Car & Bike Rentals' },
      desc: { AR: 'في الجزر مثل سيارجاو وبوهول، تأجير الدراجات النارية هو الخيار الأفضل لاستكشاف الطبيعة.', EN: 'In islands like Siargao and Bohol, renting a motorcycle is the best way to explore.' },
      tips: { AR: 'يجب توفر رخصة قيادة دولية سارية المفعول.', EN: 'A valid international driving permit is required.' },
      img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800'
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <SectionBanner 
        image="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2000" 
        title={lang === 'AR' ? 'اكتشف الفلبين' : 'Discover Philippines'} 
        subtitle={lang === 'AR' ? 'دليلك الشامل لجمال وسحر الأرخبيل الفلبيني' : 'Your comprehensive guide to the beauty and charm of the PH archipelago'} 
        lang={lang} 
      />
      
      <div className="container mx-auto px-4 py-20 space-y-32">
        {/* Sections mapping */}
        {sections.map((section, idx) => (
          <div key={section.id} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`lg:w-1/2 space-y-6 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-1.5 h-12 bg-red-600 rounded-full"></div>
                <h2 className="text-3xl md:text-5xl font-black text-blue-900 leading-tight">{section.title[lang]}</h2>
              </div>
              <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
                {section.content[lang]}
              </p>
              <button 
                onClick={onAction}
                className="mt-6 bg-blue-900 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-red-600 transition-all shadow-xl active:scale-95"
              >
                {lang === 'AR' ? 'استكشف الفلبين معنا' : 'Explore Philippines with us'}
              </button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src={section.images[0]} className="w-full h-64 object-cover rounded-[2.5rem] shadow-2xl" alt="" />
                <img src={section.images[1]} className="w-full h-48 object-cover rounded-[2.5rem] shadow-2xl" alt="" />
              </div>
              <div className="pt-12">
                <img src={section.images[2]} className="w-full h-[28rem] object-cover rounded-[2.5rem] shadow-2xl" alt="" />
              </div>
            </div>
          </div>
        ))}

        {/* Airports Section */}
        <div className="space-y-12 py-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-blue-900">
              {lang === 'AR' ? 'أهم المطارات الدولية والمحلية' : 'Key Airports & Gateways'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {airports.map((airport) => (
              <div key={airport.id} className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-blue-50 group hover:-translate-y-2 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={airport.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>
                <div className={`p-8 space-y-4 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-black text-blue-900 leading-tight">{airport.name[lang]}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{airport.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transport Section */}
        <div className="space-y-12 py-16 bg-blue-50/30 -mx-4 px-4 rounded-[4rem]">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-blue-900">
              {lang === 'AR' ? 'وسائل التنقل داخل الفلبين' : 'Getting Around Philippines'}
            </h2>
          </div>
          <div className="space-y-10">
            {transports.map((trans, idx) => (
              <div key={trans.id} className={`flex flex-col md:flex-row bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-blue-50 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 h-72 md:h-auto overflow-hidden">
                  <img src={trans.img} className="w-full h-full object-cover" alt="" />
                </div>
                <div className={`md:w-1/2 p-8 md:p-16 flex flex-col justify-center ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-2xl font-black text-blue-900 mb-4">{trans.name[lang]}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium mb-8">{trans.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-8">
            <h3 className="text-3xl md:text-6xl font-black leading-tight">
              {lang === 'AR' ? 'هل أنت مستعد لبدء رحلتك؟' : 'Ready to start your journey?'}
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={onAction} className="bg-red-600 text-white px-16 py-6 rounded-3xl font-black text-2xl shadow-red-600/30 shadow-2xl hover:scale-105 active:scale-95 transition-all">
                {lang === 'AR' ? 'ابدأ رحلتك الآن' : 'Start Your Journey Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VisaInfoView ---

const VisaInfoView: React.FC<{ lang: Language; onBook: () => void }> = ({ lang, onBook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return VISA_DATA;
    return VISA_DATA.map(section => ({
      ...section,
      items: section.items.filter(item => 
        item.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.details[lang].toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(section => section.items.length > 0);
  }, [searchTerm, lang]);

  return (
    <div className="animate-in fade-in duration-700">
      <SectionBanner 
        image="https://images.unsplash.com/photo-1557128928-66e3009291b5?q=80&w=2000" 
        title={lang === 'AR' ? 'دليل الفيزا للفلبين' : 'Philippines Visa Guide'} 
        subtitle={lang === 'AR' ? 'كل ما تحتاج معرفته عن إجراءات الدخول' : 'Everything you need to know about entry procedures'} 
        lang={lang} 
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative group">
            <div className={`absolute inset-y-0 ${lang === 'AR' ? 'right-6' : 'left-6'} flex items-center text-gray-400`}>
              <ICONS.Search />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'AR' ? 'ابحث عن نوع الفيزا...' : 'Search for visa...'}
              className={`w-full p-6 ${lang === 'AR' ? 'pr-16' : 'pl-16'} bg-white rounded-[2rem] border-2 border-transparent focus:border-blue-100 shadow-xl outline-none text-sm font-bold`}
            />
          </div>
        </div>
        <div className="space-y-16 max-w-5xl mx-auto">
          {filteredData.map((section, idx) => (
            <div key={idx} className="animate-in fade-in duration-700">
              <h3 className="text-2xl font-black text-blue-900 mb-8">{section.category[lang]}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-xl transition-all">
                    <h4 className="text-lg font-black text-blue-900 mb-4">{item.title[lang]}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.details[lang]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Planning Bar ---

const PlanningBar: React.FC<{ lang: Language; onAction: () => void; isVisible: boolean }> = ({ lang, onAction, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[140] bg-white/90 backdrop-blur-xl border-t border-blue-50 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] p-4 md:p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className={`flex items-center gap-4 ${lang === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-2xl">🗺️</div>
          <div className={`flex flex-col ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
            <h4 className="text-base md:text-lg font-black text-blue-900">
              {lang === 'AR' ? 'خطّط لرحلتك مع مستشارنا' : 'Plan your trip with our consultant'}
            </h4>
          </div>
        </div>
        <button onClick={onAction} className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-red-600/20 shadow-xl hover:scale-105 active:scale-95 transition-all">
          {lang === 'AR' ? 'ابدأ التخطيط الآن' : 'Start Planning Now'}
        </button>
      </div>
    </div>
  );
};

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

const AdminDashboardView: React.FC<{ 
  siteData: SiteData; 
  onUpdate: (newData: SiteData) => void; 
  onUndo: () => void; 
  onReset: () => void;
  onLogout: () => void;
  lang: Language;
}> = ({ siteData, onUpdate, onUndo, onReset, onLogout, lang }) => {
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'ISLANDS' | 'MANILA' | 'SHOPPING' | 'RESTAURANTS' | 'ACTIVITIES'>('GENERAL');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'GENERAL', label: lang === 'AR' ? 'العامة والسلايدر' : 'General & Slider' },
    { id: 'ISLANDS', label: lang === 'AR' ? 'الجزر' : 'Islands' },
    { id: 'MANILA', label: lang === 'AR' ? 'مانيلا' : 'Manila' },
    { id: 'SHOPPING', label: lang === 'AR' ? 'التسوق' : 'Shopping' },
    { id: 'RESTAURANTS', label: lang === 'AR' ? 'المطاعم' : 'Dining' },
    { id: 'ACTIVITIES', label: lang === 'AR' ? 'الفعاليات' : 'Activities' },
  ];

  const updateList = (key: keyof SiteData, items: any[]) => {
    onUpdate({ ...siteData, [key]: items });
  };

  const toggleVisibility = (key: keyof SiteData, id: string) => {
    const newList = (siteData[key] as any[]).map((item: any) => 
      item.id === id ? { ...item, hidden: !item.hidden } : item
    );
    updateList(key, newList);
  };

  const saveEdit = (key: keyof SiteData) => {
    if (!editingItem) return;
    const isNew = !editingItem.id;
    const finalItem = isNew ? { ...editingItem, id: Date.now().toString() } : editingItem;
    let newList;
    if (isNew) {
      newList = [...(siteData[key] as any[]), finalItem];
    } else {
      newList = (siteData[key] as any[]).map((item: any) => 
        item.id === finalItem.id ? finalItem : item
      );
    }
    updateList(key, newList);
    setEditingItem(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (activeTab === 'GENERAL') {
          setEditingItem((prev: any) => prev ? { ...prev, image: result } : prev);
        } else {
          setEditingItem((prev: any) => ({
            ...(prev || {}),
            images: [...((prev && prev.images) || []), result]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={`py-12 container mx-auto px-4 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-black text-blue-900 mb-2">{lang === 'AR' ? 'مركز إدارة المحتوى الكامل' : 'Full Content Management Hub'}</h2>
        </div>
        <div className="flex gap-4">
          <button onClick={onUndo} className="bg-gray-100 text-gray-600 px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition">↩ {lang === 'AR' ? 'تراجع' : 'Undo'}</button>
          <button onClick={onReset} className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition">⚠ {lang === 'AR' ? 'ضبط' : 'Reset'}</button>
          <button onClick={onLogout} className="bg-blue-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-600 transition">🚪 {lang === 'AR' ? 'خروج' : 'Logout'}</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as any); setEditingItem(null); }}
            className={`px-8 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === tab.id ? 'bg-blue-900 text-white shadow-xl' : 'text-gray-400 hover:text-blue-900'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl border border-blue-50 p-8 md:p-12 min-h-[500px]">
        {editingItem ? (
          <div className="space-y-10">
            <h3 className="text-2xl font-black text-blue-900">{lang === 'AR' ? 'تعديل بيانات العنصر' : 'Edit Item Data'}</h3>
            {/* Simple Form inputs for example */}
            <input 
              className="w-full p-4 bg-gray-50 rounded-xl"
              value={editingItem.name?.AR || editingItem.title?.AR || ''} 
              onChange={e => activeTab === 'GENERAL' ? setEditingItem({...editingItem, title: {...editingItem.title, AR: e.target.value}}) : setEditingItem({...editingItem, name: {...editingItem.name, AR: e.target.value}})}
              placeholder="AR Name"
            />
            <div className="flex gap-4">
              <button onClick={() => saveEdit(activeTab === 'GENERAL' ? 'heroSlides' : activeTab.toLowerCase() as any)} className="bg-green-600 text-white px-16 py-5 rounded-2xl font-black">✅ حفظ</button>
              <button onClick={() => setEditingItem(null)} className="bg-gray-100 text-gray-400 px-10 py-5 rounded-2xl font-bold">إلغاء</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeTab === 'GENERAL' ? siteData.heroSlides : (siteData as any)[activeTab.toLowerCase()]).map((item: any) => (
              <div key={item.id} onClick={() => setEditingItem(item)} className="p-6 rounded-[2.5rem] border-2 cursor-pointer bg-white border-transparent shadow-lg hover:shadow-2xl transition-all">
                 <h4 className="font-black text-blue-900">{item.name ? item.name[lang] : item.title[lang]}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const AdminLoginView: React.FC<{ onLogin: (email: string, pass: string) => void; lang: Language; goBack: () => void; }> = ({ onLogin, lang, goBack }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-2xl border border-blue-50">
        <h2 className="text-2xl font-black text-blue-900 mb-8 text-center">{lang === 'AR' ? 'تسجيل دخول الإدارة' : 'Admin Login'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(email, pass); }} className="space-y-6">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" required />
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" required />
          <button type="submit" className="w-full bg-blue-900 text-white py-5 rounded-3xl font-black text-lg">دخول</button>
          <button type="button" onClick={goBack} className="w-full text-gray-400 font-bold text-sm">رجوع</button>
        </form>
      </div>
    </div>
  );
};

const PHLogo = () => (
  <div className="flex items-center gap-2 cursor-pointer group">
    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 group-hover:scale-110 transition-transform">
      <svg viewBox="0 0 100 100" className="w-6 h-6 md:w-8 md:h-8">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#0038A8" strokeWidth="2" />
        <circle cx="50" cy="50" r="15" fill="#FCD116" />
      </svg>
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

const Card: React.FC<{ item: Attraction; onBook: () => void; lang: Language }> = ({ item, onBook, lang }) => (
  <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all flex flex-col h-full">
    <div className="relative h-72 overflow-hidden">
      <img src={item.images[0]} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
    </div>
    <div className={`p-8 space-y-4 flex-grow flex flex-col ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
      <h3 className="text-xl font-black text-blue-900">{item.name[lang]}</h3>
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium flex-grow">{item.description[lang]}</p>
      <button onClick={onBook} className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-red-600 transition shadow-xl">إضافة للبرنامج</button>
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
  const activeSlides = slides.filter(s => !s.hidden);
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
          <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
          <div className="relative z-20 text-center container mx-auto px-4 flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl lg:text-8xl font-black text-white mb-6">{slide.title[lang]}</h1>
            <p className="text-white/80 text-lg lg:text-2xl mb-10">{slide.subtitle[lang]}</p>
            <button onClick={() => navigateTo('BOOKING')} className="bg-red-600 text-white px-12 py-5 rounded-[2.5rem] text-xl font-black shadow-2xl">احجز الآن</button>
          </div>
        </div>
      ))}
    </section>
  );
};

const BookingView: React.FC<{ navigateTo: (v: any) => void; lang: Language }> = ({ navigateTo, lang }) => (
  <div className="py-12 container mx-auto px-4 max-w-xl text-center">
    <div className="text-6xl mb-6">✅</div>
    <h3 className="text-3xl font-black text-blue-900">{lang === 'AR' ? 'احجز رحلتك' : 'Book Your Trip'}</h3>
    <p className="mt-4 text-gray-500 font-bold">سيتواصل معك فريقنا قريباً.</p>
  </div>
);

export default function App() {
  const [userRole, setUserRole] = useState<'ADMIN' | 'VISITOR'>('VISITOR');
  const [view, setView] = useState<ViewState>('HOME');
  const [history, setHistoryStack] = useState<ViewState[]>(['HOME']);
  const [lang, setLang] = useState<Language>('AR');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Safe initial site data
  const [siteData, setSiteData] = useState<SiteData>(DEFAULT_SITE_DATA);
  const [dataHistory, setDataHistory] = useState<SiteData[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mabuhay_v4_data');
      if (saved) setSiteData(JSON.parse(saved));
    } catch (e) {
      console.warn("Could not load saved site data from localStorage", e);
    }
  }, []);

  const updateSiteData = (newData: SiteData) => {
    if (userRole !== 'ADMIN') return;
    setDataHistory(prev => [siteData, ...prev].slice(0, 10));
    setSiteData(newData);
    try {
      localStorage.setItem('mabuhay_v4_data', JSON.stringify(newData));
    } catch (e) {
      console.error("Storage failed", e);
    }
  };

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

  const handleAdminLogin = (email: string, pass: string) => {
    if (email === 'aasd78869@gmail.com' && pass === 'Zz100100') {
      setUserRole('ADMIN');
      setView('ADMIN_DASHBOARD');
    } else {
      alert(lang === 'AR' ? 'بيانات الدخول خاطئة' : 'Invalid credentials');
    }
  };

  const getActive = (list: Attraction[]) => (list || []).filter(i => !i.hidden);

  return (
    <div className={`min-h-screen bg-[#FDFDFF] pb-24 md:pb-32 ${lang === 'AR' ? "font-['Cairo']" : "font-sans"}`}>
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-2xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {view !== 'HOME' && <button onClick={goBack} className="bg-gray-100 p-2 rounded-xl">←</button>}
            <div onClick={() => navigateTo('HOME')}><PHLogo /></div>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => navigateTo('ADMIN_LOGIN')} className="text-[10px] font-black text-gray-400 uppercase">Admin Login</button>
            <button onClick={() => setLang(lang === 'AR' ? 'EN' : 'AR')} className="bg-blue-900 text-white px-5 py-2 rounded-2xl text-[10px] font-black">{lang === 'AR' ? 'English' : 'العربية'}</button>
            <NavBtn active={view === 'HOME'} onClick={() => navigateTo('HOME')}>{siteData.translations?.navHome?.[lang] || 'الرئيسية'}</NavBtn>
            <NavBtn active={view === 'ISLANDS'} onClick={() => navigateTo('ISLANDS')}>{siteData.translations?.navIslands?.[lang] || 'الجزر'}</NavBtn>
            <NavBtn active={view === 'BOOKING'} onClick={() => navigateTo('BOOKING')} highlight>{siteData.translations?.navBook?.[lang] || 'احجز'}</NavBtn>
          </div>
          <div className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>🍔</div>
        </div>
      </nav>

      <main>
        {view === 'HOME' && (
          <div className="animate-in fade-in duration-1000">
            <HeroSlider slides={siteData.heroSlides} navigateTo={navigateTo} lang={lang} />
            <section className="py-24 container mx-auto px-4 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <HomeQuickLink icon="ℹ️" label="عن الفلبين" onClick={() => navigateTo('ABOUT_PH')} highlight />
                <HomeQuickLink icon="🏝️" label="الجزر" onClick={() => navigateTo('ISLANDS')} />
                <HomeQuickLink icon="🏙️" label="مانيلا" onClick={() => navigateTo('MANILA')} />
                <HomeQuickLink icon="🛂" label="الفيزا" onClick={() => navigateTo('VISA_INFO')} highlight />
                <HomeQuickLink icon="🛍️" label="التسوق" onClick={() => navigateTo('SHOPPING')} />
                <HomeQuickLink icon="🍛" label="مطاعم" onClick={() => navigateTo('RESTAURANTS')} />
              </div>
            </section>
          </div>
        )}
        {view === 'ABOUT_PH' && <AboutPHView lang={lang} onAction={() => navigateTo('BOOKING')} />}
        {view === 'ISLANDS' && <ListView title="الجزر السياحية" subtitle="استكشف أجمل الجزر" items={getActive(siteData.islands)} banner="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2000" onBook={() => navigateTo('BOOKING')} lang={lang} />}
        {view === 'VISA_INFO' && <VisaInfoView lang={lang} onBook={() => navigateTo('BOOKING')} />}
        {view === 'BOOKING' && <BookingView navigateTo={navigateTo} lang={lang} />}
        {view === 'ADMIN_LOGIN' && <AdminLoginView onLogin={handleAdminLogin} lang={lang} goBack={() => setView('HOME')} />}
        {view === 'ADMIN_DASHBOARD' && userRole === 'ADMIN' && (
          <AdminDashboardView 
            siteData={siteData} 
            onUpdate={updateSiteData} 
            onUndo={() => {}} 
            onReset={() => updateSiteData(DEFAULT_SITE_DATA)} 
            onLogout={() => { setUserRole('VISITOR'); setView('HOME'); }}
            lang={lang} 
          />
        )}
      </main>

      <PlanningBar lang={lang} onAction={() => navigateTo('BOOKING')} isVisible={view !== 'ADMIN_DASHBOARD'} />
      <Footer lang={lang} isAdmin={userRole === 'ADMIN'} />
    </div>
  );
}

const Footer: React.FC<{ lang: Language; isAdmin: boolean }> = ({ lang, isAdmin }) => (
  <footer className="bg-white border-t border-gray-100 pt-24 pb-12 text-center">
    <div className="container mx-auto px-4">
      <PHLogo />
      <p className="mt-8 text-gray-400 text-xs">© موبهاي للسياحة 2026. جميع الحقوق محفوظة.</p>
      {isAdmin && <span className="text-[10px] text-green-600 block mt-2">Logged as Admin</span>}
    </div>
  </footer>
);
