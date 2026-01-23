
import React, { useState } from 'react';
import ContactForm from './ContactForm';
import BookingCalendar from './BookingCalendar';
import CorporateProfile from './CorporateProfile';
import { MapPin, Navigation, MessageSquare, Calendar as CalendarIcon, Download, FileText, ArrowRight, Mail, Phone } from 'lucide-react';
import { BRAND } from '../constants';

const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'message' | 'booking'>('message');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 relative">
       {/* Background split for large screens */}
       <div className="hidden lg:block absolute left-0 top-0 w-[45%] h-full bg-[#051C2C] z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-[#006C35]/20 to-transparent"></div>
       </div>

       <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 min-h-screen">
             
             {/* Left Panel: Info & Corporate Profile */}
             <div 
               className="lg:col-span-5 text-white py-20 px-8 lg:px-16 flex flex-col justify-center lg:sticky lg:top-0 lg:h-screen overflow-y-auto no-scrollbar bg-[#051C2C] lg:bg-transparent"
             >
                
                <div className="mb-12">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest mb-6 text-[#F26522]">
                      <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse"></span> Open for Business
                   </div>
                   <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
                      Let's Build <br/> Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#F2D696]">Legacy.</span>
                   </h1>
                   <p className="text-slate-400 text-lg leading-relaxed font-medium">
                      Whether you need immediate MISA licensing or long-term strategic advisory, our Riyadh team is ready to deploy.
                   </p>
                </div>

                {/* Corporate Profile Card - High Emphasis */}
                <div 
                  onClick={() => setIsProfileOpen(true)}
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:border-[#F26522]/50 mb-12 overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity text-[#F26522]">
                      <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                   </div>
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F26522] to-[#c04d19] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                         <FileText size={24} className="text-white" />
                      </div>
                      <div>
                         <h3 className="font-bold text-lg leading-none mb-1">Corporate Profile</h3>
                         <p className="text-xs text-slate-400 mb-2">2026 Capability Statement</p>
                         <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#F26522]">
                            <Download size={12} /> Download PDF
                         </span>
                      </div>
                   </div>
                </div>

                {/* Contact Details Grid */}
                <div className="space-y-8">
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Headquarters</h4>
                      <div className="flex items-start gap-4">
                         <MapPin className="text-[#F26522] shrink-0 mt-1" size={20} />
                         <div>
                            <p className="font-bold text-lg leading-tight">{BRAND.contact.address}</p>
                            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-white mt-2 inline-flex items-center gap-1 transition-colors">
                               <Navigation size={12} /> Get Directions
                            </a>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-8">
                      <div>
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Direct Line</h4>
                         <div className="flex items-center gap-3">
                            <Phone className="text-[#F26522]" size={20} />
                            <a href={`tel:${BRAND.contact.phone}`} className="font-bold hover:text-[#F26522] transition-colors">{BRAND.contact.phone}</a>
                         </div>
                      </div>
                      <div>
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Email</h4>
                         <div className="flex items-center gap-3">
                            <Mail className="text-[#F26522]" size={20} />
                            <a href={`mailto:${BRAND.contact.email}`} className="font-bold hover:text-[#F26522] transition-colors">hello@safaarban.com</a>
                         </div>
                      </div>
                   </div>
                </div>

             </div>

             {/* Right Panel: Interactive Forms */}
             <div className="lg:col-span-7 py-20 px-6 lg:px-16 flex flex-col justify-center bg-slate-50">
                
                {/* Custom Tab Switcher */}
                <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex w-full md:w-auto mb-10">
                   <button 
                     onClick={() => setActiveTab('message')}
                     className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                       activeTab === 'message' 
                       ? 'bg-[#051C2C] text-white shadow-md' 
                       : 'text-slate-400 hover:bg-slate-50 hover:text-[#051C2C]'
                     }`}
                   >
                      <MessageSquare size={16} /> Send Message
                   </button>
                   <button 
                     onClick={() => setActiveTab('booking')}
                     className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                       activeTab === 'booking' 
                       ? 'bg-[#051C2C] text-white shadow-md' 
                       : 'text-slate-400 hover:bg-slate-50 hover:text-[#051C2C]'
                     }`}
                   >
                      <CalendarIcon size={16} /> Book Calendar
                   </button>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                   {activeTab === 'message' ? (
                      <ContactForm />
                   ) : (
                      <BookingCalendar />
                   )}
                </div>

                {/* Trust Footer in Right Panel */}
                <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Ministry_of_Investment_%28Saudi_Arabia%29_Logo.svg" alt="MISA" className="h-8" />
                   <div className="h-4 w-px bg-slate-300"></div>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Ministry_of_Commerce_%28Saudi_Arabia%29_Logo.svg" alt="MC" className="h-8" />
                   <div className="h-4 w-px bg-slate-300"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Licensed Partner</span>
                </div>

             </div>
          </div>
       </div>

       <CorporateProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default ContactPage;
