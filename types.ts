
export enum BookingStatus {
  PENDING = 'قيد الانتظار',
  CONFIRMED = 'تم التأكيد',
  CANCELLED = 'ملغي',
  COMPLETED = 'مكتمل'
}

export type Language = 'AR' | 'EN' | 'PH';

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  travelersCount: number;
  specialRequests: string;
  packageType: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface Attraction {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  images: string[];
  location: Record<Language, string>;
  bestFor: Record<Language, string>;
  activities?: Record<Language, string[]>;
  category: 'ISLAND' | 'SHOPPING' | 'RESTAURANT' | 'ACTIVITY' | 'MANILA' | 'MARKET';
  subCategory?: 'MARINE' | 'ADVENTURE' | 'FAMILY' | 'ROMANTIC' | 'CITY';
  duration?: Record<Language, string>;
  level?: Record<Language, string>;
  city?: string;
  halal?: boolean;
  cuisine?: string;
  hidden?: boolean; // خاصية لإخفاء العنصر دون حذفه
}

export interface HeroSlide {
  id: string;
  image: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  hidden?: boolean;
}

export interface SiteData {
  heroSlides: HeroSlide[];
  islands: Attraction[];
  manilaDistricts: Attraction[];
  shopping: Attraction[];
  restaurants: Attraction[];
  activities: Attraction[];
  translations: Record<string, Record<Language, string>>;
}

export type ViewState = 'HOME' | 'BOOKING' | 'ISLANDS' | 'MANILA' | 'SHOPPING' | 'RESTAURANTS' | 'ACTIVITIES' | 'TRAVEL_INFO' | 'ABOUT_US' | 'PRIVACY_POLICY' | 'CURRENCY_CALC' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD' | 'VISA_INFO' | 'ABOUT_PH';
