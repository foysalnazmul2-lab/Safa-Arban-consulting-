
import React from 'react';
import { Page } from '../types';
import { BRAND } from '../constants';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Globe, ArrowRight } from 'lucide-react';
import { SafaArbanLogo } from './Navbar';

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
    <footer className="text-white pt-24 pb-12 border-t border-white/5 no-print relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${BRAND.colors.secondary}, ${BRAND.colors.accent})` }}></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8 pr-8">
             <div className="flex flex-col leading-tight cursor-pointer group w-fit" onClick={() => setActivePage('home')}>
              {/* White Version of Logo for Footer */}
              <svg viewBox="0 0 320 84" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
                <g transform="translate(4, 4)">
                   <path d="M45 10 L75 10 L55 35 L25 35 Z" fill="#F26522" />
                   <path d="M25 40 L55 40 L45 65 L15 65 Z" fill="white" />
                </g>
                <g transform="translate(90, 52)">
                   <text fontFamily="Inter, sans-serif" fontWeight="800" fontSize="42" fill="white" letterSpacing="-0.02em">SAFA</text>
                   <text x="115" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="42" fill="white" letterSpacing="-0.02em">ARBAN</text>
                   <text x="2" y="24" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="9.5" fill="#F26522" letterSpacing="0.38em" style={{textTransform: 'uppercase'}}>Ltd</text>
                </g>
              </svg>
              <span className="text-[9px] font-bold text-white/40 tracking-[0.4em] uppercase transition-colors mt-2" style={{ color: `hover:${BRAND.colors.secondary}` }}>
                Premium Gateway
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Your elite partner for Business Setup in Saudi Arabia. We specialize in MISA Licensing, 100% Foreign Ownership, and Corporate Governance aligned with Vision 2030.
            </p>
            <div className="flex gap-4">
               {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all border border-white/5" style={{ borderColor: `hover:${BRAND.colors.secondary}`, color: `hover:${BRAND.colors.primary}`, backgroundColor: `hover:${BRAND.colors.secondary}` }}>
                    <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h4 className="font-black uppercase tracking-widest text-xs mb-8" style={{ color: BRAND.colors.secondary }}>Core Services</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
               {[
                 { label: 'MISA Investment License', slug: 'misa-license' },
                 { label: '100% Foreign Ownership', slug: 'foreign-ownership' },
                 { label: 'Regional HQ (RHQ) Setup', slug: 'rhq-setup' },
                 { label: 'Commercial Registration', slug: 'commercial-registration' },
                 { label: 'Investor Visa & Iqama', slug: 'investor-visa' }
               ].map((item) => (
                 <li key={item.slug}>
                   <button onClick={() => handleServiceClick(item.slug)} className="hover:text-white transition-colors text-left flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: BRAND.colors.secondary }}></span>
                      {item.label}
                   </button>
                 </li>
               ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-black uppercase tracking-widest text-xs mb-8" style={{ color: BRAND.colors.secondary }}>Company</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
               {['Home', 'About', 'Services', 'Insights', 'Contact'].map((item) => (
                 <li key={item}>
                   <button onClick={() => setActivePage(item.toLowerCase() === 'insights' ? 'blog' : item.toLowerCase() as any)} className="hover:text-white transition-colors text-left group flex items-center gap-2">
                      {item} <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                   </button>
                 </li>
               ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="font-black uppercase tracking-widest text-xs mb-8" style={{ color: BRAND.colors.secondary }}>Riyadh HQ</h4>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
               <div className="flex items-start gap-4">
                  <MapPin style={{ color: BRAND.colors.secondary }} className="shrink-0 mt-1" size={18} />
                  <span className="text-sm text-slate-300 font-medium">{BRAND.contact.address}</span>
               </div>
               <div className="flex items-center gap-4">
                  <Phone style={{ color: BRAND.colors.secondary }} className="shrink-0" size={18} />
                  <span className="text-sm text-slate-300 font-medium font-mono">{BRAND.contact.phone}</span>
               </div>
               <div className="flex items-center gap-4">
                  <Mail className="shrink-0" size={18} style={{ color: BRAND.colors.secondary }} />
                  <span className="text-sm text-slate-300 font-medium">{BRAND.contact.email}</span>
               </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-mono pl-2">
               <Globe size={12} /> CR: {BRAND.contact.cr}
            </div>
          </div>

        </div>

        {/* Footer Bottom / SEO Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
             © {new Date().getFullYear()} {BRAND.fullName}. All Rights Reserved.
           </p>
           <div className="flex gap-8">
              <button onClick={() => setActivePage('privacy')} className="text-[10px] text-slate-600 uppercase font-bold hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setActivePage('terms')} className="text-[10px] text-slate-600 uppercase font-bold hover:text-white transition-colors">Terms of Service</button>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
