
import React from 'react';
import { Building2, Landmark, Globe, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../constants';

const PARTNERS = [
  { name: 'Ministry of Investment', role: 'Licensing Authority', type: 'gov' },
  { name: 'Ministry of Commerce', role: 'Commercial Registry', type: 'gov' },
  { name: 'ZATCA', role: 'Tax & Customs', type: 'gov' },
  { name: 'SNB (Saudi National Bank)', role: 'Banking Partner', type: 'bank' },
  { name: 'AlRajhi Bank', role: 'Banking Partner', type: 'bank' },
  { name: 'Qiwa', role: 'HR & Visa Platform', type: 'tech' },
  { name: 'Muqeem', role: 'Immigration Portal', type: 'tech' },
  { name: 'Riyadh Chamber', role: 'Commerce Body', type: 'gov' },
];

const Partners: React.FC = () => {
  return (
    <div className="bg-slate-50 py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
         <div className="text-center mb-16">
            <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.primary }}>The Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4" style={{ color: BRAND.colors.primary }}>
               Integrated Network
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">
               SafaArban is fully integrated with the Kingdom's digital government infrastructure and tier-1 financial institutions.
            </p>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PARTNERS.map((partner, i) => (
               <div key={i} className="group bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden" style={{ borderColor: 'transparent' }} onMouseOver={(e) => e.currentTarget.style.borderColor = BRAND.colors.primary} onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                  <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                     <ArrowUpRight size={14} style={{ color: BRAND.colors.primary }} />
                  </div>
                  
                  <div className="mb-4">
                     {partner.type === 'gov' && <div className="w-10 h-10 bg-[#006C35]/10 rounded-lg flex items-center justify-center text-[#006C35]"><Landmark size={20} /></div>}
                     {partner.type === 'bank' && <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND.colors.primary}1A`, color: BRAND.colors.primary }}><Building2 size={20} /></div>}
                     {partner.type === 'tech' && <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND.colors.secondary}1A`, color: BRAND.colors.secondary }}><Globe size={20} /></div>}
                  </div>
                  
                  <h4 className="font-black text-sm mb-1" style={{ color: BRAND.colors.primary }}>{partner.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{partner.role}</p>
                  
                  <div className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                     <span className="text-[9px] font-bold text-emerald-600">Direct Connect</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Partners;
