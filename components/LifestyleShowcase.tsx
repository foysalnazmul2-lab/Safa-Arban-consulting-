
import React, { useState } from 'react';
import { GraduationCap, HeartPulse, Home, Coffee, MapPin } from 'lucide-react';
import { BRAND } from '../constants';

const CATEGORIES = [
  {
    id: 'living',
    title: 'Luxury Living',
    subtitle: 'Riyadh & Jeddah',
    icon: <Home size={20} />,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
    desc: 'From the diplomat quarters of Al Safarat to the ultra-modern villas of Hittin. Foreigners can now own premium real estate in designated zones.',
    stats: ['Freehold Ownership', 'Gated Communities', 'Smart City Infra']
  },
  {
    id: 'education',
    title: 'World-Class Education',
    subtitle: 'IB & British Curriculum',
    icon: <GraduationCap size={20} />,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200',
    desc: 'Home to elite institutions like Misk Schools, British International School, and American International School, offering global standard pathways.',
    stats: ['Misk Foundation', 'International Baccalaureate', 'Top-Tier Campuses']
  },
  {
    id: 'health',
    title: 'Healthcare Excellence',
    subtitle: 'Advanced Medical Care',
    icon: <HeartPulse size={20} />,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200',
    desc: 'Access to JCI-accredited facilities like King Faisal Specialist Hospital and Dr. Sulaiman Al Habib Medical City.',
    stats: ['Digital Health ID', 'Specialized Care', 'Privatized Insurance']
  },
  {
    id: 'leisure',
    title: 'Culture & Leisure',
    subtitle: 'Diriyah & AlUla',
    icon: <Coffee size={20} />,
    image: 'https://images.unsplash.com/photo-1565552629477-ff14595a81b3?q=80&w=1200',
    desc: 'Experience the UNESCO heritage of Diriyah, the fine dining of Via Riyadh, and the global events of Riyadh Season.',
    stats: ['Riyadh Season', 'F1 Grand Prix', 'Red Sea Global']
  }
];

const LifestyleShowcase: React.FC = () => {
  const [active, setActive] = useState(CATEGORIES[0]);

  return (
    <div className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <div>
              <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.secondary }}>Vision 2030: Quality of Life</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight" style={{ color: BRAND.colors.primary }}>
                 Life in the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006C35] to-[#4ade80]">New Kingdom</span>
              </h2>
           </div>
           <p className="text-slate-500 text-lg max-w-md font-medium leading-relaxed">
              It’s not just about business. It’s about building a home. Discover an ecosystem designed for global citizens.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-[600px]">
           
           {/* Navigation Cards */}
           <div className="lg:w-1/3 flex flex-col gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat)}
                  className={`relative p-6 rounded-3xl transition-all duration-500 text-left group overflow-hidden border ${
                    active.id === cat.id 
                    ? 'shadow-2xl scale-105 z-10' 
                    : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-lg'
                  }`}
                  style={{ 
                      backgroundColor: active.id === cat.id ? BRAND.colors.primary : undefined,
                      borderColor: active.id === cat.id ? BRAND.colors.primary : undefined
                  }}
                >
                   {active.id === cat.id && (
                     <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                   )}
                   <div className="flex items-center gap-4 relative z-10">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        active.id === cat.id ? 'bg-[#C9A86A] text-[#0A1A2F]' : 'bg-white text-slate-400 shadow-sm'
                      }`}
                      style={{ 
                          backgroundColor: active.id === cat.id ? BRAND.colors.secondary : 'white',
                          color: active.id === cat.id ? BRAND.colors.primary : undefined
                      }}>
                         {cat.icon}
                      </div>
                      <div>
                         <h4 className={`font-black text-sm ${active.id === cat.id ? 'text-white' : 'text-[#0A1A2F]'}`} style={{ color: active.id === cat.id ? 'white' : BRAND.colors.primary }}>
                           {cat.title}
                         </h4>
                         <p className={`text-[10px] font-bold uppercase tracking-wider ${active.id === cat.id ? 'text-slate-400' : 'text-slate-400'}`}>
                           {cat.subtitle}
                         </p>
                      </div>
                   </div>
                </button>
              ))}
           </div>

           {/* Visual Showcase */}
           <div className="lg:w-2/3 relative rounded-[3rem] overflow-hidden shadow-2xl group">
              <img 
                key={active.image}
                src={active.image} 
                alt={active.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 animate-in fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-[#0A1A2F]/20 to-transparent opacity-90" style={{ '--tw-gradient-from': BRAND.colors.primary, '--tw-gradient-via': `${BRAND.colors.primary}33` } as React.CSSProperties}></div>
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full animate-in slide-in-from-bottom-8 duration-700 key={active.id}">
                 <div className="flex items-center gap-2 mb-4">
                    <MapPin size={16} style={{ color: BRAND.colors.secondary }} />
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: BRAND.colors.secondary }}>{active.subtitle}</span>
                 </div>
                 <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    {active.title}
                 </h3>
                 <p className="text-white/80 text-lg leading-relaxed max-w-xl mb-8 font-medium">
                    {active.desc}
                 </p>
                 
                 <div className="flex flex-wrap gap-3">
                    {active.stats.map((stat, i) => (
                      <span key={i} className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                         {stat}
                      </span>
                    ))}
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default LifestyleShowcase;
