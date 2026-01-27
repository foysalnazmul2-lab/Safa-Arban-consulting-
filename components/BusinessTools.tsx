
import React, { useState } from 'react';
import { Search, CheckCircle2, TrendingUp, AlertCircle, Building, PieChart, Coins, ArrowRight, Globe, Shield, Scale, Type, Loader2, BarChart2, Lock, Cpu, Sparkles, FileText, Download } from 'lucide-react';
import { ISIC_ACTIVITIES, BRAND } from '../constants';
import { gemini, BusinessPlanData } from '../geminiService';

interface BusinessToolsProps {
  onNavigate?: () => void;
}

const BusinessTools: React.FC<BusinessToolsProps> = ({ onNavigate }) => {
  const [activeTool, setActiveTool] = useState<'activity' | 'roi' | 'name' | 'planner'>('activity'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<any>(null); // State to hold selected item
  const [revenue, setRevenue] = useState(5000000);
  const [profitMargin, setProfitMargin] = useState(25);

  // Name Check State
  const [nameInput, setNameInput] = useState('');
  const [nameStatus, setNameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');

  // Business Planner State
  const [planInputs, setPlanInputs] = useState({ name: '', sector: '', desc: '' });
  const [generatedPlan, setGeneratedPlan] = useState<BusinessPlanData | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Advanced ROI Logic
  const profit = revenue * (profitMargin / 100);
  const ksaTax = profit * 0.20;
  const ksaNet = profit - ksaTax;
  const uaeTaxable = Math.max(0, profit - 375000);
  const uaeTax = uaeTaxable * 0.09;
  const uaeHiddenCosts = profit * 0.05;
  const uaeNet = profit - uaeTax - uaeHiddenCosts;
  const globalTax = profit * 0.25;
  const globalOpExDiff = profit * 0.10;
  const globalNet = profit - globalTax - globalOpExDiff;

  const filteredActivities = ISIC_ACTIVITIES.filter(act => 
    act.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    act.code.includes(searchTerm)
  );

  const checkNameAvailability = () => {
    if (!nameInput.trim()) return;
    setNameStatus('checking');
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

  const generatePlan = async () => {
    if (!planInputs.name || !planInputs.sector || !planInputs.desc) return;
    setIsGeneratingPlan(true);
    const plan = await gemini.generateBusinessPlan(planInputs.name, planInputs.sector, planInputs.desc);
    if (plan) {
        setGeneratedPlan(plan);
    }
    setIsGeneratingPlan(false);
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
             Validate your market entry. Check ISIC 4 compliance, compare profitability, and architect your business strategy.
           </p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
           {/* Sidebar / Tabs */}
           <div className="lg:w-1/3 p-8 text-white flex flex-col justify-center gap-4 relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              <button 
                onClick={() => setActiveTool('activity')}
                className={`flex items-center gap-4 p-5 rounded-2xl transition-all border group ${activeTool === 'activity' ? 'text-[#0A1A2F]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                style={{ 
                    backgroundColor: activeTool === 'activity' ? BRAND.colors.secondary : undefined,
                    borderColor: activeTool === 'activity' ? BRAND.colors.secondary : undefined
                }}
              >
                 <Search size={20} className={activeTool === 'activity' ? 'text-[#0A1A2F]' : 'text-[#C9A86A]'} />
                 <div className="text-left">
                    <h4 className="font-black text-xs uppercase tracking-wider">ISIC 4 Checker</h4>
                    <p className={`text-[10px] mt-1 ${activeTool === 'activity' ? 'text-[#0A1A2F]/80' : 'text-slate-400'}`}>Validate 100% Ownership</p>
                 </div>
              </button>

              <button 
                onClick={() => setActiveTool('planner')}
                className={`flex items-center gap-4 p-5 rounded-2xl transition-all border group ${activeTool === 'planner' ? 'text-[#0A1A2F]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                style={{ 
                    backgroundColor: activeTool === 'planner' ? BRAND.colors.secondary : undefined,
                    borderColor: activeTool === 'planner' ? BRAND.colors.secondary : undefined
                }}
              >
                 <Cpu size={20} className={activeTool === 'planner' ? 'text-[#0A1A2F]' : 'text-[#C9A86A]'} />
                 <div className="text-left">
                    <h4 className="font-black text-xs uppercase tracking-wider">AI Architect</h4>
                    <p className={`text-[10px] mt-1 ${activeTool === 'planner' ? 'text-[#0A1A2F]/80' : 'text-slate-400'}`}>Generate Business Plan</p>
                 </div>
                 {activeTool === 'planner' && <Sparkles size={16} className="ml-auto animate-pulse" />}
              </button>

              <button 
                onClick={() => setActiveTool('roi')}
                className={`flex items-center gap-4 p-5 rounded-2xl transition-all border group ${activeTool === 'roi' ? 'text-[#0A1A2F]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                style={{ 
                    backgroundColor: activeTool === 'roi' ? BRAND.colors.secondary : undefined,
                    borderColor: activeTool === 'roi' ? BRAND.colors.secondary : undefined
                }}
              >
                 <BarChart2 size={20} className={activeTool === 'roi' ? 'text-[#0A1A2F]' : 'text-[#C9A86A]'} />
                 <div className="text-left">
                    <h4 className="font-black text-xs uppercase tracking-wider">Regional ROI</h4>
                    <p className={`text-[10px] mt-1 ${activeTool === 'roi' ? 'text-[#0A1A2F]/80' : 'text-slate-400'}`}>Net Profit Benchmark</p>
                 </div>
              </button>

              <button 
                onClick={() => setActiveTool('name')}
                className={`flex items-center gap-4 p-5 rounded-2xl transition-all border group ${activeTool === 'name' ? 'text-[#0A1A2F]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                style={{ 
                    backgroundColor: activeTool === 'name' ? BRAND.colors.secondary : undefined,
                    borderColor: activeTool === 'name' ? BRAND.colors.secondary : undefined
                }}
              >
                 <Type size={20} className={activeTool === 'name' ? 'text-[#0A1A2F]' : 'text-[#C9A86A]'} />
                 <div className="text-left">
                    <h4 className="font-black text-xs uppercase tracking-wider">Trade Name</h4>
                    <p className={`text-[10px] mt-1 ${activeTool === 'name' ? 'text-[#0A1A2F]/80' : 'text-slate-400'}`}>Availability Check</p>
                 </div>
              </button>
           </div>

           {/* Content Area */}
           <div className="lg:w-2/3 p-8 md:p-12 bg-slate-50 relative flex flex-col justify-center">
              
              {activeTool === 'activity' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                   <div>
                      <h3 className="text-2xl font-black text-[#0A1A2F] mb-2" style={{ color: BRAND.colors.primary }}>Can I own 100% of my business?</h3>
                      <p className="text-slate-500 text-sm">Search the official Ministry of Investment (ISIC 4) database to check foreign ownership eligibility.</p>
                   </div>

                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search activity (e.g. 'Software', 'Construction', 'Retail')..." 
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setSelectedActivity(null); }}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 outline-none shadow-sm font-medium"
                        style={{ '--tw-ring-color': `${BRAND.colors.accent}33` } as React.CSSProperties}
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                   </div>

                   {selectedActivity ? (
                      <div className="animate-in zoom-in-95 duration-300">
                         <div className={`rounded-3xl p-8 border-2 ${selectedActivity.ownership.includes('100%') ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                            <div className="flex items-start gap-6">
                               <div className={`p-4 rounded-2xl shadow-sm ${selectedActivity.ownership.includes('100%') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                  {selectedActivity.ownership.includes('100%') ? <CheckCircle2 size={32} /> : <Lock size={32} />}
                               </div>
                               <div>
                                  <h4 className="text-xl font-black mb-2 text-[#0A1A2F]">{selectedActivity.ownership.includes('100%') ? 'Approved for 100% Ownership' : 'Restricted Activity'}</h4>
                                  <p className="text-sm text-slate-600 font-medium mb-4">{selectedActivity.ownership.includes('100%') ? 'This activity allows full foreign ownership without a local sponsor.' : 'This activity requires a Saudi partner or special approvals.'}</p>
                                  <div className="flex flex-wrap gap-2">
                                     <span className="bg-white px-3 py-1 rounded-lg border text-xs font-bold text-slate-500">Code: {selectedActivity.code}</span>
                                     <span className="bg-white px-3 py-1 rounded-lg border text-xs font-bold text-slate-500">Sector: {selectedActivity.category}</span>
                                     <span className="bg-white px-3 py-1 rounded-lg border text-xs font-bold text-slate-500">Risk: {selectedActivity.risk || 'Standard'}</span>
                                  </div>
                               </div>
                            </div>
                            <button onClick={() => setSelectedActivity(null)} className="mt-6 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#0A1A2F] transition-colors">Search Again</button>
                         </div>
                      </div>
                   ) : (
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                          {searchTerm.length === 0 ? (
                            <div className="text-center py-10 text-slate-400">
                              <Building size={32} className="mx-auto mb-2 opacity-20" />
                              <p className="text-xs uppercase tracking-widest font-bold">Start typing to find your code</p>
                            </div>
                          ) : filteredActivities.length > 0 ? (
                            filteredActivities.map((act) => (
                              <div 
                                key={act.code} 
                                onClick={() => setSelectedActivity(act)}
                                className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm group transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5" 
                                style={{ borderColor: 'transparent' }} 
                                onMouseOver={(e) => e.currentTarget.style.borderColor = `${BRAND.colors.secondary}4D`} 
                                onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
                              >
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">{act.code}</span>
                                      <span className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>{act.name}</span>
                                    </div>
                                    <span className="text-slate-400 text-xs font-medium">{act.category} • {act.type} License</span>
                                </div>
                                <div className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${act.ownership.includes('100%') ? 'bg-[#006C35]/10 text-[#006C35]' : 'bg-red-100 text-red-600'}`}>
                                    {act.ownership.includes('100%') ? 'Allowed' : 'Restricted'}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8">
                               <p className="text-slate-400 text-sm">No exact match found.</p>
                               <button className="mt-2 text-[#C9A86A] text-xs font-bold hover:underline">Request Manual Classification</button>
                            </div>
                          )}
                      </div>
                   )}
                </div>
              )}

              {activeTool === 'planner' && (
                <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500">
                    {!generatedPlan ? (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-black text-[#0A1A2F] mb-2" style={{ color: BRAND.colors.primary }}>AI Business Architect</h3>
                                <p className="text-slate-500 text-sm">Describe your vision. Our AI will analyze market fit and generate a Vision 2030 strategic summary.</p>
                            </div>
                            <div className="space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Company Name" 
                                    value={planInputs.name}
                                    onChange={(e) => setPlanInputs({...planInputs, name: e.target.value})}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-[#C9A86A]"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Sector (e.g. Fintech, Manufacturing)" 
                                    value={planInputs.sector}
                                    onChange={(e) => setPlanInputs({...planInputs, sector: e.target.value})}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-[#C9A86A]"
                                />
                                <textarea 
                                    placeholder="Briefly describe your business activities..." 
                                    value={planInputs.desc}
                                    onChange={(e) => setPlanInputs({...planInputs, desc: e.target.value})}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-xl font-medium text-sm outline-none focus:border-[#C9A86A] min-h-[120px] resize-none"
                                />
                                <button 
                                    onClick={generatePlan}
                                    disabled={isGeneratingPlan || !planInputs.name}
                                    className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    style={{ backgroundColor: BRAND.colors.secondary, color: BRAND.colors.primary }}
                                >
                                    {isGeneratingPlan ? <><Loader2 size={16} className="animate-spin" /> Generating Strategy...</> : <><Sparkles size={16} /> Generate Blueprint</>}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in zoom-in-95 duration-500 h-full overflow-y-auto custom-scrollbar max-h-[500px] pr-2">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-black text-[#0A1A2F]">Strategic Blueprint</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">Generated for {planInputs.name}</p>
                                </div>
                                <button onClick={() => setGeneratedPlan(null)} className="text-slate-400 hover:text-[#0A1A2F] text-xs font-bold">New Plan</button>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-sm text-[#0A1A2F]">Vision 2030 Alignment</h4>
                                        <span className={`px-2 py-1 rounded text-xs font-black ${generatedPlan.vision_2030_score > 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            Score: {generatedPlan.vision_2030_score}/100
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                                        <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${generatedPlan.vision_2030_score}%` }}></div>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">{generatedPlan.vision_2030_justification}</p>
                                </div>

                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Executive Summary</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{generatedPlan.executive_summary}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Market Analysis</h4>
                                        <p className="text-xs text-slate-600">{generatedPlan.market_analysis}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Recommended Structure</h4>
                                        <div className="flex items-center gap-2 text-sm font-bold text-[#0A1A2F]">
                                            <Building size={16} className="text-[#C9A86A]" /> {generatedPlan.recommended_structure}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Key Opportunities</h4>
                                    <ul className="space-y-2">
                                        {generatedPlan.key_opportunities.map((opp, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                                <CheckCircle2 size={14} className="text-[#C9A86A] mt-0.5 shrink-0" />
                                                {opp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <button className="w-full py-3 border border-slate-200 rounded-xl font-bold text-xs text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-2">
                                    <Download size={14} /> Download PDF Report
                                </button>
                            </div>
                        </div>
                    )}
                </div>
              )}

              {activeTool === 'roi' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                   {/* ROI Logic (Same as before) */}
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

                   {/* Vertical Chart Visualization */}
                   <div className="h-64 flex items-end justify-around gap-4 px-4 pt-12 pb-4 bg-white rounded-2xl border border-slate-100 relative overflow-hidden">
                      <div className="absolute inset-x-0 bottom-0 h-px bg-slate-200"></div>
                      
                      {/* Riyadh Bar */}
                      <div className="w-20 flex flex-col items-center group relative z-10">
                         <div className="text-xs font-black mb-2 animate-in slide-in-from-bottom-2 fade-in" style={{ color: BRAND.colors.accent }}>{ksaNet.toLocaleString()}</div>
                         <div className="w-full bg-slate-100 rounded-t-xl relative overflow-hidden h-40 transition-all duration-1000 ease-out" style={{ height: '160px' }}>
                            <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-[#006C35] to-[#4ade80] opacity-90"></div>
                         </div>
                         <div className="mt-3 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#006C35]">Riyadh</p>
                            <p className="text-[9px] text-slate-400">KSA</p>
                         </div>
                      </div>

                      {/* Dubai Bar */}
                      <div className="w-20 flex flex-col items-center group relative z-10">
                         <div className="text-xs font-bold text-slate-500 mb-2">{uaeNet.toLocaleString()}</div>
                         <div className="w-full bg-slate-100 rounded-t-xl relative overflow-hidden h-40 transition-all duration-1000 ease-out" style={{ height: `${(uaeNet / ksaNet) * 160}px` }}>
                            <div className="absolute bottom-0 w-full h-full bg-slate-400"></div>
                         </div>
                         <div className="mt-3 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Dubai</p>
                            <p className="text-[9px] text-slate-400">UAE</p>
                         </div>
                      </div>

                      {/* London Bar */}
                      <div className="w-20 flex flex-col items-center group relative z-10">
                         <div className="text-xs font-bold text-slate-500 mb-2">{globalNet.toLocaleString()}</div>
                         <div className="w-full bg-slate-100 rounded-t-xl relative overflow-hidden h-40 transition-all duration-1000 ease-out" style={{ height: `${(globalNet / ksaNet) * 160}px` }}>
                            <div className="absolute bottom-0 w-full h-full bg-slate-300"></div>
                         </div>
                         <div className="mt-3 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">London</p>
                            <p className="text-[9px] text-slate-400">UK</p>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTool === 'name' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 w-full">
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
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTools;
