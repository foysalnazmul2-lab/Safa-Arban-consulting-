
import React, { useState } from 'react';
import { MapPin, Building, Factory, Sun, Anchor, ArrowRight, TrendingUp } from 'lucide-react';
import { BRAND } from '../constants';

const REGIONS = [
  {
    id: 'central',
    name: 'Central Region (Riyadh)',
    icon: <Building size={20} />,
    focus: 'Headquarters, Fintech, Government',
    gdp: '45% of Non-Oil GDP',
    desc: 'The political and financial capital. Mandatory base for Regional HQs.',
    top: '40%', left: '45%',
    color: '#F26522'
  },
  {
    id: 'west',
    name: 'Western Region (Jeddah)',
    icon: <Sun size={20} />,
    focus: 'Tourism, Pilgrimage, Logistics',
    gdp: 'Gateway to Mecca/Medina',
    desc: 'Home to the Red Sea Project and Jeddah Islamic Port.',
    top: '50%', left: '25%',
    color: '#006C35'
  },
  {
    id: 'east',
    name: 'Eastern Province (Dammam)',
    icon: <Factory size={20} />,
    focus: 'Energy, Manufacturing, Chemicals',
    gdp: 'Industrial Powerhouse',
    desc: 'The hub of Aramco and SABIC. Ideal for heavy industry.',
    top: '45%', left: '70%',
    color: '#BE123C'
  },
  {
    id: 'north',
    name: 'Northern Region (NEOM)',
    icon: <Anchor size={20} />,
    focus: 'Future Tech, Renewables',
    gdp: '$500B Giga-Project',
    desc: 'The zero-carbon city of the future. Special economic zone regulations.',
    top: '20%', left: '20%',
    color: '#2563EB'
  }
];

const SaudiMap: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState(REGIONS[0]);

  return (
    <div className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.accent }}>National Strategy</span>
           <h2 className="text-4xl md:text-5xl font-black text-[#0A1A2F] tracking-tight mb-4" style={{ color: BRAND.colors.primary }}>
              Investment Geography
           </h2>
           <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
             Select a region to view specific economic zones and incentives.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
           {/* Interactive Map Visual */}
           <div className="lg:w-1/2 relative w-full aspect-[4/3] rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden group" style={{ backgroundColor: BRAND.colors.primary }}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              {/* Map Outline (Simplified SVG Representation) */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                 <path d="M20,20 L80,20 L90,50 L70,90 L30,80 L10,50 Z" fill="none" stroke="white" strokeWidth="0.5" />
              </svg>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 <line 
                   x1="45%" y1="40%" 
                   x2={activeRegion.left} y2={activeRegion.top} 
                   stroke={activeRegion.color} 
                   strokeWidth="0.5" 
                   strokeDasharray="2,2"
                   className="animate-pulse"
                 />
              </svg>

              {/* Hotspots */}
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region)}
                  className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-125 z-20 ${
                    activeRegion.id === region.id 
                    ? 'shadow-[0_0_30px_currentColor] scale-110' 
                    : 'bg-white/20 hover:bg-white'
                  }`}
                  style={{ 
                    top: region.top, 
                    left: region.left,
                    backgroundColor: activeRegion.id === region.id ? region.color : undefined,
                    color: region.color
                  }}
                >
                   {activeRegion.id === region.id && (
                     <>
                        <span className="absolute w-full h-full rounded-full animate-ping opacity-75" style={{ backgroundColor: region.color }}></span>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                     </>
                   )}
                </button>
              ))}
           </div>

           {/* Info Panel */}
           <div className="lg:w-1/2 space-y-8 animate-in slide-in-from-right-8 duration-500 key={activeRegion.id}">
              <div>
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-2xl text-white shadow-lg transition-colors duration-500" style={{ backgroundColor: activeRegion.color }}>
                       {activeRegion.icon}
                    </div>
                    <span className="font-black uppercase tracking-widest text-xs" style={{ color: activeRegion.color }}>Selected Region</span>
                 </div>
                 <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight transition-colors duration-500" style={{ color: BRAND.colors.primary }}>{activeRegion.name}</h3>
                 <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    {activeRegion.desc}
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                        <Factory size={16} />
                        <p className="text-[10px] font-black uppercase tracking-widest">Key Sectors</p>
                    </div>
                    <p className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>{activeRegion.focus}</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                        <TrendingUp size={16} />
                        <p className="text-[10px] font-black uppercase tracking-widest">Economic Impact</p>
                    </div>
                    <p className="font-bold text-sm" style={{ color: activeRegion.color }}>{activeRegion.gdp}</p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button className="flex-1 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg flex items-center justify-center gap-2 hover:opacity-90" style={{ backgroundColor: BRAND.colors.primary }}>
                    Explore Opportunities <ArrowRight size={16} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SaudiMap;
