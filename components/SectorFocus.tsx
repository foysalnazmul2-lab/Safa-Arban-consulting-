
import React from 'react';
import { Cpu, Pickaxe, Plane, Gamepad2, ShoppingBag, Leaf, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../constants';

const SECTORS = [
  {
    id: 'tech',
    title: 'Future Tech & AI',
    icon: <Cpu size={24} />,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
    metric: 'CAGR 12%',
    desc: 'Align with SDAIA initiatives. 0% Tax for RHQ tech hubs.',
    colorClass: 'text-indigo-200'
  },
  {
    id: 'mining',
    title: 'Mining & Industry',
    icon: <Pickaxe size={24} />,
    image: 'https://images.unsplash.com/photo-1518558041923-a262438c71b6?q=80&w=800',
    metric: '$1.3 Trillion',
    desc: 'Untapped mineral potential. Ministry of Industry incentives.',
    colorClass: 'text-amber-200'
  },
  {
    id: 'tourism',
    title: 'Tourism & Red Sea',
    icon: <Plane size={24} />,
    image: 'https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=800',
    metric: '100M Visits',
    desc: 'Hospitality licenses for Red Sea Global & AlUla projects.',
    colorClass: 'text-teal-200'
  },
  {
    id: 'gaming',
    title: 'E-Sports & Gaming',
    icon: <Gamepad2 size={24} />,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800',
    metric: '$38 Billion',
    desc: 'Savvy Games Group investment hub. Media City zones.',
    colorClass: 'text-purple-200'
  },
  {
    id: 'retail',
    title: 'Retail & E-com',
    icon: <ShoppingBag size={24} />,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800',
    metric: 'High Growth',
    desc: '100% Foreign Ownership in retail trading activities.',
    colorClass: 'text-rose-200'
  },
  {
    id: 'green',
    title: 'Green Energy',
    icon: <Leaf size={24} />,
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800',
    metric: 'Net Zero 2060',
    desc: 'Hydrogen & Solar projects. NEOM energy grid access.',
    colorClass: 'text-emerald-200'
  }
];

const SectorFocus: React.FC = () => {
  return (
    <div className="py-24 relative overflow-hidden" style={{ backgroundColor: '#0f172a' }}> 
       {/* Background */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <div>
                <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.secondary }}>Vision 2030 Pillars</span>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                   Sector <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${BRAND.colors.secondary}, #F2D696)` }}>Intelligence</span>
                </h2>
             </div>
             <p className="text-slate-400 text-sm max-w-sm font-medium">
                We provide specialized regulatory frameworks for the Kingdom's highest-growth industries.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {SECTORS.map((sector) => (
                <div key={sector.id} className="group relative h-64 rounded-[2rem] overflow-hidden cursor-pointer border border-slate-700 hover:border-slate-500 transition-colors">
                   {/* Background Image */}
                   <img 
                     src={sector.image} 
                     alt={sector.title} 
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent opacity-90"></div>
                   
                   {/* Content */}
                   <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="mb-auto flex justify-between items-start">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-white/10 backdrop-blur-md ${sector.colorClass}`}>
                            {sector.icon}
                         </div>
                         <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: BRAND.colors.secondary }}>{sector.metric}</span>
                         </div>
                      </div>

                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                         <h3 className="text-2xl font-black text-white mb-2">{sector.title}</h3>
                         <p className="text-slate-300 text-xs font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {sector.desc}
                         </p>
                      </div>

                      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center" style={{ color: BRAND.colors.primary }}>
                            <ArrowUpRight size={20} />
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default SectorFocus;
