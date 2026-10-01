import React from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { Megaphone, Calendar, User, MapPin, Sparkles, FileCheck2 } from 'lucide-react';

export const GuestPortal: React.FC = () => {
  const { announcements, largeTextMode, setActiveTab } = useBarangay();

  const publicAnnouncements = announcements.filter(a => a.category !== 'Emergency');

  return (
    <div className={`space-y-8 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      
      {/* Warm Civic Hero Section (Aligned with Citizen Portal) */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-10 shadow-xl overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Digital Service Portal • Guest Access</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
            Welcome, Guest!
          </h1>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Access public advisories, file anonymous reports, or verify documents. For complete civic services like document requests and appointments, please log in or register a resident account.
          </p>
        </div>

        {/* Live Operational Status strip */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Barangay Hall Status</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Open • Mon - Fri (8AM-5PM)
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">On-Site Queue Load</span>
            <span className="font-bold text-amber-300 mt-0.5 block">
              Normal (~8-12 min wait)
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Next Health Mission</span>
            <span className="font-bold text-slate-200 mt-0.5 block">
              Fri: Senior Flu Vaccines
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Emergency Patrol</span>
            <span className="font-bold text-rose-300 mt-0.5 block">
              Tanod 24/7 Hotline Ready
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions for Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <button 
          onClick={() => setActiveTab('qr_verify')}
          className="flex flex-col text-left p-6 sm:p-8 bg-indigo-50/40 rounded-[2rem] border-2 border-indigo-200 shadow-xs hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xs border border-indigo-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <FileCheck2 className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-200">
              Anti-Fraud
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-700 transition-colors">Verify Document</h3>
            <p className="text-sm text-slate-600">Scan or enter a QR verification code to check legal document authenticity.</p>
          </div>
        </button>
        
        <button 
          onClick={() => setActiveTab('ai_assistant')}
          className="flex flex-col text-left p-6 sm:p-8 bg-gradient-to-br from-emerald-50 to-teal-50/60 rounded-[2rem] border-2 border-emerald-300 shadow-xs hover:shadow-xl hover:border-emerald-500 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xs border border-emerald-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
              24/7 AI Guide
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors">Ask Ka-Barangay AI</h3>
            <p className="text-sm text-slate-600">Instant answers to document requirements, fees, and office hours.</p>
          </div>
        </button>

        <button 
          onClick={() => setActiveTab('file_report')}
          className="flex flex-col text-left p-6 sm:p-8 bg-amber-50/40 rounded-[2rem] border-2 border-amber-200 shadow-xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xs border border-amber-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <Megaphone className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
              Monitored
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-amber-700 transition-colors">File Report</h3>
            <p className="text-sm text-slate-600">Submit an anonymous incident or community concern.</p>
          </div>
        </button>

        <button 
          onClick={() => setActiveTab('report_status')}
          className="flex flex-col text-left p-6 sm:p-8 bg-blue-50/40 rounded-[2rem] border-2 border-blue-200 shadow-xs hover:shadow-xl hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xs border border-blue-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <FileCheck2 className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
              Tracking
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">Report Status</h3>
            <p className="text-sm text-slate-600">Track the progress of your submitted incident reports.</p>
          </div>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Megaphone className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-800 font-heading">Public Advisories</h2>
        </div>
        
        <div className="space-y-4">
          {publicAnnouncements.map((anc) => (
            <div key={anc.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                  anc.isUrgent ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {anc.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
                  <Calendar className="w-3.5 h-3.5" />
                  {anc.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{anc.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{anc.content}</p>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
                  <User className="w-3.5 h-3.5" />
                  {anc.author}
                </span>
                {anc.targetPurok && (
                  <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {anc.targetPurok}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {publicAnnouncements.length === 0 && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 shadow-sm">
              <Megaphone className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="font-medium text-sm">No active advisories at this time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
