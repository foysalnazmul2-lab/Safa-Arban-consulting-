
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BLOG_POSTS, SERVICES_DB, BRAND } from '../constants';
import { BlogPost, Service } from '../types';
import SEO from './SEO';
import { Calendar, User, ArrowRight, X, Clock, Bookmark, Share2, Plus, Check, Search, Tag, ChevronRight, Hash, ArrowLeft, Filter, Mail, Linkedin, Twitter, Link as LinkIcon, Copy } from 'lucide-react';

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
  'guide-import-export': 'cfr-04',
  'guide-healthcare': 'sec-06',
  'guide-real-estate': 'sec-03',
  'guide-cybersecurity': 'sec-10',
  'guide-compliance': 'leg-01',
};

interface BlogProps {
  onAddToCart?: (id: string) => void;
  cart?: string[];
}

const CATEGORIES = ["All", "Formation", "Visas & HR", "Strategy", "Finance", "Industrial", "Digital"];

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

  // Derived Data
  const allTags = useMemo(() => Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags))), []);
  
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All": BLOG_POSTS.length };
    CATEGORIES.slice(1).forEach(cat => {
      counts[cat] = BLOG_POSTS.filter(p => p.tags.includes(cat)).length;
    });
    return counts;
  }, []);

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

  const relatedPosts = useMemo(() => {
    if (!selectedPost) return [];
    return BLOG_POSTS
      .filter(p => p.id !== selectedPost.id && p.tags.some(t => selectedPost.tags.includes(t)))
      .slice(0, 2);
  }, [selectedPost]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

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
    <div className="bg-[#F8F9FA] min-h-screen pb-24 font-sans relative">
       {/* Compact Header */}
       <div className="text-white pt-32 pb-20 relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.accent }}></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
             <span className="font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-4 text-[#F26522] animate-in fade-in slide-in-from-bottom-4">
                SafaArban Intelligence
             </span>
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-tight animate-in fade-in slide-in-from-bottom-6 delay-100">
                Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26522] to-[#F2D696]">Insights.</span>
             </h1>
             <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 delay-200">
               Deep-dive analysis on Saudi Vision 2030, regulatory updates, and investment frameworks.
             </p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 mt-12 relative z-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
             
             {/* SIDEBAR */}
             <aside className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-24 animate-in slide-in-from-left-4 duration-500">
                
                {/* Search Widget */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                   <h3 className="font-black text-[#051C2C] mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
                      <Search size={14} style={{ color: BRAND.colors.secondary }} /> Search
                   </h3>
                   <div className="relative group">
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Keywords..." 
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F26522]/20 transition-all text-slate-700 placeholder:text-slate-400"
                      />
                      {searchQuery ? (
                        <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500">
                           <X size={14} />
                        </button>
                      ) : (
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      )}
                   </div>
                </div>

                {/* Categories Widget */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                   <h3 className="font-black text-[#051C2C] mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
                      <Filter size={14} style={{ color: BRAND.colors.secondary }} /> Categories
                   </h3>
                   <div className="space-y-1">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all group ${
                            activeCategory === cat 
                            ? 'bg-[#051C2C] text-white shadow-md' 
                            : 'text-slate-500 hover:bg-slate-50 hover:text-[#051C2C]'
                          }`}
                        >
                           <span>{cat}</span>
                           <span className={`px-2 py-0.5 rounded-[6px] text-[9px] min-w-[24px] text-center ${
                             activeCategory === cat 
                             ? 'bg-white/20 text-white' 
                             : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                           }`}>
                             {categoryCounts[cat] || 0}
                           </span>
                        </button>
                      ))}
                   </div>
                </div>

                {/* Tags Widget */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hidden md:block">
                   <h3 className="font-black text-[#051C2C] mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
                      <Hash size={14} style={{ color: BRAND.colors.secondary }} /> Trending
                   </h3>
                   <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 10).map(tag => (
                        <button
                          key={tag}
                          onClick={() => { setSearchQuery(tag); setActiveCategory('All'); window.scrollTo(0,0); }}
                          className="text-[9px] font-bold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 hover:bg-[#F26522] hover:text-white transition-colors border border-slate-100"
                        >
                          #{tag}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Newsletter Widget */}
                <div className="bg-gradient-to-br from-[#051C2C] to-[#1a3a5f] p-8 rounded-3xl text-white text-center relative overflow-hidden shadow-lg hidden md:block">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#F26522] rounded-full blur-[50px] opacity-20"></div>
                   <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/10">
                      <Mail size={20} />
                   </div>
                   <h4 className="font-black text-sm mb-2 relative z-10">Stay Informed</h4>
                   <p className="text-[10px] text-white/60 mb-6 relative z-10 leading-relaxed">Weekly Saudi market intelligence delivered to your inbox.</p>
                   <div className="relative z-10 space-y-2">
                      <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all" />
                      <button className="w-full bg-white text-[#051C2C] font-black text-[10px] uppercase tracking-widest py-3 rounded-xl hover:bg-[#F26522] hover:text-white transition-colors">Subscribe</button>
                   </div>
                </div>

             </aside>

             {/* MAIN FEED */}
             <div className="flex-1 w-full min-h-[500px]">
                {filteredPosts.length === 0 ? (
                   <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                         <Search size={32} />
                      </div>
                      <h3 className="text-xl font-black text-[#051C2C] mb-2">No articles found</h3>
                      <p className="text-slate-500 text-xs font-medium">Try adjusting your filters.</p>
                      <button 
                         onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                         className="mt-6 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors"
                      >
                         Clear Filters
                      </button>
                   </div>
                ) : (
                   <div className="space-y-8 animate-in fade-in duration-700">
                      
                      {/* Featured Post (Big Card) */}
                      {featuredPost && (
                        <div 
                          onClick={() => setSelectedPost(featuredPost)}
                          className="group cursor-pointer relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 h-[400px] md:h-[450px] transform hover:scale-[1.01] transition-all duration-500"
                        >
                           <img 
                             src={featuredPost.image} 
                             alt={featuredPost.title} 
                             className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#051C2C] via-[#051C2C]/40 to-transparent"></div>
                           
                           <div className="absolute top-6 left-6 z-10">
                              <span className="bg-[#F26522] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                Featured
                              </span>
                           </div>

                           <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                              <div className="flex items-center gap-4 text-white/70 text-[10px] font-black uppercase tracking-widest mb-4">
                                 <span className="flex items-center gap-1"><Calendar size={12} /> {featuredPost.date}</span>
                                 <span className="hidden md:flex items-center gap-1"><Clock size={12} /> 5 Min Read</span>
                              </div>
                              <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight group-hover:text-[#F2D696] transition-colors">
                                {featuredPost.title}
                              </h2>
                              <p className="text-white/80 text-sm font-medium line-clamp-2 md:line-clamp-2 max-w-2xl leading-relaxed mb-6">
                                {featuredPost.excerpt}
                              </p>
                              <span className="inline-flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest border-b-2 border-[#F26522] pb-1">
                                Read Article <ArrowRight size={14} />
                              </span>
                           </div>
                        </div>
                      )}

                      {/* Grid Posts */}
                      {gridPosts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {gridPosts.map((post) => (
                              <div 
                                key={post.id} 
                                onClick={() => setSelectedPost(post)}
                                className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border border-slate-100 flex flex-col h-full cursor-pointer"
                              >
                                 <div className="h-48 overflow-hidden relative">
                                    <img 
                                      src={post.image} 
                                      alt={post.title} 
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    />
                                    <div className="absolute top-4 left-4">
                                       <span className="backdrop-blur-md bg-black/40 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                                         {post.tags[0]}
                                       </span>
                                    </div>
                                 </div>
                                 <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-3">
                                       <Calendar size={10} style={{ color: BRAND.colors.secondary }} /> {post.date}
                                    </div>
                                    <h3 className="text-lg font-black text-[#051C2C] mb-3 leading-snug group-hover:text-[#F26522] transition-colors line-clamp-2">
                                      {post.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-3 font-medium flex-1">
                                      {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">{post.author.charAt(0)}</div>
                                          {post.author}
                                       </div>
                                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#051C2C] group-hover:text-white transition-all">
                                          <ChevronRight size={14} />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                      )}
                   </div>
                )}
             </div>
          </div>
       </div>

       {/* Article Modal / Reader View */}
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
              className="absolute inset-0 bg-[#051C2C]/90 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
              onClick={() => setSelectedPost(null)}
            ></div>
            
            {/* Modal Content */}
            <div className="bg-white w-full md:max-w-7xl h-[100vh] md:h-[95vh] overflow-hidden rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl relative z-10 animate-in slide-in-from-bottom-12 duration-500 flex flex-col md:flex-row border border-white/10">
               
               {/* Reading Progress Bar */}
               <div className="absolute top-0 left-0 h-1.5 z-[1020] bg-gradient-to-r from-[#F26522] to-[#F2D696] transition-all duration-100 ease-out" style={{ width: `${readingProgress}%` }}></div>

               {/* Modal Close Button */}
               <button 
                 onClick={() => setSelectedPost(null)}
                 className="absolute top-6 right-6 z-[1010] p-3 bg-black/10 hover:bg-[#F26522] rounded-full transition-colors text-white backdrop-blur-md border border-white/20"
               >
                 <X size={20} />
               </button>

               {/* Left Content Area (Scrollable) */}
               <div 
                 ref={articleContentRef}
                 onScroll={handleScroll}
                 className="flex-1 overflow-y-auto custom-scrollbar relative bg-white scroll-smooth"
               >
                  {/* Hero Image */}
                  <div className="h-72 md:h-[500px] relative w-full group">
                     <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-[#051C2C]/60"></div>
                     <button 
                        onClick={() => setSelectedPost(null)}
                        className="absolute top-6 left-6 p-3 bg-white/20 hover:bg-white text-white hover:text-[#051C2C] rounded-full backdrop-blur-md transition-all hidden md:block border border-white/20"
                     >
                        <ArrowLeft size={20} />
                     </button>
                  </div>

                  <div className="px-8 md:px-24 py-12 max-w-5xl mx-auto -mt-32 relative z-10 text-center">
                      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 mb-12 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] opacity-60 pointer-events-none"></div>
                          
                          <div className="relative z-10 text-center">
                            <div className="flex flex-wrap justify-center gap-2 mb-8">
                                {selectedPost.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full bg-slate-50 text-[#051C2C] border border-slate-100 flex items-center gap-1 hover:bg-[#051C2C] hover:text-white transition-colors cursor-default">
                                    <Hash size={10} style={{ color: BRAND.colors.secondary }} /> {tag}
                                </span>
                                ))}
                            </div>
                            
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-8 text-[#051C2C] max-w-4xl mx-auto tracking-tight">
                                {selectedPost.title}
                            </h1>

                            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-slate-500 text-xs font-bold uppercase tracking-widest border-t border-b border-slate-100 py-6">
                                <span className="flex items-center gap-2"><User size={16} style={{ color: BRAND.colors.secondary }} /> {selectedPost.author}</span>
                                <span className="flex items-center gap-2"><Clock size={16} style={{ color: BRAND.colors.secondary }} /> 5 Min Read</span>
                                <span className="flex items-center gap-2"><Calendar size={16} style={{ color: BRAND.colors.secondary }} /> {selectedPost.date}</span>
                            </div>
                          </div>
                      </div>

                      {/* Article Content */}
                      <div className="prose prose-lg prose-slate max-w-none pb-20 text-left">
                        {selectedPost.content.split('\n').map((para, idx) => {
                          if (para.trim().startsWith('**')) {
                            // Headers
                            return (
                              <h3 key={idx} className="text-2xl md:text-3xl mt-12 mb-6 font-black text-[#051C2C] flex items-center gap-4 max-w-2xl mx-auto group">
                                <span className="w-2 h-8 rounded-full transition-all group-hover:h-12" style={{ backgroundColor: BRAND.colors.secondary }}></span>
                                {para.replace(/\*\*/g, '')}
                              </h3>
                            );
                          } else if (para.trim().startsWith('-')) {
                            // Lists
                            return (
                              <div key={idx} className="flex gap-4 mb-4 pl-2 md:pl-6 group max-w-2xl mx-auto">
                                <div className="w-2 h-2 rounded-full mt-2.5 shrink-0 transition-all group-hover:scale-150" style={{ backgroundColor: BRAND.colors.accent }}></div>
                                <p className="text-slate-600 font-medium leading-loose text-lg">
                                  {para.replace('-', '').trim()}
                                </p>
                              </div>
                            );
                          } else if (para.trim() === "") {
                            return <div key={idx} className="h-6"></div>;
                          } else {
                            // Paragraphs
                            return (
                              <p key={idx} className="mb-8 text-lg md:text-xl text-slate-600 font-medium leading-loose max-w-2xl mx-auto">
                                {para}
                              </p>
                            );
                          }
                        })}
                      </div>
                      
                      {/* Author Bio Box */}
                      <div className="mt-8 bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative overflow-hidden max-w-4xl mx-auto">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-[#F26522] rounded-full blur-[60px] opacity-10"></div>
                         <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden shrink-0 mx-auto md:mx-0">
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-400">
                               {selectedPost.author.charAt(0)}
                            </div>
                         </div>
                         <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">About the Author</p>
                            <h4 className="text-2xl font-black mb-2" style={{ color: BRAND.colors.primary }}>{selectedPost.author}</h4>
                            <p className="text-sm text-slate-500 font-medium max-w-lg">Senior Strategy Consultant at SafaArban. Specializing in {selectedPost.tags[0]} and regulatory frameworks within the Kingdom.</p>
                         </div>
                      </div>

                      {/* Related Articles Section */}
                      {relatedPosts.length > 0 && (
                        <div className="mt-24 pt-16 border-t border-slate-100">
                            <h3 className="text-2xl font-black text-[#051C2C] mb-8 text-center uppercase tracking-tight">Related Intelligence</h3>
                            <div className="grid md:grid-cols-2 gap-8 text-left">
                                {relatedPosts.map(post => (
                                    <div 
                                      key={post.id} 
                                      onClick={() => { setSelectedPost(post); articleContentRef.current?.scrollTo(0,0); }}
                                      className="group cursor-pointer bg-white rounded-3xl p-4 border border-slate-100 hover:shadow-xl transition-all"
                                    >
                                        <div className="h-48 rounded-2xl overflow-hidden mb-4 relative">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <h4 className="text-lg font-bold text-[#051C2C] mb-2 leading-tight group-hover:text-[#F26522] transition-colors line-clamp-2">{post.title}</h4>
                                        <p className="text-xs text-slate-500 line-clamp-2 mb-4">{post.excerpt}</p>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 group-hover:gap-3 transition-all">Read Analysis <ArrowRight size={12} /></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                      )}
                  </div>
               </div>

               {/* Right Sidebar: Sticky Service CTA */}
               <div className="md:w-[400px] bg-slate-50 border-l border-slate-200 flex flex-col shrink-0 relative z-20 hidden lg:flex">
                  <div className="p-8 border-b border-slate-200 bg-white">
                     <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Share & Save</span>
                        <div className="flex gap-2">
                           <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-[#051C2C] transition-colors"><Bookmark size={18} /></button>
                           <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-[#051C2C] transition-colors"><Copy size={18} /></button>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-xl border border-slate-200 flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all text-slate-500">
                            <Linkedin size={16} /> <span className="text-xs font-bold">Share</span>
                        </button>
                        <button className="flex-1 py-2 rounded-xl border border-slate-200 flex items-center justify-center gap-2 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 transition-all text-slate-500">
                            <Twitter size={16} /> <span className="text-xs font-bold">Tweet</span>
                        </button>
                     </div>
                  </div>

                  <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                     {getRelatedService(selectedPost.id) ? (
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 sticky top-0 group hover:border-[#F26522]/30 transition-all duration-500">
                           <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg" style={{ backgroundColor: BRAND.colors.primary, color: BRAND.colors.secondary }}>
                              <Plus size={28} />
                           </div>
                           
                           <span className="text-[10px] font-black uppercase tracking-widest mb-4 block" style={{ color: BRAND.colors.accent }}>Recommended Service</span>
                           
                           <h4 className="text-2xl font-black mb-3 leading-tight" style={{ color: BRAND.colors.primary }}>
                              {getRelatedService(selectedPost.id)?.name}
                           </h4>
                           <p className="text-xs text-slate-500 mb-8 font-medium leading-relaxed">
                              {getRelatedService(selectedPost.id)?.desc}
                           </p>
                           
                           <div className="mb-8 pb-8 border-b border-slate-100">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Professional Fee</p>
                              <p className="text-4xl font-black mt-2 tracking-tight" style={{ color: BRAND.colors.primary }}>
                                 {getRelatedService(selectedPost.id)?.professionalFee.toLocaleString()} <span className="text-sm text-slate-400 font-bold">SAR</span>
                              </p>
                           </div>

                           {onAddToCart && (
                             <button 
                               onClick={() => {
                                 const s = getRelatedService(selectedPost.id);
                                 if (s) onAddToCart(s.id);
                               }}
                               disabled={cart.includes(getRelatedService(selectedPost.id)!.id)}
                               className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${
                                 cart.includes(getRelatedService(selectedPost.id)!.id)
                                 ? 'text-white cursor-default bg-emerald-500 shadow-none'
                                 : 'text-white shadow-xl hover:shadow-2xl hover:-translate-y-1'
                               }`}
                               style={{ 
                                 backgroundColor: cart.includes(getRelatedService(selectedPost.id)!.id) ? undefined : BRAND.colors.secondary
                               }}
                             >
                               {cart.includes(getRelatedService(selectedPost.id)!.id) ? <><Check size={18} /> Added to Quote</> : <><Plus size={18} /> Add Service</>}
                             </button>
                           )}
                        </div>
                     ) : (
                        <div className="bg-[#051C2C] p-10 rounded-[2.5rem] text-white text-center shadow-xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[#F26522] rounded-full blur-[60px] opacity-20"></div>
                           <h4 className="font-black text-xl mb-4 relative z-10">Need Custom Advice?</h4>
                           <p className="text-xs text-white/60 mb-8 font-medium leading-relaxed relative z-10">Our consultants are available to discuss the specifics of this article and tailor a solution for you.</p>
                           <button className="w-full py-4 bg-white text-[#051C2C] rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#F26522] hover:text-white transition-all relative z-10">
                              Book Consultation
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
       )}
    </div>
  );
};

export default Blog;
