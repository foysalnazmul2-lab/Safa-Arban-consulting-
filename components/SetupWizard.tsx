
import React, { useState } from 'react';
import { 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Briefcase, 
  Building, 
  Zap,
  RefreshCw,
  Layers
} from 'lucide-react';
import { SERVICES_DB, BRAND } from '../constants';

interface SetupWizardProps {
  onAddBundle: (ids: string[]) => void;
}

const STEPS = [
  {
    id: 1,
    question: "Origin of Investment",
    options: [
      { id: 'foreign', label: 'International / 100% Foreign', icon: <Globe size={20} /> },
      { id: 'gcc', label: 'GCC National', icon: <Building size={20} /> },
      { id: 'mixed', label: 'Joint Venture (Saudi Partner)', icon: <Briefcase size={20} /> }
    ]
  },
  {
    id: 2,
    question: "Primary Activity",
    options: [
      { id: 'tech', label: 'Tech / Consulting / Services', icon: <Cpu size={20} /> },
      { id: 'trade', label: 'Trading / Retail / E-commerce', icon: <Layers size={20} /> },
      { id: 'industrial', label: 'Manufacturing / Industry', icon: <Building size={20} /> }
    ]
  },
  {
    id: 3,
    question: "Scale & Timeline",
    options: [
      { id: 'fast', label: 'Immediate Launch (Fast-Track)', icon: <Zap size={20} /> },
      { id: 'standard', label: 'Standard Setup (30 Days)', icon: <CheckCircle2 size={20} /> }
    ]
  }
];

const BUNDLES: Record<string, string[]> = {
  'foreign-tech-fast': ['misa-license', 'commercial-registration', 'investor-visa', 'virtual-office', 'supp-03'], // Tech Pack
  'foreign-trade-fast': ['misa-license', 'commercial-registration', 'sec-08', 'supp-06'], // E-com Pack
  'industrial': ['sec-01', 'misa-license', 'commercial-registration', 'comp-10'], // Industrial Pack
  'default': ['misa-license', 'commercial-registration']
};

const SetupWizard: React.FC<SetupWizardProps> = ({ onAddBundle }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleOption = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [step]: optionId }));
    if (step < 2) {
      setStep(prev => prev + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResult(true);
      }, 2000);
    }
  };

  const getBundleIds = () => {
    // Simple logic to map answers to bundles
    if (answers[1] === 'industrial') return BUNDLES['industrial'];
    if (answers[0] === 'foreign' && answers[1] === 'tech') return BUNDLES['foreign-tech-fast'];
    if (answers[0] === 'foreign' && answers[1] === 'trade') return BUNDLES['foreign-trade-fast'];
    return BUNDLES['default'];
  };

  const recommendedIds = getBundleIds();
  const recommendedServices = SERVICES_DB.filter(s => recommendedIds.includes(s.id));
  const totalValue = recommendedServices.reduce((acc, curr) => acc + curr.professionalFee, 0);

  const reset = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div className="text-white py-24 relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.accent }}></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
           <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4 flex items-center justify-center gap-2" style={{ color: BRAND.colors.secondary }}>
              <Cpu size={14} /> AI Structure Architect
           </span>
           <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              {showResult ? "Your Venture Blueprint" : "Build Your Saudi Entry Strategy"}
           </h2>
           {!showResult && (
             <p className="text-slate-400 text-sm max-w-xl mx-auto">
               Answer 3 strategic questions to generate a compliant, optimized setup roadmap tailored to your investment profile.
             </p>
           )}
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          
          {isAnalyzing ? (
            <div className="text-center space-y-6">
               <div className="w-20 h-20 mx-auto relative">
                  <div className="absolute inset-0 border-4 border-t-transparent rounded-full animate-ping" style={{ borderColor: `${BRAND.colors.secondary}4D` }}></div>
                  <div className="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: BRAND.colors.secondary, borderTopColor: 'transparent' }}></div>
                  <Cpu className="absolute inset-0 m-auto" size={32} style={{ color: BRAND.colors.secondary }} />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-white mb-2">Analyzing Regulatory Path...</h3>
                  <p className="text-slate-400 text-xs uppercase tracking-widest">Checking ISIC Codes • verifying MISA Eligibility</p>
               </div>
            </div>
          ) : showResult ? (
            <div className="animate-in slide-in-from-bottom-8 duration-700">
               <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                  <div className="flex-1 space-y-6">
                     <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border"
                          style={{ backgroundColor: `${BRAND.colors.accent}33`, borderColor: BRAND.colors.accent, color: BRAND.colors.accent }}>
                        Recommended Structure
                     </div>
                     <h3 className="text-3xl font-black text-white">
                        {answers[1] === 'tech' ? 'Regional Tech HQ Setup' : answers[1] === 'industrial' ? 'Industrial Manufacturing License' : 'Commercial Trading Entity'}
                     </h3>
                     <p className="text-slate-400 text-sm leading-relaxed">
                        Based on your profile, we have compiled the mandatory government clearances and operational modules required for a fully compliant launch.
                     </p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center min-w-[200px]">
                     <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Estimated Budget</p>
                     <p className="text-3xl font-mono font-black" style={{ color: BRAND.colors.secondary }}>{totalValue.toLocaleString()}</p>
                     <p className="text-[10px] text-slate-400 font-bold">SAR (Professional Fees)</p>
                  </div>
               </div>

               <div className="space-y-3 mb-10">
                  {recommendedServices.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                       <CheckCircle2 size={18} className="shrink-0" style={{ color: BRAND.colors.secondary }} />
                       <span className="text-sm font-bold text-white">{service.name}</span>
                    </div>
                  ))}
               </div>

               <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => onAddBundle(recommendedIds)}
                    className="flex-1 text-[#0A1A2F] py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2"
                    style={{ backgroundColor: BRAND.colors.secondary }}
                  >
                    <Layers size={16} /> Deploy This Blueprint
                  </button>
                  <button 
                    onClick={reset}
                    className="px-6 py-4 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 font-bold text-xs flex items-center gap-2"
                  >
                    <RefreshCw size={14} /> Reset
                  </button>
               </div>
            </div>
          ) : (
            <div>
               {/* Progress Bar */}
               <div className="flex gap-2 mb-10">
                  {STEPS.map((s, idx) => (
                    <div key={idx} className={`h-1.5 flex-1 rounded-full transition-all duration-500`} style={{ backgroundColor: idx <= step ? BRAND.colors.secondary : 'rgba(255,255,255,0.1)' }}></div>
                  ))}
               </div>

               <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 key={step}">
                  <h3 className="text-2xl md:text-3xl font-black text-white text-center">
                    {STEPS[step].question}
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                     {STEPS[step].options.map((option) => (
                       <button
                         key={option.id}
                         onClick={() => handleOption(option.id)}
                         className="bg-white/5 hover:bg-white/10 border border-white/10 p-6 rounded-2xl transition-all group text-left flex flex-col gap-4 h-full"
                         style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                         onMouseOver={(e) => e.currentTarget.style.borderColor = BRAND.colors.secondary}
                         onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                       >
                          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-[#0A1A2F] group-hover:bg-[#C9A86A] transition-colors">
                             {option.icon}
                          </div>
                          <span className="font-bold text-sm text-slate-200 group-hover:text-white">{option.label}</span>
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
