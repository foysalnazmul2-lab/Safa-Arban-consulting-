
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Sparkles, Video, Music, MapPin, Scan, X, Send, 
  Loader2, ThumbsUp, ThumbsDown, Copy, ExternalLink, Ratio, 
  Upload, Wand2, Download, Eraser, FileSearch, Bot, Mic, 
  Calendar, Briefcase, Coffee, Landmark, ChevronDown 
} from 'lucide-react';
import { BRAND } from '../constants';
import { gemini } from '../geminiService';
import { ChatMessage } from '../types';

const ASPECT_RATIOS = ["1:1", "16:9", "9:16", "4:3", "3:4"];
const EDIT_TEMPLATES = ["Make it cybernetic", "Add neon lights", "Sunset lighting", "Sketch style"];
const SCAN_TEMPLATES = ["Extract Key Dates", "Summarize", "Check Risks", "Translate to English", "Compliance Check"];

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-invert max-w-none text-sm leading-relaxed">
      {content.split('\n').map((line, i) => (
        <p key={i} className="min-h-[1em] mb-2">{line}</p>
      ))}
    </div>
  );
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'visual' | 'video' | 'audio' | 'concierge' | 'scan'>('chat');
  
  // Chat State
  const [messages, setMessages] = useState<(ChatMessage & { feedback?: 'up' | 'down' })[]>([
    { role: 'model', parts: [{ text: "Welcome to SafaArban. I am your AI Business Architect. How can I assist with your Saudi market entry today?" }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatStrategy, setChatStrategy] = useState<'thinking' | 'fast' | 'search' | 'maps'>('thinking');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Visual State
  const [visualSubMode, setVisualSubMode] = useState<'generate' | 'edit'>('generate');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [generatedImages, setGeneratedImages] = useState<{url: string, prompt: string}[]>([]);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  // Video State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoFilePreview, setVideoFilePreview] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Shared for image inputs (edit/video/scan)
  
  // Video Analysis State
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [videoToAnalyze, setVideoToAnalyze] = useState<File | null>(null);
  const [scanPrompt, setScanPrompt] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  // Audio State
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcriptionResult, setTranscriptionResult] = useState<string | null>(null);

  // Concierge State
  const [tripDuration, setTripDuration] = useState(3);
  const [tripFocus, setTripFocus] = useState('Business');
  const [tripInterests, setTripInterests] = useState<string[]>([]);
  const [generatedItinerary, setGeneratedItinerary] = useState<any[] | null>(null);

  // Scan State (Document)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, analysisResult, transcriptionResult, generatedItinerary]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await gemini.sendMessage(messages, input, chatStrategy);
      const modelMsg: ChatMessage = { 
        role: 'model', 
        parts: [{ text: response.text }],
        sources: response.sources 
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "I encountered an error processing your request." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (index: number, type: 'up' | 'down') => {
    setMessages(prev => prev.map((msg, i) => i === index ? { ...msg, feedback: type } : msg));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'edit' | 'video' | 'scan' | 'audio') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (type === 'audio') {
        setAudioFile(file);
        return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (type === 'edit') {
            setEditFile(file);
            setEditPreview(result);
        } else if (type === 'video') {
            setVideoFilePreview(result);
        } else if (type === 'scan') {
            setSelectedFile(file);
            setFilePreview(result);
        }
    };
    reader.readAsDataURL(file);
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setVideoToAnalyze(file);
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    setIsLoading(true);
    try {
        const result = await gemini.generateImage(imagePrompt, imageSize, aspectRatio);
        if (result) {
            setGeneratedImages(prev => [{ url: result, prompt: imagePrompt }, ...prev]);
        }
    } catch (e) {
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  const handleEditImage = async () => {
    if (!editFile || !editPrompt || !editPreview) return;
    setIsLoading(true);
    try {
        const base64Data = editPreview.split(',')[1];
        const result = await gemini.editImage(base64Data, editFile.type, editPrompt);
        if (result) {
            setGeneratedImages(prev => [{ url: result, prompt: `Edit: ${editPrompt}` }, ...prev]);
        }
    } catch (e) {
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt) return;
    setIsLoading(true);
    try {
        const imageBase64 = videoFilePreview ? videoFilePreview.split(',')[1] : undefined;
        const result = await gemini.generateVideo(videoPrompt, imageBase64);
        if (result) setGeneratedVideo(result);
        else setGeneratedVideo('error');
    } catch (e) {
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  const handleAnalyzeVideo = async () => {
    if (!videoToAnalyze || !scanPrompt) return;
    setIsLoading(true);
    
    // For demo purposes, we will simulate video analysis or convert to base64 if small enough.
    // In a real app, video upload to File API is preferred.
    // Here we'll just mock or use a very short clip logic if applicable.
    // Given constraints, we'll try to read a small chunk or fail gracefully.
    try {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64 = (e.target?.result as string).split(',')[1];
            const result = await gemini.analyzeVideo(base64, videoToAnalyze.type, scanPrompt);
            setAnalysisResult(result);
            setIsLoading(false);
        };
        reader.readAsDataURL(videoToAnalyze);
    } catch (e) {
        setAnalysisResult("Error processing video file.");
        setIsLoading(false);
    }
  };

  const handleTranscribeAudio = async () => {
    if (!audioFile) return;
    setIsLoading(true);
    try {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64 = (e.target?.result as string).split(',')[1];
            const result = await gemini.transcribeAudio(base64, audioFile.type);
            setTranscriptionResult(result);
            setIsLoading(false);
        };
        reader.readAsDataURL(audioFile);
    } catch (e) {
        setIsLoading(false);
    }
  };

  const handleGenerateItinerary = async () => {
    setIsLoading(true);
    const result = await gemini.generateItinerary(tripDuration, tripFocus, tripInterests);
    if (result) setGeneratedItinerary(result);
    setIsLoading(false);
  };

  const toggleInterest = (interest: string) => {
    setTripInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };

  const handleAnalyzeImage = async () => {
    if (!selectedFile || !filePreview || !scanPrompt) return;
    setIsLoading(true);
    try {
        const base64 = filePreview.split(',')[1];
        const result = await gemini.analyzeImage(base64, selectedFile.type, scanPrompt);
        setAnalysisResult(result);
    } catch (e) {
        setAnalysisResult("Analysis failed.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 no-print"
        style={{ backgroundColor: BRAND.colors.secondary, boxShadow: `0 0 30px ${BRAND.colors.secondary}66` }}
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
      </button>

      {/* Main Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[480px] h-[80vh] rounded-[2rem] shadow-2xl overflow-hidden z-50 flex flex-col border border-white/10 no-print animate-in slide-in-from-bottom-10" style={{ backgroundColor: BRAND.colors.primary }}>
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-xl">
                        <Sparkles size={20} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="font-black text-white text-lg leading-none">AI Architect</h3>
                        <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Powered by Gemini 2.5</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {/* Strategy Toggles for Chat */}
                    {mode === 'chat' && (
                        <div className="flex bg-white/5 rounded-lg p-1">
                            {['thinking', 'fast', 'search'].map((s) => (
                                <button 
                                    key={s}
                                    onClick={() => setChatStrategy(s as any)}
                                    className={`p-1.5 rounded-md transition-all ${chatStrategy === s ? 'bg-white/20 text-emerald-400' : 'text-white/30 hover:text-white'}`}
                                    title={s}
                                >
                                    {s === 'thinking' ? <Bot size={14} /> : s === 'fast' ? <Zap size={14} /> : <FileSearch size={14} />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Mode Selector */}
            <div className="flex overflow-x-auto p-2 gap-2 border-b border-white/5 bg-black/10 no-scrollbar shrink-0">
                {[
                    { id: 'chat', icon: MessageSquare, label: 'Chat' },
                    { id: 'visual', icon: Sparkles, label: 'Visual' },
                    { id: 'video', icon: Video, label: 'Veo' },
                    { id: 'audio', icon: Music, label: 'Voice' },
                    { id: 'concierge', icon: MapPin, label: 'Trips' },
                    { id: 'scan', icon: Scan, label: 'Scan' },
                ].map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setMode(m.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                            mode === m.id 
                            ? 'bg-white text-[#051C2C]' 
                            : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        <m.icon size={14} /> {m.label}
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar relative"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              {/* Background Texture */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none fixed"></div>

              {/* CHAT MESSAGES */}
              {mode === 'chat' && messages.map((msg, idx) => (
                 <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 relative z-10`}>
                    <div 
                      className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-white text-[#051C2C] rounded-tr-none font-bold' 
                        : 'bg-white/10 text-white rounded-tl-none border border-white/10 backdrop-blur-sm shadow-inner'
                      }`}
                    >
                       {msg.role === 'model' ? <MarkdownRenderer content={msg.parts[0].text} /> : msg.parts[0].text}
                       
                       {/* Sources */}
                       {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                             {msg.sources.map((src: any, i: number) => (
                                <a key={i} href={src.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[9px] bg-black/20 hover:bg-black/40 px-2 py-1 rounded text-white/70 transition-colors">
                                   {src.type === 'map' ? <MapPin size={10} /> : <ExternalLink size={10} />}
                                   {src.title}
                                </a>
                             ))}
                          </div>
                       )}

                       {/* Feedback/Actions */}
                       {msg.role === 'model' && (
                          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/5 opacity-50 hover:opacity-100 transition-opacity">
                             <button onClick={() => handleFeedback(idx, 'up')} className={`hover:text-emerald-400 ${msg.feedback === 'up' ? 'text-emerald-400' : ''}`}><ThumbsUp size={12} /></button>
                             <button onClick={() => handleFeedback(idx, 'down')} className={`hover:text-red-400 ${msg.feedback === 'down' ? 'text-red-400' : ''}`}><ThumbsDown size={12} /></button>
                             <button onClick={() => navigator.clipboard.writeText(msg.parts[0].text)} className="hover:text-white"><Copy size={12} /></button>
                          </div>
                       )}
                    </div>
                 </div>
              ))}

              {/* VISUAL MODE */}
              {mode === 'visual' && (
                <div className="space-y-6 relative z-10">
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
                          
                          <div className="space-y-4 mb-6">
                              <div className="flex items-center justify-between">
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

                              <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2"><Ratio size={12}/> Aspect Ratio</span>
                                  <div className="flex p-1 rounded-xl gap-1 overflow-x-auto no-scrollbar max-w-[200px]" style={{ backgroundColor: `${BRAND.colors.primary}80` }}>
                                      {ASPECT_RATIOS.map((ar) => (
                                      <button 
                                          key={ar}
                                          onClick={() => setAspectRatio(ar)}
                                          className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all whitespace-nowrap ${aspectRatio === ar ? '' : 'text-white/40 hover:text-white'}`}
                                          style={{ 
                                              backgroundColor: aspectRatio === ar ? BRAND.colors.secondary : 'transparent',
                                              color: aspectRatio === ar ? BRAND.colors.primary : undefined
                                          }}
                                      >
                                          {ar}
                                      </button>
                                      ))}
                                  </div>
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
                                className="shrink-0 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-white/60 uppercase tracking-wider hover:text-[#051C2C] transition-all whitespace-nowrap"
                                style={{ 
                                    borderColor: 'rgba(255,255,255,0.1)',
                                }}
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
              )} 
              
              {/* VIDEO MODE */}
              {mode === 'video' && (
                  <div className="space-y-6 relative z-10">
                      <div className="bg-white/5 p-5 rounded-3xl border border-white/10 shadow-sm">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2" style={{ color: BRAND.colors.secondary }}>
                              <Video size={14} /> Veo Studio
                          </h3>
                          
                          <div className="space-y-4">
                              <textarea 
                                  value={videoPrompt}
                                  onChange={(e) => setVideoPrompt(e.target.value)}
                                  placeholder="Describe the video scene... (e.g. 'A futuristic drone shot of Riyadh skyline at sunset')"
                                  className="w-full p-4 rounded-2xl border border-white/10 text-sm text-white outline-none transition-all mb-2 min-h-[80px] resize-none placeholder:text-white/20"
                                  style={{ backgroundColor: `${BRAND.colors.primary}80`, borderColor: `${BRAND.colors.secondary}80` }}
                              />
                              
                              <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border border-dashed border-white/20 rounded-xl p-3 cursor-pointer hover:bg-white/5 text-center"
                              >
                                  <input 
                                      type="file" 
                                      ref={fileInputRef} 
                                      onChange={(e) => handleFileChange(e, 'video')} 
                                      className="hidden" 
                                      accept="image/*"
                                  />
                                  {videoFilePreview ? (
                                      <div className="flex items-center justify-center gap-2">
                                          <img src={videoFilePreview} className="h-8 w-8 rounded object-cover" />
                                          <span className="text-[10px] text-white">Image Reference Added</span>
                                          <button onClick={(e) => { e.stopPropagation(); setVideoFilePreview(null); }}><X size={12} className="text-red-400"/></button>
                                      </div>
                                  ) : (
                                      <p className="text-[10px] text-white/40 font-bold uppercase">+ Add Image Ref (Optional)</p>
                                  )}
                              </div>

                              <button 
                                  onClick={handleGenerateVideo}
                                  disabled={isLoading || !videoPrompt}
                                  className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                                  style={{ background: `linear-gradient(to right, ${BRAND.colors.secondary}, #F2D696)`, color: BRAND.colors.primary }}
                              >
                                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><Sparkles size={18} /> Generate Video</>}
                              </button>
                          </div>
                      </div>

                      {/* Video Result */}
                      {generatedVideo && generatedVideo !== 'error' && (
                          <div className="bg-white/5 p-4 rounded-3xl border border-white/10 animate-in slide-in-from-bottom-4">
                              <video controls className="w-full rounded-2xl" src={generatedVideo}></video>
                              <a href={generatedVideo} download className="block text-center mt-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest hover:underline">Download MP4</a>
                          </div>
                      )}

                      {/* Video Analysis Section */}
                      <div className="bg-white/5 p-5 rounded-3xl border border-white/10 shadow-sm mt-8">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 text-blue-400">
                              <Scan size={14} /> Video Analysis
                          </h3>
                          <div 
                              onClick={() => videoInputRef.current?.click()}
                              className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/5 transition-all group"
                          >
                              <input type="file" ref={videoInputRef} onChange={handleVideoFileChange} className="hidden" accept="video/*" />
                              <Upload size={24} className="mx-auto text-white/40 mb-2 group-hover:text-blue-400" />
                              <p className="text-[10px] font-bold text-white/60 uppercase">Upload Video to Analyze</p>
                          </div>
                          {videoToAnalyze && (
                              <div className="mt-4">
                                  <textarea
                                      value={scanPrompt}
                                      onChange={(e) => setScanPrompt(e.target.value)}
                                      placeholder="What should I analyze in this video?"
                                      className="w-full p-3 rounded-xl border border-white/10 text-xs text-white outline-none bg-black/20"
                                  />
                                  <button onClick={handleAnalyzeVideo} disabled={isLoading} className="w-full mt-2 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase">
                                      {isLoading ? 'Analyzing...' : 'Analyze'}
                                  </button>
                              </div>
                          )}
                          {analysisResult && (
                              <div className="mt-4 p-4 bg-black/30 rounded-xl text-xs text-white/80 leading-relaxed">
                                  <MarkdownRenderer content={analysisResult} />
                              </div>
                          )}
                      </div>
                  </div>
              )}

              {/* AUDIO MODE */}
              {mode === 'audio' && (
                  <div className="space-y-6 relative z-10">
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 shadow-sm text-center">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-2 text-emerald-400">
                              <Music size={14} /> Transcription
                          </h3>
                          <div 
                              onClick={() => audioInputRef.current?.click()}
                              className="border-2 border-dashed border-white/10 rounded-3xl p-10 cursor-pointer hover:bg-white/5 transition-all mb-6 group"
                          >
                              <input type="file" ref={audioInputRef} onChange={(e) => handleFileChange(e, 'audio')} className="hidden" accept="audio/*" />
                              <Mic size={32} className="mx-auto text-white/40 mb-3 group-hover:text-emerald-400" />
                              <p className="text-[10px] font-bold text-white/60 uppercase">{audioFile ? audioFile.name : 'Upload Audio File'}</p>
                          </div>
                          
                          <button 
                              onClick={handleTranscribeAudio}
                              disabled={!audioFile || isLoading}
                              className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs bg-emerald-600 text-white disabled:opacity-50"
                          >
                              {isLoading ? <Loader2 size={16} className="animate-spin inline" /> : 'Transcribe'}
                          </button>
                      </div>
                      
                      {transcriptionResult && (
                          <div className="p-6 bg-white/5 rounded-3xl border border-white/10 animate-in slide-in-from-bottom-4">
                              <h4 className="text-[10px] font-bold text-white/40 uppercase mb-4">Result</h4>
                              <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">{transcriptionResult}</p>
                              <button onClick={() => navigator.clipboard.writeText(transcriptionResult)} className="mt-4 text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-2 hover:underline">
                                  <Copy size={12} /> Copy Text
                              </button>
                          </div>
                      )}
                  </div>
              )}

              {/* CONCIERGE MODE */}
              {mode === 'concierge' && (
                <div className="space-y-6 relative z-10">
                  {/* Preferences Form */}
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2" style={{ color: BRAND.colors.secondary }}>
                      <MapPin size={14} /> Trip Planner
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Duration */}
                      <div>
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Duration</label>
                        <div className="flex gap-2">
                          {[1, 3, 5, 7].map(d => (
                            <button
                              key={d}
                              onClick={() => setTripDuration(d)}
                              className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                                tripDuration === d ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                              }`}
                              style={{ backgroundColor: tripDuration === d ? BRAND.colors.secondary : 'transparent' }}
                            >
                              {d} Days
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Focus */}
                      <div>
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Primary Focus</label>
                        <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                          {['Business', 'Leisure', 'Mixed'].map(f => (
                            <button
                              key={f}
                              onClick={() => setTripFocus(f)}
                              className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                                tripFocus === f ? 'bg-white/10 text-white shadow-sm' : 'text-white/40'
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Interests */}
                      <div>
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Interests</label>
                        <div className="flex flex-wrap gap-2">
                          {['Tech', 'Finance', 'Real Estate', 'Culture', 'Fine Dining', 'History', 'Shopping'].map(i => (
                            <button
                              key={i}
                              onClick={() => toggleInterest(i)}
                              className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all ${
                                tripInterests.includes(i) 
                                ? 'bg-white text-[#0D2B4F] border-white' 
                                : 'text-white/50 border-white/10 hover:border-white/30'
                              }`}
                            >
                              {i}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={handleGenerateItinerary}
                        disabled={isLoading}
                        className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all disabled:opacity-50 mt-4"
                        style={{ 
                            background: `linear-gradient(to right, ${BRAND.colors.secondary}, #F2D696)`,
                            color: BRAND.colors.primary
                        }}
                      >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><Sparkles size={18} /> Generate Itinerary</>}
                      </button>
                    </div>
                  </div>

                  {/* Results */}
                  {generatedItinerary && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4">
                      {generatedItinerary.map((day) => (
                        <div key={day.day} className="bg-white/5 rounded-3xl border border-white/5 overflow-hidden">
                          <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                            <div>
                              <h4 className="font-black text-sm text-white">Day {day.day}</h4>
                              <p className="text-[10px] text-white/50 uppercase tracking-wide">{day.theme}</p>
                            </div>
                            <Calendar size={16} className="text-white/30" />
                          </div>
                          <div className="p-4 space-y-4">
                            {day.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[#0D2B4F] shadow-lg z-10 ${
                                    item.type === 'business' ? 'bg-[#F7C948]' : item.type === 'dining' ? 'bg-[#E94E4E]' : 'bg-white'
                                  }`}>
                                    {item.type === 'business' ? <Briefcase size={14} /> : item.type === 'dining' ? <Coffee size={14} /> : <Landmark size={14} />}
                                  </div>
                                  {idx !== day.items.length - 1 && <div className="w-0.5 h-full bg-white/10 -my-2"></div>}
                                </div>
                                <div className="pb-4">
                                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider block mb-1">{item.time} • {item.location}</span>
                                  <h5 className="text-sm font-bold text-white mb-1">{item.activity}</h5>
                                  <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-center pb-4">
                        <button className="text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white flex items-center gap-2">
                          <Download size={14} /> Save to Calendar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SCAN MODE */}
              {mode === 'scan' && (
                <div className="space-y-6 relative z-10">
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
                              className="shrink-0 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-white/60 uppercase tracking-wider hover:text-[#051C2C] transition-all"
                              style={{ 
                                  borderColor: 'rgba(255,255,255,0.1)',
                              }}
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
                <div className="flex justify-start animate-in slide-in-from-left-2 relative z-10">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                      <div className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s]" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                      <div className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s]" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                    </div>
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">
                      {chatStrategy === 'thinking' ? 'Reasoning...' : chatStrategy === 'fast' ? 'Generating...' : 'Searching...'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            {mode === 'chat' && (
                <div className="p-4 border-t border-white/10 bg-black/10 shrink-0">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask me about Saudi business setup..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-[#C9A86A]/50 transition-all placeholder:text-white/20"
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 top-2 p-2 bg-[#C9A86A] text-[#051C2C] rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
      )}
    </>
  );
}
