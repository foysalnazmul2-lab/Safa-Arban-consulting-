
import React, { useState, useRef } from 'react';
import { Mail, Phone, User, Briefcase, MapPin, Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { BRAND } from '../constants';

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    status: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.phone.trim()) newErrors.phone = "WhatsApp number is required.";
    if (!formData.businessType.trim()) newErrors.businessType = "Business activity is required.";
    if (!formData.status) newErrors.status = "Please select your current status.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError('');
    
    try {
      // Create FormData to send to PHP script
      const data = new FormData();
      data.append('type', 'contact');
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('businessType', formData.businessType);
      data.append('status', formData.status);
      data.append('message', formData.message);

      // Perform POST request
      const response = await fetch('/send_mail.php', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        // Save to LocalStorage for Admin Portal Demo functionality
        const newLead = {
          id: `LD-${Date.now()}`,
          ...formData,
          date: new Date().toISOString(),
          type: 'Inquiry',
          status: 'New'
        };
        const existingLeads = JSON.parse(localStorage.getItem('safa_leads') || '[]');
        localStorage.setItem('safa_leads', JSON.stringify([newLead, ...existingLeads]));

        // Trigger Success View (SPA Redirection)
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', businessType: '', status: '', message: '' });
      } else {
        setServerError(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setServerError("Connection error. Please check your internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    <div className="bg-slate-800 rounded-[4rem] p-8 md:p-14 shadow-2xl border border-slate-700 relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundColor: BRAND.colors.secondary }}></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] opacity-5 pointer-events-none" style={{ backgroundColor: BRAND.colors.accent }}></div>

      <div className="text-center mb-12 relative z-10">
        <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.alert }}>Priority Channel</span>
        <h2 className="text-4xl font-black mb-4 tracking-tighter text-white">Direct Inquiry</h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto font-medium">
          Secure communication channel. Our consultants typically respond within 2 hours during Riyadh business hours.
        </p>
      </div>

      {submitSuccess ? (
        <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-[3rem] p-8 md:p-10 text-center animate-in zoom-in-95 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-white shadow-xl animate-in slide-in-from-bottom-4" style={{ backgroundColor: BRAND.colors.accent, boxShadow: `0 10px 30px -10px ${BRAND.colors.accent}4D` }}>
            <CheckCircle size={40} />
          </div>
          <h3 className="text-3xl font-black mb-4 tracking-tight text-white">Inquiry Received</h3>
          <p className="text-slate-300 mb-8 max-w-md mx-auto text-sm leading-relaxed font-medium">
             Your message has been securely transmitted to our CRM. Our specialized team is reviewing your requirements.
          </p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="font-black text-xs uppercase tracking-[0.2em] transition-colors hover:text-white"
            style={{ color: BRAND.colors.secondary }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10" noValidate>
          
          {serverError && (
            <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/30 flex items-center gap-3 text-red-200 text-sm font-bold animate-in fade-in">
               <AlertCircle size={18} className="shrink-0" />
               {serverError}
            </div>
          )}

          {/* Row 1: Identity */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Full Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"><User size={18} /></div>
                <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="e.g. Sultan Al-Saud" className={`w-full pl-14 pr-6 py-5 bg-slate-900 border rounded-2xl outline-none font-bold text-sm text-white placeholder:text-slate-600 ${errors.name ? 'border-red-500/50' : 'border-slate-700 focus:border-[#C9A86A]'}`} />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] font-bold pl-2">{errors.name}</p>}
            </div>

            <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Email Address <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"><Mail size={18} /></div>
                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="name@company.com" className={`w-full pl-14 pr-6 py-5 bg-slate-900 border rounded-2xl outline-none font-bold text-sm text-white placeholder:text-slate-600 ${errors.email ? 'border-red-500/50' : 'border-slate-700 focus:border-[#C9A86A]'}`} />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-bold pl-2">{errors.email}</p>}
            </div>
          </div>

          {/* Row 2: Business Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Proposed Business Activity <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"><Briefcase size={18} /></div>
                <input name="businessType" value={formData.businessType} onChange={handleChange} type="text" placeholder="e.g. IT, Construction, Trading" className={`w-full pl-14 pr-6 py-5 bg-slate-900 border rounded-2xl outline-none font-bold text-sm text-white placeholder:text-slate-600 ${errors.businessType ? 'border-red-500/50' : 'border-slate-700 focus:border-[#C9A86A]'}`} />
              </div>
              {errors.businessType && <p className="text-red-500 text-[10px] font-bold pl-2">{errors.businessType}</p>}
            </div>

            <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Current Status <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"><MapPin size={18} /></div>
                <select name="status" value={formData.status} onChange={handleChange} className={`w-full pl-14 pr-6 py-5 bg-slate-900 border rounded-2xl outline-none font-bold text-sm appearance-none text-white ${errors.status ? 'border-red-500/50' : 'border-slate-700 focus:border-[#C9A86A]'}`}>
                   <option value="">Select Status...</option>
                   <option value="outside">Outside Saudi Arabia</option>
                   <option value="visit">Inside Saudi (Visit Visa)</option>
                   <option value="resident">Living in Saudi (Iqama)</option>
                </select>
              </div>
              {errors.status && <p className="text-red-500 text-[10px] font-bold pl-2">{errors.status}</p>}
            </div>
          </div>

          {/* Row 3: Contact */}
          <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">WhatsApp Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"><Phone size={18} /></div>
                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+966 5..." className={`w-full pl-14 pr-6 py-5 bg-slate-900 border rounded-2xl outline-none font-bold text-sm text-white placeholder:text-slate-600 ${errors.phone ? 'border-red-500/50' : 'border-slate-700 focus:border-[#C9A86A]'}`} />
              </div>
              {errors.phone && <p className="text-red-500 text-[10px] font-bold pl-2">{errors.phone}</p>}
          </div>

          {/* Row 4: Message */}
          <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Your Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Tell us about your business goals..." 
                className="w-full px-6 py-5 bg-slate-900 border border-slate-700 rounded-2xl outline-none font-bold text-sm text-white placeholder:text-slate-600 min-h-[120px] focus:border-[#C9A86A] resize-none"
              />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-[0.98] mt-4 hover:shadow-2xl hover:shadow-blue-900/20"
            style={{ backgroundColor: BRAND.colors.primary }}
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <>Request My Free Consultation <Send size={16} className="group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
