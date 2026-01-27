
import React, { useState } from 'react';
import { 
  Building2, 
  Globe, 
  Factory, 
  Briefcase, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  FileText, 
  Upload, 
  DollarSign, 
  ShieldCheck, 
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { BRAND } from '../constants';

interface MisaLicensePageProps {
  onBack: () => void;
  onAddToCart: (id: string) => void;
}

const MISA_TYPES = [
  {
    id: 'service',
    title: 'Service License',
    code: 'L-SRV',
    icon: <Briefcase size={24} />,
    description: 'For IT, Consulting, Construction, Tourism, and other service-based activities.',
    minCapital: 'None (Subject to Financial Capacity)',
    profFee: 18000,
    govtFee: 12000, // 2000 (1st yr) + 10000 (Sub)
    requirements: ['Audited Financials (1 Yr)', 'Parent Co. CR', 'Power of Attorney'],
    color: 'bg-blue-500'
  },
  {
    id: 'industrial',
    title: 'Industrial License',
    code: 'L-IND',
    icon: <Factory size={24} />,
    description: 'For manufacturing, heavy industry, and assembly. Requires Ministry of Industry approval.',
    minCapital: 'Determine by Project Scope',
    profFee: 47000,
    govtFee: 5000,
    requirements: ['Technical Feasibility Study', 'Environmental Permit', 'Factory Plan'],
    color: 'bg-amber-500'
  },
  {
    id: 'trading',
    title: 'Trading License',
    code: 'L-TRD',
    icon: <Globe size={24} />,
    description: 'For wholesale and retail trade (100% foreign ownership).',
    minCapital: '30 Million SAR (Paid Up)',
    profFee: 25000,
    govtFee: 12000,
    requirements: ['Presence in 3 Countries', 'Parent Capital > 30M SAR'],
    color: 'bg-emerald-500'
  },
  {
    id: 'rhq',
    title: 'Regional HQ',
    code: 'L-RHQ',
    icon: <Building2 size={24} />,
    description: 'Strategic center for MENA operations. Grants 0% Tax Incentives.',
    minCapital: 'None',
    profFee: 45000,
    govtFee: 15000,
    requirements: ['Presence in 2 Countries', 'Exclusively Management Activities'],
    color: 'bg-purple-500'
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    code: 'L-ENT',
    icon: <Users size={24} />,
    description: 'For innovative startups endorsed by Saudi Universities or Incubators.',
    minCapital: 'None',
    profFee: 15000,
    govtFee: 2000,
    requirements: ['Endorsement Letter', 'Business Plan', 'Patent (Optional)'],
    color: 'bg-rose-500'
  }
];

const MisaLicensePage: React.FC<MisaLicensePageProps> = ({ onBack, onAddToCart }) => {
  const [selectedLicense, setSelectedLicense] = useState<typeof MISA_TYPES[0] | null>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    entityName: '',
    parentCountry: '',
    shareCapital: '',
    activityDesc: '',
    isOwner100: true
  });

  const handleApply = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      if (selectedLicense) {
        // Map to catalog IDs for cart
        const cartId = selectedLicense.id === 'industrial' ? 'sec-01' : 
                       selectedLicense.id === 'rhq' ? 'rhq-setup' : 
                       'cfr-01'; 
        onAddToCart(cartId);
        onBack(); // Go back to services/cart
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-[#051C2C] text-white pt-24 pb-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-xs font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> Back to Catalog
            </button>
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
               <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
                     <ShieldCheck size={14} className="text-emerald-400" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Ministry of Investment Portal</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">MISA Licensing Hub</h1>
                  <p className="text-lg text-white/60 max-w-xl">
                     Select your investment vehicle. We handle the classification, business plan drafting, and government liaison.
                  </p>
               </div>
               <div className="hidden md:block">
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Standard Processing</p>
                     <p className="text-3xl font-black text-white">3-5 Days</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pb-24">
         <div className="grid lg:grid-cols-12 gap-8">
            
            {/* LEFT: License Selector */}
            <div className={`lg:col-span-4 space-y-4 transition-all duration-500 ${step > 1 ? 'opacity-50 pointer-events-none' : ''}`}>
               {MISA_TYPES.map((license) => (
                 <div 
                   key={license.id}
                   onClick={() => { setSelectedLicense(license); setStep(1); }}
                   className={`p-6 rounded-[2rem] border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                     selectedLicense?.id === license.id 
                     ? 'bg-white shadow-xl border-blue-500 ring-2 ring-blue-500/20' 
                     : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-lg'
                   }`}
                 >
                    <div className="flex items-start justify-between mb-4">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${license.color}`}>
                          {license.icon}
                       </div>
                       {selectedLicense?.id === license.id && (
                          <div className="bg-blue-500 text-white rounded-full p-1 animate-in zoom-in">
                             <CheckCircle2 size={16} />
                          </div>
                       )}
                    </div>
                    <h3 className="text-lg font-black text-[#051C2C] mb-1">{license.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4 min-h-[40px]">{license.description}</p>
                    
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                       <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Total Setup</p>
                          <p className="font-black text-[#051C2C]">{(license.profFee + license.govtFee).toLocaleString()} SAR</p>
                       </div>
                       <ArrowRight size={16} className={`text-slate-300 transition-transform ${selectedLicense?.id === license.id ? 'rotate-0 text-blue-500' : '-rotate-45 group-hover:rotate-0'}`} />
                    </div>
                 </div>
               ))}
            </div>

            {/* RIGHT: Details & Application */}
            <div className="lg:col-span-8">
               {selectedLicense ? (
                 <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden sticky top-8">
                    {/* Header Image/Color */}
                    <div className={`h-32 ${selectedLicense.color} relative overflow-hidden`}>
                       <div className="absolute inset-0 bg-black/20"></div>
                       <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                       <div className="absolute bottom-6 left-8 text-white">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Applying For</p>
                          <h2 className="text-3xl font-black">{selectedLicense.title}</h2>
                       </div>
                    </div>

                    <div className="p-8 md:p-12">
                       {/* WIZARD PROGRESS */}
                       <div className="flex items-center gap-4 mb-10">
                          {[1, 2, 3].map(s => (
                             <div key={s} className="flex-1">
                                <div className={`h-1.5 rounded-full mb-2 ${s <= step ? selectedLicense.color : 'bg-slate-100'}`}></div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${s <= step ? 'text-slate-800' : 'text-slate-400'}`}>
                                   {s === 1 ? 'Details' : s === 2 ? 'Requirements' : 'Review'}
                                </span>
                             </div>
                          ))}
                       </div>

                       {/* STEP 1: OVERVIEW */}
                       {step === 1 && (
                          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                             <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-6">
                                   <div>
                                      <h4 className="text-sm font-bold text-[#051C2C] flex items-center gap-2 mb-2">
                                         <DollarSign size={16} className="text-slate-400" /> Financials
                                      </h4>
                                      <ul className="space-y-3">
                                         <li className="flex justify-between text-sm border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Professional Fee</span>
                                            <span className="font-mono font-bold">{selectedLicense.profFee.toLocaleString()} SAR</span>
                                         </li>
                                         <li className="flex justify-between text-sm border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Govt. Fee (Est.)</span>
                                            <span className="font-mono font-bold">{selectedLicense.govtFee.toLocaleString()} SAR</span>
                                         </li>
                                         <li className="flex justify-between text-sm">
                                            <span className="text-slate-500">Min. Capital</span>
                                            <span className="font-bold text-[#051C2C] text-right max-w-[150px]">{selectedLicense.minCapital}</span>
                                         </li>
                                      </ul>
                                   </div>
                                </div>
                                <div>
                                   <h4 className="text-sm font-bold text-[#051C2C] flex items-center gap-2 mb-4">
                                      <FileText size={16} className="text-slate-400" /> Requirements
                                   </h4>
                                   <ul className="space-y-3">
                                      {selectedLicense.requirements.map((req, i) => (
                                         <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                            <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${selectedLicense.color}`}></div>
                                            {req}
                                         </li>
                                      ))}
                                   </ul>
                                </div>
                             </div>

                             <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Quick Application</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                   <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase">Proposed Entity Name</label>
                                      <input 
                                        type="text" 
                                        value={formData.entityName}
                                        onChange={e => setFormData({...formData, entityName: e.target.value})}
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-500" 
                                        placeholder="Company Name LLC"
                                      />
                                   </div>
                                   <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase">Parent Country</label>
                                      <input 
                                        type="text" 
                                        value={formData.parentCountry}
                                        onChange={e => setFormData({...formData, parentCountry: e.target.value})}
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-500" 
                                        placeholder="e.g. USA, UK"
                                      />
                                   </div>
                                </div>
                             </div>

                             <button 
                               onClick={() => setStep(2)}
                               disabled={!formData.entityName}
                               className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs text-white shadow-xl transition-all flex items-center justify-center gap-2 ${selectedLicense.color} disabled:opacity-50 disabled:cursor-not-allowed`}
                             >
                                Continue to Capital <ArrowRight size={16} />
                             </button>
                          </div>
                       )}

                       {/* STEP 2: DETAILS */}
                       {step === 2 && (
                          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                             <div className="space-y-6 mb-8">
                                <div className="space-y-2">
                                   <label className="text-xs font-bold text-[#051C2C] uppercase tracking-wider">Proposed Share Capital (SAR)</label>
                                   <p className="text-[10px] text-slate-400">Usually 25,000 SAR for Services, higher for Trading.</p>
                                   <input 
                                     type="text" 
                                     value={formData.shareCapital}
                                     onChange={e => setFormData({...formData, shareCapital: e.target.value})}
                                     className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-lg font-bold outline-none focus:border-blue-500"
                                     placeholder="e.g. 500,000"
                                   />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-xs font-bold text-[#051C2C] uppercase tracking-wider">Business Activity Description</label>
                                   <textarea 
                                     value={formData.activityDesc}
                                     onChange={e => setFormData({...formData, activityDesc: e.target.value})}
                                     className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium outline-none focus:border-blue-500 min-h-[120px]"
                                     placeholder="Describe your products or services in detail..."
                                   />
                                </div>
                                <div className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl">
                                   <input 
                                     type="checkbox" 
                                     checked={formData.isOwner100}
                                     onChange={e => setFormData({...formData, isOwner100: e.target.checked})}
                                     className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                   />
                                   <span className="text-sm font-bold text-slate-600">I confirm this will be 100% Foreign Owned</span>
                                </div>
                             </div>
                             
                             <div className="flex gap-4">
                                <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-bold text-xs text-slate-500 hover:bg-slate-50">Back</button>
                                <button 
                                  onClick={() => setStep(3)}
                                  className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-white shadow-xl transition-all ${selectedLicense.color}`}
                                >
                                   Review Application
                                </button>
                             </div>
                          </div>
                       )}

                       {/* STEP 3: REVIEW */}
                       {step === 3 && (
                          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                             <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8 space-y-4">
                                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                                   <span className="text-xs font-bold text-slate-400 uppercase">License Type</span>
                                   <span className={`text-xs font-black text-white px-3 py-1 rounded-full uppercase ${selectedLicense.color}`}>{selectedLicense.title}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                   <span className="text-xs font-bold text-slate-400 uppercase">Entity Name</span>
                                   <span className="font-bold text-[#051C2C]">{formData.entityName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                   <span className="text-xs font-bold text-slate-400 uppercase">Capital</span>
                                   <span className="font-bold text-[#051C2C]">{formData.shareCapital || 'TBD'} SAR</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                                   <span className="text-sm font-black text-[#051C2C] uppercase">Total Initiation Fee</span>
                                   <span className="text-2xl font-black text-[#051C2C]">{(selectedLicense.profFee).toLocaleString()} SAR</span>
                                </div>
                                <p className="text-[10px] text-right text-slate-400">*Excludes govt fees payable later</p>
                             </div>

                             <div className="flex gap-4">
                                <button onClick={() => setStep(2)} className="px-6 py-4 rounded-xl font-bold text-xs text-slate-500 hover:bg-slate-50">Edit</button>
                                <button 
                                  onClick={handleApply}
                                  disabled={isSubmitting}
                                  className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-white shadow-xl transition-all flex items-center justify-center gap-2 ${selectedLicense.color}`}
                                >
                                   {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Add to Quote & Proceed'}
                                </button>
                             </div>
                          </div>
                       )}

                    </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col justify-center items-center text-center p-12 bg-white rounded-[3rem] border border-slate-100 border-dashed min-h-[500px]">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                       <ShieldCheck size={48} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-300 mb-2">Select a License Type</h3>
                    <p className="text-slate-400 max-w-xs mx-auto text-sm">
                       Choose an investment vehicle from the left panel to view requirements and initiate your application.
                    </p>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default MisaLicensePage;
