
import React, { useState, useEffect } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, Download, ShieldCheck, Globe, Target, Play, X, Quote, Star, Users, Zap, Briefcase } from 'lucide-react';
import { BRAND } from '../constants';

const FAQS = [
  {
    question: "Do I need a local Saudi partner to start a business?",
    answer: "No. Under the modern Ministry of Investment (MISA) regulations, foreign investors can own 100% of their company in most sectors, including trading, consulting, and IT, without a local sponsor (Kafeel)."
  },
  {
    question: "How long does the MISA licensing process take?",
    answer: "The MISA investment license itself is typically issued within 24-48 hours after submitting the complete application. However, the full operational setup (Commercial Registration, Tax Files, Bank Account) generally takes 2-4 weeks depending on the entity type."
  },
  {
    question: "What is the minimum capital requirement?",
    answer: "For most Service and Commercial licenses, there is no mandatory deposited capital requirement to start. However, MISA generally expects a financial commitment of at least 20,000 - 50,000 SAR for small entities to demonstrate financial viability."
  },
  {
    question: "Can SafaArban help with corporate bank account opening?",
    answer: "Yes. We have strategic partnerships with tier-1 Saudi banks (SNB, AlRajhi, ANB). We prepare your KYC file, UBO declarations, and schedule the sign-off meeting, significantly reducing the rejection risk."
  },
  {
    question: "What is Saudization (Nitaqat) and how does it affect me?",
    answer: "Saudization is the national policy requiring companies to hire a certain percentage of Saudi nationals. New foreign entities often get a 'grace period' of 12 months before strict quotas apply. We help you plan your hiring strategy to stay in the 'Green' zone."
  }
];

// Animated Number Component
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const About: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans">
      {/* Hero */}
      <div className="relative text-white py-32 md:py-48 overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
         {/* Dynamic Aurora Background */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none animate-pulse" style={{ backgroundColor: BRAND.colors.secondary }}></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.accent }}></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <span className="font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-6 animate-in slide-in-from-bottom-4" style={{ color: BRAND.colors.secondary }}>Established in Riyadh</span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none animate-in slide-in-from-bottom-6 delay-100">
              The Architects of <br/><span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${BRAND.colors.secondary}, #F2D696)` }}>Your Success.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto font-medium animate-in slide-in-from-bottom-8 delay-200 leading-relaxed">
              SafaArban is more than a consulting firm; we are the premium bridge between global ambition and Saudi reality.
            </p>
         </div>
      </div>
      
      {/* Values Bento Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24 -mt-20 relative z-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Large Feature Card */}
            <div className="md:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 group-hover:bg-[#006C35]/10 transition-colors"></div>
               <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                  <div className="flex-1">
                     <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-[#006C35] text-white">
                        <Target size={28} />
                     </div>
                     <h3 className="text-2xl font-black mb-4" style={{ color: BRAND.colors.primary }}>Precision Execution</h3>
                     <p className="text-slate-500 font-medium leading-relaxed">
                        We operate with a zero-error policy in government filings. Our deep understanding of MISA and MoC regulations ensures your license is approved right the first time, preventing costly delays.
                     </p>
                  </div>
                  <div className="md:w-1/3">
                     <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                        <p className="text-4xl font-black" style={{ color: BRAND.colors.accent }}>99.8%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">Accuracy Rate</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Standard Cards */}
            <div className="bg-[#051C2C] p-10 rounded-[2.5rem] shadow-xl border border-slate-800 text-white relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-white/10 backdrop-blur-md text-[#F26522]">
                     <Globe size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-4">Global Perspective</h3>
                  <p className="text-white/60 font-medium text-sm leading-relaxed">
                     Founded by expats, for expats. We speak your language and understand the nuances of international business.
                  </p>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 group hover:-translate-y-1 transition-transform">
               <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-slate-50 text-[#051C2C]">
                  <ShieldCheck size={28} />
               </div>
               <h3 className="text-xl font-black mb-4" style={{ color: BRAND.colors.primary }}>Asset Protection</h3>
               <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Legal frameworks that secure 100% of your ownership, intellectual property, and operational control.
               </p>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br from-white to-slate-50 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-8">
               <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-[#F26522] text-white">
                        <Zap size={28} />
                     </div>
                     <h3 className="text-xl font-black" style={{ color: BRAND.colors.primary }}>Velocity</h3>
                  </div>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                     Time is capital. Our fast-track protocols leveraging "Platinum" status with government portals allow for license issuance in as little as 24 hours.
                  </p>
               </div>
               <div className="w-full md:w-auto bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="text-center px-4 border-r border-slate-100">
                     <p className="text-2xl font-black" style={{ color: BRAND.colors.primary }}>24h</p>
                     <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">MISA</p>
                  </div>
                  <div className="text-center px-4">
                     <p className="text-2xl font-black" style={{ color: BRAND.colors.primary }}>48h</p>
                     <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">CR</p>
                  </div>
               </div>
            </div>

         </div>
      </div>

      {/* Trajectory / Story Section */}
      <div className="bg-white py-24 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               <div className="lg:w-1/2">
                  <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.accent }}>Our Trajectory</span>
                  <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight" style={{ color: BRAND.colors.primary }}>Catalyzing Vision 2030</h2>
                  <p className="text-slate-600 leading-relaxed text-lg font-medium mb-8">
                     Founded in the heart of Riyadh, SafaArban was established to eliminate the procedural friction international firms face when entering the Kingdom. We combine deep local PRO expertise with international business standards.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                     <div className="p-4 border-l-4 border-slate-100 pl-6">
                        <p className="text-3xl font-black" style={{ color: BRAND.colors.primary }}>500+</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Entities Established</p>
                     </div>
                     <div className="p-4 border-l-4 border-slate-100 pl-6">
                        <p className="text-3xl font-black" style={{ color: BRAND.colors.primary }}>$2.5B</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">FDI Facilitated</p>
                     </div>
                  </div>
               </div>
               
               <div className="lg:w-1/2 relative perspective-[1500px]">
                  <div className="absolute inset-0 rounded-[3rem] rotate-3 opacity-20 blur-xl" style={{ background: `linear-gradient(to right, ${BRAND.colors.secondary}, ${BRAND.colors.alert})` }}></div>
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800" 
                    className="relative rounded-[3rem] shadow-2xl z-10 w-full object-cover h-[500px] transform transition-transform duration-700 hover:rotate-y-6" 
                    alt="Office Strategy" 
                  />
               </div>
            </div>
         </div>
      </div>

      {/* Video Section - "The Vision" */}
      <div className="py-24 relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
         {/* Background elements */}
         <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${BRAND.colors.secondary}, ${BRAND.colors.alert}, ${BRAND.colors.accent})` }}></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               <div className="lg:w-1/2">
                  <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4 flex items-center gap-2" style={{ color: BRAND.colors.secondary }}>
                     <Play size={12} fill={BRAND.colors.secondary} /> Leadership Message
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                     Investing in <br/>
                     <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${BRAND.colors.secondary}, #F2D696)` }}>The Future Saudi.</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium mb-8">
                     "Our mission goes beyond paperwork. We are building the infrastructure for the next generation of global businesses entering the Kingdom. With Vision 2030, the opportunity is limitless, and SafaArban is your secure bridge."
                  </p>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-slate-700 rounded-full overflow-hidden border-2" style={{ borderColor: BRAND.colors.secondary }}>
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" alt="CEO" className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <p className="text-white font-bold text-sm">Foysal Nazmul</p>
                        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: BRAND.colors.secondary }}>Founder & CEO</p>
                     </div>
                  </div>
               </div>

               <div className="lg:w-1/2 relative group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                  <div className="absolute inset-0 rounded-[2.5rem] rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 aspect-video">
                     <img 
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop" 
                        alt="SafaArban Office" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                     />
                     <div className="absolute inset-0 bg-[#0A1A2F]/40 flex items-center justify-center group-hover:bg-[#0A1A2F]/20 transition-colors">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                           <div className="w-14 h-14 rounded-full flex items-center justify-center pl-1 shadow-xl" style={{ backgroundColor: BRAND.colors.secondary }}>
                              <Play size={24} fill={BRAND.colors.primary} style={{ color: BRAND.colors.primary }} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white border-b border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.accent }}>Trusted By Leaders</span>
               <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: BRAND.colors.primary }}>Client Success Stories</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 {
                   quote: "SafaArban navigated the complex MISA licensing process for our tech startup in record time. The transparency was refreshing.",
                   author: "James Wilson",
                   role: "CTO, TechFlow UK",
                   image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200"
                 },
                 {
                   quote: "Their knowledge of the RHQ program saved us millions in tax liabilities. A truly strategic partner for our MENA expansion.",
                   author: "Sarah Al-Hassan",
                   role: "Director, Global Logistics",
                   image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200"
                 },
                 {
                   quote: "From bank account opening to employee visas, the team handled everything. I didn't have to visit a single government office.",
                   author: "Rahul Mehta",
                   role: "Founder, Mehta Construction",
                   image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200"
                 }
               ].map((item, i) => (
                 <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 relative hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-xl">
                    <Quote className="mb-6 opacity-50" size={32} style={{ color: BRAND.colors.secondary }} />
                    <p className="text-slate-600 font-medium leading-relaxed mb-8 italic">"{item.quote}"</p>
                    <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                       <img src={item.image} alt={item.author} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
                       <div>
                          <p className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>{item.author}</p>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider">{item.role}</p>
                       </div>
                       <div className="ml-auto flex gap-0.5">
                          {[1,2,3,4,5].map(s => <Star key={s} size={12} style={{ color: BRAND.colors.secondary, fill: BRAND.colors.secondary }} />)}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
                <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.secondary }}>Expert Knowledge</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: BRAND.colors.primary }}>Common Queries</h2>
            </div>

            <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-[2rem] overflow-hidden transition-all duration-300 bg-white hover:shadow-lg group" style={{ borderColor: openIndex === idx ? BRAND.colors.accent : '' }}>
                        <button 
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                        >
                            <span className="text-base md:text-lg font-bold pr-8 transition-colors" style={{ color: openIndex === idx ? BRAND.colors.accent : BRAND.colors.primary }}>{faq.question}</span>
                            {openIndex === idx ? <ChevronUp style={{ color: BRAND.colors.accent }} className="shrink-0" /> : <ChevronDown className="text-slate-400 shrink-0" />}
                        </button>
                        <div 
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-6 md:p-8 pt-0 text-slate-600 leading-relaxed font-medium text-sm md:text-base border-t border-slate-50">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-300">
           <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1" 
                title="SafaArban Vision" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
           </div>
        </div>
      )}
    </div>
  );
};

export default About;
