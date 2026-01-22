
import React, { useState } from 'react';
import { DollarSign, Clock, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import { BRAND } from '../constants';

const CostCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState(1000000); // 1M SAR default
  const [monthsDelayed, setMonthsDelayed] = useState(6);

  // Assumptions
  const profitMargin = 0.25; // 25%
  const ksaTaxRate = 0.20; // 20%
  const competitorGrowthRate = 0.05; // 5% market share loss per month delayed

  // Calculations
  const monthlyRevenue = revenue / 12;
  const monthlyProfit = monthlyRevenue * profitMargin;
  
  // Loss Calculation
  const lostProfit = monthlyProfit * monthsDelayed;
  const marketShareLost = Math.min(competitorGrowthRate * monthsDelayed * 100, 100);
  const potentialTaxSavings = (revenue * 0.30) * 0.20; // Hypothetical RHQ saving scenario (30% of rev attributable to RHQ)

  return (
    <div className="py-24 relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
      {/* Background FX */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.alert }}></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
           <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4 flex items-center justify-center gap-2" style={{ color: BRAND.colors.alert }}>
              <Clock size={14} /> Opportunity Cost Engine
           </span>
           <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              The Price of Waiting
           </h2>
           <p className="text-slate-400 text-sm max-w-xl mx-auto">
             Every month you delay entering the Saudi market allows competitors to capture your share. Calculate your potential loss.
           </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
           <div className="grid md:grid-cols-2 gap-12">
              
              {/* Inputs */}
              <div className="space-y-8">
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">Proj. Annual Revenue (SAR)</label>
                    <div className="flex items-center gap-4">
                       <input 
                         type="range" 
                         min="500000" 
                         max="20000000" 
                         step="500000" 
                         value={revenue}
                         onChange={(e) => setRevenue(Number(e.target.value))}
                         className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                         style={{ accentColor: BRAND.colors.alert }}
                       />
                       <span className="font-mono font-bold text-white text-sm w-24 text-right">{(revenue/1000000).toFixed(1)}M</span>
                    </div>
                 </div>

                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">Delay in Entry (Months)</label>
                    <div className="flex items-center gap-4">
                       <input 
                         type="range" 
                         min="1" 
                         max="24" 
                         step="1" 
                         value={monthsDelayed}
                         onChange={(e) => setMonthsDelayed(Number(e.target.value))}
                         className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                         style={{ accentColor: BRAND.colors.alert }}
                       />
                       <span className="font-mono font-bold text-white text-sm w-24 text-right">{monthsDelayed} Mo</span>
                    </div>
                 </div>

                 <div className="p-6 rounded-2xl border" style={{ backgroundColor: `${BRAND.colors.alert}1A`, borderColor: `${BRAND.colors.alert}33` }}>
                    <div className="flex gap-4">
                       <AlertTriangle className="shrink-0" size={24} style={{ color: BRAND.colors.alert }} />
                       <div>
                          <h4 className="font-bold text-white text-sm">First-Mover Advantage Fading</h4>
                          <p className="text-[10px] text-white/60 mt-1 leading-relaxed">
                             Vision 2030 incentives are time-sensitive. RHQ tax holidays and industrial grants are allocated on a first-come, first-served basis.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Outputs */}
              <div className="flex flex-col justify-center space-y-6">
                 <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Estimated Opportunity Loss</p>
                    <p className="text-5xl font-black tracking-tighter" style={{ color: BRAND.colors.alert }}>
                       -{lostProfit.toLocaleString()} <span className="text-lg text-white/50">SAR</span>
                    </p>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                       <p className="text-[9px] font-bold text-slate-400 uppercase">Market Share Risk</p>
                       <p className="text-xl font-black text-white mt-1">{marketShareLost.toFixed(1)}%</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                       <p className="text-[9px] font-bold text-slate-400 uppercase">Tax Incentives Risk</p>
                       <p className="text-xl font-black text-white mt-1">{potentialTaxSavings.toLocaleString()}</p>
                    </div>
                 </div>

                 <button 
                   className="w-full text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 group"
                   style={{ backgroundColor: BRAND.colors.alert }}
                   onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = BRAND.colors.primary; }}
                   onMouseOut={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.alert; e.currentTarget.style.color = 'white'; }}
                 >
                    Stop The Bleeding <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
