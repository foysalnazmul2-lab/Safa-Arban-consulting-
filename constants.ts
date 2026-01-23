
import { Service, BlogPost, CorePageContent, GlossaryTerm } from './types.ts';

export const BRAND = {
  name: "SafaArban",
  fullName: "SafaArban Ltd",
  arabicName: "شركة صفاء أربان المحدودة",
  colors: {
    primary: "#051C2C", // Deep Navy (Logo Text/Bottom Icon)
    secondary: "#F26522", // Vibrant Coral Orange (Logo Top Icon) - Replaces Gold
    accent: "#006C35", // Saudi Green (Vision 2030)
    highlight: "#FEF2EE", // Soft Orange tint for backgrounds
    alert: "#BE123C",  // Ruby Red
    lightBg: "#F8F9FA"
  },
  contact: {
    phone: "+966 536 182 180",
    email: "info@safaarban.com",
    address: "King Fahd Road, Al Olaya, Riyadh 12211, Saudi Arabia",
    cr: "1010989782",
    unified: "7038510827",
    vat: "300054882100003",
    iban: "SA56 3010 0974 0170 2874 8426"
  }
};

export const ISIC_ACTIVITIES = [
  { code: "6201", name: "Computer Programming Activities", type: "Service", ownership: "100% Foreign", category: "IT" },
  { code: "6202", name: "IT Consultancy Activities", type: "Service", ownership: "100% Foreign", category: "IT" },
  { code: "7020", name: "Management Consultancy Activities", type: "Service", ownership: "100% Foreign", category: "Consulting" },
  { code: "7310", name: "Advertising Agencies", type: "Service", ownership: "100% Foreign", category: "Media" },
  { code: "4100", name: "Construction of Buildings", type: "Contracting", ownership: "100% Foreign", category: "Construction" },
  { code: "4791", name: "Retail Sale via Internet (E-commerce)", type: "Trade", ownership: "100% Foreign", category: "Retail" },
  { code: "5610", name: "Restaurants and Mobile Food Service", type: "Service", ownership: "100% Foreign", category: "F&B" },
  { code: "7110", name: "Architectural and Engineering Activities", type: "Professional", ownership: "100% Foreign", category: "Engineering" },
  { code: "5229", name: "Other Transportation Support Activities", type: "Logistics", ownership: "100% Foreign", category: "Logistics" },
  { code: "8510", name: "Pre-primary Education", type: "Service", ownership: "100% Foreign", category: "Education" },
  { code: "6810", name: "Real Estate Activities with Own Property", type: "Real Estate", ownership: "Restricted", category: "Real Estate" },
  { code: "4610", name: "Wholesale on a Fee or Contract Basis", type: "Trade", ownership: "100% Foreign", category: "Trade" },
  { code: "7410", name: "Specialized Design Activities", type: "Service", ownership: "100% Foreign", category: "Creative" },
  { code: "7911", name: "Travel Agency Activities", type: "Tourism", ownership: "100% Foreign", category: "Tourism" },
  { code: "3211", name: "Manufacture of Jewellery", type: "Industrial", ownership: "100% Foreign", category: "Manufacturing" }
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
  // --- 1. Company Formation & Licensing ---
  {
    id: 'cfr-01',
    category: 'Company Formation & Registration',
    name: '100% Foreign Ownership MISA License',
    professionalFee: 18000,
    governmentFee: 12000,
    price: 30000,
    desc: 'Full foreign-owned business license application support via Ministry of Investment (MISA).',
    details: [
      'Strategic classification of business activity under ISIC-4 standards to ensure 100% foreign ownership eligibility.',
      'Drafting of the mandatory Business Innovation Plan (BIP) demonstrating contribution to Vision 2030 goals.',
      'Preparation of financial projection models for the first 5 years of operation.',
      'Submission of the application via the MISA investor portal and addressing all ministry queries.',
      'Issuance of the foreign investment license and activation with the Ministry of Commerce.'
    ],
    requirements: [
      'Audited Financial Statements (Last 1 Fiscal Year) of parent company.',
      'Commercial Registration (CR) of parent company, attested by Saudi Embassy.',
      'Passport copy of the General Manager.',
      'Power of Attorney (PoA) authorizing SafaArban to act on your behalf.'
    ],
    inclusions: ['MISA Portal Registration', 'Innovation Plan Drafting', 'Financial Analysis', 'License Issuance'],
    exclusions: ['Government Fees (SADAD)', 'GM Visa', 'Commercial Registration', 'Physical Office'],
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=2000'
  },
  {
    id: 'cfr-02',
    category: 'Company Formation & Registration',
    name: 'MISA License (Local Partner / JV)',
    professionalFee: 10000,
    governmentFee: 2000,
    price: 12000,
    desc: 'Joint venture investment license with a Saudi national partner.',
    details: [
      'Drafting of Joint Venture (JV) agreement protecting foreign investor interests.',
      'MISA portal registration and partner profile linking.',
      'Validation of Saudi partner eligibility and capabilities.',
      'Submission of mixed-ownership application to the Ministry of Investment.'
    ],
    requirements: [
      'Copy of Saudi Partner National ID.',
      'Foreign Partner Documents (CR/Passport).',
      'Signed JV Agreement or MOU.'
    ],
    inclusions: ['MISA Portal Setup', 'JV Agreement Review', 'Application Submission'],
    exclusions: ['Partner Negotiation', 'Government Fees', 'Notary Fees'],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800'
  },
  {
    id: 'cfr-03',
    category: 'Company Formation & Registration',
    name: 'Commercial Registration (CR)',
    professionalFee: 5500,
    governmentFee: 2500,
    price: 8000,
    desc: 'Main Commercial Registration issuance from Ministry of Commerce.',
    details: [
      'Reservation of trade name (English and Arabic transliteration).',
      'Drafting and attestation of Articles of Association (AoA).',
      'Ministry of Commerce (MC) portal submission.',
      'Chamber of Commerce (CoC) file opening and membership activation.'
    ],
    requirements: [
      'Valid MISA License.',
      'Approved Trade Name.',
      'General Manager National ID / Iqama / Passport.'
    ],
    inclusions: ['Trade Name Reservation', 'AoA Drafting', 'CR Issuance', 'Chamber Registration'],
    exclusions: ['Ministry of Commerce Fees', 'Chamber Membership Fees', 'Publication Fees'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800'
  },
  {
    id: 'cfr-04',
    category: 'Company Formation & Registration',
    name: 'Trading License',
    professionalFee: 8000,
    governmentFee: 2000,
    price: 10000,
    desc: 'Specialized license for import/export and wholesale trading activities.',
    details: [
        'Registration of trading activities in MISA and MC.',
        'Customs file opening and importer code generation.',
        'Saber platform registration guidance for product conformity.'
    ],
    requirements: [
        'MISA License with Trading Activity.',
        'Warehouse Lease Agreement (if applicable).'
    ],
    inclusions: ['Activity Classification', 'MISA Trading License', 'Customs Code Registration'],
    exclusions: ['Warehouse Inspection Fees', 'Inventory Costs', 'Import Duties'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800'
  },
  {
    id: 'cfr-05',
    category: 'Company Formation & Registration',
    name: 'Technical & Scientific Office Setup',
    professionalFee: 7000,
    governmentFee: 2000,
    price: 9000,
    desc: 'Representation office for foreign manufacturers (non-commercial).',
    details: [
        'Licensing of TSO for market research and technical support.',
        'Registration of Chief Representative.',
        'Compliance setup to ensure non-commercial status.'
    ],
    requirements: [
        'Parent Company Product Catalogs.',
        'Letter of Intent to establish TSO.'
    ],
    inclusions: ['TSO License Application', 'Representative Registration', 'Legal Compliance'],
    exclusions: ['Commercial Trading Rights', 'Product Registration', 'Office Lease'],
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800'
  },
  {
    id: 'cfr-06',
    category: 'Company Formation & Registration',
    name: 'Branch Office Registration',
    professionalFee: 6000,
    governmentFee: 2000,
    price: 8000,
    desc: 'Establishing a local branch of a foreign parent company.',
    details: [
        'Submission of parent company board resolution to open branch.',
        'Linking branch to parent entity financials.',
        'MISA Branch license issuance.'
    ],
    requirements: [
        'Parent Company Board Resolution (Attested).',
        'Parent Company AoA (Attested).'
    ],
    inclusions: ['Branch Registry', 'Parent Doc Attestation Guide', 'MISA Branch License'],
    exclusions: ['Paid-up Capital Deposit', 'Translation Fees', 'Embassy Legalization'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800'
  },
  {
    id: 'cfr-07',
    category: 'Company Formation & Registration',
    name: 'Municipality (Baladiya) License',
    professionalFee: 3000,
    governmentFee: 1500,
    price: 4500,
    desc: 'Local municipal operating license for offices and physical premises.',
    details: [
        'Review of office lease (Ejari) and zoning compliance.',
        'Submission of layout plans to Baladiya portal.',
        'Scheduling of municipal inspection.',
        'Signage permit application.'
    ],
    requirements: [
        'Valid Commercial Registration.',
        'Stamped Lease Contract.',
        'Civil Defense Permit (if applicable).',
        'Shop/Office Signage Photo.'
    ],
    inclusions: ['Shop/Office Layout Review', 'Application Submission', 'Signage Permit'],
    exclusions: ['Civil Defense License', 'Fit-out Contractor Fees', 'Waste Management Fees'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800'
  },
  {
    id: 'cfr-08',
    category: 'Company Formation & Registration',
    name: 'Chamber of Commerce Membership',
    professionalFee: 1200,
    governmentFee: 2200,
    price: 3400,
    desc: 'Registration and activation with Riyadh Chamber of Commerce.',
    details: [
        'Creation of MyBusiness (MyCoC) portal account.',
        'Signature attestation setup for digital document verification.',
        'Linking of CR to Chamber membership.'
    ],
    requirements: [
        'Valid Commercial Registration.',
        'General Manager ID.'
    ],
    inclusions: ['File Opening', 'Portal Activation', 'Certificate Attestation Setup'],
    exclusions: ['Annual Membership Fees', 'Attestation Per Document Fees'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800'
  },
  {
    id: 'cfr-09',
    category: 'Company Formation & Registration',
    name: 'ZATCA VAT/Tax Registration',
    professionalFee: 2500,
    governmentFee: 0,
    price: 2500,
    desc: 'Initial tax registration and VAT certificate issuance.',
    details: [
        'Registration on ZATCA portal for VAT and CIT.',
        'Issuance of Tax Identification Number (TIN).',
        'VAT Certificate generation.',
        'Guidance on E-invoicing (Fatoora) requirements.'
    ],
    requirements: [
        'Commercial Registration.',
        'Financial Year End Date.',
        'Projected Revenue Data.'
    ],
    inclusions: ['TIN Issuance', 'VAT Certificate', 'ZATCA Portal Access Setup'],
    exclusions: ['Monthly VAT Filing', 'Penalty Appeals', 'Zakat Assessment'],
    image: 'https://images.unsplash.com/photo-1554224154-260327c00c4b?q=80&w=800'
  },
  {
    id: 'cfr-10',
    category: 'Company Formation & Registration',
    name: 'GOSI & Nitaqat Setup',
    professionalFee: 3000,
    governmentFee: 0,
    price: 3000,
    desc: 'Social insurance registration and labor file opening.',
    details: [
        'Establishment file opening with Ministry of Human Resources (MHRSD).',
        'GOSI account registration for social insurance.',
        'National Address linking.',
        'Initial Nitaqat assessment.'
    ],
    requirements: [
        'Commercial Registration.',
        'National Address Proof.',
        'GM Contact Details.'
    ],
    inclusions: ['Establishment File Opening', 'GM Registration', 'Nitaqat Level Check'],
    exclusions: ['Monthly GOSI Contributions', 'Saudization Staffing', 'Medical Insurance'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800'
  },
  {
    id: 'cfr-11',
    category: 'Company Formation & Registration',
    name: 'National Address Registration',
    professionalFee: 1000,
    governmentFee: 500,
    price: 1500,
    desc: 'Wasel address registration for the entity.',
    details: [
        'Registration of physical location with Saudi Post (SPL).',
        'Generation of National Address Certificate.',
        'QR Code generation for location.'
    ],
    requirements: [
        'Office Lease Agreement.',
        'Building Number and Unit Number.'
    ],
    inclusions: ['SPL Registration', 'Proof of Address Certificate', 'Map Location Pinning'],
    exclusions: ['Physical Mailbox Rental', 'PO Box Subscription'],
    image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=800'
  },
  {
    id: 'cfr-12',
    category: 'Company Formation & Registration',
    name: 'Qiwa Portal Onboarding',
    professionalFee: 1500,
    governmentFee: 1265,
    price: 2765,
    desc: 'Full setup of Qiwa labor services platform.',
    details: [
        'Qiwa company file activation.',
        'Delegation of powers to Level 1 User (GM).',
        'Setup of e-services for visa issuance and transfer.'
    ],
    requirements: [
        'Active Ministry of Labor File.',
        'GM Absher Account.'
    ],
    inclusions: ['Company File Activation', 'Authorized User Setup', 'e-Services Config'],
    exclusions: ['Annual Qiwa Subscription', 'Work Permit Levies'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800'
  },
  {
    id: 'cfr-13',
    category: 'Company Formation & Registration',
    name: 'Muqeem System Setup',
    professionalFee: 2000,
    governmentFee: 1500,
    price: 3500,
    desc: 'Registration on Muqeem visa management portal.',
    details: [
        'Elm contract generation and activation.',
        'Muqeem portal user creation.',
        'Points package selection guidance.'
    ],
    requirements: [
        'Commercial Registration.',
        'Auth Letter on Company Letterhead.'
    ],
    inclusions: ['Portal Registration', 'User Access Setup', 'Elm Contract Setup'],
    exclusions: ['Annual Subscription Package', 'Visa Point Credits'],
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=800'
  },

  // --- 2. Sector / Activity Licensing ---
  {
    id: 'sec-01',
    category: 'Sector / Activity Licensing',
    name: 'Industrial License',
    professionalFee: 47000,
    governmentFee: 2000,
    price: 49000,
    desc: 'Factory and manufacturing license via Ministry of Industry (MOIMR).',
    details: [
        'Technical feasibility study review.',
        'Submission of initial approval request to Ministry of Industry.',
        'Land allocation request with MODON or Royal Commission.',
        'Environmental permit application (NCEC).',
        'Final Industrial License issuance.'
    ],
    requirements: [
        'Detailed Technical Feasibility Study.',
        'Factory Layout Drawings.',
        'Environmental Impact Assessment (EIA).'
    ],
    inclusions: ['Environmental Permit', 'Technical Study Submission', 'Final License Issuance'],
    exclusions: ['Land Allocation Fees', 'Factory Construction', 'Machinery Import Duties'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800'
  },
  {
    id: 'sec-02',
    category: 'Sector / Activity Licensing',
    name: 'Contracting License',
    professionalFee: 10000,
    governmentFee: 2000,
    price: 12000,
    desc: 'General construction and building contracting license.',
    details: [
        'Activity addition to MISA license and CR.',
        'MOMRA Balady portal classification file opening.',
        'Guidance on engineer ratios for classification.'
    ],
    requirements: [
        'MISA Service License.',
        'Registered Engineers (Saudi Council of Engineers).'
    ],
    inclusions: ['MOMRA Classification Support', 'License Application', 'Activity Addition'],
    exclusions: ['Engineering Staff Accreditation Fees', 'Project Insurance'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800'
  },
  {
    id: 'sec-03',
    category: 'Sector / Activity Licensing',
    name: 'Real Estate Developer License',
    professionalFee: 20000,
    governmentFee: 5000,
    price: 25000,
    desc: 'Wafi / REGA licensing for property development projects.',
    details: [
        'Registration with Real Estate General Authority (REGA).',
        'Wafi qualification application for off-plan sales.',
        'Project registration and escrow account setup guidance.'
    ],
    requirements: [
        'Land Deed (Sukuk).',
        'Technical & Financial Capability Proof.',
        'Audited Financials.'
    ],
    inclusions: ['Wafi Program Registration', 'Developer Qualification', 'Project Registration'],
    exclusions: ['Project-Specific Escrow Fees', 'Off-Plan Sales Permit'],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800'
  },
  {
    id: 'sec-04',
    category: 'Sector / Activity Licensing',
    name: 'Transport & Logistics License',
    professionalFee: 25000,
    governmentFee: 5000,
    price: 30000,
    desc: 'Transport General Authority (TGA) licensing for logistics.',
    details: [
        'TGA portal registration (Naql).',
        'Activity permit application (Freight Forwarding / Land Transport).',
        'Vehicle operating card issuance.',
        'Driver sponsorship linkage.'
    ],
    requirements: [
        'Fleet Vehicle Registrations (Istibara).',
        'Yard/Warehouse Lease.',
        'Bank Guarantee.'
    ],
    inclusions: ['TGA Platform Registration', 'Operating Card Issuance', 'Activity Permit'],
    exclusions: ['Vehicle Inspection Fees', 'Driver Visas', 'Fleet Insurance'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800'
  },
  {
    id: 'sec-05',
    category: 'Sector / Activity Licensing',
    name: 'Engineering Professional License',
    professionalFee: 15000,
    governmentFee: 2000,
    price: 17000,
    desc: 'Professional engineering entity license (requires Saudi Council of Engineers).',
    details: [
        'Entity registration with Saudi Council of Engineers (SCE).',
        'Verification of GM engineering credentials.',
        'Professional indemnity insurance advisory.'
    ],
    requirements: [
        'GM with valid SCE Membership (Professional/Consultant).',
        'Professional Indemnity Insurance Policy.'
    ],
    inclusions: ['SCE Entity Registration', 'License Application', 'MISA Engineering Code'],
    exclusions: ['Individual Engineer SCE Memberships', 'Professional Indemnity Insurance'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800'
  },
  {
    id: 'sec-06',
    category: 'Sector / Activity Licensing',
    name: 'Healthcare Facility License',
    professionalFee: 25000,
    governmentFee: 5000,
    price: 30000,
    desc: 'MOH licensing for clinics, hospitals, and medical centers.',
    details: [
        'Submission of preliminary approval to Ministry of Health (MOH) / Seha.',
        'Civil Defense safety inspection coordination.',
        'Final medical license issuance upon facility readiness inspection.'
    ],
    requirements: [
        'Medical Director (Saudi Consultant).',
        'Facility Floor Plans (MOH compliant).',
        'List of Medical Equipment.'
    ],
    inclusions: ['MOH Preliminary Approval', 'Final License Support', 'Facility Inspection Coord'],
    exclusions: ['Medical Equipment Inspection', 'Staff Licensing (SCFHS)', 'Civil Defense'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800'
  },
  {
    id: 'sec-07',
    category: 'Sector / Activity Licensing',
    name: 'Education & Training License',
    professionalFee: 18000,
    governmentFee: 5000,
    price: 23000,
    desc: 'Ministry of Education / TVTC licensing for schools and institutes.',
    details: [
        'Application to TVTC (Vocational) or MoE (Academic).',
        'Curriculum and course approval submission.',
        'Facility safety and suitability inspection.'
    ],
    requirements: [
        'Academic Manager CV.',
        'Proposed Curriculum / Course List.',
        'Facility Lease.'
    ],
    inclusions: ['TVTC/MoE Application', 'Curriculum Review Submission', 'Preliminary Permit'],
    exclusions: ['Facility Safety Inspection Fees', 'Staff Accreditation', 'Municipality License'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800'
  },
  {
    id: 'sec-08',
    category: 'Sector / Activity Licensing',
    name: 'Tourism Investment License',
    professionalFee: 22000,
    governmentFee: 5000,
    price: 27000,
    desc: 'Ministry of Tourism licensing for hotels and travel agencies.',
    details: [
        'Registration on Ministry of Tourism portal.',
        'Classification application (Star rating).',
        'Operational license issuance.'
    ],
    requirements: [
        'Hotel Operator Agreement (if applicable).',
        'Civil Defense License.',
        'Municipality License.'
    ],
    inclusions: ['MT Tourism License', 'Classification Support', 'Portal Registration'],
    exclusions: ['Hotel Operator Fees', 'Municipality Fees', 'Civil Defense'],
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800'
  },
  {
    id: 'sec-09',
    category: 'Sector / Activity Licensing',
    name: 'Mining License',
    professionalFee: 30000,
    governmentFee: 10000,
    price: 40000,
    desc: 'Exploration and exploitation licenses for mining sector.',
    details: [
        'Submission of technical work program to Ministry of Industry (Mining Deputy).',
        'Surface rights coordination.',
        'Exploration license issuance.'
    ],
    requirements: [
        'Geological Technical Report.',
        'Financial Solvency Proof.',
        'Environmental Management Plan.'
    ],
    inclusions: ['Exploration License App', 'Ministry Liaison', 'Technical Data Submission'],
    exclusions: ['Environmental Impact Study', 'Surface Rights Fees', 'Drilling Costs'],
    image: 'https://images.unsplash.com/photo-1518558041923-a262438c71b6?q=80&w=800'
  },
  {
    id: 'sec-10',
    category: 'Sector / Activity Licensing',
    name: 'Cybersecurity Service License',
    professionalFee: 15000,
    governmentFee: 2000,
    price: 17000,
    desc: 'NCA compliance and licensing for cybersecurity firms.',
    details: [
        'Registration with National Cybersecurity Authority (NCA).',
        'Submission of service portfolio for approval.',
        'Compliance checklist verification.'
    ],
    requirements: [
        'List of Qualified Cyber Staff.',
        'Company Profile detailing Cyber Services.'
    ],
    inclusions: ['NCA Registration', 'Compliance Checklist Review', 'License Application'],
    exclusions: ['Technical Audit Fees', 'Certification Costs', 'Staff Training'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800'
  },

  // --- 3. Manpower & Immigration ---
  {
    id: 'man-01',
    category: 'Manpower & Immigration',
    name: 'Investor / GM Visa',
    professionalFee: 7000,
    governmentFee: 2000,
    price: 9000,
    desc: 'Residency visa processing for foreign investors/partners.',
    details: [
        'MISA support letter issuance.',
        'Visa block request via Ministry of Foreign Affairs (MOFA).',
        'Embassy invitation letter drafting.',
        'Medical test coordination guidance.'
    ],
    requirements: [
        'MISA License.',
        'Passport Copy.',
        'Degree Certificate (Attested).'
    ],
    inclusions: ['Visa Block Request', 'Embassy Letter Drafting', 'MISA Support Letter'],
    exclusions: ['Medical Test Fees', 'Embassy Stamping', 'Travel Insurance'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800'
  },
  {
    id: 'man-02',
    category: 'Manpower & Immigration',
    name: 'Employee Work Visa',
    professionalFee: 4500,
    governmentFee: 2000,
    price: 6500,
    desc: 'Processing of employment visas for staff.',
    details: [
        'Qiwa visa quota check and allocation.',
        'Visa request submission.',
        'Employment contract drafting.'
    ],
    requirements: [
        'Candidate Passport.',
        'Signed Offer Letter.',
        'Degree Certificate (if professional profession).'
    ],
    inclusions: ['Qiwa Visa Request', 'Job Contract Template', 'Quota Check'],
    exclusions: ['Government Visa Fee (2000 SAR)', 'Recruitment Agency Fees'],
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800'
  },
  {
    id: 'man-03',
    category: 'Manpower & Immigration',
    name: 'New Iqama Issuance',
    professionalFee: 3800,
    governmentFee: 650,
    price: 4450,
    desc: 'Issuance of resident identity card (Iqama).',
    details: [
        'Medical report upload verification.',
        'Health insurance policy linkage.',
        'Absher/Muqeem issuance request.',
        'Card delivery coordination.'
    ],
    requirements: [
        'Entry Visa Number.',
        'Medical Test Result.',
        'Health Insurance Policy.'
    ],
    inclusions: ['Medical Report Check', 'Border Number Linking', 'Absher Processing'],
    exclusions: ['Medical Insurance', 'Government Iqama Fee', 'Work Permit Levy'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800'
  },
  {
    id: 'man-04',
    category: 'Manpower & Immigration',
    name: 'Iqama Renewal',
    professionalFee: 2000,
    governmentFee: 650,
    price: 2650,
    desc: 'Annual renewal service for existing Iqamas.',
    details: [
        'Work permit renewal via Qiwa.',
        'Insurance validity check.',
        'Iqama renewal via Muqeem.'
    ],
    requirements: [
        'Valid Medical Insurance.',
        'Paid Government Fees.'
    ],
    inclusions: ['Work Permit Renewal (Qiwa)', 'Iqama Renewal (Absher)', 'Insurance Linkage'],
    exclusions: ['Work Permit Levy (~9600 SAR)', 'Medical Insurance Premium'],
    image: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=800'
  },
  {
    id: 'man-05',
    category: 'Manpower & Immigration',
    name: 'Exit/Re-Entry Visa',
    professionalFee: 1500,
    governmentFee: 200,
    price: 1700,
    desc: 'Processing travel permissions for residents.',
    details: [
        'Visa validity calculation.',
        'Issuance via Muqeem portal.',
        'Multi-entry vs Single-entry configuration.'
    ],
    requirements: [
        'Valid Iqama.',
        'Passport valid for 3+ months.'
    ],
    inclusions: ['Portal Request', 'Validity Check', 'Visa Issuance'],
    exclusions: ['Government Fee (200 SAR/mo)', 'Dependent Levies'],
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800'
  },
  {
    id: 'man-06',
    category: 'Manpower & Immigration',
    name: 'End-of-Service Settlement',
    professionalFee: 1500,
    governmentFee: 0,
    price: 1500,
    desc: 'Calculation and documentation of final settlements.',
    details: [
        'Calculation of End of Service Benefits (ESB) as per Labor Law.',
        'Drafting of Final Settlement and Release form.',
        'Final Exit Visa issuance.'
    ],
    requirements: [
        'Employee Contract.',
        'Resignation/Termination Letter.'
    ],
    inclusions: ['ESB Calculation', 'Clearance Form Drafting', 'Final Exit Visa Processing'],
    exclusions: ['Flight Ticket Cost', 'Actual Settlement Payment'],
    image: 'https://images.unsplash.com/photo-1554224154-260327c00c4b?q=80&w=800'
  },

  // --- 4. Strategy & Management Consulting ---
  {
    id: 'strat-01',
    category: 'Strategy & Management Consulting',
    name: 'Business Strategy & Planning',
    professionalFee: 8000,
    governmentFee: 0,
    price: 8000,
    desc: 'Comprehensive strategic roadmap, growth planning, and business modeling.',
    details: [
        'Executive strategy workshop.',
        'Business model canvas development.',
        '3-5 year growth roadmap.'
    ],
    requirements: [
        'Current Business Data.',
        'Management Interview Access.'
    ],
    inclusions: ['Market Analysis', 'Financial Modeling', 'Strategic Roadmap'],
    exclusions: ['Implementation Management', 'Legal Structuring'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800'
  },
  {
    id: 'strat-02',
    category: 'Strategy & Management Consulting',
    name: 'Market Entry Strategy',
    professionalFee: 12000,
    governmentFee: 0,
    price: 12000,
    desc: 'Detailed entry plan for Saudi market including regulatory and competitor analysis.',
    details: [
        'Macro-economic analysis of KSA market.',
        'Competitor benchmarking.',
        'Regulatory landscape mapping.',
        'Go-to-market plan.'
    ],
    requirements: [
        'Product/Service Brief.',
        'Target Audience Definition.'
    ],
    inclusions: ['Regulatory Landscape Report', 'Competitor Analysis', 'Go-to-Market Strategy'],
    exclusions: ['Marketing Campaign Execution', 'Partner Search'],
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800'
  },
  {
    id: 'strat-03',
    category: 'Strategy & Management Consulting',
    name: 'Organizational Restructuring',
    professionalFee: 10000,
    governmentFee: 0,
    price: 10000,
    desc: 'Redesigning organizational structure for efficiency and compliance.',
    details: [
        'As-is organizational assessment.',
        'To-be org chart design.',
        'Role and responsibility definitions.'
    ],
    requirements: [
        'Current Org Chart.',
        'Employee List.'
    ],
    inclusions: ['Current State Assessment', 'Target Operating Model', 'Org Chart Design'],
    exclusions: ['Legal Redundancy Processing', 'Recruitment'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800'
  },
  {
    id: 'strat-04',
    category: 'Strategy & Management Consulting',
    name: 'M&A Advisory (Deal Advisory)',
    professionalFee: 15000,
    governmentFee: 0,
    price: 15000,
    desc: 'Consulting on mergers, acquisitions, and joint venture deals.',
    details: [
        'Target identification and screening.',
        'Commercial due diligence.',
        'Valuation modeling.',
        'Deal structuring advice.'
    ],
    requirements: [
        'Investment Criteria.',
        'Target Company Info (if available).'
    ],
    inclusions: ['Commercial Due Diligence', 'Deal Structuring Advice', 'Valuation Support'],
    exclusions: ['Legal Due Diligence', 'Financial Audit', 'Success Fees'],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800'
  },
  {
    id: 'strat-05',
    category: 'Strategy & Management Consulting',
    name: 'Risk Management Framework',
    professionalFee: 6000,
    governmentFee: 0,
    price: 6000,
    desc: 'Enterprise risk assessment and mitigation strategy planning.',
    details: [
        'Risk identification workshop.',
        'Risk matrix development (Probability vs Impact).',
        'Mitigation plan drafting.'
    ],
    requirements: [
        'Operational Data.',
        'Access to Key Stakeholders.'
    ],
    inclusions: ['Risk Register Development', 'Mitigation Strategies', 'Compliance Mapping'],
    exclusions: ['Insurance Policy Premiums', 'Crisis Management'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800'
  },

  // --- 5. Financial & Tax Advisory ---
  {
    id: 'fin-01',
    category: 'Financial & Tax Advisory',
    name: 'Financial Advisory & Planning',
    professionalFee: 5000,
    governmentFee: 0,
    price: 5000,
    desc: 'Budgeting, forecasting, and financial health check.',
    details: [
        'Historical financial review.',
        'Cash flow forecasting.',
        'Budget preparation.'
    ],
    requirements: [
        'Past Financial Statements.',
        'Revenue Projections.'
    ],
    inclusions: ['Cash Flow Forecasting', 'Budget Setup', 'Financial Health Report'],
    exclusions: ['Audited Financial Statements', 'Bookkeeping'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800'
  },
  {
    id: 'fin-02',
    category: 'Financial & Tax Advisory',
    name: 'Tax & Zakat Consulting',
    professionalFee: 4000,
    governmentFee: 0,
    price: 4000,
    desc: 'Strategic tax planning and compliance advisory for VAT and Corporate Tax.',
    details: [
        'Tax structure optimization.',
        'Zakat calculation review.',
        'Transfer pricing compliance check.'
    ],
    requirements: [
        'Entity Legal Structure Details.',
        'Financial Statements.'
    ],
    inclusions: ['VAT Impact Assessment', 'Corporate Tax Planning', 'Zakat Calculation Review'],
    exclusions: ['ZATCA Fines/Penalties Appeal', 'Tax Filing'],
    image: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?q=80&w=800'
  },
  {
    id: 'fin-03',
    category: 'Financial & Tax Advisory',
    name: 'Audit Readiness Preparation',
    professionalFee: 6000,
    governmentFee: 0,
    price: 6000,
    desc: 'Preparing financial records and internal controls for external audit.',
    details: [
        'Trial balance reconciliation.',
        'Supporting document organization.',
        'Audit file compilation.'
    ],
    requirements: [
        'General Ledger Access.',
        'Bank Statements.'
    ],
    inclusions: ['Trial Balance Review', 'Reconciliation Support', 'Audit File Prep'],
    exclusions: ['External Audit Fee', 'Sign-off by Auditor'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800'
  },
  {
    id: 'fin-04',
    category: 'Financial & Tax Advisory',
    name: 'IFRS / IPSAS Conversion',
    professionalFee: 8000,
    governmentFee: 0,
    price: 8000,
    desc: 'Converting accounting standards to International Financial Reporting Standards.',
    details: [
        'Gap analysis (Local GAAP vs IFRS).',
        'Policy manual update.',
        'Opening balance sheet adjustment.'
    ],
    requirements: [
        'Current Policy Manual.',
        'Financial Statements.'
    ],
    inclusions: ['Gap Analysis', 'Policy Manual Update', 'Conversion Adjustments'],
    exclusions: ['ERP System Re-implementation', 'Staff Training'],
    image: 'https://images.unsplash.com/photo-1554224154-260327c00c4b?q=80&w=800'
  },
  {
    id: 'fin-05',
    category: 'Financial & Tax Advisory',
    name: 'Accounting System Implementation',
    professionalFee: 5000,
    governmentFee: 0,
    price: 5000,
    desc: 'Setup and configuration of accounting software (Xero, Zoho, etc.).',
    details: [
        'Software selection advisory.',
        'Chart of accounts configuration.',
        'Opening balance import.',
        'User training session.'
    ],
    requirements: [
        'Chart of Accounts.',
        'Customer/Vendor Lists.'
    ],
    inclusions: ['Chart of Accounts Setup', 'Software Configuration', 'Opening Balance Import'],
    exclusions: ['Software Subscription Fees', 'Data Entry'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800'
  },

  // --- 6. Human Capital & HR ---
  {
    id: 'hr-01',
    category: 'Human Capital & HR',
    name: 'HR Strategy & Org Design',
    professionalFee: 6000,
    governmentFee: 0,
    price: 6000,
    desc: 'Developing HR policies, handbooks, and organizational hierarchies.',
    details: [
        'Drafting of Employee Handbook compliant with Saudi Labor Law.',
        'Job grading and salary structure design.',
        'HR policy formulation.'
    ],
    requirements: [
        'Company Culture Brief.',
        'Current Policies (if any).'
    ],
    inclusions: ['Employee Handbook', 'Grading Structure', 'HR Policy Manual'],
    exclusions: ['Employment Contract Legal Review', 'Ministry Filing'],
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800'
  },
  {
    id: 'hr-02',
    category: 'Human Capital & HR',
    name: 'Saudization & Nitaqat Planning',
    professionalFee: 4000,
    governmentFee: 0,
    price: 4000,
    desc: 'Strategic planning to maintain Green/Platinum Nitaqat status.',
    details: [
        'Nitaqat calculator simulation.',
        'Hiring plan development for compliance.',
        'Saudization quota monitoring strategy.'
    ],
    requirements: [
        'Current Employee List (Saudi/Expat).',
        'Entity Nitaqat Color.'
    ],
    inclusions: ['Nitaqat Calculator', 'Hiring Plan for Green Status', 'Quota Analysis'],
    exclusions: ['Recruitment of Nationals', 'GOSI Payments'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800'
  },
  {
    id: 'hr-03',
    category: 'Human Capital & HR',
    name: 'Recruitment & Talent Acquisition',
    professionalFee: 3000,
    governmentFee: 0,
    price: 3000,
    desc: 'Executive search and recruitment strategy consulting.',
    details: [
        'Job description drafting.',
        'Sourcing channel identification.',
        'Screening and shortlisting support.'
    ],
    requirements: [
        'Vacancy Details.',
        'Budget Approval.'
    ],
    inclusions: ['Job Descriptions', 'Sourcing Channel Strategy', 'Interview Guides'],
    exclusions: ['Headhunting Fees', 'Advertising Costs', 'Candidate Travel'],
    image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=800'
  },
  {
    id: 'hr-04',
    category: 'Human Capital & HR',
    name: 'Compensation & Benefits Study',
    professionalFee: 5000,
    governmentFee: 0,
    price: 5000,
    desc: 'Benchmarking salaries and designing benefit packages.',
    details: [
        'Market salary benchmarking.',
        'Benefits package design (Medical, Housing, Transport).',
        'Incentive scheme proposal.'
    ],
    requirements: [
        'Current Salary Data.',
        'Competitor List.'
    ],
    inclusions: ['Salary Benchmarking Report', 'Benefits Structure Design', 'Pay Scale'],
    exclusions: ['Individual Salary Negotiation', 'Payroll Processing'],
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800'
  },

  // --- 7. Digital & IT Consulting ---
  {
    id: 'it-01',
    category: 'Digital & IT Consulting',
    name: 'Digital Transformation Strategy',
    professionalFee: 10000,
    governmentFee: 0,
    price: 10000,
    desc: 'Roadmap for digitizing business operations and processes.',
    details: [
        'Digital maturity assessment.',
        'Technology roadmap creation.',
        'Process automation identification.'
    ],
    requirements: [
        'IT Infrastructure Audit Access.',
        'Business Process Docs.'
    ],
    inclusions: ['Technology Gap Analysis', 'Digital Roadmap', 'Tool Selection'],
    exclusions: ['Software Development', 'Hardware Procurement'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800'
  },
  {
    id: 'it-02',
    category: 'Digital & IT Consulting',
    name: 'ERP Implementation Support',
    professionalFee: 12000,
    governmentFee: 0,
    price: 12000,
    desc: 'Advisory and project management for ERP deployment.',
    details: [
        'Requirement gathering workshop.',
        'Vendor evaluation and selection.',
        'Project management (PMO).'
    ],
    requirements: [
        'Functional Requirements.',
        'Budget.'
    ],
    inclusions: ['Requirements Gathering', 'Vendor Selection Support', 'PMO'],
    exclusions: ['Technical Implementation', 'License Costs'],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800'
  },
  {
    id: 'it-03',
    category: 'Digital & IT Consulting',
    name: 'Cybersecurity Advisory',
    professionalFee: 8000,
    governmentFee: 0,
    price: 8000,
    desc: 'Security assessment and compliance roadmap.',
    details: [
        'Vulnerability assessment.',
        'Security policy drafting.',
        'Compliance gap analysis (NCA/ECC).'
    ],
    requirements: [
        'Network Topology.',
        'Access Policies.'
    ],
    inclusions: ['Security Policy Development', 'Vulnerability Assessment Report', 'Compliance Check'],
    exclusions: ['Penetration Testing', 'Remediation Implementation'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800'
  },
  {
    id: 'it-04',
    category: 'Digital & IT Consulting',
    name: 'Data Analytics & BI Setup',
    professionalFee: 6000,
    governmentFee: 0,
    price: 6000,
    desc: 'Setting up business intelligence dashboards and reporting.',
    details: [
        'KPI definition workshop.',
        'Data source identification.',
        'Dashboard mockup design.'
    ],
    requirements: [
        'Data Samples.',
        'Reporting Requirements.'
    ],
    inclusions: ['KPI Definition', 'Dashboard Mockups', 'Data Strategy'],
    exclusions: ['Data Warehousing Infra', 'ETL Development'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800'
  },

  // --- 8. Marketing & Branding ---
  {
    id: 'mkt-01',
    category: 'Marketing & Branding',
    name: 'Brand Strategy & Positioning',
    professionalFee: 8000,
    governmentFee: 0,
    price: 8000,
    desc: 'Defining brand identity, values, and market positioning.',
    details: [
        'Brand archetype definition.',
        'Core values workshop.',
        'Visual identity guidelines creation.'
    ],
    requirements: [
        'Company Vision.',
        'Target Audience Profile.'
    ],
    inclusions: ['Brand Archetype', 'Voice Guidelines', 'Visual Identity Guide'],
    exclusions: ['Logo Design', 'Advertising Spend'],
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=800'
  },
  {
    id: 'mkt-02',
    category: 'Marketing & Branding',
    name: 'Digital Marketing Strategy',
    professionalFee: 5000,
    governmentFee: 0,
    price: 5000,
    desc: 'Comprehensive plan for SEO, SEM, and social media presence.',
    details: [
        'Channel selection strategy.',
        'Content pillar definition.',
        'SEO technical audit.'
    ],
    requirements: [
        'Website URL.',
        'Social Media Handles.'
    ],
    inclusions: ['Channel Strategy', 'Content Pillars', 'SEO Audit'],
    exclusions: ['Ad Spend', 'Content Creation', 'Community Management'],
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800'
  },
  {
    id: 'mkt-03',
    category: 'Marketing & Branding',
    name: 'Customer Experience (CX) Consulting',
    professionalFee: 6000,
    governmentFee: 0,
    price: 6000,
    desc: 'Mapping and improving customer journeys and touchpoints.',
    details: [
        'Customer journey mapping.',
        'Pain point identification.',
        'CX framework development.'
    ],
    requirements: [
        'Customer Feedback Data.',
        'Process Maps.'
    ],
    inclusions: ['Customer Journey Mapping', 'Pain Point Analysis', 'CX Framework'],
    exclusions: ['Mystery Shopper Fieldwork', 'Software Tools'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800'
  },

  // --- 9. Market Research ---
  {
    id: 'res-01',
    category: 'Market Research',
    name: 'Market Research Study',
    professionalFee: 8000,
    governmentFee: 0,
    price: 8000,
    desc: 'In-depth analysis of industry trends, customer demographics, and demand.',
    details: [
        'Secondary research on industry trends.',
        'Consumer survey design and analysis.',
        'Demand forecasting model.'
    ],
    requirements: [
        'Research Objectives.',
        'Target Market Definition.'
    ],
    inclusions: ['Consumer Survey Analysis', 'Trend Report', 'Demand Forecasting'],
    exclusions: ['Focus Groups Facility', 'Panel Rewards'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800'
  },
  {
    id: 'res-02',
    category: 'Market Research',
    name: 'Feasibility Study',
    professionalFee: 10000,
    governmentFee: 0,
    price: 10000,
    desc: 'Financial and technical feasibility assessment for new projects.',
    details: [
        'Technical feasibility analysis.',
        'Financial viability modeling (ROI, NPV).',
        'Market demand assessment.'
    ],
    requirements: [
        'Project Concept Note.',
        'Capital Budget.'
    ],
    inclusions: ['Technical Feasibility', 'Financial Feasibility', 'Market Feasibility'],
    exclusions: ['Architectural Drawings', 'Site Survey'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800'
  },
  {
    id: 'res-03',
    category: 'Market Research',
    name: 'Competitor Analysis',
    professionalFee: 5000,
    governmentFee: 0,
    price: 5000,
    desc: 'Detailed benchmarking against key market competitors.',
    details: [
        'Identification of key competitors.',
        'Product/Pricing analysis.',
        'SWOT analysis.'
    ],
    requirements: [
        'List of Known Competitors.',
        'Product Features.'
    ],
    inclusions: ['Direct Competitor Profiling', 'SWOT Analysis', 'Pricing Benchmark'],
    exclusions: ['Mystery Shopping', 'Purchase of Competitor Products'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800'
  },

  // --- 10. Legal Advisory ---
  {
    id: 'leg-01',
    category: 'Legal Advisory',
    name: 'Commercial Law Advisory',
    professionalFee: 5000,
    governmentFee: 0,
    price: 5000,
    desc: 'General legal advice on Saudi commercial regulations.',
    details: [
        'Legal opinion memo on specific query.',
        'Regulatory compliance review.',
        'Risk assessment report.'
    ],
    requirements: [
        'Specific Legal Query.',
        'Relevant Documents.'
    ],
    inclusions: ['Regulatory Advice Memo', 'Compliance Review', 'Risk Assessment'],
    exclusions: ['Litigation', 'Court Representation'],
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800'
  },
  {
    id: 'leg-02',
    category: 'Legal Advisory',
    name: 'Contract Drafting & Review',
    professionalFee: 3000,
    governmentFee: 0,
    price: 3000,
    desc: 'Drafting/reviewing MOUs, employment contracts, and vendor agreements.',
    details: [
        'Review of one contract document.',
        'Redlining and risk commentary.',
        'Drafting of standard clauses.'
    ],
    requirements: [
        'Draft Contract (Word format).',
        'Key Commercial Terms.'
    ],
    inclusions: ['Bilingual Contract Review (1 Doc)', 'Markup & Comments', 'Risk Clauses'],
    exclusions: ['Negotiation Meetings', 'Redrafting from Scratch'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800'
  },
  {
    id: 'leg-03',
    category: 'Legal Advisory',
    name: 'Corporate Governance Framework',
    professionalFee: 7000,
    governmentFee: 0,
    price: 7000,
    desc: 'Designing board charters and governance policies.',
    details: [
        'Board charter drafting.',
        'Committee structure definition.',
        'Delegation of Authority (DoA) matrix.'
    ],
    requirements: [
        'Company Articles of Association.',
        'Management Structure.'
    ],
    inclusions: ['Board Charter', 'Committee Structures', 'Delegation of Authority'],
    exclusions: ['Board Secretary Services', 'Meeting Management'],
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800'
  },

  // --- 11. Operational & Process ---
  {
    id: 'ops-01',
    category: 'Operational Consulting',
    name: 'Business Process Reengineering',
    professionalFee: 8000,
    governmentFee: 0,
    price: 8000,
    desc: 'Optimizing workflows for efficiency and cost reduction.',
    details: [
        'Process mapping (As-Is).',
        'Bottleneck analysis.',
        'Process design (To-Be).'
    ],
    requirements: [
        'Current Process Descriptions.',
        'Staff Interviews.'
    ],
    inclusions: ['Process Mapping (As-Is/To-Be)', 'Efficiency Report', 'Gap Analysis'],
    exclusions: ['Implementation Supervision', 'Change Management Training'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800'
  },
  {
    id: 'ops-02',
    category: 'Operational Consulting',
    name: 'SOP Development',
    professionalFee: 4000,
    governmentFee: 0,
    price: 4000,
    desc: 'Creating standard operating procedure manuals.',
    details: [
        'Drafting of SOPs for one department.',
        'Creation of process flowcharts.',
        'Approval matrix definition.'
    ],
    requirements: [
        'Process List.',
        'Department Head Interview.'
    ],
    inclusions: ['Drafting SOPs (1 Dept)', 'Process Flowcharts', 'Approval Matrices'],
    exclusions: ['Staff Training on SOPs', 'LMS Upload'],
    image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=800'
  },
  {
    id: 'ops-03',
    category: 'Operational Consulting',
    name: 'Supply Chain Optimization',
    professionalFee: 7000,
    governmentFee: 0,
    price: 7000,
    desc: 'Consulting on logistics, procurement, and inventory management.',
    details: [
        'Vendor performance assessment.',
        'Logistics network strategy.',
        'Inventory policy review.'
    ],
    requirements: [
        'Vendor List.',
        'Inventory Reports.'
    ],
    inclusions: ['Vendor Assessment', 'Logistics Strategy', 'Inventory Policy'],
    exclusions: ['Warehousing Costs', '3PL Negotiation'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800'
  },

  // --- 12. BPO & Managed Services ---
  {
    id: 'bpo-01',
    category: 'BPO & Managed Services',
    name: 'Outsourced HR Services',
    professionalFee: 3000,
    governmentFee: 0,
    price: 3000,
    desc: 'Monthly managed HR operations (payroll, leaves, files).',
    details: [
        'Monthly payroll processing.',
        'Leave and attendance tracking.',
        'Employee file maintenance.'
    ],
    requirements: [
        'Employee Data.',
        'Attendance Records.'
    ],
    inclusions: ['Payroll Processing', 'Leave Management', 'Employee File Maintenance'],
    exclusions: ['Visa Government Fees', 'Recruitment', 'End of Service Payment'],
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800'
  },
  {
    id: 'bpo-02',
    category: 'BPO & Managed Services',
    name: 'Outsourced Finance/Bookkeeping',
    professionalFee: 3000,
    governmentFee: 0,
    price: 3000,
    desc: 'Monthly accounting and bookkeeping services.',
    details: [
        'Transaction recording.',
        'Bank reconciliation.',
        'Monthly management report generation.'
    ],
    requirements: [
        'Bank Statements.',
        'Invoices/Receipts.'
    ],
    inclusions: ['Bookkeeping', 'Monthly Management Accounts', 'Expense Tracking'],
    exclusions: ['Audit Fees', 'Tax Payment', 'Backlog Accounting'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800'
  },
  {
    id: 'bpo-03',
    category: 'BPO & Managed Services',
    name: 'Ongoing PRO Services (Retainer)',
    professionalFee: 2500,
    governmentFee: 0,
    price: 2500,
    desc: 'Monthly government relations liaison service.',
    details: [
        'Processing of up to 5 government transactions per month.',
        'Expiry monitoring of company documents.',
        'Ministry visits as required.'
    ],
    requirements: [
        'Company Portal Access.',
        'Power of Attorney.'
    ],
    inclusions: ['5 Gov Transactions/Month', 'Document Expiry Alerts', 'Ministry Visits'],
    exclusions: ['Government Fees', 'Traffic Fines', 'New License Issuance'],
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800'
  },

  // --- 13. Support Services ---
  {
    id: 'supp-01',
    category: 'Support Services',
    name: 'Certified Translation',
    professionalFee: 300,
    governmentFee: 0,
    price: 300,
    desc: 'Official translation of corporate documents (per page).',
    details: [
        'Translation by certified translator.',
        'Stamping with official seal.',
        'Digital PDF delivery.'
    ],
    requirements: [
        'Clear scan of document.'
    ],
    inclusions: ['Certified Translation', 'Office Stamp', 'Digital Delivery'],
    exclusions: ['Original Document Attestation', 'Courier Fees'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800'
  },
  {
    id: 'supp-02',
    category: 'Support Services',
    name: 'Document Legalization',
    professionalFee: 1500,
    governmentFee: 500,
    price: 2000,
    desc: 'Attestation services via MOFA and Embassies.',
    details: [
        'Processing at Ministry of Foreign Affairs (MOFA).',
        'Embassy submission and collection.',
        'Courier management.'
    ],
    requirements: [
        'Original Document.',
        'Authorization Letter.'
    ],
    inclusions: ['MOFA Visit', 'Embassy Liaison', 'Attestation Processing'],
    exclusions: ['MOFA Fees (Actuals)', 'Embassy Fees (Actuals)', 'Shipping'],
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800'
  },
  {
    id: 'supp-03',
    category: 'Support Services',
    name: 'Corporate Bank Account Opening',
    professionalFee: 2000,
    governmentFee: 0,
    price: 2000,
    desc: 'Assistance with bank account setup and KYC.',
    details: [
        'Preparation of bank forms.',
        'Coordination with Relationship Manager.',
        'KYC document compilation.'
    ],
    requirements: [
        'Commercial Registration.',
        'AoA.',
        'National Address.'
    ],
    inclusions: ['Bank Forms Prep', 'RM Introduction', 'KYC File Review'],
    exclusions: ['Minimum Deposit', 'Bank Charges', 'Cheque Book Fees'],
    image: 'https://images.unsplash.com/photo-1565514020176-dbf2277478d3?q=80&w=800'
  },
  {
    id: 'supp-04',
    category: 'Support Services',
    name: 'Virtual Office',
    professionalFee: 1200,
    governmentFee: 0,
    price: 1200,
    desc: 'Registered business address service (Monthly).',
    details: [
        'Ejari contract issuance.',
        'National Address registration support.',
        'Mail reception and notification.'
    ],
    requirements: [
        'Commercial Registration (for renewal) or ID (for new setup).'
    ],
    inclusions: ['Ejari/Lease Contract', 'National Address Reg', 'Mail Handling'],
    exclusions: ['Physical Desk Usage', 'Meeting Room (Limited)', 'Signage'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800'
  },
  {
    id: 'supp-05',
    category: 'Support Services',
    name: 'Company Renewal / Closure',
    professionalFee: 4000,
    governmentFee: 1000,
    price: 5000,
    desc: 'End-to-end service for license renewal or entity liquidation.',
    details: [
        'Submission of renewal applications to all government bodies.',
        'OR Liquidation: Appointment of liquidator and final file closure.'
    ],
    requirements: [
        'Original Licenses.',
        'Financial Clearance Certificates.'
    ],
    inclusions: ['License Renewal Processing', 'Clearance Certificate Request'],
    exclusions: ['Zakat Clearance Payment', 'Liquidator Fees', 'New License Fees'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800'
  },
  {
    id: 'supp-06',
    category: 'Support Services',
    name: 'Trade Name Amendment',
    professionalFee: 1200,
    governmentFee: 500,
    price: 1700,
    desc: 'Official change of company trade name.',
    details: [
        'Name reservation application.',
        'CR amendment submission.',
        'Publication of name change.'
    ],
    requirements: [
        'Current Commercial Registration.',
        'Shareholder Resolution.'
    ],
    inclusions: ['Name Reservation', 'CR Update', 'Ministry Notification'],
    exclusions: ['Re-branding Costs', 'Signage Change', 'Stationery'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800'
  }
];

export const CORE_SERVICES_CONTENT: Record<string, CorePageContent> = {
  // ... (Existing content remains unchanged)
  'misa-license': {
    slug: 'misa-license',
    title: 'MISA Investment License',
    subtitle: 'The Gateway to the Kingdom',
    heroImage: 'https://images.unsplash.com/photo-1582653291655-60ae21f37968?q=80&w=2000&auto=format&fit=crop', // KAFD Tower
    overview: 'The MISA Investment License is the primary legal instrument authorizing foreign entities to operate in Saudi Arabia. Whether you are a service provider, industrial manufacturer, or trading entity, this license grants you full corporate rights equivalent to a local Saudi company. SafaArban manages the entire lifecycle, from the initial "Business Innovation Plan" submission to the final issuance.',
    features: [
      { title: 'Full Corporate Rights', desc: 'Operate independently without a Saudi sponsor (Kafeel).' },
      { title: 'Global Mobility', desc: 'Grant residency (Iqama) to your international staff and management.' },
      { title: 'Government Tenders', desc: 'Qualify for government project bidding and procurement.' },
      { title: 'Profit Repatriation', desc: '100% legal right to repatriate profits to your home country.' }
    ],
    cta: 'Secure Your License'
  },
  'foreign-ownership': {
    slug: 'foreign-ownership',
    title: '100% Foreign Ownership',
    subtitle: 'Control Your Destiny',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop', // Modern Office
    overview: 'Gone are the days of mandatory local partnerships. Under the modern foreign investment law, international investors can own 100% of their Saudi entity in most sectors. This structure protects your intellectual property, brand equity, and management control. We structure your Articles of Association (AoA) to ensure you retain absolute decision-making power.',
    features: [
      { title: 'Asset Protection', desc: 'You own the company assets, vehicles, and real estate directly.' },
      { title: 'No Profit Sharing', desc: 'Retain 100% of dividends without mandatory local splits.' },
      { title: 'Management Control', desc: 'Appoint your own General Manager and Board of Directors.' },
      { title: 'Brand Security', desc: 'Register trademarks under your global entity name.' }
    ],
    cta: 'Structure Your Entity'
  },
  'rhq-setup': {
    slug: 'rhq-setup',
    title: 'Regional HQ (RHQ) Setup',
    subtitle: 'The Strategic Command Center',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop', // Skyscrapers
    overview: 'The Regional Headquarters (RHQ) program is designed for multinational groups establishing their MENA base in Riyadh. It is not just an office; it is a strategic classification that unlocks exclusive government contracts and massive tax incentives. It is mandatory for any foreign firm wishing to contract with Saudi government entities post-2024.',
    features: [
      { title: '0% Tax Holiday', desc: '30-year exemption on corporate income tax for RHQ activities.' },
      { title: 'Visa Exemptions', desc: 'Exemption from Saudization quotas for 10 years.' },
      { title: 'Government Access', desc: 'Exclusive eligibility for GIGA-project tenders.' },
      { title: 'VIP Services', desc: 'Dedicated MISA concierge for all government relations.' }
    ],
    cta: 'Establish Your HQ'
  },
  'commercial-registration': {
    slug: 'commercial-registration',
    title: 'Commercial Registration (CR)',
    subtitle: 'Your Business Birth Certificate',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop', // Meeting Room
    overview: 'The Commercial Registration (CR) is the official identification of your company issued by the Ministry of Commerce. It defines your legal activities, capital structure, and authorized signatories. Without a CR, you cannot open a bank account, hire staff, or lease an office. We expedite this issuance within 24 hours of MISA licensing.',
    features: [
      { title: 'Legal Identity', desc: 'Required for all contracts and legal disputes.' },
      { title: 'Chamber Membership', desc: 'Includes automatic enrollment in the Riyadh Chamber of Commerce.' },
      { title: 'Activity Definition', desc: 'Specifically lists ISIC-4 codes for your permitted operations.' },
      { title: 'Digital Integration', desc: 'Automatically links to ZATCA and Labor Office files.' }
    ],
    cta: 'Issue Your CR'
  },
  'investor-visa': {
    slug: 'investor-visa',
    title: 'Investor Visa & Iqama',
    subtitle: 'Residency for Visionaries',
    heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop', // Airport/Travel
    overview: 'Securing legal residency is the final step in your setup journey. The Investor Visa allows partners and General Managers to reside in the Kingdom, sponsor their families, and travel freely. We navigate the "Muqeem" and "Jawazat" portals to issue your Iqama ID cards swiftly.',
    features: [
      { title: 'Premium Residency', desc: 'Options for specialized talent and high-net-worth investors.' },
      { title: 'Family Sponsorship', desc: 'Bring your spouse and children under your own sponsorship.' },
      { title: 'Multiple Entry', desc: 'Freedom to enter and exit the Kingdom without restriction.' },
      { title: 'Property Rights', desc: 'Eligibility to lease residential and commercial property.' }
    ],
    cta: 'Process Residency'
  }
};

export const BLOG_POSTS: BlogPost[] = [
  // --- FORMATION & LICENSING ---
  {
    id: 'guide-misa-100',
    title: "100% Foreign Ownership in Saudi Arabia: The 2026 MISA Guide",
    excerpt: "A comprehensive breakdown of how foreign investors can secure 100% ownership in Saudi Arabia without a local sponsor.",
    content: `**Introduction**
    Saudi Arabia's Foreign Investment Law has undergone a radical transformation under Vision 2030. The Ministry of Investment (MISA) now allows 100% foreign ownership in most sectors, including trading, retail, and IT, eliminating the need for a local 'Kafeel' or sponsor.

    **Key Requirements**
    To qualify for a MISA license, foreign entities must provide:
    - Audited financial statements for the last fiscal year.
    - A commercial registration (or equivalent) from the home country.
    - A clearly defined 'Business Innovation Plan' demonstrating economic value.

    **The MISA License Types**
    - **Service License:** For IT, consulting, marketing, and professional services. Zero minimum capital requirement (though solvency must be proved).
    - **Industrial License:** For manufacturing and heavy industry. Grants customs exemptions and land allocation privileges.
    - **Trading License:** For retail and wholesale. Requires a higher degree of compliance but offers full access to the Saudi consumer market.

    **Timeline**
    With SafaArban's fast-track service, MISA licenses can be issued in as little as 24-48 hours once documents are attested. The subsequent Commercial Registration (CR) follows immediately.`,
    date: "Jan 12, 2026",
    author: "Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1582653291655-60ae21f37968?q=80&w=2000",
    tags: ["Formation", "MISA", "Investment"]
  },
  {
    id: 'guide-rhq-2030',
    title: "Regional HQ Program (RHQ): Tax Holidays & Incentives Explained",
    excerpt: "Why multinational corporations are moving their headquarters to Riyadh. A deep dive into the 30-year tax holiday.",
    content: `**The RHQ Mandate**
    Effective January 2024, the Saudi government restricted government entities from contracting with foreign companies that do not have a Regional Headquarters (RHQ) in the Kingdom. This bold policy aims to make Riyadh the commercial capital of the Middle East.

    **Incentives Package**
    - **0% Corporate Income Tax:** A 30-year tax holiday on RHQ activities.
    - **0% Withholding Tax:** Exemption on dividends and payments to non-residents.
    - **Unlimited Visas:** Exemption from Saudization quotas for RHQ staff for 10 years.
    - **Spousal Work Permits:** Automatic work authorization for spouses of RHQ employees.

    **Eligibility Criteria**
    To qualify, an entity must:
    - Have a physical office in Riyadh.
    - Operate in at least two other countries (excluding KSA and the HQ country).
    - Perform core strategic functions (management, budgeting, marketing) from Riyadh.

    **Strategic Advantage**
    Beyond the tax benefits, RHQ status grants exclusive access to Giga-Projects (NEOM, Red Sea) tenders. It signals a long-term commitment to the Kingdom, unlocking preferential treatment from government stakeholders.`,
    date: "Jan 15, 2026",
    author: "Dr. Faisal Al-Saud",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000",
    tags: ["Strategy", "RHQ", "Tax"]
  },
  {
    id: 'guide-industrial',
    title: "Industrial Licensing: Manufacturing in the Kingdom",
    excerpt: "Setting up factories in Saudi Arabia. Understanding the MODON and Ministry of Industry requirements.",
    content: `**The Industrial Revolution**
    Vision 2030 aims to transform Saudi Arabia into a global logistics and manufacturing hub. The National Industrial Strategy (NIS) focuses on localizing supply chains in sectors like automotive, pharmaceuticals, and food processing.

    **Ministry of Industry & Mineral Resources (MIM)**
    Unlike standard service licenses, industrial projects require approval from the Ministry of Industry. This "Industrial License" grants privileges such as:
    - Customs duty exemption on imported machinery and raw materials.
    - Access to industrial land at subsidized rates via MODON.
    - Eligibility for SIDF (Saudi Industrial Development Fund) soft loans (up to 50-75% of project cost).

    **Environmental Compliance**
    A crucial step is obtaining the Environmental Permit from the National Center for Environmental Compliance (NCEC). The complexity of this permit depends on the environmental impact category of your factory (Class 1, 2, or 3).`,
    date: "Feb 01, 2026",
    author: "Ahmed Zaki",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000",
    tags: ["Industrial", "Manufacturing", "MODON"]
  },
  
  // --- FINANCE & TAX ---
  {
    id: 'guide-zatca-tax',
    title: "ZATCA Compliance: VAT, E-Invoicing & Corporate Tax",
    excerpt: "A complete guide to the Zakat, Tax and Customs Authority regulations for new businesses.",
    content: `**Understanding the Tax Landscape**
    Saudi Arabia offers a competitive tax environment, but compliance is strictly enforced by ZATCA (Zakat, Tax and Customs Authority).
    
    **Value Added Tax (VAT)**
    - Standard Rate: 15% on most goods and services.
    - Registration: Mandatory for businesses with revenue exceeding 375,000 SAR.
    - Filing: Monthly or quarterly depending on turnover.

    **E-Invoicing (Fatoora)**
    Phase 2 of E-invoicing is now live. All businesses must integrate their POS and ERP systems directly with the ZATCA Fatoora portal. Handwritten invoices are no longer legally valid. Failure to comply results in significant fines.

    **Corporate Income Tax (CIT)**
    - Foreign entities pay 20% CIT on net profits.
    - 100% Saudi-owned entities pay Zakat (2.5% of net worth) instead of CIT.
    - Mixed entities pay a proportional split.

    **Transfer Pricing**
    Multinational groups must maintain Transfer Pricing documentation (Master File/Local File) to prove that inter-company transactions are conducted at arm's length.`,
    date: "Feb 10, 2026",
    author: "Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000",
    tags: ["Finance", "Tax", "ZATCA"]
  },
  {
    id: 'guide-banking',
    title: "Corporate Banking in KSA: KYC & Account Opening",
    excerpt: "How to open a corporate bank account in Riyadh quickly. Navigating KYC and UBO requirements.",
    content: `**The Challenge**
    Historically, opening a corporate bank account in Saudi Arabia could take months. Today, with the right documentation, it can be done in weeks.

    **Required Documents**
    Banks like SNB, AlRajhi, and ANB require a comprehensive "Know Your Customer" (KYC) file, including:
    - Valid Commercial Registration (CR).
    - Articles of Association (AoA).
    - National Address (Wasel) registration.
    - Ultimate Beneficial Owner (UBO) declaration.
    - Board Resolution authorizing the account opening.

    **The Process**
    1. **Pre-Approval:** We submit your file digitally to the bank's central compliance team.
    2. **Sign-off:** The General Manager must visit the branch once for biometric verification.
    3. **Activation:** Online banking credentials and debit cards are issued.

    **SafaArban Advantage**
    We have pre-vetted relationships with major banks, allowing us to fast-track the compliance review phase for our clients.`,
    date: "Feb 15, 2026",
    author: "Ahmed Zaki",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff2926d6?q=80&w=2000",
    tags: ["Finance", "Banking", "Support"]
  },

  // --- HR & VISAS ---
  {
    id: 'guide-saudization',
    title: "Nitaqat & Saudization: The Platinum Guide",
    excerpt: "Mastering the Ministry of Labor's quota system to ensure your business stays in the Green zone.",
    content: `**What is Nitaqat?**
    Nitaqat is the program used to classify entities based on their Saudization percentage (ratio of Saudi nationals to expats).
    
    **The Zones**
    - **Platinum/High Green:** Instant visa processing, easy transfer of employees.
    - **Low Green:** Standard operations, but limited expansion capability.
    - **Red:** Services blocked. Cannot renew visas or hire new staff.

    **Grace Period**
    New foreign investors typically receive a 12-month grace period where they are exempted from strict quotas, allowing them to hire initial expat core staff.

    **Qiwa Platform**
    All employment contracts, visa requests, and Nitaqat ratings are managed via the Qiwa digital platform. It is the central nervous system of HR compliance in the Kingdom.`,
    date: "Jan 20, 2026",
    author: "Dr. Faisal Al-Saud",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000",
    tags: ["Visas & HR", "Compliance", "Qiwa"]
  },
  {
    id: 'guide-investor-visa',
    title: "Investor & Premium Residency Visas",
    excerpt: "Securing your long-term status in the Kingdom. From Investor Visas to the Golden Premium Residency.",
    content: `**Investor Visa**
    Linked directly to your MISA license. It allows the partner or GM to reside in Saudi Arabia and sponsor their family. It is tied to the validity of the company entity.

    **Premium Residency (The Golden Visa)**
    A game-changer for high-net-worth individuals and top talent.
    - **Special Talent Residency:** For executives with monthly salaries >80k SAR.
    - **Investor Residency:** For those investing >7M SAR in economic activities.
    - **Benefits:** Self-sponsorship (not tied to an employer), ability to own property, and ability to run private businesses.`,
    date: "Jan 25, 2026",
    author: "Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1542315187-b95222272825?q=80&w=2000",
    tags: ["Visas & HR", "Immigration"]
  },

  // --- SPECIFIC SECTORS & SERVICES ---
  {
    id: 'guide-construction',
    title: "Contracting & Engineering Licenses",
    excerpt: "Navigating the Saudi Council of Engineers (SCE) and MOMRA classification for construction firms.",
    content: `**Construction Boom**
    With Giga-projects like NEOM and Qiddiya, the demand for international contracting firms is at an all-time high.

    **Classification**
    To bid on government projects, contractors must be classified by MOMRA (Ministry of Municipal and Rural Affairs). Classification depends on:
    - Financial solvency.
    - Technical staff (Must be registered with Saudi Council of Engineers).
    - Past project portfolio.

    **Engineering Offices**
    Pure engineering consultancies require the GM to be a professional engineer with 10+ years of experience and SCE accreditation.`,
    date: "Mar 01, 2026",
    author: "Ahmed Zaki",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000",
    tags: ["Industrial", "Construction", "Engineering"]
  },
  {
    id: 'guide-import-export',
    title: "Import/Export: Customs & Trading Licenses",
    excerpt: "Everything you need to know about clearing customs, Saber registration, and warehousing.",
    content: `**Trading License**
    A MISA Trading license allows you to act as a wholesaler or retailer. Note that 100% foreign trading licenses may have higher capital requirements or specific operational mandates compared to service licenses.

    **Saber Platform**
    Saudi Arabia enforces strict product safety standards. Imported goods must be registered on the Saber platform and receive a Product Certificate of Conformity (PCoC) and Shipment Certificate (SC) before arriving at customs.

    **Customs Clearance**
    Your Commercial Registration acts as your importer code. Efficient clearance requires integration with the Fasah customs portal.`,
    date: "Feb 20, 2026",
    author: "Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000",
    tags: ["Formation", "Logistics", "Trade"]
  },
  {
    id: 'guide-strategy',
    title: "Market Entry Strategy: Beyond the License",
    excerpt: "Why legal setup is only 10% of the battle. How to build a go-to-market strategy for KSA.",
    content: `**Cultural Context**
    Business in Saudi Arabia is relationship-driven. "Wasta" (networking/influence) still matters, but merit and quality are increasingly paramount under Vision 2030.

    **Localization**
    It's not just about translating your website to Arabic. It's about adapting your value proposition to local needs.
    - **Pricing:** Understanding the purchasing power and payment terms (often longer in B2B).
    - **Marketing:** Leveraging social media (Twitter/X and Snapchat are huge in KSA).

    **Partnerships**
    Even with 100% ownership, having a local strategic partner or advisor can accelerate government dealings and business development significantly.`,
    date: "Mar 05, 2026",
    author: "Dr. Faisal Al-Saud",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000",
    tags: ["Strategy", "Consulting"]
  },
  {
    id: 'guide-healthcare',
    title: "Healthcare Investment: Clinics & Pharma",
    excerpt: "Investing in the rapidly privatizing Saudi healthcare sector. MOH licensing explained.",
    content: `**Privatization**
    The Ministry of Health (MOH) is actively privatizing hospitals and services, creating massive opportunities for foreign operators.

    **MOH Licensing**
    Setting up a clinic or hospital requires a multi-step approval:
    1. Preliminary approval from MOH for the location and concept.
    2. Civil Defense (Safety) clearance.
    3. Final License issuance upon inspection.
    
    **Staffing**
    All medical professionals (Doctors, Nurses) must be classified and licensed by the Saudi Commission for Health Specialties (SCFHS).`,
    date: "Mar 10, 2026",
    author: "Ahmed Zaki",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000",
    tags: ["Healthcare", "Licensing"]
  },
  {
    id: 'guide-real-estate',
    title: "Real Estate Development & Wafi",
    excerpt: "Regulations for foreign developers and the Off-plan Sales (Wafi) program.",
    content: `**Foreign Developers**
    Non-Saudi entities can now obtain licenses to develop real estate projects, provided the projects exceed certain value thresholds (often >30M SAR).

    **Wafi Program**
    To sell properties off-plan (before construction is complete), developers must obtain a Wafi license. This requires:
    - Ownership of the land deed (Sukuk).
    - Escrow account setup to protect buyer funds.
    - Technical approval of architectural designs.`,
    date: "Mar 12, 2026",
    author: "Dr. Faisal Al-Saud",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000",
    tags: ["Real Estate", "Construction"]
  },
  {
    id: 'guide-cybersecurity',
    title: "Cybersecurity & NCA Compliance",
    excerpt: "Setting up a cyber-defense firm? You need approval from the National Cybersecurity Authority.",
    content: `**NCA Mandate**
    The National Cybersecurity Authority (NCA) regulates the sector. To offer security services (Pen-testing, SOC, Audit), you must be licensed by the NCA.

    **Compliance Controls**
    Your own entity must adhere to the Essential Cybersecurity Controls (ECC). This often involves a rigorous audit of your own internal systems before you are allowed to secure others.`,
    date: "Mar 15, 2026",
    author: "Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000",
    tags: ["Digital", "Cybersecurity", "IT"]
  },
  {
    id: 'guide-compliance',
    title: "Legal Advisory: Keeping Your Entity Compliant",
    excerpt: "Ongoing corporate governance, annual audits, and CR renewals.",
    content: `**Annual Maintenance**
    Maintaining a Saudi entity involves a yearly cycle of compliance:
    - **Q1:** Zakat/Tax filing readiness.
    - **Q2:** Uploading Audited Financial Statements to the Qawaem portal.
    - **Ongoing:** Renewing the Commercial Registration (CR), Chamber membership, and National Address annually.

    **Consequences of Non-Compliance**
    Failure to renew documents leads to the freezing of government services (Ministry of Interior, Banks), effectively halting operations.`,
    date: "Mar 18, 2026",
    author: "Ahmed Zaki",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000",
    tags: ["Legal", "Compliance"]
  }
];
