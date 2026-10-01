import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { IncidentCategory } from '../../types';
import { AlertTriangle, Send, CheckCircle2 } from 'lucide-react';

export const GuestReportIncident: React.FC = () => {
  const { createIncidentReport } = useBarangay();

  // Form states
  const [category, setCategory] = useState<IncidentCategory>('Noise Disturbance');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [purok, setPurok] = useState<string>('Purok 1');
  const [incidentDateTime, setIncidentDateTime] = useState<string>(
    new Date().toISOString().substring(0, 16).replace('T', ' ')
  );
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');

  const categories: IncidentCategory[] = [
    'Noise Disturbance',
    'Neighbor Dispute',
    'Sanitation & Garbage',
    'Public Safety / Streetlight',
    'Stray Animal Concern',
    'Drainage / Flooding',
    'Other Community Concern'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim()) {
      alert('Please fill out the title, description, and location of the incident.');
      return;
    }

    const created = createIncidentReport({
      category,
      title,
      description,
      location,
      purok,
      incidentDateTime,
      isAnonymous: true,
      reporterName: 'Anonymous Guest',
      reporterContact: 'Not Provided'
    });

    setSubmittedRef(created.referenceNumber);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto mt-4">
      <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading tracking-tight">File Anonymous Report</h2>
            <p className="text-xs text-slate-500 font-medium">Forwarded to Peace & Order Council</p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center text-center space-y-4 py-16 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-heading tracking-tight">Successfully Submitted</h3>
              <p className="text-sm text-slate-500 mb-1 max-w-sm mx-auto">Your anonymous report has been securely forwarded to the Barangay authorities.</p>
              <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl inline-flex items-center gap-2 mt-4 shadow-sm">
                <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Reference Code</span>
                <span className="text-sm font-mono font-bold text-slate-800">{submittedRef}</span>
              </div>
              <p className="text-xs text-rose-500 mt-3 max-w-xs mx-auto font-medium">Please save this reference code. You can use it to track the status of your report.</p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setTitle('');
                setDescription('');
                setLocation('');
              }}
              className="mt-8 px-8 py-3 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            >
              File Another Report
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50/30 border border-amber-200/60 rounded-2xl p-5 flex gap-4 text-amber-900 text-xs font-medium leading-relaxed shadow-sm">
              <div className="bg-amber-100 text-amber-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <p className="pt-0.5 text-sm sm:text-xs">
                This portal is strictly <strong className="font-bold text-amber-700">anonymous</strong>. We do not collect your personal details. Save the reference code given after submission to track your report.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Incident Category <span className="text-rose-500">*</span></label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as IncidentCategory)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none shadow-sm transition-all"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date & Time <span className="text-rose-500">*</span></label>
                <input
                  type="datetime-local"
                  value={incidentDateTime}
                  onChange={(e) => setIncidentDateTime(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none shadow-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Brief Summary <span className="text-rose-500">*</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Loud Videoke past 12 Midnight"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none placeholder-slate-400 shadow-sm transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Specific Location <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Street name or landmark"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none placeholder-slate-400 shadow-sm transition-all"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Purok (If known)</label>
                <select
                  value={purok}
                  onChange={(e) => setPurok(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none shadow-sm transition-all"
                >
                  <option value="Not Sure">Not Sure</option>
                  {[1, 2, 3, 4, 5, 6, 7].map(num => (
                    <option key={num} value={`Purok ${num}`}>Purok {num}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Detailed Description <span className="text-rose-500">*</span></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe exactly what happened..."
                className="w-full h-32 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none resize-none placeholder-slate-400 shadow-sm transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-4 rounded-xl font-bold text-sm shadow-xl shadow-emerald-600/20 transition-all duration-300 hover:shadow-emerald-600/30 active:scale-[0.98] cursor-pointer mt-4"
            >
              <Send className="w-4 h-4" />
              Submit Anonymous Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
