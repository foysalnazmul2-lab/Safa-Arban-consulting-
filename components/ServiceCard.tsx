
import React, { useState } from 'react';
import { 
  Plus, 
  Check, 
  Building2, 
  Globe, 
  Info,
  X,
  CheckCircle2,
  Layout,
  ArrowRight,
  Briefcase,
  AlertCircle,
  Landmark
} from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  isInCart: boolean;
  onToggle: () => void;
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

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isInCart, onToggle }) => {
  const [showModal, setShowModal] = useState(false);
  const styles = getCategoryStyles(service.category, isInCart);

  // Total for display in modal only
  const total = service.professionalFee + service.governmentFee;

  return (
    <>
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
            onClick={() => setShowModal(true)}
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

      {/* DETAIL MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 no-print">
          <div 
            className="absolute inset-0 bg-[#0A1A2F]/80 backdrop-blur-md animate-in fade-in duration-500"
            onClick={() => setShowModal(false)}
          />
          
          <div className="relative bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row border border-white/10">
            {/* Modal Left Side */}
            <div className="bg-[#0A1A2F] p-10 md:p-14 text-white md:w-2/5 flex flex-col justify-between border-r border-white/5 relative">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                   <div className={`p-4 rounded-2xl ${styles.bgColor} ${styles.textColor} shadow-lg`}>
                      {styles.icon}
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C9A86A]">
                      ID: {service.code || service.id.toUpperCase()}
                   </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none mb-6">
                  {service.name}
                </h2>
                
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Professional Fee</span>
                        <span className="text-[9px] text-white/30">+15% VAT Applicable</span>
                    </div>
                    <span className="text-xl font-black text-[#C9A86A] font-mono">{service.professionalFee.toLocaleString()} SAR</span>
                  </div>
                  
                  {/* Separated Gov Fee Display */}
                  <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5 relative">
                    <div className="flex items-center gap-2 mb-2">
                       <Landmark size={14} className="text-slate-400" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Gov. Fee Estimate</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                       <span className="text-[9px] text-slate-500 max-w-[150px] leading-tight">Paid directly to government via SADAD</span>
                       <span className="text-lg font-black text-slate-300 font-mono">{service.governmentFee.toLocaleString()} SAR</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-white/5 rounded-3xl text-white border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-60">Total Estimated Outlay</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black font-mono tracking-tighter">{total.toLocaleString()}</span>
                        <span className="text-sm font-black opacity-60">SAR</span>
                    </div>
                    <p className="text-[9px] text-slate-400 mt-2">*Includes Professional Fee & Estimated Government Costs.</p>
                </div>
              </div>
            </div>

            {/* Modal Right Side Content */}
            <div className="p-10 md:p-14 bg-white md:w-3/5 max-h-[85vh] overflow-y-auto relative">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-8 right-8 p-3 text-slate-300 hover:text-[#0A1A2F] transition-all"
              >
                <X size={28} />
              </button>

              <div className="mb-10">
                <h4 className="text-[10px] font-black text-[#C9A86A] uppercase tracking-[0.4em] mb-4">Strategic Description</h4>
                <p className="text-xl text-slate-600 font-medium leading-relaxed italic">
                  "{service.desc}"
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10 mb-10">
                <div>
                   <h4 className="text-[10px] font-black text-[#006C35] uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                      <Check size={14} /> Included in Our Fee
                   </h4>
                   <ul className="space-y-3">
                      {(service.inclusions || service.details || []).map((inc, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-bold">
                           <CheckCircle2 size={16} className="text-[#006C35] mt-0.5 shrink-0" /> {inc}
                        </li>
                      ))}
                   </ul>
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                      <Landmark size={14} /> Gov. Fee Covers
                   </h4>
                   <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm text-slate-400 font-bold">
                         <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 shrink-0"></div> 
                         Official Ministry Issuance Fees
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-400 font-bold">
                         <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 shrink-0"></div> 
                         License Subscriptions
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-400 font-bold">
                         <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 shrink-0"></div> 
                         Pass-through regulatory costs
                      </li>
                   </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-10 border-t border-slate-100">
                <button 
                  onClick={() => { onToggle(); setShowModal(false); }}
                  className={`flex-1 w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4 ${
                    isInCart 
                    ? 'bg-red-50 text-red-500 border border-red-100' 
                    : 'bg-[#0A1A2F] text-white hover:bg-[#C9A86A]'
                  }`}
                >
                  {isInCart ? <><X size={20}/> Remove Choice</> : <><Check size={20}/> Add to Selection</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceCard;
