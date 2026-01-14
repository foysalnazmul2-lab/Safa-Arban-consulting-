
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
  <svg width="180" height="180" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-90 mix-blend-multiply pointer-events-none select-none rotate-[-12deg]">
    <defs>
      <path id="sealTop" d="M 25,100 A 75,75 0 0,1 175,100" fill="none" />
      <path id="sealBottom" d="M 25,100 A 75,75 0 0,0 175,100" fill="none" />
    </defs>
    
    {/* Outer Double Ring */}
    <circle cx="100" cy="100" r="95" fill="none" stroke="#1e40af" strokeWidth="3" />
    <circle cx="100" cy="100" r="88" fill="none" stroke="#1e40af" strokeWidth="1" />
    
    {/* Inner Ring */}
    <circle cx="100" cy="100" r="62" fill="none" stroke="#1e40af" strokeWidth="1" />

    {/* Curved Text - Top */}
    <text fill="#1e40af" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">
      <textPath href="#sealTop" startOffset="50%" textAnchor="middle">
        SAFAARBAN LTD
      </textPath>
    </text>
    
    {/* Curved Text - Bottom */}
    <text fill="#1e40af" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">
       <textPath href="#sealBottom" startOffset="50%" textAnchor="middle">
         RIYADH, SAUDI ARABIA
       </textPath>
    </text>
    
    {/* Decorative Stars */}
    <text x="18" y="105" fill="#1e40af" fontSize="16" fontWeight="bold" dominantBaseline="middle">★</text>
    <text x="168" y="105" fill="#1e40af" fontSize="16" fontWeight="bold" dominantBaseline="middle">★</text>

    {/* Center Block */}
    <g transform="translate(100, 100)" textAnchor="middle">
        <text y="-18" fontSize="9" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#1e40af">CR No</text>
        <text y="-6" fontSize="11" fontWeight="bold" fontFamily="Courier New, monospace" fill="#1e40af">{BRAND.contact.cr}</text>
        <text y="12" fontSize="9" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#1e40af">VAT No</text>
        <text y="24" fontSize="11" fontWeight="bold" fontFamily="Courier New, monospace" fill="#1e40af">{BRAND.contact.vat}</text>
    </g>
  </svg>
);

const Quotation: React.FC<QuotationProps> = ({ items, onBack, onProceed, orderId }) => {
  const totalProf = items.reduce((sum, i) => sum + i.professionalFee, 0);
  const totalGov = items.reduce((sum, i) => sum + i.governmentFee, 0);
  const vat = totalProf * 0.15; 
  const invoiceTotal = totalProf + vat;
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const handleExport = () => {
    const element = document.getElementById('printable-invoice');
    const opt = {
      margin: 0, // No margin to keep full design
      filename: `SafaArban_Quote_${orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        scrollY: 0,
        windowWidth: 794 // A4 width in pixels approx (96 DPI)
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if ((window as any).html2pdf) {
         // Add loading state logic if needed, but for now direct call
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
        
        {/* Responsive Header Controls */}
        <div className="no-print flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button onClick={onBack} className="w-full md:w-auto flex items-center justify-center gap-2 text-slate-500 hover:text-[#0A1A2F] font-bold uppercase text-[10px] tracking-widest transition-all p-4 bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none">
            <ChevronLeft size={18} /> Modify Selections
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button 
              id="export-btn"
              onClick={handleExport}
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
            
            {/* Professional Header */}
            <div className="flex justify-between items-start p-12 md:p-16 pb-8 border-b-4 border-[#0A1A2F]">
                <div>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-black tracking-tighter text-[#0A1A2F]">SAFA</span>
                    <span className="text-4xl font-black tracking-tighter text-[#C9A86A]">ARBAN</span>
                  </div>
                  <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest space-y-1">
                    <p>Business Setup Consultants</p>
                    <p>{BRAND.contact.address}</p>
                    <p>Riyadh, Saudi Arabia</p>
                  </div>
                </div>
                <div className="text-right text-[10px] text-slate-500 font-medium space-y-1">
                    <p><span className="font-bold text-[#0A1A2F]">Mobile:</span> {BRAND.contact.phone}</p>
                    <p><span className="font-bold text-[#0A1A2F]">Email:</span> {BRAND.contact.email}</p>
                    <p><span className="font-bold text-[#0A1A2F]">Web:</span> www.safaarban.com</p>
                </div>
            </div>

            <div className="p-12 md:p-16 flex-grow flex flex-col">
              
              <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-black text-[#0A1A2F] mb-1">QUOTATION</h1>
                    <p className="text-xs text-slate-500 font-medium">For Establishment of Business Entity in Saudi Arabia</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl min-w-[200px]">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                        <span>Date:</span>
                        <span className="text-[#0A1A2F]">{date}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                        <span>Ref No:</span>
                        <span className="text-[#0A1A2F] font-mono">{orderId}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>Validity:</span>
                        <span className="text-[#0A1A2F]">30 Days</span>
                    </div>
                </div>
              </div>

              {/* Client & Service Info */}
              <div className="grid grid-cols-2 gap-12 mb-12 border-b border-slate-100 pb-8">
                <div>
                    <h3 className="text-[11px] font-black uppercase text-[#0A1A2F] tracking-widest mb-3 border-b border-[#C9A86A] w-fit pb-1">Client Information</h3>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p><span className="font-bold">Name:</span> Valued Client</p>
                      <p><span className="font-bold">Location:</span> Saudi Arabia / International</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-[11px] font-black uppercase text-[#0A1A2F] tracking-widest mb-3 border-b border-[#C9A86A] w-fit pb-1">Scope of Engagement</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        SafaArban Business Setup Consultants will provide end-to-end services for the selected scope, ensuring compliance with MISA, Ministry of Commerce, and ZATCA regulations.
                    </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <h3 className="text-[11px] font-black uppercase text-[#0A1A2F] tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#0A1A2F]"></div> Quotation Amount
                </h3>
                <table className="w-full text-left border-collapse border border-slate-200">
                    <thead>
                      <tr className="bg-[#0A1A2F] text-white">
                        <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest w-16 text-center border-r border-white/10">S.No</th>
                        <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest border-r border-white/10">Description</th>
                        <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-right w-32">Amount (SAR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-8 text-center text-slate-400 text-xs italic">
                            No services selected.
                          </td>
                        </tr>
                      ) : (
                        items.map((item, idx) => (
                          <tr key={item.id} className="border-b border-slate-100 text-sm">
                            <td className="py-4 px-4 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                            <td className="py-4 px-4 border-r border-slate-100">
                              <p className="font-bold text-[#0A1A2F]">{item.name}</p>
                              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                            </td>
                            <td className="py-4 px-4 text-right font-mono font-bold text-[#0A1A2F]">{item.professionalFee.toLocaleString()}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                </table>
              </div>

              {/* Totals & Notes */}
              <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                  <div className="flex-1 space-y-4">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h4 className="text-[10px] font-black uppercase text-[#0A1A2F] mb-2">Government Fees Note</h4>
                          <p className="text-[10px] text-slate-500 leading-relaxed">
                              * Government fees (approx {totalGov.toLocaleString()} SAR) are excluded from the service total above and are payable at actuals via SADAD or directly to the relevant authority.
                          </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h4 className="text-[10px] font-black uppercase text-[#0A1A2F] mb-2">Payment Terms</h4>
                          <ul className="text-[10px] text-slate-500 list-disc pl-4 space-y-1">
                              <li>50% Advance upon initiation.</li>
                              <li>50% Upon C.R. issuance & document delivery.</li>
                          </ul>
                      </div>
                  </div>

                  <div className="w-full md:w-72">
                      <div className="border border-slate-200 rounded-xl overflow-hidden">
                          <div className="flex justify-between p-3 bg-slate-50 border-b border-slate-100">
                              <span className="text-[10px] font-bold text-slate-500 uppercase">Subtotal</span>
                              <span className="text-sm font-bold text-[#0A1A2F]">{totalProf.toLocaleString()} SAR</span>
                          </div>
                          <div className="flex justify-between p-3 bg-slate-50 border-b border-slate-100">
                              <span className="text-[10px] font-bold text-slate-500 uppercase">VAT (15%)</span>
                              <span className="text-sm font-bold text-[#0A1A2F]">{vat.toLocaleString()} SAR</span>
                          </div>
                          <div className="flex justify-between p-4 bg-[#0A1A2F] text-white">
                              <span className="text-xs font-bold uppercase">Total Service Fee</span>
                              <span className="text-lg font-black">{invoiceTotal.toLocaleString()} SAR</span>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="mt-auto pt-8 border-t border-slate-200 flex justify-between items-end">
                  <div className="text-[10px] text-slate-500 space-y-1">
                      <p className="font-bold text-[#0A1A2F] uppercase mb-1">Payment Instructions</p>
                      <p>Bank Name: <span className="font-bold">Arab National Bank</span></p>
                      <p>Account Name: <span className="font-bold">SafaArban Ltd</span></p>
                      <p>IBAN: <span className="font-mono font-bold text-[#0A1A2F] bg-slate-100 px-1">{BRAND.contact.iban}</span></p>
                  </div>
                  
                  <div className="relative text-center w-40">
                      <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                          <OfficialStamp />
                      </div>
                      <div className="border-t border-slate-300 pt-2 mt-10">
                          <p className="text-[10px] font-bold uppercase text-[#0A1A2F]">Authorized Signatory</p>
                          <p className="text-[9px] text-slate-400">SafaArban Ltd</p>
                      </div>
                  </div>
              </div>
            </div>
            
            <div className="bg-[#0A1A2F] text-white p-3 text-center text-[8px] uppercase tracking-widest font-medium border-t border-[#C9A86A]">
              SafaArban Ltd | CR No: {BRAND.contact.cr} | VAT No: {BRAND.contact.vat} | Riyadh, Saudi Arabia
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
