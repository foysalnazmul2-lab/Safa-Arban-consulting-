
import React, { useState, useMemo } from 'react';
import ServiceCard from './ServiceCard';
import ServiceListRow from './ServiceListRow';
import { ServiceSkeleton } from './Skeletons';
import EntityComparator from './EntityComparator';
import { SERVICES_DB, BRAND } from '../constants';
import { ServiceCategory } from '../types';
import { Search, SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react';

interface ServicesPageProps {
  cart: string[];
  toggleCartItem: (id: string) => void;
  isLoading: boolean;
  onServiceClick?: (id: string) => void;
  currency?: 'SAR' | 'USD';
}

const ServicesPage: React.FC<ServicesPageProps> = ({ cart, toggleCartItem, isLoading, onServiceClick, currency = 'SAR' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // Default to LIST view

  const categories: (ServiceCategory | 'All')[] = useMemo(() => {
    const priority = ['Company Formation & Registration', 'Premium & Special'];
    const cats = Array.from(new Set(SERVICES_DB.map(s => s.category as ServiceCategory)));
    
    const sortedCats = cats.sort((a, b) => {
        const idxA = priority.indexOf(a);
        const idxB = priority.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
    });

    return ['All', ...sortedCats];
  }, []);

  const filteredServices = useMemo(() => {
    return SERVICES_DB.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            service.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
       {/* Hero / Header - Premium Dark Mode */}
       <div className="text-white pt-24 pb-32 relative overflow-hidden" style={{ backgroundColor: BRAND.colors.primary }}>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: BRAND.colors.secondary }}></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
             <span className="font-black uppercase tracking-[0.3em] text-[10px] block mb-4" style={{ color: BRAND.colors.secondary }}>Official Fees</span>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Investment Catalog</h2>
             <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium">Select the operational modules required for your Saudi expansion.</p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
          {/* Floating Control Bar */}
          <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4 mb-12 backdrop-blur-xl" style={{ boxShadow: `0 25px 50px -12px ${BRAND.colors.primary}1A` }}>
             <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
                
                {/* Search Input */}
                <div className="relative w-full xl:w-96 group">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 transition-colors" size={20} style={{ color: searchQuery ? BRAND.colors.secondary : undefined }} />
                   <input 
                     type="text" 
                     placeholder="Search licenses, visas..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full bg-[#F8F9FA] border-none rounded-full py-4 pl-14 pr-10 text-sm font-bold focus:ring-2 outline-none transition-all placeholder:text-slate-400"
                     style={{ color: BRAND.colors.primary }}
                   />
                   {searchQuery && (
                     <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors">
                       <X size={16} />
                     </button>
                   )}
                </div>

                {/* View Toggle & Categories */}
                <div className="flex items-center gap-4 w-full overflow-hidden">
                   {/* View Toggle */}
                   <div className="flex bg-[#F8F9FA] p-1 rounded-full shrink-0">
                      <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2.5 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-[#051C2C]' : 'text-slate-400 hover:text-[#051C2C]'}`}
                        title="Grid View"
                      >
                         <LayoutGrid size={18} />
                      </button>
                      <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-[#051C2C]' : 'text-slate-400 hover:text-[#051C2C]'}`}
                        title="List View"
                      >
                         <List size={18} />
                      </button>
                   </div>

                   <div className="w-px h-8 bg-slate-100 shrink-0"></div>

                   {/* Categories Scroll */}
                   <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 scroll-smooth">
                     {categories.map(cat => (
                       <button
                         key={cat}
                         onClick={() => setActiveCategory(cat)}
                         className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 ${
                           activeCategory === cat 
                           ? 'text-white shadow-lg' 
                           : 'bg-[#F8F9FA] text-slate-500 hover:bg-slate-100'
                         }`}
                         style={activeCategory === cat ? { backgroundColor: BRAND.colors.primary } : {}}
                       >
                         {cat}
                       </button>
                     ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Results Area */}
          <div className="min-h-[500px] pb-24">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                 {Array.from({ length: 6 }).map((_, i) => <ServiceSkeleton key={i} />)}
              </div>
            ) : filteredServices.length > 0 ? (
               viewMode === 'grid' ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in slide-in-from-bottom-8 duration-500">
                    {filteredServices.map(service => (
                      <ServiceCard 
                        key={service.id}
                        service={service}
                        isInCart={cart.includes(service.id)}
                        onToggle={() => toggleCartItem(service.id)}
                        onViewDetails={() => onServiceClick && onServiceClick(service.id)}
                        currency={currency}
                      />
                    ))}
                 </div>
               ) : (
                 <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
                    <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                       <span className="text-xs font-black uppercase tracking-widest text-slate-400">Service Description</span>
                       <span className="text-xs font-black uppercase tracking-widest text-slate-400 mr-20">Price Estimate</span>
                    </div>
                    {filteredServices.map(service => (
                      <ServiceListRow
                        key={service.id}
                        service={service}
                        isInCart={cart.includes(service.id)}
                        onToggle={() => toggleCartItem(service.id)}
                        onViewDetails={() => onServiceClick && onServiceClick(service.id)}
                        currency={currency}
                      />
                    ))}
                 </div>
               )
            ) : (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                   <Search size={40} />
                </div>
                <h3 className="text-2xl font-black mb-2" style={{ color: BRAND.colors.primary }}>No Services Found</h3>
                <p className="text-slate-500 text-sm mb-8">Try adjusting your search terms or filters.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:opacity-90 transition-colors"
                  style={{ backgroundColor: BRAND.colors.secondary, color: BRAND.colors.primary }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
          
          {/* Entity Comparator at bottom */}
          <div className="mb-12">
             <EntityComparator />
          </div>
       </div>
    </div>
  );
};

export default ServicesPage;
