
import React from 'react';
import { Globe, Shield, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Page } from '../types';

interface HeroProps {
  onStart: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative bg-[#0A1A2F] text-white min-h-[95vh] flex flex-col justify-center overflow-hidden">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
          alt="Modern Business Architecture" 
          className="w-full h-full object-cover opacity-20 animate-in fade-in duration-[2000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F] via-[#0A1A2F]/90 to-[#0A1A2F]/70"></div>
        
        {/* Animated Glow Effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#006C35] rounded-full blur-[160px] opacity-10 -translate-y-1/2 translate-x-1/2 animate-pulse [animation-duration:8s]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F06543] rounded-full blur-[140px] opacity-10 translate-y-1/2 -translate-x-1/2 animate-pulse [animation-duration:10s]"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="lg:w-3/5 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
              <Star size={16} className="text-[#C9A86A]" fill="#C9A86A" />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/90">The Elite Investment Gateway</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-8 drop-shadow-2xl">
              Your Gateway <br className="hidden sm:block" />
              to Business <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F06543] to-[#C9A86A]">in Saudi Arabia.</span>
            </h1>
            
            <p className="text-sm md:text-xl lg:text-2xl text-white/70 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Expert guidance for MISA licensing, corporate formation, and government compliance. We navigate the complexities; you lead the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
              <button 
                onClick={() => onStart('services')}
                className="bg-[#F06543] hover:bg-white hover:text-[#0A1A2F] text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-2xl shadow-[#F06543]/20 flex items-center justify-center gap-3 group"
              >
                Start Your Business <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onStart('services')}
                className="bg-transparent border border-white/20 hover:border-white hover:bg-white/5 px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 text-white/80 hover:text-white"
              >
                Explore Services
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 md:mt-20 flex flex-wrap justify-center lg:justify-start gap-3 md:gap-6 opacity-80">
              <div className="flex items-center gap-2 md:gap-3 bg-white/5 px-3 md:px-4 py-2 rounded-full border border-white/5">
                <CheckCircle size={14} className="text-[#006C35] shrink-0" />
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">100% Ownership</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 bg-white/5 px-3 md:px-4 py-2 rounded-full border border-white/5">
                <CheckCircle size={14} className="text-[#006C35] shrink-0" />
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Official Liaison</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 bg-white/5 px-3 md:px-4 py-2 rounded-full border border-white/5">
                <CheckCircle size={14} className="text-[#006C35] shrink-0" />
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Elite Support</span>
              </div>
            </div>
          </div>

          <div className="lg:w-2/5 hidden lg:block relative">
            <div className="relative group perspective-[2000px]">
              <div className="absolute inset-0 bg-[#C9A86A] rounded-[4rem] blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-[#132B4C]/90 border border-white/10 aspect-[4/5] rounded-[4rem] overflow-hidden p-12 flex flex-col justify-between shadow-2xl backdrop-blur-xl transform transition-transform duration-700 hover:rotate-y-12 hover:scale-[1.02]">
                 <div className="flex justify-between items-start">
                    <div className="w-16 h-16 bg-[#006C35] rounded-3xl flex items-center justify-center shadow-lg border border-[#006C35]/20">
                        <Shield size={32} className="text-[#C9A86A]" />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Market Entry</p>
                        <p className="text-sm font-black text-[#C9A86A]">HQ Riyadh</p>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="h-px bg-white/10 w-full"></div>
                    <p className="text-4xl font-black tracking-tighter leading-none">Establishing <br/> Your Future.</p>
                    <div className="flex gap-3">
                        <div className="h-2 w-12 bg-[#F06543] rounded-full shadow-[0_0_10px_#F06543]"></div>
                        <div className="h-2 w-4 bg-white/10 rounded-full"></div>
                        <div className="h-2 w-4 bg-white/10 rounded-full"></div>
                    </div>
                 </div>

                 <div className="bg-[#0A1A2F]/80 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-[#0A1A2F] transition-colors">
                    <p className="text-[11px] font-bold text-[#C9A86A] uppercase mb-2">Compliance Status</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Vision 2030 Ready</span>
                        <span className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                          Optimized
                        </span>
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

export default Hero;
