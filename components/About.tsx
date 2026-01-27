
import React, { useState } from 'react';
import { 
  Quote, 
  Target, 
  Building2, 
  ShieldCheck, 
  FileText,
  CheckCircle2,
  TrendingUp,
  Award,
  Globe,
  Briefcase,
  Users,
  Scale,
  Landmark,
  ArrowRight,
  Clock,
  Zap,
  MapPin
} from 'lucide-react';
import { BRAND } from '../constants';
import CorporateProfile from './CorporateProfile';

// --- DATA CONFIGURATION ---

const LEADERSHIP = [
  {
    name: "Foysal Nazmul",
    role: "General Manager",
    creds: "MISA Liaison • Strategic Planning",
    bio: "Architect of market entry strategies. Foysal bridges the gap between international investors and Saudi regulatory frameworks, ensuring zero-friction launches.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Dr. Sarah Al-Otaibi",
    role: "Head of Legal",
    creds: "LLM Corporate Law • MoC Certified",
    bio: "A guardian of compliance. Dr. Sarah ensures every Articles of Association (AoA) and contract adheres strictly to the evolving Saudi legal code.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Eng. Ahmed Zaki",
    role: "Govt. Relations Director",
    creds: "Senior PRO • Qiwa Specialist",
    bio: "The boots on the ground. Ahmed manages high-level relationships with ministry officials to expedite clearances that others can't.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop"
  }
];

const TIMELINE = [
  { year: "2016", vision: "Vision 2030 Launch", company: "SafaArban Founded", desc: "Established in Riyadh to support early movers." },
  { year: "2019", vision: "Premium Residency", company: "1st Gold Visa", desc: "Processed inaugural investor residency permits." },
  { year: "2021", vision: "Shareek Program", company: "Corporate Unit", desc: "Launched dedicated B2B consulting division." },
  { year: "2024", vision: "RHQ Mandate", company: "RHQ Desk Setup", desc: "Specialized unit for Regional Headquarters." },
  { year: "2030", vision: "Global Powerhouse", company: "Your Partner", desc: "Scaling your legacy in the Kingdom." }
];

const WHY_US = [
  { 
    title: "Speed to Market", 
    desc: "We leverage Platinum portal access to cut MISA licensing times by 60%.", 
    icon: <Zap size={24} />,
    color: "bg-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
  { 
    title: "100% Compliance", 
    desc: "Zero tolerance for regulatory errors. We ensure you are audit-ready from Day 1.", 
    icon: <ShieldCheck size={24} />,
    color: "bg-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  { 
    title: "Local Access", 
    desc: "Direct lines to Ministry officials (MISA, MC, ZATCA) to resolve blockers.", 
    icon: <Building2 size={24} />,
    color: "bg-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  { 
    title: "Transparent Pricing", 
    desc: "No hidden 'service fees'. We separate professional fees from government costs.", 
    icon: <Scale size={24} />,
    color: "bg-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  }
];

const About: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden text-[#0A1A2F]">
      
      {/* 1. HERO: The Institutional Standard */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-[#051C2C] text-white overflow-hidden">
         {/* Background Effects */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: BRAND.colors.secondary }}></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: BRAND.colors.accent }}></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-in slide-in-from-top-4 duration-700">
               <Award size={14} className="text-[#F2D696]" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Est. 2016 • Riyadh HQ</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-8">
               Architects of <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2D696] to-[#d4af37]">Commercial Sovereignty.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
               SafaArban is the premier government liaison firm for multinational corporations entering Saudi Arabia. We bridge the gap between global ambition and local regulatory compliance.
            </p>

            <button 
                onClick={() => setIsProfileOpen(true)}
                className="bg-white text-[#051C2C] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#F2D696] transition-colors flex items-center gap-2 shadow-xl mx-auto group"
            >
                <FileText size={16} className="text-[#051C2C] group-hover:scale-110 transition-transform" /> Download Corporate Profile
            </button>
         </div>
      </div>

      {/* 2. THE COUNCIL: Leadership */}
      <div className="bg-white py-24">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4 text-[#C9A86A]">Executive Board</span>
               <h2 className="text-4xl font-black text-[#051C2C] mb-4">The Council</h2>
               <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
                  Decades of combined experience in Saudi corporate law, government relations, and strategic investment.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {LEADERSHIP.map((leader, idx) => (
                  <div key={idx} className="group relative">
                     <div className="relative h-[400px] w-full rounded-[2rem] overflow-hidden mb-6 shadow-lg border border-slate-100">
                        <img 
                          src={leader.image} 
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-105" 
                          alt={leader.name} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#051C2C] via-transparent to-transparent opacity-80"></div>
                        
                        <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                           <div className="bg-[#C9A86A] text-[#051C2C] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md inline-block mb-3 shadow-md">
                              {leader.role}
                           </div>
                           <h3 className="text-2xl font-black text-white mb-2">{leader.name}</h3>
                           <p className="text-white/80 text-xs font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                              {leader.bio}
                           </p>
                        </div>
                     </div>
                     <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">{leader.creds}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* 3. WHY US: The Checklist */}
      <div className="py-24 bg-slate-50 border-y border-slate-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center">
               
               <div className="md:w-1/3">
                  <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4 text-[#C9A86A]">Competitive Edge</span>
                  <h2 className="text-4xl font-black text-[#051C2C] mb-6">Why SafaArban?</h2>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
                     We don't just process paperwork; we engineer market entry strategies that withstand regulatory shifts.
                  </p>
                  <div className="flex items-center gap-3 text-sm font-bold text-[#051C2C] bg-white p-3 rounded-xl border border-slate-100 shadow-sm w-fit">
                     <CheckCircle2 size={18} className="text-[#C9A86A]" />
                     <span>500+ Entities Established</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-[#051C2C] mt-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm w-fit">
                     <CheckCircle2 size={18} className="text-[#C9A86A]" />
                     <span>$2.5B+ Capital Facilitated</span>
                  </div>
               </div>

               <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {WHY_US.map((item, idx) => (
                     <div key={idx} className={`bg-white p-8 rounded-[2rem] shadow-sm border ${item.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 ${item.color} shadow-lg group-hover:scale-110 transition-transform`}>
                           {item.icon}
                        </div>
                        <h3 className="text-lg font-black text-[#051C2C] mb-3">{item.title}</h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                           {item.desc}
                        </p>
                     </div>
                  ))}
               </div>

            </div>
         </div>
      </div>

      {/* 4. VISION SYNC: The Timeline */}
      <div className="bg-[#051C2C] py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Aligned with Vision 2030</h2>
               <p className="text-slate-400 text-sm font-medium">Our growth mirrors the Kingdom's transformation.</p>
            </div>

            <div className="relative">
               {/* Connecting Line */}
               <div className="absolute top-[2rem] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#C9A86A] to-transparent opacity-30 hidden md:block"></div>
               
               <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  {TIMELINE.map((item, idx) => (
                     <div key={idx} className="group relative flex flex-col items-center text-center">
                        {/* Dot */}
                        <div className="w-16 h-16 rounded-full bg-[#0B253A] border-2 border-[#C9A86A] flex items-center justify-center text-[#C9A86A] font-black z-10 mb-6 group-hover:bg-[#C9A86A] group-hover:text-[#051C2C] transition-colors shadow-[0_0_20px_rgba(201,168,106,0.2)] relative">
                           {item.year}
                           {/* Pulse effect for current/future years */}
                           {idx >= 3 && <div className="absolute inset-0 rounded-full animate-ping border border-[#C9A86A] opacity-20"></div>}
                        </div>
                        
                        {/* Content */}
                        <div className="bg-white/5 border border-white/5 p-6 rounded-2xl w-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                           <span className="text-[#C9A86A] text-[9px] font-black uppercase tracking-widest block mb-2">{item.vision}</span>
                           <h4 className="text-white font-bold text-sm mb-2">{item.company}</h4>
                           <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* 5. THE TRUST VAULT */}
      <div className="bg-white py-20 border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-[#051C2C] md:w-1/2">
               <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-[#051C2C] text-white">
                  <ShieldCheck className="text-[#C9A86A]" size={16} />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Credentials</span>
               </div>
               <h2 className="text-3xl md:text-4xl font-black mb-6">The Trust Vault</h2>
               <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-md font-medium">
                  Licensed by the Ministry of Commerce. Certified by the Ministry of Investment. Member of the Riyadh Chamber. Our credentials are your security.
               </p>
               <div className="flex gap-8">
                  <div>
                     <p className="text-4xl font-black text-[#051C2C]">{BRAND.contact.cr.slice(-4)}</p>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">CR Number</p>
                  </div>
                  <div className="w-px h-12 bg-slate-200"></div>
                  <div>
                     <p className="text-4xl font-black text-[#051C2C]">100%</p>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Compliance</p>
                  </div>
               </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
               {["Ministry of Investment", "Ministry of Commerce", "ZATCA", "Riyadh Chamber"].map((name, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center hover:bg-white hover:shadow-xl hover:border-[#051C2C]/10 transition-all group h-32">
                     <Building2 size={24} className="text-slate-300 mb-3 group-hover:text-[#051C2C] transition-colors" />
                     <span className="font-bold text-slate-500 text-xs uppercase tracking-wider group-hover:text-[#051C2C] transition-colors">{name}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <CorporateProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default About;
