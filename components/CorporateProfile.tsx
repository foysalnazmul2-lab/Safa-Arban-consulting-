import React, { useState } from 'react';
import { X, Download, Globe, ShieldCheck, TrendingUp, Users, Target, Award, Building2, Loader2 } from 'lucide-react';
import { BRAND } from '../constants';
import { SafaArbanLogo } from './Logo.tsx';

interface CorporateProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const CorporateProfile: React.FC<CorporateProfileProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const element = document.getElementById('printable-corporate-profile');
    setIsGenerating(true);

    const opt = {
      margin: 0,
      filename: 'SafaArban_Corporate_Profile_2026.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0, windowWidth: 1024 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if ((window as any).html2pdf) {
        (window as any).html2pdf().set(opt).from(element).save().then(() => {
            setIsGenerating(false);
        }).catch((err: any) => {
            console.error(err);
            setIsGenerating(false);
        });
    } else {
        // Fallback
        window.print();
        setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 backdrop-blur-xl bg-[#051C2C]/90 animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl min-h-screen md:min-h-0 md:h-[90vh] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Floating Controls */}
        <div className="absolute top-6 right-6 flex gap-3 z-50 no-print">
           <button 
             onClick={handleDownload}
             disabled={isGenerating}
             className="bg-white/10 hover:bg-[#051C2C] hover:text-white text-[#051C2C] backdrop-blur-md border border-[#051C2C]/10 px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
             {isGenerating ? 'Generating PDF...' : 'Download PDF'}
           </button>
           <button 
             onClick={onClose}
             className="bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 p-3 rounded-full transition-all"
           >
             <X size={20} />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50">
           
           {/* Printable Wrapper */}
           <div id="printable-corporate-profile" className="bg-white max-w-full mx-auto relative">
               
               {/* Cover Slide */}
               <div className="relative h-[600px] flex items-center justify-center text-white text-center p-12 overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                  <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10" style={{ backgroundColor: BRAND.colors.accent }}></div>
                  
                  <div className="relative z-10 space-y-8">
                     <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl inline-block mb-4 border border-white/10">
                        <SafaArbanLogo className="h-20 w-auto" variant="white" />
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                        Building Legacies <br/> in Saudi Arabia.
                     </h1>
                     <p className="text-xl text-white/60 font-medium tracking-wide uppercase">Corporate Profile 2026</p>
                     <div className="flex justify-center gap-4 pt-8">
                        <div className="text-center px-6 border-r border-white/20">
                           <p className="text-3xl font-black" style={{ color: BRAND.colors.secondary }}>100%</p>
                           <p className="text-[9px] uppercase tracking-widest text-white/50">Foreign Ownership</p>
                        </div>
                        <div className="text-center px-6">
                           <p className="text-3xl font-black" style={{ color: BRAND.colors.accent }}>24h</p>
                           <p className="text-[9px] uppercase tracking-widest text-white/50">License Issuance</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* About Section */}
               <div className="p-12 md:p-20 bg-white">
                  <div className="max-w-4xl mx-auto text-center mb-16">
                     <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.secondary }}>Our Mandate</span>
                     <h2 className="text-4xl font-black text-[#051C2C] mb-6">The Strategic Bridge to Vision 2030</h2>
                     <p className="text-slate-500 text-lg leading-relaxed font-medium">
                        SafaArban is a premier boutique consultancy based in Riyadh, specializing in facilitating 100% foreign ownership for international investors. We act as your strategic partners, navigating the complexities of MISA, Ministry of Commerce, and ZATCA compliance to ensure a frictionless market entry.
                     </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                     {[
                       { icon: <ShieldCheck size={32} />, title: "Compliance First", desc: "Zero-tolerance policy on regulatory errors. We ensure your entity is audit-ready from Day 1." },
                       { icon: <Globe size={32} />, title: "Global Standards", desc: "We translate complex local regulations into clear, actionable international business strategies." },
                       { icon: <TrendingUp size={32} />, title: "Speed to Market", desc: "Leveraging our 'Platinum' status with government portals to expedite all clearances." }
                     ].map((item, i) => (
                       <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-center break-inside-avoid">
                          <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6 text-[#051C2C]">
                             {item.icon}
                          </div>
                          <h3 className="font-black text-lg mb-3" style={{ color: BRAND.colors.primary }}>{item.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Stats / Track Record */}
               <div className="bg-[#051C2C] text-white py-20 px-12 relative overflow-hidden">
                  <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
                     <div>
                        <p className="text-5xl font-black mb-2" style={{ color: BRAND.colors.secondary }}>$2.5B+</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">FDI Facilitated</p>
                     </div>
                     <div>
                        <p className="text-5xl font-black mb-2" style={{ color: BRAND.colors.accent }}>500+</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Entities Established</p>
                     </div>
                     <div>
                        <p className="text-5xl font-black mb-2">98%</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Approval Rate</p>
                     </div>
                     <div>
                        <p className="text-5xl font-black mb-2" style={{ color: BRAND.colors.alert }}>50+</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Countries Served</p>
                     </div>
                  </div>
               </div>

               {/* Services Matrix */}
               <div className="p-12 md:p-20 bg-slate-50">
                  <div className="max-w-5xl mx-auto">
                     <h2 className="text-3xl font-black text-[#051C2C] mb-12 text-center">Comprehensive Service Matrix</h2>
                     <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "MISA Investment Licensing (100% Foreign)",
                          "Regional HQ (RHQ) Program Setup",
                          "Industrial & Manufacturing Licenses",
                          "Commercial Registration & Chamber Membership",
                          "Investor & GM Visa Processing",
                          "Government Relations (PRO Services)",
                          "Corporate Bank Account Opening",
                          "ZATCA Tax & VAT Compliance",
                          "Saudization (Nitaqat) Strategy",
                          "Legal & Governance Advisory"
                        ].map((srv, i) => (
                          <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 break-inside-avoid">
                             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                             <span className="font-bold text-[#051C2C] text-sm">{srv}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Footer */}
               <div className="p-12 bg-white border-t border-slate-100 text-center">
                  <SafaArbanLogo className="h-10 w-auto mx-auto mb-6" />
                  <div className="text-sm font-bold text-slate-500 space-y-2">
                     <p>{BRAND.contact.address}</p>
                     <p>{BRAND.contact.email} • {BRAND.contact.phone}</p>
                     <p className="text-xs uppercase tracking-widest mt-4 opacity-50">CR: {BRAND.contact.cr} | VAT: {BRAND.contact.vat}</p>
                  </div>
               </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default CorporateProfile;