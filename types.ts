
export type ServiceCategory = 
  | 'Company Formation & Registration'
  | 'Sector / Activity Licensing'
  | 'Manpower & Immigration'
  | 'Corporate Compliance & Operations'
  | 'Strategy & Management Consulting'
  | 'Financial & Tax Advisory'
  | 'Human Capital & HR'
  | 'Digital & IT Consulting'
  | 'Marketing & Branding'
  | 'Market Research'
  | 'Legal Advisory'
  | 'Operational Consulting'
  | 'BPO & Managed Services'
  | 'Support Services';

export interface Service {
  id: string;
  category: ServiceCategory | string;
  name: string;
  professionalFee: number; // SafaArban's service charge
  governmentFee: number;   // Official Gov/SADAD cost (Estimated)
  price: number;           // Total
  desc: string;
  code?: string;
  details?: string[];
  requirements?: string[];
  inclusions?: string[];
  exclusions?: string[];
  image?: string;
}

export interface ServiceRecord {
  id: string;
  serviceId: string;
  name: string;
  category: string;
  status: 'Pending' | 'Processing' | 'Action Needed' | 'Completed' | 'Cancelled';
  dateRequested: string;
  dateCompleted?: string;
  price: number;
  refNumber: string;
  documents?: { name: string; url: string }[];
}

export interface CartItem extends Service {
  quantity?: number;
}

export type Page = 'home' | 'services' | 'quotation' | 'about' | 'contact' | 'blog' | 'payment-auth' | 'service-details' | 'privacy' | 'terms' | 'client-portal' | 'admin-portal' | 'login' | 'proposal-generator' | 'misa-licenses' | 'agreement-generator';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
  sources?: { title: string; uri: string; type?: 'web' | 'map' }[];
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

export interface GlossaryTerm {
  id: string;
  term: string;
  arabic: string;
  phonetic?: string;
  definition: string;
  category: 'Government' | 'Legal' | 'Finance' | 'HR' | 'General' | 'Immigration';
}

export interface CorePageContent {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  overview: string;
  features: { title: string; desc: string }[];
  cta: string;
  requirements?: string[];
  exclusions?: string[];
  details?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  company?: string;
}

// New Type for Smart Contracts
export interface SmartContract {
  id: string;
  clientName: string;
  serviceName: string;
  total: number;
  date: string;
  status: 'Draft' | 'Signed' | 'Sent';
  hash: string;
  items: string[];
}
