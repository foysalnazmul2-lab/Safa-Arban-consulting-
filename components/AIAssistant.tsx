
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Image as ImageIcon, Sparkles, Download, Maximize2, Minimize2, Scan, Upload, FileSearch, Quote, Eraser, RefreshCw, Wand2, Globe, BrainCircuit, ExternalLink, MapPin } from 'lucide-react';
import { gemini } from '../geminiService.ts';
import { ChatMessage } from '../types.ts';
import { BRAND } from '../constants.ts';

type AssistantMode = 'chat' | 'visual' | 'scan';
type VisualSubMode = 'generate' | 'edit';
type ChatStrategy = 'thinking' | 'search';

const SCAN_TEMPLATES = [
  "Analyze this document for Saudi business compliance.",
  "Extract key dates (start, expiry) from this contract.",
  "Summarize the main points of this MISA license.",
  "Identify potential compliance risks in this document.",
  "Translate key fields from Arabic to English."
];

const EDIT_TEMPLATES = [
  "Add a retro filter",
  "Remove the person in the background",
  "Change background to a sunset",
  "Make it cyberpunk style",
  "Turn into a pencil sketch"
];

// Simple Markdown Parser Component
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const formatText = (text: string) => {
    // Split by lines to handle list items
    const lines = text.split('\n');
    let inList = false;
    const elements: React.ReactElement[] = [];

    lines.forEach((line, index) => {
      // Handle Bullet Points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const cleanLine = line.trim().substring(2);
        // Process bolding within list item
        const processedLine = cleanLine.split(/(\*\*.*?\*\*)/).map((part, i) => 
          part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
        );

        if (!inList) {
          inList = true;
          elements.push(<ul key={`ul-${index}`} className="list-disc ml-4 space-y-1 mt-2 mb-2"></ul>);
        }
        // Append to the last UL (which is the current one)
        const lastUl = elements[elements.length - 1] as React.ReactElement<any>;
        const newChildren = [...React.Children.toArray(lastUl.props.children), <li key={`li-${index}`}>{processedLine}</li>];
        elements[elements.length - 1] = React.cloneElement(lastUl, {}, newChildren);
      } else {
        inList = false;
        // Handle Headers (Simple #)
        if (line.trim().startsWith('### ')) {
           elements.push(<h4 key={index} className="font-black text-sm mt-4 mb-2 uppercase tracking-wide">{line.trim().substring(4)}</h4>);
        } else if (line.trim().startsWith('**') && !line.includes(' ')) {
           // Standalone bold line acting as header
           elements.push(<h4 key={index} className="font-bold text-sm mt-3 mb-1">{line.replace(/\*\*/g, '')}</h4>);
        } else {
           // Standard Paragraph with bold support
           if (line.trim() === '') {
             elements.push(<div key={index} className="h-2"></div>);
           } else {
             const processedLine = line.split(/(\*\*.*?\*\*)/).map((part, i) => 
               part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
             );
             elements.push(<p key={index} className="mb-1">{processedLine}</p>);
           }
        }
      }
    });

    return elements;
  };

  return <div className="text-sm leading-relaxed">{formatText(content)}</div>;
};

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<AssistantMode>('chat');
  const [visualSubMode, setVisualSubMode] = useState<VisualSubMode>('generate');
  const [chatStrategy, setChatStrategy] = useState<ChatStrategy>('thinking');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: "Welcome to the SafaArban Command Terminal. I am ready to assist with your investment queries." }] }
  ]);
  const [input, setInput] = useState('');
  
  // Generation State
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");
  const [generatedImages, setGeneratedImages] = useState<{url: string, prompt: string}[]>([]);
  
  // Edit State
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Scan Mode State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [scanPrompt, setScanPrompt] = useState(SCAN_TEMPLATES[0]);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, generatedImages, mode, analysisResult, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userMsg }] }]);
    setIsLoading(true);

    const result = await gemini.sendMessage(messages, userMsg, chatStrategy);
    
    setMessages(prev => [...prev, { 
      role: 'model', 
      parts: [{ text: result.text }],
      sources: result.sources 
    }]);
    setIsLoading(false);
  };

  const handleGenerateImage = async (promptToUse?: string) => {
    const prompt = promptToUse || imagePrompt;
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const url = await gemini.generateImage(prompt, imageSize);
      if (url) {
        setGeneratedImages(prev => [{ url, prompt }, ...prev]);
        if (!promptToUse) setImagePrompt('');
      }
    } catch (err) {
      console.error("Failed to generate image:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditImage = async () => {
    if (!editFile || !editPreview || !editPrompt.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      const base64Data = editPreview.split(',')[1];
      const url = await gemini.editImage(base64Data, editFile.type, editPrompt);
      if (url) {
        setGeneratedImages(prev => [{ url, prompt: `Edit: ${editPrompt}` }, ...prev]);
        setEditPrompt('');
        // Optional: Keep the edit file to allow further edits, or clear it
      }
    } catch (err) {
        console.error("Failed to edit image:", err);
    } finally {
        setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'scan' | 'edit') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'scan') {
            setSelectedFile(file);
            setFilePreview(reader.result as string);
        } else {
            setEditFile(file);
            setEditPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedFile || !filePreview || isLoading || !scanPrompt.trim()) return;

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const base64Data = filePreview.split(',')[1];
      const result = await gemini.analyzeImage(
        base64Data,
        selectedFile.type,
        scanPrompt
      );
      setAnalysisResult(result);
    } catch (err) {
      console.error("Failed to analyze image:", err);
      setAnalysisResult("An error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const containerClasses = isExpanded 
    ? "fixed inset-4 z-[60] rounded-[2.5rem] shadow-2xl flex flex-col border border-white/10 overflow-hidden no-print animate-in zoom-in-95 duration-300" 
    : "fixed inset-0 md:inset-auto md:bottom-24 md:right-8 z-[60] w-full md:w-[420px] md:h-[650px] md:rounded-[2rem] shadow-2xl flex flex-col border border-white/10 overflow-hidden no-print animate-in slide-in-from-bottom-8 backdrop-blur-xl";

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(15,40,71,0.5)] hover:scale-110 transition-transform no-print flex items-center justify-center border border-white/10 group"
          style={{ backgroundColor: BRAND.colors.primary, color: BRAND.colors.secondary }}
        >
          <Bot size={28} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse border-2 border-white"></span>
        </button>
      )}

      {isOpen && (
        <>
          {isExpanded && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] animate-in fade-in"></div>}
          
          <div className={containerClasses} style={{ backgroundColor: BRAND.colors.primary }}>
            {/* Header */}
            <div className="p-5 flex justify-between items-center border-b border-white/5 relative overflow-hidden" style={{ backgroundColor: `${BRAND.colors.primary}E6` }}>
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${BRAND.colors.secondary}, ${BRAND.colors.alert}, ${BRAND.colors.accent})` }}></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 rounded-xl border border-white/10" style={{ backgroundColor: `${BRAND.colors.secondary}33` }}>
                  <Bot size={20} style={{ color: BRAND.colors.secondary }} />
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-widest text-white">SafaArban Advisor</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
                    <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Online • v3.0</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button onClick={toggleExpand} className="hover:bg-white/10 p-2 rounded-lg text-white/50 hover:text-white transition-colors hidden md:block">
                  {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button onClick={() => { setIsOpen(false); setIsExpanded(false); }} className="hover:bg-white/10 p-2 rounded-lg text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="flex px-2 pb-2 gap-1 border-b border-white/5" style={{ backgroundColor: `${BRAND.colors.primary}E6` }}>
              {[
                { id: 'chat', label: 'Advisor', icon: MessageSquare },
                { id: 'visual', label: 'Studio', icon: ImageIcon },
                { id: 'scan', label: 'Scanner', icon: Scan }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setMode(tab.id as AssistantMode)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    mode === tab.id 
                    ? 'bg-white/10 shadow-inner' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ color: mode === tab.id ? BRAND.colors.secondary : undefined }}
                >
                  <tab.icon size={14} /> {tab.label}
                </button>
              ))}
            </div>

            {/* Chat Strategy Toggle (Only in Chat Mode) */}
            {mode === 'chat' && (
               <div className="px-4 py-2 border-b border-white/5">
                  <div className="flex bg-black/20 p-1 rounded-xl">
                     <button 
                       onClick={() => setChatStrategy('thinking')}
                       className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${chatStrategy === 'thinking' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                     >
                        <BrainCircuit size={12} /> Deep Reasoning
                     </button>
                     <button 
                       onClick={() => setChatStrategy('search')}
                       className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${chatStrategy === 'search' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                     >
                        <Globe size={12} /> Live Research
                     </button>
                  </div>
               </div>
            )}

            {/* Main Content Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              {mode === 'chat' ? (
                <>
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}
                    >
                      <div 
                        className={`max-w-[85%] p-4 rounded-2xl ${
                          msg.role === 'user' 
                          ? 'font-bold rounded-tr-none shadow-lg' 
                          : 'bg-white/5 text-slate-300 border border-white/5 rounded-tl-none'
                        }`}
                        style={{ 
                            backgroundColor: msg.role === 'user' ? BRAND.colors.secondary : undefined,
                            color: msg.role === 'user' ? BRAND.colors.primary : undefined
                        }}
                      >
                        {msg.role === 'user' ? (
                          <p className="text-sm leading-relaxed">{msg.parts[0].text}</p>
                        ) : (
                          <MarkdownRenderer content={msg.parts[0].text} />
                        )}
                      </div>
                      
                      {/* Sources / Citations */}
                      {msg.sources && msg.sources.length > 0 && (
                         <div className="mt-2 w-full max-w-[85%]">
                            <p className="text-[9px] text-white/40 font-black uppercase tracking-widest mb-2 pl-1">Sources</p>
                            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                              {msg.sources.map((source, idx) => (
                                 <a 
                                   key={idx} 
                                   href={source.uri} 
                                   target="_blank" 
                                   rel="noreferrer"
                                   className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-white/70 hover:text-white transition-all max-w-[180px]"
                                 >
                                    <div className="p-1 rounded bg-white/10">
                                      {source.type === 'map' ? <MapPin size={10} /> : <ExternalLink size={10} />}
                                    </div>
                                    <span className="truncate">{source.title || new URL(source.uri).hostname}</span>
                                 </a>
                              ))}
                            </div>
                         </div>
                      )}
                    </div>
                  ))}
                </>
              ) : mode === 'visual' ? (
                <div className="space-y-6">
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/10 shadow-sm">
                     
                     {/* Sub-mode Toggles */}
                     <div className="flex bg-white/5 rounded-xl p-1 mb-4">
                        <button 
                          onClick={() => setVisualSubMode('generate')}
                          className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${visualSubMode === 'generate' ? 'bg-white/10 text-white' : 'text-white/40'}`}
                        >
                          Generate
                        </button>
                        <button 
                          onClick={() => setVisualSubMode('edit')}
                          className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${visualSubMode === 'edit' ? 'bg-white/10 text-white' : 'text-white/40'}`}
                        >
                          Edit Image
                        </button>
                     </div>

                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2" style={{ color: BRAND.colors.secondary }}>
                        <Sparkles size={14} /> {visualSubMode === 'generate' ? 'Text to Image' : 'Gemini 2.5 Magic Editor'}
                     </h3>

                     {visualSubMode === 'generate' ? (
                       <>
                          <textarea 
                              value={imagePrompt}
                              onChange={(e) => setImagePrompt(e.target.value)}
                              placeholder="Describe your vision... (e.g. 'Futuristic Riyadh office tower, golden hour')"
                              className="w-full p-4 rounded-2xl border border-white/10 text-sm text-white outline-none transition-all mb-4 min-h-[100px] resize-none placeholder:text-white/20"
                              style={{ backgroundColor: `${BRAND.colors.primary}80`, borderColor: `${BRAND.colors.secondary}80` }}
                          />
                          
                          <div className="flex items-center justify-between mb-6">
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Resolution</span>
                              <div className="flex p-1 rounded-xl gap-1" style={{ backgroundColor: `${BRAND.colors.primary}80` }}>
                                  {["1K", "2K", "4K"].map((s) => (
                                  <button 
                                      key={s}
                                      onClick={() => setImageSize(s as any)}
                                      className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${imageSize === s ? '' : 'text-white/40 hover:text-white'}`}
                                      style={{ 
                                          backgroundColor: imageSize === s ? BRAND.colors.secondary : 'transparent',
                                          color: imageSize === s ? BRAND.colors.primary : undefined
                                      }}
                                  >
                                      {s}
                                  </button>
                                  ))}
                              </div>
                          </div>

                          <button 
                              onClick={() => handleGenerateImage()}
                              disabled={isLoading || !imagePrompt.trim()}
                              className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(201,168,106,0.3)] transition-all disabled:opacity-50"
                              style={{ 
                                  background: `linear-gradient(to right, ${BRAND.colors.secondary}, #F2D696)`,
                                  color: BRAND.colors.primary
                              }}
                          >
                              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><Sparkles size={18} /> Render Vision</>}
                          </button>
                       </>
                     ) : (
                       <>
                          <div 
                              onClick={() => editInputRef.current?.click()}
                              className="border-2 border-dashed border-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/5 transition-all mb-4 text-center group"
                              style={{ borderColor: editFile ? BRAND.colors.secondary : `${BRAND.colors.secondary}4D` }}
                          >
                              <input 
                                  type="file" 
                                  ref={editInputRef} 
                                  onChange={(e) => handleFileChange(e, 'edit')} 
                                  className="hidden" 
                                  accept="image/*"
                              />
                              {editPreview ? (
                                  <div className="relative inline-block">
                                      <img src={editPreview} alt="Edit Preview" className="max-h-32 rounded-xl shadow-md mx-auto" />
                                      <button 
                                          onClick={(e) => { e.stopPropagation(); setEditPreview(null); setEditFile(null); }}
                                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                                      >
                                          <X size={12} />
                                      </button>
                                  </div>
                              ) : (
                                  <div className="space-y-2">
                                      <Upload size={24} className="mx-auto text-white/40 group-hover:text-white" />
                                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Upload Source Image</p>
                                  </div>
                              )}
                          </div>

                          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-2">
                            {EDIT_TEMPLATES.map((template, idx) => (
                              <button
                                key={idx}
                                onClick={() => setEditPrompt(template)}
                                className="shrink-0 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-white/60 uppercase tracking-wider hover:text-[${BRAND.colors.primary}] transition-all whitespace-nowrap"
                                style={{ 
                                    borderColor: 'rgba(255,255,255,0.1)',
                                    '--hover-color': BRAND.colors.primary
                                } as React.CSSProperties}
                                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.secondary; e.currentTarget.style.borderColor = BRAND.colors.secondary; e.currentTarget.style.color = BRAND.colors.primary }}
                                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                              >
                                {template}
                              </button>
                            ))}
                          </div>

                          <textarea 
                              value={editPrompt}
                              onChange={(e) => setEditPrompt(e.target.value)}
                              placeholder="Instruction (e.g. 'Add a retro filter', 'Remove background person')"
                              className="w-full p-4 rounded-2xl border border-white/10 text-sm text-white outline-none transition-all mb-4 min-h-[80px] resize-none placeholder:text-white/20"
                              style={{ backgroundColor: `${BRAND.colors.primary}80`, borderColor: `${BRAND.colors.secondary}80` }}
                          />

                          <button 
                              onClick={handleEditImage}
                              disabled={isLoading || !editPrompt.trim() || !editFile}
                              className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                              style={{ 
                                  background: `linear-gradient(to right, ${BRAND.colors.secondary}, #F2D696)`,
                                  color: BRAND.colors.primary
                              }}
                          >
                              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><Wand2 size={18} /> Apply Edits</>}
                          </button>
                       </>
                     )}
                  </div>

                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest px-1">Gallery</h4>
                     
                     {isLoading && (
                       <div className="bg-white/5 p-2 rounded-3xl border border-white/5 animate-pulse">
                         <div className="w-full aspect-square bg-white/5 rounded-2xl mb-2 flex items-center justify-center">
                            <Loader2 className="animate-spin" size={32} style={{ color: BRAND.colors.secondary }} />
                         </div>
                       </div>
                     )}

                     {generatedImages.map((img, idx) => (
                       <div key={idx} className="group relative bg-white/5 p-2 rounded-3xl border border-white/5 overflow-hidden animate-in fade-in zoom-in-95">
                          <img src={img.url} alt={img.prompt} className="w-full aspect-square object-cover rounded-2xl mb-2" />
                          <div className="p-2">
                             <p className="text-[10px] text-white/50 line-clamp-2 italic">"{img.prompt}"</p>
                          </div>
                          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <a href={img.url} download={`SafaArban_${idx}.png`} className="p-2 rounded-xl shadow-lg hover:scale-110 transition-all" style={{ backgroundColor: BRAND.colors.secondary, color: BRAND.colors.primary }}>
                                <Download size={16} />
                             </a>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 shadow-sm">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-2" style={{ color: BRAND.colors.secondary }}>
                        <Scan size={14} /> Document Intelligence
                     </h3>
                     
                     <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-white/10 rounded-3xl p-6 md:p-10 cursor-pointer hover:bg-white/5 transition-all mb-6 group text-center"
                        style={{ borderColor: `${BRAND.colors.secondary}4D` }}
                     >
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={(e) => handleFileChange(e, 'scan')} 
                          className="hidden" 
                          accept="image/*"
                        />
                        {filePreview ? (
                          <div className="relative inline-block">
                            <img src={filePreview} alt="Preview" className="max-h-40 rounded-xl shadow-md mx-auto border border-white/10" />
                            <button 
                              onClick={(e) => { e.stopPropagation(); setFilePreview(null); setSelectedFile(null); }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                             <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto" style={{ backgroundColor: `${BRAND.colors.secondary}1A`, color: BRAND.colors.secondary }}>
                                <Upload size={32} />
                             </div>
                             <p className="text-[11px] font-black uppercase tracking-widest text-white/40">Upload License / ID</p>
                          </div>
                        )}
                     </div>

                     {/* Prompt Template Section */}
                     <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Analysis Prompt</label>
                           {scanPrompt && (
                             <button onClick={() => setScanPrompt('')} className="text-[9px] text-white/40 hover:text-red-400 flex items-center gap-1">
                               <Eraser size={10} /> Clear
                             </button>
                           )}
                        </div>
                        
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                          {SCAN_TEMPLATES.map((template, idx) => (
                            <button
                              key={idx}
                              onClick={() => setScanPrompt(template)}
                              className="shrink-0 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-white/60 uppercase tracking-wider hover:text-[${BRAND.colors.primary}] transition-all"
                              style={{ 
                                  borderColor: 'rgba(255,255,255,0.1)',
                                  '--hover-color': BRAND.colors.primary
                              } as React.CSSProperties}
                              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.secondary; e.currentTarget.style.borderColor = BRAND.colors.secondary; e.currentTarget.style.color = BRAND.colors.primary }}
                              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                            >
                              {template.includes("dates") ? "Key Dates" : template.includes("Summary") ? "Summary" : template.includes("risks") ? "Risk Check" : template.includes("Translate") ? "Translate" : "Compliance"}
                            </button>
                          ))}
                        </div>

                        <textarea
                          value={scanPrompt}
                          onChange={(e) => setScanPrompt(e.target.value)}
                          placeholder="What should I look for in this document?"
                          className="w-full p-3 rounded-xl border border-white/10 text-xs font-medium text-white outline-none focus:border-[#C9A86A]/50 min-h-[80px] resize-none placeholder:text-white/20"
                          style={{ backgroundColor: `${BRAND.colors.primary}80` }}
                        />
                     </div>

                     {selectedFile && (
                       <button 
                         onClick={handleAnalyzeImage}
                         disabled={isLoading || !scanPrompt.trim()}
                         className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                         style={{ backgroundColor: BRAND.colors.secondary, color: BRAND.colors.primary }}
                       >
                         {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><FileSearch size={18} /> Analyze Document</>}
                       </button>
                     )}
                  </div>

                  {analysisResult && (
                    <div className="p-6 rounded-3xl border border-white/10 animate-in slide-in-from-bottom-4" style={{ backgroundColor: `${BRAND.colors.primary}80` }}>
                       <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                          <Bot size={16} style={{ color: BRAND.colors.secondary }} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-white">Analysis Result</span>
                       </div>
                       <MarkdownRenderer content={analysisResult} />
                    </div>
                  )}
                </div>
              )}
              
              {isLoading && mode === 'chat' && (
                <div className="flex justify-start animate-in slide-in-from-left-2">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                      <div className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s]" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                      <div className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s]" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                    </div>
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">
                      {chatStrategy === 'thinking' ? 'Reasoning...' : 'Searching Web...'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input (Only show in Chat mode) */}
            {mode === 'chat' && (
              <div className="p-4 border-t border-white/5" style={{ backgroundColor: BRAND.colors.primary }}>
                <div className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={chatStrategy === 'search' ? "Search for latest regulations..." : "Ask about MISA licenses, taxes..."}
                    className="w-full pl-5 pr-14 py-4 border border-white/10 rounded-[2rem] outline-none transition-all text-sm font-medium text-white placeholder:text-white/30"
                    style={{ backgroundColor: `${BRAND.colors.primary}80`, borderColor: `${BRAND.colors.secondary}4D` }}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-2 p-2.5 rounded-full hover:bg-white transition-all disabled:opacity-50"
                    style={{ backgroundColor: BRAND.colors.secondary, color: BRAND.colors.primary }}
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-[8px] text-center text-white/20 mt-3 font-black uppercase tracking-[0.3em]">
                  SafaArban Ltd • Private & Confidential
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AIAssistant;
