
import React, { useState } from 'react';
import { 
  Plus, 
  Check, 
  Building2, 
  Globe, 
  Briefcase,
  ShieldCheck,
  Factory,
  HardHat,
  Stethoscope,
  Truck,
  Utensils,
  Wifi,
  Eye,
  Crown,
  Zap,
  Scale,
  Landmark,
  Leaf,
  Video,
  Pickaxe,
  GraduationCap,
  Target,
  Megaphone,
  Search,
  Settings,
  Users,
  LineChart,
  ArrowRight
} from 'lucide-react';
import { Service } from '../types';
import { BRAND } from '../constants';

interface ServiceCardProps {
  service: Service;
  isInCart: boolean;
  onToggle: () => void;
  onViewDetails: () => void;
  currency?: 'SAR' | 'USD';
}

export const getCategoryStyles = (category: string, name: string) => {
  const lowerName = name.toLowerCase();
  const lowerCat = category.toLowerCase();

  // --- Specialized Consulting & Advisory ---
  if (lowerCat.includes('strategy') || lowerName.includes('strategy')) 
    return { icon: <Target size={24} />, label: 'Strategy', color: '#B91C1C', bg: '#FEF2F2' }; // Red

  if (lowerCat.includes('financial') || lowerName.includes('tax') || lowerName.includes('audit'))
    return { icon: <Landmark size={24} />, label: 'Finance', color: '#059669', bg: '#ECFDF5' }; // Emerald

  if (lowerCat.includes('human') || lowerCat.includes('hr') || lowerName.includes('recruitment'))
    return { icon: <Users size={24} />, label: 'HR', color: '#DB2777', bg: '#FDF2F8' }; // Pink

  if (lowerCat.includes('digital') || lowerName.includes('it consulting') || lowerName.includes('cyber'))
    return { icon: <Wifi size={24} />, label: 'Digital', color: '#7C3AED', bg: '#F5F3FF' }; // Violet

  if (lowerCat.includes('marketing') || lowerName.includes('brand'))
    return { icon: <Megaphone size={24} />, label: 'Marketing', color: '#D946EF', bg: '#FDF4FF' }; // Fuchsia

  if (lowerCat.includes('research') || lowerName.includes('feasibility'))
    return { icon: <Search size={24} />, label: 'Research', color: '#0EA5E9', bg: '#F0F9FF' }; // Sky

  if (lowerCat.includes('legal') || lowerName.includes('contract') || lowerName.includes('governance'))
    return { icon: <Scale size={24} />, label: 'Legal', color: '#475569', bg: '#F8FAFC' }; // Slate

  if (lowerCat.includes('operational') || lowerName.includes('process') || lowerName.includes('supply chain'))
    return { icon: <Settings size={24} />, label: 'Ops', color: '#D97706', bg: '#FFFBEB' }; // Amber

  // --- Specific Sectors ---
  if (lowerName.includes('industrial') || lowerName.includes('manufacturing') || lowerName.includes('mining')) 
    return { icon: <Factory size={24} />, label: 'Industry', color: '#EA580C', bg: '#FFF7ED' };

  if (lowerName.includes('contracting') || lowerName.includes('construction') || lowerName.includes('engineering')) 
    return { icon: <HardHat size={24} />, label: 'Construction', color: '#C2410C', bg: '#FFEDD5' };

  if (lowerName.includes('health') || lowerName.includes('medical')) 
    return { icon: <Stethoscope size={24} />, label: 'Healthcare', color: '#EF4444', bg: '#FEF2F2' };

  if (lowerName.includes('logistics') || lowerName.includes('transport')) 
    return { icon: <Truck size={24} />, label: 'Logistics', color: '#2563EB', bg: '#EFF6FF' };

  if (lowerName.includes('food') || lowerName.includes('restaurant')) 
    return { icon: <Utensils size={24} />, label: 'F&B', color: '#65A30D', bg: '#ECFCCB' };

  if (lowerName.includes('media') || lowerName.includes('advertising'))
    return { icon: <Video size={24} />, label: 'Media', color: '#9333EA', bg: '#F3E8FF' };

  if (lowerName.includes('real estate') || lowerName.includes('developer'))
    return { icon: <Building2 size={24} />, label: 'Real Estate', color: '#334155', bg: '#F1F5F9' };

  // --- Core Categories ---
  if (lowerCat.includes('formation') || lowerCat.includes('registration')) 
    return { icon: <Globe size={24} />, label: 'Formation', color: BRAND.colors.primary, bg: '#F1F5F9' };
  
  if (lowerCat.includes('manpower') || lowerCat.includes('immigration')) 
    return { icon: <Briefcase size={24} />, label: 'Visas', color: '#0D9488', bg: '#F0FDFA' };
  
  if (lowerCat.includes('support') || lowerCat.includes('bpo')) 
    return { icon: <Zap size={24} />, label: 'Support', color: '#0891B2', bg: '#ECFEFF' };

  // Default
  return { icon: <ShieldCheck size={24} />, label: 'Service', color: '#64748B', bg: '#F8FAFC' };
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isInCart, onToggle, onViewDetails, currency = 'SAR' }) => {
  const [isVip, setIsVip] = useState(false);
  const styles = getCategoryStyles(service.category, service.name);
  const viewCount = React.useMemo(() => Math.floor(Math.random() * 40) + 5, []);

  // Premium Detection
  const isPremium = service.id === 'cfr-01' || service.id === 'sec-01'; // MISA & Industrial

  // Conversion Logic
  const RATE = currency === 'USD' ? 0.2666 : 1;
  const basePrice = service.professionalFee;
  const vipMarkup = isVip ? 1.5 : 1;
  
  const finalPrice = Math.floor(basePrice * vipMarkup * RATE);
  const govPrice = Math.floor(service.governmentFee * RATE);

  return (
    <div 
      className={`relative flex flex-col justify-between h-full transition-all duration-500 rounded-[2.5rem] overflow-hidden group border ${
        isPremium || isVip 
          ? 'shadow-[0_0_30px_rgba(233,78,78,0.2)]' // Red shadow for premium
          : `hover:border-slate-300 hover:shadow-xl`
      }`}
      style={{
        backgroundColor: (isPremium || isVip) ? BRAND.colors.primary : 'white',
        borderColor: (isPremium || isVip) ? BRAND.colors.secondary : isInCart ? BRAND.colors.primary : '#F1F5F9'
      }}
    >
      
      {/* Background Effects for VIP/Premium */}
      {(isPremium || isVip) && (
        <>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.alert }}></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </>
      )}

      {/* Header Badges */}
      <div className="absolute top-0 left-0 z-20 flex flex-col items-start">
        {isInCart && (
          <div className="px-6 py-2 rounded-br-2xl text-[10px] font-black uppercase tracking-widest text-white mb-2"
               style={{ backgroundColor: (isPremium || isVip) ? BRAND.colors.secondary : BRAND.colors.primary }}>
             <Check size={12} className="inline mr-1" /> Added
          </div>
        )}
        {isPremium && !isVip && (
           <div className="px-6 py-2 rounded-br-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
               style={{ backgroundColor: BRAND.colors.secondary }}>
             <Crown size={12} className="inline mr-1" /> Most Popular
          </div>
        )}
      </div>

      {/* Hero Image if available */}
      {service.image && (
         <div className="h-48 w-full relative overflow-hidden cursor-pointer" onClick={onViewDetails}>
            <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-20"></div>
         </div>
      )}

      <div className={`relative z-10 flex flex-col flex-grow ${service.image ? 'p-6' : 'p-8'}`}>
        {/* Top Controls */}
        <div className="flex justify-between items-start mb-6">
          <div className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105`}
               onClick={onViewDetails}
               style={{ 
                 backgroundColor: (isPremium || isVip) ? BRAND.colors.secondary : styles.bg,
                 color: (isPremium || isVip) ? BRAND.colors.primary : styles.color
               }}>
            {styles.icon}
          </div>
          
          {/* VIP Toggle Switch */}
          <div className="flex flex-col items-end gap-2">
             <div 
               onClick={(e) => { e.stopPropagation(); setIsVip(!isVip); }}
               className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all hover:bg-slate-50`}
               style={{ 
                 backgroundColor: (isPremium || isVip) ? BRAND.colors.primary : 'white',
                 borderColor: (isPremium || isVip) ? BRAND.colors.secondary : '#E2E8F0',
                 color: (isPremium || isVip) ? BRAND.colors.secondary : '#94A3B8'
               }}
             >
                <div className={`w-3 h-3 rounded-full transition-colors ${isVip ? 'animate-pulse' : ''}`}
                     style={{ backgroundColor: (isPremium || isVip) ? BRAND.colors.secondary : '#CBD5E1' }}></div>
                <span className="text-[9px] font-black uppercase tracking-widest">VIP Protocol</span>
             </div>
             {isVip && <span className="text-[9px] font-bold animate-in fade-in" style={{ color: BRAND.colors.secondary }}>+ Priority Processing</span>}
          </div>
        </div>

        {/* Labels */}
        <div className="mb-4 flex items-center justify-between">
           <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md transition-colors`}
                 style={{ 
                   backgroundColor: (isPremium || isVip) ? 'rgba(255,255,255,0.1)' : styles.bg, 
                   color: (isPremium || isVip) ? 'rgba(255,255,255,0.7)' : styles.color 
                 }}>
             {styles.label}
           </span>
           <span className="flex items-center gap-1 text-[9px] font-bold" style={{ color: (isPremium || isVip) ? BRAND.colors.secondary : '#94A3B8' }}>
             <Eye size={10} /> {viewCount} viewing
           </span>
        </div>

        {/* Title & Price */}
        <h3 
          onClick={onViewDetails}
          className="text-lg font-black mb-4 leading-tight cursor-pointer min-h-[3.5rem] transition-colors"
          style={{ color: (isPremium || isVip) ? 'white' : BRAND.colors.primary }}
          onMouseOver={(e) => { if (!isPremium && !isVip) e.currentTarget.style.color = BRAND.colors.secondary }}
          onMouseOut={(e) => { if (!isPremium && !isVip) e.currentTarget.style.color = BRAND.colors.primary }}
        >
          {service.name}
        </h3>

        <div className="mb-6">
           <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: (isPremium || isVip) ? BRAND.colors.secondary : '#94A3B8' }}>
             {isVip ? 'VIP Package Fee' : 'Professional Fee'}
           </p>
           <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black font-mono tracking-tighter" style={{ color: (isPremium || isVip) ? 'white' : BRAND.colors.primary }}>
                {currency === 'USD' ? '$' : ''}{finalPrice.toLocaleString()}
              </span>
              <span className={`text-[9px] font-bold ${(isPremium || isVip) ? 'text-white/50' : 'text-slate-400'}`}>{currency}</span>
           </div>
        </div>

        {/* Features Preview */}
        <div className="space-y-2 mb-6 flex-grow">
           {isVip ? (
             <>
               <div className="flex items-center gap-2 text-xs font-bold" style={{ color: BRAND.colors.secondary }}><Crown size={12} /> Dedicated Senior PRO</div>
               <div className="flex items-center gap-2 text-xs font-bold" style={{ color: BRAND.colors.secondary }}><Zap size={12} /> 24h Express Processing</div>
               <div className="flex items-center gap-2 text-xs font-bold" style={{ color: BRAND.colors.secondary }}><ShieldCheck size={12} /> Compliance Guarantee</div>
             </>
           ) : (
             <p className={`text-sm line-clamp-3 leading-relaxed font-medium ${(isPremium) ? 'text-slate-300' : 'text-slate-500'}`}>
               {service.desc}
             </p>
           )}
        </div>

        {/* Learn More Link */}
        <div className="mt-auto mb-6">
           <button 
             onClick={onViewDetails}
             className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:underline transition-all ${(isPremium || isVip) ? 'text-white/70 hover:text-white' : 'text-slate-400 hover:text-[#0D2B4F]'}`}
           >
             Learn More <ArrowRight size={12} />
           </button>
        </div>
      </div>

      {/* Action Area */}
      <div className={`p-6 border-t relative z-10 ${(isPremium || isVip) ? 'border-white/10 bg-white/5' : 'border-slate-50 bg-[#F5F7FA]/50'}`}>
        <button 
          onClick={() => onToggle()}
          className="w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg"
          style={{
            backgroundColor: (isPremium || isVip)
              ? BRAND.colors.secondary 
              : isInCart ? BRAND.colors.accent : BRAND.colors.primary,
            color: (isPremium || isVip) ? BRAND.colors.primary : isInCart ? BRAND.colors.primary : 'white',
            backgroundImage: (isPremium || isVip) ? `linear-gradient(to right, ${BRAND.colors.secondary}, ${BRAND.colors.accent})` : 'none'
          }}
        >
          {isInCart ? (
            <><Check size={16} /> Selected</>
          ) : (
            <><Plus size={16} /> {isVip ? 'Add VIP Bundle' : 'Add to Quote'}</>
          )}
        </button>
        {service.governmentFee > 0 ? (
           <p className={`text-[9px] text-center font-bold mt-3 uppercase tracking-wider ${(isPremium || isVip) ? 'text-white/30' : 'text-slate-400'}`}>
             + ~{currency === 'USD' ? '$' : ''}{govPrice.toLocaleString()} {currency} Govt Fees
           </p>
        ) : (
           <p className={`text-[9px] text-center font-bold mt-3 uppercase tracking-wider ${(isPremium || isVip) ? 'text-white/30' : 'text-slate-400'}`}>
             Govt. Fees: N/A (Consulting)
           </p>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
