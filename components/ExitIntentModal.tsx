import React, { useState, useEffect } from 'react';
import { X, Download, FileText, CheckCircle2, Percent } from 'lucide-react';
import { BRAND } from '../constants';

const ExitIntentModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if we've already shown it this session
    const sessionShown = sessionStorage.getItem('safaarban_exit_shown');
    if (sessionShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse leaves top of viewport (desktop)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('safaarban_exit_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSuccess(true);
      // In a real app, you would submit the email to your backend here
      // and trigger the PDF download / send email.
      setTimeout(() => setIsVisible(false), 5000);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300" style={{ backgroundColor: `${BRAND.colors.primary}E6` }}>
      <div className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20">
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-20 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
        >
          <X size={20} className="text-slate-500" />
        </button>

        {/* Visual Side */}
        <div className="md:w-2/5 p-8 text-white relative overflow-hidden flex flex-col justify-center items-center text-center" style={{ backgroundColor: BRAND.colors.primary }}>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20" style={{ backgroundColor: BRAND.colors.secondary }}></div>
           
           <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              <div className="bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-2xl border border-white/20 backdrop-blur-md mb-6 shadow-2xl">
                 <div className="bg-[#0A1A2F] p-6 rounded-xl flex flex-col items-center gap-3">
                    <FileText size={40} style={{ color: BRAND.colors.secondary }} />
                    <div className="h-px w-12 bg-white/20"></div>
                    <Percent size={24} style={{ color: BRAND.colors.alert }} />
                 </div>
              </div>
           </div>
           
           <h3 className="font-black text-xl mb-1">VIP Access</h3>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Guide + Fee Waiver</p>
        </div>

        {/* Content Side */}
        <div className="md:w-3/5 p-8 md:p-12 relative">
           {isSuccess ? (
             <div className="text-center py-8 animate-in zoom-in duration-300">
               <div className="w-20 h-20 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl" style={{ backgroundColor: BRAND.colors.accent }}>
                 <CheckCircle2 size={40} />
               </div>
               <h3 className="text-2xl font-black text-[#0A1A2F] mb-2" style={{ color: BRAND.colors.primary }}>Offer Unlocked!</h3>
               <p className="text-slate-500 text-sm mb-6">The guide and your <strong>15% discount code</strong> have been sent to {email}.</p>
               <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Your Code</p>
                  <p className="font-mono font-black text-xl tracking-widest" style={{ color: BRAND.colors.primary }}>SAFA2026VIP</p>
               </div>
             </div>
           ) : (
             <>
               <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-[#BE123C] text-[9px] font-black uppercase tracking-widest mb-4 border border-red-100">
                  Limited Time Offer
               </div>
               <h2 className="text-3xl font-black text-[#0A1A2F] mb-4 leading-tight" style={{ color: BRAND.colors.primary }}>
                 Before You Go...
               </h2>
               <p className="text-slate-500 text-sm mb-8 font-medium leading-relaxed">
                 Secure your <span className="font-bold text-[#0A1A2F]">2026 Saudi Entry Roadmap</span> and get a <span className="font-bold" style={{ color: BRAND.colors.alert }}>15% Discount</span> on your first consultation fee.
               </p>

               <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="relative">
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your professional email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-slate-200 p-4 pl-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#C9A86A]/30 transition-all font-bold text-sm text-[#0A1A2F] placeholder:text-slate-400"
                      style={{ '--tw-ring-color': `${BRAND.colors.secondary}4D` } as React.CSSProperties}
                    />
                 </div>
                 <button 
                   type="submit"
                   className="w-full text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                   style={{ backgroundColor: BRAND.colors.primary }}
                 >
                   <Download size={16} className="group-hover:animate-bounce" /> Claim Guide & Discount
                 </button>
               </form>
               <p className="text-[8px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest">
                  Confidential • No Spam • Instant PDF
               </p>
             </>
           )}
        </div>
      </div>
    </div>
  );
};

export default ExitIntentModal;