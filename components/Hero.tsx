
import React, { useState, useEffect, useRef } from 'react';
import { Shield, Star, CheckCircle, ArrowRight, Building2, Sun, Moon, Cloud } from 'lucide-react';
import { Page } from '../types';
import { BRAND } from '../constants';

interface HeroProps {
  onStart: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [greeting, setGreeting] = useState('');
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const WORDS = ["Formation", "Expansion", "Strategy", "Compliance"];

  useEffect(() => {
    // Time-based greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning, Visionary');
    else if (hour < 18) setGreeting('Good Afternoon, Visionary');
    else setGreeting('Good Evening, Visionary');

    // Word Cycle
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative text-white min-h-[95vh] flex flex-col justify-center overflow-hidden perspective-[2000px]" 
      style={{ backgroundColor: BRAND.colors.primary }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={heroRef}
    >
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1582653291655-60ae21f37968?q=80&w=2000&auto=format&fit=crop" 
          alt="Riyadh Skyline Business (KAFD)" 
          className="w-full h-full object-cover opacity-20 scale-110"
          style={{ transform: `translate(${offset.x * -0.5}px, ${offset.y * -0.5}px)` }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${BRAND.colors.primary}, ${BRAND.colors.primary}F2, ${BRAND.colors.primary}80)` }}></div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BRAND.colors.primary}, transparent)` }}></div>
        
        {/* Animated Glow Effects */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 animate-pulse [animation-duration:8s]" style={{ backgroundColor: BRAND.colors.secondary }}></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[180px] opacity-10 animate-pulse [animation-duration:12s]" style={{ backgroundColor: BRAND.colors.accent }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="lg:w-3/5 text-center lg:text-left pt-10 lg:pt-0">
            
            {/* Personalized Greeting Pill */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md animate-in slide-in-from-top-4 fade-in duration-700">
               {greeting.includes('Morning') ? <Sun size={14} className="text-yellow-400" /> : <Moon size={14} className="text-blue-300" />}
               <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{greeting}</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8 drop-shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100 min-h-[3.5em] lg:min-h-[2.8em]">
              Master Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400">Saudi Market</span> <br />
              <span className="relative inline-block">
                 <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${BRAND.colors.secondary}, #F2D696)` }}>
                    {WORDS[activeWordIndex]}.
                 </span>
                 <span className="absolute bottom-2 left-0 w-full h-1 rounded-full opacity-50" style={{ backgroundColor: BRAND.colors.secondary }}></span>
              </span>
            </h1>
            
            <p className="text-base md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed animate-in slide-in-from-bottom-12 fade-in duration-700 delay-200">
              SafaArban provides the digital infrastructure and legal expertise for 100% foreign ownership. Launch your Regional HQ in Riyadh with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start animate-in slide-in-from-bottom-16 fade-in duration-700 delay-300">
              <button 
                onClick={() => onStart('services')}
                className="hover:bg-white hover:text-[#051C2C] text-[#051C2C] px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 group relative overflow-hidden"
                style={{ backgroundColor: BRAND.colors.secondary, boxShadow: `0 0 40px -10px ${BRAND.colors.secondary}66` }}
              >
                <span className="relative z-10 flex items-center gap-2">Start Setup <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </button>
              <button 
                onClick={() => onStart('contact')}
                className="bg-transparent border border-white/10 hover:border-white/30 hover:bg-white/5 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 text-white backdrop-blur-sm"
              >
                Book Consultation
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 animate-in fade-in duration-1000 delay-500">
              {[
                "MISA Licensed",
                "Vision 2030 Aligned",
                "24h Fast-Track",
                "Bank Integration"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 group cursor-default">
                   <div className="p-1 rounded-full bg-white/5 group-hover:bg-[#006C35] transition-colors">
                      <CheckCircle size={12} className="text-white" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Visual Element */}
          <div className="lg:w-2/5 hidden lg:block relative z-10">
            <div 
              className="relative transition-transform duration-100 ease-out will-change-transform"
              style={{ transform: `rotateY(${offset.x}deg) rotateX(${-offset.y}deg)` }}
            >
              {/* Glow Behind */}
              <div className="absolute inset-0 rounded-[3rem] blur-[60px] opacity-30" style={{ background: `linear-gradient(to top right, ${BRAND.colors.secondary}, ${BRAND.colors.accent})` }}></div>
              
              {/* Main Card */}
              <div className="relative backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden" style={{ backgroundColor: `${BRAND.colors.primary}CC` }}>
                 {/* Reflection */}
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none"></div>

                 <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Building2 size={200} className="text-white" />
                 </div>

                 <div className="relative z-10 space-y-10">
                    <div className="flex justify-between items-start">
                       <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border relative overflow-hidden" style={{ background: `linear-gradient(to bottom right, ${BRAND.colors.accent}, #004d26)`, borderColor: `${BRAND.colors.accent}4D` }}>
                          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                          <Shield size={32} className="text-white relative z-10" />
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">License Status</p>
                          <div className="flex items-center gap-2 justify-end mt-1">
                             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
                             <span className="text-sm font-black text-white">Active</span>
                          </div>
                       </div>
                    </div>

                    <div>
                       <h3 className="text-3xl font-black text-white leading-tight mb-2">Foreign Investment <br/> License</h3>
                       <div className="flex items-center gap-2">
                          <Star size={12} style={{ color: BRAND.colors.secondary, fill: BRAND.colors.secondary }} />
                          <p className="text-sm text-slate-400 font-medium">100% Ownership Approved</p>
                       </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4 backdrop-blur-sm">
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-bold">Processing</span>
                          <span className="text-white font-mono">Stage 3 of 4</span>
                       </div>
                       <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full w-[75%] relative overflow-hidden" style={{ backgroundColor: BRAND.colors.secondary }}>
                             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                          </div>
                       </div>
                       <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold">
                          <span style={{ color: BRAND.colors.secondary }}>Est. Completion</span>
                          <span className="text-white">24 Hours</span>
                       </div>
                    </div>

                    <div className="flex gap-4">
                       <div className="flex-1 bg-white/5 rounded-xl p-3 text-center border border-white/5">
                          <p className="text-[9px] text-slate-400 uppercase font-bold">Capital</p>
                          <p className="text-white font-bold text-sm">Not Required</p>
                       </div>
                       <div className="flex-1 bg-white/5 rounded-xl p-3 text-center border border-white/5">
                          <p className="text-[9px] text-slate-400 uppercase font-bold">Sponsor</p>
                          <p className="text-white font-bold text-sm">None</p>
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

export default Hero;
