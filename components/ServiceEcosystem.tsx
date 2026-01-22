
import React, { useState } from 'react';
import { 
  Rocket, 
  Settings, 
  TrendingUp, 
  Shield, 
  Crown, 
  ArrowRight, 
  CheckCircle2, 
  Star,
  Zap,
  Info,
  Globe,
  Building
} from 'lucide-react';
import { SERVICES_DB, BRAND } from '../constants';
import { Service } from '../types';

interface ServiceEcosystemProps {
  onAddToCart: (id: string) => void;
  cart: string[];
  onViewDetails?: (id: string) => void;
  currency?: 'SAR' | 'USD';
}

const ServiceEcosystem: React.FC<ServiceEcosystemProps> = ({ onAddToCart, cart, onViewDetails, currency = 'SAR' }) => {
  const [activeStage, setActiveStage] = useState<'launch' | 'operate' | 'grow'>('launch');

  const stages = {
    launch: {
      label: 'Launch Phase',
      icon: <Rocket />,
      desc: 'Mandatory licenses to establish legal presence.',
      keywords: ['Formation', 'Licensing', 'Registration']
    },
    operate: {
      label: 'Operational Phase',
      icon: <Settings />,
      desc: 'Compliance, HR, and Banking operations.',
      keywords: ['Manpower', 'Immigration', 'Compliance', 'Support']
    },
    grow: {
      label: 'Growth Phase',
      icon: <TrendingUp />,
      desc: 'Expansion, Special Permits, and VIP Residency.',
      keywords: ['Premium', 'Sector', 'Industrial']
    }
  };

  const getFilteredServices = () => {
    const keywords = stages[activeStage].keywords;
    return SERVICES_DB.filter(service => 
      keywords.some(k => service.category.includes(k))
    );
  };

  const RATE = currency === 'USD' ? 0.2666 : 1;
  const filtered = getFilteredServices();

  return (
    <div className="py-24 relative overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4 flex items-center justify-center gap-2" style={{ color: BRAND.colors.secondary }}>
            <Crown size={14} /> The Saudi Investment Ecosystem
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6" style={{ color: BRAND.colors.primary }}>
            Service <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${BRAND.colors.secondary}, ${BRAND.colors.alert})` }}>Matrix</span>
          </h2>
          
          {/* Stage Tabs */}
          <div className="inline-flex bg-white p-1.5 rounded-full shadow-lg border border-slate-100">
            {(Object.keys(stages) as Array<keyof typeof stages>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveStage(key)}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeStage === key 
                  ? 'text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
                style={{ backgroundColor: activeStage === key ? BRAND.colors.primary : 'transparent' }}
              >
                {React.cloneElement(stages[key].icon as React.ReactElement<any>, { size: 14 })}
                {stages[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(250px,auto)] gap-6 animate-in slide-in-from-bottom-8 fade-in duration-500 key={activeStage}">
          
          {/* Featured Card (Large) */}
          {filtered.length > 0 && (
            <div className="md:col-span-2 lg:col-span-2 row-span-2 relative group rounded-[2.5rem] p-10 overflow-hidden shadow-2xl transition-all hover:scale-[1.01]" style={{ backgroundColor: BRAND.colors.primary }}>
               <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-white/10 transition-colors"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

               <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                     <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-white">
                           <Star size={24} fill="white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-white text-[#051C2C] px-3 py-1 rounded-full">Most Popular</span>
                     </div>
                     <h3 className="text-3xl font-black text-white mb-4 leading-tight">{filtered[0].name}</h3>
                     <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-medium">{filtered[0].desc}</p>
                  </div>

                  <div>
                     <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-4xl font-mono font-black text-white">{currency === 'USD' ? '$' : ''}{Math.floor(filtered[0].professionalFee * RATE).toLocaleString()}</span>
                        <span className="text-xs font-bold text-slate-400">{currency}</span>
                     </div>
                     <div className="flex gap-4">
                        <button onClick={() => onViewDetails && onViewDetails(filtered[0].id)} className="flex-1 bg-white text-[#051C2C] py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-100 transition-colors">Learn More</button>
                        <button onClick={() => onAddToCart(filtered[0].id)} className="px-6 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors">
                           {cart.includes(filtered[0].id) ? <CheckCircle2 /> : <Zap />}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* Standard Cards */}
          {filtered.slice(1, 5).map((service, idx) => (
            <div 
              key={service.id} 
              className={`group relative rounded-[2rem] p-6 border border-slate-100 bg-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col justify-between ${idx === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
               <div>
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#051C2C] group-hover:text-white transition-colors duration-300">
                        <Shield size={20} />
                     </div>
                     {cart.includes(service.id) && <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">ADDED</span>}
                  </div>
                  <h4 className="font-bold text-[#051C2C] text-lg leading-tight mb-2 line-clamp-2 group-hover:text-[#F26522] transition-colors">{service.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-3 mb-4">{service.desc}</p>
               </div>
               
               <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="font-mono font-bold text-[#051C2C]">{currency === 'USD' ? '$' : ''}{Math.floor(service.professionalFee * RATE).toLocaleString()}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                     <button onClick={() => onViewDetails && onViewDetails(service.id)} className="p-2 text-slate-400 hover:text-[#051C2C]"><Info size={18} /></button>
                     <button onClick={() => onAddToCart(service.id)} className="p-2 text-[#051C2C] hover:text-[#F26522]"><Zap size={18} /></button>
                  </div>
               </div>
            </div>
          ))}

          {/* Advisory CTA Card */}
          <div className="relative group rounded-[2rem] p-8 overflow-hidden flex flex-col justify-center items-center text-center text-white" style={{ backgroundColor: BRAND.colors.secondary }}>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="relative z-10">
                <Globe size={40} className="mb-4 text-[#051C2C] mx-auto" />
                <h3 className="font-black text-xl mb-2 text-[#051C2C]">Custom Plan?</h3>
                <p className="text-xs font-bold text-[#051C2C]/70 mb-6">Talk to a senior consultant.</p>
                <button className="bg-[#051C2C] text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] w-full hover:scale-105 transition-transform">
                   Book Call
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceEcosystem;
