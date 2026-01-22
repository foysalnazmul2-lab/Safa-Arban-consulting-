import React, { useState, useEffect } from 'react';
import { Globe, Building2, CheckCircle2, Zap, User } from 'lucide-react';
import { BRAND } from '../constants';

const MESSAGES = [
  { type: 'approval', text: "New MISA License Issued for Fintech Client", country: "🇸🇦" },
  { type: 'view', text: "Investor Activity Detected: 50+ Live Views", country: "🌍" },
  { type: 'sale', text: "Tech startup in Dubai initiated Setup", country: "🇦🇪" },
  { type: 'approval', text: "Alpha Global LLC received Commercial Registration", country: "🇬🇧" },
  { type: 'sale', text: "Investor in London purchased 'Fast-Track Setup'", country: "🇬🇧" },
  { type: 'view', text: "High demand: RHQ Setup slots filling fast", country: "🇺🇸" }
];

const LiveNotifications: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(MESSAGES[0]);

  useEffect(() => {
    // Show notification every 12-25 seconds randomly
    const loop = () => {
      const delay = Math.random() * 13000 + 12000;
      setTimeout(() => {
        const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        setMessage(randomMsg);
        setVisible(true);
        
        // Hide after 6 seconds
        setTimeout(() => setVisible(false), 6000);
        
        loop();
      }, delay);
    };

    // Initial delay
    const initialTimer = setTimeout(() => setVisible(true), 4000);
    const initialHideTimer = setTimeout(() => setVisible(false), 10000);
    
    // Start loop
    const loopTimer = setTimeout(loop, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(initialHideTimer);
      clearTimeout(loopTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-6 z-[90] animate-in slide-in-from-left-10 fade-in duration-500 no-print">
      <div className="backdrop-blur-xl border p-4 rounded-2xl shadow-2xl shadow-black/20 max-w-[320px] flex items-center gap-4 border-l-4" 
           style={{ 
             backgroundColor: `${BRAND.colors.primary}F2`, // High opacity navy
             borderColor: BRAND.colors.secondary,
             borderLeftColor: message.type === 'approval' ? BRAND.colors.accent : message.type === 'sale' ? BRAND.colors.secondary : BRAND.colors.alert
           }}>
        
        <div className="relative">
           <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg" 
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              {message.type === 'sale' ? <Zap size={18} className="text-[#FFD700]" /> : 
               message.type === 'approval' ? <CheckCircle2 size={18} className="text-[#4ade80]" /> : 
               <Globe size={18} className="text-[#60a5fa]" />}
           </div>
           <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: BRAND.colors.secondary }}></span>
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: BRAND.colors.secondary }}></span>
           </span>
        </div>

        <div>
           <p className="text-[9px] font-black uppercase tracking-widest mb-0.5 flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
             {message.country} {message.type === 'view' ? 'Live Alert' : 'Recent Activity'}
           </p>
           <p className="text-xs text-white font-bold leading-tight drop-shadow-sm">
             {message.text}
           </p>
           <p className="text-[8px] text-slate-400 mt-1.5 font-medium flex items-center gap-1">
             <ClockIcon /> Just now
           </p>
        </div>
      </div>
    </div>
  );
};

const ClockIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default LiveNotifications;