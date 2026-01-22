
import React from 'react';
import { ShieldCheck, Lock, Eye, Database, Globe } from 'lucide-react';
import { BRAND } from '../constants';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Header */}
      <div className="text-white pt-32 pb-40 relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.accent }}></div>
         <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
               <ShieldCheck size={14} style={{ color: BRAND.colors.accent }} />
               <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Compliance Protocol</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Privacy & Data Security</h1>
            <p className="text-white/60 text-lg font-medium">Fully compliant with the Saudi Personal Data Protection Law (PDPL) and SDAIA regulations.</p>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-20 pb-24">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-12 border-b border-slate-100 pb-8 flex justify-between items-center">
               <span>Effective: March 2025</span>
               <span>Ver. 2.4</span>
            </p>
            
            <div className="space-y-12 text-slate-600 leading-relaxed font-medium">
                <section>
                    <div className="flex items-center gap-3 mb-4" style={{ color: BRAND.colors.primary }}>
                       <Globe size={24} style={{ color: BRAND.colors.secondary }} />
                       <h2 className="text-xl font-black">1. Introduction</h2>
                    </div>
                    <p>SafaArban Ltd ("We", "Our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or engage our consultancy services, in full compliance with the Saudi Data & AI Authority (SDAIA) regulations and the Personal Data Protection Law (PDPL).</p>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4" style={{ color: BRAND.colors.primary }}>
                       <Database size={24} style={{ color: BRAND.colors.secondary }} />
                       <h2 className="text-xl font-black">2. Data We Collect</h2>
                    </div>
                    <p className="mb-4">We may collect, use, store and transfer different kinds of personal and corporate data about you which we have grouped together as follows:</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                       <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-slate-100">
                          <strong className="block mb-2 text-sm" style={{ color: BRAND.colors.primary }}>Identity Data</strong>
                          <p className="text-sm">First name, last name, passport number, national ID/Iqama, and date of birth.</p>
                       </div>
                       <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-slate-100">
                          <strong className="block mb-2 text-sm" style={{ color: BRAND.colors.primary }}>Corporate Data</strong>
                          <p className="text-sm">Commercial Registration (CR) number, Articles of Association (AoA), Financial Statements.</p>
                       </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4" style={{ color: BRAND.colors.primary }}>
                       <Eye size={24} style={{ color: BRAND.colors.secondary }} />
                       <h2 className="text-xl font-black">3. How We Use Your Data</h2>
                    </div>
                    <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                    <ul className="space-y-3 pl-4 border-l-2" style={{ borderColor: BRAND.colors.accent }}>
                        <li>To register your entity with the Ministry of Investment (MISA) and Ministry of Commerce (MC).</li>
                        <li>To process government fee payments via SADAD on your behalf.</li>
                        <li>To comply with legal or regulatory obligations, including ZATCA tax filing and KYC compliance for banking partners.</li>
                        <li>To verify identity through the Absher and Nafath unified access portals.</li>
                    </ul>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4" style={{ color: BRAND.colors.primary }}>
                       <Lock size={24} style={{ color: BRAND.colors.secondary }} />
                       <h2 className="text-xl font-black">4. Data Security</h2>
                    </div>
                    <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.</p>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4" style={{ color: BRAND.colors.primary }}>5. Third-Party Disclosure</h2>
                    <p>We do not sell your data. We may share your data with Saudi government entities (MISA, MC, ZATCA, Qiwa) strictly for the purpose of executing the services you have requested. We also share limited data with banking partners solely for account opening purposes upon your authorization.</p>
                </section>

                <section>
                    <h2 className="text-xl font-black mb-4" style={{ color: BRAND.colors.primary }}>6. Contact Us</h2>
                    <p>If you have any questions about this privacy policy, please contact our Data Protection Officer at <a href="mailto:info@safaarban.com" className="underline font-bold" style={{ color: BRAND.colors.secondary }}>info@safaarban.com</a>.</p>
                </section>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
