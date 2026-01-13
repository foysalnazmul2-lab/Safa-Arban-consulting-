
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import Quotation from './components/Quotation';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import Blog from './components/Blog';
import PaymentAuth from './components/PaymentAuth';
import ContactForm from './components/ContactForm';
import ServiceDetails from './components/ServiceDetails';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { Page, CartItem, ServiceCategory } from './types';
import { SERVICES_DB, BRAND, CORE_SERVICES_CONTENT } from './constants';
import { 
  CheckCircle,
  Activity,
  Award,
  BarChart3,
  Building,
  Users,
  Globe,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [cart, setCart] = useState<string[]>([]);
  const [orderId, setOrderId] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [activeServiceSlug, setActiveServiceSlug] = useState<string>('');

  useEffect(() => {
    setOrderId(`SA-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${new Date().getFullYear()}`);
    window.scrollTo(0, 0);
  }, [activePage, activeServiceSlug]);

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

  const categories: ServiceCategory[] = Array.from(new Set(SERVICES_DB.map(s => s.category as ServiceCategory)));

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
          activePage='services' // Highlight services tab
          setActivePage={setActivePage} 
          cartCount={cart.length} 
        />
      )}

      <main className="flex-grow">
        {activePage === 'home' && (
          <>
            <Hero onStart={() => setActivePage('services')} />
            
            <div className="bg-[#C9A86A] text-[#0A1A2F] py-3 md:py-4 overflow-hidden whitespace-nowrap border-y border-[#0A1A2F]/10">
               <div className="flex animate-marquee gap-10 md:gap-20 items-center">
                  {[
                    "MISA 2026 ROADMAP ACTIVE",
                    "ZATCA PHASE 2 INTEGRATION",
                    "100% FOREIGN OWNERSHIP ENABLED",
                    "RIYADH HQ GATEWAY LIVE",
                    "VISION 2030 STRATEGIC HUB",
                    "ELITE BUSINESS CONCIERGE"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 md:gap-3 font-black uppercase text-[8px] md:text-[10px] tracking-widest">
                       <Activity size={14} /> {text}
                    </div>
                  ))}
               </div>
            </div>

            <div className="py-16 md:py-24 bg-white">
               <div className="max-w-7xl mx-auto px-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                     {[
                       { icon: <Award className="text-[#C9A86A]" />, label: "Capital Managed", val: "3.5B+ SAR" },
                       { icon: <Users className="text-[#006C35]" />, label: "Entities Formed", val: "1,200+" },
                       { icon: <BarChart3 className="text-[#F06543]" />, label: "Growth Index", val: "94%" },
                       { icon: <Building className="text-[#0A1A2F]" />, label: "Office Network", val: "12 Hubs" }
                     ].map((stat, i) => (
                       <div key={i} className="flex flex-col items-center text-center space-y-2 md:space-y-4">
                          <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 mb-1 md:mb-2">{stat.icon}</div>
                          <p className="text-2xl md:text-4xl font-black tracking-tight text-[#0A1A2F]">{stat.val}</p>
                          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">{stat.label}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="py-16 md:py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                   {[
                     { 
                       icon: <Globe size={32} />, 
                       title: "100% Foreign Ownership", 
                       color: "text-[#C9A86A]",
                       bg: "bg-[#C9A86A]/10",
                       hBg: "group-hover:bg-[#C9A86A]",
                       desc: "Direct MISA licensing granting you complete control of your KSA corporation without a local sponsor."
                     },
                     { 
                       icon: <FileCheck size={32} />, 
                       title: "Government Liaison", 
                       color: "text-[#006C35]",
                       bg: "bg-[#006C35]/10",
                       hBg: "group-hover:bg-[#006C35]",
                       desc: "Seamless integration with MC, ZATCA, and Qiwa platforms for frictionless operational compliance."
                     },
                     { 
                       icon: <ShieldCheck size={32} />, 
                       title: "Strategic Advisory", 
                       color: "text-[#F06543]",
                       bg: "bg-[#F06543]/10",
                       hBg: "group-hover:bg-[#F06543]",
                       desc: "Elite guidance on leveraging Vision 2030 incentives, RHQ status, and regional industrial funds."
                     }
                   ].map((prop, idx) => (
                     <div key={idx} className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl space-y-6 group hover:-translate-y-2 transition-transform">
                        <div className={`w-16 h-16 ${prop.bg} rounded-2xl flex items-center justify-center ${prop.color} ${prop.hBg} group-hover:text-white transition-all`}>
                           {prop.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-black">{prop.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">{prop.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <div className="py-16 md:py-24 bg-[#0A1A2F] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A86A] rounded-full blur-[150px] opacity-10"></div>
               <div className="max-w-7xl mx-auto px-6 relative z-10">
                  <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                     <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="text-[#C9A86A] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-4">The Catalyst of Change</span>
                        <h2 className="text-3xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
                           Establishing Your <br className="hidden md:block"/> Future in Riyadh.
                        </h2>
                        <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10">
                           Saudi Arabia is transforming into a global logistics and investment hub. With over $3 Trillion in planned projects, the opportunity for market leaders is unprecedented.
                        </p>
                        <div className="grid grid-cols-2 gap-4 md:gap-8 mb-10">
                           <div className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/10">
                              <p className="text-2xl md:text-4xl font-black text-[#C9A86A] mb-1">Top 10</p>
                              <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/50">Global Competitiveness</p>
                           </div>
                           <div className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/10">
                              <p className="text-2xl md:text-4xl font-black text-[#006C35] mb-1">0%</p>
                              <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/50">Personal Income Tax</p>
                           </div>
                        </div>
                        <button onClick={() => setActivePage('services')} className="bg-white text-[#0A1A2F] px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#C9A86A] transition-colors shadow-2xl w-full sm:w-auto">
                           Explore The Gateway
                        </button>
                     </div>
                     <div className="lg:w-1/2 relative mt-8 lg:mt-0">
                        <img 
                           src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=1000&auto=format&fit=crop" 
                           alt="Riyadh Skyline" 
                           className="rounded-[2.5rem] md:rounded-[3rem] border-4 md:border-8 border-white/5 shadow-2xl relative z-10 w-full"
                        />
                        <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-[#C9A86A] p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-xl z-20 border-4 border-[#0A1A2F]">
                           <p className="text-[#0A1A2F] font-black text-lg md:text-xl mb-1">Riyadh HQ</p>
                           <p className="text-[#0A1A2F]/60 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Gateway to MENA</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </>
        )}

        {activePage === 'blog' && <Blog />}

        {activePage === 'services' && (
          <div className="py-16 md:py-24 bg-white">
             <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 md:mb-20 text-center">
                   <span className="text-[#C9A86A] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-4">Precision Services</span>
                   <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">Elite Solutions for <br className="hidden md:block"/> Global Investors</h2>
                   <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">Select the operational modules required for your expansion. Our AI concierge is ready to assist with real-time regulatory mapping.</p>
                </div>

                <div className="space-y-16 md:space-y-24">
                  {categories.map((category) => {
                     const catServices = SERVICES_DB.filter(s => s.category === category);
                     if (catServices.length === 0) return null;

                     return (
                       <div key={category}>
                          <div className="flex items-center gap-4 mb-8 md:mb-10">
                             <div className="h-px bg-slate-100 flex-1"></div>
                             <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-300 text-center">{category}</h3>
                             <div className="h-px bg-slate-100 flex-1"></div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                             {catServices.map(service => (
                               <ServiceCard 
                                 key={service.id}
                                 service={service}
                                 isInCart={cart.includes(service.id)}
                                 onToggle={() => toggleCartItem(service.id)}
                               />
                             ))}
                          </div>
                       </div>
                     );
                  })}
                </div>
             </div>
          </div>
        )}

        {/* SERVICE DETAILS PAGE */}
        {activePage === 'service-details' && activeServiceSlug && CORE_SERVICES_CONTENT[activeServiceSlug] && (
          <ServiceDetails 
            content={CORE_SERVICES_CONTENT[activeServiceSlug]} 
            onBack={() => setActivePage('services')}
            onGetQuote={() => setActivePage('services')}
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

        {activePage === 'about' && (
           <div className="bg-slate-50 min-h-screen">
              <div className="relative bg-[#0A1A2F] text-white py-24 md:py-32 overflow-hidden">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1596627689102-b2f7a012d98b?q=80&w=2000')] bg-cover bg-center"></div>
                 <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">Architects of Change.</h1>
                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">SafaArban is more than a consulting firm; we are the premium bridge between global vision and Saudi reality.</p>
                 </div>
              </div>
              
              <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                 <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="space-y-6">
                       <span className="text-[#C9A86A] font-black uppercase tracking-[0.3em] text-[10px] block mb-4">Our DNA</span>
                       <h2 className="text-3xl md:text-4xl font-black text-[#0A1A2F] mb-6 tracking-tight">Catalyzing Vision 2030</h2>
                       <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                          Founded in the heart of Riyadh, SafaArban was established to eliminate the procedural friction international firms face when entering the Kingdom. We combine deep local PRO expertise with international business standards.
                       </p>
                       <div className="flex items-center gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-xl border border-slate-50">
                          <CheckCircle className="text-[#006C35]" />
                          <p className="text-xs md:text-sm font-black uppercase tracking-widest text-[#0A1A2F]">Regulated & Certified for Premium Advisory</p>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600" className="rounded-2xl md:rounded-3xl shadow-lg mt-8" alt="Strategy Session" />
                       <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600" className="rounded-2xl md:rounded-3xl shadow-lg" alt="Corporate Hub" />
                    </div>
                 </div>
              </div>
           </div>
        )}

        {activePage === 'contact' && (
           <div className="py-16 md:py-24 bg-slate-50 min-h-screen flex items-center">
              <div className="max-w-4xl mx-auto px-6 w-full">
                <ContactForm />
              </div>
           </div>
        )}
      </main>

      {activePage !== 'quotation' && activePage !== 'payment-auth' && activePage !== 'service-details' && (
         <Footer 
           setActivePage={setActivePage} 
           onServiceClick={navigateToServiceDetail} 
         />
      )}

      {/* Simplified Footer for Service Details Page */}
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
