import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-8">
      {/* Top Banner Skeleton */}
      <div className="relative overflow-hidden h-32 sm:h-40 bg-slate-100 rounded-[2rem] w-full border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      </div>
      
      {/* Main Grid Layout Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative overflow-hidden h-8 bg-slate-100 rounded-xl w-1/3 border border-slate-200/50">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            </div>
            <div className="relative overflow-hidden h-8 bg-slate-100 rounded-xl w-24 border border-slate-200/50">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            </div>
          </div>
          
          {/* Content Cards */}
          <div className="relative overflow-hidden h-48 bg-slate-100 rounded-[2rem] w-full border border-slate-200/50 shadow-sm">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
          <div className="relative overflow-hidden h-48 bg-slate-100 rounded-[2rem] w-full border border-slate-200/50 shadow-sm">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
        </div>
        
        {/* Sidebar Area */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative overflow-hidden h-8 bg-slate-100 rounded-xl w-1/2 mb-4 border border-slate-200/50">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
          <div className="relative overflow-hidden h-72 bg-slate-100 rounded-[2rem] w-full border border-slate-200/50 shadow-sm">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
          <div className="relative overflow-hidden h-40 bg-slate-100 rounded-[2rem] w-full border border-slate-200/50 shadow-sm">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
