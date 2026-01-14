
import React from 'react';
import { Attraction, Language, SiteData } from './types';

export const INITIAL_TRANSLATIONS: Record<string, Record<Language, string>> = {
  navHome: { AR: 'الرئيسية', EN: 'Home', PH: 'Home' },
  navIslands: { AR: 'الجزر السياحية', EN: 'Islands', PH: 'Mga Isla' },
  navManila: { AR: 'أحياء مانيلا', EN: 'Manila Districts', PH: 'Maynila' },
  navShopping: { AR: 'التسوق والمولات', EN: 'Shopping', PH: 'Pamimili' },
  navDining: { AR: 'مطاعم عربية', EN: 'Dining', PH: 'Kainan' },
  navActivities: { AR: 'الفعاليات والأنشطة', EN: 'Activities', PH: 'Aktibidad' },
  navTravelInfo: { AR: 'دليل المسافر', EN: 'Travel Info', PH: 'Impormasyon' },
  navBook: { AR: 'احجز الآن', EN: 'Book Now', PH: 'Mag-book' },
  navVisa: { AR: 'أمور الفيزا للفلبين', EN: 'Visa Guide', PH: 'Visa' },
  navAboutPH: { AR: 'عن الفلبين', EN: 'About PH', PH: 'Tungkol sa PH' },
};

export const VISA_DATA = [
  {
    category: { AR: 'أنواع الفيزا', EN: 'Visa Types' },
    items: [
      {
        title: { AR: 'فيزا سياحية (9A)', EN: 'Tourist Visa (9A)' },
        details: { AR: 'للزيارات القصيرة، السياحة، أو زيارة الأقارب. تمنح عادة لمدة 30 إلى 59 يوماً.', EN: 'For short stays, tourism, or visiting relatives. Usually granted for 30-59 days.' }
      },
      {
        title: { AR: 'فيزا عمل (9G)', EN: 'Work Visa (9G)' },
        details: { AR: 'مخصصة للأجانب الذين يعتزمون التوظيف في شركات مسجلة في الفلبين.', EN: 'For foreigners intended for employment in registered PH companies.' }
      },
      {
        title: { AR: 'فيزا دراسة (9F)', EN: 'Student Visa (9F)' },
        details: { AR: 'للطلاب المسجلين في جامعات أو معاهد تعليمية معترف بها في الفلبين.', EN: 'For students enrolled in recognized PH universities or institutes.' }
      },
      {
        title: { AR: 'فيزا إقامة طويلة (SRRV)', EN: 'Special Resident Retiree\'s Visa (SRRV)' },
        details: { AR: 'برنامج للمتقاعدين يتيح الإقامة الدائمة بمزايا متعددة.', EN: 'Retirement program allowing permanent residency with multiple benefits.' }
      }
    ]
  },
  {
    category: { AR: 'المتطلبات العامة', EN: 'General Requirements' },
    items: [
      {
        title: { AR: 'جواز السفر', EN: 'Passport' },
        details: { AR: 'يجب أن يكون صالحاً لمدة 6 أشهر على الأقل من تاريخ الدخول.', EN: 'Must be valid for at least 6 months from entry date.' }
      },
      {
        title: { AR: 'الصور الشخصية', EN: 'Photos' },
        details: { AR: 'صورتان حديثتان بخلفية بيضاء (حجم جواز السفر).', EN: 'Two recent white background photos (passport size).' }
      },
      {
        title: { AR: 'نموذج الطلب', EN: 'Application Form' },
        details: { AR: 'تعبئة النموذج الخاص بالسفارة بدقة وتوقيعه.', EN: 'Complete embassy form accurately and sign it.' }
      },
      {
        title: { AR: 'إثبات مالي', EN: 'Financial Proof' },
        details: { AR: 'كشف حساب بنكي لآخر 3-6 أشهر أو شهادة راتب.', EN: 'Bank statement for last 3-6 months or salary certificate.' }
      }
    ]
  },
  {
    category: { AR: 'إجراءات التقديم', EN: 'Application Procedures' },
    items: [
      {
        title: { AR: 'عبر السفارة أو القنصلية', EN: 'Via Embassy or Consulate' },
        details: { AR: 'التقديم يدوياً في بلد الإقامة وحجز موعد مسبق.', EN: 'Apply manually in your country of residence by booking an appointment.' }
      },
      {
        title: { AR: 'التقديم الإلكتروني (e-Visa)', EN: 'Online e-Visa' },
        details: { AR: 'متوفر لبعض الجنسيات عبر الموقع الرسمي للحكومة الفلبينية.', EN: 'Available for some nationalities via the official government portal.' }
      }
    ]
  }
];

export const INITIAL_HERO_SLIDES = [
  {
    id: 'hero-1',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1920',
    title: { AR: 'إل نيدو: جنة البحيرات', EN: 'El Nido: Lagoon Paradise', PH: 'El Nido' },
    subtitle: { AR: 'استكشف أجمل البحيرات المخفية في جزيرة بالوان الساحرة.', EN: 'Discover the most stunning hidden lagoons in enchanting Palawan.', PH: 'Palawan.' }
  },
  {
    id: 'hero-2',
    image: 'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=1920',
    title: { AR: 'مانيلا: أفق المستقبل', EN: 'Manila: Future Skyline', PH: 'Maynila' },
    subtitle: { AR: 'استمتع بحياة الرفاهية في أرقى أحياء العاصمة مانيلا BGC.', EN: 'Experience luxury living in BGC, Manila\'s premier district.', PH: 'BGC.' }
  },
  {
    id: 'hero-3',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920',
    title: { AR: 'بوراكاي: الرمال البيضاء', EN: 'Boracay: Pure White Sands', PH: 'Boracay' },
    subtitle: { AR: 'استرخِ على رمال شاطئ وايت بيتش المصنف الأفضل عالمياً.', EN: 'Relax on the world-renowned sands of White Beach.', PH: 'Boracay.' }
  },
  {
    id: 'hero-4',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=1920',
    title: { AR: 'كورون: مياه الكريستال', EN: 'Coron: Crystal Waters', PH: 'Coron' },
    subtitle: { AR: 'اكتشف أنقى البحيرات العذبة وسط منحدرات بالوان الكلسية.', EN: 'Discover the purest lakes amidst Palawan\'s limestone cliffs.', PH: 'Coron.' }
  },
  {
    id: 'hero-5',
    image: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1920',
    title: { AR: 'ماكاتي: نبض الحياة', EN: 'Makati: Heartbeat of the City', PH: 'Makati' },
    subtitle: { AR: 'تسوق واسكن في المركز المالي العالمي النابض بالحياة.', EN: 'Shop and stay in the vibrant global financial center.', PH: 'Makati.' }
  }
];

export const DEFAULT_SITE_DATA: SiteData = {
  heroSlides: INITIAL_HERO_SLIDES,
  islands: [
    {
        id: 'boracay',
        name: { AR: 'جزيرة بوراكاي (Boracay)', EN: 'Boracay Island', PH: 'Boracay' },
        description: { AR: 'أشهر جزيرة في الفلبين، تمتاز بالرمال البيضاء الناعمة والمياه الفيروزية الصافية والأنشطة الليلية الحيوية.', EN: 'Famous for its White Beach and powder-soft sand.', PH: 'Puting Buhangin.' },
        images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
          'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200',
          'https://images.unsplash.com/photo-1540202404-a2f29016bb5d?q=80&w=1200',
          'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=1200'
        ],
        location: { AR: 'أكلان (Aklan)', EN: 'Aklan', PH: 'Aklan' },
        bestFor: { AR: 'عائلات / عرسان', EN: 'Families/Couples', PH: 'Lahat' },
        category: 'ISLAND'
    },
    {
        id: 'palawan-elnido',
        name: { AR: 'إل نيدو (Palawan - El Nido)', EN: 'El Nido, Palawan', PH: 'El Nido' },
        description: { AR: 'جنة البحيرات المخفية والمنحدرات الكلسية المذهلة.', EN: 'The gateway to Bacuit Archipelago with stunning lagoons.', PH: 'Paraiso.' },
        images: [
          'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200',
          'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=1200',
          'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200',
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200'
        ],
        location: { AR: 'بالوان (Palawan)', EN: 'Palawan', PH: 'Palawan' },
        bestFor: { AR: 'عرسان / مغامرين', EN: 'Couples/Adventurers', PH: 'Maganda' },
        category: 'ISLAND'
    }
  ],
  manilaDistricts: [
    {
        id: 'bgc',
        name: { AR: 'بي جي سي (Bonifacio Global City)', EN: 'BGC', PH: 'BGC' },
        description: { AR: 'الحي الأكثر حداثة وتطوراً في مانيلا، يشبه المدن العالمية بشوارعه المنظمة وفنه العام.', EN: 'The most modern and walkable financial district in Metro Manila.', PH: 'BGC.' },
        images: [
            'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=1200',
            'https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=1200',
            'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=1200',
            'https://images.unsplash.com/photo-1583267746897-2cf415888172?q=80&w=1200'
        ],
        location: { AR: 'تاغويغ، مانيلا', EN: 'Taguig, Manila', PH: 'Taguig' },
        bestFor: { AR: 'سكن فاخر / عائلات', EN: 'Luxury / Families', PH: 'Lahat' },
        category: 'MANILA'
    },
    {
        id: 'makati',
        name: { AR: 'حي ماكاتي (Makati City)', EN: 'Makati', PH: 'Makati' },
        description: { AR: 'القلب النابض للاقتصاد، يضم ناطحات السحاب الفاخرة وأهم مراكز التسوق العالمية.', EN: 'The central business hub with luxury hotels and premium malls.', PH: 'Negosyo.' },
        images: [
            'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1200',
            'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=1200',
            'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=1200',
            'https://images.unsplash.com/photo-1567401767324-df359487c67c?q=80&w=1200'
        ],
        location: { AR: 'ماكاتي، مانيلا', EN: 'Makati, Manila', PH: 'Makati' },
        bestFor: { AR: 'تسوق / رجال أعمال', EN: 'Shopping / Business', PH: 'Negosyo' },
        category: 'MANILA'
    },
    {
        id: 'ortigas-center',
        name: { AR: 'أورتيجاس سنتر (Ortigas)', EN: 'Ortigas Center', PH: 'Ortigas' },
        description: { AR: 'مركز أعمال ضخم يضم بعضاً من أكبر المولات في العالم مثل SM Megamall و Shangri-La.', EN: 'A major business hub housing world-class mega malls.', PH: 'Ortigas.' },
        images: [
            'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=1200',
            'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=1200',
            'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1200',
            'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1200'
        ],
        location: { AR: 'ماندالويونغ / باسيج', EN: 'Mandaluyong / Pasig', PH: 'Pasig' },
        bestFor: { AR: 'تسوق / تسوق ضخم', EN: 'Mega Shopping', PH: 'Shopping' },
        category: 'MANILA'
    },
    {
        id: 'quezon-city',
        name: { AR: 'كيزون سيتي (Quezon City)', EN: 'Quezon City', PH: 'QC' },
        description: { AR: 'أكبر مدينة في مانيلا، تتميز بالحدائق الكبيرة، المطاعم الفنية، والحياة الليلية الحيوية في توماس موراتو.', EN: 'The city of stars, known for large parks and vibrant dining scenes.', PH: 'QC.' },
        images: [
            'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1200',
            'https://images.unsplash.com/photo-1528150230182-163f97194600?q=80&w=1200',
            'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200'
        ],
        location: { AR: 'شمال مانيلا', EN: 'North Manila', PH: 'QC' },
        bestFor: { AR: 'شباب / عائلات / طعام', EN: 'Youth / Families / Food', PH: 'Pamilya' },
        category: 'MANILA'
    },
    {
        id: 'manila-bay',
        name: { AR: 'منطقة خليج مانيلا (Manila Bay)', EN: 'Manila Bay Area', PH: 'Bay' },
        description: { AR: 'موطن الغروب الأسطوري، ومدينة الترفيه (Entertainment City) التي تضم أفخم المنتجعات والكازينوهات.', EN: 'Home of the legendary sunset and world-class integrated resorts.', PH: 'Manila' },
        images: [
            'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=1200',
            'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1200',
            'https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=1200',
            'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=1200'
        ],
        location: { AR: 'باي ووك، مانيلا', EN: 'Baywalk, Manila', PH: 'Manila' },
        bestFor: { AR: 'عرسان / ترفيه / فنادق', EN: 'Couples / Entertainment', PH: 'Ganda' },
        category: 'MANILA'
    },
    {
        id: 'alabang',
        name: { AR: 'ألابانغ (Alabang)', EN: 'Alabang', PH: 'Alabang' },
        description: { AR: 'منطقة النخبة في الجنوب، تتميز بالهدوء والمساحات الخضراء الواسعة والمولات المفتوحة الراقية.', EN: 'The upscale business district in the south with a relaxed vibe.', PH: 'South' },
        images: [
            'https://images.unsplash.com/photo-1542614393-3652873499f5?q=80&w=1200',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200',
            'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1200',
            'https://images.unsplash.com/photo-1533481405265-e9ce0c044abb?q=80&w=1200'
        ],
        location: { AR: 'مونتنلوبا، الجنوب', EN: 'Muntinlupa, South', PH: 'Alabang' },
        bestFor: { AR: 'سكن هادئ / عائلات', EN: 'Quiet Stay / Families', PH: 'Tahimik' },
        category: 'MANILA'
    },
    {
        id: 'rockwell',
        name: { AR: 'روكويل سنتر (Rockwell)', EN: 'Rockwell Center', PH: 'Rockwell' },
        description: { AR: 'أرقى مجمع سكني وتجاري في مانيلا، يمثل قمة الرفاهية والأمان والخصوصية.', EN: 'The height of luxury and security in Metro Manila.', PH: 'Rockwell' },
        images: [
            'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=1200',
            'https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=1200',
            'https://images.unsplash.com/photo-1523413363574-c3c4447df0d5?q=80&w=1200',
            'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=1200'
        ],
        location: { AR: 'ماكاتي، مانيلا', EN: 'Makati, Manila', PH: 'Makati' },
        bestFor: { AR: 'سكن فائق الفخامة', EN: 'Ultra Luxury', PH: 'Yaman' },
        category: 'MANILA'
    },
    {
        id: 'pasay-city',
        name: { AR: 'باساي سيتي (Pasay)', EN: 'Pasay City', PH: 'Pasay' },
        description: { AR: 'بوابة الفلبين للعالم، تضم المطار ومول أوف آسيا الضخم ومدن الملاهي العالمية.', EN: 'Gateway to PH, featuring massive malls and theme parks.', PH: 'Pasay' },
        images: [
            'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1200',
            'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200',
            'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=1200',
            'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1200'
        ],
        location: { AR: 'غرب مانيلا', EN: 'West Manila', PH: 'Pasay' },
        bestFor: { AR: 'سياحة سريعة / تسوق / شباب', EN: 'Short Stays / Shopping', PH: 'Lahat' },
        category: 'MANILA'
    }
  ],
  shopping: [
    {
        id: 'sm-moa',
        name: { AR: 'إس إم مول أوف آسيا (SM MOA)', EN: 'SM Mall of Asia', PH: 'MOA' },
        description: { AR: 'من أكبر المولات في العالم، يضم صالة تزلج وإطلالة رائعة على خليج مانيلا.', EN: 'One of the largest malls in the world with a sunset view.', PH: 'Napakalaki.' },
        images: [
            'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1200',
            'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=1200',
            'https://images.unsplash.com/photo-1567401767324-df359487c67c?q=80&w=1200',
            'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1200'
        ],
        location: { AR: 'باساي، مانيلا', EN: 'Pasay', PH: 'Pasay' },
        bestFor: { AR: 'كل شيء / عائلات', EN: 'Everything / Families', PH: 'Lahat' },
        category: 'SHOPPING'
    },
    {
        id: 'sm-aura',
        name: { AR: 'إس إم أورا بريمير (SM Aura)', EN: 'SM Aura Premier', PH: 'Aura' },
        description: { AR: 'مول فاخر في قلب BGC يتميز بتصميمه المعماري الفريد وحديقته العلوية.', EN: 'A high-end mall in BGC with an eco-friendly roof garden.', PH: 'Aura' },
        images: [
            'https://images.unsplash.com/photo-1567401767324-df359487c67c?q=80&w=1200',
            'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=1200',
            'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1200',
            'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1200'
        ],
        location: { AR: 'BGC، تاغويغ', EN: 'BGC, Taguig', PH: 'Taguig' },
        bestFor: { AR: 'ماركات عالمية / فخامة', EN: 'Global Brands / Luxury', PH: 'Lahat' },
        category: 'SHOPPING'
    }
  ],
  restaurants: [
    {
        id: 'shawarma-snack-center',
        name: { AR: 'شاورما سناك سنتر (SSC)', EN: 'Shawarma Snack Center', PH: 'SSC' },
        description: { AR: 'أقدم وأشهر مطعم عربي في مانيلا، يقدم أفضل الأطباق العربية التقليدية.', EN: 'Famous Arabic restaurant in Manila.', PH: 'Masarap.' },
        images: [
            'https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=1200',
            'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1200',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200',
            'https://images.unsplash.com/photo-1633964913295-ceb43826e799?q=80&w=1200'
        ],
        location: { AR: 'إرميتا، مانيلا', EN: 'Ermita, Manila', PH: 'Manila' },
        bestFor: { AR: 'طعام حلال / شاورما', EN: 'Halal Food', PH: 'Kainan' },
        category: 'RESTAURANT',
        halal: true
    },
    {
        id: 'tarboosh-manila',
        name: { AR: 'مطعم طربوش (Tarboosh)', EN: 'Tarboosh Restaurant', PH: 'Tarboosh' },
        description: { AR: 'مطعم شامي أصيل يشتهر بالمشويات العربية الفاخرة والشاورما والخبز الطازج، وجهة مفضلة للجالية العربية.', EN: 'Authentic Levantine restaurant famous for its grills and fresh bread.', PH: 'Masarap' },
        images: [
            'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1200',
            'https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=1200',
            'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1200',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200'
        ],
        location: { AR: 'مانيلا', EN: 'Manila', PH: 'Manila' },
        bestFor: { AR: 'طعام حلال / مشويات / عائلات', EN: 'Halal / Grills', PH: 'Lahat' },
        category: 'RESTAURANT',
        halal: true
    },
    {
        id: 'al-qaisar-manila',
        name: { AR: 'مطعم القيصر (Al-Qaisar)', EN: 'Al-Qaisar Restaurant', PH: 'Al-Qaisar' },
        description: { AR: 'يقدم تشكيلة رائعة من الأطباق العربية والعراقية بلمسة تقليدية وجودة عالية في قلب مانيلا.', EN: 'Offers a great selection of Arabic and Iraqi dishes in Manila.', PH: 'Kainan' },
        images: [
            'https://images.unsplash.com/photo-1590593162211-f1f0a28f898c?q=80&w=1200',
            'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1200',
            'https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=1200',
            'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=1200'
        ],
        location: { AR: 'مانيلا', EN: 'Manila', PH: 'Manila' },
        bestFor: { AR: 'طعام حلال / أطباق عربية', EN: 'Halal / Arabic Dishes', PH: 'Masarap' },
        category: 'RESTAURANT',
        halal: true
    },
    {
        id: 'hosseins-manila',
        name: { AR: 'مطعم حسين (Hossein\'s)', EN: 'Hossein\'s Persian Kebab', PH: 'Hossein' },
        description: { AR: 'من أرقى المطاعم في مانيلا، يقدم مزيجاً فريداً من المطبخ العربي والفارسي والهندي في أجواء فاخرة.', EN: 'One of Manila\'s finest, offering Arabic, Persian, and Indian fusion.', PH: 'Yaman' },
        images: [
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200',
            'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200',
            'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1200',
            'https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=1200'
        ],
        location: { AR: 'ماكاتي، مانيلا', EN: 'Makati, Manila', PH: 'Makati' },
        bestFor: { AR: 'طعام حلال / جلسات راقية', EN: 'Halal / Fine Dining', PH: 'Lahat' },
        category: 'RESTAURANT',
        halal: true
    },
    {
        id: 'hummus-elijah',
        name: { AR: 'حمص إيليا (Hummus Elijah)', EN: 'Hummus Elijah', PH: 'Hummus' },
        description: { AR: 'يُعرف بتقديم أفضل حمص وفلافل في مانيلا، مفتوح 24 ساعة ويعد وجهة مثالية لمحبي الأكل الصحي.', EN: 'Best hummus and falafel in Manila, open 24/7.', PH: 'Healthy' },
        images: [
            'https://images.unsplash.com/photo-1547050605-2f88f8df4661?q=80&w=1200',
            'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1200',
            'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1200',
            'https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=1200'
        ],
        location: { AR: 'ماكاتي، مانيلا', EN: 'Makati, Manila', PH: 'Makati' },
        bestFor: { AR: 'طعام حلال / نباتي / حمص', EN: 'Halal / Vegan / Hummus', PH: 'Kainan' },
        category: 'RESTAURANT',
        halal: true
    },
    {
        id: 'abouds-manila',
        name: { AR: 'مطعم عبود (Aboud\'s)', EN: 'Aboud\'s Arabic Restaurant', PH: 'Aboud' },
        description: { AR: 'مطعم سعودي بلمسة منزلية دافئة، يقدم الكبسة والمندي والأطباق الخليجية الأصلية بجودة ممتازة.', EN: 'A cozy Saudi restaurant offering authentic Kabsa and Mandi.', PH: 'Masarap' },
        images: [
            'https://images.unsplash.com/photo-1633964913295-ceb43826e799?q=80&w=1200',
            'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=1200',
            'https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=1200',
            'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=1200'
        ],
        location: { AR: 'إرميتا، مانيلا', EN: 'Ermita, Manila', PH: 'Manila' },
        bestFor: { AR: 'طعام حلال / كبسة / خليجي', EN: 'Halal / Kabsa / Khaleeji', PH: 'Pamilya' },
        category: 'RESTAURANT',
        halal: true
    }
  ],
  activities: [
    {
        id: 'act-boracay-hopping',
        name: { AR: 'جولة القوارب في بوراكاي (Island Hopping)', EN: 'Boracay Island Hopping', PH: 'Hopping' },
        description: { AR: 'استكشف أجمل شواطئ بوراكاي المخفية مع الغوص السطحي ووجبة غداء بحرية.', EN: 'Explore hidden beaches with snorkeling and seafood lunch.', PH: 'Maganda' },
        images: [
            'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200',
            'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=1200',
            'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200'
        ],
        location: { AR: 'جزيرة بوراكاي', EN: 'Boracay Island', PH: 'Aklan' },
        duration: { AR: '4 ساعات', EN: '4 Hours', PH: 'Oras' },
        level: { AR: 'هادئ', EN: 'Calm', PH: 'Madali' },
        bestFor: { AR: 'عائلات / عرسان / شباب', EN: 'Families/Couples/Youth', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'MARINE'
    },
    {
        id: 'act-coron-diving',
        name: { AR: 'غوص حطام السفن في كورون', EN: 'Coron Shipwreck Diving', PH: 'Diving' },
        description: { AR: 'تجربة غوص فريدة لاستكشاف السفن اليابانية الغارقة من الحرب العالمية الثانية.', EN: 'Unique diving experience exploring WWII Japanese shipwrecks.', PH: 'Diving' },
        images: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200',
            'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1200',
            'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200'
        ],
        location: { AR: 'جزيرة كورون', EN: 'Coron Island', PH: 'Palawan' },
        duration: { AR: '6 ساعات', EN: '6 Hours', PH: 'Oras' },
        level: { AR: 'مغامرة', EN: 'Adventure', PH: 'Mahirap' },
        bestFor: { AR: 'شباب / غواصين', EN: 'Youth/Divers', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'MARINE'
    },
    {
        id: 'act-underground-river',
        name: { AR: 'النهر الجوفي في بورتو برينسيسا', EN: 'Underground River Tour', PH: 'River' },
        description: { AR: 'جولة في أحد عجائب الدنيا السبع الطبيعية الجديدة عبر كهوف مذهلة.', EN: 'A tour of a New 7 Wonder of Nature through stunning caves.', PH: 'Palawan' },
        images: [
            'https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=1200',
            'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2000',
            'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200'
        ],
        location: { AR: 'بورتو برينسيسا', EN: 'Puerto Princesa', PH: 'Palawan' },
        duration: { AR: '5 ساعات', EN: '5 Hours', PH: 'Oras' },
        level: { AR: 'متوسط', EN: 'Medium', PH: 'Sakto' },
        bestFor: { AR: 'عائلات / عرسان', EN: 'Families/Couples', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'ADVENTURE'
    },
    {
        id: 'act-manila-sunset',
        name: { AR: 'مشاهدة الغروب في خليج مانيلا', EN: 'Manila Bay Sunset View', PH: 'Sunset' },
        description: { AR: 'استمتع بأجمل مشهد لغروب الشمس في جنوب شرق آسيا من ممشى الخليج.', EN: 'Enjoy the most beautiful sunset in SE Asia from the Baywalk.', PH: 'Maynila' },
        images: [
            'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=1200',
            'https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=1200',
            'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=1200'
        ],
        location: { AR: 'مانيلا', EN: 'Manila', PH: 'Maynila' },
        duration: { AR: '2 ساعة', EN: '2 Hours', PH: 'Oras' },
        level: { AR: 'هادئ', EN: 'Calm', PH: 'Madali' },
        bestFor: { AR: 'عرسان / عائلات', EN: 'Couples/Families', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'ROMANTIC'
    },
    {
        id: 'act-bohol-zipline',
        name: { AR: 'زيبلين فوق الغابات في بوهول', EN: 'Bohol Forest Zipline', PH: 'Zipline' },
        description: { AR: 'طيران بارتفاع شاهق فوق الغابات الكثيفة والأنهار في قلب جزيرة بوهول.', EN: 'High-altitude flight over dense forests and rivers in Bohol.', PH: 'Bohol' },
        images: [
            'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1200',
            'https://images.unsplash.com/photo-1528150230182-163f97194600?q=80&w=1200',
            'https://images.unsplash.com/photo-1511497584788-8767fe7718f2?q=80&w=1200'
        ],
        location: { AR: 'جزيرة بوهول', EN: 'Bohol Island', PH: 'Bohol' },
        duration: { AR: '1 ساعة', EN: '1 Hour', PH: 'Oras' },
        level: { AR: 'مغامرة', EN: 'Adventure', PH: 'Masaya' },
        bestFor: { AR: 'شباب / مغامرين', EN: 'Youth/Adventurers', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'ADVENTURE'
    },
    {
        id: 'act-mayon-atv',
        name: { AR: 'جولة ATV حول بركان مايون', EN: 'Mayon Volcano ATV Tour', PH: 'ATV' },
        description: { AR: 'مغامرة ركوب سيارات الدفع الرباعي في مسارات بركانية تحت ظلال أجمل بركان بالعالم.', EN: 'ATV adventure on volcanic trails under the world\'s most perfect cone.', PH: 'Luzon' },
        images: [
            'https://images.unsplash.com/photo-1533481405265-e9ce0c044abb?q=80&w=1200',
            'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1200',
            'https://images.unsplash.com/photo-1528150230182-163f97194600?q=80&w=1200'
        ],
        location: { AR: 'ليغازبي', EN: 'Legazpi', PH: 'Albany' },
        duration: { AR: '3 ساعات', EN: '3 Hours', PH: 'Oras' },
        level: { AR: 'مغامرة', EN: 'Adventure', PH: 'Masaya' },
        bestFor: { AR: 'شباب / مغامرين', EN: 'Youth/Adventurers', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'ADVENTURE'
    },
    {
        id: 'act-kawasan-falls',
        name: { AR: 'كانونييرينج شلالات كاواسان', EN: 'Kawasan Falls Canyoneering', PH: 'Falls' },
        description: { AR: 'القفز من المرتفعات والسباحة في مياه الفيروز في أشهر شلالات سيبو.', EN: 'Cliff jumping and swimming in turquoise waters in Cebu\'s famous falls.', PH: 'Cebu' },
        images: [
            'https://images.unsplash.com/photo-1528150230182-163f97194600?q=80&w=1200',
            'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1200',
            'https://images.unsplash.com/photo-1511497584788-8767fe7718f2?q=80&w=1200'
        ],
        location: { AR: 'سيبو', EN: 'Cebu', PH: 'Cebu' },
        duration: { AR: '5 ساعات', EN: '5 Hours', PH: 'Oras' },
        level: { AR: 'مغامرة', EN: 'Adventure', PH: 'Masaya' },
        bestFor: { AR: 'شباب / مغامرين', EN: 'Youth/Adventurers', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'MARINE'
    },
    {
        id: 'act-pagsanjan-falls',
        name: { AR: 'التجديف في نهر باكسانجان', EN: 'Pagsanjan River Rafting', PH: 'Rafting' },
        description: { AR: 'رحلة مثيرة عبر المنحدرات النهرية وصولاً إلى الشلال العظيم.', EN: 'An exciting trip through river rapids reaching the Great Falls.', PH: 'Laguna' },
        images: [
            'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=1200',
            'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200',
            'https://images.unsplash.com/photo-1528150230182-163f97194600?q=80&w=1200'
        ],
        location: { AR: 'لاغونا', EN: 'Laguna', PH: 'Luzon' },
        duration: { AR: '4 ساعات', EN: '4 Hours', PH: 'Oras' },
        level: { AR: 'متوسط', EN: 'Medium', PH: 'Sakto' },
        bestFor: { AR: 'عائلات / شباب', EN: 'Families/Youth', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'ADVENTURE'
    },
    {
        id: 'act-elnido-dinner',
        name: { AR: 'عشاء رومانسي خاص على الشاطئ', EN: 'Private Romantic Beach Dinner', PH: 'Dinner' },
        description: { AR: 'عشاء فاخر تحت النجوم في شاطئ خاص بجزيرة إل نيدو مع إضاءة خافتة.', EN: 'Luxury dinner under the stars on a private El Nido beach.', PH: 'El Nido' },
        images: [
            'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=1200',
            'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200',
            'https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=1200'
        ],
        location: { AR: 'إل نيدو', EN: 'El Nido', PH: 'Palawan' },
        duration: { AR: '3 ساعات', EN: '3 Hours', PH: 'Oras' },
        level: { AR: 'هادئ', EN: 'Calm', PH: 'Madali' },
        bestFor: { AR: 'عرسان / شهر عسل', EN: 'Couples/Honeymooners', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'ROMANTIC'
    },
    {
        id: 'act-cultural-show',
        name: { AR: 'عروض الفلكلور الفلبيني في مانيلا', EN: 'Filipino Cultural Folklore Show', PH: 'Show' },
        description: { AR: 'مشاهدة الرقصات التقليدية والملابس الملونة التي تعكس تاريخ الفلبين العريق.', EN: 'Watch traditional dances reflecting the Philippines\' rich history.', PH: 'Maynila' },
        images: [
            'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200',
            'https://images.unsplash.com/photo-1528150230182-163f97194600?q=80&w=1200',
            'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=1200'
        ],
        location: { AR: 'مانيلا', EN: 'Manila', PH: 'Maynila' },
        duration: { AR: '2 ساعة', EN: '2 Hours', PH: 'Oras' },
        level: { AR: 'هادئ', EN: 'Calm', PH: 'Madali' },
        bestFor: { AR: 'عائلات', EN: 'Families', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'CITY'
    },
    {
        id: 'act-ocean-park',
        name: { AR: 'مانيلا أوشن بارك (Ocean Park)', EN: 'Manila Ocean Park Visit', PH: 'Park' },
        description: { AR: 'أكبر حوض أسماك في مانيلا يضم نفقاً زجاجياً وعروضاً لأسود البحر.', EN: 'Manila\'s largest aquarium featuring a glass tunnel and sea lion shows.', PH: 'Maynila' },
        images: [
            'https://images.unsplash.com/photo-1523413363574-c3c4447df0d5?q=80&w=1200',
            'https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=1200',
            'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=1200'
        ],
        location: { AR: 'مانيلا', EN: 'Manila', PH: 'Maynila' },
        duration: { AR: '4 ساعات', EN: '4 Hours', PH: 'Oras' },
        level: { AR: 'هادئ', EN: 'Calm', PH: 'Madali' },
        bestFor: { AR: 'عائلات / أطفال', EN: 'Families/Kids', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'FAMILY'
    },
    {
        id: 'act-eco-park',
        name: { AR: 'التنزه في حديقة لا ميسا إيكو بارك', EN: 'La Mesa Eco Park Nature Walk', PH: 'Park' },
        description: { AR: 'الهروب من ضجيج المدينة في أكبر غابة طبيعية داخل مانيلا.', EN: 'Escape the city noise in Manila\'s largest urban forest.', PH: 'Quezon' },
        images: [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200',
            'https://images.unsplash.com/photo-1511497584788-8767fe7718f2?q=80&w=1200',
            'https://images.unsplash.com/photo-1528150230182-163f97194600?q=80&w=1200'
        ],
        location: { AR: 'كيزون سيتي', EN: 'Quezon City', PH: 'Maynila' },
        duration: { AR: '3 ساعات', EN: '3 Hours', PH: 'Oras' },
        level: { AR: 'هادئ', EN: 'Calm', PH: 'Madali' },
        bestFor: { AR: 'عائلات / هدوء', EN: 'Families/Relaxation', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'CITY'
    },
    {
        id: 'act-bgc-walk',
        name: { AR: 'جولة الحياة العصرية في BGC', EN: 'BGC Night Lifestyle Walk', PH: 'Walk' },
        description: { AR: 'المشي في أرقى شوارع مانيلا، تسوق وزيارة المقاهي الراقية والفن العام.', EN: 'Walk in Manila\'s trendiest streets, shopping, and high-end cafes.', PH: 'Taguig' },
        images: [
            'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=1200',
            'https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=1200',
            'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=1200'
        ],
        location: { AR: 'تاغويغ (BGC)', EN: 'Taguig (BGC)', PH: 'Maynila' },
        duration: { AR: '2 ساعة', EN: '2 Hours', PH: 'Oras' },
        level: { AR: 'هادئ', EN: 'Calm', PH: 'Madali' },
        bestFor: { AR: 'شباب / عائلات', EN: 'Youth/Families', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'CITY'
    },
    {
        id: 'act-night-market',
        name: { AR: 'التسوق في الأسواق الليلية الشعبية', EN: 'Night Market Shopping Crawl', PH: 'Market' },
        description: { AR: 'تجربة التسوق الشعبي وشراء الهدايا بأسعار رخيصة في جو ليلي نابض.', EN: 'Bargain shopping and gifts in a vibrant night atmosphere.', PH: 'Maynila' },
        images: [
            'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1200',
            'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1200',
            'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=1200'
        ],
        location: { AR: 'مانيلا', EN: 'Manila', PH: 'Maynila' },
        duration: { AR: '3 ساعات', EN: '3 Hours', PH: 'Oras' },
        level: { AR: 'متوسط', EN: 'Medium', PH: 'Sakto' },
        bestFor: { AR: 'شباب / تسوق', EN: 'Youth/Shopping', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'CITY'
    },
    {
        id: 'act-dinner-cruise',
        name: { AR: 'رحلة بحرية مع عشاء في خليج مانيلا', EN: 'Manila Bay Dinner Cruise', PH: 'Cruise' },
        description: { AR: 'رحلة بحرية فاخرة تشمل بوفيه عشاء وموسيقى حية مع إطلالة على أضواء المدينة.', EN: 'Luxury cruise with dinner buffet and live music with city views.', PH: 'Maynila' },
        images: [
            'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=1200',
            'https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=1200',
            'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=1200'
        ],
        location: { AR: 'مانيلا', EN: 'Manila', PH: 'Maynila' },
        duration: { AR: '3 ساعات', EN: '3 Hours', PH: 'Oras' },
        level: { AR: 'هادئ', EN: 'Calm', PH: 'Madali' },
        bestFor: { AR: 'عرسان / عائلات', EN: 'Couples/Families', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'ROMANTIC'
    },
    {
        id: 'act-turtle-watching',
        name: { AR: 'مشاهدة السلاحف البحرية في جزيرة أبو', EN: 'Sea Turtle Watching at Apo Island', PH: 'Turtle' },
        description: { AR: 'السباحة بجوار السلاحف البحرية العملاقة في محمية طبيعية مذهلة.', EN: 'Swim alongside giant sea turtles in a stunning marine reserve.', PH: 'Dumaguete' },
        images: [
            'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1200',
            'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200',
            'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=1200'
        ],
        location: { AR: 'جزيرة أبو', EN: 'Apo Island', PH: 'Visayas' },
        duration: { AR: '2 ساعة', EN: '2 Hours', PH: 'Oras' },
        level: { AR: 'هادئ', EN: 'Calm', PH: 'Madali' },
        bestFor: { AR: 'عائلات / أطفال', EN: 'Families/Kids', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'MARINE'
    },
    {
        id: 'act-siargao-tour',
        name: { AR: 'جولة القوارب في سيارجاو', EN: 'Siargao Boat Island Tour', PH: 'Boat' },
        description: { AR: 'زيارة جزر ناكيد ودكو وغويام الشهيرة مع وقت للسباحة والاسترخاء.', EN: 'Visit Naked, Daku, and Guyam islands with time to swim.', PH: 'Siargao' },
        images: [
            'https://images.unsplash.com/photo-1536733022204-78593a23a3cb?q=80&w=1200',
            'https://images.unsplash.com/photo-1502680399488-660366c3a95d?q=80&w=1200',
            'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200'
        ],
        location: { AR: 'جزيرة سيارجاو', EN: 'Siargao Island', PH: 'Mindanao' },
        duration: { AR: '6 ساعات', EN: '6 Hours', PH: 'Oras' },
        level: { AR: 'متوسط', EN: 'Medium', PH: 'Sakto' },
        bestFor: { AR: 'شباب / عرسان', EN: 'Youth/Couples', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'MARINE'
    },
    {
        id: 'act-surf-lesson',
        name: { AR: 'دروس الركمجة في كلاود 9', EN: 'Surfing Lessons at Cloud 9', PH: 'Surf' },
        description: { AR: 'تعلم ركوب الأمواج مع مدربين محترفين في أشهر بقعة ركمجة بالفلبين.', EN: 'Learn to surf with professional instructors in Siargao.', PH: 'Siargao' },
        images: [
            'https://images.unsplash.com/photo-1502680399488-660366c3a95d?q=80&w=1200',
            'https://images.unsplash.com/photo-1536733022204-78593a23a3cb?q=80&w=1200',
            'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200'
        ],
        location: { AR: 'سيارجاو', EN: 'Siargao', PH: 'Mindanao' },
        duration: { AR: '2 ساعة', EN: '2 Hours', PH: 'Oras' },
        level: { AR: 'مغامرة', EN: 'Adventure', PH: 'Masaya' },
        bestFor: { AR: 'شباب / مغامرين', EN: 'Youth/Adventurers', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'MARINE'
    },
    {
        id: 'act-jungle-trek',
        name: { AR: 'المشي في الغابات الاستوائية', EN: 'Tropical Jungle Trekking', PH: 'Jungle' },
        description: { AR: 'استكشف التنوع البيولوجي المذهل للفلبين عبر مسارات جبلية خضراء.', EN: 'Explore the Philippines\' biodiversity through green mountain trails.', PH: 'Mindoro' },
        images: [
            'https://images.unsplash.com/photo-1511497584788-8767fe7718f2?q=80&w=1200',
            'https://images.unsplash.com/photo-1528150230182-163f97194600?q=80&w=1200',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200'
        ],
        location: { AR: 'بورتو غاليرا', EN: 'Puerto Galera', PH: 'Luzon' },
        duration: { AR: '4 ساعات', EN: '4 Hours', PH: 'Oras' },
        level: { AR: 'مغامرة', EN: 'Adventure', PH: 'Sakto' },
        bestFor: { AR: 'شباب / مغامرين', EN: 'Youth/Adventurers', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'ADVENTURE'
    },
    {
        id: 'act-skyscraper-deck',
        name: { AR: 'جولة مطلات الأبراج في مانيلا', EN: 'Manila Skyscraper Deck Tour', PH: 'Tower' },
        description: { AR: 'شاهد مانيلا من الأعلى عبر زيارة أشهر مطلات الأبراج في ماكاتي و BGC.', EN: 'See Manila from above by visiting famous skyscraper decks.', PH: 'Maynila' },
        images: [
            'https://images.unsplash.com/photo-1512411993201-94943f721d37?q=80&w=1200',
            'https://images.unsplash.com/photo-1555620146-512038753177?q=80&w=1200',
            'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?q=80&w=1200'
        ],
        location: { AR: 'ماكاتي / BGC', EN: 'Makati / BGC', PH: 'Maynila' },
        duration: { AR: '2 ساعة', EN: '2 Hours', PH: 'Oras' },
        level: { AR: 'هادئ', EN: 'Calm', PH: 'Madali' },
        bestFor: { AR: 'عائلات / تصوير', EN: 'Families/Photography', PH: 'Lahat' },
        category: 'ACTIVITY',
        subCategory: 'CITY'
    }
  ],
  translations: INITIAL_TRANSLATIONS
};

export const ICONS = {
  Island: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/><path d="M12 8v4l3 3"/></svg>,
  Chat: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
  Eye: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Filter: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
};
