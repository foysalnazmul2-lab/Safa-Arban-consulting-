
import React, { useEffect, useState, useRef } from 'react';
import { CorePageContent } from '../types';
import { ArrowLeft, CheckCircle2, ShieldCheck, Check, Info, Clock, Zap, Layers, FileCheck, XCircle, AlertCircle, Globe, FileText, X } from 'lucide-react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
        if (scrollRef.current) {
            setScrollY(scrollRef.current.scrollTop);
        }
    };
    
    const div = scrollRef.current;
    if (div) div.addEventListener('scroll', handleScroll);
    
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Nudge user after 8 seconds if they haven't added to cart
    const timer = setTimeout(() => {
      if (!isActionActive) setPulseCta(true);
    }, 8000);

    return () => {
      if (div) div.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
    };
  }, [isActionActive]);

  // Dynamic roadmap logic based on content
  const roadmapSteps = content.details && content.details.length > 0 
    ? content.details.map((detail, idx) => ({ 
        title: `Phase ${idx + 1}`, 
        desc: detail 
      }))
    : [
        { title: "Compliance Audit", desc: "Initial verification of your documents against ISIC-4 regulations." },
        { title: "Portal Submission", desc: "Drafting and uploading the application to the relevant ministry (MISA/MC)." },
        { title: "Government Liaison", desc: "Our PROs handle any queries or objections directly with officials." },
        { title: "License Issuance", desc: "Digital handover of your official certificates and QR codes." }
      ];

  // Requirements fallback
  const requirements = content.requirements && content.requirements.length > 0 
    ? content.requirements 
    : [
        "Copy of Parent Company CR / Passport",
        "Audited Financial Statements (Last 1 Year)",
        "Power of Attorney (PoA) - Draft Provided"
      ];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#051C2C]/80 backdrop-blur-md transition-opacity" onClick={onBack} />
      
      {/* Modal Container */}
      <div className="bg-[#F8F9FA] w-full max-w-6xl h-full md:max-h-[90vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/10">
        
        {/* Close Button */}
        <button 
            onClick={onBack}
            className="absolute top-6 right-6 z-50 p-3 bg-white/20 hover:bg-white text-white hover:text-[#051C2C] rounded-full backdrop-blur-md transition-all shadow-lg border border-white/10"
        >
            <X size={24} />
        </button>

        {/* Scrollable Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar relative">
            
            {/* Header */}
            <div className="relative h-[400px] overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
                <div 
                className="absolute inset-0 w-full h-[120%] object-cover opacity-40 mix-blend-overlay"
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                >
                <img src={content.heroImage} alt={content.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[3000ms]" />
                </div>
                
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #F8F9FA, transparent, ${BRAND.colors.primary}80)` }}></div>
                
                <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-8 md:px-12">
                    <div className="flex items-center gap-3 mb-4 animate-in slide-in-from-left-4 fade-in duration-700">
                        <span className="text-[#0A1A2F] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.4)]" style={{ backgroundColor: BRAND.colors.secondary }}>
                            {content.subtitle}
                        </span>
                        <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <ShieldCheck size={12} style={{ color: BRAND.colors.accent }} /> Verified Service
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter leading-none animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100 drop-shadow-2xl">
                        {content.title}
                    </h1>
                </div>
            </div>

            {/* Content Body */}
            <div className="px-6 md:px-12 py-12">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Column: Content */}
                <div className="lg:col-span-8 space-y-12">
                    
                    {/* 1. Full Description */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 animate-in slide-in-from-bottom-12 duration-700 delay-300">
                        <div className="flex items-center gap-3 mb-6">
                            <Info size={24} style={{ color: BRAND.colors.secondary }} />
                            <h2 className="text-2xl font-black tracking-tight" style={{ color: BRAND.colors.primary }}>Strategic Overview</h2>
                        </div>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            {content.overview}
                        </p>
                    </div>

                    {/* 2. Process Roadmap */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <Layers size={24} style={{ color: BRAND.colors.accent }} />
                            <h2 className="text-2xl font-black tracking-tight" style={{ color: BRAND.colors.primary }}>Scope of Work</h2>
                        </div>
                        
                        <div className="relative pl-8 border-l-2 border-slate-100 space-y-8">
                            {roadmapSteps.map((step, idx) => (
                                <div key={idx} className="relative group">
                                    <div className="absolute -left-[41px] top-0 w-10 h-10 rounded-xl bg-white border-2 border-slate-100 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-[#051C2C] group-hover:text-white group-hover:border-[#051C2C] transition-all shadow-sm">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest mb-1 transition-colors" style={{ color: BRAND.colors.secondary }}>{step.title}</h4>
                                        <p className="text-base text-slate-700 font-bold leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. Requirements & Inclusions Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl" style={{ backgroundColor: BRAND.colors.primary }}>
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-10" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: BRAND.colors.secondary }}>
                                <FileCheck size={16} /> Requirements
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

                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: BRAND.colors.accent }}>
                                <CheckCircle2 size={16} /> What's Included
                            </h3>
                            <ul className="space-y-4">
                                {content.features.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm font-bold" style={{ color: BRAND.colors.primary }}>
                                        <Check size={16} className="mt-0.5 shrink-0" style={{ color: BRAND.colors.accent }} />
                                        <div>
                                            <span>{feat.title}</span>
                                            <p className="text-[10px] text-slate-400 font-normal mt-0.5">{feat.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 4. Exclusions */}
                    {content.exclusions && content.exclusions.length > 0 && (
                        <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-200">
                            <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-slate-500">
                                <AlertCircle size={16} className="text-slate-400" /> Exclusions & Client Responsibility
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {content.exclusions.map((exc, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 text-sm font-medium text-slate-600 shadow-sm">
                                        <XCircle size={16} className="shrink-0 text-red-400" />
                                        {exc}
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-6 text-center">
                                * Government fees are payable at actuals directly to the relevant authority via SADAD.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Column: Sticky Action Card */}
                <div className="lg:col-span-4 lg:sticky lg:top-8 animate-in slide-in-from-right-8 duration-700 delay-500">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden" style={{ boxShadow: `0 25px 50px -12px ${BRAND.colors.primary}1A` }}>
                        <div className="p-8 text-white text-center relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <p className="text-[10px] font-black uppercase tracking-widest mb-2 relative z-10" style={{ color: BRAND.colors.secondary }}>Implementation</p>
                            <h3 className="text-2xl font-black tracking-tight relative z-10">Deploy Service</h3>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="space-y-5">
                                {[
                                    { icon: Globe, label: "Remote Processing", val: "Available" },
                                    { icon: Clock, label: "Est. Turnaround", val: "2-5 Days" },
                                    { icon: FileText, label: "Documentation", val: "Digital" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                                            <item.icon size={18} style={{ color: BRAND.colors.secondary }} /> 
                                            <span>{item.label}</span>
                                        </div>
                                        <span className="text-xs font-black px-2 py-1 rounded bg-slate-100" style={{ color: BRAND.colors.primary }}>{item.val}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-slate-100"></div>

                            <div>
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
                </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
