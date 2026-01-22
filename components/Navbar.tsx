
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, Globe, User, LogIn, DollarSign } from 'lucide-react';
import { Page } from '../types';
import { BRAND } from '../constants';

interface NavbarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  cartCount: number;
  onOpenTracker?: () => void;
  currency?: 'SAR' | 'USD';
  onToggleCurrency?: () => void;
}

export const SafaArbanLogo = ({ className = "h-12" }: { className?: string }) => (
  <svg viewBox="0 0 320 84" className={className} xmlns="http://www.w3.org/2000/svg" fill="none" aria-label="SafaArban Logo">
    {/* Symbol: Abstract "S" formed by two interlocking geometric shapes */}
    <g transform="translate(4, 4)">
        {/* Top Shape (Coral Orange) */}
       <path d="M45 10 L75 10 L55 35 L25 35 Z" fill="#F26522" />
       
       {/* Bottom Shape (Deep Navy) */}
       <path d="M25 40 L55 40 L45 65 L15 65 Z" fill="#051C2C" />
    </g>

    {/* Typography */}
    <g transform="translate(90, 52)">
       <text fontFamily="Inter, sans-serif" fontWeight="800" fontSize="42" fill="#051C2C" letterSpacing="-0.02em">SAFA</text>
       <text x="115" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="42" fill="#051C2C" letterSpacing="-0.02em">ARBAN</text>
       <text x="2" y="24" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="9.5" fill="#F26522" letterSpacing="0.38em" style={{textTransform: 'uppercase'}}>Ltd</text>
    </g>
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, cartCount, onOpenTracker, currency = 'SAR', onToggleCurrency }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'services' as Page, label: 'Services' },
    { id: 'blog' as Page, label: 'Insights' },
    { id: 'about' as Page, label: 'About' },
    { id: 'contact' as Page, label: 'Contact' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 no-print border-b ${
      scrolled 
      ? `bg-white/95 backdrop-blur-xl border-slate-200 shadow-lg py-0` 
      : `bg-white border-transparent py-3`
    }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Brand Logo */}
          <div 
            className="flex items-center cursor-pointer group py-2" 
            onClick={() => setActivePage('home')}
          >
            <SafaArbanLogo className="h-9 md:h-11 w-auto transition-transform duration-300 group-hover:scale-[1.02]" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`relative text-[11px] font-bold uppercase tracking-[0.15em] py-2 transition-all duration-300 group overflow-hidden ${
                  activePage === link.id ? `text-[${BRAND.colors.secondary}]` : 'text-slate-500 hover:text-[#051C2C]'
                }`}
                style={{ color: activePage === link.id ? BRAND.colors.secondary : undefined }}
              >
                <span className="relative z-10">{link.label}</span>
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-300 origin-center ${activePage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}
                  style={{ backgroundColor: BRAND.colors.secondary }}
                ></span>
              </button>
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <div className="flex items-center gap-3">
               {/* Language Toggle */}
               <button 
                 onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
                 className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#051C2C] transition-colors"
               >
                 <Globe size={12} /> {lang}
               </button>

               {/* Currency Toggle */}
               {onToggleCurrency && (
                 <button 
                   onClick={onToggleCurrency}
                   className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[${BRAND.colors.secondary}] transition-colors"
                   style={{ '--hover-color': BRAND.colors.secondary } as React.CSSProperties}
                 >
                   <DollarSign size={12} /> {currency}
                 </button>
               )}

               {/* Client Portal */}
               <button 
                 onClick={onOpenTracker}
                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group active:scale-95"
               >
                 <User size={12} style={{ color: BRAND.colors.secondary }} />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-[#051C2C]">Portal</span>
               </button>

               <button 
                 onClick={() => setActivePage('quotation')}
                 className="relative p-2.5 rounded-full bg-slate-50 hover:text-[#0A1A2F] text-slate-600 transition-all duration-300 group border border-slate-200 active:scale-95"
                 aria-label="View Quotation"
               >
                 <ShoppingCart size={16} />
                 {cartCount > 0 && (
                   <span className="absolute -top-1 -right-1 text-white text-[9px] font-black rounded-full h-3.5 w-3.5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: BRAND.colors.secondary }}>
                     {cartCount}
                   </span>
                 )}
               </button>

               <button 
                 onClick={() => setActivePage('services')}
                 className="text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-[0_0_20px_rgba(242,101,34,0.3)] transform hover:-translate-y-0.5 border active:scale-95"
                 style={{ 
                   backgroundColor: BRAND.colors.secondary,
                   borderColor: BRAND.colors.secondary
                 }}
               >
                 Start Setup
               </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="xl:hidden flex items-center gap-4">
             <button 
                onClick={() => setActivePage('quotation')} 
                className="relative p-2 text-slate-600 hover:text-[${BRAND.colors.secondary}] transition-colors"
                style={{ color: BRAND.colors.primary }}
             >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: BRAND.colors.secondary }}>
                    {cartCount}
                  </span>
                )}
             </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-[#051C2C] transition-colors hover:bg-slate-100 rounded-lg active:scale-90"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 xl:hidden flex flex-col pt-24 px-8 ${
          isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        style={{ backgroundColor: `white` }}
      >
        <div className="space-y-2">
          {navLinks.map((link, idx) => (
            <button
              key={link.id}
              onClick={() => { setActivePage(link.id); setIsOpen(false); }}
              className={`block w-full text-left text-2xl font-black tracking-tighter py-4 border-b border-slate-100 transition-all duration-300 active:scale-98 ${
                activePage === link.id ? 'translate-x-4' : 'text-[#051C2C] hover:text-slate-500'
              }`}
              style={{ 
                color: activePage === link.id ? BRAND.colors.secondary : '#051C2C',
                transitionDelay: `${idx * 50}ms` 
              }}
            >
              {link.label}
            </button>
          ))}
          
          <div className="pt-8 grid grid-cols-2 gap-4">
             <button 
               onClick={() => { onOpenTracker && onOpenTracker(); setIsOpen(false); }}
               className="flex items-center justify-center gap-2 py-4 bg-slate-50 rounded-2xl text-[#051C2C] font-bold text-xs uppercase tracking-widest border border-slate-100 active:bg-slate-100"
             >
               <LogIn size={16} style={{ color: BRAND.colors.secondary }} /> Client Portal
             </button>
             {onToggleCurrency && (
               <button 
                 onClick={onToggleCurrency}
                 className="flex items-center justify-center gap-2 py-4 bg-slate-50 rounded-2xl text-[#051C2C] font-bold text-xs uppercase tracking-widest border border-slate-100 active:bg-slate-100"
               >
                 <DollarSign size={16} style={{ color: BRAND.colors.secondary }} /> {currency}
               </button>
             )}
          </div>

          <button 
            onClick={() => { setActivePage('services'); setIsOpen(false); }}
            className="w-full text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm mt-6 shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
            style={{ backgroundColor: BRAND.colors.secondary }}
          >
            Start Your Business
          </button>
        </div>
        
        <div className="mt-auto pb-10 flex flex-col items-center">
          <SafaArbanLogo className="h-8 w-auto opacity-50 mb-4" />
          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest text-center">
            Riyadh • London • Dubai
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
