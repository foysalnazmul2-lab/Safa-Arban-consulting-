
import React, { useState } from 'react';
import { Radar, AlertCircle, Shield, Calendar, FileText } from 'lucide-react';
import { BRAND } from '../constants';

const OBLIGATIONS = [
  {
    id: 'vat',
    name: 'ZATCA VAT Filing',
    freq: 'Quarterly',
    desc: 'Submission of VAT returns. Late filing penalty: 5-25% of tax due.',
    risk: 'High',
    icon: <FileText size={18} />
  },
  {
    id: 'wps',
    name: 'WPS Salary Protection',
    freq: 'Monthly',
    desc: 'Upload salary files to Ministry of Labor. Mandatory for all entities.',
    risk: 'Medium',
    icon: <Shield size={18} />
  },
  {
    id: 'gosi',
    name: 'GOSI Contributions',
    freq: 'Monthly',
    desc: 'Social insurance payments for all staff. Must be paid by the 15th.',
    risk: 'Medium',
    icon: <Calendar size={18} />
  },
  {
    id: 'nitaqat',
    name: 'Saudization (Nitaqat)',
    freq: 'Real-time',
    desc: 'Maintaining the required ratio of Saudi nationals to keep "Green" status.',
    risk: 'Critical',
    icon: <Radar size={18} />
  },
  {
    id: 'audit',
    name: 'Annual Audit',
    freq: 'Yearly',
    desc: 'Audited financial statements must be uploaded to MISA & Qawaem.',
    risk: 'High',
    icon: <FileText size={18} />
  }
];

const ComplianceRadar: React.FC = () => {
  const [activeItem, setActiveItem] = useState(OBLIGATIONS[0]);

  return (
    <div className="bg-white py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
         
         <div>
            <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4 flex items-center gap-2" style={{ color: BRAND.colors.alert }}>
               <AlertCircle size={14} /> Risk Management
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ color: BRAND.colors.primary }}>
               Compliance Radar
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
               Business setup is just Day 1. The real challenge is ongoing compliance. Our automated systems track every deadline to ensure your entity remains in "Good Standing".
            </p>
            
            <div className="space-y-4">
               {OBLIGATIONS.map((item) => (
                 <button
                   key={item.id}
                   onClick={() => setActiveItem(item)}
                   className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left group ${
                     activeItem.id === item.id 
                     ? 'text-white shadow-xl' 
                     : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                   }`}
                   style={{ 
                       backgroundColor: activeItem.id === item.id ? BRAND.colors.primary : 'white',
                       borderColor: activeItem.id === item.id ? BRAND.colors.primary : '#e2e8f0'
                   }}
                 >
                    <div className={`p-2 rounded-lg ${activeItem.id === item.id ? 'bg-white/10' : 'bg-slate-100 text-slate-400'}`} style={{ color: activeItem.id === item.id ? BRAND.colors.secondary : undefined }}>
                       {item.icon}
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-sm">{item.name}</h4>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                       activeItem.id === item.id ? 'bg-white/10' : 'bg-slate-100 text-slate-400'
                    }`} style={{ color: activeItem.id === item.id ? BRAND.colors.secondary : undefined }}>
                       {item.freq}
                    </span>
                 </button>
               ))}
            </div>
         </div>

         <div className="relative">
            {/* Radar Visual */}
            <div className="aspect-square rounded-[3rem] p-10 relative overflow-hidden shadow-2xl flex flex-col justify-center items-center text-center" style={{ backgroundColor: BRAND.colors.primary }}>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               
               {/* Scanning Line Animation */}
               <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#006C35]/10 to-transparent animate-spin [animation-duration:4s]"></div>
               </div>

               <div className="relative z-10 animate-in zoom-in duration-300 key={activeItem.id}">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 backdrop-blur-md" style={{ color: BRAND.colors.secondary }}>
                     {activeItem.icon}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2">{activeItem.name}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest mb-6"
                       style={{ backgroundColor: `${BRAND.colors.alert}20`, borderColor: `${BRAND.colors.alert}40`, color: BRAND.colors.alert }}>
                     Risk Level: {activeItem.risk}
                  </div>
                  <p className="text-slate-300 text-sm max-w-xs mx-auto leading-relaxed">
                     {activeItem.desc}
                  </p>
               </div>

               {/* Status Indicators */}
               <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
                  <div className="flex flex-col items-center">
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mb-1"></span>
                     <span className="text-[9px] font-bold text-slate-500 uppercase">System Active</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <span className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: BRAND.colors.secondary }}></span>
                     <span className="text-[9px] font-bold text-slate-500 uppercase">Alerts On</span>
                  </div>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default ComplianceRadar;
