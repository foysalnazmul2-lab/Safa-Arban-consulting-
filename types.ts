
export type ServiceCategory = 
  | 'Ministry of Investment'
  | 'Ministry of Commerce'
  | 'GOSI'
  | 'Qiwa / HR'
  | 'Passports / Muqeem'
  | 'Special Residency & Elite Licenses'
  | 'Company Formation & Registration'
  | 'Sector-Specific Licensing'
  | 'Manpower & Immigration Solutions'
  | 'Corporate Compliance & Operations'
  | 'Business Support Services'
  | 'ZATCA & Tax Compliance';

export interface Service {
  id: string;
  category: ServiceCategory | string;
  name: string;
  professionalFee: number; // SafaArban's service charge
  governmentFee: number;   // Official Gov/SADAD cost
  price: number;           // Total (auto-calculated in UI usually)
  desc: string;
  code?: string;
  details?: string[];
  requirements?: string[];
  inclusions?: string[];
  exclusions?: string[];
}

export interface CartItem extends Service {
  quantity?: number;
}

export type Page = 'home' | 'services' | 'quotation' | 'about' | 'contact' | 'blog' | 'payment-auth' | 'service-details' | 'privacy' | 'terms';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface ClientDetails {
  name: string;
  email: string;
  phone: string;
  crOrPassport?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

export interface CorePageContent {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  overview: string;
  features: { title: string; desc: string }[];
  cta: string;
}
