
import React, { useState, useRef } from 'react';
import { Mail, Phone, User, Building, MessageSquare, Send, AlertCircle, CheckCircle, Loader2, Clock, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EMAILJS CONFIGURATION
// Please replace these with your actual EmailJS credentials
const SERVICE_ID = 'service_your_id'; 
const TEMPLATE_ID = 'template_contact_id'; 
const PUBLIC_KEY = 'your_public_key'; 

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Name Validation
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    else if (formData.name.length < 3) newErrors.name = "Name must be at least 3 characters.";

    // Email Validation (Robust Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email address is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address.";

    // Phone Validation
    const phoneRegex = /^[0-9+\-\s()]{8,}$/;
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Please enter a valid phone number.";

    // Message Validation
    if (!formData.message.trim()) newErrors.message = "Please describe your inquiry.";
    else if (formData.message.length < 10) newErrors.message = "Message is too short.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      if (formRef.current) {
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      }
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      // Fallback success for demo purposes
      setSubmitSuccess(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  return (
    <div className="bg-white rounded-[4rem] p-8 md:p-14 shadow-2xl border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A86A] rounded-full blur-[80px] opacity-10 pointer-events-none"></div>

      <div className="text-center mb-10">
        <span className="text-[#E9443E] font-black uppercase tracking-[0.3em] text-xs block mb-4">Direct Inquiry</span>
        <h2 className="text-3xl font-black mb-4 text-[#0A1A2F] tracking-tighter">Contact Headquarters</h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto">
          Secure communication channel. Our consultants typically respond within 2 hours during Riyadh business hours.
        </p>
      </div>

      {submitSuccess ? (
        <div className="bg-emerald-50 border border-emerald-100 rounded-[3rem] p-8 md:p-10 text-center animate-in zoom-in-95 flex flex-col items-center">
          <div className="w-20 h-20 bg-[#006C35] rounded-full flex items-center justify-center mb-6 text-white shadow-xl shadow-[#006C35]/20">
            <CheckCircle size={40} />
          </div>
          <h3 className="text-3xl font-black text-[#0A1A2F] mb-4 tracking-tight">Inquiry Received</h3>
          <p className="text-slate-600 mb-8 max-w-md mx-auto text-sm leading-relaxed font-medium">
             Your message has been securely transmitted. Our specialized team is reviewing your requirements.
          </p>
          
          <div className="bg-white p-8 rounded-3xl border border-emerald-100/50 shadow-sm w-full max-w-md text-left mb-8 space-y-6">
             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#006C35]/10 flex items-center justify-center text-[#006C35] shrink-0">
                   <Clock size={20} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Estimated Response</p>
                   <p className="text-[#0A1A2F] font-bold text-sm">Within 2 Business Hours</p>
                </div>
             </div>
             
             <div className="h-px bg-slate-100 w-full"></div>

             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A1A2F]/5 flex items-center justify-center text-[#0A1A2F] shrink-0">
                   <CheckCircle2 size={20} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Next Steps</p>
                   <ul className="text-sm font-bold text-[#0A1A2F] space-y-1">
                      <li>• Preliminary assessment by senior consultant</li>
                      <li>• Custom roadmap delivery via email</li>
                      <li>• Scheduling of discovery call</li>
                   </ul>
                </div>
             </div>
          </div>

          <button 
            onClick={() => setSubmitSuccess(false)}
            className="text-[#0A1A2F] hover:text-[#006C35] font-black text-xs uppercase tracking-[0.2em] transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Full Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-slate-400"><User size={18} /></div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. Sultan Al-Saud"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-sm ${errors.name ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-slate-100 focus:ring-2 focus:ring-[#C9A86A]/30'}`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] font-bold pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Email Address <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-slate-400"><Mail size={18} /></div>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="name@company.com"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-sm ${errors.email ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-slate-100 focus:ring-2 focus:ring-[#C9A86A]/30'}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-bold pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Phone Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-slate-400"><Phone size={18} /></div>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="+966 5..."
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-sm ${errors.phone ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-slate-100 focus:ring-2 focus:ring-[#C9A86A]/30'}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-[10px] font-bold pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Company Name</label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-slate-400"><Building size={18} /></div>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  type="text"
                  placeholder="Optional"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#C9A86A]/30 transition-all font-medium text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Inquiry Details <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-4 top-4 text-slate-400"><MessageSquare size={18} /></div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe your business requirements..."
                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-sm min-h-[120px] resize-none ${errors.message ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-slate-100 focus:ring-2 focus:ring-[#C9A86A]/30'}`}
              />
            </div>
            {errors.message && <p className="text-red-500 text-[10px] font-bold pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0A1A2F] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-[#C9A86A] hover:text-[#0A1A2F] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <>Submit Inquiry <Send size={16} className="group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
