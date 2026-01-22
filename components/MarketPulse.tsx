
import React from 'react';
import { TrendingUp, DollarSign, Droplet, BarChart3, Globe } from 'lucide-react';
import { BRAND } from '../constants';

const MarketPulse: React.FC = () => {
  return (
    <div className="border-b border-white/5 text-white py-3 overflow-hidden relative z-30" style={{ backgroundColor: BRAND.colors.primary }}>
       <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: BRAND.colors.secondary }}>
             <Globe size={12} /> Saudi Market Watch
          </div>

          <div className="flex-1 overflow-hidden relative mx-4 md:mx-12">
             <div className="flex items-center gap-8 md:gap-16 animate-marquee whitespace-nowrap">
                {/* Ticker Items */}
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-slate-400">SAR/USD</span>
                   <span className="text-xs font-mono font-bold text-white">3.75</span>
                   <span className="text-[9px] text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">Pegged</span>
                </div>

                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Droplet size={10} /> Brent Crude</span>
                   <span className="text-xs font-mono font-bold text-white">$82.40</span>
                   <span className="text-[9px] text-emerald-400 flex items-center"><TrendingUp size={10} /> +1.2%</span>
                </div>

                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><BarChart3 size={10} /> TASI (Tadawul)</span>
                   <span className="text-xs font-mono font-bold text-white">12,450.30</span>
                   <span className="text-[9px] text-emerald-400 flex items-center"><TrendingUp size={10} /> +0.5%</span>
                </div>

                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-slate-400">SAIBOR (3M)</span>
                   <span className="text-xs font-mono font-bold text-white">6.20%</span>
                   <span className="text-[9px] text-slate-500">Stable</span>
                </div>

                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-slate-400">GDP Growth (Non-Oil)</span>
                   <span className="text-xs font-mono font-bold text-white">4.8%</span>
                   <span className="text-[9px] text-emerald-400 flex items-center"><TrendingUp size={10} /> YTD</span>
                </div>

                {/* Duplicate for smooth loop */}
                <div className="w-8"></div> 

                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-slate-400">SAR/USD</span>
                   <span className="text-xs font-mono font-bold text-white">3.75</span>
                   <span className="text-[9px] text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">Pegged</span>
                </div>
             </div>
             
             {/* Gradient Masks - using inline style for dynamic color */}
             <div className="absolute top-0 left-0 w-8 h-full z-10" style={{ background: `linear-gradient(to right, ${BRAND.colors.primary}, transparent)` }}></div>
             <div className="absolute top-0 right-0 w-8 h-full z-10" style={{ background: `linear-gradient(to left, ${BRAND.colors.primary}, transparent)` }}></div>
          </div>

          <div className="hidden md:flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Riyadh Live</span>
          </div>

       </div>
    </div>
  );
};

export default MarketPulse;
