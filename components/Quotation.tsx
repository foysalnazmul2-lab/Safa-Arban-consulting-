
import React from 'react';
import { CreditCard, ChevronLeft, ChevronRight, MapPin, Phone, Download, Globe, FileText, Landmark, MousePointer2 } from 'lucide-react';
import { CartItem } from '../types';
import { BRAND } from '../constants';

interface QuotationProps {
  items: CartItem[];
  onBack: () => void;
  onProceed: () => void;
  orderId: string;
}

const OfficialStamp = () => (
  <svg width="160" height="160" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-90 mix-blend-multiply pointer-events-none select-none">
    <defs>
      <path id="textTop" d="M 40,100 A 60,60 0 0,1 160,100" fill="none" />
      <path id="textBottom" d="M 35,100 A 65,65 0 0,0 165,100" fill="none" />
    </defs>
    <g stroke="#0F2847" fill="none" strokeWidth="2">
      <circle cx="100" cy="100" r="90" strokeWidth="3" />
      <circle cx="100" cy="100" r="85" strokeWidth="1" />
      <circle cx="100" cy="100" r="60" strokeWidth="1" />
    </g>
    <text fill="#0F2847" fontSize="10" fontWeight="bold" fontFamily="serif" letterSpacing="1.5">
      <textPath href="#textTop" startOffset="50%" textAnchor="middle">
        ★ SAFA ARBAN LTD ★
      </textPath>
    </text>
    <text fill="#0F2847" fontSize="10" fontWeight="bold" fontFamily="serif" letterSpacing="1">
       <textPath href="#textBottom" startOffset="50%" textAnchor="middle">
         C.R. {BRAND.contact.cr}
       </textPath>
    </text>
    <g transform="translate(100, 100)" fill="#0F2847" textAnchor="middle">
        <text y="-5" fontSize="14" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">OFFICIAL</text>
        <text y="12" fontSize="14" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">SEAL</text>
        <text y="28" fontSize="7" fontWeight="bold" fontFamily="monospace">RIYADH</text>
    </g>
  </svg>
);

const Quotation: React.FC<QuotationProps> = ({ items, onBack, onProceed, orderId }) => {
  const totalProf = items.reduce((sum, i) => sum + i.professionalFee, 0);
  const totalGov = items.reduce((sum, i) => sum + i.governmentFee, 0);
  const vat = totalProf * 0.15; 
  const invoiceTotal = totalProf + vat;
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-100 py-4 md:py-12 px-2 sm:px-4 no-print-bg font-sans">
      <div className="max-w-[210mm] mx-auto">
        
        {/* Responsive Header Controls */}
        <div className="no-print flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button onClick={onBack} className="w-full md:w-auto flex items-center justify-center gap-2 text-slate-500 hover:text-[#0A1A2F] font-bold uppercase text-[10px] tracking-widest transition-all p-4 bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none">
            <ChevronLeft size={18} /> Modify Selections
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button 
              onClick={() => window.print()} 
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-[#0A1A2F] px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
            >
              <Download size={16} /> Print / Export PDF
            </button>
            <button 
              onClick={onProceed} 
              disabled={items.length === 0}
              className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md ${items.length === 0 ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' : 'bg-[#006C35] text-white hover:bg-[#005a2c]'}`}
            >
              Confirm & Pay <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-4 text-[#C9A86A] animate-bounce no-print">
           <MousePointer2 size={14} className="rotate-90" />
           <span className="text-[9px] font-black uppercase tracking-widest">Swipe to preview document</span>
        </div>

        {/* DOCUMENT WRAPPER WITH SCROLL */}
        <div className="overflow-x-auto pb-10 -mx-2 px-2 md:mx-0 md:px-0">
          <div className="bg-white shadow-2xl min-h-[297mm] min-w-[210mm] w-[210mm] relative flex flex-col text-[#0A1A2F] mx-auto border border-slate-200" id="printable-invoice">
            
            <div className="h-2 w-full bg-[#0A1A2F]"></div>

            <div className="p-12 md:p-16 flex-grow flex flex-col">
              
              <div className="flex justify-between items-start border-b border-slate-100 pb-12 mb-12">
                <div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black tracking-tighter text-[#0A1A2F]">SAFA</span>
                    <span className="text-4xl font-black tracking-tighter text-[#C9A86A]">ARBAN</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest space-y-1.5">
                    <p>{BRAND.fullName}</p>
                    <p>CR: {BRAND.contact.cr} | VAT: {BRAND.contact.vat}</p>
                    <p className="max-w-[300px] leading-relaxed">{BRAND.contact.address}</p>
                  </div>
                </div>

                <div className="text-right">
                  <h1 className="text-5xl font-light text-slate-200 tracking-wide uppercase mb-6">Quote</h1>
                  <div className="space-y-2">
                    <div className="flex items-center justify-end gap-6">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">ID Reference</span>
                        <span className="text-sm font-black text-[#0A1A2F] font-mono">{orderId}</span>
                    </div>
                    <div className="flex items-center justify-end gap-6">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Issue Date</span>
                        <span className="text-sm font-black text-[#0A1A2F]">{date}</span>
                    </div>
                    <div className="flex items-center justify-end gap-6 pt-2">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Exp Date</span>
                        <span className="text-sm font-black text-[#0A1A2F]">{(new Date(Date.now() + 14*24*60*60*1000)).toLocaleDateString('en-GB')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-16 mb-16">
                <div>
                    <h3 className="text-[11px] font-black uppercase text-[#C9A86A] tracking-[0.3em] mb-6">Service Provider</h3>
                    <div className="text-sm text-slate-600 space-y-2 leading-relaxed">
                      <p className="font-bold text-[#0A1A2F]">{BRAND.fullName}</p>
                      <p>Corporate HQ Riyadh</p>
                      <p>Gateway Hub, Olaya District</p>
                      <p>{BRAND.contact.email}</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] mb-6">Prepared For</h3>
                    <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
                      <p className="text-xs text-slate-400 font-bold leading-relaxed">The following breakdown is tailored to your business profile. Details will be finalized upon authorization.</p>
                    </div>
                </div>
              </div>

              <div className="mb-12">
                <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-y border-slate-100">
                        <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 w-16 text-center">No.</th>
                        <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Strategic Service Description</th>
                        <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Fee (SAR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-16 text-center text-slate-300 text-sm font-black uppercase tracking-widest bg-slate-50/50">
                            Selection empty.
                          </td>
                        </tr>
                      ) : (
                        items.map((item, idx) => (
                          <tr key={item.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
                            <td className="py-6 px-6 text-xs font-black text-slate-300 text-center">{(idx + 1).toString().padStart(2, '0')}</td>
                            <td className="py-6 px-6">
                              <p className="text-sm font-black text-[#0A1A2F]">{item.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{item.category}</p>
                            </td>
                            <td className="py-6 px-6 text-right text-sm font-black font-mono">{item.professionalFee.toLocaleString()}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                </table>
              </div>

              {totalGov > 0 && (
                <div className="mb-16 bg-[#006C35]/5 border border-[#006C35]/10 rounded-[2rem] p-6 flex gap-6 items-center">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-[#006C35]">
                      <Landmark size={24} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-[#006C35] uppercase tracking-[0.2em] mb-1">Pass-Through Government Costs</p>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                          SADAD official costs (~{totalGov.toLocaleString()} SAR) are estimated liabilities payable to KSA authorities. These are not professional income for SafaArban.
                      </p>
                    </div>
                </div>
              )}

              <div className="mt-auto">
                <div className="flex justify-between items-end gap-20 border-t border-slate-100 pt-10">
                    <div className="flex-1">
                      <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-6">Payment Authorization Gateway</h4>
                      <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                         <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Bank Name</p>
                            <p className="text-xs font-black text-[#0A1A2F]">Arab National Bank</p>
                         </div>
                         <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Account Holder</p>
                            <p className="text-xs font-black text-[#0A1A2F]">SafaArban Ltd</p>
                         </div>
                         <div className="col-span-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">IBAN (International Business Account Number)</p>
                            <p className="text-sm font-black text-[#0A1A2F] font-mono tracking-wider">{BRAND.contact.iban}</p>
                         </div>
                      </div>
                    </div>

                    <div className="w-[300px]">
                      <div className="space-y-4">
                          <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                            <span>Subtotal</span>
                            <span className="font-mono text-[#0A1A2F]">{totalProf.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                            <span>VAT (15%)</span>
                            <span className="font-mono text-[#0A1A2F]">{vat.toLocaleString()}</span>
                          </div>
                          <div className="h-px bg-slate-100"></div>
                          <div className="flex justify-between items-baseline pt-2">
                            <span className="text-sm font-black text-[#0A1A2F] uppercase tracking-[0.2em]">Net Total</span>
                            <span className="text-4xl font-black text-[#0A1A2F] font-mono tracking-tighter">{invoiceTotal.toLocaleString()} <span className="text-[10px] text-slate-300 font-sans">SAR</span></span>
                          </div>
                      </div>
                    </div>
                </div>

                <div className="mt-20 flex justify-between items-end border-t border-slate-50 pt-10">
                    <div className="text-[9px] text-slate-400 space-y-2 uppercase font-black tracking-widest">
                      <p className="text-[#0A1A2F]">Legal Disclosure</p>
                      <p>• Prices exclude municipal specific levies.</p>
                      <p>• Subject to SafaArban Elite Service Agreement.</p>
                    </div>
                    
                    <div className="relative text-center">
                      <div className="absolute -top-32 left-1/2 -translate-x-1/2">
                          <OfficialStamp />
                      </div>
                      <div className="relative z-10 pt-10 border-t border-slate-200 w-56 mt-10">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Certified Signature</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0A1A2F] text-white p-4 text-center text-[9px] uppercase tracking-[0.4em] font-black">
              Vision 2030 Strategic Partner • SafaArban Elite Gateway • Riyadh, KSA
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
        .overflow-x-auto::-webkit-scrollbar-thumb { background: #C9A86A; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Quotation;
