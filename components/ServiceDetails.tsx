
import React, { useEffect, useState } from 'react';
import { CorePageContent } from '../types';
import { ArrowLeft, CheckCircle2, ArrowRight, ShieldCheck, Check, Info, FileText, Globe, Clock, Zap, Layers, FileCheck, Landmark, XCircle } from 'lucide-react';
import { BRAND } from '../constants';

interface ServiceDetailsProps {
  content: CorePageContent;
  onBack: () => void;
  actionLabel?: string;
  onAction?: () => void;
  isActionActive?: boolean;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ 
  content, 
  onBack, 
  actionLabel = "Add to Quotation", 
  onAction,
  isActionActive = false
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [pulseCta, setPulseCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Nudge user after 8 seconds if they haven't added to cart
    const timer = setTimeout(() => {
      if (!isActionActive) setPulseCta(true);
    }, 8000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isActionActive]);

  // Use dynamic details if available, otherwise use a fallback structure or hide the section if appropriate.
  // For the roadmap visualization, we will prioritize content.details if it exists.
  const roadmapSteps = content.details && content.details.length > 0 
    ? content.details.map((detail, idx) => ({ 
        title: `Step ${idx + 1}`, 
        desc: detail 
      }))
    : [
        { title: "Compliance Audit", desc: "Initial verification of your documents against ISIC-4 regulations." },
        { title: "Portal Submission", desc: "Drafting and uploading the application to the relevant ministry (MISA/MC)." },
        { title: "Government Liaison", desc: "Our PROs handle any queries or objections directly with officials." },
        { title: "License Issuance", desc: "Digital handover of your official certificates and QR codes." }
      ];

  // Requirements: Use specific data if available, else a generic placeholder if absolutely necessary (or just generic)
  const requirements = content.requirements && content.requirements.length > 0 
    ? content.requirements 
    : [
        "Copy of Parent Company CR / Passport",
        "Audited Financial Statements (Last 1 Year)",
        "Power of Attorney (PoA) - Draft Provided"
      ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans">
      
      {/* Immersive Parallax Header */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
        <div 
          className="absolute inset-0 w-full h-[120%] object-cover opacity-40 mix-blend-overlay"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
           <img src={content.heroImage} alt={content.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[3000ms]" />
        </div>
        
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #F8F9FA, transparent, ${BRAND.colors.primary}80)` }}></div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${BRAND.colors.primary}E6, ${BRAND.colors.primary}66, transparent)` }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pb-20">
          <button 
            onClick={onBack}
            className="absolute top-8 left-6 md:left-0 flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest bg-black/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 hover:bg-black/50"
          >
            <ArrowLeft size={14} /> Back to Catalog
          </button>
          
          <div className="mt-auto max-w-4xl">
            <div className="flex items-center gap-3 mb-6 animate-in slide-in-from-left-4 fade-in duration-700">
               <span className="text-[#0A1A2F] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.4)]" style={{ backgroundColor: BRAND.colors.secondary }}>
                  {content.subtitle}
               </span>
               <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck size={12} style={{ color: BRAND.colors.accent }} /> Verified Service
               </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-none animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100 drop-shadow-2xl">
              {content.title}
            </h1>
            
            <div className="flex gap-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
               <div className="h-1 w-24" style={{ backgroundColor: BRAND.colors.alert }}></div>
               <div className="h-1 w-12" style={{ backgroundColor: BRAND.colors.secondary }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-24 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-8 space-y-12">
             
             {/* Overview Card */}
             <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-12 duration-700 delay-300">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-3 rounded-2xl" style={{ backgroundColor: BRAND.colors.primary, color: BRAND.colors.secondary }}>
                      <Info size={24} />
                   </div>
                   <h2 className="text-2xl font-black tracking-tight" style={{ color: BRAND.colors.primary }}>Strategic Overview</h2>
                </div>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  {content.overview}
                </p>
             </div>

             {/* Scope / Roadmap */}
             <div className="bg-white rounded-[3rem] p-8 md:p-14 border border-slate-100 shadow-lg">
                <div className="flex items-center gap-3 mb-10">
                   <div className="p-3 rounded-2xl" style={{ backgroundColor: `${BRAND.colors.accent}1A`, color: BRAND.colors.accent }}>
                      <Layers size={24} />
                   </div>
                   <h2 className="text-2xl font-black tracking-tight" style={{ color: BRAND.colors.primary }}>Scope of Work</h2>
                </div>
                
                <div className="relative">
                   {/* Vertical Line */}
                   <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100"></div>
                   
                   <div className="space-y-8 relative z-10">
                      {roadmapSteps.map((step, idx) => (
                        <div key={idx} className="flex gap-6 group">
                           <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-sm font-black text-slate-400 group-hover:text-[#0A1A2F] transition-all shrink-0 shadow-sm"
                                style={{ borderColor: 'transparent' }}
                                onMouseOver={(e) => { e.currentTarget.style.borderColor = BRAND.colors.secondary; e.currentTarget.style.backgroundColor = BRAND.colors.secondary; }}
                                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.backgroundColor = 'white'; }}
                           >
                              {idx + 1}
                           </div>
                           <div className="pt-2">
                              {/* If content.details is used, we might not have 'title' distinct from desc, so we can make desc primary */}
                              {content.details ? (
                                <p className="text-base text-slate-700 font-bold leading-relaxed">{step.desc}</p>
                              ) : (
                                <>
                                  <h4 className="text-lg font-bold mb-1 transition-colors" style={{ color: BRAND.colors.primary }}>{step.title}</h4>
                                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                                </>
                              )}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Requirements & Inclusions Grid */}
             <div className="grid md:grid-cols-2 gap-8">
                {/* Requirements */}
                <div className="rounded-[2.5rem] p-8 text-white relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
                   <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-10" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                   <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: BRAND.colors.secondary }}>
                      <FileCheck size={16} /> Required Documents
                   </h3>
                   <ul className="space-y-4">
                      {requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-300">
                           <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                           {req}
                        </li>
                      ))}
                   </ul>
                </div>

                {/* Inclusions */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 flex flex-col h-full">
                   <div>
                     <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: BRAND.colors.accent }}>
                        <CheckCircle2 size={16} /> Included Benefits
                     </h3>
                     <ul className="space-y-4 mb-8">
                        {content.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-bold" style={{ color: BRAND.colors.primary }}>
                             <Check size={16} className="mt-0.5 shrink-0" style={{ color: BRAND.colors.accent }} />
                             {feat.title}
                          </li>
                        ))}
                     </ul>
                   </div>
                   
                   {/* Exclusions */}
                   {content.exclusions && content.exclusions.length > 0 && (
                     <div className="mt-auto pt-6 border-t border-slate-100">
                       <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-slate-400">
                          <XCircle size={12} /> Exclusions
                       </h3>
                       <ul className="space-y-2">
                          {content.exclusions.map((exc, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-500">
                               <span className="text-slate-300">•</span> {exc}
                            </li>
                          ))}
                       </ul>
                     </div>
                   )}
                </div>
             </div>

             {/* Guarantee Strip */}
             <div className="rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl" style={{ background: `linear-gradient(to right, ${BRAND.colors.primary}, #1a3a5f)` }}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 animate-pulse" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                   <div className="w-20 h-20 bg-white/5 backdrop-blur rounded-full flex items-center justify-center shrink-0 border border-white/10">
                      <ShieldCheck size={40} style={{ color: BRAND.colors.secondary }} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black mb-2 flex items-center gap-2">
                         <span style={{ color: BRAND.colors.secondary }}>SafaArban</span> Assurance
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed font-medium">
                         We act as your dedicated liaison. Our PROs are ministry-certified, ensuring technical accuracy and expedited processing for all government filings.
                      </p>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Column: Sticky Action Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 animate-in slide-in-from-right-8 duration-700 delay-500">
             <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300" style={{ boxShadow: `0 25px 50px -12px ${BRAND.colors.primary}1A` }}>
                {/* Header */}
                <div className="p-8 text-white text-center relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                   <p className="text-[10px] font-black uppercase tracking-widest mb-2 relative z-10" style={{ color: BRAND.colors.secondary }}>Implementation</p>
                   <h3 className="text-2xl font-black tracking-tight relative z-10">Deploy Service</h3>
                </div>

                <div className="p-8 space-y-8">
                   {/* Specs */}
                   <div className="space-y-5">
                      {[
                        { icon: Globe, label: "Remote Processing", val: "Available" },
                        { icon: Clock, label: "Est. Turnaround", val: "2-5 Days" },
                        { icon: FileText, label: "Documentation", val: "Digital" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between group">
                           <div className="flex items-center gap-3 text-sm font-bold text-slate-500 hover:text-[#0A1A2F] transition-colors">
                              <item.icon size={18} style={{ color: BRAND.colors.secondary }} /> 
                              <span>{item.label}</span>
                           </div>
                           <span className="text-xs font-black px-2 py-1 rounded bg-slate-100" style={{ color: BRAND.colors.primary }}>{item.val}</span>
                        </div>
                      ))}
                   </div>

                   <div className="h-px bg-slate-100"></div>

                   {/* CTA */}
                   <div>
                      <div className="flex justify-between items-center mb-6">
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span>
                         {isActionActive ? (
                           <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1" style={{ backgroundColor: `${BRAND.colors.accent}1A`, color: BRAND.colors.accent }}>
                              <Check size={12} /> Selected
                           </span>
                         ) : (
                           <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-400">
                              Available
                           </span>
                         )}
                      </div>

                      <button 
                        onClick={onAction}
                        className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl flex items-center justify-center gap-3 relative overflow-hidden ${
                          pulseCta && !isActionActive ? 'animate-pulse' : ''
                        }`}
                        style={{
                            backgroundColor: isActionActive ? BRAND.colors.accent : BRAND.colors.secondary,
                            color: isActionActive ? 'white' : BRAND.colors.primary,
                            boxShadow: isActionActive ? `0 10px 30px -10px ${BRAND.colors.accent}66` : `0 10px 30px -10px ${BRAND.colors.secondary}66`
                        }}
                      >
                        {isActionActive ? (
                          <><CheckCircle2 size={18} /> Added to Quote</>
                        ) : (
                          <><Zap size={18} className={pulseCta ? "animate-bounce" : ""} /> {actionLabel}</>
                        )}
                      </button>
                      
                      <p className="text-[9px] text-center text-slate-400 font-bold mt-4 flex items-center justify-center gap-1">
                         <ShieldCheck size={12} /> Secure SSL • Instant Calculation
                      </p>
                   </div>
                </div>
             </div>

             {/* Support Card */}
             <div className="mt-6 bg-white rounded-[2.5rem] p-6 border border-slate-100 text-center shadow-lg">
                <p className="font-bold text-sm mb-2" style={{ color: BRAND.colors.primary }}>Need Custom Advice?</p>
                <p className="text-slate-500 text-xs mb-4">Our consultants are online.</p>
                <button className="text-xs font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4" style={{ color: BRAND.colors.alert }}>
                   Chat Now
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
