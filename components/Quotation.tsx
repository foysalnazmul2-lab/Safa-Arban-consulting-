
import React, { useState, useMemo } from 'react';
import { CreditCard, ChevronLeft, ChevronRight, MapPin, Download, Globe, FileText, Landmark, QrCode, Zap, CheckCircle2, Plus, Tag, Gift, Trash2, X } from 'lucide-react';
import { CartItem } from '../types';
import { BRAND, SERVICES_DB } from '../constants';
import { SafaArbanLogo } from './Navbar';

interface QuotationProps {
  items: CartItem[];
  onBack: () => void;
  onProceed: () => void;
  orderId: string;
  onAddItem?: (id: string) => void;
  onRemoveItem?: (id: string) => void; // Added capability to remove items directly
  currency?: 'SAR' | 'USD';
}

// --- AUTOMATIC BUNDLE LOGIC ---
const BUNDLES = [
  {
    id: 'launch-pad',
    name: 'Launch Pad Bundle',
    description: 'MISA License + Commercial Registration',
    required: ['cfr-01', 'cfr-03'],
    discountAmount: 2500
  },
  {
    id: 'industrial-start',
    name: 'Industrial Starter',
    description: 'Industrial License + Environmental Permit',
    required: ['sec-01', 'cfr-07'],
    discountAmount: 5000
  },
  {
    id: 'full-compliance',
    name: 'Full Compliance Pack',
    description: 'CR + ZATCA + GOSI + Qiwa',
    required: ['cfr-03', 'cfr-09', 'cfr-10', 'cfr-12'],
    discountAmount: 1500
  }
];

const VALID_PROMOS: Record<string, number> = {
  'VISION2030': 0.10, // 10% off
  'SAFAVIP': 0.15,    // 15% off
  'WELCOME': 0.05     // 5% off
};

const OfficialStamp = () => (
  <svg width="180" height="180" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-90 mix-blend-multiply pointer-events-none select-none rotate-[-12deg]">
    <defs>
      <path id="sealTop" d="M 25,100 A 75,75 0 0,1 175,100" fill="none" />
      <path id="sealBottom" d="M 25,100 A 75,75 0 0,0 175,100" fill="none" />
    </defs>
    
    <circle cx="100" cy="100" r="95" fill="none" stroke={BRAND.colors.primary} strokeWidth="3" />
    <circle cx="100" cy="100" r="88" fill="none" stroke={BRAND.colors.primary} strokeWidth="1" />
    <circle cx="100" cy="100" r="62" fill="none" stroke={BRAND.colors.primary} strokeWidth="1" />

    <text fill={BRAND.colors.primary} fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">
      <textPath href="#sealTop" startOffset="50%" textAnchor="middle">SAFAARBAN LTD</textPath>
    </text>
    <text fill={BRAND.colors.primary} fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">
       <textPath href="#sealBottom" startOffset="50%" textAnchor="middle">RIYADH, SAUDI ARABIA</textPath>
    </text>
    
    <text x="18" y="105" fill={BRAND.colors.primary} fontSize="16" fontWeight="bold" dominantBaseline="middle">★</text>
    <text x="168" y="105" fill={BRAND.colors.primary} fontSize="16" fontWeight="bold" dominantBaseline="middle">★</text>

    <g transform="translate(100, 100)" textAnchor="middle">
        <text y="-18" fontSize="9" fontWeight="bold" fontFamily="Arial, sans-serif" fill={BRAND.colors.primary}>CR No</text>
        <text y="-6" fontSize="11" fontWeight="bold" fontFamily="Courier New, monospace" fill={BRAND.colors.primary}>{BRAND.contact.cr}</text>
        <text y="12" fontSize="9" fontWeight="bold" fontFamily="Arial, sans-serif" fill={BRAND.colors.primary}>VAT No</text>
        <text y="24" fontSize="11" fontWeight="bold" fontFamily="Courier New, monospace" fill={BRAND.colors.primary}>{BRAND.contact.vat}</text>
    </g>
  </svg>
);

const Quotation: React.FC<QuotationProps> = ({ items, onBack, onProceed, orderId, onAddItem, onRemoveItem, currency = 'SAR' }) => {
  const [isFastTrack, setIsFastTrack] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  const RATE = currency === 'USD' ? 0.2666 : 1;
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  // --- CALCULATIONS ---
  const calculation = useMemo(() => {
    // 1. Base Totals
    const baseProf = items.reduce((sum, i) => sum + Math.floor(i.professionalFee * RATE), 0);
    const totalGov = items.reduce((sum, i) => sum + Math.floor(i.governmentFee * RATE), 0);
    
    // 2. Fast Track (Add 25% to Prof Fee)
    const fastTrackFee = isFastTrack ? Math.floor(baseProf * 0.25) : 0;
    
    // 3. Automatic Bundles
    let bundleDiscount = 0;
    const itemIds = items.map(i => i.id);
    const appliedBundlesList: typeof BUNDLES = [];

    BUNDLES.forEach(bundle => {
      // Check if all required items are in cart
      const hasAll = bundle.required.every(reqId => itemIds.includes(reqId));
      if (hasAll) {
        bundleDiscount += Math.floor(bundle.discountAmount * RATE);
        appliedBundlesList.push(bundle);
      }
    });

    // 4. Promo Code
    let promoDiscount = 0;
    if (appliedPromo && VALID_PROMOS[appliedPromo]) {
      const discountableAmount = baseProf + fastTrackFee - bundleDiscount;
      promoDiscount = Math.floor(discountableAmount * VALID_PROMOS[appliedPromo]);
    }

    // 5. Final
    const totalProfAfterDiscounts = Math.max(0, baseProf + fastTrackFee - bundleDiscount - promoDiscount);
    const vat = Math.floor(totalProfAfterDiscounts * 0.15); 
    const invoiceTotal = totalProfAfterDiscounts + vat;

    return {
      baseProf,
      totalGov,
      fastTrackFee,
      bundleDiscount,
      promoDiscount,
      totalProfAfterDiscounts,
      vat,
      invoiceTotal,
      appliedBundlesList
    };
  }, [items, isFastTrack, appliedPromo, RATE]);

  const handleApplyPromo = () => {
    if (VALID_PROMOS[promoCode.toUpperCase()]) {
      setAppliedPromo(promoCode.toUpperCase());
      setPromoError('');
    } else {
      setPromoError('Invalid code');
      setTimeout(() => setPromoError(''), 2000);
    }
  };

  const getUpsells = () => {
    const itemIds = items.map(i => i.id);
    const upsells = [];
    if (itemIds.some(id => id.includes('misa') || id.includes('industrial')) && !itemIds.includes('supp-03')) {
      upsells.push(SERVICES_DB.find(s => s.id === 'supp-03'));
    }
    if (itemIds.includes('cfr-03') && !itemIds.includes('cfr-08')) {
      upsells.push(SERVICES_DB.find(s => s.id === 'cfr-08'));
    }
    if (upsells.length === 0 && !itemIds.includes('supp-06')) {
        upsells.push(SERVICES_DB.find(s => s.id === 'supp-06'));
    }
    return upsells.filter(Boolean).slice(0, 2);
  };

  const recommendedAddons = getUpsells();

  const handleExport = () => {
    const element = document.getElementById('printable-invoice');
    const opt = {
      margin: 0, 
      filename: `SafaArban_Quote_${orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0, windowWidth: 794 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if ((window as any).html2pdf) {
         const btn = document.getElementById('export-btn');
         if(btn) btn.innerText = 'Generating...';
         (window as any).html2pdf().set(opt).from(element).save().then(() => {
            if(btn) btn.innerText = 'Print / Export PDF';
         });
    } else {
        window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-4 md:py-12 px-2 sm:px-4 no-print-bg font-sans">
      <div className="max-w-[210mm] mx-auto">
        
        {/* Header Controls */}
        <div className="no-print flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button onClick={onBack} className="w-full md:w-auto flex items-center justify-center gap-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest transition-all p-4 bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none hover:text-[${BRAND.colors.primary}]" style={{ '--hover-color': BRAND.colors.primary } as React.CSSProperties}>
            <ChevronLeft size={18} /> Modify Selections
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button 
              id="export-btn"
              onClick={handleExport}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
              style={{ color: BRAND.colors.primary }}
            >
              <Download size={16} /> Print / Export PDF
            </button>
            <button 
              onClick={onProceed} 
              disabled={items.length === 0}
              className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md ${items.length === 0 ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' : 'text-white hover:opacity-90'}`}
              style={items.length > 0 ? { backgroundColor: BRAND.colors.secondary } : {}}
            >
              Confirm & Pay <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Upsell Banner (No Print) */}
        <div className="no-print text-white p-6 rounded-[2rem] mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#F26522]/30 relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
           <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: BRAND.colors.secondary, color: BRAND.colors.primary }}>
                 <Zap size={24} fill={BRAND.colors.primary} />
              </div>
              <div>
                 <h3 className="font-black text-lg">Priority Fast-Track?</h3>
                 <p className="text-xs text-white/70 max-w-md">Upgrade to VIP status. We dedicate a senior PRO to your file for 24h MISA processing.</p>
              </div>
           </div>
           <button 
             onClick={() => setIsFastTrack(!isFastTrack)}
             className={`relative z-10 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${isFastTrack ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white/10 hover:bg-white/20 text-white'}`}
           >
             {isFastTrack ? <><CheckCircle2 size={16} /> Fast-Track Active (+25%)</> : "Enable Fast-Track"}
           </button>
        </div>

        {/* Recommended Add-ons (Smart Upsells) */}
        {recommendedAddons.length > 0 && (
          <div className="no-print mb-8">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 pl-2">Missing Essentials?</h3>
             <div className="grid md:grid-cols-2 gap-4">
                {recommendedAddons.map(addon => (
                  <div key={addon!.id} className="bg-white p-4 rounded-2xl border border-dashed border-[#F26522]/30 flex justify-between items-center hover:border-[#F26522] transition-all group">
                     <div>
                        <p className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>{addon!.name}</p>
                        <p className="text-[10px] text-slate-500 mt-1">{addon!.desc.substring(0, 60)}...</p>
                        <p className="text-xs font-mono font-bold mt-1" style={{ color: BRAND.colors.secondary }}>+ {Math.floor(addon!.professionalFee * RATE).toLocaleString()} {currency}</p>
                     </div>
                     <button 
                       onClick={() => onAddItem && onAddItem(addon!.id)}
                       className="p-3 rounded-xl hover:text-white transition-colors"
                       style={{ backgroundColor: `${BRAND.colors.secondary}1A`, color: BRAND.colors.secondary }}
                       onMouseOver={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.secondary; e.currentTarget.style.color = 'white'; }}
                       onMouseOut={(e) => { e.currentTarget.style.backgroundColor = `${BRAND.colors.secondary}1A`; e.currentTarget.style.color = BRAND.colors.secondary; }}
                     >
                       <Plus size={18} />
                     </button>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* DOCUMENT WRAPPER */}
        <div className="overflow-x-auto pb-10 -mx-2 px-2 md:mx-0 md:px-0">
          <div className="bg-white shadow-2xl min-h-[297mm] min-w-[210mm] w-[210mm] relative flex flex-col mx-auto overflow-hidden" id="printable-invoice" style={{ color: BRAND.colors.primary }}>
            
            {/* Background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${BRAND.colors.primary} 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
            <div className="absolute top-0 left-0 w-full h-2 z-10" style={{ background: `linear-gradient(to right, ${BRAND.colors.secondary}, ${BRAND.colors.alert}, ${BRAND.colors.accent})` }}></div>

            {/* Header */}
            <div className="flex justify-between items-start p-12 md:p-14 pb-8 border-b border-slate-100 relative z-10">
                <div>
                  <div className="mb-6">
                    <SafaArbanLogo className="h-14 w-auto" />
                  </div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest space-y-1.5">
                    <p className="flex items-center gap-2"><MapPin size={10} style={{ color: BRAND.colors.secondary }} /> {BRAND.contact.address}</p>
                    <p className="flex items-center gap-2"><Globe size={10} style={{ color: BRAND.colors.secondary }} /> Riyadh, Kingdom of Saudi Arabia</p>
                    <p className="flex items-center gap-2"><FileText size={10} style={{ color: BRAND.colors.secondary }} /> CR: {BRAND.contact.cr} | VAT: {BRAND.contact.vat}</p>
                  </div>
                </div>
                <div className="text-right space-y-4">
                    <div className="text-white p-3 rounded-lg inline-block shadow-lg" style={{ backgroundColor: BRAND.colors.primary }}>
                      <QrCode size={48} className="mx-auto" />
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium">
                        <p>ZATCA Compliant</p>
                        <p>{orderId}</p>
                    </div>
                </div>
            </div>

            <div className="p-12 md:p-14 flex-grow flex flex-col relative z-10">
              
              <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-5xl font-black mb-2 tracking-tight" style={{ color: BRAND.colors.primary }}>QUOTATION</h1>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Business Setup & Advisory Services</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl min-w-[240px]">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-2">
                        <span>Date Issued:</span>
                        <span style={{ color: BRAND.colors.primary }}>{date}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-2">
                        <span>Reference:</span>
                        <span className="font-mono" style={{ color: BRAND.colors.primary }}>{orderId}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-2">
                        <span>Currency:</span>
                        <span className="font-bold" style={{ color: BRAND.colors.primary }}>{currency}</span>
                    </div>
                    {isFastTrack && (
                      <div className="flex justify-between text-[11px] font-bold mt-2 pt-2 border-t border-slate-200" style={{ color: BRAND.colors.alert }}>
                          <span>Priority:</span>
                          <span>FAST-TRACK</span>
                      </div>
                    )}
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-10">
                <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2" style={{ borderColor: BRAND.colors.primary }}>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest w-16" style={{ color: BRAND.colors.primary }}>S.No</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest" style={{ color: BRAND.colors.primary }}>Description of Service</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-right w-40" style={{ color: BRAND.colors.primary }}>Amount ({currency})</th>
                        <th className="py-4 w-10 no-print"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-12 text-center text-slate-400 text-sm italic border-b border-slate-100">
                            No services selected.
                          </td>
                        </tr>
                      ) : (
                        items.map((item, idx) => {
                          // Check if item belongs to an active bundle
                          const relatedBundle = calculation.appliedBundlesList.find(b => b.required.includes(item.id));
                          
                          return (
                            <tr key={item.id} className="border-b border-slate-100 text-sm group hover:bg-slate-50 transition-colors">
                              <td className="py-5 font-bold text-slate-400">{idx + 1}</td>
                              <td className="py-5">
                                <div className="flex items-center gap-2">
                                  <p className="font-bold" style={{ color: BRAND.colors.primary }}>{item.name}</p>
                                  {relatedBundle && (
                                    <span className="no-print bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                                      <Gift size={8} /> Bundle
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                              </td>
                              <td className="py-5 text-right font-mono font-bold" style={{ color: BRAND.colors.primary }}>
                                {Math.floor(item.professionalFee * RATE).toLocaleString()}
                              </td>
                              <td className="py-5 text-right no-print">
                                {onRemoveItem && (
                                  <button onClick={() => onRemoveItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                      
                      {isFastTrack && (
                        <tr className="border-b border-slate-100 text-sm bg-[#F06543]/5">
                           <td className="py-5 font-bold" style={{ color: BRAND.colors.alert }}>*</td>
                           <td className="py-5">
                              <p className="font-bold" style={{ color: BRAND.colors.alert }}>VIP Fast-Track Surcharge</p>
                              <p className="text-xs text-[#E9443E]/70 mt-1">Expedited processing (25%)</p>
                           </td>
                           <td className="py-5 text-right font-mono font-bold" style={{ color: BRAND.colors.alert }}>
                             {calculation.fastTrackFee.toLocaleString()}
                           </td>
                           <td className="no-print"></td>
                        </tr>
                      )}
                    </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="flex justify-between items-end mb-12">
                  <div className="no-print w-64 space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Promo Code</p>
                     <div className="flex gap-2">
                        <div className="relative flex-1">
                           <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                           <input 
                             type="text" 
                             placeholder="CODE" 
                             value={promoCode}
                             onChange={(e) => setPromoCode(e.target.value)}
                             className="w-full pl-9 pr-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-[#C9A86A]/20 uppercase" 
                           />
                        </div>
                        <button 
                          onClick={handleApplyPromo}
                          className="bg-[#051C2C] text-white px-4 py-2 rounded-xl text-xs font-bold"
                        >
                          Apply
                        </button>
                     </div>
                     {appliedPromo && <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 size={10} /> {appliedPromo} Applied</p>}
                     {promoError && <p className="text-[10px] text-red-500 font-bold">{promoError}</p>}
                  </div>

                  <div className="w-72 space-y-3">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                          <span>Subtotal</span>
                          <span>{(calculation.baseProf + calculation.fastTrackFee).toLocaleString()} {currency}</span>
                      </div>
                      
                      {calculation.bundleDiscount > 0 && (
                        <div className="flex justify-between text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                           <span className="flex items-center gap-1"><Gift size={12} /> Bundle Savings</span>
                           <span>- {calculation.bundleDiscount.toLocaleString()} {currency}</span>
                        </div>
                      )}

                      {calculation.promoDiscount > 0 && (
                        <div className="flex justify-between text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                           <span className="flex items-center gap-1"><Tag size={12} /> {appliedPromo}</span>
                           <span>- {calculation.promoDiscount.toLocaleString()} {currency}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-xs font-bold text-slate-500">
                          <span>VAT (15%)</span>
                          <span>{calculation.vat.toLocaleString()} {currency}</span>
                      </div>
                      <div className="h-px bg-slate-200 my-2"></div>
                      <div className="flex justify-between items-center text-white p-4 rounded-xl shadow-lg" style={{ backgroundColor: BRAND.colors.primary }}>
                          <span className="text-xs font-bold uppercase tracking-wider">Total</span>
                          <span className="text-xl font-black">{calculation.invoiceTotal.toLocaleString()} {currency}</span>
                      </div>
                      <p className="text-[9px] text-right text-slate-400 font-medium mt-1">* Govt. Fees (~{calculation.totalGov.toLocaleString()} {currency}) payable at actuals.</p>
                  </div>
              </div>

              {/* Footer Bank Details & Stamp */}
              <div className="mt-auto flex justify-between items-end bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="text-[10px] text-slate-500 space-y-1.5">
                      <p className="font-black uppercase mb-2 flex items-center gap-2" style={{ color: BRAND.colors.primary }}>
                         <Landmark size={12} /> Bank Transfer Details
                      </p>
                      <p>Bank Name: <span className="font-bold" style={{ color: BRAND.colors.primary }}>Arab National Bank (ANB)</span></p>
                      <p>Account Name: <span className="font-bold" style={{ color: BRAND.colors.primary }}>SafaArban Ltd</span></p>
                      <p>IBAN: <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200" style={{ color: BRAND.colors.primary }}>{BRAND.contact.iban}</span></p>
                  </div>
                  
                  <div className="relative text-center w-32 -mb-2">
                      <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                          <OfficialStamp />
                      </div>
                      <div className="border-t border-slate-300 pt-2 relative z-10">
                          <p className="text-[8px] font-black uppercase" style={{ color: BRAND.colors.primary }}>Authorized Signatory</p>
                      </div>
                  </div>
              </div>

            </div>
            
            <div className="text-white p-4 text-center text-[9px] uppercase tracking-widest font-bold border-t-4" style={{ backgroundColor: BRAND.colors.primary, borderColor: BRAND.colors.secondary }}>
              SafaArban Ltd • Building Your Legacy in Saudi Arabia
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; margin: 0; padding: 0; }
          .no-print, .no-print-bg { display: none !important; }
          #printable-invoice { width: 100%; min-height: 100vh; box-shadow: none !important; border: none !important; margin: 0; }
          .overflow-x-auto { overflow: visible !important; }
        }
        .overflow-x-auto::-webkit-scrollbar { height: 4px; }
        .overflow-x-auto::-webkit-scrollbar-thumb { background: ${BRAND.colors.secondary}; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Quotation;
