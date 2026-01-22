import React from 'react';
import { BRAND } from '../constants';

interface BlogSkeletonProps {
  variant?: 'hero' | 'standard';
}

export const BlogSkeleton: React.FC<BlogSkeletonProps> = ({ variant = 'standard' }) => {
  if (variant === 'hero') {
    return (
      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 grid lg:grid-cols-2 h-[400px] animate-pulse relative">
        <div className="bg-slate-200 h-full relative overflow-hidden">
           <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        <div className="p-14 flex flex-col justify-center space-y-6 bg-white relative overflow-hidden">
           <div className="h-4 w-32 bg-slate-200 rounded-full"></div>
           <div className="h-12 w-3/4 bg-slate-200 rounded-xl"></div>
           <div className="space-y-3">
              <div className="h-4 w-full bg-slate-100 rounded-full"></div>
              <div className="h-4 w-full bg-slate-100 rounded-full"></div>
              <div className="h-4 w-2/3 bg-slate-100 rounded-full"></div>
           </div>
           <div className="h-10 w-40 rounded-full mt-4" style={{ backgroundColor: `${BRAND.colors.secondary}33` }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 h-full flex flex-col animate-pulse relative">
      <div className="h-64 bg-slate-200 relative overflow-hidden">
         <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
      <div className="p-8 flex-1 flex flex-col space-y-5">
        <div className="flex gap-4">
          <div className="h-3 w-20 bg-slate-200 rounded-full" />
          <div className="h-3 w-24 bg-slate-200 rounded-full" />
        </div>
        <div className="h-8 w-4/5 bg-slate-300 rounded-lg" />
        <div className="space-y-3 flex-1 pt-2">
          <div className="h-3 w-full bg-slate-100 rounded-full" />
          <div className="h-3 w-full bg-slate-100 rounded-full" />
          <div className="h-3 w-3/4 bg-slate-100 rounded-full" />
        </div>
        <div className="h-4 w-32 rounded-full mt-2" style={{ backgroundColor: `${BRAND.colors.secondary}33` }} />
      </div>
    </div>
  );
};

export const ServiceSkeleton: React.FC = () => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 h-full flex flex-col justify-between animate-pulse relative overflow-hidden">
    {/* Shimmer Overlay */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[#F8F9FA] to-transparent z-10 pointer-events-none"></div>
    
    <div>
      <div className="flex justify-between items-start mb-8">
        <div className="w-16 h-16 rounded-2xl bg-slate-200" />
        <div className="flex flex-col items-end gap-3">
          <div className="h-3 w-24 bg-slate-200 rounded-full" />
          <div className="h-10 w-32 bg-slate-300 rounded-xl" />
        </div>
      </div>
      <div className="h-4 w-20 bg-slate-100 rounded-md mb-4" />
      <div className="h-8 w-3/4 bg-slate-800 rounded-lg mb-6" />
      <div className="space-y-3 mb-8">
        <div className="h-3 w-full bg-slate-100 rounded-full" />
        <div className="h-3 w-5/6 bg-slate-100 rounded-full" />
        <div className="h-3 w-4/6 bg-slate-100 rounded-full" />
      </div>
      <div className="h-4 w-32 rounded-full" style={{ backgroundColor: `${BRAND.colors.secondary}33` }} />
    </div>
    <div className="mt-8 pt-8 border-t border-slate-50">
      <div className="w-full h-16 rounded-2xl bg-slate-200" />
    </div>
  </div>
);