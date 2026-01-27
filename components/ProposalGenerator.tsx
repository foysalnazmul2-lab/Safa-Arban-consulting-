
import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { 
  FileText, 
  Download, 
  Calculator, 
  User, 
  Briefcase, 
  RefreshCw,
  ArrowLeft,
  Plus,
  Trash2,
  Eye,
  ShieldCheck,
  Save,
  History,
  Hash,
  PenTool,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { BRAND, SERVICES_DB } from '../constants';
import { SafaArbanLogo } from './Logo';
import { SmartContract } from '../types';

interface ProposalGeneratorProps {
  onBack: () => void;
}

const ProposalGenerator: React.FC<ProposalGeneratorProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'create' | 'vault'>('create');
  
  // --- CREATE STATE ---
  const [clientName, setClientName] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [serviceMode, setServiceMode] = useState<'standard' | 'custom'>('standard');
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES_DB[0]?.id || '');
  const [customServiceName, setCustomServiceName] = useState('');
  
  const [scopeItems, setScopeItems] = useState<string[]>(['Strategic Consultation', 'Document Preparation & Review', 'Government Portal Submission']);
  const [preamble] = useState(`SafaArban Ltd is pleased to submit this proposal to support your entry into the Kingdom of Saudi Arabia. As your designated corporate services provider, we will act as the primary liaison with all relevant government authorities, including the Ministry of Investment (MISA) and Ministry of Commerce (MC), ensuring full regulatory compliance in line with Vision 2030.`);

  const [baseFee, setBaseFee] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [vatRate] = useState<number>(15);
  const [paymentTerms, setPaymentTerms] = useState<'standard' | '50-50' | 'upfront'>('standard');
  const [validityDays] = useState(14);
  const [isSigned, setIsSigned] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSection, setActiveSection] = useState<'details' | 'scope' | 'finance'>('details');

  // --- VAULT STATE ---
  const [savedProposals, setSavedProposals] = useState<SmartContract[]>([]);

  // Initialization
  useEffect(() => {
    generateRef();
    loadVault();
    const initialService = SERVICES_DB[0];
    if (initialService) {
        setBaseFee(initialService.professionalFee);
        if (initialService.details) setScopeItems([...initialService.details]);
    }
  }, []);

  const generateRef = () => {
    const randomRef = `SA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefNumber(randomRef);
  };

  const loadVault = () => {
    const data = localStorage.getItem('safa_vault');
    if (data) setSavedProposals(JSON.parse(data));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedServiceId(id);
    const service = SERVICES_DB.find(s => s.id === id);
    if (service) {
        setBaseFee(service.professionalFee);
        if (service.details && service.details.length > 0) {
            setScopeItems([...service.details]);
        } else if (service.inclusions && service.inclusions.length > 0) {
            setScopeItems([...service.inclusions]);
        } else {
            setScopeItems(['Strategic Consultation', 'Document Preparation & Review', 'Government Portal Submission']);
        }
    }
  };

  const addScopeItem = () => setScopeItems([...scopeItems, '']);
  const updateScopeItem = (idx: number, val: string) => {
    const newItems = [...scopeItems];
    newItems[idx] = val;
    setScopeItems(newItems);
  };
  const removeScopeItem = (idx: number) => setScopeItems(scopeItems.filter((_, i) => i !== idx));

  const getServiceName = () => {
      if (serviceMode === 'custom') return customServiceName || 'Custom Service';
      const service = SERVICES_DB.find(s => s.id === selectedServiceId);
      return service ? service.name : 'Selected Service';
  };

  const financials = () => {
      const discountedFee = baseFee - (baseFee * (discount / 100));
      const vatAmount = discountedFee * (vatRate / 100);
      const total = discountedFee + vatAmount;
      return { discountedFee, vatAmount, total };
  };

  const { discountedFee, vatAmount, total } = financials();

  const getPaymentSchedule = () => {
      if (paymentTerms === 'upfront') return [{ name: '1. Upon Signing', pct: '100%', amount: total }];
      if (paymentTerms === '50-50') return [
          { name: '1. Mobilization', pct: '50%', amount: total * 0.5 },
          { name: '2. Completion', pct: '50%', amount: total * 0.5 }
      ];
      return [
          { name: '1. Mobilization', pct: '40%', amount: total * 0.4 },
          { name: '2. Submission', pct: '30%', amount: total * 0.3 },
          { name: '3. Handover', pct: '30%', amount: total * 0.3 }
      ];
  };

  const generateSmartHash = () => {
      return Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
  };

  const handleSaveToVault = () => {
      if (!clientName) { alert("Client Name Required"); return; }
      const newProposal: SmartContract = {
          id: refNumber,
          clientName,
          serviceName: getServiceName(),
          total,
          date: new Date().toISOString(),
          status: isSigned ? 'Signed' : 'Draft',
          hash: generateSmartHash(),
          items: scopeItems
      };
      
      const updated = [newProposal, ...savedProposals];
      setSavedProposals(updated);
      localStorage.setItem('safa_vault', JSON.stringify(updated));
      alert("Secured in Smart Vault");
      setActiveTab('vault');
  };

  const handleDelete = (id: string) => {
      const updated = savedProposals.filter(p => p.id !== id);
      setSavedProposals(updated);
      localStorage.setItem('safa_vault', JSON.stringify(updated));
  };

  const handleGeneratePDF = () => {
    if (!clientName || (serviceMode === 'custom' && !customServiceName)) {
      alert("Please fill in client name and service details.");
      return;
    }

    setIsGenerating(true);
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const smartHash = generateSmartHash();
    
    // Helper: Header & Footer
    const addHeaderFooter = (pageNum: number) => {
        doc.setDrawColor(230);
        doc.setLineWidth(0.5);
        doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);
        
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text("SafaArban Ltd • King Fahd Road, Riyadh • CR: 1010989782", margin, pageHeight - 12);
        doc.text(`Page ${pageNum} • Hash: ${smartHash}`, pageWidth - margin, pageHeight - 12, { align: 'right' });
    };

    // --- COVER PAGE ---
    doc.setFillColor(13, 43, 79);
    doc.rect(0, 0, pageWidth, 15, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(13, 43, 79);
    doc.text("SafaArban", margin, 50);
    
    doc.setFontSize(10);
    doc.setTextColor(233, 78, 78);
    doc.text("PREMIUM GOVERNMENT LIAISON", margin, 56);

    doc.setFontSize(36);
    doc.setTextColor(0);
    doc.text("SMART", margin, 110);
    doc.text("CONTRACT", margin, 125);

    doc.setFontSize(12);
    doc.setTextColor(80);
    doc.text("PREPARED FOR:", margin, 150);
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text(clientName, margin, 158);

    doc.setFontSize(12);
    doc.setTextColor(80);
    doc.text("PROJECT:", margin, 175);
    doc.setFontSize(14);
    doc.setTextColor(0);
    const serviceName = getServiceName();
    const splitTitle = doc.splitTextToSize(serviceName, 100);
    doc.text(splitTitle, margin, 183);

    if (isSigned) {
        doc.setTextColor(0, 108, 53);
        doc.setFontSize(10);
        doc.text("[ DIGITAL SIGNATURE VERIFIED ]", margin, 200);
    }

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, margin, 240);
    doc.text(`Valid Until: ${new Date(Date.now() + validityDays * 86400000).toLocaleDateString('en-GB')}`, margin, 246);
    doc.text(`Reference: ${refNumber}`, margin, 252);

    addHeaderFooter(1);
    doc.addPage();

    // --- SCOPE PAGE ---
    let yPos = 30;
    doc.setFontSize(16);
    doc.setTextColor(13, 43, 79);
    doc.text("Executive Summary", margin, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setTextColor(60);
    const splitPreamble = doc.splitTextToSize(preamble, pageWidth - (margin * 2));
    doc.text(splitPreamble, margin, yPos);
    yPos += (splitPreamble.length * 5) + 15;

    doc.setFontSize(16);
    doc.setTextColor(13, 43, 79);
    doc.text("Scope of Services", margin, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setTextColor(50);
    scopeItems.filter(i => i.trim() !== '').forEach(item => {
        doc.setFillColor(233, 78, 78);
        doc.circle(margin + 2, yPos - 1, 1, 'F');
        doc.text(item, margin + 8, yPos);
        yPos += 8;
    });

    addHeaderFooter(2);
    doc.addPage();

    // --- FINANCIALS PAGE ---
    yPos = 30;
    doc.setFontSize(16);
    doc.setTextColor(13, 43, 79);
    doc.text("Professional Fees", margin, yPos);
    yPos += 15;

    doc.setFillColor(245, 247, 250);
    doc.rect(margin, yPos, pageWidth - (margin * 2), 10, 'F');
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Description", margin + 5, yPos + 7);
    doc.text("Amount (SAR)", pageWidth - margin - 5, yPos + 7, { align: 'right' });
    yPos += 10;

    doc.setFont("helvetica", "normal");
    doc.text(getServiceName(), margin + 5, yPos + 7);
    doc.text(baseFee.toLocaleString(), pageWidth - margin - 5, yPos + 7, { align: 'right' });
    doc.line(margin, yPos + 12, pageWidth - margin, yPos + 12);
    yPos += 12;

    if (discount > 0) {
        doc.setTextColor(200, 0, 0);
        doc.text(`Discount (${discount}%)`, margin + 5, yPos + 7);
        doc.text(`- ${(baseFee * (discount/100)).toLocaleString()}`, pageWidth - margin - 5, yPos + 7, { align: 'right' });
        doc.line(margin, yPos + 12, pageWidth - margin, yPos + 12);
        yPos += 12;
    }

    doc.setTextColor(0);
    doc.text(`VAT (${vatRate}%)`, margin + 5, yPos + 7);
    doc.text(vatAmount.toLocaleString(), pageWidth - margin - 5, yPos + 7, { align: 'right' });
    doc.line(margin, yPos + 12, pageWidth - margin, yPos + 12);
    yPos += 12;

    doc.setFillColor(13, 43, 79);
    doc.rect(margin, yPos, pageWidth - (margin * 2), 12, 'F');
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL", margin + 5, yPos + 8);
    doc.text(`${total.toLocaleString()} SAR`, pageWidth - margin - 5, yPos + 8, { align: 'right' });
    yPos += 25;

    doc.setTextColor(13, 43, 79);
    doc.setFontSize(14);
    doc.text("Payment Schedule", margin, yPos);
    yPos += 10;

    const schedule = getPaymentSchedule();
    schedule.forEach(s => {
        doc.setFontSize(10);
        doc.setTextColor(50);
        doc.setFont("helvetica", "normal");
        doc.text(s.name, margin, yPos);
        doc.text(s.pct, margin + 80, yPos);
        doc.text(`${s.amount.toLocaleString()} SAR`, pageWidth - margin, yPos, { align: 'right' });
        yPos += 7;
    });

    yPos += 15;
    
    doc.setDrawColor(200);
    doc.rect(margin, yPos, pageWidth - (margin * 2), 35);
    yPos += 8;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Bank Transfer Details", margin + 5, yPos);
    yPos += 7;
    doc.setFont("helvetica", "normal");
    doc.text(`Bank Name: Arab National Bank (ANB)`, margin + 5, yPos);
    doc.text(`IBAN: ${BRAND.contact.iban}`, margin + 5, yPos + 6);
    doc.text(`Account Name: SafaArban Ltd`, margin + 5, yPos + 12);

    addHeaderFooter(3);

    doc.save(`SafaArban_Contract_${clientName.replace(/\s+/g, '_')}.pdf`);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans flex flex-col">
      {/* Navbar */}
      <header className="bg-[#0f172a] border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
               <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-700 pl-4">
               <SafaArbanLogo className="h-6 w-auto" variant="white" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                  <Lock size={10} /> Smart Vault
               </span>
            </div>
         </div>
         
         <div className="flex bg-slate-800 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTab('create')} 
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'create' ? 'bg-[#E94E4E] text-white' : 'text-slate-400 hover:text-white'}`}
            >
                Generator
            </button>
            <button 
                onClick={() => setActiveTab('vault')} 
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'vault' ? 'bg-[#E94E4E] text-white' : 'text-slate-400 hover:text-white'}`}
            >
                Vault ({savedProposals.length})
            </button>
         </div>

         <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
               <p className="text-xs font-bold text-slate-300">{refNumber}</p>
               <p className="text-[10px] text-slate-500">Session ID</p>
            </div>
            <button 
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className="bg-white hover:bg-slate-100 text-[#051C2C] px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
            >
                {isGenerating ? 'Hashing...' : 'Download PDF'} <Download size={16} />
            </button>
         </div>
      </header>

      <div className="flex-1 max-w-[1600px] mx-auto w-full p-6">
         
         {activeTab === 'create' ? (
             <div className="grid grid-cols-12 gap-8 h-full">
                {/* CONTROLS */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                    {/* Section Tabs */}
                    <div className="bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-700 flex">
                    {[
                        { id: 'details', label: 'Client', icon: User },
                        { id: 'scope', label: 'Scope', icon: Briefcase },
                        { id: 'finance', label: 'Finance', icon: Calculator }
                    ].map(tab => (
                        <button
                        key={tab.id}
                        onClick={() => setActiveSection(tab.id as any)}
                        className={`flex-1 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            activeSection === tab.id 
                            ? 'bg-[#E94E4E] text-white shadow-md' 
                            : 'text-slate-400 hover:bg-slate-700'
                        }`}
                        >
                            <tab.icon size={14} /> {tab.label}
                        </button>
                    ))}
                    </div>

                    {/* DYNAMIC FORMS */}
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-6">
                        {activeSection === 'details' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Prepared For</label>
                                    <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Company / Name" className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-sm font-bold focus:border-[#E94E4E] outline-none text-white placeholder:text-slate-600" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Reference ID</label>
                                    <div className="flex gap-2">
                                        <input type="text" value={refNumber} onChange={(e) => setRefNumber(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-sm font-mono focus:border-[#E94E4E] outline-none text-white" />
                                        <button onClick={generateRef} className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-300"><RefreshCw size={18} /></button>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-300 flex items-center gap-2"><PenTool size={14} /> Digital Signature</span>
                                    <button 
                                        onClick={() => setIsSigned(!isSigned)} 
                                        className={`w-10 h-6 rounded-full transition-colors relative ${isSigned ? 'bg-emerald-500' : 'bg-slate-600'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isSigned ? 'left-5' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeSection === 'scope' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                <div className="flex gap-2 mb-2">
                                    <button onClick={() => setServiceMode('standard')} className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${serviceMode === 'standard' ? 'bg-[#E94E4E] text-white border-[#E94E4E]' : 'border-slate-600 text-slate-400'}`}>Database</button>
                                    <button onClick={() => setServiceMode('custom')} className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${serviceMode === 'custom' ? 'bg-[#E94E4E] text-white border-[#E94E4E]' : 'border-slate-600 text-slate-400'}`}>Custom</button>
                                </div>
                                {serviceMode === 'standard' ? (
                                    <select value={selectedServiceId} onChange={handleServiceChange} className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-sm text-white focus:border-[#E94E4E] outline-none">
                                        {SERVICES_DB.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                ) : (
                                    <input type="text" value={customServiceName} onChange={(e) => setCustomServiceName(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-sm text-white focus:border-[#E94E4E] outline-none" placeholder="Service Name" />
                                )}
                                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    {scopeItems.map((item, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <input type="text" value={item} onChange={(e) => updateScopeItem(idx, e.target.value)} className="flex-1 bg-slate-900 border border-slate-600 rounded-lg p-2 text-xs text-white" />
                                            <button onClick={() => removeScopeItem(idx)} className="text-slate-500 hover:text-red-500 p-2"><Trash2 size={14} /></button>
                                        </div>
                                    ))}
                                    <button onClick={addScopeItem} className="text-emerald-400 text-[10px] font-bold flex items-center gap-1 hover:underline"><Plus size={12} /> Add Deliverable</button>
                                </div>
                            </div>
                        )}

                        {activeSection === 'finance' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Base Fee</label>
                                        <input type="number" value={baseFee} onChange={(e) => setBaseFee(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-sm font-bold text-white" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Discount %</label>
                                        <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-sm font-bold text-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-2 block">Payment Terms</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['standard', '50-50', 'upfront'].map((term) => (
                                            <button key={term} onClick={() => setPaymentTerms(term as any)} className={`py-2 rounded-lg text-[10px] font-bold uppercase border transition-all ${paymentTerms === term ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-slate-900 border-slate-600 text-slate-400'}`}>{term}</button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Payment Schedule Preview in UI */}
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                    <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Schedule Preview</p>
                                    <div className="space-y-2">
                                      {getPaymentSchedule().map((sch, i) => (
                                        <div key={i} className="flex justify-between text-xs text-slate-300">
                                          <span>{sch.name} <span className="text-slate-500 text-[10px]">({sch.pct})</span></span>
                                          <span className="font-mono">{sch.amount.toLocaleString()} SAR</span>
                                        </div>
                                      ))}
                                    </div>
                                </div>

                                <div className="bg-slate-900 p-4 rounded-xl border border-slate-600">
                                    <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Subtotal</span><span>{discountedFee.toLocaleString()}</span></div>
                                    <div className="flex justify-between text-xs text-slate-400 mb-2"><span>VAT</span><span>{vatAmount.toLocaleString()}</span></div>
                                    <div className="flex justify-between text-sm font-black text-white border-t border-slate-600 pt-2"><span>Total</span><span>{total.toLocaleString()} SAR</span></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button onClick={handleSaveToVault} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg transition-all flex items-center justify-center gap-2">
                        <Save size={16} /> Save to Smart Vault
                    </button>
                </div>

                {/* LIVE PREVIEW */}
                <div className="col-span-12 lg:col-span-7 flex justify-center items-start pt-4">
                    <div className="bg-white text-[#0D2B4F] w-[500px] min-h-[700px] shadow-2xl rounded-sm p-10 relative text-[10px]">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#E94E4E] to-transparent opacity-50"></div>
                        
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-2xl font-black mb-1">SMART CONTRACT</h1>
                                <p className="font-bold text-[#E94E4E]">SafaArban Strategic Services</p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono font-bold text-slate-400">{refNumber}</p>
                                <p className="text-slate-300">Reference</p>
                            </div>
                        </div>

                        {/* Content Preview */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                                <div><p className="text-slate-400 font-bold uppercase text-[8px]">Client</p><p className="font-bold text-sm">{clientName || 'Client Name'}</p></div>
                                <div><p className="text-slate-400 font-bold uppercase text-[8px]">Service</p><p className="font-bold text-sm">{getServiceName()}</p></div>
                            </div>

                            <div>
                                <p className="font-bold text-xs mb-2 uppercase">Scope of Work</p>
                                <ul className="list-disc pl-4 space-y-1 text-slate-500">
                                    {scopeItems.filter(i => i.trim() !== '').map((i, idx) => <li key={idx}>{i}</li>)}
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold text-xs mb-2 uppercase">Financials</p>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <div className="flex justify-between font-bold text-lg mb-4">
                                        <span>Total Payable</span>
                                        <span>{total.toLocaleString()} SAR</span>
                                    </div>
                                    <div className="pt-4 border-t border-slate-200">
                                      <p className="font-bold text-[9px] uppercase text-slate-400 mb-2">Payment Schedule</p>
                                      {getPaymentSchedule().map((sch, i) => (
                                        <div key={i} className="flex justify-between text-[9px] text-slate-600 mb-1">
                                          <span>{sch.name} ({sch.pct})</span>
                                          <span>{sch.amount.toLocaleString()} SAR</span>
                                        </div>
                                      ))}
                                    </div>
                                </div>
                            </div>

                            {isSigned && (
                                <div className="mt-8 pt-4 border-t border-slate-100">
                                    <div className="font-handwriting text-2xl text-[#006C35] mb-1">Authorized Signatory</div>
                                    <p className="text-[8px] uppercase font-bold text-slate-400 flex items-center gap-1"><ShieldCheck size={8} /> Digitally Verified</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-8 left-8 right-8 text-center text-[8px] text-slate-400 border-t border-slate-100 pt-2">
                            <p>Secured by SafaArban Smart Vault • Hash: {refNumber.split('-').join('')}X99</p>
                        </div>
                    </div>
                </div>
             </div>
         ) : (
             // VAULT TAB
             <div className="animate-in fade-in duration-300">
                 <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                     <ShieldCheck className="text-emerald-400" /> Secure Proposal Vault
                 </h2>
                 
                 {savedProposals.length === 0 ? (
                     <div className="text-center py-20 bg-slate-800 rounded-3xl border border-slate-700 border-dashed">
                         <History size={48} className="mx-auto text-slate-600 mb-4" />
                         <p className="text-slate-400 font-bold">No contracts in the vault.</p>
                     </div>
                 ) : (
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {savedProposals.map((prop) => (
                             <div key={prop.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all group">
                                 <div className="flex justify-between items-start mb-4">
                                     <div className="p-3 bg-slate-900 rounded-xl text-slate-300 border border-slate-700 group-hover:text-emerald-400 transition-colors">
                                         <FileText size={24} />
                                     </div>
                                     <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${prop.status === 'Signed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>{prop.status}</span>
                                 </div>
                                 <h3 className="font-bold text-white text-lg mb-1">{prop.clientName}</h3>
                                 <p className="text-xs text-slate-400 mb-4">{prop.serviceName}</p>
                                 
                                 <div className="bg-slate-900/50 p-3 rounded-lg mb-4 font-mono text-xs text-slate-500 flex items-center gap-2">
                                     <Hash size={12} /> {prop.hash.substring(0, 12)}...
                                 </div>

                                 <div className="flex gap-2">
                                     <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-bold text-white transition-colors flex items-center justify-center gap-2">
                                         <Eye size={14} /> View
                                     </button>
                                     <button onClick={() => handleDelete(prop.id)} className="p-2 bg-slate-700 hover:bg-red-500/20 hover:text-red-500 rounded-lg text-slate-400 transition-colors">
                                         <Trash2 size={16} />
                                     </button>
                                 </div>
                             </div>
                         ))}
                     </div>
                 )}
             </div>
         )}

      </div>
      <style>{`
        .font-handwriting { font-family: 'Brush Script MT', cursive; }
      `}</style>
    </div>
  );
};

export default ProposalGenerator;
