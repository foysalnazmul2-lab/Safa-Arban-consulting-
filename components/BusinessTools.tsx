
import React, { useState } from 'react';
import { Search, CheckCircle2, TrendingUp, AlertCircle, Building, PieChart, Coins, ArrowRight, Globe, Shield, Scale, Type, Loader2 } from 'lucide-react';
import { ISIC_ACTIVITIES, BRAND } from '../constants';

interface BusinessToolsProps {
  onNavigate?: () => void;
}

const BusinessTools: React.FC<BusinessToolsProps> = ({ onNavigate }) => {
  const [activeTool, setActiveTool] = useState<'activity' | 'roi' | 'name'>('roi'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [revenue, setRevenue] = useState(5000000);
  const [profitMargin, setProfitMargin] = useState(25);

  // Name Check State
  const [nameInput, setNameInput] = useState('');
  const [nameStatus, setNameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');

  // Advanced ROI Logic
  const profit = revenue * (profitMargin / 100);
  
  // KSA: 20% Corp Tax, No hidden fees for RHQ
  const ksaTax = profit * 0.20;
  const ksaNet = profit - ksaTax;

  // UAE: 9% Corp Tax (Above 375k) + Higher license/visa costs (Estimated 5% op cost impact)
  const uaeTaxable = Math.max(0, profit - 375000); // 375k AED exemption approx
  const uaeTax = uaeTaxable * 0.09;
  const uaeHiddenCosts = profit * 0.05; // License renewal, higher rent etc.
  const uaeNet = profit - uaeTax - uaeHiddenCosts;

  // UK/Global: ~25% Corp Tax + High OpEx
  const globalTax = profit * 0.25;
  const globalOpExDiff = profit * 0.10; // 10% higher operational cost
  const globalNet = profit - globalTax - globalOpExDiff;

  const filteredActivities = ISIC_ACTIVITIES.filter(act => 
    act.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    act.code.includes(searchTerm)
  );

  const checkNameAvailability = () => {
    if (!nameInput.trim()) return;
    setNameStatus('checking');
    
    // Simulate API Check logic
    setTimeout(() => {
        const forbidden = ['royal', 'saudi', 'king', 'mecca', 'madina', 'investment', 'bank'];
        const taken = ['techflow', 'safaarban', 'aramco', 'sabic', 'stc'];
        const lowerName = nameInput.toLowerCase();

        if (forbidden.some(f => lowerName.includes(f))) {
            setNameStatus('invalid');
        } else if (taken.includes(lowerName)) {
            setNameStatus('taken');
        } else {
            setNameStatus('available');
        }
    }, 1500);
  };

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${BRAND.colors.secondary}, ${BRAND.colors.alert}, ${BRAND.colors.accent})` }}></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <span className="font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-4" style={{ color: BRAND.colors.accent }}>Strategic Intelligence</span>
           <h2 className="text-3xl md:text-5xl font-black text-[#0A1A2F] tracking-tight mb-6" style={{ color: BRAND.colors.primary }}>Decision Engines</h2>
           <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
             Validate your market entry. Compare KSA net profitability against regional competitors like Dubai and London.
           </p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
           {/* Sidebar / Tabs */}
           <div className="lg:w-1/3 p-8 text-white flex flex-col justify-center gap-6 relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              <button 
                onClick={() => setActiveTool('roi')}
                className={`flex items-center gap-4 p-6 rounded-2xl transition-all border group ${activeTool === 'roi' ? 'text-[#0A1A2F]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                style={{ 
                    backgroundColor: activeTool === 'roi' ? BRAND.colors.secondary : undefined,
                    borderColor: activeTool === 'roi' ? BRAND.colors.secondary : undefined
                }}
              >
                 <Scale size={24} className={activeTool === 'roi' ? 'text-[#0A1A2F]' : 'text-[#C9A86A]'} />
                 <div className="text-left">
                    <h4 className="font-black text-sm uppercase tracking-wider">Regional ROI Engine</h4>
                    <p className={`text-xs mt-1 ${activeTool === 'roi' ? 'text-[#0A1A2F]/80' : 'text-slate-400'}`}>Compare KSA vs UAE vs Global</p>
                 </div>
                 {activeTool === 'roi' && <ArrowRight size={16} className="ml-auto animate-pulse" />}
              </button>

              <button 
                onClick={() => setActiveTool('activity')}
                className={`flex items-center gap-4 p-6 rounded-2xl transition-all border group ${activeTool === 'activity' ? 'text-[#0A1A2F]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                style={{ 
                    backgroundColor: activeTool === 'activity' ? BRAND.colors.secondary : undefined,
                    borderColor: activeTool === 'activity' ? BRAND.colors.secondary : undefined
                }}
              >
                 <Search size={24} className={activeTool === 'activity' ? 'text-[#0A1A2F]' : 'text-[#C9A86A]'} />
                 <div className="text-left">
                    <h4 className="font-black text-sm uppercase tracking-wider">ISIC 4 Checker</h4>
                    <p className={`text-xs mt-1 ${activeTool === 'activity' ? 'text-[#0A1A2F]/80' : 'text-slate-400'}`}>Validate 100% Ownership</p>
                 </div>
                 {activeTool === 'activity' && <ArrowRight size={16} className="ml-auto animate-pulse" />}
              </button>

              <button 
                onClick={() => setActiveTool('name')}
                className={`flex items-center gap-4 p-6 rounded-2xl transition-all border group ${activeTool === 'name' ? 'text-[#0A1A2F]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                style={{ 
                    backgroundColor: activeTool === 'name' ? BRAND.colors.secondary : undefined,
                    borderColor: activeTool === 'name' ? BRAND.colors.secondary : undefined
                }}
              >
                 <Type size={24} className={activeTool === 'name' ? 'text-[#0A1A2F]' : 'text-[#C9A86A]'} />
                 <div className="text-left">
                    <h4 className="font-black text-sm uppercase tracking-wider">Trade Name Check</h4>
                    <p className={`text-xs mt-1 ${activeTool === 'name' ? 'text-[#0A1A2F]/80' : 'text-slate-400'}`}>Availability Simulator</p>
                 </div>
                 {activeTool === 'name' && <ArrowRight size={16} className="ml-auto animate-pulse" />}
              </button>
           </div>

           {/* Content Area */}
           <div className="lg:w-2/3 p-8 md:p-12 bg-slate-50 relative">
              
              {activeTool === 'activity' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div>
                      <h3 className="text-2xl font-black text-[#0A1A2F] mb-2" style={{ color: BRAND.colors.primary }}>Can I own 100% of my business?</h3>
                      <p className="text-slate-500 text-sm">Search the official Ministry of Investment (ISIC 4) database.</p>
                   </div>

                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search activity (e.g. 'Software', 'Construction')..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 outline-none shadow-sm font-medium"
                        style={{ '--tw-ring-color': `${BRAND.colors.accent}33` } as React.CSSProperties}
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                   </div>

                   <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {searchTerm.length === 0 ? (
                        <div className="text-center py-10 text-slate-400">
                           <Building size={32} className="mx-auto mb-2 opacity-20" />
                           <p className="text-xs uppercase tracking-widest font-bold">Start typing to find your code</p>
                        </div>
                      ) : filteredActivities.length > 0 ? (
                        filteredActivities.map((act) => (
                          <div key={act.code} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm group transition-all" style={{ borderColor: 'transparent' }} onMouseOver={(e) => e.currentTarget.style.borderColor = `${BRAND.colors.secondary}4D`} onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                             <div>
                                <div className="flex items-center gap-2 mb-1">
                                   <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">{act.code}</span>
                                   <span className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>{act.name}</span>
                                </div>
                                <span className="text-slate-400 text-xs font-medium">{act.category} • {act.type} License</span>
                             </div>
                             <div className="flex flex-col items-end gap-2">
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${act.ownership.includes('100%') ? 'bg-[#006C35]/10 text-[#006C35]' : 'bg-amber-100 text-amber-700'}`}>
                                    {act.ownership.includes('100%') ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                    {act.ownership}
                                </div>
                                {onNavigate && (
                                  <button onClick={onNavigate} className="text-[9px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all" style={{ color: BRAND.colors.primary }}>
                                    Get License <ArrowRight size={10} />
                                  </button>
                                )}
                             </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-slate-400 text-sm py-4">No activities found. Contact us for custom classification.</p>
                      )}
                   </div>
                </div>
              )}

              {activeTool === 'roi' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div>
                      <h3 className="text-2xl font-black text-[#0A1A2F] mb-2" style={{ color: BRAND.colors.primary }}>Profitability Comparison</h3>
                      <p className="text-slate-500 text-sm">Visualize net profit retention across major business hubs.</p>
                   </div>

                   {/* Sliders */}
                   <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                      <div>
                         <div className="flex justify-between mb-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Proj. Annual Revenue</label>
                            <span className="text-sm font-black" style={{ color: BRAND.colors.primary }}>{revenue.toLocaleString()} SAR</span>
                         </div>
                         <input 
                           type="range" 
                           min="1000000" 
                           max="50000000" 
                           step="1000000" 
                           value={revenue}
                           onChange={(e) => setRevenue(Number(e.target.value))}
                           className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                           style={{ accentColor: BRAND.colors.secondary }}
                         />
                      </div>
                      <div>
                         <div className="flex justify-between mb-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Profit Margin</label>
                            <span className="text-sm font-black" style={{ color: BRAND.colors.primary }}>{profitMargin}%</span>
                         </div>
                         <input 
                           type="range" 
                           min="10" 
                           max="60" 
                           step="1" 
                           value={profitMargin}
                           onChange={(e) => setProfitMargin(Number(e.target.value))}
                           className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                           style={{ accentColor: BRAND.colors.secondary }}
                         />
                      </div>
                   </div>

                   {/* Bars */}
                   <div className="space-y-4">
                      {/* KSA */}
                      <div className="group cursor-pointer">
                         <div className="flex justify-between mb-1">
                            <div className="flex items-center gap-2">
                               <span className="text-lg">🇸🇦</span>
                               <span className="font-bold text-[#0A1A2F] text-sm" style={{ color: BRAND.colors.primary }}>Riyadh (KSA)</span>
                            </div>
                            <span className="font-black text-sm" style={{ color: BRAND.colors.accent }}>{ksaNet.toLocaleString()} SAR</span>
                         </div>
                         <div className="w-full bg-slate-100 h-8 rounded-lg overflow-hidden relative">
                            <div className="h-full rounded-lg transition-all duration-1000 flex items-center justify-end px-3" style={{ width: '100%', backgroundColor: BRAND.colors.accent }}>
                               <span className="text-[10px] font-bold text-white uppercase tracking-widest">Highest Net Retention</span>
                            </div>
                         </div>
                      </div>

                      {/* UAE */}
                      <div className="group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                         <div className="flex justify-between mb-1">
                            <div className="flex items-center gap-2">
                               <span className="text-lg">🇦🇪</span>
                               <span className="font-bold text-[#0A1A2F] text-sm" style={{ color: BRAND.colors.primary }}>Dubai (UAE)</span>
                            </div>
                            <span className="font-bold text-slate-600 text-sm">{uaeNet.toLocaleString()} SAR</span>
                         </div>
                         <div className="w-full bg-slate-100 h-8 rounded-lg overflow-hidden relative">
                            <div className="h-full bg-slate-400 rounded-lg transition-all duration-1000" style={{ width: `${(uaeNet / ksaNet) * 100}%` }}></div>
                         </div>
                         <p className="text-[9px] text-slate-400 mt-1 pl-7">Includes 9% Corp Tax + est. 5% higher operational costs</p>
                      </div>

                      {/* Global */}
                      <div className="group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                         <div className="flex justify-between mb-1">
                            <div className="flex items-center gap-2">
                               <Globe size={18} className="text-slate-400" />
                               <span className="font-bold text-[#0A1A2F] text-sm" style={{ color: BRAND.colors.primary }}>London / NY</span>
                            </div>
                            <span className="font-bold text-slate-600 text-sm">{globalNet.toLocaleString()} SAR</span>
                         </div>
                         <div className="w-full bg-slate-100 h-8 rounded-lg overflow-hidden relative">
                            <div className="h-full bg-slate-300 rounded-lg transition-all duration-1000" style={{ width: `${(globalNet / ksaNet) * 100}%` }}></div>
                         </div>
                      </div>
                   </div>

                   <div className="p-4 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: `${BRAND.colors.secondary}1A`, borderColor: `${BRAND.colors.secondary}4D` }}>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-[#0A1A2F]" style={{ color: BRAND.colors.primary }}>Saudi Advantage</p>
                         <p className="text-xs text-slate-500 mt-1">Lower OpEx & Massive Gov Incentives</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: BRAND.colors.accent }}>Extra Profit</p>
                         <p className="text-lg font-black text-[#0A1A2F]" style={{ color: BRAND.colors.primary }}>+{(ksaNet - globalNet).toLocaleString()} SAR</p>
                      </div>
                   </div>
                </div>
              )}

              {activeTool === 'name' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div>
                      <h3 className="text-2xl font-black text-[#0A1A2F] mb-2" style={{ color: BRAND.colors.primary }}>Trade Name Availability</h3>
                      <p className="text-slate-500 text-sm">Simulate the Ministry of Commerce name reservation process.</p>
                   </div>

                   <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg text-center space-y-6">
                      <div className="relative">
                         <input 
                           type="text" 
                           placeholder="Enter Proposed Company Name (English or Arabic)"
                           value={nameInput}
                           onChange={(e) => { setNameInput(e.target.value); setNameStatus('idle'); }}
                           className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl text-center text-lg font-bold text-[#0A1A2F] outline-none focus:ring-2 transition-all uppercase placeholder:normal-case placeholder:text-slate-400 placeholder:text-sm"
                           style={{ '--tw-ring-color': `${BRAND.colors.secondary}80`, color: BRAND.colors.primary } as React.CSSProperties}
                         />
                      </div>

                      {nameStatus === 'idle' && (
                        <button 
                          onClick={checkNameAvailability}
                          disabled={!nameInput.trim()}
                          className="text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                          style={{ backgroundColor: BRAND.colors.primary }}
                          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.secondary; e.currentTarget.style.color = BRAND.colors.primary; }}
                          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.primary; e.currentTarget.style.color = 'white'; }}
                        >
                          Check Availability
                        </button>
                      )}

                      {nameStatus === 'checking' && (
                        <div className="flex justify-center items-center gap-3 font-bold animate-pulse" style={{ color: BRAND.colors.secondary }}>
                           <Loader2 className="animate-spin" /> Querying MoC Database...
                        </div>
                      )}

                      {nameStatus === 'available' && (
                        <div className="animate-in zoom-in-95 duration-300">
                           <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg" style={{ backgroundColor: BRAND.colors.accent }}>
                              <CheckCircle2 size={32} />
                           </div>
                           <h4 className="text-xl font-black mb-2" style={{ color: BRAND.colors.accent }}>Name Available</h4>
                           <p className="text-slate-500 text-sm mb-6">"{nameInput}" appears to be unique.</p>
                           {onNavigate && (
                             <button onClick={onNavigate} className="text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:shadow-lg transition-all" style={{ backgroundColor: BRAND.colors.accent }}>
                               Reserve Now (168 SAR)
                             </button>
                           )}
                        </div>
                      )}

                      {nameStatus === 'taken' && (
                        <div className="animate-in zoom-in-95 duration-300">
                           <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                              <AlertCircle size={32} />
                           </div>
                           <h4 className="text-xl font-black text-amber-600 mb-2">Name Conflict</h4>
                           <p className="text-slate-500 text-sm mb-4">A company with a similar name already exists.</p>
                           <button onClick={() => { setNameInput(''); setNameStatus('idle'); }} className="text-amber-600 font-bold text-xs uppercase tracking-widest hover:underline">
                              Try Another Variation
                           </button>
                        </div>
                      )}

                      {nameStatus === 'invalid' && (
                        <div className="animate-in zoom-in-95 duration-300">
                           <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg" style={{ backgroundColor: BRAND.colors.alert }}>
                              <Shield size={32} />
                           </div>
                           <h4 className="text-xl font-black mb-2" style={{ color: BRAND.colors.alert }}>Restricted Name</h4>
                           <p className="text-slate-500 text-sm mb-4">This name contains reserved or prohibited terms (e.g. Royal, Bank, Investment).</p>
                           <button onClick={() => { setNameInput(''); setNameStatus('idle'); }} className="font-bold text-xs uppercase tracking-widest hover:underline" style={{ color: BRAND.colors.alert }}>
                              Review Guidelines
                           </button>
                        </div>
                      )}
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl border" style={{ backgroundColor: `${BRAND.colors.secondary}1A`, borderColor: `${BRAND.colors.secondary}33` }}>
                         <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: BRAND.colors.primary }}>Naming Rule #1</p>
                         <p className="text-xs text-slate-500">Must not contain "Saudi", "Royal", or imply government affiliation.</p>
                      </div>
                      <div className="p-4 rounded-2xl border" style={{ backgroundColor: `${BRAND.colors.secondary}1A`, borderColor: `${BRAND.colors.secondary}33` }}>
                         <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: BRAND.colors.primary }}>Naming Rule #2</p>
                         <p className="text-xs text-slate-500">English names must be transliterated to Arabic phonetically.</p>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTools;
