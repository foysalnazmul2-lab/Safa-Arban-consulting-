
import React from 'react';
import { CorePageContent } from '../types';
import { ArrowLeft, CheckCircle2, ArrowRight, ShieldCheck, Check } from 'lucide-react';

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
  actionLabel = "Calculate Fees Now", 
  onAction,
  isActionActive = false
}) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={content.heroImage} 
          alt={content.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A1A2F]/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <button 
            onClick={onBack}
            className="absolute top-8 left-6 md:left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Services
          </button>
          
          <span className="text-[#C9A86A] font-black uppercase tracking-[0.3em] text-xs mb-4 block animate-in slide-in-from-bottom-4 fade-in duration-700">
            {content.subtitle}
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100 max-w-4xl">
            {content.title}
          </h1>
          <button 
            onClick={onAction}
            className={`w-fit px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200 ${
              isActionActive 
              ? 'bg-[#006C35] text-white hover:bg-[#005a2c]' 
              : 'bg-[#E9443E] text-white hover:bg-white hover:text-[#0A1A2F]'
            }`}
          >
            {isActionActive ? (
              <><Check size={16} /> Added to Quote</>
            ) : (
              <>{actionLabel} <ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Overview */}
          <div>
            <h2 className="text-3xl font-black text-[#0A1A2F] mb-8">Strategic Overview</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium mb-12">
              {content.overview}
            </p>
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <div className="flex items-start gap-4">
                 <ShieldCheck size={32} className="text-[#006C35] shrink-0" />
                 <div>
                    <h4 className="font-black text-[#0A1A2F] text-lg mb-2">SafaArban Guarantee</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                       We handle all regulatory liaisons directly. Our PROs are certified by government ministries to act on your behalf, ensuring zero rejection risk due to technical errors.
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-8">
            {content.features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl shadow-lg border border-slate-50 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-[#0A1A2F]/5 rounded-xl flex items-center justify-center mb-6 text-[#0A1A2F]">
                   <CheckCircle2 size={24} />
                </div>
                <h3 className="font-black text-[#0A1A2F] mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#0A1A2F] py-20 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">Ready to Proceed?</h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
               Start your application today. Add this service to your quotation and get a detailed cost breakdown instantly.
            </p>
            <button 
              onClick={onAction}
              className={`px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all shadow-2xl scale-100 hover:scale-105 ${
                isActionActive 
                ? 'bg-[#006C35] text-white hover:bg-[#005a2c]' 
                : 'bg-[#C9A86A] text-[#0A1A2F] hover:bg-white'
              }`}
            >
               {isActionActive ? 'Service Selected' : actionLabel}
            </button>
         </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
