import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { Search, Clock, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { IncidentReport } from '../../types';

export const GuestReportStatus: React.FC = () => {
  const { incidentReports } = useBarangay();
  const [reference, setReference] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [foundReport, setFoundReport] = useState<IncidentReport | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = reference.trim().toUpperCase();
    if (!ref) return;

    const report = incidentReports.find(r => r.referenceNumber === ref);
    setFoundReport(report || null);
    setHasSearched(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'dismissed': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200'; // pending
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'dismissed': return <ShieldAlert className="w-5 h-5 text-slate-600" />;
      default: return <Clock className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 space-y-6">
      <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading tracking-tight">Check Report Status</h2>
              <p className="text-xs text-slate-500 font-medium">Track your anonymous incident report</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value.toUpperCase())}
                placeholder="Enter Reference Code (e.g. INC-2026-1234)"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-mono font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none uppercase placeholder-slate-400 transition-all shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer shrink-0"
            >
              Track Status
            </button>
          </form>
        </div>
      </div>

      {hasSearched && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {foundReport ? (
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 shrink-0">
                    <FileText className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Reference Code</p>
                    <p className="text-sm font-mono font-bold text-slate-900">{foundReport.referenceNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-xs uppercase tracking-wider bg-white shadow-sm">
                  {getStatusIcon(foundReport.status)}
                  <span className={`px-2 py-0.5 rounded-md ${getStatusColor(foundReport.status)}`}>
                    {foundReport.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Title & Category</p>
                  <h3 className="text-lg font-bold text-slate-900">{foundReport.title}</h3>
                  <p className="text-sm text-slate-600">{foundReport.category}</p>
                </div>
                
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Description</p>
                  <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed whitespace-pre-wrap">
                    {foundReport.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-sm font-medium text-slate-800">{foundReport.location} ({foundReport.purok})</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Date Reported</p>
                    <p className="text-sm font-medium text-slate-800">{new Date(foundReport.dateReported).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] p-8 text-center border border-slate-100 shadow-md">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Record Not Found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                We couldn't find an incident report with the reference code "{reference}". Please check the code and try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
