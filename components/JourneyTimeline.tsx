
import React, { useState } from 'react';
import { FileText, Building2, UserCheck, CreditCard, Flag, ArrowRight } from 'lucide-react';
import { BRAND } from '../constants';

const STEPS = [
  {
    day: "Day 1-2",
    title: "Strategic Alignment",
    icon: <FileText size={20} />,
    desc: "We analyze your business model to select the precise ISIC-4 activity codes, ensuring 100% foreign ownership eligibility.",
    status: "Preparation"
  },
  {
    day: "Day 3-5",
    title: "MISA Licensing",
    icon: <Building2 size={20} />,
    desc: "Submission of the 'Business Innovation Plan' and financial data to the Ministry of Investment. License issuance typically within 24 hours of approval.",
    status: "Milestone"
  },
  {
    day: "Day 6-8",
    title: "Commercial Registration",
    icon: <UserCheck size={20} />,
    desc: "Trade name reservation and Commercial Registration (CR) issuance via Ministry of Commerce. Chamber of Commerce membership activation.",
    status: "Legal Identity"
  },
  {
    day: "Day 9-14",
    title: "Government Integration",
    icon: <Building2 size={20} />,
    desc: "Opening files with ZATCA (Tax), Ministry of Labor (Qiwa), and GOSI (Social Insurance). National Address registration.",
    status: "Compliance"
  },
  {
    day: "Day 15-25",
    title: "Banking & GM Visa",
    icon: <CreditCard size={20} />,
    desc: "Corporate bank account opening (KYC/UBO). Issuance of Investor Visa/Iqama for the General Manager.",
    status: "Operational"
  },
  {
    day: "Day 30+",
    title: "Launch & Hiring",
    icon: <Flag size={20} />,
    desc: "Office lease finalization, employee visa quota allocation, and start of commercial operations.",
    status: "Live"
  }
];

const JourneyTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.accent }}>Execution Roadmap</span>
           <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: BRAND.colors.primary }}>
              From Concept to <br/> Commercial Reality
           </h2>
           <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
             A transparent view of the setup lifecycle. While timelines vary by entity type, our fast-track protocols typically achieve operational readiness in under 30 days.
           </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
           {/* Connecting Line */}
           <div className="absolute top-12 left-0 w-full h-1 bg-slate-100 rounded-full"></div>
           <div 
             className="absolute top-12 left-0 h-1 rounded-full transition-all duration-700 ease-out"
             style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%`, backgroundColor: BRAND.colors.secondary }}
           ></div>

           <div className="grid grid-cols-6 gap-4 relative z-10">
              {STEPS.map((step, idx) => (
                <div 
                  key={idx} 
                  className="group cursor-pointer"
                  onMouseEnter={() => setActiveStep(idx)}
                >
                   <div className="flex flex-col items-center">
                      <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-300 bg-white mb-6 ${
                        idx <= activeStep 
                        ? 'shadow-xl scale-110' 
                        : 'border-slate-100 text-slate-300'
                      }`}
                      style={{ 
                          borderColor: idx <= activeStep ? BRAND.colors.secondary : '#e2e8f0',
                          color: idx <= activeStep ? BRAND.colors.primary : '#cbd5e1'
                      }}>
                         {step.icon}
                      </div>
                      
                      <div className={`text-center transition-opacity duration-300 ${idx === activeStep ? 'opacity-100' : 'opacity-50'}`}>
                         <span className={`text-[10px] font-black uppercase tracking-widest block mb-1`} style={{ color: idx <= activeStep ? BRAND.colors.accent : '#94a3b8' }}>
                           {step.day}
                         </span>
                         <h4 className="font-bold text-sm leading-tight px-2" style={{ color: BRAND.colors.primary }}>{step.title}</h4>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {/* Detailed Card for Active Step */}
           <div className="mt-12 bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100 relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10" style={{ backgroundColor: BRAND.colors.secondary }}></div>
              
              <div className="relative z-10 flex gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-300 key={activeStep}">
                 <div className="hidden md:flex flex-col items-center justify-center w-32 h-32 bg-white rounded-3xl shadow-sm border border-slate-100 shrink-0">
                    <span className="text-3xl font-black" style={{ color: BRAND.colors.primary }}>{activeStep + 1}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Step</span>
                 </div>
                 
                 <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest" style={{ backgroundColor: BRAND.colors.accent }}>
                          {STEPS[activeStep].status}
                       </span>
                       <span className="font-black uppercase text-xs tracking-widest" style={{ color: BRAND.colors.secondary }}>
                          {STEPS[activeStep].day}
                       </span>
                    </div>
                    <h3 className="text-3xl font-black mb-4" style={{ color: BRAND.colors.primary }}>{STEPS[activeStep].title}</h3>
                    <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                       {STEPS[activeStep].desc}
                    </p>
                 </div>

                 <div className="hidden md:block">
                    <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center animate-pulse" style={{ borderColor: BRAND.colors.secondary }}>
                       <ArrowRight style={{ color: BRAND.colors.secondary }} />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-8 relative">
           <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100"></div>
           
           {STEPS.map((step, idx) => (
             <div key={idx} className="relative pl-16">
                <div className={`absolute left-0 w-12 h-12 rounded-full border-2 flex items-center justify-center bg-white z-10 ${
                   idx === activeStep ? 'shadow-lg' : 'border-slate-200 text-slate-300'
                }`}
                style={{ 
                    borderColor: idx === activeStep ? BRAND.colors.secondary : '#e2e8f0',
                    color: idx === activeStep ? BRAND.colors.primary : '#cbd5e1'
                }}>
                   {step.icon}
                </div>
                <div 
                  className={`bg-slate-50 p-6 rounded-2xl border transition-all ${
                    idx === activeStep ? 'shadow-md' : 'border-slate-100'
                  }`}
                  style={{ borderColor: idx === activeStep ? BRAND.colors.secondary : '#e2e8f0' }}
                  onClick={() => setActiveStep(idx)}
                >
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold" style={{ color: BRAND.colors.primary }}>{step.title}</h4>
                      <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: BRAND.colors.accent }}>{step.day}</span>
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default JourneyTimeline;
