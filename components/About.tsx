
import React, { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, Download } from 'lucide-react';

const FAQS = [
  {
    question: "Do I need a local Saudi partner to start a business?",
    answer: "No. Under the modern Ministry of Investment (MISA) regulations, foreign investors can own 100% of their company in most sectors, including trading, consulting, and IT, without a local sponsor (Kafeel)."
  },
  {
    question: "How long does the MISA licensing process take?",
    answer: "The MISA investment license itself is typically issued within 24-48 hours after submitting the complete application. However, the full operational setup (Commercial Registration, Tax Files, Bank Account) generally takes 2-4 weeks depending on the entity type."
  },
  {
    question: "What is the minimum capital requirement?",
    answer: "For most Service and Commercial licenses, there is no mandatory deposited capital requirement to start. However, MISA generally expects a financial commitment of at least 20,000 - 50,000 SAR for small entities to demonstrate financial viability."
  },
  {
    question: "Can SafaArban help with corporate bank account opening?",
    answer: "Yes. We have strategic partnerships with tier-1 Saudi banks (SNB, AlRajhi, ANB). We prepare your KYC file, UBO declarations, and schedule the sign-off meeting, significantly reducing the rejection risk."
  },
  {
    question: "What is Saudization (Nitaqat) and how does it affect me?",
    answer: "Saudization is the national policy requiring companies to hire a certain percentage of Saudi nationals. New foreign entities often get a 'grace period' of 12 months before strict quotas apply. We help you plan your hiring strategy to stay in the 'Green' zone."
  },
  {
    question: "Do I need a physical office?",
    answer: "Yes. To issue a Commercial Registration (CR) and open a bank account, you must have a registered National Address. This typically requires a physical office lease or a serviced office agreement. Virtual offices are restricted for certain license types."
  }
];

const About: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="relative bg-[#0A1A2F] text-white py-24 md:py-32 overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1596627689102-b2f7a012d98b?q=80&w=2000')] bg-cover bg-center"></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">Architects of Change.</h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">SafaArban is more than a consulting firm; we are the premium bridge between global vision and Saudi reality.</p>
         </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
         <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6">
               <span className="text-[#C9A86A] font-black uppercase tracking-[0.3em] text-[10px] block mb-4">Our DNA</span>
               <h2 className="text-3xl md:text-4xl font-black text-[#0A1A2F] mb-6 tracking-tight">Catalyzing Vision 2030</h2>
               <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                  Founded in the heart of Riyadh, SafaArban was established to eliminate the procedural friction international firms face when entering the Kingdom. We combine deep local PRO expertise with international business standards.
               </p>
               <div className="flex items-center gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-xl border border-slate-50">
                  <CheckCircle className="text-[#006C35]" />
                  <p className="text-xs md:text-sm font-black uppercase tracking-widest text-[#0A1A2F]">Regulated & Certified for Premium Advisory</p>
               </div>
               
               <div className="pt-2">
                 <a href="/placeholder-brochure.pdf" target="_blank" className="inline-flex items-center gap-3 bg-[#E9443E] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#0A1A2F] transition-all group">
                    <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
                    Download Our Brochure
                 </a>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600" className="rounded-2xl md:rounded-3xl shadow-lg mt-8" alt="Strategy Session" />
               <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600" className="rounded-2xl md:rounded-3xl shadow-lg" alt="Corporate Hub" />
            </div>
         </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 md:py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-[#C9A86A] font-black uppercase tracking-[0.3em] text-[10px] block mb-4">Common Queries</span>
                <h2 className="text-3xl md:text-5xl font-black text-[#0A1A2F] tracking-tight mb-6">Frequently Asked Questions</h2>
                <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">Everything you need to know about navigating the Saudi market landscape.</p>
            </div>

            <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-3xl overflow-hidden transition-all duration-300 hover:border-[#C9A86A]/30 bg-slate-50 group">
                        <button 
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none bg-white hover:bg-slate-50/50 transition-colors"
                        >
                            <span className="text-base md:text-lg font-bold text-[#0A1A2F] pr-8 group-hover:text-[#C9A86A] transition-colors">{faq.question}</span>
                            {openIndex === idx ? <ChevronUp className="text-[#C9A86A] shrink-0" /> : <ChevronDown className="text-slate-400 shrink-0 group-hover:text-[#C9A86A] transition-colors" />}
                        </button>
                        <div 
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-6 md:p-8 pt-0 text-slate-600 leading-relaxed font-medium bg-white text-sm md:text-base border-t border-slate-50">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
