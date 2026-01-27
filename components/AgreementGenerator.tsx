
import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
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
  Check,
  FileSignature,
  LayoutTemplate,
  FileCheck,
  ShieldCheck,
  MousePointer
} from 'lucide-react';
import { BRAND, SERVICES_DB } from '../constants';
import { gemini } from '../geminiService';
import { SafaArbanLogo } from './Logo';
import { LEGAL_CLAUSES } from '../agreementClauses';

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
  const [repName, setRepName] = useState('');
  const [repPosition, setRepPosition] = useState('');
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
        } else {
            alert("Maximum 3 languages allowed.");
        }
    }
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
        financialContext = `
        FINANCIAL TERMS:
        - Professional Fee: ${fee.toLocaleString()} SAR
        - VAT (15%): ${vat.toLocaleString()} SAR
        - TOTAL CONTRACT VALUE: ${total.toLocaleString()} SAR
        - Payment Terms: 50% Mobilization, 50% Completion.
        `;
    }

    const languageContext = `
      AGREEMENT LANGUAGE(S): ${selectedLanguages.join(' and ')}.
      INSTRUCTION: Generate the contract in the selected language(s). 
      If multiple languages are selected, provide a bilingual/trilingual format where each section is presented in the first language, followed immediately by its translation(s).
      Ensure the Arabic text (if selected) uses formal legal terminology compliant with Saudi regulations.
    `;

    const fullPrompt = `
      Client Name: ${clientName}. 
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
    
    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = agreementText;
    
    const before = text.substring(0, start);
    const after = text.substring(end);
    const prefix = start > 0 && text[start - 1] !== '\n' ? '\n\n' : '';
    const suffix = after.length > 0 && after[0] !== '\n' ? '\n\n' : '';
    
    const newText = before + prefix + clauseContent + suffix + after;
    setAgreementText(newText);
    
    // Restore focus and move cursor to end of inserted text
    setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + prefix.length + clauseContent.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
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
    setActiveTab('generate'); // Switch back to editor
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
    if (!agreementText) return;
    setIsDownloading(true);

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20; 
    
    // Theme Colors
    const primaryColor = [13, 43, 79]; // #0D2B4F
    const accentColor = [233, 78, 78]; // #E94E4E
    const grayColor = [100, 116, 139]; // Slate 500

    const refId = `SA-AGR-${new Date().getFullYear()}-${Math.floor(Math.random()*10000)}`;
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // --- PAGE 1: COVER ---
    // Sidebar background
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth * 0.35, pageHeight, 'F');
    
    // Logo Text (Left Sidebar)
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("SafaArban", 15, 40);
    
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    doc.text("STRATEGIC ADVISORY", 15, 48);
    
    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 55, 55, 55);

    // Client Info (Left Sidebar)
    let leftY = 100;
    doc.setFontSize(8);
    doc.setTextColor(150, 160, 175);
    doc.text("PREPARED FOR", 15, leftY);
    
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    const clientNameLines = doc.splitTextToSize(clientName, (pageWidth * 0.35) - 25);
    doc.text(clientNameLines, 15, leftY + 8);
    
    leftY += 15 + (clientNameLines.length * 5);
    
    doc.setFontSize(8);
    doc.setTextColor(150, 160, 175);
    doc.text("DATE", 15, leftY);
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(dateStr, 15, leftY + 7);

    leftY += 20;
    doc.setFontSize(8);
    doc.setTextColor(150, 160, 175);
    doc.text("REFERENCE", 15, leftY);
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(refId, 15, leftY + 6);

    // SafaArban Representative (Left Sidebar)
    if (repName) {
        leftY += 20;
        doc.setFontSize(8);
        doc.setTextColor(150, 160, 175);
        doc.text("PREPARED BY", 15, leftY);
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text(repName, 15, leftY + 6);
        if (repPosition) {
            doc.setFontSize(8);
            doc.setTextColor(200, 200, 200);
            doc.text(repPosition, 15, leftY + 11);
        }
        if (repMobile) {
            doc.setFontSize(8);
            doc.setTextColor(150, 160, 175);
            doc.text(repMobile, 15, leftY + 16);
        }
    }

    // Main Content (Right Side)
    const contentX = (pageWidth * 0.35) + 20;
    
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(36);
    doc.text("SERVICE", contentX, 100);
    doc.text("AGREEMENT", contentX, 115);
    
    doc.setFontSize(12);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text("PROFESSIONAL SERVICES CONTRACT", contentX, 130);

    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    const projectTitleLines = doc.splitTextToSize(projectTitle || 'General Consultation', pageWidth - contentX - margin);
    doc.text(projectTitleLines, contentX, 145);

    // Financial Box on Cover
    const fee = parseFloat(baseFee) || 0;
    const vat = fee * 0.15;
    const total = fee + vat;

    if (total > 0) {
        const boxY = 200;
        doc.setDrawColor(220, 220, 220);
        doc.setFillColor(250, 250, 250);
        doc.roundedRect(contentX, boxY, 100, 35, 3, 3, 'FD');
        
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text("TOTAL CONTRACT VALUE", contentX + 8, boxY + 12);
        
        doc.setFontSize(16);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFont("helvetica", "bold");
        doc.text(`${total.toLocaleString()} SAR`, contentX + 8, boxY + 24);
    }

    // --- SUBSEQUENT PAGES ---
    const addHeader = () => {
        doc.setFontSize(8);
        doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        doc.setFont("helvetica", "normal");
        doc.text("SafaArban Strategic Services Agreement", margin, 15);
        doc.text(`Ref: ${refId}`, pageWidth - margin, 15, { align: 'right' });
        doc.setDrawColor(230, 230, 230);
        doc.line(margin, 18, pageWidth - margin, 18);
    };

    const addFooter = (pageNumber: number) => {
        doc.setDrawColor(230, 230, 230);
        doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);
        
        doc.setFontSize(7);
        doc.setTextColor(100, 100, 100);
        
        const footerAddress = "Harun Al Rashid Road Al Jazeerah district , RIYADH 14216, SAUDI ARABIA © RIYADH, KINGDOM OF SAUDI ARABIA";
        const footerCompliance = `CR: 1010989782 | VAT: 300054882100003 | Page ${pageNumber}`;
        
        doc.text(footerAddress, margin, pageHeight - 12);
        doc.text(footerCompliance, pageWidth - margin, pageHeight - 12, { align: 'right' });
    };

    doc.addPage();
    let y = 30;
    let pageNum = 2;
    addHeader();
    addFooter(pageNum);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);

    const splitText = agreementText.split('\n');
    
    splitText.forEach((line) => {
        if (y > pageHeight - 40) {
            doc.addPage();
            pageNum++;
            addHeader();
            addFooter(pageNum);
            y = 30;
        }

        const isHeader = /^\d+\./.test(line) || (/^[A-Z\s]+$/.test(line) && line.length > 5);
        const isBullet = line.trim().startsWith('-') || line.trim().startsWith('•');

        if (isHeader) {
            y += 5;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(line, margin, y);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(60, 60, 60);
            y += 7;
        } else if (isBullet) {
            const cleanLine = line.replace(/^[-•]\s*/, '');
            const lines = doc.splitTextToSize(cleanLine, pageWidth - (margin * 2) - 5);
            
            doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
            doc.circle(margin + 2, y - 1, 1, 'F');
            doc.text(lines, margin + 6, y);
            y += (lines.length * 5) + 3;
        } else {
            const lines = doc.splitTextToSize(line, pageWidth - (margin * 2));
            doc.text(lines, margin, y);
            y += (lines.length * 5) + 2;
        }
    });

    // Signature Block
    if (y > pageHeight - 60) {
        doc.addPage();
        pageNum++;
        addHeader();
        addFooter(pageNum);
        y = 30;
    } else {
        y += 20;
    }

    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(252, 252, 252);
    doc.rect(margin, y, pageWidth - (margin * 2), 40, 'FD');
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text("SIGNED FOR SAFAARBAN", margin + 10, y + 10);
    doc.text("SIGNED FOR CLIENT", margin + 90, y + 10);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("_______________________", margin + 10, y + 30);
    doc.text("_______________________", margin + 90, y + 30);
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    
    // SafaArban Signatory
    const safaSignatory = repName || "Authorized Signatory";
    const safaPosition = repPosition || "Chief Strategy Officer";
    doc.text(safaSignatory, margin + 10, y + 35);
    doc.text(safaPosition, margin + 10, y + 39);

    // Client Signatory
    doc.text(clientName, margin + 90, y + 35);
    doc.text("Authorized Signatory", margin + 90, y + 39);

    doc.save(`Agreement_${clientName.replace(/\s+/g, '_')}.pdf`);
    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans flex flex-col">
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
                                <Globe size={12} className="inline mr-1" /> Languages (Max 3)
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

                        <div className="group">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block group-focus-within:text-[#E94E4E] transition-colors">
                                <DollarSign size={12} className="inline mr-1" /> Professional Fee (SAR)
                            </label>
                            <div className="flex gap-2 items-center">
                                <input 
                                    type="number" 
                                    value={baseFee}
                                    onChange={(e) => setBaseFee(e.target.value)}
                                    placeholder="0.00" 
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white focus:border-[#E94E4E] outline-none transition-all placeholder:text-slate-600 font-bold font-mono"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block group-focus-within:text-[#E94E4E] transition-colors">
                                <Bot size={12} className="inline mr-1" /> Specific Scope / Notes
                            </label>
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="E.g. 'Include milestones for payment', 'Specific deliverables for Phase 1'..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white focus:border-[#E94E4E] outline-none transition-all placeholder:text-slate-600 min-h-[100px] resize-none leading-relaxed"
                            />
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
                        <p className="text-[10px] text-slate-500">Auto-saves locally</p>
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
                <div className="flex-1 flex flex-col h-full relative z-10">
                    {/* Clause Quick-Insert Bar */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
                        {LEGAL_CLAUSES.map((clause) => (
                            <button
                                key={clause.id}
                                onClick={() => handleInsertClause(clause.content)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors border border-slate-700 shrink-0 whitespace-nowrap"
                            >
                                <Plus size={10} className="text-emerald-400" /> {clause.title}
                            </button>
                        ))}
                    </div>
                    
                    {/* Document Paper */}
                    <div className="bg-white text-slate-800 rounded-sm shadow-2xl flex-1 relative overflow-hidden flex flex-col max-w-4xl mx-auto w-full border border-slate-300">
                        {/* Paper Texture/Header Simulation */}
                        <div className="h-2 bg-[#0D2B4F] w-full"></div>
                        
                        <div className="flex-1 relative overflow-y-auto custom-scrollbar">
                            <textarea 
                                ref={textAreaRef}
                                value={agreementText}
                                onChange={(e) => setAgreementText(e.target.value)}
                                className="w-full h-full p-12 bg-transparent border-none outline-none resize-none font-serif text-sm leading-loose whitespace-pre-wrap text-slate-900"
                                placeholder="Generated text will appear here..."
                                spellCheck={false}
                            />
                        </div>

                        {/* Footer Simulation */}
                        <div className="h-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between px-6 text-[9px] text-slate-400 uppercase font-bold tracking-widest">
                            <span>SafaArban Legal</span>
                            <span>{repName ? `Prepared by: ${repName}` : 'Page 1 of 1'}</span>
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
    </div>
  );
};

export default AgreementGenerator;
