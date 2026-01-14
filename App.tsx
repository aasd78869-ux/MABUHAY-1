
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ViewState, Language, Attraction, SiteData, HeroSlide } from './types';
import { 
  DEFAULT_SITE_DATA, ICONS, VISA_DATA 
} from './constants';
import { getChatbotResponse } from './geminiService';

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
        {/* Existing Content */}
        {sections.map((section, idx) => (
          <div key={section.id} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-12 duration-1000`} style={{ animationDelay: `${idx * 200}ms` }}>
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
                <img src={section.images[0]} className="w-full h-64 object-cover rounded-[2.5rem] shadow-2xl hover:scale-105 transition-transform duration-500" alt="" />
                <img src={section.images[1]} className="w-full h-48 object-cover rounded-[2.5rem] shadow-2xl hover:scale-105 transition-transform duration-500" alt="" />
              </div>
              <div className="pt-12">
                <img src={section.images[2]} className="w-full h-[28rem] object-cover rounded-[2.5rem] shadow-2xl hover:scale-105 transition-transform duration-500" alt="" />
              </div>
            </div>
          </div>
        ))}

        {/* --- Airports Section --- */}
        <div className="space-y-12 py-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-blue-900">
              {lang === 'AR' ? 'أهم المطارات الدولية والمحلية' : 'Key Airports & Gateways'}
            </h2>
            <p className="text-gray-400 font-bold max-w-2xl mx-auto">
              {lang === 'AR' ? 'تسهل الفلبين وصول السياح عبر مجموعة من المطارات الحديثة والمجهزة بأفضل الخدمات.' : 'Philippines ensures easy access for tourists through a range of modern, well-equipped airports.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {airports.map((airport) => (
              <div key={airport.id} className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-blue-50 group hover:-translate-y-2 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={airport.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">AIRPORT</div>
                </div>
                <div className={`p-8 space-y-4 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-black text-blue-900 leading-tight">{airport.name[lang]}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{airport.desc[lang]}</p>
                  <div className="pt-4 border-t border-gray-50">
                    <span className="text-[10px] font-black text-red-600 block mb-2">{lang === 'AR' ? 'الخدمات المتاحة:' : 'Available Services:'}</span>
                    <p className="text-xs text-blue-900 font-bold">{airport.services[lang]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Transport Section --- */}
        <div className="space-y-12 py-16 bg-blue-50/30 -mx-4 px-4 rounded-[4rem]">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-blue-900">
              {lang === 'AR' ? 'وسائل التنقل داخل الفلبين' : 'Getting Around Philippines'}
            </h2>
            <p className="text-gray-400 font-bold max-w-2xl mx-auto">
              {lang === 'AR' ? 'من الجو إلى البحر والبر، استكشف خيارات التنقل التي تناسب برنامجك السياحي.' : 'From air to sea and land, explore the transport options that suit your itinerary.'}
            </p>
          </div>
          <div className="space-y-10">
            {transports.map((trans, idx) => (
              <div key={trans.id} className={`flex flex-col md:flex-row bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-blue-50 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 h-72 md:h-auto overflow-hidden">
                  <img src={trans.img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="" />
                </div>
                <div className={`md:w-1/2 p-8 md:p-16 flex flex-col justify-center ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-900 rounded-xl flex items-center justify-center text-white text-lg">🚀</div>
                    <h3 className="text-2xl font-black text-blue-900">{trans.name[lang]}</h3>
                  </div>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium mb-8">{trans.desc[lang]}</p>
                  <div className="bg-red-50 p-6 rounded-2xl border-r-4 border-red-600">
                    <span className="text-xs font-black text-red-600 block mb-1">{lang === 'AR' ? 'نصيحة للمسافرين:' : 'Traveler Tip:'}</span>
                    <p className="text-sm text-blue-900 font-bold">{trans.tips[lang]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Unified Call to Action --- */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
          <div className="relative z-10 space-y-8">
            <h3 className="text-3xl md:text-6xl font-black leading-tight">
              {lang === 'AR' ? 'هل أنت مستعد لبدء رحلتك؟' : 'Ready to start your journey?'}
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto font-bold text-lg md:text-xl">
              {lang === 'AR' ? 'تواصل مع مستشارنا لتنظيم كافة حجوزات المطارات والتنقل لرحلتك القادمة.' : 'Contact our consultant to organize all airport and transportation bookings for your next trip.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={onAction}
                className="bg-red-600 text-white px-16 py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                {lang === 'AR' ? 'ابدأ رحلتك الآن' : 'Start Your Journey Now'}
              </button>
              <button 
                onClick={onAction}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-6 rounded-3xl font-black text-xl hover:bg-white/20 transition-all"
              >
                {lang === 'AR' ? 'استكشف مع مستشارنا' : 'Explore with Consultant'}
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
            <div className={`absolute inset-y-0 ${lang === 'AR' ? 'right-6' : 'left-6'} flex items-center text-gray-400 group-focus-within:text-blue-900 transition-colors`}>
              <ICONS.Search />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'AR' ? 'ابحث عن نوع الفيزا أو المتطلبات...' : 'Search for visa types or requirements...'}
              className={`w-full p-6 ${lang === 'AR' ? 'pr-16' : 'pl-16'} bg-white rounded-[2rem] border-2 border-transparent focus:border-blue-100 shadow-xl outline-none text-sm font-bold transition-all`}
            />
          </div>
        </div>

        <div className="space-y-16 max-w-5xl mx-auto">
          {filteredData.map((section, idx) => (
            <div key={idx} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className={`flex items-center gap-4 mb-8 ${lang === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-1.5 h-10 bg-red-600 rounded-full"></div>
                <h3 className="text-2xl font-black text-blue-900">{section.category[lang]}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-xl transition-all group border-b-4 border-b-transparent hover:border-b-blue-600">
                    <h4 className="text-lg font-black text-blue-900 mb-4 group-hover:text-red-600 transition-colors">{item.title[lang]}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.details[lang]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-400 font-bold">{lang === 'AR' ? 'لا توجد نتائج مطابقة لبحثك.' : 'No results matching your search.'}</p>
            </div>
          )}

          <div className="bg-blue-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl mt-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black mb-6">
                {lang === 'AR' ? 'هل تحتاج لمساعدة في استخراج الفيزا؟' : 'Need help with your visa application?'}
              </h3>
              <p className="text-white/70 max-w-2xl mx-auto mb-10 font-bold text-sm md:text-base">
                {lang === 'AR' ? 'مستشارونا متاحون على مدار الساعة لمساعدتك في تجهيز الأوراق وتسهيل إجراءات التقديم.' : 'Our consultants are available 24/7 to help you prepare documents and facilitate the application process.'}
              </p>
              <button 
                onClick={onBook}
                className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                {lang === 'AR' ? 'تواصل مع مستشارنا للمساعدة في الفيزا' : 'Contact Visa Consultant Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Planning Bar ---

const PlanningBar: React.FC<{ lang: Language; onAction: () => void; isVisible: boolean }> = ({ lang, onAction, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[140] bg-white/90 backdrop-blur-xl border-t border-blue-50 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] p-4 md:p-6 animate-in slide-in-from-bottom duration-700">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className={`flex items-center gap-4 ${lang === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🗺️</div>
          <div className={`flex flex-col ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
            <h4 className="text-base md:text-lg font-black text-blue-900 leading-tight">
              {lang === 'AR' ? 'خطّط لرحلتك مع مستشارنا' : 'Plan your trip with our consultant'}
            </h4>
            <p className="text-gray-500 text-[10px] md:text-xs font-bold mt-1">
              {lang === 'AR' ? 'مستشارو السفر جاهزون لمساعدتك في تصميم برنامجك المثالي مجاناً.' : 'Our experts are ready to help you design your perfect itinerary for free.'}
            </p>
          </div>
        </div>
        <button 
          onClick={onAction}
          className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-red-600/20 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
        >
          {lang === 'AR' ? 'ابدأ التخطيط الآن' : 'Start Planning Now'}
        </button>
      </div>
    </div>
  );
};

// --- Other Components ---

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

    (Array.from(files) as File[]).forEach((file: File) => {
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

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    const newImages = [...editingItem.images];
    newImages.splice(index, 1);
    setEditingItem({...editingItem, images: newImages});
  };

  const handleImageUpdate = (index: number, url: string) => {
    const newImages = [...editingItem.images];
    newImages[index] = url;
    setEditingItem({...editingItem, images: newImages});
  };

  return (
    <div className={`py-12 container mx-auto px-4 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-black text-blue-900 mb-2">{lang === 'AR' ? 'مركز إدارة المحتوى الكامل' : 'Full Content Management Hub'}</h2>
          <p className="text-gray-500 font-bold">{lang === 'AR' ? 'تحكم في كل التفاصيل، النصوص، الصور، والخصائص' : 'Control every detail, texts, images, and properties'}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={onUndo} className="bg-gray-100 text-gray-600 px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition shadow-sm flex items-center gap-2">↩ {lang === 'AR' ? 'تراجع' : 'Undo'}</button>
          <button onClick={onReset} className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition shadow-sm">⚠ {lang === 'AR' ? 'ضبط' : 'Reset'}</button>
          <button onClick={onLogout} className="bg-blue-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-600 transition shadow-xl">🚪 {lang === 'AR' ? 'خروج' : 'Logout'}</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-100 pb-4 justify-center">
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
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-blue-900">{lang === 'AR' ? 'تعديل بيانات العنصر' : 'Edit Item Data'}</h3>
              <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-red-600 text-2xl font-bold">&times;</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Basic Texts */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-[2rem] space-y-4">
                  <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">{lang === 'AR' ? 'النصوص العربية' : 'Arabic Texts'}</h4>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400">{lang === 'AR' ? 'الاسم' : 'Name'}</label>
                    <input value={editingItem.name?.AR || editingItem.title?.AR || ''} onChange={e => activeTab === 'GENERAL' ? setEditingItem({...editingItem, title: {...editingItem.title, AR: e.target.value}}) : setEditingItem({...editingItem, name: {...editingItem.name, AR: e.target.value}})} className="w-full p-4 bg-white rounded-xl border border-gray-100 focus:border-blue-300 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400">{lang === 'AR' ? 'الوصف' : 'Description'}</label>
                    <textarea rows={4} value={editingItem.description?.AR || editingItem.subtitle?.AR || ''} onChange={e => activeTab === 'GENERAL' ? setEditingItem({...editingItem, subtitle: {...editingItem.subtitle, AR: e.target.value}}) : setEditingItem({...editingItem, description: {...editingItem.description, AR: e.target.value}})} className="w-full p-4 bg-white rounded-xl border border-gray-100 focus:border-blue-300 outline-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-[2rem] space-y-4">
                  <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">{lang === 'AR' ? 'النصوص الإنجليزية' : 'English Texts'}</h4>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400">{lang === 'AR' ? 'الاسم' : 'Name'}</label>
                    <input value={editingItem.name?.EN || editingItem.title?.EN || ''} onChange={e => activeTab === 'GENERAL' ? setEditingItem({...editingItem, title: {...editingItem.title, EN: e.target.value}}) : setEditingItem({...editingItem, name: {...editingItem.name, EN: e.target.value}})} className="w-full p-4 bg-white rounded-xl border border-gray-100 focus:border-blue-300 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400">{lang === 'AR' ? 'الوصف' : 'Description'}</label>
                    <textarea rows={4} value={editingItem.description?.EN || editingItem.subtitle?.EN || ''} onChange={e => activeTab === 'GENERAL' ? setEditingItem({...editingItem, subtitle: {...editingItem.subtitle, EN: e.target.value}}) : setEditingItem({...editingItem, description: {...editingItem.description, EN: e.target.value}})} className="w-full p-4 bg-white rounded-xl border border-gray-100 focus:border-blue-300 outline-none" />
                  </div>
                </div>
              </div>

              {/* Extra Properties */}
              {activeTab !== 'GENERAL' && (
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400">{lang === 'AR' ? 'الموقع (عربي)' : 'Location (AR)'}</label>
                      <input value={editingItem.location?.AR || ''} onChange={e => setEditingItem({...editingItem, location: {...editingItem.location, AR: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400">{lang === 'AR' ? 'مناسب لـ (عربي)' : 'Best For (AR)'}</label>
                      <input value={editingItem.bestFor?.AR || ''} onChange={e => setEditingItem({...editingItem, bestFor: {...editingItem.bestFor, AR: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
                   </div>
                   <div className="flex items-center gap-4 pt-6">
                      <label className="text-xs font-black text-blue-900">{lang === 'AR' ? 'مطعم حلال؟' : 'Halal?'}</label>
                      <input type="checkbox" checked={!!editingItem.halal} onChange={e => setEditingItem({...editingItem, halal: e.target.checked})} className="w-6 h-6" />
                   </div>
                </div>
              )}

              {/* Image Manager with File Upload */}
              <div className="col-span-1 md:col-span-2 space-y-6">
                 <div className="flex justify-between items-center bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100">
                   <div>
                     <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest">{lang === 'AR' ? 'إدارة ومعاينة الصور' : 'Image Management & Preview'}</h4>
                     <p className="text-[10px] font-bold text-gray-400 mt-1">{lang === 'AR' ? 'يمكنك رفع صور متعددة مباشرة من جهازك' : 'You can upload multiple images directly from your device'}</p>
                   </div>
                   <button 
                    onClick={triggerFileUpload} 
                    className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-xs shadow-xl shadow-red-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                   >
                     📸 {lang === 'AR' ? 'إضافة / رفع صورة جديدة' : 'Add / Upload New Image'}
                   </button>
                   <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept="image/*" 
                    multiple={activeTab !== 'GENERAL'}
                   />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeTab === 'GENERAL' ? (
                      <div className="col-span-full group relative">
                        {editingItem.image ? (
                          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
                             <img src={editingItem.image} className="w-full h-full object-cover" alt="" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <button onClick={() => setEditingItem({...editingItem, image: ''})} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold">إزالة الصورة</button>
                             </div>
                          </div>
                        ) : (
                          <div onClick={triggerFileUpload} className="aspect-video rounded-[2.5rem] border-4 border-dashed border-gray-100 bg-gray-50 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                            <span className="text-4xl mb-4">🖼️</span>
                            <span className="font-black">انقر لرفع صورة السلايدر</span>
                          </div>
                        )}
                        <input value={editingItem.image || ''} onChange={e => setEditingItem({...editingItem, image: e.target.value})} className="w-full mt-4 p-4 bg-gray-50 rounded-xl outline-none text-[10px]" placeholder="أو الصق رابط الصورة هنا مباشرة" />
                      </div>
                    ) : (
                      editingItem.images?.map((url: string, idx: number) => (
                        <div key={idx} className="group relative bg-white rounded-[2rem] overflow-hidden shadow-md border border-gray-100 p-2">
                          <div className="relative h-48 rounded-[1.5rem] overflow-hidden mb-4">
                             <img src={url} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300?text=Invalid+Image')} alt="" />
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <button onClick={() => removeImage(idx)} className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">🗑️</button>
                             </div>
                          </div>
                          <input value={url} onChange={e => handleImageUpdate(idx, e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl outline-none text-[8px] font-bold text-gray-400" placeholder="رابط الصورة (URL)" />
                        </div>
                      ))
                    )}
                 </div>
                 {activeTab !== 'GENERAL' && (!editingItem.images || editingItem.images.length === 0) && (
                    <div onClick={triggerFileUpload} className="py-20 rounded-[3rem] border-4 border-dashed border-gray-100 bg-gray-50 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                      <span className="text-5xl mb-6">📸</span>
                      <h4 className="text-xl font-black mb-2 text-gray-300">لم يتم اختيار أي صور بعد</h4>
                      <p className="font-bold text-sm">انقر هنا لبدء رفع صور عالية الجودة للعنصر</p>
                    </div>
                 )}
              </div>
            </div>

            <div className="flex gap-4 pt-10 border-t border-gray-100">
              <button 
                onClick={() => saveEdit(activeTab === 'GENERAL' ? 'heroSlides' : activeTab.toLowerCase() as any)} 
                className="bg-green-600 text-white px-16 py-5 rounded-2xl font-black shadow-xl shadow-green-600/20 hover:scale-105 transition-all"
              >
                ✅ {lang === 'AR' ? 'حفظ التغييرات النهائية' : 'Save All Changes'}
              </button>
              <button onClick={() => setEditingItem(null)} className="bg-gray-100 text-gray-400 px-10 py-5 rounded-2xl font-bold">{lang === 'AR' ? 'إلغاء' : 'Cancel'}</button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
               <div>
                 <h3 className="text-2xl font-black text-blue-900">{tabs.find(t => t.id === activeTab)?.label}</h3>
                 <p className="text-gray-400 text-xs font-bold mt-1">{lang === 'AR' ? 'اضغط على أي عنصر لتعديله فوراً' : 'Click any item to edit it immediately'}</p>
               </div>
               <button 
                 onClick={() => setEditingItem({ name: {AR:'', EN:'', PH:''}, description: {AR:'', EN:'', PH:''}, images: [], location: {AR:'', EN:'', PH:''}, bestFor: {AR:'', EN:'', PH:''}, category: activeTab === 'GENERAL' ? 'ISLAND' : (activeTab as any) })}
                 className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-red-600 transition-colors"
               >
                 + {lang === 'AR' ? 'إضافة عنصر جديد' : 'Add New'}
               </button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {(activeTab === 'GENERAL' ? siteData.heroSlides : (siteData as any)[activeTab.toLowerCase()]).map((item: any) => (
                 <div 
                   key={item.id} 
                   onClick={() => setEditingItem(item)}
                   className={`p-6 rounded-[2.5rem] border-2 cursor-pointer group transition-all duration-300 ${item.hidden ? 'bg-gray-50 border-dashed border-gray-200 opacity-60' : 'bg-white border-transparent shadow-lg hover:shadow-2xl hover:border-blue-100'} flex flex-col justify-between`}
                 >
                   <div className="flex gap-4 mb-6">
                     <div className="relative w-24 h-24 flex-shrink-0">
                        <img src={item.images ? (item.images[0] || 'https://placehold.co/100x100?text=No+Img') : item.image} className="w-full h-full rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" alt="" />
                        {item.hidden && <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-2xl"><ICONS.EyeOff /></div>}
                     </div>
                     <div className="flex-grow pt-2">
                       <h4 className="font-black text-blue-900 text-base mb-1 line-clamp-1 group-hover:text-red-600 transition-colors">{item.name ? item.name[lang] : item.title[lang]}</h4>
                       <span className="text-[10px] font-bold text-gray-400 uppercase">{item.location ? item.location[lang] : (lang === 'AR' ? 'سلايدر' : 'Slider')}</span>
                       <p className="text-gray-400 text-[11px] line-clamp-2 mt-2 leading-relaxed">{item.description ? item.description[lang] : item.subtitle[lang]}</p>
                     </div>
                   </div>
                   <div className="flex gap-2">
                     <div className="flex-grow bg-blue-50 text-blue-900 py-3 rounded-xl font-black text-[10px] text-center uppercase tracking-widest group-hover:bg-blue-900 group-hover:text-white transition">📝 {lang === 'AR' ? 'تعديل التفاصيل' : 'Edit Details'}</div>
                     <button 
                       onClick={(e) => { e.stopPropagation(); toggleVisibility(activeTab === 'GENERAL' ? 'heroSlides' : activeTab.toLowerCase() as any, item.id); }} 
                       className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                      >
                       {item.hidden ? <ICONS.Eye /> : <ICONS.EyeOff />}
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PHLogo = () => (
  <div className="flex items-center gap-2 cursor-pointer group">
    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 group-hover:scale-110 transition-transform">
      <div className="relative w-6 h-6 md:w-8 md:h-8">
        <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 animate-ping"></div>
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#0038A8" strokeWidth="2" />
          <circle cx="50" cy="50" r="15" fill="#FCD116" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect key={deg} x="48" y="20" width="4" height="15" fill="#FCD116" transform={`rotate(${deg} 50 50)`} />
          ))}
        </svg>
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-lg md:text-xl font-black text-blue-900 leading-none uppercase tracking-tighter">MABUHAY</span>
      <span className="text-[8px] md:text-[10px] font-bold text-red-600 tracking-[0.2em] uppercase">Philippines</span>
    </div>
  </div>
);

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
    <h2 className="text-3xl font-black text-blue-900 mb-4 tracking-tight">{title}</h2>
    <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full mb-4"></div>
    <p className="text-gray-500 max-w-2xl mx-auto font-medium text-sm leading-relaxed">{subtitle}</p>
  </div>
);

const Card: React.FC<{ item: Attraction; onBook: () => void; lang: Language }> = ({ item, onBook, lang }) => {
  const [activeImg, setActiveImg] = useState(0);
  
  const getButtonText = () => {
    if (lang === 'AR') {
      if (item.category === 'ISLAND') return 'إضافة الجزيرة إلى البرنامج';
      if (item.category === 'SHOPPING' || item.category === 'MARKET') return 'أضف زيارة التسوق إلى برنامجك السياحي';
      if (item.category === 'RESTAURANT') return 'أضف المطعم إلى برنامجك السياحي';
      if (item.category === 'ACTIVITY') return 'أضف الفعالية إلى البرنامج السياحي';
      return 'حجز مباشر';
    } else {
      if (item.category === 'ISLAND') return 'Add to Program';
      if (item.category === 'SHOPPING' || item.category === 'MARKET') return 'Add shopping to itinerary';
      if (item.category === 'RESTAURANT') return 'Add restaurant to itinerary';
      if (item.category === 'ACTIVITY') return 'Add activity to itinerary';
      return 'Book Now';
    }
  };

  const buttonText = getButtonText();

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col h-full">
      <div className="relative h-72 overflow-hidden">
        <img src={item.images[activeImg]} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
        {item.images.length > 1 && (
          <div className={`absolute bottom-4 ${lang === 'AR' ? 'left-4' : 'right-4'} flex gap-1.5 z-20`}>
            {item.images.map((_, idx) => (
              <button key={idx} onClick={(e) => { e.stopPropagation(); setActiveImg(idx); }} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === activeImg ? 'bg-white w-4' : 'bg-white/40'}`} />
            ))}
          </div>
        )}
        <div className={`absolute bottom-6 inset-x-6 flex justify-between items-end z-10 ${lang === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`text-white ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
            <span className="text-[9px] font-black uppercase tracking-widest bg-red-600 px-3 py-1 rounded-full mb-2 inline-block shadow-lg">{item.location[lang]}</span>
            <h3 className="text-xl font-black leading-tight">{item.name[lang]}</h3>
          </div>
        </div>
      </div>
      <div className={`p-8 space-y-4 flex-grow flex flex-col ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium flex-grow">{item.description[lang]}</p>
        
        {item.category === 'ACTIVITY' && (
           <div className="grid grid-cols-2 gap-2 py-3 border-y border-gray-50 my-2">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase">{lang === 'AR' ? 'المدة' : 'Duration'}</span>
                <span className="text-xs font-black text-blue-900">{item.duration?.[lang]}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase">{lang === 'AR' ? 'المستوى' : 'Level'}</span>
                <span className={`text-xs font-black ${item.level?.[lang]?.includes('مغامرة') ? 'text-red-600' : 'text-green-600'}`}>{item.level?.[lang]}</span>
              </div>
           </div>
        )}

        <div className={`flex items-center gap-2 pt-4 justify-between ${lang === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
           {item.halal && <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-lg flex items-center gap-1"><ICONS.Check /> {lang === 'AR' ? 'حلال' : 'Halal'}</span>}
          <span className="text-[10px] font-bold text-gray-300">{lang === 'AR' ? 'مناسب لـ:' : 'Best for:'} <span className="text-blue-900">{item.bestFor?.[lang]}</span></span>
        </div>
        <button onClick={onBook} className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-red-600 transition shadow-xl active:scale-95">{buttonText}</button>
      </div>
    </div>
  );
};

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
        <div key={slide.id} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" style={{ transform: index === current ? 'scale(1)' : 'scale(1.15)', transition: 'transform 10s linear' }} alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/20 to-transparent"></div>
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
            <h1 className={`text-4xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl transition-all duration-700 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>{slide.title[lang]}</h1>
            <p className={`text-white/80 text-lg lg:text-2xl max-w-4xl mx-auto mb-10 drop-shadow-lg transition-all duration-700 delay-500 font-medium ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>{slide.subtitle[lang]}</p>
            <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-700 delay-700 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button onClick={() => navigateTo('BOOKING')} className="bg-red-600 text-white px-12 py-5 rounded-[2.5rem] text-xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all">{lang === 'AR' ? 'احجز الآن' : 'Book Now'}</button>
              <button onClick={() => navigateTo('ACTIVITIES')} className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-12 py-5 rounded-[2.5rem] text-xl font-black hover:bg-white/20 transition-all">{lang === 'AR' ? 'الفعاليات' : 'Activities'}</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

// --- New Component: LoginGateway ---

const LoginGateway: React.FC<{ 
  onAdminLogin: (email: string, pass: string) => void; 
  onVisitorEntry: () => void;
  lang: Language;
}> = ({ onAdminLogin, onVisitorEntry, lang }) => {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="fixed inset-0 z-[500] bg-blue-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2000" 
          className="w-full h-full object-cover opacity-30 blur-sm scale-110" 
          alt="" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-blue-950/90"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[4rem] p-8 md:p-16 shadow-2xl animate-in zoom-in duration-500">
        <div className="text-center mb-12">
          <PHLogo />
          <h2 className="text-2xl md:text-3xl font-black text-white mt-8 mb-2">
            {lang === 'AR' ? 'أهلاً بك في موبهاي' : 'Welcome to Mabuhay'}
          </h2>
          <p className="text-white/60 font-bold text-sm">
            {lang === 'AR' ? 'الرجاء اختيار طريقة الدخول للموقع' : 'Please choose your entry method'}
          </p>
        </div>

        {!showAdminForm ? (
          <div className="space-y-6">
            <button 
              onClick={onVisitorEntry}
              className="w-full bg-red-600 text-white py-6 rounded-[2.5rem] font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              {lang === 'AR' ? 'الدخول كزائر' : 'Enter as Visitor'}
            </button>
            <button 
              onClick={() => setShowAdminForm(true)}
              className="w-full bg-white/10 border border-white/30 text-white py-6 rounded-[2.5rem] font-black text-xl hover:bg-white/20 transition-all"
            >
              {lang === 'AR' ? 'تسجيل دخول كأدمن' : 'Admin Login'}
            </button>
          </div>
        ) : (
          <form 
            onSubmit={(e) => { e.preventDefault(); onAdminLogin(email, pass); }} 
            className="space-y-6 animate-in slide-in-from-bottom-4 duration-300"
          >
            <div className="space-y-4">
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder={lang === 'AR' ? 'البريد الإلكتروني' : 'Email Address'} 
                className="w-full p-5 bg-white/5 border border-white/20 text-white rounded-3xl outline-none focus:border-red-600 transition-colors"
                required 
              />
              <div className="relative">
                <input 
                  type={showPass ? "text" : "password"} 
                  value={pass} 
                  onChange={e => setPass(e.target.value)} 
                  placeholder={lang === 'AR' ? 'كلمة المرور' : 'Password'} 
                  className="w-full p-5 bg-white/5 border border-white/20 text-white rounded-3xl outline-none focus:border-red-600 transition-colors"
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPass ? <ICONS.EyeOff /> : <ICONS.Eye />}
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                type="button" 
                onClick={() => setShowAdminForm(false)}
                className="w-1/3 bg-white/10 text-white py-5 rounded-3xl font-black text-sm"
              >
                {lang === 'AR' ? 'رجوع' : 'Back'}
              </button>
              <button 
                type="submit" 
                className="flex-grow bg-red-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl hover:bg-red-700 transition-all"
              >
                {lang === 'AR' ? 'تسجيل دخول' : 'Login'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [userRole, setUserRole] = useState<'ADMIN' | 'VISITOR' | null>(null);
  const [view, setView] = useState<ViewState>('HOME');
  const [history, setHistoryStack] = useState<ViewState[]>(['HOME']);
  const [lang, setLang] = useState<Language>('AR');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [siteData, setSiteData] = useState<SiteData>(DEFAULT_SITE_DATA);
  const [dataHistory, setDataHistory] = useState<SiteData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mabuhay_v4_data');
    if (saved) setSiteData(JSON.parse(saved));
  }, []);

  const updateSiteData = (newData: SiteData) => {
    setDataHistory(prev => [siteData, ...prev].slice(0, 10));
    setSiteData(newData);
    localStorage.setItem('mabuhay_v4_data', JSON.stringify(newData));
  };

  const undoDataChange = () => {
    if (dataHistory.length > 0) {
      const last = dataHistory[0];
      setSiteData(last);
      setDataHistory(prev => prev.slice(1));
      localStorage.setItem('mabuhay_v4_data', JSON.stringify(last));
    }
  };

  const resetToDefault = () => {
    if (window.confirm('إعادة ضبط المصنع؟ سيتم مسح كافة التعديلات.')) updateSiteData(DEFAULT_SITE_DATA);
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
      const previousView = newStack[newStack.length - 1];
      setHistoryStack(newStack);
      setView(previousView);
      window.scrollTo(0, 0);
    } else {
      setView('HOME');
    }
  };

  const handleAdminLogin = (email: string, pass: string) => {
    if (email === 'aasd78869@gmail.com' && pass === 'Zz100100') {
      setUserRole('ADMIN');
      setView('HOME');
    } else {
      alert(lang === 'AR' ? 'بيانات الدخول خاطئة' : 'Invalid credentials');
    }
  };

  const getActive = (list: Attraction[]) => list.filter(i => !i.hidden);

  if (userRole === null) {
    return <LoginGateway onAdminLogin={handleAdminLogin} onVisitorEntry={() => setUserRole('VISITOR')} lang={lang} />;
  }

  return (
    <div className={`min-h-screen bg-[#FDFDFF] pb-24 md:pb-32 ${lang === 'AR' ? "font-['Cairo']" : "font-sans"}`}>
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-2xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            {view !== 'HOME' && (
              <div className="flex gap-2">
                <button onClick={goBack} className="bg-gray-100 text-gray-600 p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition group">
                   <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
                   <span className="hidden md:inline text-[11px] font-black uppercase">{lang === 'AR' ? 'رجوع' : 'Back'}</span>
                </button>
                <button onClick={() => navigateTo('HOME')} className="bg-blue-50 text-blue-900 p-2 md:px-4 md:py-2 rounded-xl hover:bg-blue-900 hover:text-white transition">🏠</button>
              </div>
            )}
            <div onClick={() => navigateTo('HOME')}><PHLogo /></div>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {userRole === 'ADMIN' && (
              <button 
                onClick={() => navigateTo('ADMIN_DASHBOARD')} 
                className="text-[10px] font-black tracking-widest text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-lg animate-pulse"
              >
                CONTROL PANEL
              </button>
            )}
            <button onClick={() => setLang(lang === 'AR' ? 'EN' : 'AR')} className="bg-blue-900 text-white px-5 py-2 rounded-2xl text-[10px] font-black">{lang === 'AR' ? 'English' : 'العربية'}</button>
            <NavBtn active={view === 'HOME'} onClick={() => navigateTo('HOME')}>{siteData.translations.navHome[lang]}</NavBtn>
            <NavBtn active={view === 'ABOUT_PH'} onClick={() => navigateTo('ABOUT_PH')}>{siteData.translations.navAboutPH[lang]}</NavBtn>
            <NavBtn active={view === 'ACTIVITIES'} onClick={() => navigateTo('ACTIVITIES')}>{siteData.translations.navActivities[lang]}</NavBtn>
            <NavBtn active={view === 'VISA_INFO'} onClick={() => navigateTo('VISA_INFO')}>{siteData.translations.navVisa[lang]}</NavBtn>
            <NavBtn active={view === 'ISLANDS'} onClick={() => navigateTo('ISLANDS')}>{siteData.translations.navIslands[lang]}</NavBtn>
            <NavBtn active={view === 'BOOKING'} onClick={() => navigateTo('BOOKING')} highlight>{siteData.translations.navBook[lang]}</NavBtn>
            <button onClick={() => { setUserRole(null); setView('HOME'); }} className="text-gray-300 hover:text-red-600 text-xs font-black transition-colors">LOGOUT</button>
          </div>
          <div className="lg:hidden" onClick={() => setIsMenuOpen(true)}>🍔</div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white p-10 lg:hidden animate-in fade-in slide-in-from-right duration-300">
           <div className="flex justify-between items-center mb-12">
             <PHLogo />
             <button onClick={() => setIsMenuOpen(false)} className="text-2xl">&times;</button>
           </div>
           <div className="flex flex-col gap-8">
              <button onClick={() => navigateTo('HOME')} className="text-xl font-black text-blue-900 text-right">{siteData.translations.navHome[lang]}</button>
              <button onClick={() => navigateTo('ABOUT_PH')} className="text-xl font-black text-blue-900 text-right">{siteData.translations.navAboutPH[lang]}</button>
              <button onClick={() => navigateTo('ACTIVITIES')} className="text-xl font-black text-blue-900 text-right">{siteData.translations.navActivities[lang]}</button>
              <button onClick={() => navigateTo('VISA_INFO')} className="text-xl font-black text-blue-900 text-right">{siteData.translations.navVisa[lang]}</button>
              <button onClick={() => navigateTo('ISLANDS')} className="text-xl font-black text-blue-900 text-right">{siteData.translations.navIslands[lang]}</button>
              <button onClick={() => navigateTo('BOOKING')} className="text-xl font-black text-red-600 text-right">{siteData.translations.navBook[lang]}</button>
              {userRole === 'ADMIN' && (
                <button onClick={() => navigateTo('ADMIN_DASHBOARD')} className="text-xl font-black text-red-600 text-right uppercase tracking-widest">Control Panel</button>
              )}
              <button onClick={() => setUserRole(null)} className="text-xl font-black text-gray-400 text-right">خروج</button>
           </div>
        </div>
      )}

      <main>
        {view === 'HOME' && (
          <div className="animate-in fade-in duration-1000">
            <HeroSlider slides={siteData.heroSlides} navigateTo={navigateTo} lang={lang} />
            <section className="py-24 container mx-auto px-4">
              <SectionHeader title={lang === 'AR' ? "بوابتك لكل ما هو فلبيني" : "Your Gateway to Philippines"} subtitle={lang === 'AR' ? "أقسام موقعنا المصممة لتناسب ذوقك السياحي" : "Explore our sections"} />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                <HomeQuickLink icon="ℹ️" label={siteData.translations.navAboutPH[lang]} onClick={() => navigateTo('ABOUT_PH')} highlight />
                <HomeQuickLink icon="🏝️" label={siteData.translations.navIslands[lang]} onClick={() => navigateTo('ISLANDS')} />
                <HomeQuickLink icon="🏙️" label={siteData.translations.navManila[lang]} onClick={() => navigateTo('MANILA')} />
                <HomeQuickLink icon="🎉" label={siteData.translations.navActivities[lang]} onClick={() => navigateTo('ACTIVITIES')} highlight />
                <HomeQuickLink icon="🛂" label={siteData.translations.navVisa[lang]} onClick={() => navigateTo('VISA_INFO')} highlight />
                <HomeQuickLink icon="🛍️" label={siteData.translations.navShopping[lang]} onClick={() => navigateTo('SHOPPING')} />
                <HomeQuickLink icon="🍲" label={siteData.translations.navDining[lang]} onClick={() => navigateTo('RESTAURANTS')} />
                <HomeQuickLink icon="💰" label={lang === 'AR' ? "حاسبة العملة" : "Currency"} onClick={() => navigateTo('CURRENCY_CALC')} />
              </div>
            </section>
          </div>
        )}

        {view === 'ABOUT_PH' && (
          <AboutPHView lang={lang} onAction={() => navigateTo('BOOKING')} />
        )}

        {view === 'ISLANDS' && (
          <ListView 
            title={siteData.translations.navIslands[lang]} 
            subtitle={lang === 'AR' ? "استكشف جمال الجزر الفلبينية الحقيقي" : "Real beauty of PH islands"} 
            items={getActive(siteData.islands)} 
            banner="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2000"
            onBook={() => navigateTo('BOOKING')} 
            lang={lang} 
          />
        )}
        {view === 'MANILA' && (
          <ListView 
            title={siteData.translations.navManila[lang]} 
            subtitle={lang === 'AR' ? "حيث تلتقي ناطحات السحاب بالتاريخ" : "Modernity meets history"} 
            items={getActive(siteData.manilaDistricts)} 
            banner="https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=2000"
            onBook={() => navigateTo('BOOKING')} 
            lang={lang} 
          />
        )}
        {view === 'ACTIVITIES' && (
          <ListView 
            title={siteData.translations.navActivities[lang]} 
            subtitle={lang === 'AR' ? "أهم 20 تجربة لا تفوتها في الفلبين" : "Must-do experiences"} 
            items={getActive(siteData.activities)} 
            banner="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2000"
            onBook={() => navigateTo('BOOKING')} 
            lang={lang} 
            showFilters
          />
        )}
        {view === 'VISA_INFO' && (
          <VisaInfoView lang={lang} onBook={() => navigateTo('BOOKING')} />
        )}
        {view === 'SHOPPING' && (
          <ListView 
            title={siteData.translations.navShopping[lang]} 
            subtitle={lang === 'AR' ? "أكبر المولات والأسواق في آسيا" : "Best shopping in Asia"} 
            items={getActive(siteData.shopping)} 
            banner="https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=2000"
            onBook={() => navigateTo('BOOKING')} 
            lang={lang} 
          />
        )}
        {view === 'RESTAURANTS' && (
          <ListView 
            title={siteData.translations.navDining[lang]} 
            subtitle={lang === 'AR' ? "طعم عربي أصيل في قلب مانيلا" : "Authentic Arabic taste"} 
            items={getActive(siteData.restaurants)} 
            banner="https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=2000"
            onBook={() => navigateTo('BOOKING')} 
            lang={lang} 
          />
        )}

        {view === 'CURRENCY_CALC' && (
          <div className="animate-in fade-in duration-500">
            <SectionBanner image="https://images.unsplash.com/photo-1580519327383-647a6664efe5?q=80&w=2000" title={lang === 'AR' ? 'حاسبة العملة' : 'Currency Calc'} subtitle={lang === 'AR' ? 'خطط لميزانيتك بدقة' : 'Plan your budget'} lang={lang} />
            <CurrencyCalc lang={lang} />
          </div>
        )}

        {view === 'BOOKING' && (
          <div className="animate-in fade-in duration-500">
            <SectionBanner image="https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=2000" title={lang === 'AR' ? 'خطط لرحلتك' : 'Plan Your Trip'} subtitle={lang === 'AR' ? 'سوف يصمم خبراؤنا برنامجك المخصص' : 'Custom programs by our experts'} lang={lang} />
            <BookingView navigateTo={navigateTo} lang={lang} />
          </div>
        )}

        {view === 'ADMIN_DASHBOARD' && userRole === 'ADMIN' && (
          <AdminDashboardView 
            siteData={siteData} 
            onUpdate={updateSiteData} 
            onUndo={undoDataChange} 
            onReset={resetToDefault} 
            onLogout={() => { setUserRole(null); setView('HOME'); }}
            lang={lang} 
          />
        )}
      </main>

      <PlanningBar lang={lang} onAction={() => navigateTo('BOOKING')} isVisible={view !== 'ADMIN_DASHBOARD'} />
      <Footer lang={lang} navigateTo={navigateTo} t={siteData.translations} isAdmin={userRole === 'ADMIN'} />
      <AIChatbot lang={lang} />
    </div>
  );
}

// --- Helpers ---

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

const ListView: React.FC<{ title: string; subtitle: string; items: Attraction[]; banner: string; onBook: () => void; lang: Language; showFilters?: boolean }> = ({ title, subtitle, items, banner, onBook, lang, showFilters }) => {
  const [filter, setFilter] = useState({ city: 'ALL', level: 'ALL' });

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const cityMatch = filter.city === 'ALL' || item.location[lang].includes(filter.city);
      const levelMatch = filter.level === 'ALL' || (item.level && item.level[lang] === filter.level);
      return cityMatch && levelMatch;
    });
  }, [items, filter, lang]);

  const cities = useMemo(() => {
    const set = new Set(items.map(i => i.location[lang].split(' ')[0]));
    return ['ALL', ...Array.from(set)];
  }, [items, lang]);

  const levels = ['ALL', 'هادئ', 'متوسط', 'مغامرة', 'Calm', 'Medium', 'Adventure'];

  return (
    <div className="animate-in fade-in duration-700">
      <SectionBanner image={banner} title={title} subtitle={subtitle} lang={lang} />
      
      {showFilters && (
        <div className="container mx-auto px-4 mb-12">
          <div className="bg-white/50 backdrop-blur-md p-6 rounded-[2.5rem] border border-blue-50 shadow-sm flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center gap-2 text-blue-900 font-black text-xs uppercase"><ICONS.Filter /> {lang === 'AR' ? 'تصفية الفعاليات:' : 'Filter Activities:'}</div>
            <select 
              className="bg-white px-6 py-3 rounded-2xl border border-gray-100 outline-none text-xs font-bold shadow-sm"
              value={filter.city}
              onChange={e => setFilter({...filter, city: e.target.value})}
            >
              <option value="ALL">{lang === 'AR' ? 'جميع المدن' : 'All Cities'}</option>
              {cities.filter(c => c !== 'ALL').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select 
              className="bg-white px-6 py-3 rounded-2xl border border-gray-100 outline-none text-xs font-bold shadow-sm"
              value={filter.level}
              onChange={e => setFilter({...filter, level: e.target.value})}
            >
              <option value="ALL">{lang === 'AR' ? 'جميع المستويات' : 'All Levels'}</option>
              {levels.filter(l => l !== 'ALL' && (lang === 'AR' ? l.match(/[\u0600-\u06FF]/) : !l.match(/[\u0600-\u06FF]/))).map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map(item => <Card key={item.id} item={item} onBook={onBook} lang={lang} />)}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-bold">
            {lang === 'AR' ? 'لا توجد فعاليات تطابق اختيارك.' : 'No activities match your selection.'}
          </div>
        )}
      </div>
    </div>
  );
};

const CurrencyCalc: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="py-12 container mx-auto px-4 text-center">
    <div className="max-w-md mx-auto bg-white p-12 rounded-[3.5rem] shadow-2xl border border-blue-50">
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-blue-50 p-6 rounded-3xl"><span className="font-black text-blue-900">1 USD</span><span className="font-black text-red-600">56.10 PHP</span></div>
        <div className="flex justify-between items-center bg-blue-50 p-6 rounded-3xl"><span className="font-black text-blue-900">1 SAR</span><span className="font-black text-red-600">14.95 PHP</span></div>
      </div>
    </div>
  </div>
);

const BookingView: React.FC<{ navigateTo: (v: any) => void; lang: Language }> = ({ navigateTo, lang }) => {
  const [done, setDone] = useState(false);
  if (done) return <div className="h-[40vh] flex flex-col items-center justify-center animate-in fade-in">
    <div className="text-6xl mb-6">✅</div>
    <h3 className="text-3xl font-black text-blue-900 mb-2">{lang === 'AR' ? 'تم استلام طلبك!' : 'Request Received!'}</h3>
    <p className="text-gray-500 font-bold">{lang === 'AR' ? 'سيتواصل معك مستشارنا عبر الواتساب قريباً.' : 'Our consultant will WhatsApp you soon.'}</p>
  </div>;
  return (
    <div className="py-12 container mx-auto px-4 max-w-xl text-center">
      <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-6">
        <div className="space-y-4">
          <input placeholder={lang === 'AR' ? 'الاسم بالكامل' : 'Full Name'} className="w-full p-5 bg-white border border-gray-100 rounded-3xl shadow-sm outline-none focus:border-red-600 transition-colors" required />
          <input type="tel" placeholder={lang === 'AR' ? 'رقم الواتساب مع رمز الدولة' : 'WhatsApp with Country Code'} className="w-full p-5 bg-white border border-gray-100 rounded-3xl shadow-sm outline-none focus:border-red-600 transition-colors" required />
          <textarea rows={4} placeholder={lang === 'AR' ? 'ما هي الجزر أو الأنشطة التي تهمك؟' : 'Which islands or activities interest you?'} className="w-full p-5 bg-white border border-gray-100 rounded-3xl shadow-sm outline-none focus:border-red-600 transition-colors"></textarea>
        </div>
        <button type="submit" className="w-full bg-red-600 text-white py-6 rounded-[2.5rem] font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
          {lang === 'AR' ? 'إرسال طلب الحجز' : 'Send Booking Request'}
        </button>
      </form>
    </div>
  );
};

const AIChatbot: React.FC<{ lang: Language }> = ({ lang }) => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState([{ role: 'bot', text: 'Mabuhay! How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!input.trim() || loading) return;
    const txt = input; setInput('');
    setMsg(prev => [...prev, { role: 'user', text: txt }]);
    setLoading(true);
    const reply = await getChatbotResponse(txt);
    setMsg(prev => [...prev, { role: 'bot', text: reply }]);
    setLoading(false);
  };

  return (
    <div className={`fixed bottom-24 md:bottom-32 ${lang === 'AR' ? 'left-8' : 'right-8'} z-[150]`}>
      {open && (
        <div className="absolute bottom-20 inset-x-0 md:w-96 h-[32rem] bg-white rounded-[2.5rem] shadow-2xl border border-blue-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-900 p-6 text-white font-black flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Mabuhay AI</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-2xl hover:scale-110 transition-transform">&times;</button>
          </div>
          <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-gray-50/50">
            {msg.map((m, i) => (
              <div key={i} className={`p-4 rounded-2xl text-xs leading-relaxed font-bold shadow-sm ${m.role === 'user' ? 'bg-red-600 text-white ml-8 rounded-br-none' : 'bg-white text-blue-900 mr-8 rounded-bl-none border border-blue-50'}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="text-gray-400 text-[10px] animate-pulse">AI is thinking...</div>}
          </div>
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyPress={e => e.key === 'Enter' && handle()} 
              placeholder={lang === 'AR' ? 'اسألني أي شيء...' : 'Ask me anything...'}
              className="flex-grow p-4 bg-gray-100 rounded-2xl outline-none focus:bg-white focus:border-blue-900 border border-transparent transition-all text-xs font-bold" 
            />
            <button 
              onClick={handle} 
              disabled={loading}
              className="bg-blue-900 text-white px-6 rounded-2xl font-black disabled:opacity-50"
            >
              ✓
            </button>
          </div>
        </div>
      )}
      <button 
        onClick={() => setOpen(!open)} 
        className="w-16 h-16 bg-blue-900 rounded-3xl text-white shadow-2xl flex items-center justify-center font-black text-xl hover:scale-110 active:scale-95 transition-all group"
      >
        <span className="group-hover:rotate-12 transition-transform">AI</span>
      </button>
    </div>
  );
};

const Footer: React.FC<{ lang: Language; navigateTo: (v: any) => void; t: any; isAdmin: boolean }> = ({ lang, navigateTo, t, isAdmin }) => (
  <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
    <div className="container mx-auto px-4">
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 ${lang === 'AR' ? 'text-right' : 'text-left'} mb-20`}>
        {/* Column 1: About Us */}
        <div className="space-y-6">
          <PHLogo />
          <p className="text-gray-500 text-sm leading-relaxed font-bold">
            {lang === 'AR' 
              ? 'موبهاي للسياحة - بوابتك لاستكشف أجمل جزر الفلبين وتجربة حياة المدن العصرية بلمسة عربية أصيلة. نحن نضمن لك رحلة لا تُنسى.' 
              : 'Mabuhay Travel - Your gateway to exploring the most beautiful islands in the Philippines and experiencing modern city life with an authentic Arabic touch.'}
          </p>
          <div className="flex gap-4">
            <SocialIcon icon="FB" />
            <SocialIcon icon="IG" />
            <SocialIcon icon="SNAP" />
            <SocialIcon icon="TIK" />
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-blue-900 font-black text-sm mb-8 uppercase tracking-widest">{lang === 'AR' ? 'روابط سريعة' : 'Quick Links'}</h4>
          <ul className="space-y-4 text-xs font-bold text-gray-500">
            <FooterLink onClick={() => navigateTo('HOME')}>{t.navHome[lang]}</FooterLink>
            <FooterLink onClick={() => navigateTo('ABOUT_PH')}>{t.navAboutPH[lang]}</FooterLink>
            <FooterLink onClick={() => navigateTo('VISA_INFO')}>{t.navVisa[lang]}</FooterLink>
            <FooterLink onClick={() => navigateTo('BOOKING')}>{t.navBook[lang]}</FooterLink>
          </ul>
        </div>

        {/* Column 3: Explore */}
        <div>
          <h4 className="text-blue-900 font-black text-sm mb-8 uppercase tracking-widest">{lang === 'AR' ? 'استكشف' : 'Explore'}</h4>
          <ul className="space-y-4 text-xs font-bold text-gray-500">
            <FooterLink onClick={() => navigateTo('ISLANDS')}>{t.navIslands[lang]}</FooterLink>
            <FooterLink onClick={() => navigateTo('MANILA')}>{t.navManila[lang]}</FooterLink>
            <FooterLink onClick={() => navigateTo('ACTIVITIES')}>{t.navActivities[lang]}</FooterLink>
            <FooterLink onClick={() => navigateTo('SHOPPING')}>{t.navShopping[lang]}</FooterLink>
            <FooterLink onClick={() => navigateTo('RESTAURANTS')}>{t.navDining[lang]}</FooterLink>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h4 className="text-blue-900 font-black text-sm mb-8 uppercase tracking-widest">{lang === 'AR' ? 'تواصل معنا' : 'Contact Us'}</h4>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
               <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-all">📧</div>
               <div className="flex flex-col">
                 <span className="text-[10px] text-gray-400 uppercase font-black">{lang === 'AR' ? 'البريد الإلكتروني' : 'Email Address'}</span>
                 <a href="mailto:info@mabuhay.travel" className="text-xs font-black text-blue-900">info@mabuhay.travel</a>
               </div>
            </div>
            <div className="flex items-center gap-4 group">
               <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">📞</div>
               <div className="flex flex-col">
                 <span className="text-[10px] text-gray-400 uppercase font-black">{lang === 'AR' ? 'رقم الهاتف' : 'Phone Number'}</span>
                 <span className="text-xs font-black text-blue-900" dir="ltr">+63 912 345 6789</span>
               </div>
            </div>
            <button onClick={() => navigateTo('BOOKING')} className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black text-xs shadow-xl hover:bg-red-600 transition-colors">
              {lang === 'AR' ? 'نموذج الاتصال' : 'Contact Form'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
          {lang === 'AR' ? '© موبهاي للسياحة 2026. جميع الحقوق محفوظة.' : '© Mabuhay Travel 2026. All rights reserved.'}
        </p>
        <div className="flex gap-8 flex-wrap justify-center">
          <button className="text-[10px] font-black text-gray-400 hover:text-blue-900 uppercase tracking-widest">{lang === 'AR' ? 'سياسة الخصوصية' : 'Privacy Policy'}</button>
          <button className="text-[10px] font-black text-gray-400 hover:text-blue-900 uppercase tracking-widest">{lang === 'AR' ? 'الشروط والأحكام' : 'Terms & Conditions'}</button>
          <button className="text-[10px] font-black text-gray-400 hover:text-blue-900 uppercase tracking-widest">{lang === 'AR' ? 'خريطة الموقع' : 'Sitemap'}</button>
          {isAdmin && (
            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Logged as Admin</span>
          )}
        </div>
      </div>
    </div>
  </footer>
);

const FooterLink: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <li onClick={onClick} className="cursor-pointer hover:text-red-600 transition-colors flex items-center gap-2">
    <span className="text-red-600 text-[10px]">●</span>
    {children}
  </li>
);

const SocialIcon: React.FC<{ icon: string }> = ({ icon }) => (
  <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-900 hover:bg-blue-900 hover:text-white transition-all cursor-pointer shadow-sm">
    <span className="text-xs font-black">{icon}</span>
  </div>
);
