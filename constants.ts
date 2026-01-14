
import { Service, BlogPost, CorePageContent } from './types';

export const BRAND = {
  name: "SafaArban",
  fullName: "SafaArban Ltd",
  arabicName: "شركة صفاء أربان المحدودة",
  colors: {
    navy: "#0A1A2F",
    green: "#006C35",
    gold: "#C9A86A",
    red: "#E9443E",
    coral: "#F06543"
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

export const SERVICES_DB: Service[] = [
  // --- MINISTRY OF INVESTMENT (MISA) ---
  { 
    id: 'misa-1', 
    category: 'Ministry of Investment', 
    name: 'MISA Service License (100% Foreign)', 
    professionalFee: 18000, 
    governmentFee: 12500,
    price: 30500,
    code: 'MISA-SRV',
    desc: 'The gold standard for 100% foreign-owned IT, consulting, and management firms.',
    inclusions: ['Portal Setup', 'Financial Analysis', 'AoA Drafting', 'Subscription Setup'],
  },
  { 
    id: 'misa-rhq', 
    category: 'Ministry of Investment', 
    name: 'Regional HQ License (RHQ)', 
    professionalFee: 55000,
    governmentFee: 4000,
    price: 59000,
    code: 'MISA-RHQ',
    desc: 'Strategic setup for MNCs with a 30-year corporate tax holiday.',
  },
  { 
    id: 'misa-ind', 
    category: 'Ministry of Investment', 
    name: 'MISA Industrial License', 
    professionalFee: 25000,
    governmentFee: 15000,
    price: 40000,
    code: 'MISA-IND',
    desc: 'For manufacturing plants and industrial setups in Saudi cities.',
  },
  { 
    id: 'misa-comm', 
    category: 'Ministry of Investment', 
    name: 'MISA Commercial License (Trade)', 
    professionalFee: 22000,
    governmentFee: 12000,
    price: 34000,
    code: 'MISA-TRADE',
    desc: 'Wholesale and retail trade license for 100% foreign entities.',
  },

  // --- MINISTRY OF COMMERCE (MC) ---
  { 
    id: 'mc-llc', 
    category: 'Ministry of Commerce', 
    name: 'LLC Commercial Registration (CR)', 
    professionalFee: 6500,
    governmentFee: 3200,
    price: 9700,
    code: 'MC-LLC-CR',
    desc: 'Main CR issuance, Chamber membership, and 700 number generation.',
  },
  { 
    id: 'mc-branch', 
    category: 'Ministry of Commerce', 
    name: 'Foreign Branch CR Registration', 
    professionalFee: 8000,
    governmentFee: 4000,
    price: 12000,
    code: 'MC-BR-CR',
    desc: 'Registering a branch of an existing international corporation.',
  },
  { 
    id: 'mc-amend', 
    category: 'Ministry of Commerce', 
    name: 'CR Amendment (Shareholder/Activity)', 
    professionalFee: 3500,
    governmentFee: 1500,
    price: 5000,
    code: 'MC-MOD',
    desc: 'Modifying commercial registration data or ownership structure.',
  },

  // --- ZATCA & TAX ---
  { 
    id: 'tax-zatca', 
    category: 'ZATCA & Tax Compliance', 
    name: 'ZATCA & VAT Onboarding', 
    professionalFee: 4500,
    governmentFee: 0,
    price: 4500,
    code: 'TAX-VAT',
    desc: 'VAT registration, TIN generation, and Phase 2 E-Invoicing setup.',
  },
  { 
    id: 'tax-zakat', 
    category: 'ZATCA & Tax Compliance', 
    name: 'Annual Zakat Filing Support', 
    professionalFee: 6000,
    governmentFee: 0,
    price: 6000,
    code: 'TAX-ZAK',
    desc: 'Expert preparation of annual Zakat and Income tax returns.',
  },

  // --- QIWA & HR ---
  { 
    id: 'qiwa-gm', 
    category: 'Qiwa / HR', 
    name: 'General Manager Iqama Setup', 
    professionalFee: 2500,
    governmentFee: 11500,
    price: 14000,
    code: 'HR-GM-IQ',
    desc: 'Complete residency processing for the company GM.',
  },
  { 
    id: 'qiwa-setup', 
    category: 'Qiwa / HR', 
    name: 'Corporate Qiwa & Labor File', 
    professionalFee: 3000,
    governmentFee: 1265,
    price: 4265,
    code: 'HR-Q-SYS',
    desc: 'Portal activation and labor office linking for hiring.',
  },
  { 
    id: 'qiwa-ajeer', 
    category: 'Qiwa / HR', 
    name: 'Ajeer Contract Authentication', 
    professionalFee: 1500,
    governmentFee: 180,
    price: 1680,
    code: 'HR-AJR',
    desc: 'Temporary work permits and sub-contractor authentication.',
  },

  // --- PASSPORTS / JAWAZAT ---
  { 
    id: 'pass-muqeem', 
    category: 'Passports / Muqeem', 
    name: 'Muqeem Portal Subscription', 
    professionalFee: 1000,
    governmentFee: 1500,
    price: 2500,
    code: 'PAS-MUQ',
    desc: 'Annual activation for exit/re-entry and visa services.',
  },
  { 
    id: 'pass-reentry', 
    category: 'Passports / Muqeem', 
    name: 'Exit Re-Entry (Multiple/Single)', 
    professionalFee: 500,
    governmentFee: 500,
    price: 1000,
    code: 'PAS-VIS',
    desc: 'Processing travel permits for resident employees.',
  },
  {
    id: 'pass-visa-iqama',
    category: 'Passports / Muqeem',
    name: 'Visa & Iqama Processing',
    professionalFee: 2000,
    governmentFee: 3500,
    price: 5500,
    code: 'PAS-IQM',
    desc: 'Facilitating employee and investor visa applications and annual Iqama renewals.'
  },

  // --- GOSI ---
  { 
    id: 'gosi-reg', 
    category: 'GOSI', 
    name: 'Social Insurance Registration', 
    professionalFee: 2000,
    governmentFee: 0,
    price: 2000,
    code: 'GOSI-REG',
    desc: 'Opening corporate GOSI file and registering initial staff.',
  },

  // --- BUSINESS SUPPORT ---
  { 
    id: 'sup-bank', 
    category: 'Business Support Services', 
    name: 'Corporate Bank Account Opening', 
    professionalFee: 5000,
    governmentFee: 0,
    price: 5000,
    code: 'SUP-BNK',
    desc: 'KYC support for high-tier banks (SNB, ANB, AlRajhi).',
  },
  { 
    id: 'sup-addr', 
    category: 'Business Support Services', 
    name: 'National Address Registration', 
    professionalFee: 1200,
    governmentFee: 0,
    price: 1200,
    code: 'SUP-ADDR',
    desc: 'Official SPL registration for government correspondence.',
  },
  { 
    id: 'sup-baladiya', 
    category: 'Business Support Services', 
    name: 'Municipality (Baladiya) License', 
    professionalFee: 3500,
    governmentFee: 2500,
    price: 6000,
    code: 'SUP-BAL',
    desc: 'Office/Shop physical license issuance.',
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'MISA 2026: The New Roadmap for Foreign Investors',
    excerpt: 'Ministry of Investment updates for the upcoming year focusing on 100% ownership and digital licensing.',
    date: 'March 15, 2025',
    author: 'SafaArban Strategy Team',
    image: 'https://images.unsplash.com/photo-1580835467389-724e0b04c86e?q=80&w=1200&auto=format&fit=crop',
    tags: ['MISA', 'Policy', 'Vision 2030'],
    content: `**A Digital Renaissance in Saudi Investment**
Saudi Arabia is accelerating its digital transformation to make the Kingdom one of the most competitive investment hubs globally. For 2026, MISA (Ministry of Investment) has introduced several key initiatives:

**1. The Pre-Approved License Program**
MISA has launched a "Fast-Track" pre-approval system for companies operating in designated high-priority sectors, including Green Energy, AI development, and advanced manufacturing. This allows firms to secure their license in as little as 24 hours provided they meet the initial criteria.

**2. Seamless Digital Migration**
The integration of MISA, the Ministry of Commerce, and ZATCA is now complete. A single portal now handles all updates, from shareholder changes to capital increases, eliminating the need for separate filings across ministries.

**3. Sector-Specific Incentives**
Strategic sectors like Logistics and Tourism now benefit from even lower subscription fees and extended initial grace periods for Saudization compliance. At SafaArban, we help you identify if your business qualifies for these elite 2026 pathways.`
  },
  {
    id: 'blog-2',
    title: 'ZATCA Phase 2: Integration for Mid-Sized Entities',
    excerpt: 'The mandatory E-Invoicing integration phase is expanding. Is your ERP compliant?',
    date: 'March 18, 2025',
    author: 'Tax Advisory Unit',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
    tags: ['ZATCA', 'VAT', 'Compliance'],
    content: `**Why Phase 2 is the Integration Frontier**
The "Fatoora" project by ZATCA has moved from mere PDF generation to real-time technical integration. This "Integration Phase" (Phase 2) requires companies to link their billing systems directly with ZATCA's centralized platform.

**Technical Requirements:**
- **XML Generation:** Invoices must now be generated in a specific XML format.
- **Cryptographic Stamp:** Every invoice must carry a unique digital signature for tamper-resistance.
- **UUID and QR Code:** Enhanced QR codes with specific technical markers are now mandatory.

**Risk of Non-Compliance:**
ZATCA has started enforcing penalties ranging from 5,000 to 50,000 SAR for non-compliant billing systems. If your ERP isn't connected, you are essentially trading outside the legal framework. Our tax team at SafaArban provides technical onboarding to ensure your business stays green.`
  },
  {
    id: 'blog-3',
    title: 'Qiwa Mastery: Managing the New Labor Laws',
    excerpt: 'Updates on employee transfers, contract authentication, and Nitaqat ratings.',
    date: 'March 20, 2025',
    author: 'HR Concierge',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
    tags: ['Qiwa', 'Labor', 'HR'],
    content: `**The Digital Backbone of Saudi Labor**
The Saudi labor market is now fully digital via the Qiwa platform. For business owners, Qiwa is no longer just a portal; it is the brain of your company’s HR operations.

**Key 2025 Pillars:**
- **Contract Authentication:** It is now a hard requirement to have 100% of your employees authenticated on Qiwa. Without this, you cannot renew work permits or apply for new visas.
- **Professional Verification:** For specialized roles (Engineering, Medical, Tech), employees must have their degrees verified by the Saudi Council before their Qiwa file is activated.
- **The New Transfer Protocol:** Employees can now transfer sponsorship more easily if their contracts have expired. This puts the burden on employers to maintain a high "Work Environment Score" to retain talent.

**Nitaqat Strategy:**
Maintaining a "High Green" or "Platinum" Nitaqat status is the only way to access "Instant Visas." We manage your Saudization ratios dynamically to ensure your recruitment pipeline never freezes.`
  },
  {
    id: 'blog-4',
    title: 'Opening Corporate Bank Accounts: A 2025 Survival Guide',
    excerpt: 'Why KYC is harder for foreign entities and how to speed it up.',
    date: 'March 22, 2025',
    author: 'Finance Ops',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=1200&auto=format&fit=crop',
    tags: ['Banking', 'Finance'],
    content: `**The KYC (Know Your Customer) Paradox**
While obtaining a MISA license can take 48 hours, opening the bank account can take 48 days. This is the biggest hurdle for new entrants. Saudi banks, regulated by SAMA, have intensified their due diligence for foreign-owned entities.

**Critical Requirements for 2025:**
- **UBO Declaration:** You must provide a clear "Ultimate Beneficial Owner" map, tracing ownership back to individual natural persons, even for multi-layered corporate structures.
- **Physical Presence:** The General Manager or authorized signatory must be physically present in Riyadh to sign the bank's KYC forms. Digital signatures for initial account opening are not yet universally accepted.
- **National Address:** Your company must have a registered "Wasel" address before the bank will even look at your application.

**Our Tactical Advice:**
We suggest starting applications with multiple banks simultaneously. SafaArban has strategic relationships with SNB, ANB, and AlRajhi to expedite the initial screening process.`
  },
  {
    id: 'blog-5',
    title: 'Special Economic Zones (SEZs): Choosing the Right Zone',
    excerpt: 'Comparing KAEC, Cloud SEZ, and Ras Al Khair for industrial investors.',
    date: 'March 24, 2025',
    author: 'Investment Analyst',
    image: 'https://images.unsplash.com/photo-1542315187-b95222272825?q=80&w=1200&auto=format&fit=crop',
    tags: ['SEZ', 'Logistics'],
    content: `**The Strategic Advantage of SEZs**
The launch of Special Economic Zones (SEZs) has created high-incentive pockets within the Kingdom. Each zone is tailored to specific industrial niches.

**1. King Abdullah Economic City (KAEC) SEZ:**
Focuses on advanced manufacturing and logistics. Ideal for companies targeting the global supply chain via the Red Sea.
*Incentive:* 5% Corporate Income Tax for 20 years.

**2. Jazan SEZ:**
A heavy industry powerhouse. Perfect for metallurgy and food processing. 
*Inclusion:* 0% Withholding Tax on repatriation of profits.

**3. Cloud Computing SEZ (Riyadh):**
Located in the heart of KACST, this zone is for global tech giants. It offers special tax treatments for cloud service providers and data center operators.

Choosing the wrong zone can lock you out of specific grants. SafaArban performs comparative feasibility studies to match your business model with the right SEZ.`
  },
  {
    id: 'blog-6',
    title: 'Import Regulations & Saber Platform Compliance',
    excerpt: 'Ensuring your goods aren\'t held at customs due to SASO certification issues.',
    date: 'March 26, 2025',
    author: 'Trade Compliance',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    tags: ['Saber', 'Import'],
    content: `**Saber: The Gatekeeper of Saudi Trade**
Saber is the mandatory electronic platform for all importers in Saudi Arabia. It is the bridge between SASO (Saudi Standards, Metrology and Quality Organization) and the Customs department.

**The Compliance Flow:**
1. **Product Registration:** Every unique SKU must be registered with its correct HS Code.
2. **PCoC (Product Certificate of Conformity):** This is valid for 1 year and is issued after laboratory testing or technical file review.
3. **SCoC (Shipment Certificate of Conformity):** This is issued for every individual shipment. Without it, your containers will not be cleared from the port.

**Common Pitfalls:**
Incorrect categorization of "High Risk" products can lead to months of delay. SafaArban’s trade compliance team manages your entire product catalog on Saber to ensure smooth logistics.`
  },
  {
    id: 'blog-7',
    title: 'The Riyadh HQ Mandate: Post-2024 Realities',
    excerpt: 'If you want government contracts, you need a Regional HQ. Here is the cost.',
    date: 'March 28, 2025',
    author: 'Policy Lead',
    image: 'https://images.unsplash.com/photo-1596627689102-b2f7a012d98b?q=80&w=1200&auto=format&fit=crop',
    tags: ['RHQ', 'Government'],
    content: `**The Regional HQ (RHQ) Imperative**
As of January 2024, the Saudi government has stopped contracting with international companies that do not have their Regional Headquarters in Riyadh. This has triggered a wave of migrations for MNCs.

**Why Move Now?**
- **Tax Holiday:** The Saudi government is offering a 30-year 0% corporate income tax holiday for RHQ-related income.
- **Unlimited Visas:** RHQ entities are exempt from many of the standard visa quotas.
- **Public Tenders:** Only RHQ-licensed firms can now bid on "GIGA-Projects" like NEOM, Qiddiya, and The Red Sea.

**The Complexity:**
Setting up an RHQ requires a dedicated physical office and at least 15 senior staff members within the first year. SafaArban specializes in the end-to-end relocation and licensing of Regional Headquarters.`
  },
  {
    id: 'blog-8',
    title: 'Real Estate Investment for Foreigners in KSA',
    excerpt: 'New laws allow direct ownership for MISA-licensed investment firms.',
    date: 'March 30, 2025',
    author: 'Legal Counsel',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    tags: ['Real Estate', 'Laws'],
    content: `**Owning the Land in Saudi Arabia**
Historically, foreign entities could only lease land. New regulations have significantly relaxed these rules for MISA-licensed investment firms.

**Key Opportunities:**
- **Commercial Ownership:** You can now own the land and building for your corporate headquarters.
- **Investment Portfolios:** Foreign firms can now apply for licenses to develop residential and commercial real estate portfolios directly, provided they meet the capital requirements (usually >30M SAR).

**Legal Structure:**
You must ensure your Articles of Association (AoA) specifically mention "Real Estate Development" or "Investment" to qualify. SafaArban’s legal team handles these technical amendments to unlock property assets for your firm.`
  },
  {
    id: 'blog-9',
    title: 'Venture Capital & Startups: The Saudi Opportunity',
    excerpt: 'How to obtain an Entrepreneur License through the MISA Startup program.',
    date: 'April 02, 2025',
    author: 'Startup Advisor',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop',
    tags: ['Startups', 'VC'],
    content: `**The Riyadh Tech Wave**
Saudi Arabia is rapidly becoming the VC capital of the MENA region. Through the "Entrepreneur License," MISA has lowered the barriers for tech founders.

**The Entrepreneur License Advantage:**
- **Zero Capital Requirement:** Unlike standard MISA licenses which might require 500k-1M SAR proof of funds, the Entrepreneur license can be issued with zero paid-up capital.
- **Incubator Endorsement:** To qualify, you simply need an endorsement letter from a MISA-approved incubator or VC fund.
- **Relocation Grants:** Many startups qualify for "Relocation Support" covering the first year’s office costs and visa fees.

SafaArban has a dedicated desk for founders, helping you secure incubator letters and navigating the "Monsha'at" (SME Authority) ecosystem.`
  }
];

export const CORE_SERVICES_CONTENT: Record<string, CorePageContent> = {
  'misa-license': {
    slug: 'misa-license',
    title: 'MISA Investment License',
    subtitle: 'The Gateway to the Kingdom',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
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
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop',
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
    heroImage: 'https://images.unsplash.com/photo-1596627689102-b2f7a012d98b?q=80&w=2000&auto=format&fit=crop',
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
    heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop',
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
    heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop',
    overview: 'Securing legal residency is the final step in your setup journey. The Investor Visa allows partners and General Managers to reside in the Kingdom, sponsor their families, and travel freely. We navigate the "Muqeem" and "Jawazat" portals to issue your Iqama ID cards swiftly.',
    features: [
      { title: 'Premium Residency', desc: 'Options for specialized talent and high-net-worth investors.' },
      { title: 'Family Sponsorship', desc: 'Bring your spouse and children under your own sponsorship.' },
      { title: 'Multiple Entry', desc: 'Freedom to enter and exit the Kingdom without restriction.' },
      { title: 'Property Rights', desc: 'Eligibility to lease residential and commercial property.' }
    ],
    cta: 'Process Residency'
  },
  'bank-opening': {
    slug: 'bank-opening',
    title: 'Bank Account Opening',
    subtitle: 'Financial Infrastructure',
    heroImage: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2000&auto=format&fit=crop',
    overview: 'Opening a corporate bank account for a foreign-owned entity is complex due to strict Central Bank (SAMA) compliance. SafaArban streamlines this by preparing your Know Your Customer (KYC) files, UBO declarations, and National Address proofs before you even visit the branch. We partner with Tier-1 banks like SNB, ANB, and AlRajhi.',
    features: [
      { title: 'KYC Preparation', desc: 'Complete documentation preparation to avoid rejection.' },
      { title: 'Relationship Manager', desc: 'Direct introduction to corporate banking officers.' },
      { title: 'Digital Banking', desc: 'Setup of online treasury and payroll management systems.' },
      { title: 'Multi-Currency', desc: 'Accounts available in SAR, USD, and EUR.' }
    ],
    cta: 'Open Account'
  }
};
