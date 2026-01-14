
import React from 'react';

export const BlogSkeleton = () => (
  <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 h-full flex flex-col animate-pulse">
    <div className="h-56 md:h-64 bg-slate-200" />
    <div className="p-6 md:p-8 flex-1 flex flex-col space-y-4">
      <div className="flex gap-4">
        <div className="h-3 w-24 bg-slate-200 rounded-full" />
        <div className="h-3 w-32 bg-slate-200 rounded-full" />
      </div>
      <div className="h-8 w-3/4 bg-slate-200 rounded-lg" />
      <div className="space-y-3 flex-1 pt-2">
        <div className="h-3 w-full bg-slate-200 rounded-full" />
        <div className="h-3 w-full bg-slate-200 rounded-full" />
        <div className="h-3 w-2/3 bg-slate-200 rounded-full" />
      </div>
      <div className="h-4 w-32 bg-slate-200 rounded-full mt-4" />
    </div>
  </div>
);

export const ServiceSkeleton = () => (
  <div className="bg-white p-8 rounded-[3rem] border border-slate-100 h-full flex flex-col justify-between animate-pulse">
    <div>
      <div className="flex justify-between items-start mb-8">
        <div className="w-14 h-14 rounded-2xl bg-slate-200" />
        <div className="flex flex-col items-end gap-2">
          <div className="h-3 w-20 bg-slate-200 rounded-full" />
          <div className="h-8 w-32 bg-slate-200 rounded-lg" />
        </div>
      </div>
      <div className="h-8 w-3/4 bg-slate-200 rounded-lg mb-4" />
      <div className="space-y-3 mb-6">
        <div className="h-3 w-full bg-slate-200 rounded-full" />
        <div className="h-3 w-5/6 bg-slate-200 rounded-full" />
        <div className="h-3 w-4/6 bg-slate-200 rounded-full" />
      </div>
      <div className="h-4 w-40 bg-slate-200 rounded-full" />
    </div>
    <div className="mt-8 pt-8 border-t border-slate-50">
      <div className="w-full h-14 rounded-[2rem] bg-slate-200" />
    </div>
  </div>
);
