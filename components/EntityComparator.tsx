
import React from 'react';
import { Check, Building, Globe, Briefcase } from 'lucide-react';
import { BRAND } from '../constants';

const EntityComparator: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.accent }}>Structure Strategy</span>
           <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: BRAND.colors.primary }}>
              Choose Your Vehicle
           </h2>
           <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
             Comparing the three most common investment structures for international companies entering Saudi Arabia.
           </p>
        </div>

        <div className="overflow-x-auto pb-8">
           <div className="min-w-[900px] bg-slate-50 rounded-[3rem] p-8 border border-slate-100 shadow-xl">
              <div className="grid grid-cols-4 gap-6">
                 
                 {/* Header Column */}
                 <div className="space-y-6 pt-32">
                    {["Ownership", "Liability", "Min Capital", "Tax Rate", "Govt Tenders", "Activities", "Setup Time"].map((row, i) => (
                      <div key={i} className="h-16 flex items-center text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                         {row}
                      </div>
                    ))}
                 </div>

                 {/* LLC */}
                 <div className="relative group">
                    <div className="absolute -top-6 left-0 right-0 h-2 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: BRAND.colors.accent }}></div>
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 h-full transition-all flex flex-col hover:border-[rgba(0,108,53,0.3)]">
                       <div className="text-center mb-8">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${BRAND.colors.accent}1A`, color: BRAND.colors.accent }}>
                             <Building size={32} />
                          </div>
                          <h3 className="text-xl font-black" style={{ color: BRAND.colors.primary }}>LLC (MISA)</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Most Popular</p>
                       </div>
                       
                       <div className="space-y-6 flex-1">
                          <div className="h-16 flex items-center justify-center border-b border-slate-50 font-bold" style={{ color: BRAND.colors.primary }}>100% Foreign</div>
                          <div className="h-16 flex items-center justify-center border-b border-slate-50 font-bold" style={{ color: BRAND.colors.primary }}>Limited</div>
                          <div className="h-16 flex items-center justify-center border-b border-slate-50 font-bold text-slate-500">None*</div>
                          <div className="h-16 flex items-center justify-center border-b border-slate-50 font-bold" style={{ color: BRAND.colors.primary }}>20% Profit Tax</div>
                          <div className="h-16 flex items-center justify-center border-b border-slate-50">
                             <Check style={{ color: BRAND.colors.accent }} />
                          </div>
                          <div className="h-16 flex items-center justify-center border-b border-slate-50 font-bold text-sm text-center">All Commercial</div>
                          <div className="h-16 flex items-center justify-center font-bold" style={{ color: BRAND.colors.accent }}>2-4 Weeks</div>
                       </div>
                    </div>
                 </div>

                 {/* Branch */}
                 <div className="relative group">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full hover:shadow-lg transition-all flex flex-col opacity-80 hover:opacity-100">
                       <div className="text-center mb-8">
                          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-500">
                             <Briefcase size={32} />
                          </div>
                          <h3 className="text-xl font-black" style={{ color: BRAND.colors.primary }}>Branch Office</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Project Based</p>
                       </div>
                       
                       <div className="space-y-6 flex-1">
                          <div className="h-16 flex items-center justify-center border-b border-slate-50 font-bold" style={{ color: BRAND.colors.primary }}>Parent Co.</div>
                          <div className="h-16 flex items-center justify-center border-b border-slate-50 font-bold" style={{ color: BRAND.colors.alert }}>Unlimited</div>
                          <div className="h-16 flex items-center justify-center border-b border-slate-50 font-bold text-slate-500">None</div>
                          <div className="h-16 flex items-center justify-center border-b border-slate-50 font-bold" style={{ color: BRAND.colors.primary }}>20% Profit Tax</div>
                          <div className="h-16 flex items-center justify-center border-b border-slate-50">
                             <Check style={{ color: BRAND.colors.accent }} />
                          </div>
                          <div className="h-16 flex items-center justify-center border-b border-slate-50 font-bold text-sm text-center">Same as Parent</div>
                          <div className="h-16 flex items-center justify-center font-bold text-slate-500">3-5 Weeks</div>
                       </div>
                    </div>
                 </div>

                 {/* RHQ */}
                 <div className="relative group">
                    <div className="absolute -top-6 left-0 right-0 h-2 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                    <div className="rounded-3xl p-6 shadow-2xl h-full flex flex-col transform scale-105 z-10" style={{ backgroundColor: BRAND.colors.primary, borderColor: BRAND.colors.secondary, borderWidth: '1px' }}>
                       <div className="text-center mb-8">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#051C2C]" style={{ backgroundColor: BRAND.colors.secondary }}>
                             <Globe size={32} />
                          </div>
                          <h3 className="text-xl font-black text-white">RHQ Program</h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: BRAND.colors.secondary }}>Vision 2030 VIP</p>
                       </div>
                       
                       <div className="space-y-6 flex-1 text-white">
                          <div className="h-16 flex items-center justify-center border-b border-white/5 font-bold">100% Foreign</div>
                          <div className="h-16 flex items-center justify-center border-b border-white/5 font-bold text-slate-400">Limited</div>
                          <div className="h-16 flex items-center justify-center border-b border-white/5 font-bold text-slate-400">None</div>
                          <div className="h-16 flex items-center justify-center border-b border-white/5 font-black text-lg" style={{ color: BRAND.colors.secondary }}>0% Tax (30 Yrs)</div>
                          <div className="h-16 flex items-center justify-center border-b border-white/5">
                             <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${BRAND.colors.secondary}1A`, color: BRAND.colors.secondary }}>
                                <Check size={12} /> Exclusive Access
                             </div>
                          </div>
                          <div className="h-16 flex items-center justify-center border-b border-white/5 font-bold text-sm text-center">Management Only</div>
                          <div className="h-16 flex items-center justify-center font-bold" style={{ color: BRAND.colors.accent }}>VIP Fast-Track</div>
                       </div>
                    </div>
                 </div>

              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EntityComparator;
