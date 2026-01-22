
import React, { useState } from 'react';
import { Search, BookOpen, Volume2 } from 'lucide-react';
import { GLOSSARY_DB, BRAND } from '../constants';

const ALPHABET = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filteredTerms = GLOSSARY_DB.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.arabic.includes(searchTerm) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLetter = activeLetter 
      ? activeLetter === '#' ? !/^[A-Z]/.test(item.term.charAt(0).toUpperCase()) : item.term.toUpperCase().startsWith(activeLetter)
      : true;

    return matchesSearch && matchesLetter;
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="bg-slate-50 min-h-[600px] py-12">
       <div className="max-w-7xl mx-auto px-6">
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-8 mb-12 items-center">
             <div className="relative w-full md:w-96 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C9A86A] transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Search terms (e.g. 'Iqama')..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border-none rounded-full py-4 pl-14 pr-10 text-sm font-bold shadow-xl shadow-slate-200/50 outline-none focus:ring-2 transition-all placeholder:text-slate-400"
                  style={{ color: BRAND.colors.primary, '--tw-ring-color': `${BRAND.colors.secondary}33` } as React.CSSProperties}
                />
             </div>
             
             <div className="flex-1 overflow-x-auto w-full no-scrollbar">
                <div className="flex gap-2">
                   <button 
                     onClick={() => setActiveLetter(null)}
                     className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                       activeLetter === null ? 'text-white' : 'bg-white text-slate-400'
                     }`}
                     style={{ 
                         backgroundColor: activeLetter === null ? BRAND.colors.primary : 'white',
                         color: activeLetter === null ? 'white' : undefined 
                     }}
                   >
                     All
                   </button>
                   {ALPHABET.map(letter => (
                     <button
                       key={letter}
                       onClick={() => setActiveLetter(letter)}
                       className={`w-8 h-8 rounded-full text-[10px] font-black flex items-center justify-center transition-all flex-shrink-0 ${
                         activeLetter === letter ? 'text-[#0A1A2F]' : 'bg-white text-slate-400'
                       }`}
                       style={{ 
                           backgroundColor: activeLetter === letter ? BRAND.colors.secondary : 'white',
                           color: activeLetter === letter ? BRAND.colors.primary : undefined
                       }}
                     >
                       {letter}
                     </button>
                   ))}
                </div>
             </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredTerms.map((item) => (
               <div key={item.id} className="group bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-2xl transition-all relative overflow-hidden"
                    style={{ borderColor: 'transparent' }}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = `${BRAND.colors.secondary}4D`}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
               >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#006C35] rounded-full blur-[50px] opacity-0 group-hover:opacity-5 transition-opacity"></div>
                  
                  <div className="flex justify-between items-start mb-4">
                     <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                       item.category === 'Immigration' ? 'bg-purple-100 text-purple-700' :
                       item.category === 'HR' ? 'bg-blue-100 text-blue-700' :
                       item.category === 'Legal' ? 'bg-amber-100 text-amber-700' :
                       'bg-slate-100 text-slate-600'
                     }`}>
                       {item.category}
                     </span>
                     <Volume2 size={16} className="text-slate-300 hover:text-[#006C35] cursor-pointer transition-colors" />
                  </div>

                  <h3 className="text-2xl font-black mb-1" style={{ color: BRAND.colors.primary }}>{item.term}</h3>
                  <div className="flex items-center gap-3 mb-6">
                     <span className="text-lg font-arabic text-[#006C35]">{item.arabic}</span>
                     {item.phonetic && <span className="text-xs text-slate-400 font-mono">/{item.phonetic}/</span>}
                  </div>

                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                     {item.definition}
                  </p>
               </div>
             ))}
          </div>

          {filteredTerms.length === 0 && (
             <div className="text-center py-24">
                <BookOpen size={48} className="text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-bold">No terms found matching your criteria.</p>
             </div>
          )}

       </div>
    </div>
  );
};

export default Glossary;
