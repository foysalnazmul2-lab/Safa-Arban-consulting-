
import React from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, cartCount }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'services' as Page, label: 'Services & Pricing' },
    { id: 'blog' as Page, label: 'Insights' },
    { id: 'about' as Page, label: 'About' },
    { id: 'contact' as Page, label: 'Contact' },
  ];

  return (
    <nav className="bg-[#0A1A2F] text-white sticky top-0 z-50 border-b border-white/5 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 md:h-24 items-center">
          {/* Brand */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => setActivePage('home')}
          >
            <div className="flex flex-col leading-tight">
              <div className="flex items-baseline tracking-tighter">
                <span className="text-2xl md:text-3xl font-bold text-white">SAFA</span>
                <span className="text-2xl md:text-3xl font-black text-[#C9A86A]">ARBAN</span>
              </div>
              <span className="text-[7px] md:text-[9px] font-bold text-white/40 tracking-[0.4em] uppercase group-hover:text-white/60 transition-colors">
                Premium Gateway
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`text-[13px] font-bold uppercase tracking-widest transition-all ${
                  activePage === link.id ? 'text-[#C9A86A]' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="h-6 w-px bg-white/10 mx-2"></div>

            <button 
              onClick={() => setActivePage('quotation')}
              className="relative p-2 text-white/70 hover:text-[#C9A86A] transition-colors"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A86A] text-[#0A1A2F] text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActivePage('services')}
              className="flex items-center gap-3 bg-[#006C35] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#C9A86A] hover:text-[#0A1A2F] transition-all shadow-xl"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="xl:hidden flex items-center gap-6">
             <button onClick={() => setActivePage('quotation')} className="relative p-2">
                <ShoppingCart size={24} />
                {cartCount > 0 && <span className="absolute top-0 right-0 bg-[#C9A86A] text-[#0A1A2F] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{cartCount}</span>}
             </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-[#0A1A2F] border-t border-white/5 h-screen py-8 px-6 space-y-6 animate-in slide-in-from-top duration-300 fixed inset-0 top-20 z-50 overflow-y-auto">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActivePage(link.id); setIsOpen(false); }}
              className={`block w-full text-left text-xl font-black tracking-tight py-4 border-b border-white/5 ${
                activePage === link.id ? 'text-[#C9A86A]' : 'text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => { setActivePage('services'); setIsOpen(false); }}
            className="w-full bg-[#006C35] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm mt-4 shadow-lg"
          >
            Start Business
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
