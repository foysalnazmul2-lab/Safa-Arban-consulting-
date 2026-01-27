
import React, { useState, useEffect, useMemo } from 'react';
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
import SEO from './components/SEO';
import LiveNotifications from './components/LiveNotifications';
import ExitIntentModal from './components/ExitIntentModal';
import TrackApplication from './components/TrackApplication';
import ClientPortal from './components/ClientPortal';
import AdminPortal from './components/AdminPortal';
import Login from './components/Login';
import ProposalGenerator from './components/ProposalGenerator';
import AgreementGenerator from './components/AgreementGenerator';
import MisaLicensePage from './components/MisaLicensePage';
import { Page, CartItem, CorePageContent, User } from './types';
import { SERVICES_DB, CORE_SERVICES_CONTENT, BRAND, BLOG_POSTS } from './constants';
import { CheckCircle } from 'lucide-react';
import { LanguageProvider } from './LanguageContext';
import { Analytics } from '@vercel/analytics/react';

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [cart, setCart] = useState<string[]>([]);
  const [orderId, setOrderId] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [activeServiceSlug, setActiveServiceSlug] = useState<string>('');
  const [isServicesLoading, setIsServicesLoading] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [currency, setCurrency] = useState<'SAR' | 'USD'>('SAR');
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!orderId) {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
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

  const dynamicKeywords = useMemo(() => {
    const serviceKeywords = SERVICES_DB.map(s => s.name).slice(0, 12);
    const blogTags = Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags))).slice(0, 10);
    return [
      "SafaArban", "Business Setup Saudi Arabia", "Company Formation Saudi Arabia", "MISA License", "Investor Visa", "Riyadh Business", "Vision 2030 Investment", ...serviceKeywords, ...blogTags
    ];
  }, []);

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

  const addItemsToCart = (ids: string[]) => {
    setCart(prev => {
      const newIds = ids.filter(id => !prev.includes(id));
      if (newIds.length > 0) {
        setNotification(`${newIds.length} items added to quote`);
        setTimeout(() => setNotification(null), 3000);
        return [...prev, ...newIds];
      }
      return prev;
    });
  };

  const navigateToServiceDetail = (slug: string) => {
    setActiveServiceSlug(slug);
    setActivePage('service-details');
    window.scrollTo(0, 0);
  };

  const handleLogin = (email: string, role: 'client' | 'admin' = 'client') => {
    if (role === 'admin') {
      setUser({ id: 'ADM-001', name: 'Admin User', email: email, role: 'admin', company: 'SafaArban Ltd' });
      setActivePage('admin-portal');
    } else {
      setUser({ id: 'CL-8821', name: 'Alex Morgan', email: email, role: 'client', company: 'TechFlow Solutions' });
      setActivePage('client-portal');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('home');
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'SAR' ? 'USD' : 'SAR');
  };

  const getServiceContent = (slug: string): CorePageContent | null => {
    if (CORE_SERVICES_CONTENT[slug]) return CORE_SERVICES_CONTENT[slug];
    const service = SERVICES_DB.find(s => s.id === slug);
    if (service) {
      return {
        slug: service.id,
        title: service.name,
        subtitle: service.category,
        heroImage: service.image || 'https://images.unsplash.com/photo-1582653291655-60ae21f37968?q=80&w=2000',
        overview: service.desc,
        features: [
          ...(service.inclusions || []).map(inc => ({ title: inc, desc: "Included in standard professional fee package." })),
          { title: "Government Fee Estimate", desc: `Approx. ${service.governmentFee.toLocaleString()} SAR payable directly to authorities.` }
        ],
        cta: "Add to Quote",
        requirements: service.requirements,
        exclusions: service.exclusions,
        details: service.details
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

  if ((activePage === 'client-portal' || activePage === 'admin-portal') && !user) {
      setActivePage('login');
  }

  if (activePage === 'login') return <Login onLogin={handleLogin} onBack={() => setActivePage('home')} />;
  if (activePage === 'client-portal' && user?.role === 'client') return <ClientPortal user={user} onLogout={handleLogout} />;
  if (activePage === 'admin-portal' && user?.role === 'admin') return <AdminPortal user={user} onLogout={handleLogout} onNavigate={setActivePage} />;
  if (activePage === 'proposal-generator') return <ProposalGenerator onBack={() => user?.role === 'admin' ? setActivePage('admin-portal') : setActivePage('home')} />;
  if (activePage === 'agreement-generator') return <AgreementGenerator onBack={() => setActivePage('home')} />;
  if (activePage === 'misa-licenses') return <MisaLicensePage onBack={() => setActivePage('services')} onAddToCart={toggleCartItem} />;

  const isFullScreenPage = activePage === 'quotation' || activePage === 'payment-auth' || activePage === 'service-details';

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col" style={{ color: BRAND.colors.primary }}>
      {activePage === 'home' && (
        <SEO 
          title="Company Formation in Saudi Arabia | MISA License & CR – SafaArban"
          description="Set up your company in Saudi Arabia with SafaArban. MISA licenses, 100% foreign ownership, CR registration, visas & compliance. Riyadh-based experts."
          keywords={dynamicKeywords}
          schema={{ "@context": "https://schema.org", "@type": "LocalBusiness", "name": BRAND.name, "description": "Premium Gateway for Saudi Business Setup", "address": BRAND.contact.address, "telephone": BRAND.contact.phone, "priceRange": "$$$" }}
        />
      )}
      {!isFullScreenPage && (
        <Navbar activePage={activePage} setActivePage={setActivePage} cartCount={cart.length} onOpenTracker={() => setActivePage('login')} currency={currency} onToggleCurrency={toggleCurrency} />
      )}
      {activePage === 'service-details' && (
        <Navbar activePage='services' setActivePage={setActivePage} cartCount={cart.length} onOpenTracker={() => setActivePage('login')} currency={currency} onToggleCurrency={toggleCurrency} />
      )}

      <main className="flex-grow">
        {activePage === 'home' && <Home setActivePage={setActivePage} addToCart={toggleCartItem} addItemsToCart={addItemsToCart} cart={cart} onServiceClick={navigateToServiceDetail} currency={currency} />}
        {activePage === 'services' && <ServicesPage cart={cart} toggleCartItem={toggleCartItem} addItemsToCart={addItemsToCart} isLoading={isServicesLoading} onServiceClick={navigateToServiceDetail} currency={currency} onToggleCurrency={toggleCurrency} />}
        {activePage === 'blog' && <Blog onAddToCart={toggleCartItem} cart={cart} />}
        {activePage === 'about' && <About />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'service-details' && currentServiceContent && <ServiceDetails content={currentServiceContent} onBack={() => setActivePage('services')} actionLabel="Add to Quote" onAction={() => activeServiceSlug && toggleCartItem(activeServiceSlug)} isActionActive={!!isCurrentServiceInCart} />}
        {activePage === 'privacy' && <PrivacyPolicy />}
        {activePage === 'terms' && <TermsOfService />}
        {activePage === 'quotation' && <Quotation items={getCartItems()} orderId={orderId} onBack={() => setActivePage('services')} onProceed={() => setActivePage('payment-auth')} onAddItem={toggleCartItem} onRemoveItem={toggleCartItem} currency={currency} />}
        {activePage === 'payment-auth' && <PaymentAuth orderId={orderId} totalAmount={calculateTotal()} onBack={() => setActivePage('quotation')} onSuccess={() => setActivePage('home')} />}
      </main>

      {!isFullScreenPage && <Footer setActivePage={setActivePage} onServiceClick={navigateToServiceDetail} />}
      {activePage === 'service-details' && <Footer setActivePage={setActivePage} onServiceClick={navigateToServiceDetail} />}

      <AIAssistant />
      <LiveNotifications />
      <ExitIntentModal />
      <TrackApplication isOpen={isTrackerOpen} onClose={() => setIsTrackerOpen(false)} />

      {notification && (
        <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 border w-[90%] sm:w-auto text-center justify-center" style={{ backgroundColor: BRAND.colors.primary, borderColor: BRAND.colors.secondary }}>
          <CheckCircle size={16} style={{ color: BRAND.colors.secondary }} />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none">{notification}</span>
        </div>
      )}
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 40s linear infinite; } @media (max-width: 768px) { .animate-marquee { animation-duration: 25s; } }`}</style>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
    <Analytics />
  </LanguageProvider>
);

export default App;
