
import React from 'react';
import { CheckCircle2, ShieldCheck, Building2, ArrowRight, Play, Globe } from 'lucide-react';
import { Page } from '../types';
import { BRAND } from '../constants';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onStart: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-[#051C2C]">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
         <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea904f4480e?q=80&w=2000&auto=format&fit=crop" 
            alt="Riyadh Skyline Night" 
            className="w-full h-full object-cover opacity-20"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-[#051C2C] via-[#051C2C]/90 to-[#051C2C]/60"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 bg-[#E94E4E] animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 bg-[#F7C948]"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full pt-32 pb-12 md:pt-48 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Content Side */}
            <div className="text-center lg:text-left rtl:lg:text-right">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E94E4E] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E94E4E]"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">{t('hero_badge')}</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-white leading-[1.05] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                    {t('hero_title_1')} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7C948] to-[#E94E4E] italic pr-2">
                        {t('hero_title_highlight')}
                    </span>
                </h1>

                <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed mb-10 font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 mx-auto lg:mx-0">
                    {t('hero_desc')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 justify-center lg:justify-start">
                    <button 
                        onClick={() => onStart('services')}
                        className="group relative overflow-hidden bg-white text-[#051C2C] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#F2F2F2] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        <span className="relative z-10 flex items-center justify-center sm:justify-start gap-3">
                            {t('hero_cta_primary')} <ArrowRight size={16} className={`transition-transform ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                        </span>
                    </button>
                    
                    <button 
                        onClick={() => onStart('contact')}
                        className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
                    >
                        {t('hero_cta_secondary')}
                    </button>
                </div>

                {/* Trust Indicators / Footer of Hero */}
                <div className="mt-16 pt-8 border-t border-white/5 animate-in fade-in delay-500 duration-1000">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Trusted by Industry Leaders</p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder Logos - In a real app these would be SVGs */}
                        <div className="h-6 w-20 bg-white/20 rounded"></div>
                        <div className="h-6 w-20 bg-white/20 rounded"></div>
                        <div className="h-6 w-20 bg-white/20 rounded"></div>
                        <div className="h-6 w-20 bg-white/20 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Visual Side */}
            <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
                <div className="relative z-10 w-full aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                    <img 
                        src="https://images.unsplash.com/photo-1582653291655-60ae21f37968?q=80&w=1200&auto=format&fit=crop" 
                        alt="Saudi Business" 
                        className="object-cover w-full h-full transition-transform duration-[2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051C2C] via-transparent to-transparent opacity-80"></div>
                    
                    {/* Floating Card 1 */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex items-center justify-between shadow-2xl transform transition-transform group-hover:-translate-y-2">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Status: Approved</p>
                            </div>
                            <p className="text-white font-serif text-lg">MISA Investment License</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-white text-[#051C2C] flex items-center justify-center">
                            <ShieldCheck size={18} />
                        </div>
                    </div>

                    {/* Floating Card 2 */}
                    <div className="absolute top-8 right-8 bg-[#E94E4E] text-white p-4 rounded-2xl shadow-xl transform rotate-6 group-hover:rotate-0 transition-transform">
                        <p className="text-xs font-black uppercase tracking-widest mb-1">100% Ownership</p>
                        <p className="text-xs opacity-90">Verified & Secure</p>
                    </div>
                </div>
                
                {/* Decorative Pattern behind image */}
                <div className="absolute -top-12 -right-12 w-64 h-64 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute top-1/2 -right-20 w-40 h-40 bg-[#F7C948]/20 rounded-full blur-[80px]"></div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
