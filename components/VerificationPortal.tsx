
import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, FileText, Loader2, XCircle } from 'lucide-react';
import { BRAND } from '../constants';

const VerificationPortal: React.FC = () => {
  const [refId, setRefId] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refId.trim()) return;
    setStatus('loading');
    
    // Simulate API check
    setTimeout(() => {
      if (refId.length > 5) setStatus('valid');
      else setStatus('invalid');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-6">
         <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-8 text-center relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
               <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20" style={{ backgroundColor: BRAND.colors.accent }}></div>
               <ShieldCheck size={48} className="mx-auto mb-4 relative z-10" style={{ color: BRAND.colors.secondary }} />
               <h2 className="text-3xl font-black text-white relative z-10">Document Verification</h2>
               <p className="text-slate-400 text-sm mt-2 relative z-10">Authenticity Check for SafaArban Issued Certificates</p>
            </div>

            <div className="p-8 md:p-12">
               {status === 'idle' || status === 'loading' ? (
                 <form onSubmit={handleVerify} className="space-y-6">
                    <div className="relative">
                       <input 
                         type="text" 
                         placeholder="Enter Document Reference ID (e.g. SA-DOC-2026-X)" 
                         value={refId}
                         onChange={(e) => setRefId(e.target.value)}
                         className="w-full pl-6 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 font-mono font-bold uppercase placeholder:normal-case"
                         style={{ 
                             color: BRAND.colors.primary,
                             '--tw-ring-color': `${BRAND.colors.primary}33` 
                         } as React.CSSProperties}
                       />
                    </div>
                    <button 
                      disabled={status === 'loading'}
                      className="w-full text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{ 
                          backgroundColor: BRAND.colors.primary,
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.secondary; e.currentTarget.style.color = BRAND.colors.primary; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.primary; e.currentTarget.style.color = 'white'; }}
                    >
                      {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <><Search size={18} /> Verify Authenticity</>}
                    </button>
                 </form>
               ) : status === 'valid' ? (
                 <div className="text-center animate-in zoom-in-95">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6" style={{ color: BRAND.colors.accent }}>
                       <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black mb-2" style={{ color: BRAND.colors.primary }}>Valid Document</h3>
                    <p className="text-slate-500 mb-6">This document was officially issued by SafaArban Ltd.</p>
                    
                    <div className="bg-slate-50 p-6 rounded-2xl text-left space-y-3 mb-8 border border-slate-100">
                       <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase">Doc Type</span>
                          <span className="text-sm font-bold" style={{ color: BRAND.colors.primary }}>Commercial Proposal</span>
                       </div>
                       <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase">Issue Date</span>
                          <span className="text-sm font-bold" style={{ color: BRAND.colors.primary }}>{new Date().toLocaleDateString()}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                          <span className="text-sm font-black uppercase" style={{ color: BRAND.colors.accent }}>Active</span>
                       </div>
                    </div>

                    <button onClick={() => {setStatus('idle'); setRefId('');}} className="text-xs font-black uppercase tracking-widest hover:underline" style={{ color: BRAND.colors.primary }}>Check Another</button>
                 </div>
               ) : (
                 <div className="text-center animate-in zoom-in-95">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6" style={{ color: BRAND.colors.alert }}>
                       <XCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-black mb-2" style={{ color: BRAND.colors.primary }}>Record Not Found</h3>
                    <p className="text-slate-500 mb-8">The reference ID provided does not match our records.</p>
                    <button onClick={() => {setStatus('idle'); setRefId('');}} className="text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest" style={{ backgroundColor: BRAND.colors.primary }}>Try Again</button>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default VerificationPortal;
