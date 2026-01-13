
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100">
            <div className="flex items-center gap-4 mb-8 text-[#006C35]">
                <ShieldCheck size={40} />
                <span className="text-xs font-black uppercase tracking-[0.3em]">Data Protection Protocol</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-[#0A1A2F] mb-6 tracking-tight">Privacy Policy</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-12 border-b border-slate-100 pb-8">Last Updated: March 2025 • Compliant with KSA Data Regulations</p>
            
            <div className="space-y-12 text-slate-600 leading-relaxed font-medium">
                <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">1. Introduction</h2>
                    <p>SafaArban Ltd ("We", "Our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or engage our consultancy services, in full compliance with the Saudi Data & AI Authority (SDAIA) regulations and the Personal Data Protection Law (PDPL).</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">2. Data We Collect</h2>
                    <p className="mb-4">We may collect, use, store and transfer different kinds of personal and corporate data about you which we have grouped together as follows:</p>
                    <ul className="space-y-3 pl-4 border-l-2 border-[#C9A86A]">
                        <li><strong className="text-[#0A1A2F]">Identity Data:</strong> First name, last name, passport number, national ID/Iqama, and date of birth.</li>
                        <li><strong className="text-[#0A1A2F]">Corporate Data:</strong> Commercial Registration (CR) number, Articles of Association (AoA), Financial Statements, and UBO declarations.</li>
                        <li><strong className="text-[#0A1A2F]">Contact Data:</strong> Billing address, National Address (Wasel), email address and telephone numbers.</li>
                        <li><strong className="text-[#0A1A2F]">Transaction Data:</strong> Details about payments to and from you and other details of services you have purchased from us.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">3. How We Use Your Data</h2>
                    <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                    <ul className="space-y-3 pl-4 border-l-2 border-[#006C35]">
                        <li>To register your entity with the Ministry of Investment (MISA) and Ministry of Commerce (MC).</li>
                        <li>To process government fee payments via SADAD on your behalf.</li>
                        <li>To comply with legal or regulatory obligations, including ZATCA tax filing and KYC compliance for banking partners.</li>
                        <li>To verify identity through the Absher and Nafath unified access portals.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">4. Data Security</h2>
                    <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">5. Third-Party Disclosure</h2>
                    <p>We do not sell your data. We may share your data with Saudi government entities (MISA, MC, ZATCA, Qiwa) strictly for the purpose of executing the services you have requested. We also share limited data with banking partners solely for account opening purposes upon your authorization.</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">6. Contact Us</h2>
                    <p>If you have any questions about this privacy policy, please contact our Data Protection Officer at <a href="mailto:info@safaarban.com" className="text-[#C9A86A] underline">info@safaarban.com</a>.</p>
                </section>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
