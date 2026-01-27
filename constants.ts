
import { Service, BlogPost, CorePageContent, GlossaryTerm } from './types';

export const BRAND = {
  name: "SafaArban",
  fullName: "SafaArban Ltd",
  arabicName: "شركة صفاء أربان المحدودة",
  colors: {
    primary: "#0D2B4F", // Safa Deep Blue (Corporate Trust)
    secondary: "#E94E4E", // Safa Coral Red (Brand Core)
    accent: "#F7C948", // Safa Gold Yellow (Accent)
    highlight: "#F5F7FA", // Soft Light Gray
    alert: "#E94E4E",  // Coral Red for alerts/action
    text: "#1F2933",   // Charcoal Dark (Text / UI)
    lightBg: "#F5F7FA" // Soft Light Gray (Background)
  },
  contact: {
    phone: "+966 536 182 180",
    email: "info@safaarban.com",
    address: "Harun Al Rashid Road, Al Jazeerah Dist, Riyadh 14216, Saudi Arabia",
    cr: "1010989782",
    unified: "7038510827",
    vat: "300054882100003",
    iban: "SA4280000204608016599551",
    accountNumber: "204000010006086599551",
    bankName: "Al-Rajhi Bank"
  }
};

export const TRANSLATIONS = {
  EN: {
    nav_home: "Home",
    nav_services: "Services",
    nav_insights: "Insights",
    nav_about: "About",
    nav_contact: "Contact",
    nav_portal: "Portal",
    nav_start: "Start Setup",
    
    hero_title_1: "Launch Your",
    hero_title_highlight: "Saudi Regional HQ",
    hero_title_2: "in 30 Days.",
    hero_desc: "Secure your MISA License and 100% Foreign Ownership with Riyadh's premier government liaison. Zero friction, full compliance.",
    hero_cta_primary: "Start Setup",
    hero_cta_secondary: "Verify Eligibility",
    hero_badge: "Now Accepting Applications",
    trust_foreign: "100% Foreign Ownership",
    trust_misa: "MISA Licensed",
    trust_portal: "24/7 Portal Access",
    trust_hq: "Riyadh HQ",

    login_title: "Secure Client Access",
    login_subtitle: "Manage your MISA licenses, track visa applications, and communicate with your PRO.",
    login_welcome: "Welcome Back",
    login_instruction: "Enter your credentials to access the workspace.",
    login_email_label: "Corporate Email",
    login_password_label: "Password",
    login_btn: "Access Dashboard",
    login_new: "New to SafaArban?",
    login_create: "Start New Application",
    login_error: "Please enter valid credentials.",

    admin_title: "Admin Dashboard",
    admin_overview: "Overview",
    admin_leads: "Leads",
    admin_bookings: "Bookings",
    admin_subscribers: "Subscribers",
    admin_signout: "Sign Out",
    admin_total_leads: "Total Leads",
    admin_todays_leads: "Today's Leads",
    admin_search: "Search data...",
    admin_client_name: "Client Name",
    admin_activity: "Activity",
    admin_status: "Status",
    admin_date: "Date",
    admin_action: "Action",
    admin_no_data: "No data found.",
    admin_reset: "Reset Database",
    admin_consultant: "Consultant",
    admin_time: "Time",

    portal_overview: "Overview",
    portal_contracts: "Smart Contracts",
    portal_services: "Active Services",
    portal_history: "Service History",
    portal_documents: "Document Vault",
    portal_support: "Support Tickets",
    portal_signout: "Sign Out",
    portal_dashboard_title: "Company Dashboard",
    portal_contracts_title: "Smart Contract Vault",
    portal_services_title: "Service Management",
    portal_history_title: "Service History",
    portal_documents_title: "Digital Vault",
    portal_support_title: "Communication Center",
    portal_client_id: "Client ID",
    portal_setup_progress: "Setup in Progress",
    portal_est_completion: "Est. Completion",
    portal_download_pdf: "Download PDF",
    portal_no_contracts: "No smart contracts found."
  },
  AR: {
    nav_home: "الرئيسية",
    nav_services: "الخدمات",
    nav_insights: "رؤى السوق",
    nav_about: "من نحن",
    nav_contact: "اتصل بنا",
    nav_portal: "بوابة العملاء",
    nav_start: "ابدأ التأسيس",

    hero_title_1: "أطلق",
    hero_title_highlight: "مقرك الإقليمي في السعودية",
    hero_title_2: "خلال ٣٠ يوماً.",
    hero_desc: "احصل على رخصة الاستثمار وملكية أجنبية 100% مع صفاء أربان. شريكك الموثوق في الرياض للإجراءات الحكومية.",
    hero_cta_primary: "ابدأ الآن",
    hero_cta_secondary: "تحقق من الأهلية",
    hero_badge: "نقبل الطلبات الآن",
    trust_foreign: "ملكية أجنبية ١٠٠٪",
    trust_misa: "مرخص من وزارة الاستثمار",
    trust_portal: "بوابة إلكترونية ٢٤/٧",
    trust_hq: "مقر الرياض",

    login_title: "دخول العملاء الآمن",
    login_subtitle: "إدارة تراخيص الاستثمار، متابعة التأشيرات، والتواصل مع مستشارك الحكومي.",
    login_welcome: "مرحباً بعودتك",
    login_instruction: "أدخل بيانات الاعتماد للدخول إلى مساحة العمل.",
    login_email_label: "البريد الإلكتروني للشركة",
    login_password_label: "كلمة المرور",
    login_btn: "دخول للوحة التحكم",
    login_new: "جديد في صفاء أربان؟",
    login_create: "بدء طلب جديد",
    login_error: "الرجاء إدخال بيانات صحيحة.",

    admin_title: "لوحة التحكم",
    admin_overview: "نظرة عامة",
    admin_leads: "الطلبات",
    admin_bookings: "الحجوزات",
    admin_subscribers: "المشتركين",
    admin_signout: "تسجيل خروج",
    admin_total_leads: "إجمالي الطلبات",
    admin_todays_leads: "طلبات اليوم",
    admin_search: "بحث في البيانات...",
    admin_client_name: "اسم العميل",
    admin_activity: "النشاط",
    admin_status: "الحالة",
    admin_date: "التاريخ",
    admin_action: "إجراء",
    admin_no_data: "لا توجد بيانات.",
    admin_reset: "إعادة ضبط قاعدة البيانات",
    admin_consultant: "المستشار",
    admin_time: "الوقت",

    portal_overview: "نظرة عامة",
    portal_contracts: "العقود الذكية",
    portal_services: "الخدمات النشطة",
    portal_history: "سجل الخدمات",
    portal_documents: "خزنة المستندات",
    portal_support: "تذاكر الدعم",
    portal_signout: "تسجيل خروج",
    portal_dashboard_title: "لوحة تحكم الشركة",
    portal_contracts_title: "خزنة العقود الذكية",
    portal_services_title: "إدارة الخدمات",
    portal_history_title: "سجل الخدمات",
    portal_documents_title: "الخزنة الرقمية",
    portal_support_title: "مركز التواصل",
    portal_client_id: "رقم العميل",
    portal_setup_progress: "التأسيس قيد التنفيذ",
    portal_est_completion: "الاكتمال المتوقع",
    portal_download_pdf: "تحميل PDF",
    portal_no_contracts: "لا توجد عقود ذكية."
  }
};

export const ISIC_ACTIVITIES = [
  { code: "6201", name: "Computer Programming Activities", type: "Service", ownership: "100% Foreign", category: "IT", risk: "Low" },
  { code: "6202", name: "IT Consultancy Activities", type: "Service", ownership: "100% Foreign", category: "IT", risk: "Low" },
  { code: "7020", name: "Management Consultancy Activities", type: "Service", ownership: "100% Foreign", category: "Consulting", risk: "Low" },
  { code: "7310", name: "Advertising Agencies", type: "Service", ownership: "100% Foreign", category: "Media", risk: "Low" },
  { code: "4100", name: "Construction of Buildings", type: "Contracting", ownership: "100% Foreign", category: "Construction", risk: "High" },
  { code: "4791", name: "Retail Sale via Internet (E-commerce)", type: "Trade", ownership: "100% Foreign", category: "Retail", risk: "Medium" },
  { code: "5610", name: "Restaurants and Mobile Food Service", type: "Service", ownership: "100% Foreign", category: "F&B", risk: "Medium" },
  { code: "7110", name: "Architectural and Engineering Activities", type: "Professional", ownership: "100% Foreign", category: "Engineering", risk: "High" },
  { code: "5229", name: "Other Transportation Support Activities", type: "Logistics", ownership: "100% Foreign", category: "Logistics", risk: "Medium" },
  { code: "8510", name: "Pre-primary Education", type: "Service", ownership: "100% Foreign", category: "Education", risk: "High" },
  { code: "6810", name: "Real Estate Activities with Own Property", type: "Real Estate", ownership: "Restricted", category: "Real Estate", risk: "High" },
  { code: "4610", name: "Wholesale on a Fee or Contract Basis", type: "Trade", ownership: "100% Foreign", category: "Trade", risk: "Low" },
  { code: "7410", name: "Specialized Design Activities", type: "Service", ownership: "100% Foreign", category: "Creative", risk: "Low" },
  { code: "7911", name: "Travel Agency Activities", type: "Tourism", ownership: "100% Foreign", category: "Tourism", risk: "Medium" },
  { code: "3211", name: "Manufacture of Jewellery", type: "Industrial", ownership: "100% Foreign", category: "Manufacturing", risk: "High" },
  { code: "0000", name: "Military Equipment Manufacturing", type: "Industrial", ownership: "Restricted / Special Approval", category: "Defense", risk: "Critical" },
  { code: "9999", name: "Recruitment Agency (Domestic)", type: "Service", ownership: "Restricted", category: "HR", risk: "High" }
];

export const GLOSSARY_DB: GlossaryTerm[] = [
  { id: 'iqama', term: 'Iqama', arabic: 'إقامة', phonetic: 'i-qah-mah', definition: 'The official residency permit for non-GCC nationals residing in Saudi Arabia. It serves as the primary ID card for banking, rentals, and government services.', category: 'Immigration' },
  { id: 'nitaqat', term: 'Nitaqat', arabic: 'نطاقات', phonetic: 'ni-ta-qat', definition: 'A Saudization program that classifies entities into color zones (Red, Low Green, High Green, Platinum) based on the ratio of Saudi nationals to expatriates.', category: 'HR' },
  { id: 'cr', term: 'CR (Sijil Tijari)', arabic: 'سجل تجاري', phonetic: 'si-jil ti-ja-ri', definition: 'Commercial Registration. The foundational document issued by the Ministry of Commerce that gives a business its legal identity.', category: 'Legal' },
  { id: 'misa', term: 'MISA', arabic: 'وزارة الاستثمار', phonetic: 'mee-sa', definition: 'Ministry of Investment Saudi Arabia (formerly SAGIA). The body responsible for issuing foreign investment licenses.', category: 'Government' },
  { id: 'zatca', term: 'ZATCA', arabic: 'هيئة الزكاة', phonetic: 'zat-ka', definition: 'Zakat, Tax and Customs Authority. The agency responsible for VAT, Corporate Tax, and Customs duties.', category: 'Finance' },
  { id: 'qiwa', term: 'Qiwa', arabic: 'قوى', phonetic: 'qi-wa', definition: 'The unified digital platform by the Ministry of Human Resources for managing employment contracts, visas, and Nitaqat compliance.', category: 'HR' },
  { id: 'muqeem', term: 'Muqeem', arabic: 'مقيم', phonetic: 'mu-keem', definition: 'An electronic portal that allows organizations to review resident worker data and complete passport/visa transactions online.', category: 'Immigration' },
  { id: 'saudization', term: 'Saudization', arabic: 'سعودة', phonetic: 'sau-di-za-tion', definition: 'The national policy of encouraging the employment of Saudi nationals in the private sector, enforced via the Nitaqat system.', category: 'HR' },
  { id: 'gosi', term: 'GOSI', arabic: 'التأمينات', phonetic: 'go-see', definition: 'General Organization for Social Insurance. The body managing social security and occupational hazard insurance for employees.', category: 'HR' },
  { id: 'wasel', term: 'Wasel (National Address)', arabic: 'العنوان الوطني', phonetic: 'wa-sel', definition: 'The official national address system managed by Saudi Post (SPL). Mandatory for all businesses and residents.', category: 'General' },
  { id: 'sadad', term: 'SADAD', arabic: 'سداد', phonetic: 'sa-dad', definition: 'The national electronic bill payment system used for all government fees and utility payments.', category: 'Finance' },
  { id: 'baladiya', term: 'Baladiya', arabic: 'بلدية', phonetic: 'ba-la-dee-ya', definition: 'Municipality License. Required for physical office spaces, shops, and warehouses to ensure safety and zoning compliance.', category: 'Legal' },
  { id: 'kafeel', term: 'Kafeel', arabic: 'كفيل', phonetic: 'ka-feel', definition: 'Sponsor. Historically, the local Saudi individual or entity legally responsible for an expat. The system is being reformed under Vision 2030.', category: 'Legal' },
  { id: 'aoa', term: 'AoA', arabic: 'عقد التأسيس', phonetic: 'aqd ta-sees', definition: 'Articles of Association. The legal document defining the company\'s purpose, capital, shareholders, and management structure.', category: 'Legal' },
  { id: 'modon', term: 'MODON', arabic: 'مدن', phonetic: 'mo-don', definition: 'Saudi Authority for Industrial Cities and Technology Zones. Manages industrial lands and infrastructure.', category: 'Government' },
];

export const SERVICES_DB: Service[] = [
  // ... (Keeping existing services for brevity, they are unchanged in logic, just re-exporting)
  // Formation
  {
    id: 'cfr-01',
    category: 'Company Formation & Registration',
    name: '100% Foreign Ownership MISA License',
    professionalFee: 18000,
    governmentFee: 12000,
    price: 30000,
    desc: 'The essential license for foreign investors to own 100% of a Saudi LLC.',
    details: [
      'Strategic classification of business activity.',
      'Drafting of the mandatory Business Innovation Plan (BIP).',
      'Preparation of financial projection models.',
      'Submission via MISA portal and query handling.',
      'Issuance of foreign investment license.'
    ],
    requirements: ['Parent Co. Financials', 'Parent Co. CR (Attested)', 'GM Passport'],
    inclusions: ['Portal Registration', 'BIP Drafting', 'License Issuance'],
    exclusions: ['Govt Fees', 'Translation Costs'],
    image: 'https://images.unsplash.com/photo-1582653291655-60ae21f37968?q=80&w=1200'
  },
  {
    id: 'cfr-03',
    category: 'Company Formation & Registration',
    name: 'Commercial Registration (CR) Issuance',
    professionalFee: 3500,
    governmentFee: 1500,
    price: 5000,
    desc: 'Official certificate of incorporation from the Ministry of Commerce.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200'
  },
  {
    id: 'rhq-setup',
    category: 'Company Formation & Registration',
    name: 'Regional HQ (RHQ) License',
    professionalFee: 45000,
    governmentFee: 15000,
    price: 60000,
    desc: 'Premium license for MNCs establishing their MENA headquarters in Riyadh. 0% corporate tax for 30 years.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea904f4480e?q=80&w=1200'
  },
  {
    id: 'cfr-08',
    category: 'Company Formation & Registration',
    name: 'Branch Office Registration',
    professionalFee: 15000,
    governmentFee: 10000,
    price: 25000,
    desc: 'Register a direct branch of your foreign entity.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200'
  },
  {
    id: 'virtual-office',
    category: 'Company Formation & Registration',
    name: 'Virtual Office & National Address',
    professionalFee: 4000,
    governmentFee: 1000,
    price: 5000,
    desc: 'Registered address service for license issuance.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200'
  },
  // Licensing
  {
    id: 'sec-01',
    category: 'Sector / Activity Licensing',
    name: 'Industrial License (MIM)',
    professionalFee: 47000,
    governmentFee: 5000,
    price: 52000,
    desc: 'Mandatory for manufacturing. Unlocks duty-free imports and MODON land allocation.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200'
  },
  {
    id: 'sec-08',
    category: 'Sector / Activity Licensing',
    name: 'Import/Export License',
    professionalFee: 3000,
    governmentFee: 1000,
    price: 4000,
    desc: 'Customs code registration and Fasad clearing agent setup.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200'
  },
  {
    id: 'sec-02',
    category: 'Sector / Activity Licensing',
    name: 'Construction & Contracting License',
    professionalFee: 12000,
    governmentFee: 4000,
    price: 16000,
    desc: 'MOMRA classification for contractors.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200'
  },
  {
    id: 'sec-03',
    category: 'Sector / Activity Licensing',
    name: 'Real Estate Developer License',
    professionalFee: 35000,
    governmentFee: 10000,
    price: 45000,
    desc: 'Wafi certification for off-plan sales.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200'
  },
  {
    id: 'sec-06',
    category: 'Sector / Activity Licensing',
    name: 'Healthcare Facility License (MOH)',
    professionalFee: 28000,
    governmentFee: 8000,
    price: 36000,
    desc: 'Licensing for clinics, hospitals, and pharma trading via Seha platform.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200'
  },
  {
    id: 'sec-10',
    category: 'Sector / Activity Licensing',
    name: 'Cybersecurity License (NCA)',
    professionalFee: 22000,
    governmentFee: 5000,
    price: 27000,
    desc: 'National Cybersecurity Authority certification.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200'
  },
  {
    id: 'cfr-04',
    category: 'Sector / Activity Licensing',
    name: 'General Trading License',
    professionalFee: 8000,
    governmentFee: 2000,
    price: 10000,
    desc: 'Wholesale and retail trade license.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200'
  },
  {
    id: 'comp-10',
    category: 'Sector / Activity Licensing',
    name: 'Environmental Permit (NXC)',
    professionalFee: 6000,
    governmentFee: 2000,
    price: 8000,
    desc: 'Compliance certification for industrial and construction activities.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200'
  },
  // Manpower
  {
    id: 'man-01',
    category: 'Manpower & Immigration',
    name: 'Investor / General Manager Visa',
    professionalFee: 2500,
    governmentFee: 2000,
    price: 4500,
    desc: 'Residency permit (Iqama) for the appointed GM or Investor.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200'
  },
  {
    id: 'hr-02',
    category: 'Human Capital & HR',
    name: 'Saudization & Nitaqat Management',
    professionalFee: 1500,
    governmentFee: 0,
    price: 1500,
    desc: 'Monthly management of your Nitaqat color status.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200'
  },
  {
    id: 'cfr-10',
    category: 'Human Capital & HR',
    name: 'GOSI Registration',
    professionalFee: 1500,
    governmentFee: 0,
    price: 1500,
    desc: 'Social insurance file opening for the entity.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200'
  },
  {
    id: 'cfr-12',
    category: 'Human Capital & HR',
    name: 'Qiwa Portal Setup',
    professionalFee: 1000,
    governmentFee: 0,
    price: 1000,
    desc: 'Activation of the Ministry of Labor digital platform.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200'
  },
  // Support
  {
    id: 'supp-03',
    category: 'Support Services',
    name: 'Corporate Bank Account Opening',
    professionalFee: 4000,
    governmentFee: 0,
    price: 4000,
    desc: 'Fast-track bank account setup with Tier-1 Saudi banks.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200'
  },
  {
    id: 'cfr-09',
    category: 'Financial & Tax Advisory',
    name: 'ZATCA Tax & VAT Registration',
    professionalFee: 2000,
    governmentFee: 0,
    price: 2000,
    desc: 'Mandatory registration with the Zakat, Tax and Customs Authority.',
    image: 'https://images.unsplash.com/photo-1554224155-991310d2c945?q=80&w=1200'
  },
  {
    id: 'supp-06',
    category: 'Support Services',
    name: 'National Address Registration (Wasel)',
    professionalFee: 500,
    governmentFee: 0,
    price: 500,
    desc: 'Official SPL address registration required for all government files.',
    image: 'https://images.unsplash.com/photo-1524813686514-a5756c97759e?q=80&w=1200'
  },
  // Strategy
  {
    id: 'strat-02',
    category: 'Strategy & Management Consulting',
    name: 'Market Entry Feasibility Study',
    professionalFee: 25000,
    governmentFee: 0,
    price: 25000,
    desc: 'Comprehensive analysis of market size, competition, and regulatory landscape.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200'
  },
  {
    id: 'leg-01',
    category: 'Legal Advisory',
    name: 'Annual Legal Retainer',
    professionalFee: 12000,
    governmentFee: 0,
    price: 12000,
    desc: 'Ongoing legal support for labor contracts and commercial disputes.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200'
  },
  {
    id: 'fin-02',
    category: 'Financial & Tax Advisory',
    name: 'Accounting & Bookkeeping (Monthly)',
    professionalFee: 3000,
    governmentFee: 0,
    price: 3000,
    desc: 'Outsourced VAT filing and payroll processing.',
    image: 'https://images.unsplash.com/photo-1554224154-260327c00c40?q=80&w=1200'
  },
  {
    id: 'dig-01',
    category: 'Digital & IT Consulting',
    name: 'Digital Transformation Strategy',
    professionalFee: 35000,
    governmentFee: 0,
    price: 35000,
    desc: 'Roadmap for digitizing operations to align with Vision 2030.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200'
  },
  {
    id: 'bpo-01',
    category: 'BPO & Managed Services',
    name: 'Call Center Setup (BPO)',
    professionalFee: 20000,
    governmentFee: 5000,
    price: 25000,
    desc: 'Full licensing and infrastructure setup for a BPO unit.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200'
  },
  {
    id: 'ops-01',
    category: 'Operational Consulting',
    name: 'Supply Chain Optimization',
    professionalFee: 18000,
    governmentFee: 0,
    price: 18000,
    desc: 'Analysis and improvement of logistics networks in KSA.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200'
  },
  {
    id: 'mkt-01',
    category: 'Marketing & Branding',
    name: 'Saudi Brand Localization',
    professionalFee: 15000,
    governmentFee: 0,
    price: 15000,
    desc: 'Adapting brand voice and visuals for the Saudi market.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200'
  }
];

export const CORE_SERVICES_CONTENT: Record<string, CorePageContent> = {
    // ... (CORE_SERVICES_CONTENT remains unchanged)
    'misa-license': {
        slug: 'misa-license',
        title: 'MISA Investment License',
        subtitle: 'The Gateway to the Kingdom',
        heroImage: 'https://images.unsplash.com/photo-1582653291655-60ae21f37968?q=80&w=2000&auto=format&fit=crop',
        overview: 'The MISA Investment License is the primary legal instrument for non-GCC foreign investors to conduct business in Saudi Arabia. It allows for 100% foreign ownership of the local entity.',
        features: [
            { title: '100% Foreign Ownership', desc: 'No requirement for a local Saudi sponsor (Kafeel).' },
            { title: 'Residency Privileges', desc: 'Grants eligibility for an Investor Iqama.' },
            { title: 'Global Banking', desc: 'Enables opening of corporate bank accounts.' }
        ],
        cta: 'Secure Your License',
        requirements: ['Audited Financials (1 Year)', 'Commercial Registration of Parent Co.', 'Power of Attorney'],
        details: [
            'Preliminary assessment of ISIC activity codes.',
            'Drafting of the Business Innovation Plan (BIP).',
            'Financial projection modeling.',
            'MISA portal submission and follow-up.',
            'License issuance and activation.'
        ]
    },
    'commercial-registration': {
        slug: 'commercial-registration',
        title: 'Commercial Registration (CR)',
        subtitle: 'Your Corporate Identity',
        heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000',
        overview: 'The Commercial Registration (CR) is the birth certificate of your company in Saudi Arabia, issued by the Ministry of Commerce.',
        features: [
            { title: 'Legal Personhood', desc: 'Allows the company to enter into legal contracts.' },
            { title: 'Chamber Membership', desc: 'Includes automatic enrollment in the Chamber of Commerce.' }
        ],
        cta: 'Issue CR',
        requirements: ['Active MISA License', 'Articles of Association (AoA)'],
        details: ['Name reservation', 'AoA drafting and notarization', 'CR issuance']
    },
    'rhq-setup': {
        slug: 'rhq-setup',
        title: 'Regional HQ Program',
        subtitle: 'Vision 2030 VIP Access',
        heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea904f4480e?q=80&w=2000',
        overview: 'The Regional Headquarters (RHQ) program is a strategic initiative by the Saudi government inviting MNCs to establish their MENA headquarters in Riyadh. Exclusive incentives include a 30-year tax holiday.',
        features: [
            { title: '0% Corporate Tax', desc: 'Exemption for 30 years on RHQ activities.' },
            { title: 'Government Tenders', desc: 'Exclusive eligibility to bid on government contracts.' },
            { title: 'Visa Quotas', desc: 'Unlimited visa block allocation for RHQ employees.' }
        ],
        cta: 'Apply for RHQ',
        requirements: ['Presence in at least 2 other countries', 'Audited consolidated financials', 'Board resolution'],
        details: [
            'Gap analysis of current MENA presence.',
            'Structuring the RHQ entity (Special Purpose Vehicle).',
            'Applying for the RHQ License via MISA.',
            'Tax file registration and exemption activation.'
        ]
    },
    'sec-01': {
        slug: 'sec-01',
        title: 'Industrial License (MIM)',
        subtitle: 'Manufacturing Hub',
        heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000',
        overview: 'The Industrial License is issued by the Ministry of Industry and Mineral Resources (MIM) and is mandatory for manufacturing. It unlocks incentives including customs exemptions.',
        features: [
            { title: 'Customs Exemption', desc: 'Duty-free import of raw materials and machinery.' },
            { title: 'Industrial Land', desc: 'Priority allocation in MODON industrial cities.' },
            { title: 'SIDF Funding', desc: 'Eligibility for Saudi Industrial Development Fund loans.' }
        ],
        cta: 'Start Manufacturing',
        requirements: ['Technical Feasibility Study', 'Environmental Permit (NCE)', 'Factory Layout Plan'],
        details: [
            'Submission of initial industrial permit application.',
            'Environmental impact assessment coordination.',
            'Final license issuance upon factory readiness.'
        ]
    },
    'investor-visa': {
        slug: 'investor-visa',
        title: 'Investor Residency (Premium)',
        subtitle: 'Golden Visa Status',
        heroImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000',
        overview: 'The Investor Visa (or Premium Residency) allows international investors to live, work, and invest in Saudi Arabia with long-term stability.',
        features: [
            { title: 'Self-Sponsorship', desc: 'Not tied to a specific employer or kafeel.' },
            { title: 'Property Ownership', desc: 'Right to own residential, commercial, and industrial real estate.' },
            { title: 'Family Privileges', desc: 'Sponsor parents, spouses, and children with ease.' }
        ],
        cta: 'Check Eligibility',
        requirements: ['Valid Passport', 'Solvency Proof', 'Clean Criminal Record'],
        details: [
            'Eligibility assessment and point calculation.',
            'Submission to Premium Residency Center.',
            'Medical examination and final issuance.'
        ]
    }
};

export const BLOG_POSTS: BlogPost[] = [
  // ... (BLOG_POSTS remains unchanged)
  {
    id: 'guide-misa-100',
    title: 'The Ultimate Guide to 100% Foreign Ownership in Saudi Arabia',
    excerpt: 'Understanding the MISA license types, requirements, and how to navigate the new investment laws without a local sponsor.',
    content: `**Introduction**\nSaudi Arabia's Vision 2030 has revolutionized the investment landscape, allowing 100% foreign ownership in most sectors. This guide breaks down the MISA licensing process.\n\n**Types of Licenses**\n- **Service License:** For consultancy, IT, marketing, and other services.\n- **Industrial License:** For manufacturing and production.\n- **Trading License:** For retail and wholesale.\n\n**The Process**\n1. **Issuance:** Apply via MISA portal with audited financials.\n2. **CR:** Obtain Commercial Registration from Ministry of Commerce.\n3. **General Manager:** Appoint a GM (can be foreign) and issue residency.\n\n**Conclusion**\nWith the right partner, setting up in KSA is faster than ever.`,
    date: 'March 10, 2025',
    author: 'Faisal Al-Saud',
    image: 'https://images.unsplash.com/photo-1582653291655-60ae21f37968?q=80&w=800',
    tags: ['Formation', 'MISA', 'Vision 2030']
  },
  {
    id: 'guide-rhq-2030',
    title: 'Why Global Firms are Moving HQs to Riyadh',
    excerpt: 'Analyze the tax incentives, including the 30-year tax holiday, driving MNCs to establish Regional Headquarters in the Kingdom.',
    content: `**The RHQ Mandate**\nStarting 2024, the Saudi government has limited contracts to companies with a Regional HQ in the Kingdom. This move aims to centralize economic activity in Riyadh.\n\n**Incentives**\n- **0% Corporate Tax:** For 30 years on RHQ-attributed income.\n- **Saudization Exemption:** For 10 years on RHQ employees.\n- **Visa Facilitation:** Unlimited visas for RHQ staff.\n\n**Eligibility**\nTo qualify, a company must have a presence in at least two other countries and establish Riyadh as the strategic center for the MENA region.`,
    date: 'March 05, 2025',
    author: 'Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea904f4480e?q=80&w=800',
    tags: ['Strategy', 'RHQ', 'Tax']
  },
  {
    id: 'guide-saudization',
    title: 'Mastering Nitaqat: A Guide to Saudization Compliance',
    excerpt: 'How to maintain a "Green" platinum status while scaling your workforce. Strategies for blending local talent with global expertise.',
    content: `**Understanding Nitaqat**\nThe Nitaqat program classifies entities based on their Saudization ratio. Being in the "Red" zone blocks visa renewals and new hires.\n\n**Strategies for Compliance**\n- **Hire Early:** Recruit Saudi nationals for admin and HR roles early on.\n- **Qiwa Portal:** Monitor your rating in real-time via Qiwa.\n- **Training:** Invest in training programs to upskill local employees.\n\n**Benefits of Platinum Status**\n- Instant visa processing.\n- Ability to transfer employees from other companies without sponsor consent.`,
    date: 'Feb 28, 2025',
    author: 'Ahmed Zaki',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800',
    tags: ['Visas & HR', 'Compliance', 'Nitaqat']
  },
  {
    id: 'guide-zatca-tax',
    title: 'ZATCA E-Invoicing Phase 2: Are You Ready?',
    excerpt: 'A technical deep dive into the integration requirements for Phase 2 e-invoicing and how to ensure your ERP is compliant.',
    content: `**Phase 2 Requirements**\nPhase 2 of E-invoicing (Fatoora) requires full integration between your ERP/POS system and the ZATCA portal.\n\n**Key Features**\n- **Cryptographic Stamp:** Every invoice must be digitally signed.\n- **UUID:** Universally Unique Identifier for tracking.\n- **XML Format:** Invoices must be generated in UBL 2.1 XML format.\n\n**Deadlines**\nImplementation is rolling out in waves based on revenue. Check your wave status on the ZATCA website.`,
    date: 'Feb 15, 2025',
    author: 'Dr. Faisal Al-Saud',
    image: 'https://images.unsplash.com/photo-1554224155-991310d2c945?q=80&w=800',
    tags: ['Finance', 'Tax', 'ZATCA']
  },
  {
    id: 'guide-industrial',
    title: 'Manufacturing in Saudi: Incentives & MODON',
    excerpt: 'Explore the industrial landscape, from land allocation in MODON cities to SIDF funding for factories.',
    content: `**Industrial Revolution**\nSaudi Arabia is aggressively diversifying into manufacturing. The National Industrial Strategy aims to triple industrial GDP.\n\n**Incentives**\n- **SIDF Loans:** Up to 75% project financing.\n- **MODON Land:** Subsidized industrial land starting at 1 SAR/sqm.\n- **Duty Exemption:** On raw materials and machinery.\n\n**Key Sectors**\n- Petrochemicals\n- Automotive (EVs)\n- Food Processing`,
    date: 'Feb 01, 2025',
    author: 'Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
    tags: ['Industrial', 'Manufacturing', 'MODON']
  },
  {
    id: 'guide-investor-visa',
    title: 'The Premium Residency (Gold Visa)',
    excerpt: 'Self-sponsorship options for investors and special talent. No kafeel required.',
    content: `**Freedom to Live & Invest**\nThe Premium Residency Center offers specific tracks for investors, entrepreneurs, and special talent. Unlike the standard employment Iqama, this residency is not tied to a specific employer.\n\n**Perks:**\n- Property ownership in Mecca/Medina (usufruct).\n- Family sponsorship without age limits.\n- Business licensing without a partner.`,
    date: "Jan 15, 2025",
    author: "Dr. Faisal Al-Saud",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000",
    tags: ["Visas & HR", "Formation"]
  },
  {
    id: 'guide-banking',
    title: 'Navigating Corporate Banking in Saudi Arabia',
    excerpt: 'A pragmatic guide to opening corporate accounts with SNB, AlRajhi, and ANB for foreign entities.',
    content: `**The Challenge**\nOpening a bank account has historically been a bottleneck. However, digitization has improved timelines significantly.\n\n**Requirements**\n- Valid CR and MISA License.\n- National Address (Wasel).\n- GM's Iqama or Border Number.\n- Articles of Association.\n\n**Top Banks for MNCs**\n- Saudi National Bank (SNB)\n- Al Rajhi Bank\n- Arab National Bank (ANB)`,
    date: "Jan 05, 2025",
    author: "Ahmed Zaki",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800",
    tags: ["Finance", "Banking", "Support"]
  }
];
