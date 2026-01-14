
import React from 'react';
import ContactForm from './ContactForm';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { BRAND } from '../constants';

const ContactPage: React.FC = () => {
  return (
    <div className="py-16 md:py-24 bg-slate-50 min-h-screen">
       <div className="max-w-7xl mx-auto px-6 w-full">
         <div className="text-center mb-16 md:mb-24">
            <span className="text-[#C9A86A] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-4">Global Reach, Local Presence</span>
            <h1 className="text-4xl md:text-6xl font-black text-[#0A1A2F] tracking-tighter mb-6">Visit Our Headquarters</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Located in the heart of Riyadh's financial district, our offices are designed to facilitate high-level consultations and strategic planning.
            </p>
         </div>

         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Contact Form Column */}
            <div className="order-2 lg:order-1">
               <ContactForm />
            </div>

            {/* Map & Location Info Column */}
            <div className="order-1 lg:order-2 space-y-8 sticky top-24">
               {/* Map Container */}
               <div className="bg-white p-3 rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden h-[500px] relative group">
                  <iframe 
                    title="SafaArban Location"
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    src="https://maps.google.com/maps?q=King%20Fahd%20Road%2C%20Al%20Olaya%2C%20Riyadh&t=m&z=15&ie=UTF8&iwloc=&output=embed"
                    className="rounded-[2.5rem] w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  ></iframe>
                  
                  {/* Overlay Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl p-6 rounded-3xl border border-slate-100 shadow-lg">
                     <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#0A1A2F] rounded-full flex items-center justify-center text-[#C9A86A] shrink-0 shadow-lg">
                           <MapPin size={24} />
                        </div>
                        <div>
                           <h4 className="font-black text-[#0A1A2F] text-xs uppercase tracking-widest mb-2">Riyadh Headquarters</h4>
                           <p className="text-slate-600 text-sm leading-relaxed font-bold mb-4">
                             {BRAND.contact.address}
                           </p>
                           <a 
                             href="https://maps.google.com/?q=King+Fahd+Road,+Al+Olaya,+Riyadh" 
                             target="_blank"
                             rel="noreferrer"
                             className="inline-flex items-center gap-2 text-[#006C35] font-black uppercase text-[10px] tracking-widest hover:underline"
                           >
                             <Navigation size={14} /> Get Directions
                           </a>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Office Hours / Info */}
               <div className="bg-[#0A1A2F] rounded-[3rem] p-10 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A86A] rounded-full blur-[60px] opacity-20"></div>
                  
                  <div className="relative z-10 flex items-start gap-6">
                     <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#C9A86A] shrink-0 border border-white/5">
                        <Clock size={28} />
                     </div>
                     <div>
                        <h4 className="font-black text-[#C9A86A] text-xs uppercase tracking-widest mb-4">Office Hours (KSA)</h4>
                        <ul className="space-y-3 text-sm font-medium text-slate-300">
                           <li className="flex justify-between w-full max-w-xs border-b border-white/10 pb-2">
                             <span>Sunday - Thursday</span>
                             <span className="text-white font-bold">9:00 AM - 6:00 PM</span>
                           </li>
                           <li className="flex justify-between w-full max-w-xs border-b border-white/10 pb-2">
                             <span>Saturday</span>
                             <span className="text-white font-bold">10:00 AM - 2:00 PM</span>
                           </li>
                           <li className="flex justify-between w-full max-w-xs pt-1 opacity-50">
                             <span>Friday</span>
                             <span>Closed</span>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
       </div>
    </div>
  );
};

export default ContactPage;
