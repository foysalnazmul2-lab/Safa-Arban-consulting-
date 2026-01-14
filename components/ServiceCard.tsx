
import React from 'react';
import { 
  Plus, 
  Check, 
  Building2, 
  Globe, 
  Info,
  ArrowRight,
  Briefcase,
  Layout
} from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  isInCart: boolean;
  onToggle: () => void;
  onViewDetails: () => void;
}

const getCategoryStyles = (category: string, isActive: boolean) => {
  if (category.includes('Investment') || category.includes('Foreign') || category.includes('MISA') || category.includes('Elite')) {
    return {
      icon: <Globe size={20} />,
      bgColor: isActive ? 'bg-[#C9A86A]' : 'bg-[#C9A86A]/10',
      textColor: isActive ? 'text-white' : 'text-[#C9A86A]',
      label: 'Investment'
    };
  }
  if (category.includes('Commerce') || category.includes('Formation') || category.includes('Registration')) {
    return {
      icon: <Building2 size={20} />,
      bgColor: isActive ? 'bg-[#006C35]' : 'bg-[#006C35]/10',
      textColor: isActive ? 'text-white' : 'text-[#006C35]',
      label: 'Setup'
    };
  }
  if (category.includes('Qiwa') || category.includes('HR') || category.includes('Manpower')) {
    return {
      icon: <Briefcase size={20} />,
      bgColor: isActive ? 'bg-[#F06543]' : 'bg-[#F06543]/10',
      textColor: isActive ? 'text-white' : 'text-[#F06543]',
      label: 'HR & Labor'
    };
  }
  
  return {
    icon: <Layout size={20} />,
    bgColor: isActive ? 'bg-[#0A1A2F]' : 'bg-slate-100',
    textColor: isActive ? 'text-white' : 'text-slate-600',
    label: 'Support'
  };
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isInCart, onToggle, onViewDetails }) => {
  const styles = getCategoryStyles(service.category, isInCart);

  return (
    <div className={`bg-white p-8 rounded-[3rem] border transition-all duration-500 flex flex-col justify-between group h-full ${
      isInCart 
      ? 'border-[#C9A86A] ring-8 ring-[#C9A86A]/5 shadow-2xl scale-[1.02]' 
      : 'border-slate-100 hover:border-slate-300 hover:shadow-xl'
    }`}>
      <div>
        <div className="flex justify-between items-start mb-8">
          <div className={`p-5 rounded-2xl transition-all duration-300 ${styles.bgColor} ${styles.textColor} shadow-sm group-hover:scale-110 transform`}>
            {styles.icon}
          </div>
          <div className="text-right">
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isInCart ? 'text-[#C9A86A]' : 'text-slate-400'}`}>
              Service Fee
            </p>
            <div className="flex flex-col items-end">
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-3xl font-black text-[#0F2847] font-mono tracking-tighter">
                  {service.professionalFee.toLocaleString()}
                </span>
                <span className="text-[10px] font-bold text-slate-300">SAR</span>
              </div>
              {service.governmentFee > 0 && (
                <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full mt-1">
                  + Gov Fees (Est.)
                </span>
              )}
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-black text-[#0A1A2F] mb-4 leading-tight group-hover:text-[#C9A86A] transition-colors">
          {service.name}
        </h3>

        <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
          {service.desc}
        </p>

        <button 
          onClick={onViewDetails}
          className="group/btn flex items-center gap-2 text-[#C9A86A] hover:text-[#0A1A2F] text-[11px] font-black uppercase tracking-widest transition-all py-2"
        >
          <Info size={16} /> View Details & Inclusions <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-50">
        <button 
          onClick={onToggle}
          className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 ${
            isInCart 
            ? 'bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/20' 
            : 'bg-[#0A1A2F] text-white hover:bg-[#C9A86A] shadow-lg shadow-[#0A1A2F]/10'
          }`}
        >
          {isInCart ? (
            <><Check size={18} /> Selected</>
          ) : (
            <><Plus size={18} /> Add to Quote</>
          )}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
