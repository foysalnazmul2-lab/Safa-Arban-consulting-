
import React from 'react';
import { Plus, Check, Info, ArrowRight } from 'lucide-react';
import { Service } from '../types';
import { getCategoryStyles } from './ServiceCard';

interface ServiceListRowProps {
  service: Service;
  isInCart: boolean;
  onToggle: () => void;
  onViewDetails: () => void;
  currency?: 'SAR' | 'USD';
}

const ServiceListRow: React.FC<ServiceListRowProps> = ({ service, isInCart, onToggle, onViewDetails, currency = 'SAR' }) => {
  const RATE = currency === 'USD' ? 0.2666 : 1;
  const displayPrice = Math.floor(service.professionalFee * RATE);
  const styles = getCategoryStyles(service.category, service.name);

  return (
    <div className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors group last:border-0 ${isInCart ? 'bg-blue-50/30' : ''}`}>
      <div className="flex items-start gap-4 flex-1 pr-8 cursor-pointer" onClick={onViewDetails}>
        
        {/* Category Visual */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105 shadow-sm"
             style={{ backgroundColor: styles.bg, color: styles.color }}>
           {React.cloneElement(styles.icon as React.ReactElement<any>, { size: 24 })}
        </div>

        <div>
           <div className="flex items-center gap-3 mb-1">
              <h4 className="font-bold text-[#051C2C] text-sm group-hover:text-[#E9443E] transition-colors">{service.name}</h4>
              <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ backgroundColor: styles.bg, color: styles.color }}>{styles.label}</span>
              {isInCart && <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Added</span>}
           </div>
           <p className="text-xs text-slate-500 line-clamp-1">{service.desc}</p>
           <button 
             onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
             className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-1 hover:text-[#051C2C] transition-colors"
           >
             Learn More <ArrowRight size={10} />
           </button>
        </div>
      </div>
      
      <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end pl-16 md:pl-0">
         <div className="text-right mr-4">
            <span className="block font-mono font-bold text-[#051C2C]">
               {currency === 'USD' ? '$' : ''}{displayPrice.toLocaleString()} <span className="text-[10px] text-slate-400">{currency}</span>
            </span>
            {service.governmentFee > 0 ? (
               <span className="text-[9px] text-slate-400 font-medium block">
                  + Gov: {Math.floor(service.governmentFee * RATE).toLocaleString()}
               </span>
            ) : (
               <span className="text-[9px] text-slate-400 font-medium block">
                  Gov Fees: N/A
               </span>
            )}
         </div>
         
         <div className="flex gap-2">
            <button onClick={onViewDetails} className="p-2 rounded-lg text-slate-400 hover:bg-white hover:text-[#051C2C] border border-transparent hover:border-slate-200 transition-all" title="View Details">
               <Info size={18} />
            </button>
            <button 
               onClick={onToggle}
               className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                  isInCart 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-[#051C2C] text-white hover:bg-[#E9443E]'
               }`}
            >
               {isInCart ? <Check size={14} /> : <Plus size={14} />}
               {isInCart ? 'Selected' : 'Add'}
            </button>
         </div>
      </div>
    </div>
  );
};

export default ServiceListRow;
