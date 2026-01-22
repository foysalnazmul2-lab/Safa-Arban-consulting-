
import React from 'react';
import Hero from './Hero';
import { Page } from '../types';
import { BLOG_POSTS, BRAND } from '../constants';
import BusinessTools from './BusinessTools';
import ServiceEcosystem from './ServiceEcosystem';
import SetupWizard from './SetupWizard';
import CostCalculator from './CostCalculator';
import GlobalPresence from './GlobalPresence';
import VerificationPortal from './VerificationPortal';
import MarketPulse from './MarketPulse';
import ResidencyCalculator from './ResidencyCalculator';
import EconomicZones from './EconomicZones';
import JourneyTimeline from './JourneyTimeline';
import SectorFocus from './SectorFocus';
import ComplianceRadar from './ComplianceRadar';
import LifestyleShowcase from './LifestyleShowcase';
import Partners from './Partners';
import SaudiMap from './SaudiMap';
import CostOfLiving from './CostOfLiving';
import { 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Calendar,
  Building2,
  Landmark
} from 'lucide-react';

interface HomeProps {
  setActivePage: (page: Page) => void;
  addToCart: (id: string) => void;
  cart: string[];
  onServiceClick: (slug: string) => void;
  currency?: 'SAR' | 'USD';
}

const Home: React.FC<HomeProps> = ({ setActivePage, addToCart, cart, onServiceClick, currency = 'SAR' }) => {
  
  const handleBundleAdd = (ids: string[]) => {
    ids.forEach(id => addToCart(id));
    setActivePage('quotation');
  };

  return (
    <>
      <Hero onStart={(page) => setActivePage(page)} />
      
      {/* Financial Ticker */}
      <MarketPulse />

      {/* 1. BLUEPRINT ENGINE (High Engagement) */}
      <SetupWizard onAddBundle={handleBundleAdd} />

      {/* Strategic Geography */}
      <SaudiMap />

      {/* NEW: Integration Network */}
      <Partners />

      {/* Setup Journey Timeline (The Process) */}
      <JourneyTimeline />

      {/* 2. THE ECOSYSTEM (Service Matrix) */}
      <ServiceEcosystem 
        onAddToCart={addToCart} 
        cart={cart} 
        onViewDetails={onServiceClick}
        currency={currency}
      />

      {/* Vision 2030 Sector Focus */}
      <SectorFocus />

      {/* Economic Zones Explorer */}
      <EconomicZones />

      {/* Golden Visa Calculator */}
      <ResidencyCalculator />

      {/* NEW: Lifestyle & Quality of Life */}
      <LifestyleShowcase />

      {/* Cost of Living Estimator */}
      <CostOfLiving />

      {/* 3. COST OF INACTION */}
      <CostCalculator />

      {/* Post-Setup Compliance Radar */}
      <ComplianceRadar />

      {/* 4. BUSINESS TOOLS (ROI Engine) */}
      <BusinessTools onNavigate={() => setActivePage('services')} />

      {/* Global Presence Map */}
      <GlobalPresence />

      {/* 5. VALUE PROPOSITION - BENTO GRID */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.accent }}>Why SafaArban?</span>
             <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: BRAND.colors.primary }}>The Premium Standard</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-6 h-auto lg:h-[600px]">
             
             {/* Card 1: 100% Ownership */}
             <div className="md:col-span-2 row-span-2 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl transition-all hover:scale-[1.01]" style={{ backgroundColor: BRAND.colors.primary }}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                   <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10" style={{ color: BRAND.colors.secondary }}>
                      <Globe size={32} />
                   </div>
                   <div>
                      <h3 className="text-3xl font-black text-white mb-4 leading-tight">100% Foreign <br/>Ownership</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm font-medium">
                         Retain absolute control. We structure your Articles of Association (AoA) to ensure zero local equity split, protecting your IP and profits.
                      </p>
                      <button onClick={() => setActivePage('services')} className="flex items-center gap-2 font-black uppercase text-xs tracking-widest group-hover:gap-4 transition-all" style={{ color: BRAND.colors.secondary }}>
                         View Structures <ArrowRight size={16} />
                      </button>
                   </div>
                </div>
             </div>

             {/* Card 2: Speed */}
             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-all group hover:-translate-y-1">
                <Zap size={32} className="mb-4 group-hover:scale-110 transition-transform" style={{ color: BRAND.colors.alert }} />
                <h4 className="text-xl font-black mb-2" style={{ color: BRAND.colors.primary }}>Fast-Track</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">MISA License issuance in as little as 24 hours.</p>
             </div>

             {/* Card 3: Trust */}
             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-all group hover:-translate-y-1">
                <ShieldCheck size={32} style={{ color: BRAND.colors.accent }} className="mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-black mb-2" style={{ color: BRAND.colors.primary }}>Govt. Liaison</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Certified PROs handling MISA, MC, & ZATCA directly.</p>
             </div>

             {/* Card 4: Banking */}
             <div className="md:col-span-2 bg-gradient-to-r rounded-[2.5rem] p-8 relative overflow-hidden shadow-xl group hover:shadow-2xl transition-all" style={{ backgroundImage: `linear-gradient(to right, ${BRAND.colors.secondary}, #b08d55)` }}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 flex items-center gap-6 h-full">
                   <div className="p-4 rounded-2xl text-white shrink-0 shadow-lg" style={{ backgroundColor: BRAND.colors.primary }}>
                      <Building2 size={24} />
                   </div>
                   <div>
                      <h4 className="text-2xl font-black mb-1" style={{ color: BRAND.colors.primary }}>Corporate Banking</h4>
                      <p className="text-xs font-bold opacity-80" style={{ color: BRAND.colors.primary }}>Pre-approved KYC with SNB, AlRajhi & ANB.</p>
                   </div>
                   <div className="ml-auto bg-white/20 p-3 rounded-full hover:bg-white/40 transition-colors cursor-pointer" onClick={() => setActivePage('contact')}>
                      <ArrowRight size={20} style={{ color: BRAND.colors.primary }} />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 6. LATEST INTELLIGENCE */}
      <div className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.secondary }}>Strategic Insights</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: BRAND.colors.primary }}>Market Intelligence</h2>
            </div>
            <button 
              onClick={() => setActivePage('blog')} 
              className="hidden md:flex items-center gap-2 font-black uppercase text-xs tracking-widest transition-colors"
              style={{ color: BRAND.colors.primary }}
            >
              Read All Articles <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map(post => (
              <div 
                key={post.id} 
                onClick={() => setActivePage('blog')} 
                className="group cursor-pointer bg-slate-50 rounded-[2rem] p-4 border border-slate-100 transition-all hover:shadow-xl"
                style={{ borderColor: 'transparent' }}
              >
                <div className="h-56 rounded-2xl overflow-hidden mb-6 relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4">
                       <span className="text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10" style={{ backgroundColor: `${BRAND.colors.primary}E6` }}>
                         {post.tags[0]}
                       </span>
                    </div>
                </div>
                <div className="px-2 pb-2">
                   <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                      <Calendar size={12} style={{ color: BRAND.colors.secondary }} />
                      <span>{post.date}</span>
                   </div>
                   <h3 className="text-lg font-black mb-3 leading-tight transition-colors line-clamp-2" style={{ color: BRAND.colors.primary }}>
                     {post.title}
                   </h3>
                   <span className="font-black text-[9px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: BRAND.colors.secondary }}>
                     Read Analysis <ArrowRight size={12} />
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Portal */}
      <VerificationPortal />

      {/* 7. FINAL CTA */}
      <div className="py-24 text-white relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
         <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.accent }}></div>
         
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
               Your Empire Starts Here.
            </h2>
            <p className="text-xl text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
               Join 500+ international companies that have successfully established their presence in Saudi Arabia through SafaArban.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <button 
                 onClick={() => setActivePage('services')}
                 className="w-full sm:w-auto text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-2xl"
                 style={{ backgroundColor: BRAND.colors.alert, color: 'white' }}
                 onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = BRAND.colors.primary; }}
                 onMouseOut={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.alert; e.currentTarget.style.color = 'white'; }}
               >
                 Start Your Setup
               </button>
               <button 
                 onClick={() => setActivePage('contact')}
                 className="w-full sm:w-auto border border-white/20 text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all"
                 style={{ '--hover-color': BRAND.colors.primary } as React.CSSProperties}
                 onMouseOver={(e) => e.currentTarget.style.color = BRAND.colors.primary}
                 onMouseOut={(e) => e.currentTarget.style.color = 'white'}
               >
                 Book Consultation
               </button>
            </div>
         </div>
      </div>
    </>
  );
};

export default Home;
