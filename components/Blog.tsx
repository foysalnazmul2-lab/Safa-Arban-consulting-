
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BLOG_POSTS, SERVICES_DB, BRAND } from '../constants';
import { BlogPost, Service } from '../types';
import SEO from './SEO';
import { Calendar, User, ArrowRight, X, Clock, Bookmark, Share2, Plus, Check, Search, Tag, ChevronRight, Hash, ArrowLeft, Filter, Mail, Linkedin, Twitter, Link as LinkIcon, Copy, Lock, Download, FileText, Zap, TrendingUp } from 'lucide-react';

// Contextual Mapping - Links Articles to Specific Service IDs for the CTA
const RELATED_SERVICES_MAP: Record<string, string> = {
  'guide-misa-100': 'cfr-01',
  'guide-rhq-2030': 'rhq-setup',
  'guide-industrial': 'sec-01',
  'guide-zatca-tax': 'cfr-09',
  'guide-saudization': 'hr-02',
  'guide-investor-visa': 'man-01',
  'guide-banking': 'supp-03',
  'guide-construction': 'sec-02',
  'guide-strategy': 'strat-02',
  'guide-import-export': 'sec-08',
  'guide-healthcare': 'sec-06',
  'guide-real-estate': 'sec-03',
  'guide-cybersecurity': 'sec-10',
  'guide-compliance': 'leg-01',
};

interface BlogProps {
  onAddToCart?: (id: string) => void;
  cart?: string[];
}

const CATEGORIES = ["All", "Formation", "Visas & HR", "Strategy", "Finance", "Industrial", "Digital", "Legal", "Marketing", "Operational", "BPO", "Tourism", "Manpower"];

const Blog: React.FC<BlogProps> = ({ onAddToCart, cart = [] }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const articleContentRef = useRef<HTMLDivElement>(null);

  // Scroll Lock Effect
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setReadingProgress(progress);
  };

  // Filter Logic
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = activeCategory === "All" || post.tags.includes(activeCategory);
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Segmentation for Bento Grid (Only when "All" is selected)
  const showBento = activeCategory === "All" && !searchQuery;
  const featuredPost = showBento ? filteredPosts[0] : null;
  const trendingPosts = showBento ? filteredPosts.slice(1, 4) : [];
  const gridPosts = showBento ? filteredPosts.slice(4) : filteredPosts;

  const relatedPosts = useMemo(() => {
    if (!selectedPost) return [];
    return BLOG_POSTS
      .filter(p => p.id !== selectedPost.id && p.tags.some(t => selectedPost.tags.includes(t)))
      .slice(0, 2);
  }, [selectedPost]);

  const getRelatedService = (postId: string): Service | null => {
    const serviceId = RELATED_SERVICES_MAP[postId];
    if (!serviceId) {
        const post = BLOG_POSTS.find(p => p.id === postId);
        if (post && post.tags.length > 0) {
            return SERVICES_DB.find(s => s.category.includes(post.tags[0]) || s.name.includes(post.tags[0])) || null;
        }
    }
    return SERVICES_DB.find(s => s.id === serviceId) || null;
  };

  return (
    <div className="bg-slate-900 min-h-screen pb-24 font-sans text-slate-300">
       
       {/* Filter Bar (Sticky) */}
       <div className="sticky top-20 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 py-4 no-print">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-6">
             <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-xs shrink-0">
                <Filter size={14} className="text-blue-500" /> Insights
             </div>
             <div className="h-6 w-px bg-slate-800 shrink-0"></div>
             
             {/* Horizontal Scroll Pills */}
             <div className="flex-1 overflow-x-auto no-scrollbar flex gap-2">
                {CATEGORIES.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                        activeCategory === cat 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                     }`}
                   >
                      {cat}
                   </button>
                ))}
             </div>

             <div className="relative hidden md:block">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..." 
                  className="bg-slate-800 border border-slate-700 rounded-full pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 w-40 transition-all focus:w-64"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={12} />
             </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 mt-8">
          
          {/* 1. HERO SECTION (Bento Layout) */}
          {showBento && featuredPost && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Featured Article (Left - 2/3) */}
                <div 
                  onClick={() => setSelectedPost(featuredPost)}
                  className="lg:col-span-2 group relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl border border-slate-800"
                >
                   <img src={featuredPost.image} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                   
                   <div className="absolute top-6 left-6">
                      <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                         <Zap size={12} fill="white" /> Featured Story
                      </span>
                   </div>

                   <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                      <div className="flex items-center gap-3 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                         <span className="bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">{featuredPost.tags[0]}</span>
                         <span className="text-slate-400">•</span>
                         <span className="text-slate-300">{featuredPost.date}</span>
                      </div>
                      <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-blue-200 transition-colors">
                         {featuredPost.title}
                      </h1>
                      <p className="text-slate-300 text-sm md:text-base font-medium line-clamp-2 max-w-2xl leading-relaxed mb-6">
                         {featuredPost.excerpt}
                      </p>
                      <button className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest border-b-2 border-blue-500 pb-1 hover:text-blue-400 transition-colors">
                         Read Guide <ArrowRight size={14} />
                      </button>
                   </div>
                </div>

                {/* Trending List (Right - 1/3) */}
                <div className="bg-slate-800 rounded-[2rem] p-8 border border-slate-700 flex flex-col">
                   <h3 className="text-white font-black text-lg mb-6 flex items-center gap-2">
                      <TrendingUp size={20} className="text-[#F26522]" /> Trending Now
                   </h3>
                   <div className="flex-1 flex flex-col gap-6">
                      {trendingPosts.map((post, idx) => (
                         <div 
                           key={post.id} 
                           onClick={() => setSelectedPost(post)}
                           className="group/item cursor-pointer flex gap-4 items-start"
                         >
                            <span className="text-4xl font-black text-slate-700 leading-none -mt-1 group-hover/item:text-blue-600 transition-colors">{idx + 1}</span>
                            <div>
                               <h4 className="text-white font-bold text-sm leading-snug mb-1 group-hover/item:text-blue-400 transition-colors line-clamp-2">
                                  {post.title}
                               </h4>
                               <p className="text-xs text-slate-500 line-clamp-1 mb-2">{post.excerpt}</p>
                               <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                                  <span className="text-blue-500">{post.tags[0]}</span>
                                  <span>•</span>
                                  <span>5 min read</span>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                   
                   {/* Mini Lead Magnet */}
                   <div className="mt-6 bg-gradient-to-r from-blue-900 to-slate-900 p-6 rounded-2xl border border-blue-500/30 text-center relative overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                      <div className="relative z-10">
                         <Download size={24} className="mx-auto text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                         <h4 className="text-white font-bold text-sm mb-1">2026 Investor Kit</h4>
                         <p className="text-[10px] text-slate-400">PDF Guide • 4.5 MB</p>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* 2. THE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
             {gridPosts.map((post, index) => (
                <React.Fragment key={post.id}>
                   
                   {/* Standard Article Card */}
                   <article 
                     onClick={() => setSelectedPost(post)}
                     className="group relative flex flex-col justify-between bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500 transition-all hover:-translate-y-1 shadow-lg cursor-pointer h-full"
                   >
                      <div>
                         <div className="relative w-full mb-6 overflow-hidden rounded-xl h-48 bg-slate-700">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                            <span className="absolute top-3 left-3 z-20 inline-flex items-center rounded-md bg-slate-900/80 backdrop-blur px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white ring-1 ring-inset ring-white/10">
                               {post.tags[0]}
                            </span>
                         </div>

                         <div className="flex items-center gap-x-3 text-xs text-slate-500 mb-3">
                            <time dateTime={post.date} className="font-mono">{post.date}</time>
                            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                            <span>{post.author}</span>
                         </div>
                         
                         <h3 className="text-lg font-bold leading-snug text-white group-hover:text-blue-400 transition-colors mb-3">
                            {post.title}
                         </h3>
                         <p className="line-clamp-3 text-sm leading-relaxed text-slate-400 mb-6">
                            {post.excerpt}
                         </p>
                      </div>

                      <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-500 group-hover:text-white transition-colors">
                            Read Article <ArrowRight size={12} />
                         </div>
                         <Bookmark size={16} className="text-slate-600 hover:text-white transition-colors" />
                      </div>
                   </article>

                   {/* Insert Lead Magnet after 5th item (index 4) */}
                   {index === 4 && (
                      <div className="bg-gradient-to-br from-[#F26522] to-[#c2410c] rounded-2xl p-8 text-white text-center flex flex-col justify-center items-center relative overflow-hidden border border-[#F26522] shadow-2xl">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-[60px] opacity-20"></div>
                         
                         <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20">
                               <Lock size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-black mb-2">Locked Content</h3>
                            <p className="text-white/80 text-sm font-medium mb-6 leading-relaxed">
                               Download the definitive <br/><strong>2026 Saudi Investor Kit</strong>.
                            </p>
                            <div className="bg-white/10 rounded-xl p-1 flex items-center border border-white/20 mb-4">
                               <input type="email" placeholder="Business Email" className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/50 px-3 w-full font-medium" />
                               <button className="bg-white text-[#F26522] p-2 rounded-lg hover:bg-slate-100 transition-colors">
                                  <ArrowRight size={14} />
                               </button>
                            </div>
                            <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Includes Zakat Calculator & Salary Guide</p>
                         </div>
                      </div>
                   )}
                </React.Fragment>
             ))}
          </div>

          {/* 3. NEWSLETTER BREAK */}
          <div className="mb-24 relative rounded-3xl overflow-hidden border border-[#F2D696] bg-slate-800">
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800"></div>
             <div className="absolute right-0 top-0 h-full w-1/3 bg-[#F2D696] opacity-5 skew-x-12 transform origin-bottom-left"></div>
             
             <div className="relative z-10 px-8 py-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                   <span className="text-[#F2D696] font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Intelligence Briefing</span>
                   <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Stay Ahead of the Curve</h2>
                   <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                      Join 15,000+ executives receiving weekly updates on Saudi Vision 2030 regulations, MISA opportunities, and tax reforms.
                   </p>
                </div>
                <div className="md:w-1/2 w-full max-w-md">
                   <div className="flex flex-col gap-4">
                      <div className="relative">
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                         <input 
                           type="email" 
                           placeholder="Enter your corporate email" 
                           className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white text-sm outline-none focus:border-[#F2D696] transition-all"
                         />
                      </div>
                      <button className="bg-[#F2D696] text-slate-900 font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-white transition-colors">
                         Subscribe for Free
                      </button>
                      <p className="text-[9px] text-center text-slate-500 font-bold uppercase tracking-widest">No spam. Unsubscribe anytime.</p>
                   </div>
                </div>
             </div>
          </div>

       </div>

       {/* Article Reader Modal (Light Mode for Reading) */}
       {selectedPost && (
         <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center sm:p-4 isolate">
            <SEO 
                title={`${selectedPost.title} | SafaArban Insights`} 
                description={selectedPost.excerpt} 
                image={selectedPost.image} 
                type="article"
            />
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => setSelectedPost(null)}
            ></div>
            
            {/* Modal Content */}
            <div className="bg-white w-full md:max-w-6xl h-[100vh] md:h-[95vh] overflow-hidden rounded-t-[2rem] md:rounded-[2rem] shadow-2xl relative z-[10000] animate-in slide-in-from-bottom-8 duration-500 flex flex-col md:flex-row">
               
               {/* Progress Bar */}
               <div className="absolute top-0 left-0 h-1.5 z-[1020] bg-blue-600 transition-all duration-100 ease-out" style={{ width: `${readingProgress}%` }}></div>

               <button 
                 onClick={() => setSelectedPost(null)}
                 className="absolute top-6 right-6 z-[1010] p-2 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-full transition-colors"
               >
                 <X size={24} />
               </button>

               {/* Content Area */}
               <div 
                 ref={articleContentRef}
                 onScroll={handleScroll}
                 className="flex-1 overflow-y-auto custom-scrollbar relative bg-white scroll-smooth"
               >
                  {/* Header Image */}
                  <div className="h-64 md:h-[450px] relative w-full">
                     <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                  </div>

                  <div className="px-8 md:px-20 py-12 max-w-4xl mx-auto -mt-32 relative z-10">
                      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 text-center mb-12">
                          <div className="flex justify-center gap-2 mb-6">
                              {selectedPost.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100">
                                    {tag}
                                </span>
                              ))}
                          </div>
                          
                          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6 text-slate-900">
                              {selectedPost.title}
                          </h1>

                          <div className="flex flex-wrap justify-center items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest border-t border-slate-100 pt-6">
                              <span className="flex items-center gap-2"><User size={14} /> {selectedPost.author}</span>
                              <span className="flex items-center gap-2"><Calendar size={14} /> {selectedPost.date}</span>
                              <span className="flex items-center gap-2"><Clock size={14} /> 5 Min Read</span>
                          </div>
                      </div>

                      <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-loose">
                        {selectedPost.content.split('\n').map((para, idx) => {
                          if (para.trim().startsWith('**')) {
                            return <h3 key={idx} className="text-2xl font-bold text-slate-900 mt-10 mb-4">{para.replace(/\*\*/g, '')}</h3>;
                          } else if (para.trim().startsWith('-')) {
                            return <li key={idx} className="ml-4 mb-2 list-disc marker:text-blue-500">{para.replace('-', '').trim()}</li>;
                          } else if (para.trim() === "") {
                            return <br key={idx} />;
                          } else {
                            return <p key={idx} className="mb-6">{para}</p>;
                          }
                        })}
                      </div>
                  </div>
               </div>

               {/* Right Sidebar (CTA) */}
               <div className="md:w-[350px] bg-slate-50 border-l border-slate-200 hidden lg:flex flex-col p-8">
                  <div className="mb-auto">
                     <h4 className="font-bold text-slate-900 mb-2">Share Article</h4>
                     <div className="flex gap-2 mb-8">
                        <button className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 transition-colors text-xs font-bold flex items-center justify-center gap-2"><Linkedin size={14} /> LinkedIn</button>
                        <button className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-sky-500 transition-colors text-xs font-bold flex items-center justify-center gap-2"><Twitter size={14} /> Twitter</button>
                     </div>
                  </div>

                  {getRelatedService(selectedPost.id) ? (
                     <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4 block">Recommended Service</span>
                        <h4 className="font-bold text-lg text-slate-900 mb-2 leading-tight">
                           {getRelatedService(selectedPost.id)?.name}
                        </h4>
                        <p className="text-xs text-slate-500 mb-6 line-clamp-3">
                           {getRelatedService(selectedPost.id)?.desc}
                        </p>
                        <div className="flex items-baseline gap-1 mb-6">
                           <span className="text-2xl font-black text-slate-900">{getRelatedService(selectedPost.id)?.professionalFee.toLocaleString()}</span>
                           <span className="text-xs font-bold text-slate-400">SAR</span>
                        </div>
                        {onAddToCart && (
                          <button 
                            onClick={() => {
                              const s = getRelatedService(selectedPost.id);
                              if (s) onAddToCart(s.id);
                            }}
                            disabled={cart.includes(getRelatedService(selectedPost.id)!.id)}
                            className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
                              cart.includes(getRelatedService(selectedPost.id)!.id)
                              ? 'bg-emerald-500 text-white cursor-default'
                              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                            }`}
                          >
                            {cart.includes(getRelatedService(selectedPost.id)!.id) ? <><Check size={14} /> Added</> : <><Plus size={14} /> Add to Quote</>}
                          </button>
                        )}
                     </div>
                  ) : (
                     <div className="bg-[#051C2C] p-6 rounded-2xl text-white text-center">
                        <h4 className="font-bold mb-2">Need Expert Advice?</h4>
                        <p className="text-xs text-white/60 mb-6">Book a consultation with our strategy team.</p>
                        <button className="w-full py-3 bg-white text-[#051C2C] rounded-xl font-black uppercase tracking-widest text-xs">Book Now</button>
                     </div>
                  )}
               </div>
            </div>
         </div>
       )}
    </div>
  );
};

export default Blog;
