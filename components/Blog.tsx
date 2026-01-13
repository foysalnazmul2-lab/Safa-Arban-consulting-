
import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';
import { Calendar, User, Tag, ArrowRight, X, Clock } from 'lucide-react';

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
             <span className="text-[#006C35] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-4">Investment Insights</span>
             <h2 className="text-3xl md:text-5xl font-black text-[#0A1A2F] tracking-tight mb-6">Navigating the <br className="hidden sm:block" />Saudi Market</h2>
             <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">Expert analysis, regulatory updates, and strategic guides for establishing your presence in the Kingdom.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
             {BLOG_POSTS.map((post) => (
                <div key={post.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-100 group flex flex-col h-full">
                   <div className="h-56 md:h-64 overflow-hidden relative">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                         {post.tags.slice(0, 2).map(tag => (
                           <span key={tag} className="bg-[#0A1A2F]/90 text-[#C9A86A] text-[8px] md:text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md">
                             {tag}
                           </span>
                         ))}
                      </div>
                   </div>
                   <div className="p-6 md:p-8 flex-1 flex flex-col">
                      <div className="flex flex-wrap items-center gap-3 md:gap-4 text-slate-400 text-[10px] md:text-xs font-bold mb-4 uppercase tracking-wider">
                         <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                         <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-[#0A1A2F] mb-4 leading-tight group-hover:text-[#F06543] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-6 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <button 
                        onClick={() => setSelectedPost(post)}
                        className="flex items-center gap-2 text-[#006C35] font-black uppercase tracking-widest text-[10px] md:text-xs hover:gap-4 transition-all"
                      >
                        Read Article <ArrowRight size={16} />
                      </button>
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* Article Modal */}
       {selectedPost && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
            <div className="absolute inset-0 bg-[#0A1A2F]/80 backdrop-blur-md transition-opacity" onClick={() => setSelectedPost(null)}></div>
            <div className="bg-white w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto rounded-3xl md:rounded-[3rem] shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 flex flex-col">
               <button 
                 onClick={() => setSelectedPost(null)}
                 className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-white/20 hover:bg-white text-white hover:text-[#0A1A2F] rounded-full backdrop-blur-md transition-all z-20"
               >
                 <X size={20} md:size={24} />
               </button>

               <div className="h-64 md:h-96 relative shrink-0">
                  <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-[#0A1A2F]/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white w-full">
                      <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto no-scrollbar pb-2">
                         {selectedPost.tags.map(tag => (
                           <span key={tag} className="bg-[#F06543] text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg whitespace-nowrap">
                             {tag}
                           </span>
                         ))}
                      </div>
                      <h2 className="text-2xl md:text-5xl font-black leading-tight mb-4 md:mb-6 drop-shadow-lg max-w-3xl">{selectedPost.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 md:gap-8 text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                         <span className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-lg backdrop-blur-sm"><Calendar size={14} className="text-[#C9A86A]" /> {selectedPost.date}</span>
                         <span className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-lg backdrop-blur-sm"><Clock size={14} className="text-[#C9A86A]" /> 5 Min Read</span>
                      </div>
                  </div>
               </div>

               <div className="p-6 md:p-16 bg-white">
                  <div className="max-w-3xl mx-auto">
                     {selectedPost.content.split('\n').map((para, idx) => {
                       if (para.trim().startsWith('**')) {
                         return (
                           <h3 key={idx} className="text-xl md:text-2xl font-black text-[#0A1A2F] mt-8 md:mt-12 mb-4 md:mb-6 tracking-tight leading-tight border-l-4 border-[#C9A86A] pl-4">
                             {para.replace(/\*\*/g, '')}
                           </h3>
                         );
                       } else if (para.trim().startsWith('-')) {
                         return (
                           <li key={idx} className="ml-2 md:ml-6 list-none text-slate-600 mb-4 pl-2 relative leading-relaxed md:leading-loose text-base md:text-lg flex items-start gap-3">
                             <div className="w-1.5 h-1.5 bg-[#006C35] rounded-full mt-2.5 shrink-0"></div>
                             {para.replace('-', '').trim()}
                           </li>
                         );
                       } else if (para.trim() === "") {
                         return <div key={idx} className="h-4"></div>;
                       } else {
                         return (
                           <p key={idx} className="text-base md:text-lg text-slate-600 leading-relaxed mb-6 font-medium">
                             {para}
                           </p>
                         );
                       }
                     })}
                  </div>
                  
                  <div className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 max-w-3xl mx-auto">
                     <div className="flex items-center gap-4 md:gap-5">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0A1A2F] rounded-full flex items-center justify-center text-[#C9A86A] font-black text-xl md:text-2xl shadow-xl">
                          {selectedPost.author.charAt(0)}
                        </div>
                        <div>
                           <p className="text-xs md:text-sm font-black uppercase tracking-widest text-[#0A1A2F] mb-1">{selectedPost.author}</p>
                           <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">Expert Contributor</p>
                        </div>
                     </div>
                     <button 
                       onClick={() => setSelectedPost(null)}
                       className="px-8 md:px-10 py-3 md:py-4 bg-[#F06543] text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#0A1A2F] transition-all shadow-lg hover:shadow-xl w-full md:w-auto"
                     >
                       Close Article
                     </button>
                  </div>
               </div>
            </div>
         </div>
       )}
    </div>
  );
};

export default Blog;
