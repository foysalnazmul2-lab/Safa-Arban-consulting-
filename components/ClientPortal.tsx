
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MessageSquare, 
  LogOut, 
  Download, 
  Upload,
  Briefcase,
  Bell,
  ChevronRight,
  Plus,
  Send,
  ArrowLeft,
  X,
  History,
  Search,
  Filter
} from 'lucide-react';
import { BRAND, SERVICES_DB } from '../constants';
import { User, ServiceRecord } from '../types';

interface ClientPortalProps {
  user: User;
  onLogout: () => void;
}

const ClientPortal: React.FC<ClientPortalProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'history' | 'documents' | 'support'>('dashboard');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Notification State
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
     { id: '1', type: 'success', title: 'MISA License Issued', text: 'Your Service License has been fully approved.', time: '10 min ago', read: false },
     { id: '2', type: 'message', title: 'New Message', text: 'Sarah Jenkins replied to ticket #TKT-9921', time: '1 hr ago', read: false },
     { id: '3', type: 'alert', title: 'Document Expiry', text: 'Commercial Registration expires in 15 days.', time: '1 day ago', read: true }
  ]);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Mock History Data
  const completedServices: ServiceRecord[] = [
    { 
      id: 'SRV-1001', serviceId: 'cfr-01', name: 'MISA Service License', category: 'Company Formation', 
      status: 'Completed', dateRequested: 'Jan 15, 2026', dateCompleted: 'Jan 22, 2026', price: 30000, refNumber: 'LIC-2026-881' 
    },
    { 
      id: 'SRV-1002', serviceId: 'cfr-03', name: 'Commercial Registration (CR)', category: 'Company Formation', 
      status: 'Completed', dateRequested: 'Jan 23, 2026', dateCompleted: 'Jan 25, 2026', price: 8500, refNumber: 'CR-1010998822' 
    },
    { 
      id: 'SRV-1005', serviceId: 'supp-03', name: 'Corporate Bank Account', category: 'Support Services', 
      status: 'Completed', dateRequested: 'Feb 01, 2026', dateCompleted: 'Feb 10, 2026', price: 2000, refNumber: 'BNK-SNB-221' 
    }
  ];

  // Active Services Mock Data - Updated for visual variety
  const activeServices = [
    { id: 1, name: "ZATCA Registration", status: "Processing", step: 2, totalSteps: 4, lastUpdate: "2 hours ago", notes: "Submitting Tax Identification request." },
    { id: 2, name: "General Manager Visa", status: "Action Needed", step: 1, totalSteps: 4, lastUpdate: "1 day ago", notes: "Please upload Medical Report." },
    { id: 3, name: "Social Insurance (GOSI)", status: "Pending", step: 0, totalSteps: 3, lastUpdate: "30 mins ago", notes: "Awaiting establishment file activation." }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const [tickets, setTickets] = useState([
    { 
      id: 'TKT-9921', 
      subject: "ZATCA Integration Issue", 
      status: "Open", 
      date: "Mar 10", 
      priority: "High",
      messages: [
        { sender: 'Client', text: 'We are receiving Error 403 when trying to upload XML invoices.', time: 'Mar 10, 09:30 AM' },
        { sender: 'Consultant', text: 'This usually indicates a cryptographic stamp mismatch. I am checking your ZATCA portal configuration now.', time: 'Mar 10, 09:45 AM' }
      ]
    },
    { 
      id: 'TKT-9918', 
      subject: "Visa Quota Expansion", 
      status: "Resolved", 
      date: "Mar 05", 
      priority: "Medium",
      messages: [
        { sender: 'Client', text: 'We need to increase our block visa quota for 5 engineers.', time: 'Mar 05, 02:00 PM' },
        { sender: 'Consultant', text: 'Request submitted to Qiwa. Pending approval.', time: 'Mar 05, 04:30 PM' },
        { sender: 'Consultant', text: 'Approved. You can now issue the visas.', time: 'Mar 06, 10:00 AM' }
      ]
    }
  ]);

  const documents = [
    { name: "MISA License.pdf", type: "PDF", date: "Jan 22, 2026", status: "Verified" },
    { name: "Commercial Registration.pdf", type: "PDF", date: "Jan 25, 2026", status: "Verified" },
    { name: "Articles of Association.pdf", type: "PDF", date: "Jan 10, 2026", status: "Verified" },
    { name: "GM Passport Copy.jpg", type: "JPG", date: "Jan 05, 2026", status: "Verified" }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicketId) return;
    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicketId) {
        return {
          ...t,
          messages: [...t.messages, { sender: 'Client', text: newMessage, time: 'Just now' }]
        };
      }
      return t;
    });
    setTickets(updatedTickets);
    setNewMessage('');
  };

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  // Helper for Status Colors
  const getStatusStyles = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'completed' || s === 'approved' || s === 'verified' || s === 'resolved') {
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
    if (s === 'processing' || s === 'pending' || s === 'submitted' || s === 'open') {
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
    if (s === 'action needed' || s === 'rejected' || s === 'failed') {
        return 'bg-red-100 text-red-700 border-red-200';
    }
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 text-white flex flex-col fixed h-full z-20 transition-all" style={{ backgroundColor: BRAND.colors.primary }}>
        <div className="p-6 border-b border-white/10">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-[#051C2C]" style={{ backgroundColor: BRAND.colors.secondary }}>S</div>
              <span className="font-bold text-lg tracking-tight">SafaArban <span className="text-xs" style={{ color: BRAND.colors.secondary }}>PORTAL</span></span>
           </div>
        </div>
        <div className="flex-1 p-4 space-y-2">
           {[
             { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
             { id: 'services', icon: Briefcase, label: 'Active Services' },
             { id: 'history', icon: History, label: 'Completed Services' },
             { id: 'documents', icon: FileText, label: 'Document Vault' },
             { id: 'support', icon: MessageSquare, label: 'Support Tickets' },
           ].map((item) => (
             <button
               key={item.id}
               onClick={() => { setActiveTab(item.id as any); setSelectedTicketId(null); }}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                 activeTab === item.id 
                 ? 'text-[#051C2C] font-bold shadow-lg' 
                 : 'text-slate-400 hover:bg-white/5 hover:text-white'
               }`}
               style={activeTab === item.id ? { backgroundColor: BRAND.colors.secondary } : {}}
             >
                <item.icon size={18} /> {item.label}
             </button>
           ))}
        </div>
        <div className="p-4 border-t border-white/10">
           <div className="bg-white/5 rounded-xl p-4 mb-4">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Your Consultant</p>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-slate-600 border border-slate-500"></div>
                 <div>
                    <p className="text-xs font-bold text-white">Sarah Jenkins</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                       <span className="text-[9px] text-emerald-400">Online</span>
                    </div>
                 </div>
              </div>
           </div>
           <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all">
              <LogOut size={18} /> Sign Out
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
         {/* Top Header */}
         <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
            <h2 className="font-bold text-lg" style={{ color: BRAND.colors.primary }}>
              {activeTab === 'dashboard' ? 'Company Dashboard' : 
               activeTab === 'services' ? 'Service Management' : 
               activeTab === 'history' ? 'Service History' :
               activeTab === 'documents' ? 'Digital Vault' : 'Communication Center'}
            </h2>
            <div className="flex items-center gap-6">
               
               {/* Notification Center */}
               <div className="relative" ref={notifRef}>
                  <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative text-slate-400 transition-colors p-2 rounded-full hover:bg-slate-50 hover:text-[#051C2C]">
                     <Bell size={20} />
                     {unreadCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-white animate-pulse" style={{ backgroundColor: BRAND.colors.alert }}></span>}
                  </button>
                  {isNotificationsOpen && (
                    <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                       <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                          <h3 className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>Notifications</h3>
                          {unreadCount > 0 && <button onClick={markAllRead} className="text-[10px] font-bold hover:underline" style={{ color: BRAND.colors.secondary }}>Mark all read</button>}
                       </div>
                       <div className="max-h-[300px] overflow-y-auto">
                          {notifications.length === 0 ? (
                             <div className="p-8 text-center text-slate-400"><Bell size={24} className="mx-auto mb-2 opacity-50" /><p className="text-xs">No new notifications</p></div>
                          ) : (
                             notifications.map((notif) => (
                                <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors relative group ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                                   <div className="flex gap-3">
                                      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notif.type === 'success' ? 'bg-emerald-500' : notif.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                      <div className="flex-1">
                                         <h4 className={`text-xs font-bold ${!notif.read ? '' : 'text-slate-500'}`} style={!notif.read ? { color: BRAND.colors.primary } : {}}>{notif.title}</h4>
                                         <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{notif.text}</p>
                                         <p className="text-[9px] text-slate-400 mt-2 font-mono">{notif.time}</p>
                                      </div>
                                      <button onClick={(e) => removeNotification(notif.id, e)} className="absolute top-2 right-2 text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"><X size={12} /></button>
                                   </div>
                                </div>
                             ))
                          )}
                       </div>
                    </div>
                  )}
               </div>

               <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                  <div className="text-right hidden md:block">
                     <p className="text-sm font-bold" style={{ color: BRAND.colors.primary }}>{user.company || user.name}</p>
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider">Client ID: {user.id}</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 uppercase border border-slate-300">
                     {user.name.substring(0, 2)}
                  </div>
               </div>
            </div>
         </header>

         <div className="p-8 h-[calc(100vh-64px)] overflow-hidden flex flex-col">
            
            {/* DASHBOARD VIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in duration-500 overflow-y-auto pb-20 custom-scrollbar">
                 <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                       <div className="flex justify-between items-start mb-4"><div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle2 size={24} /></div><span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase border border-emerald-200">Good Standing</span></div>
                       <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Entity Status</p>
                       <h3 className="text-2xl font-black" style={{ color: BRAND.colors.primary }}>Active</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                       <div className="flex justify-between items-start mb-4"><div className="p-3 bg-amber-50 rounded-xl text-amber-600"><Briefcase size={24} /></div><span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase border border-amber-200">In Progress</span></div>
                       <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Services</p>
                       <h3 className="text-2xl font-black" style={{ color: BRAND.colors.primary }}>{activeServices.length} Requests</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                       <div className="flex justify-between items-start mb-4"><div className="p-3 bg-slate-100 rounded-xl text-slate-500"><History size={24} /></div><span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase border border-slate-200">All Time</span></div>
                       <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Completed Services</p>
                       <h3 className="text-2xl font-black" style={{ color: BRAND.colors.primary }}>{completedServices.length}</h3>
                    </div>
                 </div>
                 
                 {/* Live Tracker */}
                 <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center"><h3 className="font-bold" style={{ color: BRAND.colors.primary }}>Live Service Tracker</h3><button onClick={() => setActiveTab('services')} className="text-xs font-bold hover:underline" style={{ color: BRAND.colors.secondary }}>View All</button></div>
                    <div className="p-6 space-y-6">
                       {activeServices.map(service => (
                         <div key={service.id} className="group">
                            <div className="flex justify-between items-center mb-2">
                               <div className="flex items-center gap-3">
                                  <h4 className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>{service.name}</h4>
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${getStatusStyles(service.status)}`}>
                                     {service.status}
                                  </span>
                               </div>
                               <span className="text-xs text-slate-400 font-medium">{service.lastUpdate}</span>
                            </div>
                            <div className="relative pt-4 pb-2">
                               <div className="flex justify-between mb-2">
                                  {['Submitted', 'Govt Review', 'Approved', 'Completed'].map((step, idx) => (
                                    <div key={idx} className="flex flex-col items-center relative z-10 w-24">
                                       <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${idx <= service.step ? 'text-white' : 'bg-white border-slate-200 text-slate-300'}`} style={idx <= service.step ? { backgroundColor: BRAND.colors.primary, borderColor: BRAND.colors.primary } : {}}>{idx < service.step ? <CheckCircle2 size={12} /> : idx + 1}</div>
                                       <span className={`text-[9px] font-bold uppercase mt-2 text-center ${idx <= service.step ? '' : 'text-slate-300'}`} style={idx <= service.step ? { color: BRAND.colors.primary } : {}}>{step}</span>
                                    </div>
                                  ))}
                               </div>
                               <div className="absolute top-7 left-12 right-12 h-0.5 bg-slate-100 -z-0"></div><div className="absolute top-7 left-12 h-0.5 -z-0 transition-all duration-1000" style={{ width: `${(service.step / 3) * 80}%`, backgroundColor: BRAND.colors.primary }}></div>
                            </div>
                            <div className={`mt-2 p-3 rounded-lg border flex items-center gap-2 ${service.status === 'Action Needed' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                               {service.status === 'Action Needed' ? <AlertCircle size={14} /> : <Clock size={12} />} 
                               <p className="text-xs font-medium">{service.notes}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {/* SERVICES TAB - Active & Catalog */}
            {activeTab === 'services' && (
               <div className="space-y-8 animate-in fade-in duration-300 overflow-y-auto pb-20 custom-scrollbar">
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                     <h3 className="font-bold mb-4" style={{ color: BRAND.colors.primary }}>Active Applications</h3>
                     <div className="space-y-4">
                        {activeServices.map(service => (
                           <div key={service.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="flex items-center gap-4">
                                 <div className="p-3 bg-blue-100 rounded-xl text-blue-600"><Briefcase size={20} /></div>
                                 <div>
                                    <h4 className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>{service.name}</h4>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border inline-block mt-1 ${getStatusStyles(service.status)}`}>
                                       {service.status}
                                    </span>
                                 </div>
                              </div>
                              <button className="text-xs font-bold hover:underline" style={{ color: BRAND.colors.secondary }}>View Details</button>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold" style={{ color: BRAND.colors.primary }}>Request New Service</h3>
                        <div className="flex gap-2">
                           <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                              <input type="text" placeholder="Search catalog..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium outline-none focus:ring-2 focus:ring-[#D4AF37]/20" />
                           </div>
                        </div>
                     </div>
                     <div className="grid md:grid-cols-3 gap-6">
                        {SERVICES_DB.slice(0, 9).map((item) => (
                           <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all group flex flex-col h-full">
                              <div className="flex justify-between items-start mb-4">
                                 <div className="p-3 rounded-xl transition-colors group-hover:text-white" style={{ backgroundColor: `${BRAND.colors.primary}0D`, color: BRAND.colors.primary }}>
                                    <Plus size={20} />
                                 </div>
                                 <span className="text-xs font-black text-[#051C2C] bg-[#D4AF37]/20 px-2 py-1 rounded">{item.price.toLocaleString()} SAR</span>
                              </div>
                              <h4 className="font-bold mb-2 text-sm line-clamp-1" style={{ color: BRAND.colors.primary }}>{item.name}</h4>
                              <p className="text-xs text-slate-500 mb-4 h-10 line-clamp-2">{item.desc}</p>
                              <button className="w-full mt-auto py-2.5 rounded-lg border text-xs font-bold transition-all hover:text-white hover:shadow-md" 
                                      style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary } as React.CSSProperties}
                                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = BRAND.colors.primary; e.currentTarget.style.color = 'white'; }}
                                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = BRAND.colors.primary; }}>
                                 Add to Cart
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* COMPLETED SERVICES HISTORY */}
            {activeTab === 'history' && (
               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 overflow-hidden flex flex-col h-full">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                     <div>
                        <h3 className="font-bold text-lg" style={{ color: BRAND.colors.primary }}>Service History</h3>
                        <p className="text-xs text-slate-400 mt-1">Archive of all completed requests and issued documents.</p>
                     </div>
                     <button className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2 hover:bg-white hover:shadow-sm">
                        <Filter size={14} /> Filter
                     </button>
                  </div>
                  <div className="flex-1 overflow-auto">
                     <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[10px] text-slate-500 font-black uppercase tracking-wider sticky top-0 z-10">
                           <tr>
                              <th className="px-6 py-4">Service Name</th>
                              <th className="px-6 py-4">Ref Number</th>
                              <th className="px-6 py-4">Completion Date</th>
                              <th className="px-6 py-4">Total Cost</th>
                              <th className="px-6 py-4 text-center">Status</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           {completedServices.map((srv) => (
                              <tr key={srv.id} className="hover:bg-slate-50 transition-colors group">
                                 <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                       <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                          <CheckCircle2 size={16} />
                                       </div>
                                       <div>
                                          <span className="text-sm font-bold block" style={{ color: BRAND.colors.primary }}>{srv.name}</span>
                                          <span className="text-[10px] text-slate-400">{srv.category}</span>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4">
                                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">{srv.refNumber}</span>
                                 </td>
                                 <td className="px-6 py-4 text-xs text-slate-500 font-medium">{srv.dateCompleted}</td>
                                 <td className="px-6 py-4 text-xs font-bold" style={{ color: BRAND.colors.primary }}>{srv.price.toLocaleString()} SAR</td>
                                 <td className="px-6 py-4 text-center">
                                    <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wide border ${getStatusStyles(srv.status)}`}>
                                       {srv.status}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-[#051C2C] transition-colors p-2 hover:bg-slate-200 rounded-lg" title="Download Invoice/Certificate">
                                       <Download size={16} />
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}

            {/* DOCUMENT CENTER */}
            {activeTab === 'documents' && (
               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center"><div><h3 className="font-bold" style={{ color: BRAND.colors.primary }}>Corporate Vault</h3><p className="text-xs text-slate-400 mt-1">Securely stored compliance documents.</p></div><button className="text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:opacity-90" style={{ backgroundColor: BRAND.colors.primary }}><Upload size={14} /> Upload New</button></div>
                  <table className="w-full text-left">
                     <thead className="bg-slate-50 text-xs text-slate-500 font-bold uppercase tracking-wider"><tr><th className="px-6 py-4">Document Name</th><th className="px-6 py-4">Date Added</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr></thead>
                     <tbody className="divide-y divide-slate-100">
                        {documents.map((doc, idx) => (
                           <tr key={idx} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4"><div className="flex items-center gap-3"><div className="p-2 bg-red-50 text-red-500 rounded-lg"><FileText size={18} /></div><span className="text-sm font-bold" style={{ color: BRAND.colors.primary }}>{doc.name}</span></div></td><td className="px-6 py-4 text-sm text-slate-500">{doc.date}</td><td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusStyles(doc.status)}`}>{doc.status}</span></td><td className="px-6 py-4 text-right"><button className="text-slate-400 hover:text-[#051C2C] transition-colors"><Download size={18} /></button></td></tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}

            {/* SUPPORT / COMMUNICATION CENTER */}
            {activeTab === 'support' && (
               <div className="animate-in fade-in duration-300 grid md:grid-cols-3 gap-8 h-full">
                  <div className="md:col-span-2 flex flex-col h-full overflow-hidden">
                     {selectedTicket ? (
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden animate-in slide-in-from-right-4">
                           <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                              <div className="flex items-center gap-4"><button onClick={() => setSelectedTicketId(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft size={18} /></button><div><h3 className="font-bold text-sm" style={{ color: BRAND.colors.primary }}>{selectedTicket.subject}</h3><p className="text-[10px] text-slate-400 font-mono">Ref: {selectedTicket.id}</p></div></div>
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(selectedTicket.status)}`}>{selectedTicket.status}</span>
                           </div>
                           <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                              {selectedTicket.messages.map((msg, idx) => (
                                 <div key={idx} className={`flex ${msg.sender === 'Client' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'Client' ? 'text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none border border-slate-200'}`} style={msg.sender === 'Client' ? { backgroundColor: BRAND.colors.primary } : {}}>
                                       <div className="flex justify-between items-center gap-4 mb-1 opacity-70 text-[10px] font-bold uppercase tracking-widest"><span>{msg.sender}</span><span>{msg.time}</span></div><p>{msg.text}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                           <div className="p-4 bg-slate-50 border-t border-slate-100">
                              <div className="relative flex items-center gap-2"><input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type your message..." className="flex-1 p-4 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 bg-white text-sm" style={{ '--tw-ring-color': `${BRAND.colors.primary}1A` } as any} /><button onClick={handleSendMessage} disabled={!newMessage.trim()} className="absolute right-2 p-2 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50" style={{ backgroundColor: BRAND.colors.primary }}><Send size={16} /></button></div>
                           </div>
                        </div>
                     ) : (
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
                           <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0"><h3 className="font-bold" style={{ color: BRAND.colors.primary }}>My Tickets</h3><button className="text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-all" style={{ backgroundColor: BRAND.colors.primary }}><Plus size={14} /> New Ticket</button></div>
                           <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                              {tickets.map(tkt => (
                                 <div key={tkt.id} onClick={() => setSelectedTicketId(tkt.id)} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group flex items-center justify-between">
                                    <div className="flex items-center gap-4"><div className={`p-3 rounded-xl shrink-0 ${tkt.status === 'Open' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'}`}><MessageSquare size={20} /></div><div><div className="flex items-center gap-3 mb-1"><h4 className="font-bold text-sm transition-colors group-hover:text-[#E9443E]" style={{ color: BRAND.colors.primary }}>{tkt.subject}</h4><span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${getStatusStyles(tkt.status)}`}>{tkt.status}</span></div><p className="text-xs text-slate-400 font-medium line-clamp-1">{tkt.messages[tkt.messages.length - 1].text}</p><div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-mono"><span>#{tkt.id}</span><span>•</span><span>{tkt.date}</span></div></div></div><ChevronRight size={16} className="text-slate-300 transition-colors hover:text-[#051C2C]" />
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
                  <div className="hidden md:block rounded-3xl p-8 text-white h-fit relative overflow-hidden shadow-xl" style={{ backgroundColor: BRAND.colors.primary }}>
                     <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20" style={{ backgroundColor: BRAND.colors.secondary }}></div>
                     <h3 className="font-bold mb-6 text-lg relative z-10">Dedicated Consultant</h3>
                     <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="w-14 h-14 rounded-full bg-slate-700 border-2 overflow-hidden" style={{ borderColor: BRAND.colors.secondary }}><div className="w-full h-full bg-slate-600 flex items-center justify-center text-xs font-bold">SJ</div></div><div><p className="font-bold text-sm">Sarah Jenkins</p><p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Senior PRO Consultant</p></div>
                     </div>
                     <div className="space-y-4 mb-8 relative z-10 text-sm text-slate-300"><div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span>Online Now</span></div><p className="leading-relaxed text-xs opacity-70">Sarah specializes in MISA licensing and Qiwa compliance. Typical response time: &lt; 30 mins.</p></div>
                     <button className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg relative z-10 text-[#051C2C]" style={{ backgroundColor: BRAND.colors.secondary }}>Schedule Call</button>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default ClientPortal;
