
import React from 'react';
import { Page } from '../types';
import { BRAND } from '../constants';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Globe } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: Page) => void;
  onServiceClick?: (slug: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActivePage, onServiceClick }) => {
  
  const handleServiceClick = (slug: string) => {
    if (onServiceClick) {
      onServiceClick(slug);
      window.scrollTo(0, 0);
    } else {
      setActivePage('services');
    }
  };

  return (
    <footer className="bg-[#0A1A2F] text-white pt-20 pb-10 border-t border-white/5 no-print">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
             <div className="flex flex-col leading-tight cursor-pointer" onClick={() => setActivePage('home')}>
              <span className="text-3xl font-black tracking-tighter text-white">
                SAFA<span className="text-[#C9A86A]">ARBAN</span>
              </span>
              <span className="text-[9px] font-bold text-white/40 tracking-[0.4em] uppercase">
                Premium Gateway
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your elite partner for Business Setup in Saudi Arabia. We specialize in MISA Licensing, 100% Foreign Ownership, and Corporate Governance aligned with Vision 2030.
            </p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A86A] hover:text-[#0A1A2F] transition-all"><Linkedin size={18} /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A86A] hover:text-[#0A1A2F] transition-all"><Twitter size={18} /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A86A] hover:text-[#0A1A2F] transition-all"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-[#C9A86A] font-black uppercase tracking-widest text-xs mb-8">Core Services</h4>
            <ul className="space-y-4 text-sm text-slate-400">
               <li><button onClick={() => handleServiceClick('misa-license')} className="hover:text-white transition-colors text-left">MISA Investment License</button></li>
               <li><button onClick={() => handleServiceClick('foreign-ownership')} className="hover:text-white transition-colors text-left">100% Foreign Ownership</button></li>
               <li><button onClick={() => handleServiceClick('rhq-setup')} className="hover:text-white transition-colors text-left">Regional HQ (RHQ) Setup</button></li>
               <li><button onClick={() => handleServiceClick('commercial-registration')} className="hover:text-white transition-colors text-left">Commercial Registration (CR)</button></li>
               <li><button onClick={() => handleServiceClick('investor-visa')} className="hover:text-white transition-colors text-left">Investor Visa & Iqama</button></li>
               <li><button onClick={() => handleServiceClick('bank-opening')} className="hover:text-white transition-colors text-left">Bank Account Opening</button></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C9A86A] font-black uppercase tracking-widest text-xs mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
               <li><button onClick={() => setActivePage('home')} className="hover:text-white transition-colors">Home</button></li>
               <li><button onClick={() => setActivePage('about')} className="hover:text-white transition-colors">About</button></li>
               <li><button onClick={() => setActivePage('services')} className="hover:text-white transition-colors">Services</button></li>
               <li><button onClick={() => setActivePage('blog')} className="hover:text-white transition-colors">Blog</button></li>
               <li><button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-[#C9A86A] font-black uppercase tracking-widest text-xs mb-8">Riyadh HQ</h4>
            <ul className="space-y-6 text-sm text-slate-400">
               <li className="flex items-start gap-4">
                  <MapPin className="text-[#006C35] shrink-0 mt-1" size={18} />
                  <span>{BRAND.contact.address}</span>
               </li>
               <li className="flex items-center gap-4">
                  <Phone className="text-[#C9A86A] shrink-0" size={18} />
                  <span>{BRAND.contact.phone}</span>
               </li>
               <li className="flex items-center gap-4">
                  <Mail className="text-[#E9443E] shrink-0" size={18} />
                  <span>{BRAND.contact.email}</span>
               </li>
               <li className="flex items-center gap-4">
                  <Globe className="text-slate-500 shrink-0" size={18} />
                  <span>CR: {BRAND.contact.cr}</span>
               </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom / SEO Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
             © {new Date().getFullYear()} {BRAND.fullName}. All Rights Reserved.
           </p>
           <div className="flex gap-6">
              <button onClick={() => setActivePage('privacy')} className="text-[10px] text-slate-700 uppercase font-bold hover:text-slate-400 transition-colors">Privacy Policy</button>
              <button onClick={() => setActivePage('terms')} className="text-[10px] text-slate-700 uppercase font-bold hover:text-slate-400 transition-colors">Terms of Service</button>
           </div>
        </div>
        
        {/* Hidden SEO Keywords Block */}
        <div className="mt-8 pt-8 border-t border-white/5 text-[9px] text-[#0A1A2F] text-center select-none opacity-0 h-0 overflow-hidden">
           Business setup Saudi Arabia • MISA License Cost • Saudi Company Formation • Investor Visa KSA • Riyadh Business Gateway • 100% Foreign Ownership Saudi Arabia • Vision 2030 Investment • Saudi Commercial Registration • Corporate Tax Saudi Arabia • PRO Services Riyadh
        </div>
      </div>
    </footer>
  );
};

export default Footer;
