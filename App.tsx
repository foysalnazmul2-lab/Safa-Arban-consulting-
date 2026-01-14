
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Quotation from './components/Quotation';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import Blog from './components/Blog';
import PaymentAuth from './components/PaymentAuth';
import ServiceDetails from './components/ServiceDetails';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Home from './components/Home';
import About from './components/About';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import { Page, CartItem, CorePageContent } from './types';
import { SERVICES_DB, CORE_SERVICES_CONTENT } from './constants';
import { CheckCircle } from 'lucide-react';

const CATEGORY_IMAGES: Record<string, string> = {
  'Ministry of Investment': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000',
  'Ministry of Commerce': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000',
  'Qiwa / HR': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000',
  'ZATCA & Tax Compliance': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000',
  'GOSI': 'https://images.unsplash.com/photo-1542315187-b95222272825?q=80&w=2000',
  'Passports / Muqeem': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000',
  'default': 'https://images.unsplash.com/photo-1596627689102-b2f7a012d98b?q=80&w=2000'
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [cart, setCart] = useState<string[]>([]);
  const [orderId, setOrderId] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [activeServiceSlug, setActiveServiceSlug] = useState<string>('');
  const [isServicesLoading, setIsServicesLoading] = useState(false);

  useEffect(() => {
    // Generate a sequential invoice number if not set
    if (!orderId) {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
      
      // Use localStorage to maintain a running counter for the "sequential" effect
      const storedCounter = localStorage.getItem('safaarban_quote_counter');
      let counter = storedCounter ? parseInt(storedCounter, 10) : 1000;
      counter++;
      localStorage.setItem('safaarban_quote_counter', counter.toString());
      
      setOrderId(`QT-${dateStr}-${counter}`);
    }
    
    window.scrollTo(0, 0);

    if (activePage === 'services') {
      setIsServicesLoading(true);
      const timer = setTimeout(() => setIsServicesLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [activePage, activeServiceSlug, orderId]);

  const toggleCartItem = (serviceId: string) => {
    setCart(prev => {
      const isAdding = !prev.includes(serviceId);
      if (isAdding) {
        const service = SERVICES_DB.find(s => s.id === serviceId);
        setNotification(`${service?.name} added to quote`);
        setTimeout(() => setNotification(null), 3000);
        return [...prev, serviceId];
      } else {
        return prev.filter(id => id !== serviceId);
      }
    });
  };

  const navigateToServiceDetail = (slug: string) => {
    setActiveServiceSlug(slug);
    setActivePage('service-details');
    window.scrollTo(0, 0);
  };

  const getServiceContent = (slug: string): CorePageContent | null => {
    // 1. Check if it's a core content page
    if (CORE_SERVICES_CONTENT[slug]) {
      return CORE_SERVICES_CONTENT[slug];
    }
    
    // 2. Check if it's a standard service in DB
    const service = SERVICES_DB.find(s => s.id === slug);
    if (service) {
      return {
        slug: service.id,
        title: service.name,
        subtitle: service.category,
        heroImage: CATEGORY_IMAGES[service.category] || CATEGORY_IMAGES['default'],
        overview: service.desc,
        features: [
          // Map Inclusions
          ...(service.inclusions || []).map(inc => ({
            title: inc,
            desc: "Included in standard professional fee package."
          })),
          {
            title: "Government Fee Estimate",
            desc: `Approx. ${service.governmentFee.toLocaleString()} SAR payable directly to authorities.`
          }
        ],
        cta: "Add to Quote"
      };
    }

    return null;
  };

  const getCartItems = (): CartItem[] => {
    return SERVICES_DB.filter(s => cart.includes(s.id)).map(s => ({ ...s, quantity: 1 }));
  };

  const calculateTotal = () => {
    const items = getCartItems();
    const totalProf = items.reduce((sum, i) => sum + i.professionalFee, 0);
    const vat = totalProf * 0.15;
    return totalProf + vat;
  };

  const currentServiceContent = activeServiceSlug ? getServiceContent(activeServiceSlug) : null;
  const isCurrentServiceInCart = activeServiceSlug && cart.includes(activeServiceSlug);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-[#0A1A2F] flex flex-col">
      {activePage !== 'quotation' && activePage !== 'payment-auth' && activePage !== 'service-details' && (
        <Navbar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          cartCount={cart.length} 
        />
      )}

      {activePage === 'service-details' && (
        <Navbar 
          activePage='services'
          setActivePage={setActivePage} 
          cartCount={cart.length} 
        />
      )}

      <main className="flex-grow">
        {activePage === 'home' && <Home setActivePage={setActivePage} />}

        {activePage === 'services' && (
          <ServicesPage 
            cart={cart}
            toggleCartItem={toggleCartItem}
            isLoading={isServicesLoading}
            onServiceClick={navigateToServiceDetail}
          />
        )}

        {activePage === 'blog' && <Blog />}

        {activePage === 'about' && <About />}

        {activePage === 'contact' && <ContactPage />}

        {activePage === 'service-details' && currentServiceContent && (
          <ServiceDetails 
            content={currentServiceContent} 
            onBack={() => setActivePage('services')}
            actionLabel="Add to Quote"
            onAction={() => activeServiceSlug && toggleCartItem(activeServiceSlug)}
            isActionActive={!!isCurrentServiceInCart}
          />
        )}

        {activePage === 'privacy' && <PrivacyPolicy />}
        {activePage === 'terms' && <TermsOfService />}

        {activePage === 'quotation' && (
          <Quotation 
            items={getCartItems()}
            orderId={orderId}
            onBack={() => setActivePage('services')}
            onProceed={() => setActivePage('payment-auth')}
          />
        )}

        {activePage === 'payment-auth' && (
          <PaymentAuth 
             orderId={orderId}
             totalAmount={calculateTotal()}
             onBack={() => setActivePage('quotation')}
             onSuccess={() => setActivePage('home')}
          />
        )}
      </main>

      {activePage !== 'quotation' && activePage !== 'payment-auth' && activePage !== 'service-details' && (
         <Footer 
           setActivePage={setActivePage} 
           onServiceClick={navigateToServiceDetail} 
         />
      )}

      {activePage === 'service-details' && (
         <Footer 
           setActivePage={setActivePage} 
           onServiceClick={navigateToServiceDetail} 
         />
      )}

      <AIAssistant />

      {notification && (
        <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#0A1A2F] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 border border-[#C9A86A] w-[90%] sm:w-auto text-center justify-center">
          <CheckCircle size={16} className="text-[#C9A86A]" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none">{notification}</span>
        </div>
      )}

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        @media (max-width: 768px) { .animate-marquee { animation-duration: 25s; } }
      `}</style>
    </div>
  );
};

export default App;
