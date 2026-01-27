
import React, { useState } from 'react';
import { Page } from '../types';
import { BRAND } from '../constants';
import { Linkedin, Twitter, Instagram, ShieldCheck, QrCode, Mail, Loader2, Check, ArrowUpRight } from 'lucide-react';
import { SafaArbanLogo } from './Logo';

interface FooterProps {
  setActivePage: (page: Page) => void;
  onServiceClick?: (slug: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActivePage, onServiceClick }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    setTimeout(() => {
        setStatus('success');
        setEmail('');
    }, 1500);
  };

  const handleServiceClick = (slug: string) => {
    if (onServiceClick) {
      onServiceClick(slug);
      window.scrollTo(0, 0);
    } else {
      setActivePage('services');
    }
  };

  return (
    <footer className="bg-[#05101A] text-white pt-32 pb-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
             <div className="cursor-pointer" onClick={() => setActivePage('home')}>
              <SafaArbanLogo className="h-12 w-auto" variant="white" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your elite partner for Business Setup in Saudi Arabia. We specialize in MISA Licensing, 100% Foreign Ownership, and Corporate Governance aligned with Vision 2030.
            </p>
            
            <div className="flex items-center gap-4">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <QrCode size={32} className="text-white" />
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">MISA Certified</p>
                    <p className="font-mono text-sm text-brand-accent">{BRAND.contact.cr}</p>
                </div>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-lg mb-8">Services</h4>
            <ul className="space-y-4">
               {[
                 { label: 'MISA Licensing', slug: 'misa-license' },
                 { label: 'Regional HQ', slug: 'rhq-setup' },
                 { label: 'Industrial', slug: 'sec-01' },
                 { label: 'Premium Residency', slug: 'investor-visa' }
               ].map((item) => (
                 <li key={item.slug}>
                   <button onClick={() => handleServiceClick(item.slug)} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                      {item.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                   </button>
                 </li>
               ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-lg mb-8">Regulatory Briefing</h4>
            <p className="text-slate-400 text-sm mb-6">Stay ahead of Vision 2030 reforms. Weekly intelligence delivered to your inbox.</p>
            
            <div className="relative">
                <input 
                    type="email" 
                    placeholder="Corporate Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'success'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-secondary transition-all"
                />
                <button 
                    onClick={handleSubscribe}
                    disabled={status !== 'idle'}
                    className="absolute right-2 top-2 bottom-2 px-4 bg-brand-secondary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors flex items-center justify-center min-w-[80px]"
                >
                    {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : status === 'success' ? <Check size={16} /> : 'Join'}
                </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-xs text-slate-500 font-medium">
             © 2026 SafaArban Ltd. All Rights Reserved.
           </div>
           
           <div className="flex gap-6">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                 <a key={i} href="#" className="text-slate-500 hover:text-white transition-colors">
                    <Icon size={20} />
                 </a>
               ))}
           </div>

           <div className="flex gap-6 items-center">
              <button onClick={() => setActivePage('privacy')} className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setActivePage('terms')} className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</button>
              <button onClick={() => setActivePage('agreement-generator')} className="text-xs font-bold text-[#E94E4E] hover:text-white transition-colors bg-white/5 px-3 py-1 rounded">AI Agreements</button>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
