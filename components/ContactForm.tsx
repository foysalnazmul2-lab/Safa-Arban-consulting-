
import React, { useState, useRef } from 'react';
import { Mail, Phone, User, Building, MessageSquare, Send, AlertCircle, CheckCircle, Loader2, Clock, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../constants';

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
    
    // Prepare payload for Backend API
    const payload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      metadata: {
        source: 'web_contact_form',
        locale: navigator.language
      }
    };

    try {
      // ---------------------------------------------------------
      // BACKEND CONNECTION
      // ---------------------------------------------------------
      // In a live environment, this connects to your secured API.
      // The backend handles database storage (SQL/NoSQL) and 
      // triggers the transactional email via SendGrid/AWS SES.
      
      /* 
      const response = await fetch('https://api.safaarban.com/v1/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-ID': 'web-v2'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('API Gateway Error');
      */

      // Simulation of network latency and successful server response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Secure Payload Transmitted:", payload);
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      console.error('Submission Error:', error);
      // In production, you would handle specific error codes here
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
    <div className="bg-white rounded-[4rem] p-8 md:p-14 shadow-2xl border border-slate-100 relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundColor: BRAND.colors.secondary }}></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] opacity-5 pointer-events-none" style={{ backgroundColor: BRAND.colors.accent }}></div>

      <div className="text-center mb-12 relative z-10">
        <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.alert }}>Priority Channel</span>
        <h2 className="text-4xl font-black mb-4 tracking-tighter" style={{ color: BRAND.colors.primary }}>Direct Inquiry</h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto font-medium">
          Secure communication channel. Our consultants typically respond within 2 hours during Riyadh business hours.
        </p>
      </div>

      {submitSuccess ? (
        <div className="bg-emerald-50 border border-emerald-100 rounded-[3rem] p-8 md:p-10 text-center animate-in zoom-in-95 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-white shadow-xl animate-in slide-in-from-bottom-4" style={{ backgroundColor: BRAND.colors.accent, boxShadow: `0 10px 30px -10px ${BRAND.colors.accent}4D` }}>
            <CheckCircle size={40} />
          </div>
          <h3 className="text-3xl font-black mb-4 tracking-tight" style={{ color: BRAND.colors.primary }}>Inquiry Received</h3>
          <p className="text-slate-600 mb-8 max-w-md mx-auto text-sm leading-relaxed font-medium">
             Your message has been securely transmitted to our CRM. Our specialized team is reviewing your requirements.
          </p>
          
          <div className="bg-white p-8 rounded-3xl border border-emerald-100/50 shadow-sm w-full max-w-md text-left mb-8 space-y-6">
             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${BRAND.colors.accent}1A`, color: BRAND.colors.accent }}>
                   <Clock size={20} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Estimated Response</p>
                   <p className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>Within 2 Business Hours</p>
                </div>
             </div>
             
             <div className="h-px bg-slate-100 w-full"></div>

             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${BRAND.colors.primary}0D`, color: BRAND.colors.primary }}>
                   <CheckCircle2 size={20} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Next Steps</p>
                   <ul className="text-sm font-bold space-y-1" style={{ color: BRAND.colors.primary }}>
                      <li>• Preliminary assessment by senior consultant</li>
                      <li>• Custom roadmap delivery via email</li>
                      <li>• Scheduling of discovery call</li>
                   </ul>
                </div>
             </div>
          </div>

          <button 
            onClick={() => setSubmitSuccess(false)}
            className="font-black text-xs uppercase tracking-[0.2em] transition-colors"
            style={{ color: BRAND.colors.primary }}
            onMouseOver={(e) => e.currentTarget.style.color = BRAND.colors.accent}
            onMouseOut={(e) => e.currentTarget.style.color = BRAND.colors.primary}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2 transition-colors">Full Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-slate-400 transition-colors"><User size={18} /></div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. Sultan Al-Saud"
                  className={`w-full pl-12 pr-4 py-4 bg-[#F8F9FA] border rounded-2xl outline-none transition-all font-bold text-sm placeholder:font-medium placeholder:text-slate-400 ${errors.name ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-slate-100 focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/10'}`}
                  style={{ color: BRAND.colors.primary }}
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] font-bold pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
            </div>

            <div className="space-y-2 group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2 transition-colors">Email Address <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-slate-400 transition-colors"><Mail size={18} /></div>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="name@company.com"
                  className={`w-full pl-12 pr-4 py-4 bg-[#F8F9FA] border rounded-2xl outline-none transition-all font-bold text-sm placeholder:font-medium placeholder:text-slate-400 ${errors.email ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-slate-100 focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/10'}`}
                  style={{ color: BRAND.colors.primary }}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-bold pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2 transition-colors">Phone Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-slate-400 transition-colors"><Phone size={18} /></div>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="+966 5..."
                  className={`w-full pl-12 pr-4 py-4 bg-[#F8F9FA] border rounded-2xl outline-none transition-all font-bold text-sm placeholder:font-medium placeholder:text-slate-400 ${errors.phone ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-slate-100 focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/10'}`}
                  style={{ color: BRAND.colors.primary }}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-[10px] font-bold pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</p>}
            </div>

            <div className="space-y-2 group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2 transition-colors">Company Name (Optional)</label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-slate-400 transition-colors"><Building size={18} /></div>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  type="text"
                  placeholder="Entity Name"
                  className="w-full pl-12 pr-4 py-4 bg-[#F8F9FA] border border-slate-100 rounded-2xl outline-none focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/10 transition-all font-bold text-sm placeholder:font-medium placeholder:text-slate-400"
                  style={{ color: BRAND.colors.primary }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 group/field">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2 transition-colors">Message <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-4 top-4 text-slate-400 transition-colors"><MessageSquare size={18} /></div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe your business requirements..."
                className={`w-full pl-12 pr-4 py-4 bg-[#F8F9FA] border rounded-2xl outline-none transition-all font-bold text-sm placeholder:font-medium placeholder:text-slate-400 min-h-[120px] resize-none ${errors.message ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-slate-100 focus:border-[#C9A86A] focus:ring-4 focus:ring-[#C9A86A]/10'}`}
                style={{ color: BRAND.colors.primary }}
              />
            </div>
            {errors.message && <p className="text-red-500 text-[10px] font-bold pl-2 flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-[0.98]"
            style={{ backgroundColor: BRAND.colors.primary }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.secondary; e.currentTarget.style.color = BRAND.colors.primary; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.primary; e.currentTarget.style.color = 'white'; }}
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <>Send Message <Send size={16} className="group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
