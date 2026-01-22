
import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { BRAND } from '../constants';
import { SafaArbanLogo } from './Navbar';

interface LoginProps {
  onLogin: (email: string) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulated Auth Delay
    setTimeout(() => {
      if (email && password) {
        setIsLoading(false);
        onLogin(email);
      } else {
        setIsLoading(false);
        setError('Please enter valid credentials.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8F9FA]">
      {/* Visual Side */}
      <div className="md:w-1/2 bg-[#051C2C] relative overflow-hidden flex flex-col justify-between p-12 text-white">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: BRAND.colors.secondary }}></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: BRAND.colors.accent }}></div>

         <div className="relative z-10">
            <div 
              className="inline-block bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 mb-8 cursor-pointer hover:bg-white/20 transition-all"
              onClick={onBack}
            >
               <SafaArbanLogo className="h-10 w-auto brightness-0 invert" />
            </div>
            <h1 className="text-5xl font-black leading-tight mb-6">
               Secure Client <br/><span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${BRAND.colors.secondary}, #F2D696)` }}>Portal Access</span>
            </h1>
            <p className="text-lg text-white/60 max-w-md font-medium leading-relaxed">
               Manage your MISA licenses, track visa applications, and communicate with your dedicated PRO consultant in one secure dashboard.
            </p>
         </div>

         <div className="relative z-10 flex gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
            <span>© SafaArban Ltd</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>256-bit SSL</span>
         </div>
      </div>

      {/* Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 md:p-12">
         <div className="w-full max-w-md space-y-8">
            <div className="text-center md:text-left">
               <h2 className="text-3xl font-black text-[#051C2C] mb-2">Welcome Back</h2>
               <p className="text-slate-500 text-sm font-medium">Enter your credentials to access the workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Corporate Email</label>
                     <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#F26522] transition-colors" size={18} />
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 transition-all font-bold text-sm text-[#051C2C]"
                          style={{ '--tw-ring-color': `${BRAND.colors.secondary}4D` } as React.CSSProperties}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                     <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#F26522] transition-colors" size={18} />
                        <input 
                          type="password" 
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 transition-all font-bold text-sm text-[#051C2C]"
                          style={{ '--tw-ring-color': `${BRAND.colors.secondary}4D` } as React.CSSProperties}
                        />
                     </div>
                  </div>
               </div>

               {error && (
                 <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
                    <Shield size={14} /> {error}
                 </div>
               )}

               <div className="flex items-center justify-between text-xs font-bold">
                  <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                     <input type="checkbox" className="rounded text-[#F26522] focus:ring-[#F26522]" />
                     Remember device
                  </label>
                  <a href="#" className="text-[#F26522] hover:underline">Forgot password?</a>
               </div>

               <button 
                 type="submit"
                 disabled={isLoading}
                 className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-white shadow-xl transition-all flex items-center justify-center gap-2 hover:shadow-2xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                 style={{ backgroundColor: BRAND.colors.primary }}
               >
                 {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Access Dashboard <ArrowRight size={16} /></>}
               </button>
            </form>

            <div className="pt-8 border-t border-slate-100 text-center">
               <p className="text-xs text-slate-400 font-medium mb-4">New to SafaArban?</p>
               <button 
                 onClick={onBack} 
                 className="text-[#051C2C] font-black text-xs uppercase tracking-widest border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 transition-all"
               >
                 Start New Application
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Login;
