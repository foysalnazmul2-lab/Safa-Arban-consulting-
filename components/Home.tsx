
import React from 'react';
import Hero from './Hero';
import { Page } from '../types';
import { 
  Activity,
  Award,
  BarChart3,
  Building,
  Users,
  Globe,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

interface HomeProps {
  setActivePage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  return (
    <>
      <Hero onStart={() => setActivePage('services')} />
      
      <div className="bg-[#C9A86A] text-[#0A1A2F] py-3 md:py-4 overflow-hidden whitespace-nowrap border-y border-[#0A1A2F]/10">
         <div className="flex animate-marquee gap-10 md:gap-20 items-center">
            {[
              "MISA 2026 ROADMAP ACTIVE",
              "ZATCA PHASE 2 INTEGRATION",
              "100% FOREIGN OWNERSHIP ENABLED",
              "RIYADH HQ GATEWAY LIVE",
              "VISION 2030 STRATEGIC HUB",
              "ELITE BUSINESS CONCIERGE"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3 font-black uppercase text-[8px] md:text-[10px] tracking-widest">
                 <Activity size={14} /> {text}
              </div>
            ))}
         </div>
      </div>

      <div className="py-16 md:py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
               {[
                 { icon: <Award className="text-[#C9A86A]" />, label: "Capital Managed", val: "3.5B+ SAR" },
                 { icon: <Users className="text-[#006C35]" />, label: "Entities Formed", val: "1,200+" },
                 { icon: <BarChart3 className="text-[#F06543]" />, label: "Growth Index", val: "94%" },
                 { icon: <Building className="text-[#0A1A2F]" />, label: "Office Network", val: "12 Hubs" }
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center text-center space-y-2 md:space-y-4">
                    <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 mb-1 md:mb-2">{stat.icon}</div>
                    <p className="text-2xl md:text-4xl font-black tracking-tight text-[#0A1A2F]">{stat.val}</p>
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">{stat.label}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
             {[
               { 
                 icon: <Globe size={32} />, 
                 title: "100% Foreign Ownership", 
                 color: "text-[#C9A86A]",
                 bg: "bg-[#C9A86A]/10",
                 hBg: "group-hover:bg-[#C9A86A]",
                 desc: "Direct MISA licensing granting you complete control of your KSA corporation without a local sponsor."
               },
               { 
                 icon: <FileCheck size={32} />, 
                 title: "Government Liaison", 
                 color: "text-[#006C35]",
                 bg: "bg-[#006C35]/10",
                 hBg: "group-hover:bg-[#006C35]",
                 desc: "Seamless integration with MC, ZATCA, and Qiwa platforms for frictionless operational compliance."
               },
               { 
                 icon: <ShieldCheck size={32} />, 
                 title: "Strategic Advisory", 
                 color: "text-[#F06543]",
                 bg: "bg-[#F06543]/10",
                 hBg: "group-hover:bg-[#F06543]",
                 desc: "Elite guidance on leveraging Vision 2030 incentives, RHQ status, and regional industrial funds."
               }
             ].map((prop, idx) => (
               <div key={idx} className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl space-y-6 group hover:-translate-y-2 transition-transform">
                  <div className={`w-16 h-16 ${prop.bg} rounded-2xl flex items-center justify-center ${prop.color} ${prop.hBg} group-hover:text-white transition-all`}>
                     {prop.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black">{prop.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{prop.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24 bg-[#0A1A2F] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A86A] rounded-full blur-[150px] opacity-10"></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
               <div className="lg:w-1/2 text-center lg:text-left">
                  <span className="text-[#C9A86A] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-4">The Catalyst of Change</span>
                  <h2 className="text-3xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
                     Establishing Your <br className="hidden md:block"/> Future in Riyadh.
                  </h2>
                  <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10">
                     Saudi Arabia is transforming into a global logistics and investment hub. With over $3 Trillion in planned projects, the opportunity for market leaders is unprecedented.
                  </p>
                  <div className="grid grid-cols-2 gap-4 md:gap-8 mb-10">
                     <div className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/10">
                        <p className="text-2xl md:text-4xl font-black text-[#C9A86A] mb-1">Top 10</p>
                        <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/50">Global Competitiveness</p>
                     </div>
                     <div className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/10">
                        <p className="text-2xl md:text-4xl font-black text-[#006C35] mb-1">0%</p>
                        <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/50">Personal Income Tax</p>
                     </div>
                  </div>
                  <button onClick={() => setActivePage('services')} className="bg-white text-[#0A1A2F] px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#C9A86A] transition-colors shadow-2xl w-full sm:w-auto">
                     Explore The Gateway
                  </button>
               </div>
               <div className="lg:w-1/2 relative mt-8 lg:mt-0">
                  <img 
                     src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=1000&auto=format&fit=crop" 
                     alt="Riyadh Skyline" 
                     className="rounded-[2.5rem] md:rounded-[3rem] border-4 md:border-8 border-white/5 shadow-2xl relative z-10 w-full"
                  />
                  <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-[#C9A86A] p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-xl z-20 border-4 border-[#0A1A2F]">
                     <p className="text-[#0A1A2F] font-black text-lg md:text-xl mb-1">Riyadh HQ</p>
                     <p className="text-[#0A1A2F]/60 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Gateway to MENA</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </>
  );
};

export default Home;
