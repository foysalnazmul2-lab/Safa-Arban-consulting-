import React, { useState, useEffect } from 'react';
import { Globe, CheckCircle2, Zap, X } from 'lucide-react';
import { BRAND } from '../constants';

const MESSAGES = [
  { type: 'approval', text: "New MISA License Issued for Fintech Client", country: "🇸🇦" },
  { type: 'view', text: "High Demand: 50+ Investors viewing RHQ Setup", country: "🌍" },
  { type: 'sale', text: "Tech startup in Dubai initiated Fast-Track Setup", country: "🇦🇪" },
  { type: 'approval', text: "Alpha Global LLC received Commercial Registration", country: "🇬🇧" },
  { type: 'sale', text: "Investor in London purchased 'Industrial License'", country: "🇬🇧" },
  { type: 'view', text: "Regional HQ Slots filling fast for Q3", country: "🇺🇸" }
];

const LiveNotifications: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const currentMsg = MESSAGES[currentIndex];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] animate-in slide-in-from-bottom-full duration-500 no-print">
      <div className="bg-[#0A1A2F]/95 backdrop-blur-md border-t border-white/10 py-2 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           
           <div className="flex items-center gap-4 overflow-hidden">
              <div className="flex items-center gap-2 shrink-0">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">Live Activity</span>
              </div>
              
              <div className="h-4 w-px bg-white/10 hidden sm:block"></div>

              <div key={currentIndex} className="flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300">
                 <span className="text-lg">{currentMsg.country}</span>
                 <div className="flex items-center gap-2">
                    {currentMsg.type === 'sale' ? <Zap size={12} className="text-[#FFD700]" /> : 
                     currentMsg.type === 'approval' ? <CheckCircle2 size={12} className="text-[#4ade80]" /> : 
                     <Globe size={12} className="text-[#60a5fa]" />}
                    <span className="text-xs font-bold text-white truncate max-w-[250px] sm:max-w-none">{currentMsg.text}</span>
                 </div>
              </div>
           </div>

           <button 
             onClick={() => setIsVisible(false)}
             className="text-white/40 hover:text-white transition-colors p-1"
           >
             <X size={14} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default LiveNotifications;