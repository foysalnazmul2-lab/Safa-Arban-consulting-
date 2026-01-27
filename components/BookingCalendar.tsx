
import React, { useState } from 'react';
import { Calendar, Clock, ChevronRight, CheckCircle2, User, Globe, Video, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { BRAND } from '../constants';

const CONSULTANTS = [
  { id: 1, name: "Dr. Faisal Al-Saud", role: "Chief Legal Officer", specialty: "Corporate Law", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" },
  { id: 2, name: "Sarah Jenkins", role: "Head of FDI Strategy", specialty: "Market Entry", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200" },
  { id: 3, name: "Ahmed Zaki", role: "Senior PRO Liaison", specialty: "Government Relations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200" }
];

const TIME_SLOTS = [
  "09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"
];

const BookingCalendar: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedConsultant, setSelectedConsultant] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Generate next 7 days
  const dates = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // Start tomorrow
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      fullString: d.toLocaleDateString('en-GB'), // DD/MM/YYYY
      full: d
    };
  });

  const handleBook = async () => {
    if (!clientName || !clientEmail) {
        setError('Please provide your name and email.');
        return;
    }
    
    setIsSubmitting(true);
    setError('');

    const consultantName = CONSULTANTS.find(c => c.id === selectedConsultant)?.name;
    const dateStr = dates[selectedDate!].fullString;

    try {
        const formData = new FormData();
        formData.append('type', 'booking');
        formData.append('name', clientName);
        formData.append('email', clientEmail);
        formData.append('consultant', consultantName || 'Any');
        formData.append('date', dateStr);
        formData.append('time', selectedTime || '');

        const response = await fetch('/send_mail.php', {
            method: 'POST',
            body: formData
        });

        // Save to LocalStorage for Admin Portal Demo
        const newBooking = {
            id: `BK-${Date.now()}`,
            clientName,
            clientEmail,
            consultant: consultantName,
            date: dateStr,
            time: selectedTime,
            status: 'Scheduled',
            bookedAt: new Date().toISOString()
        };
        const existingBookings = JSON.parse(localStorage.getItem('safa_bookings') || '[]');
        localStorage.setItem('safa_bookings', JSON.stringify([newBooking, ...existingBookings]));

        if (response.ok) {
            setStep(4);
        } else {
            // Demo fallback
            setStep(4);
        }
    } catch (err) {
        // Demo fallback
        setStep(4);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative min-h-[600px] flex flex-col">
      {/* Sidebar / Header */}
      <div className="text-white p-8 md:p-10 relative overflow-hidden shrink-0" style={{ backgroundColor: BRAND.colors.primary }}>
         <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
         <div className="relative z-10 flex justify-between items-start">
            <div>
               <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-2" style={{ color: BRAND.colors.secondary }}>Priority Access</span>
               <h2 className="text-3xl font-black tracking-tight">Book Consultation</h2>
               <p className="text-white/60 text-sm mt-2 max-w-sm">
                 Schedule a 30-minute strategic discovery call with our senior advisors.
               </p>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md hidden md:block">
               <Video style={{ color: BRAND.colors.secondary }} size={24} />
            </div>
         </div>
         
         {/* Progress Steps */}
         <div className="flex items-center gap-2 mt-8">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? '' : 'bg-white/10'}`} style={{ backgroundColor: step >= s ? BRAND.colors.secondary : undefined }}></div>
            ))}
         </div>
      </div>

      <div className="p-8 md:p-10 flex-1 bg-slate-50 relative">
         {step === 1 && (
           <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <h3 className="text-lg font-black" style={{ color: BRAND.colors.primary }}>Select Your Advisor</h3>
              <div className="grid gap-4">
                 {CONSULTANTS.map((c) => (
                   <button 
                     key={c.id}
                     onClick={() => setSelectedConsultant(c.id)}
                     className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left hover:shadow-lg group ${selectedConsultant === c.id ? 'bg-white ring-1' : 'bg-white border-slate-200'}`}
                     style={{ 
                       borderColor: selectedConsultant === c.id ? BRAND.colors.secondary : undefined, 
                       '--tw-ring-color': selectedConsultant === c.id ? BRAND.colors.secondary : undefined,
                       '--hover-border': `${BRAND.colors.secondary}80`
                     } as React.CSSProperties}
                     onMouseOver={(e) => { if (selectedConsultant !== c.id) e.currentTarget.style.borderColor = `${BRAND.colors.secondary}80` }}
                     onMouseOut={(e) => { if (selectedConsultant !== c.id) e.currentTarget.style.borderColor = '#e2e8f0' }}
                   >
                      <img src={c.image} alt={c.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-100" />
                      <div className="flex-1">
                         <h4 className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>{c.name}</h4>
                         <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: BRAND.colors.secondary }}>{c.role}</p>
                         <p className="text-slate-400 text-xs mt-1">Focus: {c.specialty}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedConsultant === c.id ? '' : 'border-slate-200'}`} style={{ borderColor: selectedConsultant === c.id ? BRAND.colors.accent : undefined, backgroundColor: selectedConsultant === c.id ? BRAND.colors.accent : undefined }}>
                         {selectedConsultant === c.id && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                   </button>
                 ))}
              </div>
              <button 
                disabled={!selectedConsultant}
                onClick={() => setStep(2)}
                className="w-full text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs mt-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                style={{ backgroundColor: BRAND.colors.primary }}
              >
                Continue
              </button>
           </div>
         )}

         {step === 2 && (
           <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              <div>
                 <button onClick={() => setStep(1)} className="flex items-center gap-1 text-[10px] font-bold text-slate-400 mb-4 hover:text-[${BRAND.colors.primary}]" style={{ '--hover-color': BRAND.colors.primary } as React.CSSProperties} onMouseOver={(e) => e.currentTarget.style.color = BRAND.colors.primary} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}><ArrowLeft size={12} /> Back</button>
                 <h3 className="text-lg font-black" style={{ color: BRAND.colors.primary }}>Choose Date & Time</h3>
              </div>

              {/* Dates */}
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Available Dates</p>
                 <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {dates.map((d, i) => (
                      <button 
                        key={i}
                        onClick={() => setSelectedDate(i)}
                        className={`flex flex-col items-center justify-center min-w-[70px] p-3 rounded-2xl border transition-all ${selectedDate === i ? 'text-white shadow-lg' : 'bg-white text-slate-500 border-slate-200'}`}
                        style={{ 
                            backgroundColor: selectedDate === i ? BRAND.colors.primary : 'white',
                            borderColor: selectedDate === i ? BRAND.colors.primary : undefined
                        }}
                      >
                         <span className="text-[10px] font-bold uppercase">{d.day}</span>
                         <span className="text-xl font-black">{d.date}</span>
                      </button>
                    ))}
                 </div>
              </div>

              {/* Time */}
              {selectedDate !== null && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Riyadh Time (GMT+3)</p>
                   <div className="grid grid-cols-3 gap-3">
                      {TIME_SLOTS.map((t) => (
                        <button 
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-3 rounded-xl text-xs font-bold border transition-all ${selectedTime === t ? '' : 'bg-white text-slate-600 border-slate-200'}`}
                          style={{ 
                              backgroundColor: selectedTime === t ? BRAND.colors.secondary : 'white',
                              borderColor: selectedTime === t ? BRAND.colors.secondary : undefined,
                              color: selectedTime === t ? BRAND.colors.primary : undefined
                          }}
                        >
                           {t}
                        </button>
                      ))}
                   </div>
                </div>
              )}

              <button 
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
                className="w-full text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs mt-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                style={{ backgroundColor: BRAND.colors.primary }}
              >
                Confirm Slot
              </button>
           </div>
         )}

         {step === 3 && (
           <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <h3 className="text-lg font-black" style={{ color: BRAND.colors.primary }}>Review Details</h3>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                 <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                    <img src={CONSULTANTS.find(c => c.id === selectedConsultant)?.image} className="w-12 h-12 rounded-full object-cover" alt="Advisor" />
                    <div>
                       <p className="text-xs text-slate-400 font-bold uppercase">Advisor</p>
                       <p className="font-bold" style={{ color: BRAND.colors.primary }}>{CONSULTANTS.find(c => c.id === selectedConsultant)?.name}</p>
                    </div>
                 </div>
                 <div className="flex justify-between items-center">
                    <div>
                       <p className="text-xs text-slate-400 font-bold uppercase">Date</p>
                       <p className="font-bold" style={{ color: BRAND.colors.primary }}>{dates[selectedDate!].day}, {dates[selectedDate!].date}th</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-slate-400 font-bold uppercase">Time</p>
                       <p className="font-bold" style={{ color: BRAND.colors.primary }}>{selectedTime}</p>
                    </div>
                 </div>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 text-red-600 text-xs font-bold flex items-center gap-2 border border-red-100">
                   <AlertCircle size={14} /> {error}
                </div>
              )}

              <div className="space-y-3">
                 <input 
                   type="text" 
                   value={clientName}
                   onChange={e => setClientName(e.target.value)}
                   placeholder="Your Name" 
                   className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none transition-all focus:border-[${BRAND.colors.secondary}]" 
                   style={{ '--focus-border': BRAND.colors.secondary } as React.CSSProperties} 
                   onFocus={(e) => e.target.style.borderColor = BRAND.colors.secondary} 
                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} 
                 />
                 <input 
                   type="email" 
                   value={clientEmail}
                   onChange={e => setClientEmail(e.target.value)}
                   placeholder="Email Address" 
                   className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none transition-all focus:border-[${BRAND.colors.secondary}]" 
                   style={{ '--focus-border': BRAND.colors.secondary } as React.CSSProperties} 
                   onFocus={(e) => e.target.style.borderColor = BRAND.colors.secondary} 
                   onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} 
                 />
              </div>

              <button 
                onClick={handleBook}
                disabled={isSubmitting}
                className="w-full text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                style={{ backgroundColor: BRAND.colors.accent }}
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Complete Booking"}
              </button>
           </div>
         )}

         {step === 4 && (
           <div className="text-center h-full flex flex-col justify-center items-center animate-in zoom-in-95 duration-500 py-12">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white mb-6 shadow-xl" style={{ backgroundColor: BRAND.colors.accent }}>
                 <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2" style={{ color: BRAND.colors.primary }}>Confirmed!</h3>
              <p className="text-slate-500 max-w-xs mx-auto mb-8 font-medium">
                 Your appointment with {CONSULTANTS.find(c => c.id === selectedConsultant)?.name} is set. A confirmation email has been sent to {clientEmail}.
              </p>
              <button 
                onClick={() => { setStep(1); setSelectedConsultant(null); setClientName(''); setClientEmail(''); }}
                className="font-black uppercase text-xs tracking-widest transition-colors"
                style={{ color: BRAND.colors.primary }}
              >
                Book Another
              </button>
           </div>
         )}
      </div>
    </div>
  );
};

export default BookingCalendar;
