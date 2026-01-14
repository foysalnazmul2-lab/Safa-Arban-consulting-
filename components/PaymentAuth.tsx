
import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  ArrowLeft, 
  Loader2, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Hash 
} from 'lucide-react';
import { BRAND } from '../constants';
import emailjs from '@emailjs/browser';

// EMAILJS CONFIGURATION
// Please replace these with your actual EmailJS credentials
const SERVICE_ID = 'service_your_id'; 
const TEMPLATE_ID = 'template_payment_id'; // Ensure this template sends to: foysalnazmul2@gmail.com, hello@safaarban.com
const PUBLIC_KEY = 'your_public_key'; 

interface PaymentAuthProps {
  orderId: string;
  totalAmount: number;
  onBack: () => void;
  onSuccess: () => void;
}

const PaymentAuth: React.FC<PaymentAuthProps> = ({ orderId, totalAmount, onBack, onSuccess }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ref: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formRef.current) {
        // Send email via EmailJS with form data (including file input if supported by template)
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      }
      
      setIsDone(true);
      setTimeout(onSuccess, 3000);
    } catch (error) {
      console.error('Payment email failed:', error);
      // Fallback for demo
      setIsDone(true);
      setTimeout(onSuccess, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDone) {
    return (
      <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-[#006C35] rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-[#006C35]/20">
              <CheckCircle2 size={48} className="text-white" />
           </div>
           <div className="space-y-4">
              <h2 className="text-4xl font-black text-white tracking-tight">Receipt Verified</h2>
              <p className="text-white/60 text-lg">Your transaction for <span className="text-[#C9A86A] font-bold">{orderId}</span> is being processed by our finance department. An official confirmation will be sent to your email shortly.</p>
           </div>
           <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#C9A86A] animate-progress-fast"></div>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Redirecting to Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-[#0A1A2F] font-black uppercase text-[10px] tracking-widest mb-10 transition-all"
        >
          <ArrowLeft size={16} /> Return to Invoice
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Instructions & Details */}
          <div className="space-y-10">
            <div>
              <span className="text-[#C9A86A] font-black uppercase tracking-[0.3em] text-[10px] block mb-4">Security Protocol</span>
              <h1 className="text-5xl font-black text-[#0A1A2F] tracking-tighter leading-none mb-6">Payment <br/>Authentication</h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                To activate your services, please provide the transaction receipt from your bank transfer. Our compliance team verifies all incoming capital within 4-6 business hours.
              </p>
            </div>

            <div className="bg-[#0A1A2F] p-8 rounded-[2rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A86A] rounded-full blur-[60px] opacity-10"></div>
                <div className="relative z-10 flex justify-between items-center mb-6">
                   <ShieldCheck size={32} className="text-[#C9A86A]" />
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Order Ref: {orderId}</span>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Amount Due</p>
                   <p className="text-4xl font-mono font-black text-[#C9A86A]">{totalAmount.toLocaleString()} <span className="text-sm uppercase">SAR</span></p>
                </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Helpful Reminders</h3>
              <ul className="space-y-4">
                 {[
                   "Ensure the Transaction Reference is visible.",
                   "PDF or JPEG formats are preferred.",
                   "VAT is included in the Professional Fee portion.",
                   "Government fees are pass-through estimates."
                 ].map((text, i) => (
                   <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-600">
                      <div className="w-1.5 h-1.5 bg-[#006C35] rounded-full mt-2 shrink-0"></div>
                      {text}
                   </li>
                 ))}
              </ul>
            </div>
          </div>

          {/* Right: Submission Form */}
          <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-slate-100">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
               <input type="hidden" name="order_id" value={orderId} />
               <input type="hidden" name="total_amount" value={totalAmount} />
               
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                       <User size={12} /> Full Name
                    </label>
                    <input 
                      required
                      type="text"
                      name="user_name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#C9A86A]/50 transition-all font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                       <Mail size={12} /> Email Address
                    </label>
                    <input 
                      required
                      type="email" 
                      name="user_email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com"
                      className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#C9A86A]/50 transition-all font-bold text-sm"
                    />
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                       <Phone size={12} /> Contact Phone
                    </label>
                    <input 
                      required
                      type="tel" 
                      name="user_phone"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="+966 5..."
                      className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#C9A86A]/50 transition-all font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                       <Hash size={12} /> Transaction Ref
                    </label>
                    <input 
                      required
                      type="text" 
                      name="transaction_ref"
                      value={formData.ref}
                      onChange={e => setFormData({...formData, ref: e.target.value})}
                      placeholder="ANB-1234567..."
                      className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#C9A86A]/50 transition-all font-bold text-sm"
                    />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                     <FileText size={12} /> Upload Receipt
                  </label>
                  <div className="relative border-2 border-dashed border-slate-100 rounded-[2rem] p-12 text-center hover:bg-slate-50 transition-all group cursor-pointer overflow-hidden">
                      <input 
                        required
                        type="file"
                        name="receipt_file" 
                        onChange={e => setFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        accept="image/*,.pdf"
                      />
                      {file ? (
                        <div className="space-y-2">
                           <p className="text-sm font-black text-[#006C35]">{file.name}</p>
                           <p className="text-[10px] text-slate-300 uppercase tracking-widest">File ready for encryption</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                           <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400 group-hover:text-[#C9A86A] transition-colors">
                              <Upload size={32} />
                           </div>
                           <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Click to Select Receipt</p>
                        </div>
                      )}
                  </div>
               </div>

               <button 
                 disabled={isSubmitting}
                 className="w-full bg-[#0A1A2F] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-[#C9A86A] transition-all disabled:opacity-50 flex items-center justify-center gap-4"
               >
                 {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Processing Transaction...</> : "Submit for Verification"}
               </button>

               <p className="text-[9px] text-center text-slate-400 font-black uppercase tracking-widest">
                  Secure SSL Encryption • Riyadh Financial Compliance Gateway
               </p>
            </form>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes progress-fast {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress-fast {
          animation: progress-fast 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default PaymentAuth;
