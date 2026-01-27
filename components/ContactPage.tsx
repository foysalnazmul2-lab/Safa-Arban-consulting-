
import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import BookingCalendar from './BookingCalendar';
import CorporateProfile from './CorporateProfile';
import { 
  MapPin, 
  Navigation, 
  Download, 
  Mail, 
  Phone, 
  Sun, 
  Moon, 
  Copy, 
  Check,
  Cpu,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BRAND } from '../constants';

const RiyadhLiveStatus = () => {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  // Calculate Riyadh Time (GMT+3)
  const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
  const riyadhOffset = 3 * 60 * 60000;
  const riyadhTime = new Date(utc + riyadhOffset);
  
  const hour = riyadhTime.getHours();
  const isOpen = hour >= 9 && hour < 18 && riyadhTime.getDay() !== 5 && riyadhTime.getDay() !== 6; // Closed Fri/Sat
  const isNight = hour >= 18 || hour < 6;

  return (
    <div className="bg-slate-800/50 border border-white/5 rounded-[2rem] p-6 relative overflow-hidden group hover:bg-slate-800 transition-colors">
       <div className="flex justify-between items-start relative z-10">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                   {isOpen ? 'HQ Online' : 'HQ Offline'}
                </span>
             </div>
             <p className="text-4xl font-mono font-black text-white tracking-tighter">
                {riyadhTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
             </p>
             <p className="text-xs text-slate-500 mt-1 font-bold uppercase tracking-wider">Riyadh, KSA (GMT+3)</p>
          </div>
          <div className="text-right">
             {isNight ? <Moon className="text-blue-200 mb-2" size={24} /> : <Sun className="text-amber-400 mb-2" size={24} />}
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
               {isOpen ? 'Open for Business' : 'After Hours'}
             </p>
          </div>
       </div>
    </div>
  );
};

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
       {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
    </button>
  );
};

const ContactPage: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1120] relative font-sans overflow-hidden">
       
       {/* Background Ambient Effects */}
       <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
       <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.accent }}></div>
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
             <div>
                <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.secondary }}>Global Operations</span>
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
                   Connect with <br/> The Capital.
                </h1>
             </div>
             
             {/* Contact Chips */}
             <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
                   <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400"><Phone size={20} /></div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unified Number</p>
                      <p className="text-white font-bold">{BRAND.contact.phone}</p>
                   </div>
                   <CopyButton text={BRAND.contact.phone} />
                </div>
                <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
                   <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400"><Mail size={20} /></div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Inquiries</p>
                      <p className="text-white font-bold">{BRAND.contact.email}</p>
                   </div>
                   <CopyButton text={BRAND.contact.email} />
                </div>
             </div>
          </div>

          <div className="grid xl:grid-cols-12 gap-8 items-start">
             
             {/* LEFT COLUMN: Message & Status (5 Columns) */}
             <div className="xl:col-span-5 space-y-8">
                <RiyadhLiveStatus />
                
                <div className="relative">
                   <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[4.2rem] opacity-20 blur-lg"></div>
                   <ContactForm />
                </div>

                {/* HQ Address Card */}
                <div className="bg-slate-800/50 border border-white/5 rounded-[2.5rem] p-8 hover:bg-slate-800 transition-all group">
                   <div className="flex items-start gap-6">
                      <div className="p-4 bg-[#F26522]/10 rounded-2xl text-[#F26522] shrink-0 group-hover:scale-110 transition-transform">
                         <MapPin size={24} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Global Headquarters</p>
                         <p className="text-lg font-bold text-white leading-snug mb-4">{BRAND.contact.address}</p>
                         <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-[#F26522] hover:text-white transition-colors">
                            View on Google Maps <Navigation size={12} />
                         </a>
                      </div>
                   </div>
                </div>
             </div>

             {/* RIGHT COLUMN: Calendar & Tools (7 Columns) */}
             <div className="xl:col-span-7 space-y-8">
                
                {/* Build Your Profile Banner */}
                <div className="relative rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-2xl group cursor-pointer border border-white/10"
                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Simplified action: scrolls to top or could route to wizard
                >
                   <div className="absolute inset-0 bg-gradient-to-r from-[#F26522] to-[#F2D696] opacity-90 transition-opacity group-hover:opacity-100"></div>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                   <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div>
                         <div className="flex items-center gap-2 mb-2">
                            <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-2">
                               <Cpu size={12} /> AI Architect
                            </span>
                         </div>
                         <h3 className="text-3xl font-black text-white mb-2">Build Your Profile</h3>
                         <p className="text-white/80 font-medium text-sm max-w-sm">
                            Not ready to chat? Use our automated setup wizard to generate a custom roadmap.
                         </p>
                      </div>
                      <button className="bg-white text-[#F26522] px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-lg hover:bg-slate-50 transition-transform hover:scale-105 flex items-center gap-2 whitespace-nowrap">
                         Launch Wizard <Sparkles size={16} />
                      </button>
                   </div>
                </div>

                {/* Booking Calendar */}
                <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-700/50">
                   <BookingCalendar />
                </div>

                {/* Corporate Profile Download */}
                <div 
                  onClick={() => setIsProfileOpen(true)}
                  className="bg-[#051C2C] border border-white/10 rounded-[2.5rem] p-8 flex items-center justify-between hover:bg-[#0A263C] transition-all cursor-pointer group"
                >
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-white transition-colors border border-white/5">
                         <Download size={32} />
                      </div>
                      <div>
                         <h4 className="text-xl font-black text-white mb-1">Corporate Profile</h4>
                         <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">2026 Capability Statement • PDF</p>
                      </div>
                   </div>
                   <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#051C2C] transition-all">
                      <ArrowRight size={20} />
                   </div>
                </div>

             </div>
          </div>
       </div>

       <CorporateProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default ContactPage;
