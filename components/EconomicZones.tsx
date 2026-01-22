
import React, { useState } from 'react';
import { MapPin, ArrowRight, Factory, Zap, Anchor, Crown } from 'lucide-react';
import { BRAND } from '../constants';

const ZONES = [
  {
    id: 'riyadh',
    name: 'Riyadh Integrated (RISAL)',
    type: 'Logistics & RHQ',
    icon: <Crown size={24} />,
    image: 'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=1200',
    desc: 'The strategic heart of the Kingdom. Ideal for Regional HQs and high-tech logistics.',
    incentives: ['0% Corporate Tax (50 Years)', '100% Foreign Ownership', 'Saudization Exemptions'],
    industries: ['Technology', 'Media', 'Aviation', 'E-commerce']
  },
  {
    id: 'neom',
    name: 'NEOM (Oxagon)',
    type: 'Future Industry',
    icon: <Zap size={24} />,
    image: 'https://images.unsplash.com/photo-1582653291655-60ae21f37968?q=80&w=1200',
    desc: 'The cognitive city of the future. The worlds largest floating industrial complex.',
    incentives: ['Customs Duty Exemptions', 'Renewable Energy Grid', 'Next-Gen Regulatory Sandbox'],
    industries: ['Clean Energy', 'Water Tech', 'Modern Manufacturing', 'AI & Robotics']
  },
  {
    id: 'kaec',
    name: 'KAEC (King Abdullah)',
    type: 'Light Industry',
    icon: <Factory size={24} />, // Changed icon for variety
    image: 'https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=1200',
    desc: 'The premier hub on the Red Sea. Connected to King Abdullah Port for global export.',
    incentives: ['Bonded Zones', 'Low Cost Energy', 'Fast-Track Import/Export'],
    industries: ['FMCG', 'Automotive', 'Packaging', 'Pharmaceuticals']
  },
  {
    id: 'ras-al-khair',
    name: 'Ras Al Khair',
    type: 'Maritime & Mining',
    icon: <Anchor size={24} />,
    image: 'https://images.unsplash.com/photo-1605218427306-633ba80c979d?q=80&w=1200',
    desc: 'A powerhouse for mining and maritime industries located on the Arabian Gulf.',
    incentives: ['Raw Material Access', 'Maritime Cluster Support', 'Industrial Land Allocation'],
    industries: ['Shipbuilding', 'Minerals', 'Offshore Platforms', 'Steel']
  }
];

const EconomicZones: React.FC = () => {
  const [activeZone, setActiveZone] = useState(ZONES[0]);

  return (
    <div className="py-24 relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
           <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4 flex items-center justify-center gap-2" style={{ color: BRAND.colors.secondary }}>
              <MapPin size={14} /> Strategic Locations
           </span>
           <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Where to Invest?
           </h2>
           <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-medium">
             Saudi Arabia offers specialized Economic Zones (SEZs) with unique tax and regulatory frameworks. Explore the ecosystem to find your perfect base.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
           {/* Navigation Panel */}
           <div className="lg:w-1/3 space-y-4">
              {ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 text-left group ${
                    activeZone.id === zone.id 
                    ? 'bg-white/10 shadow-xl' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                  style={{ 
                    borderColor: activeZone.id === zone.id ? BRAND.colors.secondary : 'rgba(255,255,255,0.05)',
                    boxShadow: activeZone.id === zone.id ? `0 0 20px ${BRAND.colors.secondary}1A` : 'none'
                  }}
                >
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                     activeZone.id === zone.id ? 'text-[#051C2C]' : 'text-slate-400'
                   }`}
                   style={{ backgroundColor: activeZone.id === zone.id ? BRAND.colors.secondary : `${BRAND.colors.primary}` }}
                   >
                      {zone.icon}
                   </div>
                   <div className="flex-1">
                      <h4 className={`font-black text-sm uppercase tracking-wider mb-1 ${
                        activeZone.id === zone.id ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`}>
                        {zone.name}
                      </h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: BRAND.colors.accent }}>{zone.type}</p>
                   </div>
                   {activeZone.id === zone.id && <ArrowRight size={16} className="animate-pulse" style={{ color: BRAND.colors.secondary }} />}
                </button>
              ))}
           </div>

           {/* Detail View / Holodeck */}
           <div className="lg:w-2/3 relative rounded-[3rem] overflow-hidden border border-white/10 group">
              {/* Background Image with Transition */}
              <div className="absolute inset-0">
                 <img 
                   src={activeZone.image} 
                   alt={activeZone.name} 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40"
                 />
                 <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BRAND.colors.primary}, ${BRAND.colors.primary}CC, transparent)` }}></div>
                 <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${BRAND.colors.primary}, transparent, transparent)` }}></div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end animate-in fade-in slide-in-from-bottom-8 duration-500 key={activeZone.id}">
                 <div className="mb-auto">
                    <span className="text-[#051C2C] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg inline-block mb-6" style={{ backgroundColor: BRAND.colors.secondary }}>
                       SEZ • {activeZone.type}
                    </span>
                 </div>

                 <h3 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                    {activeZone.name}
                 </h3>
                 <p className="text-slate-300 text-lg mb-8 max-w-xl leading-relaxed">
                    {activeZone.desc}
                 </p>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: BRAND.colors.accent }}>
                          <Zap size={12} /> Key Incentives
                       </h4>
                       <ul className="space-y-2">
                          {activeZone.incentives.map((inc, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm font-bold text-white">
                               <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                               {inc}
                            </li>
                          ))}
                       </ul>
                    </div>
                    
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: BRAND.colors.accent }}>
                          <Factory size={12} /> Focus Sectors
                       </h4>
                       <div className="flex flex-wrap gap-2">
                          {activeZone.industries.map((ind, i) => (
                            <span key={i} className="bg-white/10 border border-white/10 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-white/20 transition-colors cursor-default">
                               {ind}
                            </span>
                          ))}
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

export default EconomicZones;
