
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar.tsx';
import Quotation from './components/Quotation.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import Footer from './components/Footer.tsx';
import Blog from './components/Blog.tsx';
import PaymentAuth from './components/PaymentAuth.tsx';
import ServiceDetails from './components/ServiceDetails.tsx';
import PrivacyPolicy from './components/PrivacyPolicy.tsx';
import TermsOfService from './components/TermsOfService.tsx';
import Home from './components/Home.tsx';
import About from './components/About.tsx';
import ServicesPage from './components/ServicesPage.tsx';
import ContactPage from './components/ContactPage.tsx';
import SEO from './components/SEO.tsx';
import LiveNotifications from './components/LiveNotifications.tsx';
import ExitIntentModal from './components/ExitIntentModal.tsx';
import TrackApplication from './components/TrackApplication.tsx';
import ClientPortal from './components/ClientPortal.tsx';
import Login from './components/Login.tsx';
import { Page, CartItem, CorePageContent, User } from './types.ts';
import { SERVICES_DB, CORE_SERVICES_CONTENT, BRAND, BLOG_POSTS } from './constants.ts';
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
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [currency, setCurrency] = useState<'SAR' | 'USD'>('SAR');
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);

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

  // --- Dynamic SEO Aggregation ---
  const dynamicKeywords = useMemo(() => {
    const serviceKeywords = SERVICES_DB.map(s => s.name).slice(0, 12); // Top 12 Service Names
    const blogTags = Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags))).slice(0, 10); // Unique Blog Tags
    
    return [
      "SafaArban", 
      "Business Setup Saudi Arabia", 
      "Company Formation Saudi Arabia", 
      "MISA License", 
      "Investor Visa", 
      "Riyadh Business", 
      "Vision 2030 Investment",
      ...serviceKeywords,
      ...blogTags
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

  const navigateToServiceDetail = (slug: string) => {
    setActiveServiceSlug(slug);
    setActivePage('service-details');
    window.scrollTo(0, 0);
  };

  const handleLogin = (email: string) => {
    // Mock Login
    setUser({
        id: 'CL-8821',
        name: 'Alex Morgan',
        email: email,
        role: 'client',
        company: 'TechFlow Solutions'
    });
    setActivePage('client-portal');
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('home');
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

  // If user is not logged in but tries to access portal, redirect to login
  if (activePage === 'client-portal' && !user) {
      setActivePage('login');
  }

  // Handle Full Page Login View
  if (activePage === 'login') {
      return <Login onLogin={handleLogin} onBack={() => setActivePage('home')} />;
  }

  // Handle Full Page Client Portal View
  if (activePage === 'client-portal' && user) {
      return <ClientPortal user={user} onLogout={handleLogout} />;
  }

  const isFullScreenPage = activePage === 'quotation' || activePage === 'payment-auth' || activePage === 'service-details';

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col" style={{ color: BRAND.colors.primary }}>
      {/* Dynamic SEO Injection based on Active Page */}
      {activePage === 'home' && (
        <SEO 
          title="Company Formation in Saudi Arabia | MISA License & CR – SafaArban"
          description="Set up your company in Saudi Arabia with SafaArban. MISA licenses, 100% foreign ownership, CR registration, visas & compliance. Riyadh-based experts."
          keywords={dynamicKeywords}
          schema={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": BRAND.name,
            "description": "Premium Gateway for Saudi Business Setup",
            "address": BRAND.contact.address,
            "telephone": BRAND.contact.phone,
            "priceRange": "$$$"
          }}
        />
      )}
      {activePage === 'services' && (
        <SEO 
          title="MISA License Saudi Arabia | 100% Foreign Ownership – SafaArban"
          description="Get your MISA investment license, Commercial Registration (CR), and Investor Visa in Saudi Arabia. Transparent professional fees for business setup."
          keywords={["MISA License Cost", "Commercial Registration Saudi Arabia", "ZATCA Registration", "Iqama Issuance", ...SERVICES_DB.map(s => s.name).slice(0, 5)]}
        />
      )}
      {activePage === 'blog' && (
        <SEO 
          title="Business Setup Guides & Market Insights | SafaArban"
          description="Expert articles on Saudi market regulations, Vision 2030 updates, taxation, and HR compliance laws."
          keywords={["Saudi market insights", "Vision 2030 blog", "Saudi tax guide", "MISA updates", ...BLOG_POSTS.flatMap(p => p.tags).slice(0, 8)]}
          type="article"
        />
      )}
      {activePage === 'contact' && (
        <SEO 
          title="Contact SafaArban | Riyadh Business Consultants"
          description="Visit SafaArban in Riyadh or contact our consultants for a premium business setup consultation."
          keywords={["Contact SafaArban", "Riyadh business consultant", "SafaArban location"]}
        />
      )}
      {activePage === 'service-details' && currentServiceContent && (
        <SEO 
          title={`${currentServiceContent.title} | SafaArban`}
          description={currentServiceContent.overview.substring(0, 160)}
          image={currentServiceContent.heroImage}
          keywords={[currentServiceContent.title, currentServiceContent.subtitle, "Saudi Business Services"]}
          type="service"
        />
      )}

      {!isFullScreenPage && (
        <Navbar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          cartCount={cart.length} 
          onOpenTracker={() => setActivePage('login')} // Use Login instead of popup tracker for main nav
          currency={currency}
          onToggleCurrency={() => setCurrency(currency === 'SAR' ? 'USD' : 'SAR')}
        />
      )}

      {activePage === 'service-details' && (
        <Navbar 
          activePage='services'
          setActivePage={setActivePage} 
          cartCount={cart.length} 
          onOpenTracker={() => setActivePage('login')}
          currency={currency}
          onToggleCurrency={() => setCurrency(currency === 'SAR' ? 'USD' : 'SAR')}
        />
      )}

      <main className="flex-grow">
        {activePage === 'home' && (
          <Home 
            setActivePage={setActivePage} 
            addToCart={toggleCartItem} 
            cart={cart}
            onServiceClick={navigateToServiceDetail}
            currency={currency}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage 
            cart={cart}
            toggleCartItem={toggleCartItem}
            isLoading={isServicesLoading}
            onServiceClick={navigateToServiceDetail}
            currency={currency}
          />
        )}

        {activePage === 'blog' && <Blog onAddToCart={toggleCartItem} cart={cart} />}

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
            onAddItem={toggleCartItem}
            onRemoveItem={toggleCartItem}
            currency={currency}
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

      {!isFullScreenPage && (
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
      <LiveNotifications />
      <ExitIntentModal />
      <TrackApplication isOpen={isTrackerOpen} onClose={() => setIsTrackerOpen(false)} />

      {notification && (
        <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 border w-[90%] sm:w-auto text-center justify-center"
             style={{ backgroundColor: BRAND.colors.primary, borderColor: BRAND.colors.secondary }}>
          <CheckCircle size={16} style={{ color: BRAND.colors.secondary }} />
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
