
import React, { useEffect, useState } from 'react';
import { CheckCircle2, ShieldCheck, Lock, Building2, ArrowRight, Play } from 'lucide-react';
import { Page } from '../types';
import { BRAND } from '../constants';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onStart: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         <div 
            className="absolute top-[-10%] right-[-10%] md:top-[-20%] md:right-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full blur-[80px] md:blur-[120px] opacity-20 bg-brand-secondary mix-blend-screen animate-pulse"
            style={{ animationDuration: '4s' }}
         ></div>
         <div 
            className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-[60px] md:blur-[100px] opacity-10 bg-brand-accent mix-blend-screen"
         ></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full pt-28 pb-12 md:pt-40 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Content Side */}
            <div className="text-center lg:text-left rtl:lg:text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 md:mb-8 animate-fade-up">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{t('hero_badge')}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-6 md:mb-8 animate-fade-up delay-100">
                    {t('hero_title_1')} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent italic pr-4">
                        {t('hero_title_highlight')}
                    </span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-xl leading-relaxed mb-8 md:mb-10 font-light animate-fade-up delay-200 mx-auto lg:mx-0">
                    {t('hero_desc')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300 justify-center lg:justify-start">
                    <button 
                    onClick={() => onStart('services')}
                    className="group relative overflow-hidden bg-brand-secondary text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(233,78,78,0.4)] transition-all duration-300"
                    >
                    <span className="relative z-10 flex items-center justify-center sm:justify-start gap-3">
                        {t('hero_cta_primary')} <ArrowRight size={16} className={`transition-transform ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                    </span>
                    </button>
                    
                    <button 
                    onClick={() => onStart('contact')}
                    className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-white border border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-3"
                    >
                    {t('hero_cta_secondary')}
                    </button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 md:mt-16 flex flex-wrap gap-x-6 md:gap-x-8 gap-y-4 border-t border-white/10 pt-6 md:pt-8 animate-fade-up delay-300 justify-center lg:justify-start">
                    {[
                        { label: "100% Foreign Ownership", icon: CheckCircle2 },
                        { label: "MISA Licensed", icon: ShieldCheck },
                        { label: "Riyadh HQ", icon: Building2 },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-3">
                            <item.icon size={18} className="text-brand-accent md:w-5 md:h-5" />
                            <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-wide">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visual Side */}
            <div className="relative hidden lg:block animate-fade-up delay-200">
                <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                    <img 
                        src="https://images.unsplash.com/photo-1512453979798-5ea904f4480e?q=80&w=1200&auto=format&fit=crop" 
                        alt="Riyadh Skyline" 
                        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent"></div>
                    
                    {/* Floating Card */}
                    <div className="absolute bottom-8 left-8 right-8 glass-panel-dark p-6 rounded-3xl flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-secondary mb-1">Fast-Track</p>
                            <p className="text-white font-serif text-lg">Regional HQ Program</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-white text-brand-dark flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                            <Play size={20} fill="currentColor" />
                        </div>
                    </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-12 -right-12 w-48 h-48 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-secondary/20 rounded-full blur-2xl"></div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
