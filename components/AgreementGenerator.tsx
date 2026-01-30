import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Download, 
  ArrowLeft, 
  PenTool, 
  Sparkles, 
  Bot, 
  Loader2, 
  Briefcase, 
  User,
  Lock,
  Edit3,
  DollarSign,
  Plus,
  Globe,
  Save,
  History,
  Trash2,
  FileCheck,
  ShieldCheck,
  BookOpen,
  LayoutTemplate,
  Calculator,
  RefreshCw,
  Printer
} from 'lucide-react';
import { BRAND, SERVICES_DB } from '../constants';
import { gemini } from '../geminiService';
import { SafaArbanLogo } from './Logo';
import { LEGAL_CLAUSES } from '../agreementClauses';
import { SmartContract } from '../types';

const LANGUAGES = [
  'English', 'Arabic', 'French', 'Chinese', 
  'Spanish', 'German', 'Russian', 'Turkish', 
  'Urdu', 'Hindi', 'Tagalog', 'Bangla'
];

interface SavedAgreement {
  id: string;
  clientName: string;
  title: string;
  date: string;
  content: string;
  languages: string[];
}

interface AgreementGeneratorProps {
  onBack: () => void;
}

// Static Assets for PDF
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 84" width="380" height="84"><g transform="translate(4, 4)"><path d="M45 10 L75 10 L55 35 L25 35 Z" fill="#E94E4E" /><path d="M25 40 L55 40 L45 65 L15 65 Z" fill="#0D2B4F" /></g><g transform="translate(90, 52)"><text font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="40" fill="#0D2B4F" letter-spacing="-0.02em">SafaArban</text><text x="215" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="40" fill="#E94E4E" letter-spacing="-0.02em">Ltd</text></g></svg>`;
const LOGO_DATA_URI = `data:image/svg+xml;base64,${btoa(LOGO_SVG)}`;

const AgreementGenerator: React.FC<AgreementGeneratorProps> = ({ onBack }) => {
  // Tabs
  const [activeTab, setActiveTab] = useState<'generate' | 'vault'>('generate');

  // Generator State
  const [clientName, setClientName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [baseFee, setBaseFee] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [agreementText, setAgreementText] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // SafaArban Representative Details
  const [repName, setRepName] = useState('Foysal Nazmul');
  const [repPosition, setRepPosition] = useState('General Manager');
  const [repMobile, setRepMobile] = useState('');

  // Vault State
  const [savedAgreements, setSavedAgreements] = useState<SavedAgreement[]>([]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Load Vault on Mount
  useEffect(() => {
    const saved = localStorage.getItem('safa_agreements_vault');
    if (saved) {
      setSavedAgreements(JSON.parse(saved));
    }
  }, []);

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
        if (selectedLanguages.length > 1) {
            setSelectedLanguages(prev => prev.filter(l => l !== lang));
        }
    } else {
        if (selectedLanguages.length < 3) {
            setSelectedLanguages(prev => [...prev, lang]);
        }
    }
  };

  // --- FINANCIAL HELPERS ---
  const [paymentTerms, setPaymentTerms] = useState<'standard' | '50-50' | 'upfront'>('standard');

  const getPaymentSchedule = () => {
      const fee = parseFloat(baseFee) || 0;
      const vat = fee * 0.15;
      const total = fee + vat;

      if (paymentTerms === 'upfront') return [{ name: '1. Upon Signing', pct: '100%', amount: total }];
      if (paymentTerms === '50-50') return [
          { name: '1. Mobilization', pct: '50%', amount: total * 0.5 },
          { name: '2. Completion', pct: '50%', amount: total * 0.5 }
      ];
      return [
          { name: '1. Upon Signing', pct: '40%', amount: total * 0.4 },
          { name: '2. License Issuance', pct: '30%', amount: total * 0.3 },
          { name: '3. Final Delivery', pct: '30%', amount: total * 0.3 }
      ];
  };

  // --- ACTIONS ---

  const handleGenerate = async () => {
    if (!clientName.trim()) {
        alert("Please enter the client name.");
        return;
    }
    
    setIsGenerating(true);
    
    const fee = parseFloat(baseFee) || 0;
    const vat = fee * 0.15;
    const total = fee + vat;

    let financialContext = "";
    if (fee > 0) {
        let paymentString = "";
        if (paymentTerms === 'upfront') paymentString = "100% Upon Signing";
        else if (paymentTerms === '50-50') paymentString = "50% Mobilization, 50% Completion";
        else paymentString = "40% upon signing, 30% upon license issuance, 30% upon final delivery";

        financialContext = `
        FINANCIAL TERMS:
        - Professional Fee: ${fee.toLocaleString()} SAR
        - VAT (15%): ${vat.toLocaleString()} SAR
        - TOTAL CONTRACT VALUE: ${total.toLocaleString()} SAR
        - Payment Terms: ${paymentString}
        `;
    }

    const languageContext = `
      AGREEMENT LANGUAGE(S): ${selectedLanguages.join(' and ')}.
      INSTRUCTION: Generate the contract in the selected language(s). 
      If multiple languages are selected, provide a bilingual/trilingual format where each section is presented in the first language, followed immediately by its translation(s).
      Ensure the Arabic text (if selected) uses formal legal terminology compliant with Saudi regulations.
    `;

    const fullPrompt = `
      FIRST PARTY: SafaArban Ltd, represented by ${repName} (${repPosition}).
      SECOND PARTY (CLIENT): ${clientName}. 
      Project/Service Title: ${projectTitle || 'General Consultation'}.
      
      ${financialContext}
      
      ${languageContext}
      
      Specific Scope/Notes: ${prompt}
    `;

    const draft = await gemini.draftContract(fullPrompt);
    setAgreementText(draft);
    setIsGenerating(false);
  };

  const handleInsertClause = (clauseContent: string) => {
    if (!textAreaRef.current) return;
    const newText = agreementText + "\n\n" + clauseContent;
    setAgreementText(newText);
  };

  const handleSaveToVault = () => {
    if (!agreementText || !clientName) return;
    
    const newEntry: SavedAgreement = {
      id: Date.now().toString(),
      clientName,
      title: projectTitle || 'Untitled Agreement',
      date: new Date().toISOString(),
      content: agreementText,
      languages: selectedLanguages
    };

    const updated = [newEntry, ...savedAgreements];
    setSavedAgreements(updated);
    localStorage.setItem('safa_agreements_vault', JSON.stringify(updated));
    alert('Agreement saved to Smart Vault.');
  };

  const handleLoadFromVault = (item: SavedAgreement) => {
    setClientName(item.clientName);
    setProjectTitle(item.title);
    setAgreementText(item.content);
    setSelectedLanguages(item.languages);
    setActiveTab('generate');
  };

  const handleDeleteFromVault = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this agreement?')) {
      const updated = savedAgreements.filter(item => item.id !== id);
      setSavedAgreements(updated);
      localStorage.setItem('safa_agreements_vault', JSON.stringify(updated));
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('printable-agreement-content');
    if (!element) return;

    setIsDownloading(true);

    const opt = {
      margin: 0,
      filename: `SafaArban_Agreement_${clientName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
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

  const [activeSection, setActiveSection] = useState<'details' | 'scope' | 'finance'>('details');

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-[#0f172a] border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
               <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-700 pl-4">
               <SafaArbanLogo className="h-6 w-auto" variant="white" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                  <PenTool size={10} /> AI Agreement Architect
               </span>
            </div>
         </div>
         
         <div className="flex bg-slate-800 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTab('generate')} 
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'generate' ? 'bg-[#E94E4E] text-white' : 'text-slate-400 hover:text-white'}`}
            >
                <div className="flex items-center justify-center gap-2"><LayoutTemplate size={14} /> Generator</div>
            </button>
            <button 
                onClick={() => setActiveTab('vault')} 
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'vault' ? 'bg-[#E94E4E] text-white' : 'text-slate-400 hover:text-white'}`}
            >
                <div className="flex items-center justify-center gap-2"><Lock size={14} /> Smart Vault ({savedAgreements.length})</div>
            </button>
         </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
         {/* Left Panel: Inputs */}
         <div className="w-full lg:w-1/3 bg-[#0B1120] border-r border-slate-800 overflow-y-auto custom-scrollbar flex flex-col">
            
            {activeTab === 'generate' ? (
                <div className="p-6 lg:p-8 space-y-8 flex-1">
                    <div>
                        <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                            <Briefcase className="text-[#E94E4E]" /> Agreement Details
                        </h2>
                        <p className="text-sm text-slate-500">Configure parameters. Our AI drafts compliant Saudi-law contracts.</p>
                    </div>

                    <div className="space-y-5">
                        {/* Section Tabs */}
                        <div className="bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-700 flex mb-4">
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
                                    <div className="group">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block group-focus-within:text-[#E94E4E] transition-colors">
                                            <User size={12} className="inline mr-1" /> Second Party (Client)
                                        </label>
                                        <input 
                                            type="text" 
                                            value={clientName}
                                            onChange={(e) => setClientName(e.target.value)}
                                            placeholder="Company Name / Individual Name" 
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white focus:border-[#E94E4E] outline-none transition-all placeholder:text-slate-600 font-bold"
                                        />
                                    </div>

                                    {/* SafaArban Representative Details */}
                                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 space-y-4">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block flex items-center gap-2">
                                            <ShieldCheck size={12} /> SafaArban Representative
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input 
                                                type="text" 
                                                value={repName}
                                                onChange={(e) => setRepName(e.target.value)}
                                                placeholder="Name" 
                                                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-xs text-white focus:border-emerald-500 outline-none"
                                            />
                                            <input 
                                                type="text" 
                                                value={repPosition}
                                                onChange={(e) => setRepPosition(e.target.value)}
                                                placeholder="Position" 
                                                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-xs text-white focus:border-emerald-500 outline-none"
                                            />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={repMobile}
                                            onChange={(e) => setRepMobile(e.target.value)}
                                            placeholder="Mobile Number" 
                                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-xs text-white focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                    
                                    <div className="group">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block group-focus-within:text-[#E94E4E] transition-colors">
                                            <Globe size={12} className="inline mr-1" /> Languages ({selectedLanguages.length}/3)
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {LANGUAGES.map(lang => (
                                                <button
                                                    key={lang}
                                                    onClick={() => toggleLanguage(lang)}
                                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                                        selectedLanguages.includes(lang) 
                                                        ? 'bg-[#E94E4E] text-white border-[#E94E4E] shadow-lg shadow-red-900/20' 
                                                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-300'
                                                    }`}
                                                >
                                                    {lang}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'scope' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                    <div className="group">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block group-focus-within:text-[#E94E4E] transition-colors">
                                            <Edit3 size={12} className="inline mr-1" /> Project Title
                                        </label>
                                        <input 
                                            list="services-list"
                                            type="text" 
                                            value={projectTitle}
                                            onChange={(e) => setProjectTitle(e.target.value)}
                                            placeholder="Select service or type custom title..." 
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white focus:border-[#E94E4E] outline-none transition-all placeholder:text-slate-600 font-bold"
                                        />
                                        <datalist id="services-list">
                                            {SERVICES_DB.map((service) => (
                                                <option key={service.id} value={service.name} />
                                            ))}
                                        </datalist>
                                    </div>

                                    <div className="group">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block group-focus-within:text-[#E94E4E] transition-colors">
                                            <Bot size={12} className="inline mr-1" /> Specific Scope / Notes
                                        </label>
                                        <textarea 
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder="E.g. 'Include milestones for payment', 'Specific deliverables for Phase 1'..."
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white focus:border-[#E94E4E] outline-none transition-all placeholder:text-slate-600 min-h-[150px] resize-none leading-relaxed"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeSection === 'finance' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                    <div className="group">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block group-focus-within:text-[#E94E4E] transition-colors">
                                            <DollarSign size={12} className="inline mr-1" /> Professional Fee (SAR)
                                        </label>
                                        <input 
                                            type="number" 
                                            value={baseFee}
                                            onChange={(e) => setBaseFee(e.target.value)}
                                            placeholder="0.00" 
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white focus:border-[#E94E4E] outline-none transition-all placeholder:text-slate-600 font-bold font-mono"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] text-slate-500 uppercase font-bold mb-2 block">Payment Terms</label>
                                        <div className="grid grid-cols-1 gap-2">
                                            {[
                                                {id: 'standard', label: 'Standard (40/30/30)'}, 
                                                {id: '50-50', label: 'Split (50/50)'}, 
                                                {id: 'upfront', label: 'Full Upfront (100%)'}
                                            ].map((term) => (
                                                <button 
                                                    key={term.id} 
                                                    onClick={() => setPaymentTerms(term.id as any)} 
                                                    className={`py-3 px-4 rounded-lg text-xs font-bold uppercase border text-left transition-all ${paymentTerms === term.id ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-slate-900 border-slate-600 text-slate-400 hover:bg-slate-800'}`}
                                                >
                                                    {term.label}
                                                </button>
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
                                </div>
                            )}
                        </div>
                    </div>

                    <button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full py-4 bg-[#E94E4E] hover:bg-[#d43f3f] text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-red-900/20"
                    >
                        {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <><Sparkles size={16} /> Generate Agreement</>}
                    </button>
                </div>
            ) : (
                <div className="p-6 h-full overflow-y-auto">
                    {savedAgreements.length === 0 ? (
                        <div className="text-center py-20 opacity-50">
                            <History size={48} className="mx-auto mb-4 text-slate-600" />
                            <p>No saved agreements found.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {savedAgreements.map(item => (
                                <div key={item.id} className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-[#E94E4E] transition-colors group cursor-pointer" onClick={() => handleLoadFromVault(item)}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-white text-sm">{item.clientName}</h4>
                                        <button onClick={(e) => handleDeleteFromVault(item.id, e)} className="text-slate-500 hover:text-red-500 transition-colors p-1"><Trash2 size={14} /></button>
                                    </div>
                                    <p className="text-xs text-slate-400 mb-2">{item.title}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-slate-600 font-mono">{new Date(item.date).toLocaleDateString()}</span>
                                        <div className="flex gap-1">
                                            {item.languages.map(l => (
                                                <span key={l} className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">{l.substring(0,2).toUpperCase()}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
         </div>

         {/* Right Panel: Preview */}
         <div className="w-full lg:w-2/3 bg-slate-950 p-6 lg:p-10 overflow-hidden flex flex-col relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
            
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                        <FileCheck size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white">Live Preview</h3>
                        <p className="text-[10px] text-slate-500">A4 Render Layout</p>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    {agreementText && (
                        <>
                            <button 
                                onClick={handleSaveToVault}
                                className="bg-slate-800 text-white px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-slate-700 transition-colors"
                            >
                                <Save size={14} /> Save
                            </button>
                            <button 
                                onClick={handleDownloadPDF}
                                disabled={isDownloading}
                                className="bg-white text-[#051C2C] px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-slate-200 transition-colors shadow-lg"
                            >
                                {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} PDF
                            </button>
                        </>
                    )}
                </div>
            </div>

            {agreementText ? (
                <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
                    {/* Clause Quick-Insert Bar */}
                    <div className="mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-1">
                            <BookOpen size={10} /> Quick-Insert Clauses
                        </p>
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {LEGAL_CLAUSES.map((clause) => (
                                <button
                                    key={clause.id}
                                    onClick={() => handleInsertClause(clause.content)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors border border-slate-700 shrink-0 whitespace-nowrap"
                                    title={clause.title}
                                >
                                    <Plus size={10} className="text-emerald-400" /> {clause.title}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Document Paper (PRINTABLE AREA) */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar flex justify-center bg-slate-900 p-4">
                        <div 
                            id="printable-agreement-content" 
                            className="bg-white text-slate-900 w-[210mm] min-h-[297mm] shadow-2xl relative flex flex-col"
                        >
                            {/* Header Section (Visible on Paper) */}
                            <div className="px-12 pt-12 pb-6 border-b-2 border-[#0D2B4F]">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <img src={LOGO_DATA_URI} alt="SafaArban Logo" className="h-12 w-auto mb-4" />
                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Strategic Advisory & Licensing</p>
                                    </div>
                                    <div className="text-right">
                                        <h1 className="text-4xl font-black text-[#0D2B4F] tracking-tighter">AGREEMENT</h1>
                                        <p className="text-sm font-bold text-[#E94E4E]">SERVICE CONTRACT</p>
                                        <p className="text-[10px] font-mono mt-2 text-slate-500">Ref: {`SA-${new Date().getFullYear()}-${Math.floor(1000+Math.random()*9000)}`}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Client & Rep Box */}
                            <div className="px-12 py-6 bg-slate-50 border-b border-slate-200">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">First Party (Service Provider)</p>
                                        <p className="font-bold text-[#0D2B4F] text-sm">SafaArban Ltd</p>
                                        <p className="text-xs text-slate-600">Rep: {repName} ({repPosition})</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Second Party (Client)</p>
                                        <p className="font-bold text-[#0D2B4F] text-sm">{clientName}</p>
                                        <p className="text-xs text-slate-600">Project: {projectTitle || 'Business Setup'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content (Editable) */}
                            <div className="flex-1 px-12 py-8 relative">
                                <textarea 
                                    ref={textAreaRef}
                                    value={agreementText}
                                    onChange={(e) => setAgreementText(e.target.value)}
                                    className="w-full h-full resize-none border-none outline-none font-serif text-sm leading-loose whitespace-pre-wrap text-slate-800 bg-transparent"
                                    placeholder="Agreement text..."
                                    spellCheck={false}
                                    dir="auto"
                                    style={{ minHeight: '500px' }} // Ensure height for PDF
                                />
                            </div>

                            {/* Signature Block (Fixed Bottom) */}
                            <div className="px-12 pb-16 pt-8 mt-auto break-inside-avoid">
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <div className="grid grid-cols-2 gap-12">
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-8">Signed for SafaArban</p>
                                            <div className="border-b border-slate-400 mb-2"></div>
                                            <p className="font-bold text-xs text-[#0D2B4F]">{repName}</p>
                                            <p className="text-[10px] text-slate-500">{repPosition}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-8">Signed for Client</p>
                                            <div className="border-b border-slate-400 mb-2"></div>
                                            <p className="font-bold text-xs text-[#0D2B4F]">{clientName}</p>
                                            <p className="text-[10px] text-slate-500">Authorized Signatory</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">
                                        This document is digitally generated and legally binding in the Kingdom of Saudi Arabia.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Bottom Color Bar */}
                            <div className="h-2 bg-[#0D2B4F] w-full"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 border-2 border-dashed border-slate-800 rounded-3xl m-4">
                    <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
                        <PenTool size={32} className="text-slate-600" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-slate-700">Ready to Draft</h3>
                    <p className="text-sm font-medium mt-2 text-slate-600 max-w-xs">
                        Enter the client details and project scope on the left to initialize the AI Legal Engine.
                    </p>
                </div>
            )}
         </div>
      </div>
      <style>{`
        .font-handwriting { font-family: 'Brush Script MT', cursive; }
      `}</style>
    </div>
  );
};

export default AgreementGenerator;