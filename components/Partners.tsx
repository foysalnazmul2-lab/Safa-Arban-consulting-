
import React from 'react';
import { Building2, Landmark, Globe, FileText, Briefcase, ShieldCheck } from 'lucide-react';
import { BRAND } from '../constants';
import { SafaArbanLogo } from './Logo';

// Nodes positioned in a circle (Percentages for X/Y)
const NODES = [
  { id: 1, name: 'MISA', title: 'Investment Licensing', desc: '100% Foreign Ownership license directly through MISA.', icon: <Landmark size={20} />, x: 50, y: 15 }, // Top
  { id: 2, name: 'ZATCA', title: 'Tax & Compliance', desc: 'VAT, Zakat, and Corporate Tax registration.', icon: <FileText size={20} />, x: 85, y: 35 }, // Top Right
  { id: 3, name: 'Qiwa', title: 'Visas & Employment', desc: 'Seamless setup of Level 1 GM Visa and quotas.', icon: <Globe size={20} />, x: 85, y: 65 }, // Bottom Right
  { id: 4, name: 'Banks', title: 'Corporate Banking', desc: 'Tier-1 bank account opening (SNB, AlRajhi).', icon: <Building2 size={20} />, x: 50, y: 85 }, // Bottom
  { id: 5, name: 'MoC', title: 'Commercial Reg (CR)', desc: 'Instant issuance of corporate identity.', icon: <Briefcase size={20} />, x: 15, y: 65 }, // Bottom Left
  { id: 6, name: 'GOSI', title: 'Social Insurance', desc: 'Social security registration for staff.', icon: <ShieldCheck size={20} />, x: 15, y: 35 }, // Top Left
];

const Partners: React.FC = () => {
  return (
    <div className="bg-slate-50 py-24 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
         
         <div className="text-center mb-20 relative z-10">
            <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4 text-[#0D2B4F]">The Ecosystem</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: BRAND.colors.primary }}>
               Integrated Network
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
               We synchronize your business across the Kingdom’s entire regulatory framework through our central operations hub.
            </p>
         </div>

         {/* HUB AND SPOKE VISUALIZATION */}
         <div className="relative w-full max-w-5xl mx-auto h-[600px] md:h-[700px] bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(13,43,79,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(13,43,79,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {/* Radial Gradient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,78,78,0.08)_0%,transparent_70%)] animate-pulse-slow"></div>

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
               <defs>
                  <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor={BRAND.colors.secondary} stopOpacity="0" />
                     <stop offset="50%" stopColor={BRAND.colors.secondary} stopOpacity="1" />
                     <stop offset="100%" stopColor={BRAND.colors.secondary} stopOpacity="0" />
                  </linearGradient>
               </defs>
               {NODES.map((node) => (
                  <g key={node.id}>
                    {/* Static Line */}
                    <line 
                        x1="50%" y1="50%" 
                        x2={`${node.x}%`} y2={`${node.y}%`} 
                        stroke={BRAND.colors.primary} 
                        strokeWidth="1" 
                        strokeOpacity="0.1" 
                        strokeDasharray="4,4"
                    />
                    {/* Animated Pulse Line */}
                    <line 
                        x1="50%" y1="50%" 
                        x2={`${node.x}%`} y2={`${node.y}%`} 
                        stroke={`url(#pulseGradient)`} 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        className="animate-flow"
                        style={{
                            animationDelay: `${node.id * 0.3}s`
                        }}
                    />
                  </g>
               ))}
            </svg>

            {/* Central Hub (SafaArban) */}
            <div className="relative z-20 w-36 h-36 md:w-44 md:h-44 bg-white rounded-full shadow-[0_0_60px_-15px_rgba(13,43,79,0.3)] flex flex-col items-center justify-center border-4 border-slate-50 z-30">
               <div className="absolute inset-0 rounded-full animate-ping opacity-10 bg-slate-400"></div>
               <div className="scale-90 mb-2 relative z-10">
                  <SafaArbanLogo className="h-10 md:h-12 w-auto" />
               </div>
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 relative z-10 bg-white px-2">Central Operations</span>
               {/* Orbiting Ring */}
               <div className="absolute inset-0 border border-slate-200 rounded-full animate-spin-slow" style={{ width: '130%', height: '130%', left: '-15%', top: '-15%' }}>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-slate-300 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
               </div>
               <div className="absolute inset-0 border border-slate-100 rounded-full animate-spin-reverse-slow" style={{ width: '160%', height: '160%', left: '-30%', top: '-30%' }}>
                  <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-slate-200 rounded-full -translate-x-1/2 translate-y-1/2"></div>
               </div>
            </div>

            {/* Peripheral Nodes */}
            {NODES.map((node) => (
               <div 
                 key={node.id}
                 className="absolute z-20 flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all hover:scale-110 w-48 text-center"
                 style={{ left: `${node.x}%`, top: `${node.y}%` }}
               >
                  <div className="relative mb-3">
                      {/* Node Circle */}
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-[#0D2B4F] group-hover:text-white group-hover:bg-[#0D2B4F] transition-all duration-300 relative overflow-hidden z-10">
                         <div className="absolute inset-0 bg-[#E94E4E] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                         <div className="relative z-10">
                            {node.icon}
                         </div>
                      </div>
                      {/* Pulse effect behind node */}
                      <div className="absolute inset-0 bg-slate-200 rounded-2xl animate-ping opacity-0 group-hover:opacity-30 z-0"></div>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all transform group-hover:-translate-y-1">
                     <h4 className="font-black text-xs text-[#0D2B4F] uppercase tracking-wide mb-1 flex items-center justify-center gap-1">
                        {node.name}
                     </h4>
                     <p className="text-[10px] font-bold text-slate-500">{node.title}</p>
                  </div>
               </div>
            ))}

         </div>
      </div>
      <style>{`
        @keyframes flow {
          0% { stroke-dashoffset: 100; stroke-opacity: 0; }
          50% { stroke-opacity: 1; }
          100% { stroke-dashoffset: -100; stroke-opacity: 0; }
        }
        .animate-flow {
          stroke-dasharray: 20, 200;
          animation: flow 3s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin 25s linear infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default Partners;
