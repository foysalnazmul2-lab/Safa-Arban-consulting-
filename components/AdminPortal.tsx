
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Calendar, Mail, LogOut, Search, Bell, Receipt, PlusCircle, PieChart, FileText, Trash2, DollarSign, MoreHorizontal, Briefcase } from 'lucide-react';
import { Page, User } from '../types';
import { useLanguage } from '../LanguageContext';
import { SafaArbanLogo } from './Logo.tsx';

interface AdminPortalProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  note: string;
}

const EXPENSE_CATEGORIES = ['Office Supplies', 'Travel', 'Salaries', 'Utilities', 'Marketing', 'Legal', 'Government Fees'];

const AdminPortal: React.FC<AdminPortalProps> = ({ user, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'bookings' | 'subscribers' | 'expenses'>('overview');
  const { t, lang, toggleLanguage } = useLanguage();
  
  // Local Data State
  const [leads, setLeads] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Expense Form State
  const [newExpense, setNewExpense] = useState({
    category: 'Office Supplies',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedLeads = JSON.parse(localStorage.getItem('safa_leads') || '[]');
    const loadedBookings = JSON.parse(localStorage.getItem('safa_bookings') || '[]');
    const loadedSubs = JSON.parse(localStorage.getItem('safa_subs') || '[]');
    const loadedExpenses = JSON.parse(localStorage.getItem('safa_expenses') || '[]');
    
    setLeads(loadedLeads);
    setBookings(loadedBookings);
    setSubscribers(loadedSubs);
    setExpenses(loadedExpenses);
  };

  const handleResetData = () => {
    if (confirm("Are you sure? This will delete all demo data.")) {
        localStorage.removeItem('safa_leads');
        localStorage.removeItem('safa_bookings');
        localStorage.removeItem('safa_subs');
        localStorage.removeItem('safa_expenses');
        loadData();
    }
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.date) return;

    const expense: Expense = {
        id: `EXP-${Date.now()}`,
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        date: newExpense.date,
        note: newExpense.note
    };

    const updatedExpenses = [expense, ...expenses];
    setExpenses(updatedExpenses);
    localStorage.setItem('safa_expenses', JSON.stringify(updatedExpenses));
    
    // Reset form
    setNewExpense({
        category: 'Office Supplies',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        note: ''
    });
  };

  const handleDeleteExpense = (id: string) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    localStorage.setItem('safa_expenses', JSON.stringify(updated));
  };

  const calculateMonthlyTotal = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return expenses.reduce((total, exp) => {
        const expDate = new Date(exp.date);
        if (expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
            return total + exp.amount;
        }
        return total;
    }, 0);
  };

  const stats = {
    totalLeads: leads.length,
    totalBookings: bookings.length,
    totalSubs: subscribers.length,
    recentLeads: leads.filter(l => new Date(l.date).toDateString() === new Date().toDateString()).length,
    monthlyExpenses: calculateMonthlyTotal()
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'AR' ? 'ar-SA' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 flex font-sans" dir={lang === 'AR' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <div className={`w-64 bg-[#0B1221] border-r border-slate-800 flex flex-col fixed h-full z-20 transition-all ${lang === 'AR' ? 'right-0 border-l border-r-0' : 'left-0'}`}>
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
           <SafaArbanLogo className="h-8 w-auto" variant="white" />
           <span className="text-[10px] font-bold bg-[#E94E4E] px-2 py-0.5 rounded text-white tracking-wider">ADMIN</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
           <button 
             onClick={() => setActiveTab('overview')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-[#E94E4E] text-white shadow-lg' : 'hover:bg-slate-800'}`}
           >
              <LayoutDashboard size={18} /> {t('admin_overview')}
           </button>
           <button 
             onClick={() => setActiveTab('leads')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'leads' ? 'bg-[#E94E4E] text-white shadow-lg' : 'hover:bg-slate-800'}`}
           >
              <Users size={18} /> {t('admin_leads')}
           </button>
           <button 
             onClick={() => setActiveTab('bookings')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'bookings' ? 'bg-[#E94E4E] text-white shadow-lg' : 'hover:bg-slate-800'}`}
           >
              <Calendar size={18} /> {t('admin_bookings')}
           </button>
           <button 
             onClick={() => setActiveTab('expenses')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'expenses' ? 'bg-[#E94E4E] text-white shadow-lg' : 'hover:bg-slate-800'}`}
           >
              <Receipt size={18} /> Expenses
           </button>
           <button 
             onClick={() => setActiveTab('subscribers')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'subscribers' ? 'bg-[#E94E4E] text-white shadow-lg' : 'hover:bg-slate-800'}`}
           >
              <Mail size={18} /> {t('admin_subscribers')}
           </button>
           
           <div className="pt-4 mt-4 border-t border-slate-800">
              <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Tools</p>
              <button 
                onClick={() => onNavigate('proposal-generator')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
              >
                 <FileText size={18} /> Proposal Generator
              </button>
           </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">AD</div>
              <div>
                 <p className="text-xs font-bold text-white">Admin User</p>
                 <p className="text-[10px] text-emerald-500">Super Admin</p>
              </div>
           </div>
           <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
              <LogOut size={18} /> {t('admin_signout')}
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-8 ${lang === 'AR' ? 'mr-64' : 'ml-64'}`}>
         <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-black text-white">
                {activeTab === 'overview' ? t('admin_overview') : 
                 activeTab === 'leads' ? t('admin_leads') : 
                 activeTab === 'expenses' ? 'Expense Tracking' :
                 activeTab === 'bookings' ? t('admin_bookings') : t('admin_subscribers')}
            </h1>
            <div className="flex gap-4">
               <button onClick={toggleLanguage} className="bg-slate-800 border border-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors">
                   {lang}
               </button>
               <div className="relative">
                  <Search className={`absolute top-1/2 -translate-y-1/2 text-slate-500 ${lang === 'AR' ? 'right-3' : 'left-3'}`} size={16} />
                  <input type="text" placeholder={t('admin_search')} className={`bg-slate-800 border border-slate-700 rounded-lg py-2 text-sm text-white focus:outline-none focus:border-[#E94E4E] ${lang === 'AR' ? 'pr-10 pl-4' : 'pl-10 pr-4'}`} />
               </div>
               <button onClick={handleResetData} className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-700" title={t('admin_reset')}><Trash2 size={20} /></button>
               <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"><Bell size={20} /></button>
            </div>
         </header>

         {/* OVERVIEW TAB */}
         {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="grid grid-cols-4 gap-6">
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                     <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Users size={24} /></div>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">+12%</span>
                     </div>
                     <h3 className="text-3xl font-black text-white mb-1">{stats.totalLeads}</h3>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{t('admin_total_leads')}</p>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                     <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><Calendar size={24} /></div>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">+5%</span>
                     </div>
                     <h3 className="text-3xl font-black text-white mb-1">{stats.totalBookings}</h3>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{t('admin_bookings')}</p>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                     <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-red-500/10 text-red-500 rounded-xl"><DollarSign size={24} /></div>
                     </div>
                     <h3 className="text-3xl font-black text-white mb-1">{stats.monthlyExpenses.toLocaleString()}</h3>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Expenses (This Month)</p>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                     <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl"><Mail size={24} /></div>
                     </div>
                     <h3 className="text-3xl font-black text-white mb-1">{stats.totalSubs}</h3>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{t('admin_subscribers')}</p>
                  </div>
               </div>

               {/* Recent Leads Table (Mini) */}
               <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                  <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                     <h3 className="font-bold text-white">{t('admin_leads')}</h3>
                     <button onClick={() => setActiveTab('leads')} className="text-xs text-[#E94E4E] font-bold hover:underline">View All</button>
                  </div>
                  <table className="w-full text-left text-sm">
                     <thead className="bg-slate-900/50 text-slate-500 font-bold uppercase text-xs">
                        <tr>
                           <th className="px-6 py-4 rtl:text-right">{t('admin_client_name')}</th>
                           <th className="px-6 py-4 rtl:text-right">{t('admin_activity')}</th>
                           <th className="px-6 py-4 rtl:text-right">{t('admin_status')}</th>
                           <th className="px-6 py-4 rtl:text-right">{t('admin_date')}</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-700 text-slate-300">
                        {leads.slice(0, 5).map((lead, idx) => (
                           <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                              <td className="px-6 py-4 font-bold text-white">{lead.name}</td>
                              <td className="px-6 py-4">{lead.businessType}</td>
                              <td className="px-6 py-4"><span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs font-bold uppercase">{lead.status}</span></td>
                              <td className="px-6 py-4 text-xs font-mono">{formatDate(lead.date)}</td>
                           </tr>
                        ))}
                        {leads.length === 0 && <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">{t('admin_no_data')}</td></tr>}
                     </tbody>
                  </table>
               </div>
            </div>
         )}

         {/* EXPENSES TAB */}
         {activeTab === 'expenses' && (
            <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
                {/* Left: Input Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2"><PlusCircle size={20} className="text-[#E94E4E]" /> Add Expense</h3>
                        <form onSubmit={handleAddExpense} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {EXPENSE_CATEGORIES.map(cat => (
                                        <button 
                                            key={cat}
                                            type="button"
                                            onClick={() => setNewExpense({...newExpense, category: cat})}
                                            className={`p-2 rounded-lg text-[10px] font-bold uppercase border transition-all ${newExpense.category === cat ? 'bg-[#E94E4E] text-white border-[#E94E4E]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Amount (SAR)</label>
                                <input 
                                    type="number" 
                                    value={newExpense.amount}
                                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-[#E94E4E] outline-none"
                                    placeholder="0.00"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                                <input 
                                    type="date" 
                                    value={newExpense.date}
                                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-[#E94E4E] outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Note (Optional)</label>
                                <input 
                                    type="text" 
                                    value={newExpense.note}
                                    onChange={(e) => setNewExpense({...newExpense, note: e.target.value})}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-[#E94E4E] outline-none"
                                    placeholder="Description..."
                                />
                            </div>

                            <button type="submit" className="w-full bg-[#E94E4E] hover:bg-[#d43f3f] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors">
                                Record Expense
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right: List & Stats */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Monthly Card */}
                    <div className="bg-gradient-to-r from-emerald-900/40 to-slate-800 border border-emerald-500/20 p-6 rounded-2xl flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Expenses (Current Month)</p>
                            <h2 className="text-4xl font-black text-white">{stats.monthlyExpenses.toLocaleString()} <span className="text-lg text-emerald-500">SAR</span></h2>
                        </div>
                        <div className="h-16 w-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
                            <PieChart size={32} />
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                        <div className="p-4 border-b border-slate-700">
                            <h3 className="font-bold text-white">Expense History</h3>
                        </div>
                        <div className="max-h-[500px] overflow-y-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-900/50 text-slate-500 font-bold uppercase text-xs sticky top-0">
                                    <tr>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Note</th>
                                        <th className="px-6 py-4 text-right">Amount</th>
                                        <th className="px-6 py-4 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700 text-slate-300">
                                    {expenses.length === 0 ? (
                                        <tr><td colSpan={5} className="p-8 text-center text-slate-500">No expenses recorded yet.</td></tr>
                                    ) : (
                                        expenses.map((exp) => (
                                            <tr key={exp.id} className="hover:bg-slate-700/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="bg-slate-700 text-white px-2 py-1 rounded text-xs font-bold">{exp.category}</span>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-xs">{formatDate(exp.date)}</td>
                                                <td className="px-6 py-4 text-slate-400">{exp.note || '-'}</td>
                                                <td className="px-6 py-4 text-right font-mono font-bold text-white">{exp.amount.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button onClick={() => handleDeleteExpense(exp.id)} className="text-slate-500 hover:text-red-500 transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
         )}

         {/* LEADS TAB */}
         {activeTab === 'leads' && (
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-in fade-in duration-300">
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900/50 text-slate-500 font-bold uppercase text-xs">
                     <tr>
                        <th className="px-6 py-4 rtl:text-right">{t('admin_client_name')}</th>
                        <th className="px-6 py-4 rtl:text-right">Contact</th>
                        <th className="px-6 py-4 rtl:text-right">{t('admin_activity')}</th>
                        <th className="px-6 py-4 rtl:text-right">Message</th>
                        <th className="px-6 py-4 rtl:text-right">{t('admin_date')}</th>
                        <th className="px-6 py-4 rtl:text-right">{t('admin_action')}</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-slate-300">
                     {leads.map((lead, idx) => (
                        <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                           <td className="px-6 py-4">
                              <div className="font-bold text-white">{lead.name}</div>
                              <div className="text-xs text-slate-500">{lead.status}</div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="text-xs">{lead.email}</div>
                              <div className="text-xs text-slate-500">{lead.phone}</div>
                           </td>
                           <td className="px-6 py-4">{lead.businessType}</td>
                           <td className="px-6 py-4 max-w-xs truncate" title={lead.message}>{lead.message || '-'}</td>
                           <td className="px-6 py-4 text-xs font-mono">{formatDate(lead.date)}</td>
                           <td className="px-6 py-4">
                              <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><MoreHorizontal size={16} /></button>
                           </td>
                        </tr>
                     ))}
                     {leads.length === 0 && <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">{t('admin_no_data')}</td></tr>}
                  </tbody>
               </table>
            </div>
         )}

         {/* BOOKINGS TAB */}
         {activeTab === 'bookings' && (
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-in fade-in duration-300">
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900/50 text-slate-500 font-bold uppercase text-xs">
                     <tr>
                        <th className="px-6 py-4 rtl:text-right">{t('admin_client_name')}</th>
                        <th className="px-6 py-4 rtl:text-right">{t('admin_consultant')}</th>
                        <th className="px-6 py-4 rtl:text-right">{t('admin_date')} & {t('admin_time')}</th>
                        <th className="px-6 py-4 rtl:text-right">{t('admin_status')}</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-slate-300">
                     {bookings.map((bk, idx) => (
                        <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                           <td className="px-6 py-4">
                              <div className="font-bold text-white">{bk.clientName}</div>
                              <div className="text-xs text-slate-500">{bk.clientEmail}</div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                 <Briefcase size={14} className="text-slate-500" />
                                 <span>{bk.consultant}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 font-mono text-xs font-bold text-emerald-400">
                              {bk.date} @ {bk.time}
                           </td>
                           <td className="px-6 py-4">
                              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs font-bold uppercase">{bk.status}</span>
                           </td>
                        </tr>
                     ))}
                     {bookings.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">{t('admin_no_data')}</td></tr>}
                  </tbody>
               </table>
            </div>
         )}

         {/* SUBSCRIBERS TAB */}
         {activeTab === 'subscribers' && (
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-in fade-in duration-300 max-w-3xl">
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900/50 text-slate-500 font-bold uppercase text-xs">
                     <tr>
                        <th className="px-6 py-4 rtl:text-right">Email Address</th>
                        <th className="px-6 py-4 rtl:text-right">{t('admin_date')}</th>
                        <th className="px-6 py-4 text-right rtl:text-left">{t('admin_status')}</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-slate-300">
                     {subscribers.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                           <td className="px-6 py-4 font-mono text-white">{sub.email}</td>
                           <td className="px-6 py-4 text-xs text-slate-500">{formatDate(sub.date)}</td>
                           <td className="px-6 py-4 text-right rtl:text-left">
                              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-[10px] font-black uppercase">Active</span>
                           </td>
                        </tr>
                     ))}
                     {subscribers.length === 0 && <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-500">{t('admin_no_data')}</td></tr>}
                  </tbody>
               </table>
            </div>
         )}

      </div>
    </div>
  );
};

export default AdminPortal;
