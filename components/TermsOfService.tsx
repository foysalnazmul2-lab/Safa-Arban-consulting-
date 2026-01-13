
import React from 'react';
import { FileText } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100">
            <div className="flex items-center gap-4 mb-8 text-[#E9443E]">
                <FileText size={40} />
                <span className="text-xs font-black uppercase tracking-[0.3em]">Service Agreement</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-[#0A1A2F] mb-6 tracking-tight">Terms of Service</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-12 border-b border-slate-100 pb-8">Effective Date: January 1, 2025</p>
            
            <div className="space-y-12 text-slate-600 leading-relaxed font-medium">
                <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">1. Agreement to Terms</h2>
                    <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and SafaArban Ltd (“we”, “us”, or “our”), concerning your access to and use of the safaarban.com website and our professional business setup and advisory services.</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">2. Nature of Services</h2>
                    <p>SafaArban provides business consultancy, government relations (PRO), and corporate setup services in the Kingdom of Saudi Arabia. While we leverage our expertise to ensure successful outcomes, you acknowledge that the final issuance of licenses, visas, and permits is subject to the sole discretion of Saudi government authorities (including MISA, Jawazat, and Ministry of Commerce). We cannot guarantee approval if the client fails to meet statutory requirements or security clearance.</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">3. Fees and Payments</h2>
                    <ul className="space-y-3 pl-4 border-l-2 border-[#C9A86A]">
                        <li><strong className="text-[#0A1A2F]">Professional Fees:</strong> These are fees paid to SafaArban for our consultancy, drafting, and PRO services. They are subject to 15% Value Added Tax (VAT) as per Saudi law.</li>
                        <li><strong className="text-[#0A1A2F]">Government Fees:</strong> These are pass-through costs payable to government bodies. SafaArban provides estimates based on current regulations, but these are subject to change by the authorities. We do not profit from government fees.</li>
                        <li><strong className="text-[#0A1A2F]">Refund Policy:</strong> Professional fees are non-refundable once the service application process has been initiated on any government portal. Government fees paid by us on your behalf are non-refundable if the application is rejected due to client ineligibility.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">4. Client Obligations</h2>
                    <p>You agree to provide accurate, current, and complete information and documentation as requested by our consultants. Any delay in providing documents may result in delays to your service timeline. You are responsible for the authenticity of all documents provided.</p>
                </section>

                 <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">5. Limitation of Liability</h2>
                    <p>In no event will we be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site or our services, nor for delays caused by government system outages or policy changes.</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-[#0A1A2F] mb-4">6. Governing Law</h2>
                    <p>These Terms shall be governed by and defined following the laws of the Kingdom of Saudi Arabia. SafaArban Ltd and yourself irrevocably consent that the courts of Riyadh shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
                </section>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
