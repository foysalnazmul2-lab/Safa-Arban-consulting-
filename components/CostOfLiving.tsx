
import React, { useState } from 'react';
import { Home, GraduationCap, ShoppingBag, Car, Wallet, Building } from 'lucide-react';
import { BRAND } from '../constants';

const CostOfLiving: React.FC = () => {
  const [familySize, setFamilySize] = useState(2);
  const [lifestyle, setLifestyle] = useState<'moderate' | 'premium'>('moderate');
  const [housing, setHousing] = useState<'apartment' | 'villa'>('apartment');

  // Base Costs (Approximate monthly SAR)
  const housingCost = housing === 'apartment' ? (lifestyle === 'moderate' ? 4000 : 8000) : (lifestyle === 'moderate' ? 10000 : 25000);
  const schoolingCost = (familySize - 2 > 0 ? (familySize - 2) : 0) * (lifestyle === 'moderate' ? 2500 : 5000); // Only for kids
  const foodCost = familySize * (lifestyle === 'moderate' ? 1000 : 2500);
  const transportCost = lifestyle === 'moderate' ? 1500 : 3500;
  
  const totalCost = housingCost + schoolingCost + foodCost + transportCost;

  return (
    <div className="bg-[#F8FAFC] py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
           <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4 flex items-center justify-center gap-2" style={{ color: BRAND.colors.primary }}>
              <Wallet size={14} /> Relocation Planner
           </span>
           <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: BRAND.colors.primary }}>
              Cost of Living Estimator
           </h2>
           <p className="text-slate-500 text-sm max-w-lg mx-auto">
             Planning to relocate staff? Estimate the monthly operational expenditure for expatriate living in Riyadh.
           </p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
           {/* Controls */}
           <div className="md:w-1/2 p-8 md:p-12 space-y-8">
              <div>
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Family Size</label>
                 <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="1" 
                      max="6" 
                      step="1" 
                      value={familySize}
                      onChange={(e) => setFamilySize(Number(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                      style={{ accentColor: BRAND.colors.accent }}
                    />
                    <span className="font-bold w-8 text-center" style={{ color: BRAND.colors.primary }}>{familySize}</span>
                 </div>
              </div>

              <div>
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Lifestyle Tier</label>
                 <div className="flex gap-2 bg-slate-50 p-1 rounded-xl">
                    {['moderate', 'premium'].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setLifestyle(tier as any)}
                        className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                          lifestyle === tier ? 'text-white shadow-lg' : 'text-slate-400'
                        }`}
                        style={{ 
                            backgroundColor: lifestyle === tier ? BRAND.colors.primary : 'transparent',
                            color: lifestyle === tier ? 'white' : undefined
                        }}
                      >
                        {tier}
                      </button>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Housing Preference</label>
                 <div className="flex gap-4">
                    <button 
                      onClick={() => setHousing('apartment')}
                      className={`flex-1 p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                        housing === 'apartment' ? 'bg-[#006C35]/5 text-[#006C35]' : 'border-slate-100 text-slate-400 hover:border-slate-300'
                      }`}
                      style={{ borderColor: housing === 'apartment' ? BRAND.colors.accent : undefined }}
                    >
                       <Building size={20} />
                       <span className="text-[10px] font-bold uppercase">Apartment</span>
                    </button>
                    <button 
                      onClick={() => setHousing('villa')}
                      className={`flex-1 p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                        housing === 'villa' ? 'bg-[#006C35]/5 text-[#006C35]' : 'border-slate-100 text-slate-400 hover:border-slate-300'
                      }`}
                      style={{ borderColor: housing === 'villa' ? BRAND.colors.accent : undefined }}
                    >
                       <Home size={20} />
                       <span className="text-[10px] font-bold uppercase">Villa</span>
                    </button>
                 </div>
              </div>
           </div>

           {/* Results */}
           <div className="md:w-1/2 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#006C35] rounded-full blur-[80px] opacity-20"></div>
              
              <div className="relative z-10">
                 <p className="text-[10px] font-black uppercase tracking-widest mb-6" style={{ color: BRAND.colors.secondary }}>Monthly Estimate</p>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                       <span className="text-slate-400 flex items-center gap-2"><Home size={14} /> Housing</span>
                       <span className="font-bold">{housingCost.toLocaleString()} SAR</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                       <span className="text-slate-400 flex items-center gap-2"><GraduationCap size={14} /> Schooling</span>
                       <span className="font-bold">{schoolingCost.toLocaleString()} SAR</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                       <span className="text-slate-400 flex items-center gap-2"><ShoppingBag size={14} /> Living</span>
                       <span className="font-bold">{foodCost.toLocaleString()} SAR</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                       <span className="text-slate-400 flex items-center gap-2"><Car size={14} /> Transport</span>
                       <span className="font-bold">{transportCost.toLocaleString()} SAR</span>
                    </div>
                 </div>
              </div>

              <div className="relative z-10 pt-8">
                 <p className="text-4xl font-black text-white mb-1">{totalCost.toLocaleString()} <span className="text-lg text-slate-400">SAR</span></p>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-6">Per Month (Estimated)</p>
                 
                 <button className="w-full py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all flex items-center justify-center gap-2"
                         style={{ backgroundColor: BRAND.colors.secondary, color: BRAND.colors.primary }}>
                    Download Full Breakdown
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CostOfLiving;
