
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Image as ImageIcon, Sparkles, Download, Maximize2, Scan, Upload, FileSearch, Quote, Eraser, RefreshCw } from 'lucide-react';
import { gemini } from '../geminiService';
import { ChatMessage } from '../types';

type AssistantMode = 'chat' | 'visual' | 'scan';

const SCAN_TEMPLATES = [
  "Analyze this document for Saudi business compliance.",
  "Extract key dates (start, expiry) from this contract.",
  "Summarize the main points of this MISA license.",
  "Identify potential compliance risks in this document.",
  "Translate key fields from Arabic to English."
];

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AssistantMode>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: "Hello! I'm your SafaArban Business Assistant. How can I help you with your Saudi business setup today?" }] }
  ]);
  const [input, setInput] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");
  const [generatedImages, setGeneratedImages] = useState<{url: string, prompt: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Scan Mode State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [scanPrompt, setScanPrompt] = useState(SCAN_TEMPLATES[0]);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    const responseText = await gemini.sendMessage(messages, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', parts: [{ text: responseText }] }]);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
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

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-[#0F2847] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform no-print flex items-center justify-center border-2 border-[#C9A86A]"
      >
        <Sparkles size={24} className="text-[#C9A86A]" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-8 z-[60] w-full md:w-[420px] md:h-[650px] bg-white md:rounded-3xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden no-print animate-in slide-in-from-bottom-8">
          {/* Header */}
          <div className="bg-[#0A1A2F] p-5 text-white flex justify-between items-center border-b border-[#C9A86A]/20">
            <div className="flex items-center gap-3">
              <div className="bg-[#C9A86A]/10 p-2 rounded-xl border border-[#C9A86A]/30">
                <Bot size={20} className="text-[#C9A86A]" />
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-widest">SafaArban Elite AI</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] text-white/50 font-bold uppercase tracking-widest">Concierge Active</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg text-white/50 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="flex bg-[#0A1A2F] px-4 pb-2">
            <button 
              onClick={() => setMode('chat')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-t-lg ${mode === 'chat' ? 'bg-white text-[#0A1A2F]' : 'text-white/40 hover:text-white'}`}
            >
              <MessageSquare size={14} /> Advisor
            </button>
            <button 
              onClick={() => setMode('visual')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-t-lg ${mode === 'visual' ? 'bg-white text-[#0A1A2F]' : 'text-white/40 hover:text-white'}`}
            >
              <ImageIcon size={14} /> Studio
            </button>
            <button 
              onClick={() => setMode('scan')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-t-lg ${mode === 'scan' ? 'bg-white text-[#0A1A2F]' : 'text-white/40 hover:text-white'}`}
            >
              <Scan size={14} /> Scan Docs
            </button>
          </div>

          {/* Main Content Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50"
          >
            {mode === 'chat' ? (
              <>
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-[#006C35] text-white rounded-tr-none shadow-lg' 
                        : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                      }`}
                    >
                      {msg.parts[0].text}
                    </div>
                  </div>
                ))}
              </>
            ) : mode === 'visual' ? (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-3xl border border-[#C9A86A]/20 shadow-sm">
                   <h3 className="text-[10px] font-black text-[#C9A86A] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Sparkles size={14} /> High-Fidelity Image Generation
                   </h3>
                   <textarea 
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="Describe your corporate vision... (e.g. 'Modern skyscraper in Riyadh at dusk, cinematic lighting')"
                      className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm outline-none focus:ring-2 focus:ring-[#C9A86A]/50 transition-all mb-4 min-h-[100px] resize-none"
                   />
                   
                   <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Resolution</span>
                      <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                         {["1K", "2K", "4K"].map((s) => (
                           <button 
                             key={s}
                             onClick={() => setImageSize(s as any)}
                             className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${imageSize === s ? 'bg-[#0F2847] text-white' : 'text-slate-400 hover:text-slate-600'}`}
                           >
                             {s}
                           </button>
                         ))}
                      </div>
                   </div>

                   <button 
                     onClick={() => handleGenerateImage()}
                     disabled={isLoading || !imagePrompt.trim()}
                     className="w-full bg-[#C9A86A] text-[#0A1A2F] py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#b08d55] transition-all disabled:opacity-50 shadow-xl"
                   >
                     {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><Sparkles size={18} /> Create Masterpiece</>}
                   </button>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">Recent Masterpieces</h4>
                   
                   {/* Skeleton Loader */}
                   {isLoading && (
                     <div className="bg-white p-2 rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-pulse">
                       <div className="w-full aspect-square bg-slate-100 rounded-2xl mb-2 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_1.5s_infinite] -translate-x-full" />
                          <Loader2 className="animate-spin text-[#C9A86A]" size={32} />
                       </div>
                       <div className="p-2 space-y-2">
                          <div className="h-2 bg-slate-100 rounded w-3/4"></div>
                          <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                       </div>
                     </div>
                   )}

                   {generatedImages.length === 0 && !isLoading && (
                     <div className="text-center py-10 opacity-30">
                        <ImageIcon size={40} className="mx-auto mb-2" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Studio is empty</p>
                     </div>
                   )}
                   {generatedImages.map((img, idx) => (
                     <div key={idx} className="group relative bg-white p-2 rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in zoom-in-95">
                        <img src={img.url} alt={img.prompt} className="w-full aspect-square object-cover rounded-2xl mb-2" />
                        <div className="p-2">
                           <p className="text-[10px] text-slate-500 line-clamp-2 italic">"{img.prompt}"</p>
                        </div>
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <a href={img.url} download={`SafaArban_${idx}.png`} className="p-2 bg-white/90 backdrop-blur rounded-xl shadow-lg text-[#0A1A2F] hover:bg-[#C9A86A] transition-colors" title="Download">
                              <Download size={16} />
                           </a>
                           <button 
                             onClick={() => handleGenerateImage(img.prompt)}
                             className="p-2 bg-white/90 backdrop-blur rounded-xl shadow-lg text-[#0A1A2F] hover:bg-[#006C35] hover:text-white transition-colors"
                             title="Regenerate"
                           >
                             <RefreshCw size={16} />
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-[#006C35]/20 shadow-sm">
                   <h3 className="text-[10px] font-black text-[#006C35] uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-2">
                      <Scan size={14} /> Document Intelligence
                   </h3>
                   
                   <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 rounded-3xl p-6 md:p-10 cursor-pointer hover:border-[#006C35]/40 hover:bg-slate-50 transition-all mb-6 group text-center"
                   >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*"
                      />
                      {filePreview ? (
                        <div className="relative inline-block">
                          <img src={filePreview} alt="Preview" className="max-h-40 rounded-xl shadow-md mx-auto" />
                          <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                             <Upload className="text-white" size={32} />
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setFilePreview(null); setSelectedFile(null); }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                           <div className="w-16 h-16 bg-[#006C35]/10 rounded-2xl flex items-center justify-center mx-auto text-[#006C35]">
                              <Upload size={32} />
                           </div>
                           <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Tap to Upload License or ID</p>
                        </div>
                      )}
                   </div>

                   {/* Prompt Template Section */}
                   <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Analysis Prompt</label>
                         {scanPrompt && (
                           <button onClick={() => setScanPrompt('')} className="text-[9px] text-slate-400 hover:text-red-400 flex items-center gap-1">
                             <Eraser size={10} /> Clear
                           </button>
                         )}
                      </div>
                      
                      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        {SCAN_TEMPLATES.map((template, idx) => (
                          <button
                            key={idx}
                            onClick={() => setScanPrompt(template)}
                            className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[9px] font-bold text-slate-500 uppercase tracking-wider hover:bg-[#006C35] hover:text-white hover:border-[#006C35] transition-all"
                          >
                            {template.includes("dates") ? "Key Dates" : template.includes("Summary") ? "Summary" : template.includes("risks") ? "Risk Check" : template.includes("Translate") ? "Translate" : "Compliance"}
                          </button>
                        ))}
                      </div>

                      <textarea
                        value={scanPrompt}
                        onChange={(e) => setScanPrompt(e.target.value)}
                        placeholder="What should I look for in this document?"
                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-medium outline-none focus:ring-2 focus:ring-[#006C35]/30 min-h-[80px] resize-none"
                      />
                   </div>

                   {selectedFile && (
                     <button 
                       onClick={handleAnalyzeImage}
                       disabled={isLoading || !scanPrompt.trim()}
                       className="w-full bg-[#006C35] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#005a2c] transition-all disabled:opacity-50 shadow-xl"
                     >
                       {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><FileSearch size={18} /> Analyze Document</>}
                     </button>
                   )}
                </div>

                {analysisResult && (
                  <div className="bg-[#0A1A2F] p-6 rounded-3xl text-white animate-in slide-in-from-bottom-4">
                     <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                        <Bot size={16} className="text-[#C9A86A]" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Analysis Result</span>
                     </div>
                     <p className="text-xs leading-relaxed text-white/80 whitespace-pre-wrap font-mono">
                        {analysisResult}
                     </p>
                  </div>
                )}
              </div>
            )}
            
            {isLoading && mode === 'chat' && (
              <div className="flex justify-start animate-in slide-in-from-left-2">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[#C9A86A] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#C9A86A] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-[#C9A86A] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Advisor Thinking</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input (Only show in Chat mode) */}
          {mode === 'chat' && (
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about MISA licenses, taxes..."
                  className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-[#C9A86A]/50 transition-all text-sm font-medium"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 p-2.5 bg-[#0A1A2F] text-[#C9A86A] rounded-full hover:bg-[#C9A86A] hover:text-[#0A1A2F] transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-[9px] text-center text-slate-400 mt-3 font-black uppercase tracking-[0.2em]">
                Elite AI Governance • SafaArban Concierge
              </p>
            </div>
          )}
          
          {/* Visual Footer Branding */}
          {(mode === 'visual' || mode === 'scan') && (
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  {mode === 'visual' ? "ALL IMAGES GENERATED AS PER WE NEEDOURB" : "Secure Document Analysis Gateway"}
               </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AIAssistant;
