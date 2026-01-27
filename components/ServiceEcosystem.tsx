
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
  Building,
  Lightbulb
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
  const [activeStage, setActiveStage] = useState<'launch' | 'operate' | 'grow' | 'advisory'>('launch');

  const stages = {
    launch: {
      label: 'Launch',
      icon: <Rocket />,
      desc: 'Mandatory licenses to establish legal presence.',
      keywords: ['Formation', 'Licensing', 'Registration', 'MISA', 'Industrial']
    },
    operate: {
      label: 'Operate',
      icon: <Settings />,
      desc: 'Compliance, HR, Banking, and daily operations.',
      keywords: ['Manpower', 'Immigration', 'Compliance', 'Support', 'Human Capital', 'BPO']
    },
    grow: {
      label: 'Grow',
      icon: <TrendingUp />,
      desc: 'Expansion, Special Permits, and VIP Residency.',
      keywords: ['Premium', 'Sector', 'Real Estate', 'Mining', 'Tourism']
    },
    advisory: {
      label: 'Advisory',
      icon: <Lightbulb />,
      desc: 'Strategic consulting, Tax, Legal, and Digital transformation.',
      keywords: ['Strategy', 'Consulting', 'Advisory', 'Legal', 'Marketing', 'Digital', 'Financial', 'Tax', 'Research']
    }
  };

  const getFilteredServices = () => {
    const keywords = stages[activeStage].keywords;
    return SERVICES_DB.filter(service => 
      keywords.some(k => service.category.includes(k) || service.name.includes(k))
    );
  };

  const RATE = currency === 'USD' ? 0.2666 : 1;
  const filtered = getFilteredServices();

  return (
    <div className="py-24 relative overflow-hidden bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4 flex items-center justify-center gap-2 text-[#E94E4E]">
            <Crown size={14} /> The Saudi Investment Ecosystem
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8 text-[#051C2C]">
            Solutions <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E94E4E] to-[#F7C948]">Matrix</span>
          </h2>
          
          {/* Stage Tabs */}
          <div className="inline-flex flex-wrap justify-center gap-2 bg-white p-2 rounded-[2rem] shadow-xl border border-slate-100">
            {(Object.keys(stages) as Array<keyof typeof stages>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveStage(key)}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeStage === key 
                  ? 'bg-[#051C2C] text-white shadow-lg transform scale-105' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                {React.cloneElement(stages[key].icon as React.ReactElement<any>, { size: 14 })}
                {stages[key].label}
              </button>
            ))}
          </div>
          
          <p className="mt-8 text-slate-500 text-sm font-medium animate-in fade-in key={activeStage} max-w-xl mx-auto">
             {stages[activeStage].desc}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(250px,auto)] gap-6 animate-in slide-in-from-bottom-8 fade-in duration-500 key={activeStage}">
          
          {/* Featured Card (Large) */}
          {filtered.length > 0 && (
            <div className="md:col-span-2 lg:col-span-2 row-span-2 relative group rounded-[2.5rem] p-10 overflow-hidden shadow-2xl transition-all hover:shadow-[0_20px_60px_-15px_rgba(5,28,44,0.3)] bg-[#051C2C] border border-[#051C2C]">
               <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-white/10 transition-colors"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

               <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                     <div className="flex justify-between items-start mb-8">
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-white shadow-inner">
                           <Star size={24} fill="white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-white text-[#051C2C] px-3 py-1 rounded-full shadow-lg">Featured</span>
                     </div>
                     <h3 className="text-3xl font-black text-white mb-4 leading-tight">{filtered[0].name}</h3>
                     <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-medium">{filtered[0].desc}</p>
                  </div>

                  <div>
                     <div className="flex items-baseline gap-2 mb-8">
                        <span className="text-4xl font-mono font-black text-white">{currency === 'USD' ? '$' : ''}{Math.floor(filtered[0].professionalFee * RATE).toLocaleString()}</span>
                        <span className="text-xs font-bold text-slate-400">{currency}</span>
                     </div>
                     <div className="flex gap-4">
                        <button onClick={() => onViewDetails && onViewDetails(filtered[0].id)} className="flex-1 bg-white text-[#051C2C] py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-100 transition-colors shadow-lg">Learn More</button>
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
              className={`group relative rounded-[2rem] p-6 border border-slate-100 bg-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col justify-between ${idx === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
               <div>
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#051C2C] group-hover:text-white transition-colors duration-300 shadow-sm">
                        <Shield size={20} />
                     </div>
                     {cart.includes(service.id) && <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">ADDED</span>}
                  </div>
                  <h4 className="font-bold text-[#051C2C] text-lg leading-tight mb-2 line-clamp-2 group-hover:text-[#E94E4E] transition-colors">{service.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-3 mb-4 font-medium">{service.desc}</p>
               </div>
               
               <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="font-mono font-bold text-[#051C2C]">{currency === 'USD' ? '$' : ''}{Math.floor(service.professionalFee * RATE).toLocaleString()}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                     <button onClick={() => onViewDetails && onViewDetails(service.id)} className="p-2 text-slate-400 hover:text-[#051C2C]" title="Details"><Info size={18} /></button>
                     <button onClick={() => onAddToCart(service.id)} className="p-2 text-[#051C2C] hover:text-[#E94E4E]" title="Add"><Zap size={18} /></button>
                  </div>
               </div>
            </div>
          ))}

          {/* Advisory CTA Card */}
          <div className="relative group rounded-[2rem] p-8 overflow-hidden flex flex-col justify-center items-center text-center text-white shadow-2xl" style={{ backgroundColor: BRAND.colors.secondary }}>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-[60px] opacity-20"></div>
             <div className="relative z-10">
                <Globe size={40} className="mb-6 text-[#051C2C] mx-auto drop-shadow-md" />
                <h3 className="font-black text-xl mb-2 text-[#051C2C]">Custom Plan?</h3>
                <p className="text-xs font-bold text-[#051C2C]/80 mb-8 max-w-[150px] mx-auto">Complex requirements? Talk to a senior consultant.</p>
                <button className="bg-[#051C2C] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] w-full hover:scale-105 transition-transform shadow-xl">
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
