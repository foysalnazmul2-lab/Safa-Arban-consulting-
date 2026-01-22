
import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, FileText, Loader2, AlertCircle } from 'lucide-react';
import { BRAND } from '../constants';

interface TrackApplicationProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrackApplication: React.FC<TrackApplicationProps> = ({ isOpen, onClose }) => {
  const [refInput, setRefInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // Demo Data Generator
  const [result, setResult] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput.trim()) return;

    setStatus('loading');
    
    // Simulate API Call
    setTimeout(() => {
      setStatus('success');
      setResult({
        ref: refInput.toUpperCase(),
        entity: "TechFlow Solutions LLC",
        service: "MISA Investment License",
        date: "March 10, 2026",
        progress: 65,
        steps: [
          { label: "Application Received", date: "Mar 10, 09:00 AM", status: "completed" },
          { label: "Document Verification", date: "Mar 10, 02:30 PM", status: "completed" },
          { label: "Ministry Payment", date: "Mar 11, 10:15 AM", status: "completed" },
          { label: "Final Approval (MISA)", date: "Pending", status: "current" },
          { label: "License Issuance", date: "Est. Mar 12", status: "upcoming" }
        ]
      });
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300" style={{ backgroundColor: `${BRAND.colors.primary}E6` }}>
      <div className="bg-white w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X size={20} className="text-slate-500" />
        </button>

        <div className="p-8 text-white text-center relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
           <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${BRAND.colors.secondary}, ${BRAND.colors.alert}, ${BRAND.colors.accent})` }}></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <h3 className="text-2xl font-black mb-1 relative z-10">Track Application</h3>
           <p className="text-xs text-white/60 font-medium uppercase tracking-widest relative z-10">Client Portal Access</p>
        </div>

        <div className="p-8">
           {status === 'idle' || status === 'loading' ? (
             <form onSubmit={handleTrack} className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reference Number</label>
                   <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={refInput}
                        onChange={(e) => setRefInput(e.target.value)}
                        placeholder="e.g. SA-2026-8821"
                        className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-sm font-bold text-[#0A1A2F] outline-none focus:ring-4 transition-all uppercase placeholder:normal-case"
                        style={{ '--tw-ring-color': `${BRAND.colors.secondary}1A`, borderColor: status === 'loading' ? BRAND.colors.secondary : '#e2e8f0' } as React.CSSProperties}
                      />
                   </div>
                </div>
                <button 
                  disabled={status === 'loading'}
                  className="w-full text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 hover:opacity-90"
                  style={{ backgroundColor: BRAND.colors.accent }}
                >
                  {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <><Search size={16} /> Check Status</>}
                </button>
             </form>
           ) : (
             <div className="animate-in slide-in-from-bottom-4">
                <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-6">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Entity Name</p>
                      <h4 className="font-bold text-[#0A1A2F] text-lg">{result.entity}</h4>
                      <p className="text-xs text-slate-500 mt-1">{result.service}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Ref ID</p>
                      <span className="bg-slate-100 px-3 py-1 rounded text-xs font-mono font-bold text-[#0A1A2F]">{result.ref}</span>
                   </div>
                </div>

                <div className="space-y-6 relative">
                   {/* Vertical Line */}
                   <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-slate-100"></div>

                   {result.steps.map((step: any, idx: number) => (
                     <div key={idx} className="flex gap-4 relative z-10">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4"
                          style={{
                            backgroundColor: step.status === 'completed' ? BRAND.colors.accent : step.status === 'current' ? 'white' : '#F8F9FA',
                            borderColor: step.status === 'completed' ? BRAND.colors.accent : step.status === 'current' ? BRAND.colors.secondary : '#F1F5F9',
                            color: step.status === 'completed' ? 'white' : step.status === 'current' ? BRAND.colors.secondary : '#CBD5E1'
                          }}
                        >
                           {step.status === 'completed' ? <CheckCircle2 size={16} /> : 
                            step.status === 'current' ? <Loader2 size={16} className="animate-spin" /> : 
                            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                        </div>
                        <div className="pt-2">
                           <p className={`text-sm font-bold ${step.status === 'upcoming' ? 'text-slate-400' : 'text-[#0A1A2F]'}`}>
                             {step.label}
                           </p>
                           <p className="text-[10px] text-slate-400 font-medium mt-0.5">{step.date}</p>
                        </div>
                     </div>
                   ))}
                </div>

                <button 
                  onClick={() => { setStatus('idle'); setRefInput(''); }}
                  className="w-full mt-8 bg-slate-100 text-slate-500 py-3 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  Check Another
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default TrackApplication;
