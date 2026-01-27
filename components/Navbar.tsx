
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, Globe, User, LogIn, DollarSign, ChevronDown } from 'lucide-react';
import { Page } from '../types.ts';
import { BRAND } from '../constants.ts';
import { SafaArbanLogo } from './Logo.tsx';
import { useLanguage } from '../LanguageContext';

interface NavbarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  cartCount: number;
  onOpenTracker?: () => void;
  currency?: 'SAR' | 'USD';
  onToggleCurrency?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, cartCount, onOpenTracker, currency = 'SAR', onToggleCurrency }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home' as Page, labelKey: 'nav_home' },
    { id: 'services' as Page, labelKey: 'nav_services' },
    { id: 'about' as Page, labelKey: 'nav_about' },
    { id: 'blog' as Page, labelKey: 'nav_insights' },
    { id: 'contact' as Page, labelKey: 'nav_contact' },
  ];

  const handleNavigation = (id: Page) => {
    setIsOpen(false);
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 no-print ${
          scrolled 
          ? 'py-3 px-4 md:px-8' 
          : 'py-6 px-6 md:px-12'
        }`}
      >
        <div 
          className={`max-w-7xl mx-auto rounded-full transition-all duration-500 ${
            scrolled 
            ? 'bg-brand-dark/90 backdrop-blur-xl border border-white/10 shadow-2xl px-6 py-3' 
            : 'bg-transparent px-0 py-2'
          }`}
        >
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            
            {/* Brand Logo */}
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => handleNavigation('home')}
            >
              <SafaArbanLogo className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-[1.02]" variant="white" />
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8 rtl:flex-row-reverse">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigation(link.id)}
                  className={`relative text-xs font-bold uppercase tracking-widest transition-all duration-300 group ${
                    activePage === link.id 
                    ? 'text-brand-secondary' 
                    : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t(link.labelKey as any)}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-secondary transform transition-transform duration-300 origin-left ${activePage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4 rtl:flex-row-reverse">
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                   <button onClick={toggleLanguage} className="text-[10px] font-black uppercase text-slate-300 hover:text-white transition-colors">
                       {lang}
                   </button>
                   <div className="w-px h-3 bg-white/10"></div>
                   {onToggleCurrency && (
                       <button onClick={onToggleCurrency} className="text-[10px] font-black uppercase text-slate-300 hover:text-white transition-colors">
                           {currency}
                       </button>
                   )}
               </div>

               <button 
                 onClick={onOpenTracker}
                 className="p-2 text-slate-300 hover:text-white transition-colors"
                 title={t('nav_portal')}
               >
                 <User size={18} />
               </button>

               <button 
                 onClick={() => setActivePage('quotation')}
                 className="relative p-2 text-slate-300 hover:text-white transition-colors group"
               >
                 <ShoppingCart size={18} />
                 {cartCount > 0 && (
                   <span className="absolute -top-1 -right-1 h-4 w-4 bg-brand-secondary text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                     {cartCount}
                   </span>
                 )}
               </button>

               <button 
                 onClick={() => handleNavigation('services')}
                 className="bg-brand-secondary hover:bg-red-600 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-red-900/20 active:scale-95"
               >
                 {t('nav_start')}
               </button>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center gap-4">
               <button 
                  onClick={() => setActivePage('quotation')} 
                  className="relative p-2 text-slate-300 hover:text-white"
               >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-brand-secondary rounded-full border border-brand-dark"></span>
                  )}
               </button>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 text-white"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-brand-dark transition-all duration-500 lg:hidden flex flex-col pt-32 px-8 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-4">
          {navLinks.map((link, idx) => (
            <button
              key={link.id}
              onClick={() => handleNavigation(link.id)}
              className="block w-full text-left text-3xl font-serif text-white hover:text-brand-secondary transition-colors"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {t(link.labelKey as any)}
            </button>
          ))}
        </div>
        
        <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-2 gap-4">
           <button onClick={toggleLanguage} className="flex items-center gap-2 text-slate-400 hover:text-white">
               <Globe size={16} /> {lang === 'EN' ? 'Arabic' : 'English'}
           </button>
           <button onClick={onOpenTracker} className="flex items-center gap-2 text-slate-400 hover:text-white">
               <User size={16} /> Portal
           </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
