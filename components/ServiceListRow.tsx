
import React from 'react';
import { Plus, Check, Info, ArrowRight, Crown } from 'lucide-react';
import { Service } from '../types';
import { getCategoryStyles } from './ServiceCard';
import { BRAND } from '../constants';

interface ServiceListRowProps {
  service: Service;
  isInCart: boolean;
  onToggle: () => void;
  onViewDetails: () => void;
  currency?: 'SAR' | 'USD';
  darkMode?: boolean;
}

const ServiceListRow: React.FC<ServiceListRowProps> = ({ service, isInCart, onToggle, onViewDetails, currency = 'SAR', darkMode = false }) => {
  const RATE = currency === 'USD' ? 0.2666 : 1;
  const displayPrice = Math.floor(service.professionalFee * RATE);
  const styles = getCategoryStyles(service.category, service.name);
  
  // Premium Detection
  const isPremium = service.id === 'cfr-01' || service.id === 'sec-01';

  return (
    <div 
      className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 transition-colors group last:border-0 cursor-pointer ${
        darkMode 
        ? `border-b border-slate-700 hover:bg-slate-800 ${isInCart ? 'bg-emerald-900/10' : ''}` 
        : `bg-white border-b border-slate-100 hover:bg-slate-50 ${isInCart ? 'bg-blue-50/30' : ''}`
      }`}
      onClick={onViewDetails}
    >
      <div className="flex items-start gap-4 flex-1 pr-8">
        
        {/* Category Visual */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105 shadow-sm ${
             darkMode ? 'bg-slate-700' : ''
             }`}
             style={!darkMode ? { backgroundColor: styles.bg, color: styles.color } : { color: styles.color }}>
           {React.cloneElement(styles.icon as React.ReactElement<any>, { size: 24 })}
        </div>

        <div>
           <div className="flex items-center gap-3 mb-1">
              <h4 className={`font-bold text-sm group-hover:text-[#E9443E] transition-colors ${darkMode ? 'text-white' : 'text-[#051C2C]'}`}>
                {service.name}
              </h4>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${darkMode ? 'bg-slate-700 text-slate-300' : ''}`} 
                    style={!darkMode ? { backgroundColor: styles.bg, color: styles.color } : {}}>
                {styles.label}
              </span>
              {isPremium && (
                <span className="text-[9px] font-black uppercase tracking-wider text-white bg-[#E94E4E] px-2 py-0.5 rounded border border-[#E94E4E] flex items-center gap-1">
                   <Crown size={8} /> Popular
                </span>
              )}
              {isInCart && <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Added</span>}
           </div>
           <p className={`text-xs line-clamp-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{service.desc}</p>
           <button 
             onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
             className={`text-[9px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1 hover:text-[#051C2C] transition-colors ${darkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400'}`}
           >
             Learn More <ArrowRight size={10} />
           </button>
        </div>
      </div>
      
      <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end pl-16 md:pl-0">
         <div className="text-right mr-4">
            <span className={`block font-mono font-bold ${darkMode ? 'text-white' : 'text-[#051C2C]'}`}>
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
            <button onClick={(e) => { e.stopPropagation(); onViewDetails(); }} className={`p-2 rounded-lg border border-transparent transition-all ${darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-400 hover:bg-white hover:text-[#051C2C] hover:border-slate-200'}`} title="View Details">
               <Info size={18} />
            </button>
            <button 
               onClick={(e) => { e.stopPropagation(); onToggle(); }}
               className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                  isInCart 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : darkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
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
