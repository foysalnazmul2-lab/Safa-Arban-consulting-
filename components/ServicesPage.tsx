
import React from 'react';
import ServiceCard from './ServiceCard';
import { ServiceSkeleton } from './Skeletons';
import { SERVICES_DB } from '../constants';
import { ServiceCategory } from '../types';

interface ServicesPageProps {
  cart: string[];
  toggleCartItem: (id: string) => void;
  isLoading: boolean;
  onServiceClick?: (id: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ cart, toggleCartItem, isLoading, onServiceClick }) => {
  const categories: ServiceCategory[] = Array.from(new Set(SERVICES_DB.map(s => s.category as ServiceCategory)));

  return (
    <div className="py-16 md:py-24 bg-white">
       <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-20 text-center">
             <span className="text-[#C9A86A] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-4">Precision Services</span>
             <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">Elite Solutions for <br className="hidden md:block"/> Global Investors</h2>
             <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">Select the operational modules required for your expansion. Our AI concierge is ready to assist with real-time regulatory mapping.</p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                 {Array.from({ length: 6 }).map((_, i) => <ServiceSkeleton key={i} />)}
              </div>
            ) : (
              categories.map((category) => {
                 const catServices = SERVICES_DB.filter(s => s.category === category);
                 if (catServices.length === 0) return null;

                 return (
                   <div key={category} className="animate-in slide-in-from-bottom-8 duration-500">
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
                             onViewDetails={() => onServiceClick && onServiceClick(service.id)}
                           />
                         ))}
                      </div>
                   </div>
                 );
              })
            )}
          </div>
       </div>
    </div>
  );
};

export default ServicesPage;
