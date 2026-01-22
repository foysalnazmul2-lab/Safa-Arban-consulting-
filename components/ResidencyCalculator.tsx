
import React, { useState, useEffect } from 'react';
import { Crown, CheckCircle, Calculator, Info } from 'lucide-react';
import { BRAND } from '../constants';

const ResidencyCalculator: React.FC = () => {
  // State for inputs
  const [age, setAge] = useState(35);
  const [degree, setDegree] = useState<'bachelor' | 'master' | 'phd'>('master');
  const [experience, setExperience] = useState(10);
  const [salary, setSalary] = useState(40000); // SAR
  const [points, setPoints] = useState(0);
  const [isEligible, setIsEligible] = useState(false);

  // Calculation Logic (Simplified based on actual Special Talent criteria)
  useEffect(() => {
    let score = 0;

    // Age
    if (age >= 21 && age <= 29) score += 15;
    else if (age >= 30 && age <= 39) score += 10;
    else if (age >= 40 && age <= 50) score += 5;

    // Education
    if (degree === 'phd') score += 30;
    else if (degree === 'master') score += 20;
    else if (degree === 'bachelor') score += 10;

    // Experience
    if (experience >= 15) score += 25;
    else if (experience >= 10) score += 15;
    else if (experience >= 5) score += 5;

    // Financial Solvency / Salary
    if (salary >= 80000) score += 20;
    else if (salary >= 40000) score += 10;

    // Bonus for top uni (simulated)
    score += 10; 

    setPoints(score);
    setIsEligible(score >= 60); // Threshold
  }, [age, degree, experience, salary]);

  return (
    <div className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Content Side */}
        <div className="order-2 lg:order-1">
           <span className="text-[#006C35] font-black uppercase tracking-[0.3em] text-[10px] block mb-4 flex items-center gap-2">
              <Crown size={14} /> Golden Visa Eligibility
           </span>
           <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ color: BRAND.colors.primary }}>
              Saudi Premium <br/> Residency.
           </h2>
           <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
              The "Special Talent" residency track offers long-term stability for executives and experts. Use our proprietary engine to assess your eligibility score instantly.
           </p>
           
           <div className="space-y-6">
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-[#006C35]/10 rounded-xl flex items-center justify-center text-[#006C35] shrink-0">
                    <CheckCircle size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold" style={{ color: BRAND.colors.primary }}>Family Sponsorship</h4>
                    <p className="text-sm text-slate-500">Sponsor parents, spouses, and children without age limits.</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-[#006C35]/10 rounded-xl flex items-center justify-center text-[#006C35] shrink-0">
                    <CheckCircle size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold" style={{ color: BRAND.colors.primary }}>Property Ownership</h4>
                    <p className="text-sm text-slate-500">Right to own residential, commercial, and industrial real estate.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Calculator Side */}
        <div className="order-1 lg:order-2 rounded-[3rem] p-8 md:p-12 text-white relative shadow-2xl border" style={{ backgroundColor: BRAND.colors.primary, borderColor: `${BRAND.colors.secondary}33` }}>
           <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
           
           <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-center border-b border-white/10 pb-6">
                 <div className="flex items-center gap-3">
                    <Calculator style={{ color: BRAND.colors.secondary }} />
                    <span className="font-black uppercase tracking-widest text-xs">Points Engine</span>
                 </div>
                 <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${isEligible ? 'bg-[#006C35] text-white' : 'bg-white/10 text-slate-400'}`}>
                    {isEligible ? <CheckCircle size={12} /> : <Info size={12} />}
                    {isEligible ? 'Eligible' : 'Check Requirements'}
                 </div>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2 text-slate-400">
                       <span>Age</span>
                       <span className="text-white">{age} Years</span>
                    </div>
                    <input type="range" min="21" max="60" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" style={{ accentColor: BRAND.colors.secondary }} />
                 </div>

                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2 text-slate-400">
                       <span>Experience</span>
                       <span className="text-white">{experience} Years</span>
                    </div>
                    <input type="range" min="0" max="30" value={experience} onChange={(e) => setExperience(Number(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" style={{ accentColor: BRAND.colors.secondary }} />
                 </div>

                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2 text-slate-400">
                       <span>Monthly Salary (SAR)</span>
                       <span className="text-white">{salary.toLocaleString()}</span>
                    </div>
                    <input type="range" min="10000" max="100000" step="1000" value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" style={{ accentColor: BRAND.colors.secondary }} />
                 </div>

                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2 text-slate-400">
                       <span>Education Level</span>
                    </div>
                    <div className="flex gap-2">
                       {['bachelor', 'master', 'phd'].map((d) => (
                          <button 
                            key={d}
                            onClick={() => setDegree(d as any)}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                              degree === d ? 'text-[#0A1A2F]' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                            }`}
                            style={{ backgroundColor: degree === d ? BRAND.colors.secondary : undefined }}
                          >
                             {d}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Result Area */}
              <div className="bg-black/20 rounded-2xl p-6 flex items-center justify-between border border-white/5 mt-8">
                 <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Score</p>
                    <p className="text-4xl font-black text-white">{points} <span className="text-sm text-slate-500">/ 100</span></p>
                 </div>
                 {isEligible ? (
                    <button className="bg-[#006C35] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#005a2c] transition-all">
                       Start Application
                    </button>
                 ) : (
                    <button className="bg-white/10 text-slate-300 px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">
                       Contact Advisor
                    </button>
                 )}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ResidencyCalculator;
