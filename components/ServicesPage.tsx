
import React, { useState, useMemo } from 'react';
import ServiceListRow from './ServiceListRow';
import { ServiceSkeleton } from './Skeletons';
import EntityComparator from './EntityComparator';
import { SERVICES_DB, BRAND } from '../constants';
import { gemini, ServiceAnalysisData } from '../geminiService';
import { Search, X, Globe, Check, Briefcase, Building2, ShieldCheck, DollarSign, Star, Layers, Factory, LayoutGrid, ShoppingCart, Percent, Sparkles, Loader2, AlertCircle, ArrowRight, Bot } from 'lucide-react';

interface ServicesPageProps {
  cart: string[];
  toggleCartItem: (id: string) => void;
  addItemsToCart?: (ids: string[]) => void;
  isLoading: boolean;
  onServiceClick?: (id: string) => void;
  currency?: 'SAR' | 'USD';
  onToggleCurrency?: () => void;
}

// --- CONFIGURATION ---

// 1. Tab Definitions
const TABS = [
  { id: 'All', label: 'All Services', icon: LayoutGrid },
  { id: 'Formation & Licensing', label: 'Formation & Licensing', icon: Building2 },
  { id: 'Visas & HR', label: 'Visas & HR', icon: Briefcase },
  { id: 'Strategy & Consulting', label: 'Strategy & Consulting', icon: Layers },
  { id: 'Support Services', label: 'Support Services', icon: ShieldCheck },
];

// Mapping Service Categories to Tabs
const TAB_MAPPING: Record<string, string[]> = {
  'Formation & Licensing': [
    'Company Formation & Registration', 
    'Sector / Activity Licensing',
    'Industrial',
    'Manufacturing'
  ],
  'Visas & HR': [
    'Manpower & Immigration', 
    'Human Capital & HR'
  ],
  'Strategy & Consulting': [
    'Strategy & Management Consulting', 
    'Digital & IT Consulting', 
    'Marketing & Branding', 
    'Market Research', 
    'Operational Consulting', 
    'Financial & Tax Advisory'
  ],
  'Support Services': [
    'BPO & Managed Services', 
    'Support Services', 
    'Legal Advisory',
    'Corporate Compliance & Operations'
  ]
};

// 2. Bundle Definitions
const BUNDLE_DEFS = [
  {
    id: 'starter',
    name: "The Starter",
    desc: "Essential License & Registration",
    ids: ['cfr-01', 'cfr-03', 'cfr-09'], // MISA, CR, ZATCA
    discount: 0.10, // 10% Off
    highlight: false
  },
  {
    id: 'professional',
    name: "The Professional",
    desc: "Starter + Banking & GM Visa",
    ids: ['cfr-01', 'cfr-03', 'cfr-09', 'supp-03', 'man-01'], // + Bank, GM Visa
    discount: 0.15, // 15% Off
    highlight: true,
    tag: "Most Popular"
  },
  {
    id: 'enterprise',
    name: "The Enterprise",
    desc: "Full Ops + HR Compliance",
    ids: ['cfr-01', 'cfr-03', 'cfr-09', 'supp-03', 'man-01', 'cfr-10', 'cfr-12'], // + GOSI, Qiwa
    discount: 0.20, // 20% Off
    highlight: false
  }
];

const ServicesPage: React.FC<ServicesPageProps> = ({ 
  cart, 
  toggleCartItem, 
  addItemsToCart, 
  isLoading, 
  onServiceClick, 
  currency = 'SAR', 
  onToggleCurrency 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('All');
  
  // AI Advisor State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ServiceAnalysisData | null>(null);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

  const RATE = currency === 'USD' ? 0.2666 : 1;

  // --- DERIVED DATA ---

  // 1. Flagship Services (MISA & Industrial)
  const flagshipServices = useMemo(() => {
    return SERVICES_DB.filter(s => ['cfr-01', 'sec-01'].includes(s.id));
  }, []);

  // 2. Filtered List based on Tab & Search
  const filteredServices = useMemo(() => {
    const targetCategories = TAB_MAPPING[activeTab] || [];
    
    return SERVICES_DB.filter(service => {
      // If we are in "All", show everything.
      // If we are in specific tab, filter by category mapping.
      const matchesCategory = activeTab === 'All' ? true : targetCategories.includes(service.category);

      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            service.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            service.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeTab]);

  // 3. Process Bundles with Prices
  const bundles = useMemo(() => {
    return BUNDLE_DEFS.map(b => {
      const services = SERVICES_DB.filter(s => b.ids.includes(s.id));
      const originalTotal = services.reduce((acc, s) => acc + s.professionalFee, 0);
      const price = Math.floor(originalTotal * (1 - b.discount));
      const savings = originalTotal - price;
      
      // Check if all items in this bundle are already in the user's cart
      const isOwned = b.ids.every(id => cart.includes(id));

      return { ...b, services, originalTotal, price, savings, isOwned };
    });
  }, [cart, RATE]); // Recalculate if cart changes

  const handleAnalyze = async () => {
    if (cart.length === 0) return;
    setIsAnalyzing(true);
    setIsAnalysisOpen(true);
    const result = await gemini.analyzeServiceSelection(cart);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-300 font-sans relative">
       
       {/* Hero / Header */}
       <div className="pt-28 pb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
             <div className="flex justify-center mb-6">
                <button 
                  onClick={onToggleCurrency}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-white transition-all backdrop-blur-md"
                >
                   <DollarSign size={14} className="text-emerald-400" />
                   View in {currency}
                </button>
             </div>
             
             <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Service Catalog</h1>
             <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium mb-12">
                Transparent pricing for every stage of your business journey. From initial MISA licensing to full operational support.
             </p>

             {/* Search Bar */}
             <div className="max-w-xl mx-auto relative group mb-12">
                <input 
                  type="text" 
                  placeholder="Search services (e.g., 'Visa', 'Tax', 'Legal')..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-full py-4 px-6 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-500 shadow-xl"
                />
                <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors shadow-lg">
                  {searchQuery ? <X size={20} onClick={() => setSearchQuery('')} /> : <Search size={20} />}
                </button>
             </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 pb-32">
          
          {/* SPECIAL MISA LICENSING BANNER */}
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-4">
             <div className="bg-gradient-to-r from-blue-900 to-[#0f172a] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden border border-blue-500/20 shadow-2xl group cursor-pointer"
                  onClick={() => onServiceClick && onServiceClick('misa-hub')} // This acts as a signal to navigate to the page
             >
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-[10px] font-black uppercase tracking-widest mb-4">
                         <Star size={12} fill="currentColor" /> Specialized Hub
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-white mb-4">MISA Licensing Center</h2>
                      <p className="text-slate-300 text-sm max-w-lg leading-relaxed mb-6">
                         Use our dedicated MISA License wizard to compare Service, Industrial, and RHQ licenses. Check capital requirements and eligibility instantly.
                      </p>
                      <button 
                        onClick={(e) => {
                           e.stopPropagation();
                           // We need to trigger navigation to the new page. 
                           // Since onServiceClick is used for navigation, passing a special slug will be handled by App.tsx logic 
                           // OR we can rely on the parent updating via a prop if available.
                           // For now, we reuse onServiceClick with a dummy slug that we check in App.tsx? 
                           // Actually, cleaner to update App.tsx to route 'misa-licenses'.
                           // But since this is a child component, we rely on the prop.
                           // Let's assume onServiceClick handles standard slugs, but App.tsx will be updated to switch pages.
                           // Wait, we need to redirect to the new page.
                           // The simplest way here is to let the user click the card or button, 
                           // and the parent (App.tsx) can provide a handler or we use window.location.hash routing if it was that simple.
                           // Given the structure, let's use a hidden link or instruct the user.
                           // BETTER: We will assume the parent passes a specialized handler or checks for this slug.
                           // Actually, let's just make it a standard link if we can't access setActivePage directly.
                           // Wait, we can pass a special slug like 'special:misa-licenses' and handle in App.tsx
                           if(onServiceClick) {
                               // We will actually modify App.tsx to catch this, or simply redirect if possible.
                               // Since we are in the flow, let's use window event or similar hack? No.
                               // We updated App.tsx to render MisaLicensePage when activePage is 'misa-licenses'.
                               // But ServicesPage doesn't have setActivePage prop.
                               // It has onServiceClick which sets activeServiceSlug.
                               // Let's use a standard anchor for internal nav since we are in a single component file without context.
                               // Actually, the cleanest way is to just let the user use the Navbar or modify props.
                               // BUT, I can't modify props definition easily without breaking other things.
                               // Let's use the onServiceClick with a special string that App.tsx catches?
                               // Or just add a simple <a href="#misa"> which might be caught.
                               // BEST APPROACH: Add a prop for dedicated page navigation if possible, or just let the button trigger
                               // a custom event.
                               // However, based on the prompt "Add a new section or page", let's assume I can add a prop to ServicesPage in App.tsx.
                               // I'll update App.tsx to pass a handler, but here I can't change signature easily without changing App.tsx too.
                               // Wait, I AM changing App.tsx. So I can pass a handler.
                               // Let's rely on the existing onServiceClick and I will update App.tsx to handle a special slug.
                               // Actually, in App.tsx I can check if slug == 'misa-licenses' then setActivePage('misa-licenses').
                               onServiceClick('special:misa-licenses');
                           }
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                      >
                         Open Licensing Hub <ArrowRight size={16} />
                      </button>
                   </div>
                   <div className="hidden md:block">
                      <div className="w-32 h-32 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30">
                         <Globe size={64} className="text-blue-400" />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* SECTION 1: BUNDLES (Always visible unless searching) */}
          {!searchQuery && (
            <div className="mb-24">
               <div className="text-center mb-12">
                  <h3 className="text-3xl font-black text-white mb-2">Value Packages</h3>
                  <p className="text-slate-400 font-medium">Save up to 20% by bundling essential services.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  {bundles.map((bundle) => (
                    <div key={bundle.id} className={`relative flex flex-col rounded-[2.5rem] p-8 border transition-all duration-300 hover:-translate-y-2 ${
                        bundle.highlight 
                        ? 'bg-slate-800 border-blue-500 shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] z-10 scale-105 ring-1 ring-blue-500/20' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}>
                       {bundle.highlight && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                             <Star size={10} fill="white" /> {bundle.tag}
                          </div>
                       )}

                       <div className="text-center mb-6 mt-2">
                          <h4 className="text-xl font-black text-white mb-1">{bundle.name}</h4>
                          <p className="text-xs text-slate-400 font-medium">{bundle.desc}</p>
                       </div>

                       {/* Pricing Pill */}
                       <div className="bg-black/20 rounded-2xl p-4 mb-8 text-center border border-white/5">
                          <div className="flex items-baseline justify-center gap-1">
                             <span className="text-3xl font-mono font-black text-white">{currency === 'USD' ? '$' : ''}{Math.floor(bundle.price * RATE).toLocaleString()}</span>
                             <span className="text-xs text-slate-500">{currency}</span>
                          </div>
                          <div className="flex justify-center items-center gap-2 mt-1">
                             <span className="text-xs text-slate-500 line-through decoration-slate-500/50">
                                {currency === 'USD' ? '$' : ''}{Math.floor(bundle.originalTotal * RATE).toLocaleString()}
                             </span>
                             <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded flex items-center gap-1">
                                <Percent size={10} /> SAVE {Math.floor((bundle.savings / bundle.originalTotal) * 100)}%
                             </span>
                          </div>
                       </div>

                       <ul className="space-y-4 mb-8 flex-1">
                          {bundle.services.map((item) => (
                            <li key={item.id} className="flex items-start gap-3 text-sm text-slate-300">
                               <Check className={`w-4 h-4 mt-0.5 shrink-0 ${bundle.highlight ? 'text-blue-500' : 'text-slate-500'}`} />
                               <span className="text-xs font-medium">{item.name}</span>
                            </li>
                          ))}
                       </ul>

                       <button 
                         onClick={() => !bundle.isOwned && addItemsToCart && addItemsToCart(bundle.ids)}
                         disabled={bundle.isOwned}
                         className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                           bundle.isOwned 
                           ? 'bg-emerald-600/20 text-emerald-500 border border-emerald-500/50 cursor-default'
                           : bundle.highlight
                             ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5'
                             : 'bg-white text-slate-900 hover:bg-slate-100 border border-slate-200'
                         }`}
                       >
                          {bundle.isOwned ? (
                            <><Check size={16} /> Bundle Selected</>
                          ) : (
                            <><ShoppingCart size={16} /> Select Bundle</>
                          )}
                       </button>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* SECTION 2: TABBED CATALOG */}
          <div id="catalog">
             {/* Tab Navigation */}
             {!searchQuery && (
               <div className="flex flex-wrap justify-center gap-4 mb-12 sticky top-24 z-20 bg-[#0f172a]/95 backdrop-blur py-4 border-b border-slate-800">
                  {TABS.map((tab) => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-2 px-5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                        activeTab === tab.id 
                        ? 'bg-white text-[#0f172a] shadow-lg scale-105' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                      }`}
                    >
                      <tab.icon size={14} />
                      {tab.label}
                    </button>
                  ))}
               </div>
             )}

             {/* FLAGSHIP SERVICES (Only shown at top of Formation Tab) */}
             {activeTab === 'Formation & Licensing' && !searchQuery && (
                <div className="grid md:grid-cols-2 gap-6 mb-12 animate-in slide-in-from-bottom-4">
                   {flagshipServices.map((service, idx) => (
                     <div key={service.id} className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center group hover:border-blue-500 transition-all shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10 bg-blue-500 pointer-events-none"></div>
                        
                        <div className={`shrink-0 w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-lg ${idx === 0 ? 'bg-blue-600' : 'bg-[#E94E4E]'}`}>
                           {idx === 0 ? <Globe size={40} /> : <Factory size={40} />}
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                           <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                              <h3 className="text-2xl font-black text-white">{service.name}</h3>
                              {idx === 0 && <span className="bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase px-2 py-1 rounded">Core</span>}
                           </div>
                           <p className="text-slate-400 text-sm mb-6 leading-relaxed">{service.desc}</p>
                           <div className="flex flex-col md:flex-row items-center gap-6">
                              <div>
                                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Professional Fee</p>
                                 <p className="text-2xl font-mono font-black text-white">{currency === 'USD' ? '$' : ''}{Math.floor(service.professionalFee * RATE).toLocaleString()} {currency}</p>
                              </div>
                              <button 
                                onClick={() => toggleCartItem(service.id)}
                                className={`flex-1 w-full md:w-auto py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                                  cart.includes(service.id)
                                  ? 'bg-emerald-600 text-white cursor-default'
                                  : 'bg-white text-[#0f172a] hover:bg-blue-50'
                                }`}
                              >
                                 {cart.includes(service.id) ? 'Selected' : 'Add to Quote'}
                              </button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             )}

             {/* Services List */}
             <div className="min-h-[400px]">
                {/* Result Count Header */}
                <div className="mb-6 flex items-center justify-between px-4 border-b border-slate-800 pb-4">
                   <h3 className="text-white font-bold text-lg">{activeTab === 'All' ? 'Complete Catalog' : activeTab}</h3>
                   <span className="text-xs text-slate-500 font-mono bg-slate-800 px-2 py-1 rounded">{filteredServices.length} Services</span>
                </div>

                {isLoading ? (
                   <div className="grid md:grid-cols-2 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => <ServiceSkeleton key={i} />)}
                   </div>
                ) : filteredServices.length > 0 ? (
                   <div key={activeTab} className="bg-slate-800/50 rounded-[2.5rem] border border-slate-700/50 overflow-hidden divide-y divide-slate-700/50 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {filteredServices.map((service) => (
                        <ServiceListRow 
                           key={service.id} 
                           service={service} 
                           isInCart={cart.includes(service.id)}
                           onToggle={() => toggleCartItem(service.id)}
                           onViewDetails={() => onServiceClick && onServiceClick(service.id)}
                           currency={currency}
                           darkMode={true}
                        />
                      ))}
                   </div>
                ) : (
                   <div className="text-center py-20 bg-slate-800/30 rounded-[2.5rem] border border-dashed border-slate-700 animate-in zoom-in-95">
                      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                         <Search size={24} />
                      </div>
                      <h3 className="text-white font-bold mb-2">No services found</h3>
                      <p className="text-slate-500 text-sm mb-6">Try adjusting your search query or switching tabs.</p>
                      <button onClick={() => setSearchQuery('')} className="text-blue-400 hover:text-blue-300 text-xs font-black uppercase tracking-widest hover:underline">Clear Filters</button>
                   </div>
                )}
             </div>
          </div>

          <div className="mt-24">
             <EntityComparator />
          </div>
       </div>

       {/* AI SMART REVIEW FLOATING BAR */}
       {cart.length > 0 && (
         <div className="fixed bottom-0 left-0 right-0 z-[80] p-4 flex justify-center animate-in slide-in-from-bottom-full duration-500 no-print">
            {isAnalysisOpen && analysis ? (
                <div className="absolute bottom-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[800px] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh] overflow-y-auto custom-scrollbar">
                    <button onClick={() => setIsAnalysisOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={20} /></button>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400 border border-blue-600/30">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white">AI Setup Audit</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${analysis.overall_rating > 80 ? 'bg-emerald-500' : analysis.overall_rating > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${analysis.overall_rating}%` }}></div>
                                </div>
                                <span className={`text-[10px] font-bold ${analysis.overall_rating > 80 ? 'text-emerald-500' : analysis.overall_rating > 50 ? 'text-amber-500' : 'text-red-500'}`}>{analysis.overall_rating}% Ready</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                            <p className="text-sm text-slate-300 italic leading-relaxed">"{analysis.strategic_insight}"</p>
                        </div>

                        {analysis.missing_critical.length > 0 && (
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-3 flex items-center gap-2"><AlertCircle size={12} /> Missing Essentials</h4>
                                <ul className="space-y-3">
                                    {analysis.missing_critical.map((item, i) => (
                                        <li key={i} className="text-sm text-slate-300 flex items-start gap-3 bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {analysis.recommended_addons.length > 0 && (
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2"><Sparkles size={12} /> Recommended Add-ons</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {analysis.recommended_addons.map((addon, i) => (
                                        <div key={i} className="flex justify-between items-center bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/20">
                                            <span className="text-sm text-emerald-100 font-medium">{addon}</span>
                                            <button 
                                                onClick={() => {
                                                    const s = SERVICES_DB.find(srv => srv.name === addon);
                                                    if (s && toggleCartItem) toggleCartItem(s.id);
                                                }}
                                                className="text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold uppercase transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}

            <div className="bg-slate-900 border border-slate-700 rounded-full shadow-2xl p-2 flex items-center gap-4 pr-6 pl-2 backdrop-blur-md">
                <div className="bg-slate-800 rounded-full h-10 w-10 flex items-center justify-center font-bold text-white border border-slate-700">
                    {cart.length}
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Selection Active</span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider">{cart.length} Services Added</span>
                </div>
                <div className="h-8 w-px bg-slate-700 mx-2"></div>
                <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 text-xs font-bold text-white hover:text-blue-400 transition-colors"
                >
                    {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="text-blue-500" />}
                    {isAnalyzing ? 'Analyzing...' : 'AI Smart Review'}
                </button>
            </div>
         </div>
       )}
    </div>
  );
};

export default ServicesPage;
