
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Image as ImageIcon, Sparkles, Download, Maximize2, Minimize2, Scan, Upload, FileSearch, Quote, Eraser, RefreshCw, Wand2, Globe, BrainCircuit, ExternalLink, MapPin, History, ThumbsUp, ThumbsDown, Trash2, Plus, Ratio, Mic, Volume2, StopCircle, AlertCircle, Calendar, Briefcase, Coffee, Landmark, Map } from 'lucide-react';
import { gemini, AIPersona, ItineraryDay } from '../geminiService.ts';
import { ChatMessage } from '../types.ts';
import { BRAND } from '../constants.ts';

type AssistantMode = 'chat' | 'visual' | 'scan' | 'history' | 'live' | 'concierge';
type VisualSubMode = 'generate' | 'edit';
type ChatStrategy = 'thinking' | 'search';

interface SavedSession {
  id: string;
  title: string;
  date: string;
  messages: ChatMessage[];
  persona: AIPersona;
}

interface EnhancedChatMessage extends ChatMessage {
  feedback?: 'up' | 'down';
  feedbackComment?: string;
  isFeedbackOpen?: boolean;
}

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

const ASPECT_RATIOS = ["1:1", "4:3", "3:4", "16:9", "9:16"];

// --- Robust Audio Helper ---
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  // 1. Create a fresh buffer copy to ensure byte alignment (Int16 require even byte offset)
  // This prevents RangeError: start offset of Int16Array should be a multiple of 2
  const bufferCopy = new ArrayBuffer(data.byteLength);
  const viewCopy = new Uint8Array(bufferCopy);
  viewCopy.set(data);

  // 2. Interpret as Int16 (Linear PCM)
  // Clamp length to even number to avoid partial Int16
  const length = Math.floor(data.byteLength / 2);
  const dataInt16 = new Int16Array(bufferCopy, 0, length);

  // 3. Create AudioBuffer
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  // 4. Convert Int16 to Float32 (-1.0 to 1.0)
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

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
          elements.push(<ul key={`ul-${index}`} className="list-disc ml-4 space-y-1 mt-2 mb-2 text-slate-300"></ul>);
        }
        // Append to the last UL (which is the current one)
        const lastUl = elements[elements.length - 1] as React.ReactElement<any>;
        const newChildren = [...React.Children.toArray(lastUl.props.children), <li key={`li-${index}`} className="pl-1">{processedLine}</li>];
        elements[elements.length - 1] = React.cloneElement(lastUl, {}, newChildren);
      } else {
        inList = false;
        // Handle Headers (Simple #)
        if (line.trim().startsWith('### ')) {
           elements.push(<h4 key={index} className="font-black text-sm mt-4 mb-2 uppercase tracking-wide text-white">{line.trim().substring(4)}</h4>);
        } else if (line.trim().startsWith('**') && !line.includes(' ')) {
           // Standalone bold line acting as header
           elements.push(<h4 key={index} className="font-bold text-sm mt-3 mb-1 text-white">{line.replace(/\*\*/g, '')}</h4>);
        } else {
           // Standard Paragraph with bold support
           if (line.trim() === '') {
             elements.push(<div key={index} className="h-2"></div>);
           } else {
             const processedLine = line.split(/(\*\*.*?\*\*)/).map((part, i) => 
               part.startsWith('**') && part.endsWith('**') ? <strong key={i} className="text-white">{part.slice(2, -2)}</strong> : part
             );
             elements.push(<p key={index} className="mb-2 last:mb-0">{processedLine}</p>);
           }
        }
      }
    });

    return elements;
  };

  return <div className="text-sm leading-relaxed tracking-wide">{formatText(content)}</div>;
};

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<AssistantMode>('chat');
  const [visualSubMode, setVisualSubMode] = useState<VisualSubMode>('generate');
  const [chatStrategy, setChatStrategy] = useState<ChatStrategy>('thinking');
  const [persona, setPersona] = useState<AIPersona>('professional');
  
  // Chat History & Persistence
  const [currentSessionId, setCurrentSessionId] = useState<string>(Date.now().toString());
  const [sessions, setSessions] = useState<SavedSession[]>([]);
  const [messages, setMessages] = useState<EnhancedChatMessage[]>([
    { role: 'model', parts: [{ text: "Welcome to the SafaArban Command Terminal. I am ready to assist with your investment queries." }] }
  ]);
  const [input, setInput] = useState('');
  
  // Generation State
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");
  const [aspectRatio, setAspectRatio] = useState("1:1");
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

  // Concierge Mode State
  const [tripDuration, setTripDuration] = useState(3);
  const [tripFocus, setTripFocus] = useState('Business');
  const [tripInterests, setTripInterests] = useState<string[]>(['Tech']);
  const [generatedItinerary, setGeneratedItinerary] = useState<ItineraryDay[] | null>(null);

  // Live Audio State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isLiveConnecting, setIsLiveConnecting] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  // Initialize Sessions from LocalStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('safa_ai_sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  // Save current session automatically when messages change
  useEffect(() => {
    if (messages.length > 1) { // Don't save just the welcome message
      const updatedSessions = sessions.filter(s => s.id !== currentSessionId);
      const sessionTitle = messages[1]?.parts[0].text.substring(0, 30) + '...' || 'New Conversation';
      
      const currentSession: SavedSession = {
        id: currentSessionId,
        title: sessionTitle,
        date: new Date().toISOString(),
        messages: messages,
        persona: persona
      };
      
      const newHistory = [currentSession, ...updatedSessions];
      setSessions(newHistory);
      localStorage.setItem('safa_ai_sessions', JSON.stringify(newHistory));
    }
  }, [messages, currentSessionId, persona]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, generatedImages, mode, analysisResult, isLoading, generatedItinerary]);

  // Clean up Live Session on unmount
  useEffect(() => {
    return () => {
        stopLiveSession();
    };
  }, []);

  const handleNewChat = () => {
    setCurrentSessionId(Date.now().toString());
    setMessages([{ role: 'model', parts: [{ text: "New session initialized. How may I assist you today?" }] }]);
    setMode('chat');
  };

  const handleLoadSession = (session: SavedSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setPersona(session.persona);
    setMode('chat');
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    localStorage.setItem('safa_ai_sessions', JSON.stringify(updated));
    if (id === currentSessionId) {
      handleNewChat();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userMsg }] }]);
    setIsLoading(true);

    const result = await gemini.sendMessage(messages, userMsg, chatStrategy, persona);
    
    setMessages(prev => [...prev, { 
      role: 'model', 
      parts: [{ text: result.text }],
      sources: result.sources 
    }]);
    setIsLoading(false);
  };

  const handleSpeak = async (text: string) => {
    const pcmAudioBuffer = await gemini.speak(text);
    if (pcmAudioBuffer) {
        try {
            // Use 24000Hz as per Gemini API defaults for TTS
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            
            // Convert the raw ArrayBuffer to Uint8Array for processing
            const uint8Data = new Uint8Array(pcmAudioBuffer);
            
            // Decode the raw PCM data manually using our safe helper
            const buffer = await decodeAudioData(uint8Data, ctx, 24000, 1);
            
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.start(0);
        } catch (e) {
            console.error("Audio playback error:", e);
        }
    }
  };

  const handleFeedback = (index: number, type: 'up' | 'down') => {
    const updatedMessages = [...messages];
    if (updatedMessages[index]) {
      updatedMessages[index].feedback = type;
      if (type === 'down') {
        updatedMessages[index].isFeedbackOpen = true;
      }
    }
    setMessages(updatedMessages);
  };

  const submitFeedbackComment = (index: number, comment: string) => {
    const updatedMessages = [...messages];
    if (updatedMessages[index]) {
      updatedMessages[index].feedbackComment = comment;
      updatedMessages[index].isFeedbackOpen = false;
    }
    setMessages(updatedMessages);
    // In a real app, send this to backend
    console.log("Feedback recorded:", comment);
  };

  // --- LIVE AUDIO HANDLERS ---
  const startLiveSession = async () => {
    setIsLiveConnecting(true);
    setLiveError(null);
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext({ sampleRate: 16000 });
        
        // Resume context if suspended (common browser policy)
        if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        const inputAudioContext = new AudioContext({ sampleRate: 16000 });
        const outputAudioContext = new AudioContext({ sampleRate: 24000 }); // Model output is 24kHz

        const inputNode = inputAudioContext.createGain();
        const outputNode = outputAudioContext.createGain();
        
        // Connect Live Session
        const sessionPromise = gemini.connectLive({
            onopen: () => {
                setIsLiveActive(true);
                setIsLiveConnecting(false);
                
                // Stream Audio Input
                const source = inputAudioContext.createMediaStreamSource(stream);
                const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
                scriptProcessor.onaudioprocess = (e) => {
                    const inputData = e.inputBuffer.getChannelData(0);
                    const pcmBlob = gemini.createBlob(inputData);
                    sessionPromise.then((session: any) => {
                        session.sendRealtimeInput({ media: pcmBlob });
                    });
                };
                source.connect(scriptProcessor);
                scriptProcessor.connect(inputAudioContext.destination);
            },
            onmessage: async (message: any) => {
                // Handle Audio Output
                const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                if (base64Audio) {
                    const audioBuffer = await decodeAudioData(
                        gemini.decodeAudioData(base64Audio),
                        outputAudioContext,
                        24000,
                        1
                    );
                    const source = outputAudioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(outputAudioContext.destination);
                    
                    const currentTime = outputAudioContext.currentTime;
                    if (nextStartTimeRef.current < currentTime) {
                        nextStartTimeRef.current = currentTime;
                    }
                    
                    source.start(nextStartTimeRef.current);
                    nextStartTimeRef.current += audioBuffer.duration;
                    
                    sourcesRef.current.add(source);
                    source.onended = () => sourcesRef.current.delete(source);
                }
                
                // Handle Interruptions
                if (message.serverContent?.interrupted) {
                    sourcesRef.current.forEach(s => s.stop());
                    sourcesRef.current.clear();
                    nextStartTimeRef.current = 0;
                }
            },
            onclose: () => {
                setIsLiveActive(false);
                stopLiveSession();
            },
            onerror: (e: any) => {
                console.error(e);
                setIsLiveActive(false);
                stopLiveSession();
            }
        });
        
        sessionRef.current = sessionPromise;

    } catch (e: any) {
        console.error("Failed to start live session:", e);
        setIsLiveConnecting(false);
        if (e.name === 'NotAllowedError' || e.message?.includes('Permission denied')) {
            setLiveError("Microphone access denied. Please enable microphone permissions in your browser settings.");
        } else {
            setLiveError("Failed to connect. Please check your internet connection.");
        }
    }
  };

  const stopLiveSession = async () => {
    if (sessionRef.current) {
        const session = await sessionRef.current;
        session.close();
        sessionRef.current = null;
    }
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsLiveActive(false);
    setIsLiveConnecting(false);
  };

  // --- IMAGE GENERATION HANDLERS ---
  const handleGenerateImage = async (promptToUse?: string) => {
    const prompt = promptToUse || imagePrompt;
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const url = await gemini.generateImage(prompt, imageSize, aspectRatio);
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

  // --- CONCIERGE HANDLERS ---
  const handleGenerateItinerary = async () => {
    setIsLoading(true);
    setGeneratedItinerary(null);
    const result = await gemini.generateItinerary(tripDuration, tripFocus, tripInterests);
    setGeneratedItinerary(result);
    setIsLoading(false);
  };

  const toggleInterest = (interest: string) => {
    setTripInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const containerClasses = isExpanded 
    ? "fixed inset-2 md:inset-6 z-[60] rounded-[2.5rem] shadow-2xl flex flex-col border border-white/10 overflow-hidden no-print animate-in zoom-in-95 duration-300 backdrop-blur-3xl" 
    : "fixed inset-0 md:inset-auto md:bottom-24 md:right-8 z-[60] w-full md:w-[480px] md:h-[750px] md:rounded-[2rem] shadow-2xl flex flex-col border border-white/10 overflow-hidden no-print animate-in slide-in-from-bottom-8 backdrop-blur-xl transition-all duration-300";

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(15,40,71,0.5)] hover:scale-110 transition-transform no-print flex items-center justify-center border border-white/10 group"
          style={{ backgroundColor: BRAND.colors.primary, color: BRAND.colors.secondary }}
        >
          <Bot size={32} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full animate-pulse border-2 border-white"></span>
        </button>
      )}

      {isOpen && (
        <>
          {isExpanded && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] animate-in fade-in"></div>}
          
          <div className={containerClasses} style={{ backgroundColor: BRAND.colors.primary }}>
            {/* Header */}
            <div className="p-5 flex justify-between items-center border-b border-white/5 relative overflow-hidden shrink-0" style={{ backgroundColor: `${BRAND.colors.primary}E6` }}>
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${BRAND.colors.secondary}, ${BRAND.colors.alert}, ${BRAND.colors.accent})` }}></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2.5 rounded-xl border border-white/10" style={{ backgroundColor: `${BRAND.colors.secondary}33` }}>
                  <Bot size={22} style={{ color: BRAND.colors.secondary }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-sm uppercase tracking-widest text-white">SafaArban</p>
                    {/* Persona Toggle */}
                    <button 
                      onClick={() => setPersona(prev => prev === 'professional' ? 'casual' : 'professional')}
                      className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide bg-white/10 hover:bg-white/20 transition-all text-white/80"
                      title="Switch Persona"
                    >
                      {persona === 'professional' ? 'Executive' : 'Friendly'}
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
                    <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">AI Advisor Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button onClick={toggleExpand} className="hover:bg-white/10 p-2 rounded-lg text-white/50 hover:text-white transition-colors hidden md:block">
                  {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button onClick={() => { setIsOpen(false); setIsExpanded(false); stopLiveSession(); }} className="hover:bg-white/10 p-2 rounded-lg text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="flex px-2 pb-2 pt-1 gap-1 border-b border-white/5 shrink-0 overflow-x-auto no-scrollbar" style={{ backgroundColor: `${BRAND.colors.primary}E6` }}>
              {[
                { id: 'chat', label: 'Chat', icon: MessageSquare },
                { id: 'live', label: 'Live', icon: Mic },
                { id: 'visual', label: 'Studio', icon: ImageIcon },
                { id: 'scan', label: 'Scan', icon: Scan },
                { id: 'concierge', label: 'Concierge', icon: MapPin },
                { id: 'history', label: 'History', icon: History }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => {
                      if (mode === 'live' && tab.id !== 'live') stopLiveSession();
                      setMode(tab.id as AssistantMode);
                  }}
                  className={`flex-1 min-w-fit px-3 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    mode === tab.id 
                    ? 'bg-white/10 shadow-inner text-white' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ color: mode === tab.id ? BRAND.colors.secondary : undefined }}
                >
                  <tab.icon size={14} /> {tab.label}
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              {/* CONCIERGE MODE */}
              {mode === 'concierge' && (
                <div className="space-y-6">
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
                            {day.items.map((item, idx) => (
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

              {/* LIVE AUDIO MODE */}
              {mode === 'live' && (
                <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in fade-in">
                    <div className="relative">
                        {/* Pulse Effect */}
                        {isLiveActive && (
                            <>
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping delay-75"></div>
                            </>
                        )}
                        <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${isLiveActive ? 'bg-emerald-500 text-white shadow-[0_0_30px_#10b981]' : 'bg-white/10 text-white/50'}`}>
                            <Mic size={48} />
                        </div>
                    </div>

                    <div className="text-center">
                        <h3 className="text-xl font-black text-white mb-2">{isLiveActive ? 'Listening...' : 'Live Advisor'}</h3>
                        <p className="text-white/50 text-sm max-w-xs">
                            {isLiveActive ? 'Speak naturally. I am listening.' : 'Tap "Start" to begin a real-time voice conversation.'}
                        </p>
                    </div>

                    {liveError && (
                        <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 max-w-xs animate-in slide-in-from-bottom-2">
                            <AlertCircle size={20} className="text-red-500 shrink-0" />
                            <p className="text-xs text-red-200">{liveError}</p>
                        </div>
                    )}

                    <button 
                        onClick={isLiveActive ? stopLiveSession : startLiveSession}
                        disabled={isLiveConnecting}
                        className={`px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all ${
                            isLiveActive 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-white hover:bg-slate-200 text-slate-900'
                        }`}
                    >
                        {isLiveConnecting ? <Loader2 size={18} className="animate-spin" /> : 
                         isLiveActive ? <><StopCircle size={18} /> End Call</> : <><Mic size={18} /> Start Conversation</>}
                    </button>
                </div>
              )}

              {/* CHAT MODE */}
              {mode === 'chat' && (
                <>
                  {/* Chat Strategy Toggle */}
                  <div className="flex bg-black/20 p-1 rounded-xl mb-6">
                     <button 
                       onClick={() => setChatStrategy('thinking')}
                       className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${chatStrategy === 'thinking' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                     >
                        <BrainCircuit size={12} /> Deep Reasoning
                     </button>
                     <button 
                       onClick={() => setChatStrategy('search')}
                       className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${chatStrategy === 'search' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                     >
                        <Globe size={12} /> Live Research
                     </button>
                  </div>

                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}
                    >
                      <div 
                        className={`max-w-[85%] p-5 rounded-2xl ${
                          msg.role === 'user' 
                          ? 'font-bold rounded-tr-none shadow-lg' 
                          : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none'
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
                      
                      {/* Feedback & Sources & TTS */}
                      {msg.role === 'model' && (
                        <div className="mt-1 flex items-center gap-2 w-full max-w-[85%] justify-between">
                           {/* Sources */}
                           {msg.sources && msg.sources.length > 0 ? (
                             <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar max-w-[50%]">
                               {msg.sources.map((source, idx) => (
                                  <a 
                                    key={idx} 
                                    href={source.uri} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="shrink-0 flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[8px] text-white/50 hover:text-white transition-all"
                                  >
                                     {source.type === 'map' ? <MapPin size={8} /> : <ExternalLink size={8} />}
                                     <span className="truncate max-w-[80px]">{source.title || new URL(source.uri).hostname}</span>
                                  </a>
                               ))}
                             </div>
                           ) : <div></div>}

                           {/* Interaction Icons */}
                           <div className="flex items-center gap-2 pr-1">
                              <button
                                onClick={() => handleSpeak(msg.parts[0].text)}
                                className="p-1 rounded hover:bg-white/10 transition-colors text-white/30 hover:text-white"
                                title="Listen"
                              >
                                <Volume2 size={12} />
                              </button>
                              <div className="h-3 w-px bg-white/10"></div>
                              <button 
                                onClick={() => handleFeedback(i, 'up')}
                                className={`p-1 rounded hover:bg-white/10 transition-colors ${msg.feedback === 'up' ? 'text-emerald-400' : 'text-white/30 hover:text-white'}`}
                              >
                                <ThumbsUp size={12} />
                              </button>
                              <button 
                                onClick={() => handleFeedback(i, 'down')}
                                className={`p-1 rounded hover:bg-white/10 transition-colors ${msg.feedback === 'down' ? 'text-red-400' : 'text-white/30 hover:text-white'}`}
                              >
                                <ThumbsDown size={12} />
                              </button>
                           </div>
                        </div>
                      )}

                      {/* Feedback Input */}
                      {msg.isFeedbackOpen && (
                        <div className="mt-2 w-full max-w-[85%] bg-white/5 p-2 rounded-lg border border-white/10 animate-in fade-in">
                           <input 
                             type="text" 
                             className="w-full bg-transparent text-xs text-white placeholder:text-white/30 outline-none"
                             placeholder="How can we improve this answer?"
                             onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                   submitFeedbackComment(i, e.currentTarget.value);
                                }
                             }}
                           />
                           <p className="text-[8px] text-white/30 mt-1 text-right">Press Enter to submit</p>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )} 
              
              {/* HISTORY MODE */}
              {mode === 'history' && (
                <div className="space-y-4">
                   <button 
                     onClick={handleNewChat}
                     className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-all"
                   >
                      <Plus size={16} /> Start New Conversation
                   </button>
                   <div className="space-y-2">
                      <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Recent Sessions</h4>
                      {sessions.length === 0 && <p className="text-white/30 text-xs italic text-center py-4">No history yet.</p>}
                      {sessions.map(session => (
                        <div 
                          key={session.id}
                          className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 cursor-pointer transition-all"
                          onClick={() => handleLoadSession(session)}
                        >
                           <div className="flex-1 min-w-0 pr-3">
                              <p className="text-sm font-bold text-white truncate">{session.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-white/40">{new Date(session.date).toLocaleDateString()}</span>
                                <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/10 text-white/60 uppercase">{session.persona}</span>
                              </div>
                           </div>
                           <button 
                             onClick={(e) => handleDeleteSession(session.id, e)}
                             className="p-2 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                           >
                              <Trash2 size={14} />
                           </button>
                        </div>
                      ))}
                   </div>
                </div>
              )} 
              
              {/* VISUAL MODE */}
              {mode === 'visual' && (
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
              )} 
              
              {/* SCAN MODE */}
              {mode === 'scan' && (
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
              <div className="p-5 border-t border-white/5 shrink-0" style={{ backgroundColor: BRAND.colors.primary }}>
                <div className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={chatStrategy === 'search' ? "Search for latest regulations..." : "Ask about MISA licenses, taxes..."}
                    className="w-full pl-6 pr-14 py-5 border border-white/10 rounded-[2rem] outline-none transition-all text-sm font-medium text-white placeholder:text-white/30 shadow-lg focus:shadow-white/5 focus:border-white/20"
                    style={{ backgroundColor: `${BRAND.colors.primary}80`, borderColor: `${BRAND.colors.secondary}4D` }}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-2 bottom-2 p-3 rounded-[1.5rem] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center aspect-square"
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
