import React, { useState, useMemo } from 'react';
import { CreditCard, ChevronLeft, ChevronRight, MapPin, Download, Globe, FileText, Landmark, QrCode, Zap, CheckCircle2, Plus, Tag, Gift, Trash2, X, Printer, Loader2 } from 'lucide-react';
import { CartItem } from '../types';
import { BRAND, SERVICES_DB } from '../constants';
import { SafaArbanLogo } from './Logo';

interface QuotationProps {
  items: CartItem[];
  onBack: () => void;
  onProceed: () => void;
  orderId: string;
  onAddItem?: (id: string) => void;
  onRemoveItem?: (id: string) => void;
  currency?: 'SAR' | 'USD';
}

// --- STATIC ASSETS FOR PDF ---
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 84" width="380" height="84"><g transform="translate(4, 4)"><path d="M45 10 L75 10 L55 35 L25 35 Z" fill="#E94E4E" /><path d="M25 40 L55 40 L45 65 L15 65 Z" fill="#0D2B4F" /></g><g transform="translate(90, 52)"><text font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="40" fill="#0D2B4F" letter-spacing="-0.02em">SafaArban</text><text x="215" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="40" fill="#E94E4E" letter-spacing="-0.02em">Ltd</text></g></svg>`;
const LOGO_DATA_URI = `data:image/svg+xml;base64,${btoa(LOGO_SVG)}`;

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

const Quotation: React.FC<QuotationProps> = ({ items, onBack, onProceed, orderId, onAddItem, onRemoveItem, currency = 'SAR' }) => {
  const [isFastTrack, setIsFastTrack] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const RATE = currency === 'USD' ? 0.2666 : 1;
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const validUntil = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

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
    
    if (!element) return;
    setIsDownloading(true);

    const opt = {
      margin: 0, 
      filename: `SafaArban_Invoice_${orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false, 
        scrollY: 0,
        // Remove fixed windowWidth to allow proper A4 scaling from element dimensions
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    if ((window as any).html2pdf) {
         (window as any).html2pdf().set(opt).from(element).save().then(() => {
            setIsDownloading(false);
         }).catch((err: any) => {
            console.error(err);
            setIsDownloading(false);
         });
    } else {
        window.print();
        setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-4 md:py-12 px-2 sm:px-4 no-print-bg font-sans text-slate-800">
      <div className="max-w-[210mm] mx-auto">
        
        {/* Header Controls (No Print) */}
        <div className="no-print flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button onClick={onBack} className="w-full md:w-auto flex items-center justify-center gap-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest transition-all p-4 bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none hover:text-[#0D2B4F]">
            <ChevronLeft size={18} /> Edit Items
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button 
              id="export-btn"
              onClick={handleExport}
              disabled={isDownloading}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm text-[#0D2B4F] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </button>
            <button 
              onClick={onProceed} 
              disabled={items.length === 0}
              className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md ${items.length === 0 ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' : 'text-white hover:opacity-90'}`}
              style={items.length > 0 ? { backgroundColor: BRAND.colors.secondary } : {}}
            >
              Secure Payment <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Upsell Banner (No Print) */}
        <div className="no-print text-white p-6 rounded-[2rem] mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#E94E4E]/30 relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
           <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/10">
                 <Zap size={24} style={{ color: BRAND.colors.secondary }} />
              </div>
              <div>
                 <h3 className="font-black text-lg">Priority Fast-Track?</h3>
                 <p className="text-xs text-white/70 max-w-md">Upgrade to VIP status. We dedicate a senior PRO to your file for 24h MISA processing.</p>
              </div>
           </div>
           <button 
             onClick={() => setIsFastTrack(!isFastTrack)}
             className={`relative z-10 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${isFastTrack ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white text-[#0D2B4F] hover:bg-slate-100'}`}
           >
             {isFastTrack ? <><CheckCircle2 size={16} /> Fast-Track Active</> : "Enable Fast-Track"}
           </button>
        </div>

        {/* Recommended Add-ons (No Print) */}
        {recommendedAddons.length > 0 && (
          <div className="no-print mb-8">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 pl-2">Recommended Add-ons</h3>
             <div className="grid md:grid-cols-2 gap-4">
                {recommendedAddons.map(addon => (
                  <div key={addon!.id} className="bg-white p-4 rounded-2xl border border-dashed border-slate-300 flex justify-between items-center hover:border-[#0D2B4F] transition-all group">
                     <div>
                        <p className="font-bold text-sm text-[#0D2B4F]">{addon!.name}</p>
                        <p className="text-[10px] text-slate-500 mt-1">{addon!.desc.substring(0, 50)}...</p>
                        <p className="text-xs font-mono font-bold mt-1" style={{ color: BRAND.colors.secondary }}>+ {Math.floor(addon!.professionalFee * RATE).toLocaleString()} {currency}</p>
                     </div>
                     <button 
                       onClick={() => onAddItem && onAddItem(addon!.id)}
                       className="p-3 rounded-xl hover:text-white transition-colors bg-slate-50 text-[#0D2B4F]"
                       onMouseOver={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.secondary; e.currentTarget.style.color = 'white'; }}
                       onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#F8FAFC'; e.currentTarget.style.color = '#0D2B4F'; }}
                     >
                       <Plus size={18} />
                     </button>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* --- INVOICE DOCUMENT --- */}
        <div className="overflow-x-auto pb-10 -mx-2 px-2 md:mx-0 md:px-0">
          <div id="printable-invoice" className="bg-white shadow-2xl w-[210mm] min-h-[297mm] mx-auto relative flex flex-col overflow-hidden text-[#0D2B4F]">
            
            {/* Top Color Bar */}
            <div className="h-3 w-full bg-gradient-to-r from-[#0D2B4F] via-[#E94E4E] to-[#F7C948]"></div>

            {/* Watermark */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            {/* Header */}
            <header className="px-12 pt-12 pb-8 flex justify-between items-start relative z-10">
                <div>
                    <img src={LOGO_DATA_URI} alt="SafaArban Logo" className="h-14 w-auto mb-6" />
                    <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 space-y-1.5">
                        <p className="flex items-center gap-2"><MapPin size={10} /> {BRAND.contact.address}</p>
                        <p className="flex items-center gap-2"><Globe size={10} /> Riyadh, Kingdom of Saudi Arabia</p>
                        <p className="flex items-center gap-2"><FileText size={10} /> CR: {BRAND.contact.cr} | VAT: {BRAND.contact.vat}</p>
                    </div>
                </div>
                <div className="text-right">
                    <h1 className="text-5xl font-black text-[#0D2B4F] tracking-tighter mb-2">INVOICE</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6"># {orderId}</p>
                    <div className="inline-block p-2 bg-white border border-slate-100 shadow-sm rounded-xl">
                        <QrCode size={64} className="text-[#0D2B4F]" />
                    </div>
                </div>
            </header>

            {/* Divider */}
            <div className="mx-12 border-b border-slate-100"></div>

            {/* Info Grid */}
            <div className="px-12 py-8 grid grid-cols-2 gap-12 relative z-10">
                <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#E94E4E] mb-4">Bill To</h3>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="font-bold text-[#0D2B4F] text-lg mb-1">Valued Client</p>
                        <div className="text-xs font-medium text-slate-500 space-y-1">
                            <p>Attn: Procurement Dept</p>
                            <p>Ref: Online Quotation</p>
                            <p>Saudi Arabia</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Issue Date</h3>
                        <p className="text-sm font-bold text-[#0D2B4F] border-b border-slate-100 pb-1">{date}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Valid Until</h3>
                        <p className="text-sm font-bold text-[#0D2B4F] border-b border-slate-100 pb-1">{validUntil}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Currency</h3>
                        <p className="text-sm font-bold text-[#0D2B4F] border-b border-slate-100 pb-1">{currency}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Status</h3>
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-black uppercase">Draft</span>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="px-12 py-4 flex-grow relative z-10">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-[#0D2B4F]">
                            <th className="py-4 text-xs font-black uppercase tracking-widest text-[#0D2B4F] w-12">#</th>
                            <th className="py-4 text-xs font-black uppercase tracking-widest text-[#0D2B4F]">Description</th>
                            <th className="py-4 text-xs font-black uppercase tracking-widest text-[#0D2B4F] text-right">Govt. Fee</th>
                            <th className="py-4 text-xs font-black uppercase tracking-widest text-[#0D2B4F] text-right">Amount ({currency})</th>
                            <th className="py-4 w-8 no-print"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-slate-400 text-sm italic">
                                    No services selected.
                                </td>
                            </tr>
                        ) : (
                            items.map((item, idx) => {
                                const relatedBundle = calculation.appliedBundlesList.find(b => b.required.includes(item.id));
                                return (
                                    <tr key={item.id} className="group">
                                        <td className="py-5 font-bold text-slate-400 align-top">{idx + 1}</td>
                                        <td className="py-5 align-top">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-[#0D2B4F]">{item.name}</span>
                                                {relatedBundle && (
                                                    <span className="bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                                                        <Gift size={8} /> Bundle
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 max-w-md">{item.desc}</p>
                                        </td>
                                        <td className="py-5 text-right font-medium text-slate-500 text-xs align-top">
                                            {item.governmentFee > 0 ? `~${Math.floor(item.governmentFee * RATE).toLocaleString()}` : '-'}
                                        </td>
                                        <td className="py-5 text-right font-mono font-bold text-[#0D2B4F] align-top">
                                            {Math.floor(item.professionalFee * RATE).toLocaleString()}
                                        </td>
                                        <td className="py-5 text-right no-print align-top">
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
                            <tr className="bg-[#F26522]/5">
                                <td className="py-5 font-bold text-[#F26522] align-top">*</td>
                                <td className="py-5 align-top">
                                    <p className="font-bold text-[#F26522]">VIP Fast-Track Surcharge</p>
                                    <p className="text-xs text-[#F26522]/70">Expedited processing & dedicated PRO (25%)</p>
                                </td>
                                <td className="py-5 text-right text-xs text-slate-400 align-top">-</td>
                                <td className="py-5 text-right font-mono font-bold text-[#F26522] align-top">
                                    {calculation.fastTrackFee.toLocaleString()}
                                </td>
                                <td className="no-print"></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Summary & Bank Section */}
            <div className="px-12 pb-12 grid grid-cols-2 gap-12 relative z-10 mt-auto">
                {/* Bank Details */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#E94E4E]"></div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#0D2B4F] mb-4 flex items-center gap-2">
                        <Landmark size={14} /> Bank Transfer Details
                    </h3>
                    <div className="space-y-3 text-xs font-medium text-slate-600">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span>Bank Name</span>
                            <span className="font-bold text-[#0D2B4F]">Al-Rajhi Bank</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span>Account Name</span>
                            <span className="font-bold text-[#0D2B4F]">SafaArban Ltd</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span>Account No</span>
                            <span className="font-bold text-[#0D2B4F] font-mono">{BRAND.contact.accountNumber}</span>
                        </div>
                        <div className="pt-1">
                            <span className="block mb-1 text-[10px] uppercase text-slate-400 font-bold">IBAN (SAUDI RIYAL)</span>
                            <span className="font-mono font-bold text-[#0D2B4F] text-sm tracking-wider bg-white px-2 py-1 border border-slate-200 rounded block text-center">
                                {BRAND.contact.iban}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-4">
                    {/* Promo Input (No Print) */}
                    <div className="no-print flex gap-2 mb-4">
                        <input 
                            type="text" 
                            placeholder="PROMO CODE" 
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold w-full uppercase outline-none focus:border-[#E94E4E]" 
                        />
                        <button onClick={handleApplyPromo} className="bg-[#0D2B4F] text-white px-4 py-2 rounded-lg text-xs font-bold">Apply</button>
                    </div>
                    {promoError && <p className="no-print text-[10px] text-red-500 font-bold">{promoError}</p>}

                    <div className="flex justify-between text-sm font-medium text-slate-500">
                        <span>Subtotal</span>
                        <span className="font-mono">{(calculation.baseProf + calculation.fastTrackFee).toLocaleString()}</span>
                    </div>
                    
                    {calculation.bundleDiscount > 0 && (
                        <div className="flex justify-between text-sm font-bold text-emerald-600">
                            <span>Bundle Savings</span>
                            <span className="font-mono">- {calculation.bundleDiscount.toLocaleString()}</span>
                        </div>
                    )}

                    {calculation.promoDiscount > 0 && (
                        <div className="flex justify-between text-sm font-bold text-emerald-600">
                            <span>Promo ({appliedPromo})</span>
                            <span className="font-mono">- {calculation.promoDiscount.toLocaleString()}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-sm font-medium text-slate-500">
                        <span>VAT (15%)</span>
                        <span className="font-mono">{calculation.vat.toLocaleString()}</span>
                    </div>
                    
                    <div className="h-px bg-slate-200 my-2"></div>
                    
                    <div className="flex justify-between items-center bg-[#0D2B4F] text-white p-5 rounded-xl shadow-lg">
                        <span className="font-black uppercase tracking-widest text-sm">Total Due</span>
                        <span className="font-mono font-black text-2xl">{calculation.invoiceTotal.toLocaleString()} {currency}</span>
                    </div>
                    
                    <p className="text-[9px] text-right text-slate-400 mt-2 font-medium">
                       * Est. Govt Fees: {calculation.totalGov.toLocaleString()} {currency} (Payable at actuals via SADAD)
                    </p>
                </div>
            </div>

            {/* Footer / Digital Verification */}
            <div className="px-12 pb-12 flex justify-between items-end relative z-10">
                <div className="text-[9px] text-slate-400 max-w-sm leading-relaxed space-y-1">
                    <p className="font-bold text-[#0D2B4F] mb-1 uppercase tracking-widest">Terms & Conditions</p>
                    <p>1. Professional fees are non-refundable once portal submission is initiated.</p>
                    <p>2. Government fees are estimated and subject to change by authorities.</p>
                    <p>3. This quotation is valid for 14 days from the issue date.</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#0D2B4F] opacity-50">Digital Invoice</p>
                    <p className="text-[8px] text-slate-400 mt-1">This document is electronically generated and valid without signature.</p>
                </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="h-3 bg-[#0D2B4F] mt-auto"></div>
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
      `}</style>
    </div>
  );
};

export default Quotation;