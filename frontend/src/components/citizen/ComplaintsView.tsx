import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { IncidentCategory, IncidentReport } from '../../types';
import { 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar, 
  User, 
  ShieldAlert, 
  Paperclip,
  Search,
  ChevronRight,
  Info
} from 'lucide-react';

export const ComplaintsView: React.FC = () => {
  const { 
    incidents, 
    createIncidentReport, 
    currentUser, 
    largeTextMode 
  } = useBarangay();

  const [activeTabSub, setActiveTabSub] = useState<'submit' | 'history'>('submit');

  // Form states
  const [category, setCategory] = useState<IncidentCategory>('Noise Disturbance');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [purok, setPurok] = useState<string>('Purok 2 - Riverside');
  const [incidentDateTime, setIncidentDateTime] = useState<string>(
    new Date().toISOString().substring(0, 16).replace('T', ' ')
  );
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [searchRef, setSearchRef] = useState<string>('');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(incidents[0]?.id || '');
  const [showMobileDetail, setShowMobileDetail] = useState<boolean>(false);

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
      isAnonymous,
      reporterName: isAnonymous ? 'Anonymous Resident' : currentUser.name,
      reporterContact: isAnonymous ? '' : currentUser.email
    });

    // Reset form & switch to history
    setTitle('');
    setDescription('');
    setLocation('');
    setSelectedIncidentId(created.id);
    setActiveTabSub('history');
  };

  const filteredIncidents = incidents.filter((inc) => {
    if (searchRef.trim()) {
      return (
        inc.referenceNumber.toLowerCase().includes(searchRef.toLowerCase()) ||
        inc.title.toLowerCase().includes(searchRef.toLowerCase()) ||
        inc.location.toLowerCase().includes(searchRef.toLowerCase())
      );
    }
    return true;
  });

  const activeIncident = incidents.find(i => i.id === selectedIncidentId) || filteredIncidents[0];

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Civic Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Community Peace & Order Desk</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Complaints, Incidents & Community Concerns
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Submit community concerns or track barangay action and mediation progress. Intended for administrative tracking and amicable community resolution.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex w-full sm:w-auto bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTabSub('submit')}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTabSub === 'submit'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            File New Report
          </button>
          <button
            onClick={() => { setActiveTabSub('history'); setShowMobileDetail(false); }}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTabSub === 'history'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Track Reports ({incidents.length})
          </button>
        </div>
      </div>

      {activeTabSub === 'submit' ? (
        /* Submission Form */
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Community Concern / Incident Form
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Please provide clear and truthful details so the Barangay Tanod or Lupon desk can coordinate appropriate action.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category of Concern *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IncidentCategory)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Brief Subject / Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Excessive loud music past 10PM on Sampaguita St."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Purok / Area *
                </label>
                <select
                  value={purok}
                  onChange={(e) => setPurok(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                >
                  <option value="Purok 1 - Centro">Purok 1 - Centro</option>
                  <option value="Purok 2 - Riverside">Purok 2 - Riverside</option>
                  <option value="Purok 3 - Bukidnon">Purok 3 - Bukidnon</option>
                  <option value="Purok 4 - Pag-asa">Purok 4 - Pag-asa</option>
                  <option value="Purok 5 - San Roque">Purok 5 - San Roque</option>
                  <option value="Purok 6 - Industrial Zone">Purok 6 - Industrial Zone</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Approximate Date & Time *
                </label>
                <input
                  type="text"
                  value={incidentDateTime}
                  onChange={(e) => setIncidentDateTime(e.target.value)}
                  placeholder="YYYY-MM-DD HH:MM"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Exact Street Address / Landmark *
              </label>
              <input
                type="text"
                placeholder="e.g. In front of House #42, near basketball court"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Detailed Description of Concern *
              </label>
              <textarea
                rows={4}
                placeholder="Describe what occurred, persons involved (if known), and any previous incidents..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                required
              />
            </div>

            {/* Photo upload attachment simulation */}
            <div className="p-3.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-slate-400" />
                <span>Optional Attachment (Photo / Document)</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Photo evidence attached (simulated)
              </span>
            </div>

            {/* Anonymous Toggle */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Submit Anonymously</span>
                <span className="text-[11px] text-slate-500 block">Hide your personal identity from public record</span>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="submit-incident-btn"
            >
              <Send className="w-4 h-4" />
              <span>Submit Report & Receive Tracking Code</span>
            </button>
          </form>
        </div>
      ) : (
        /* Report Tracking Timeline View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in relative">
          {/* List of Reports */}
          <div className={`lg:col-span-5 space-y-3 ${showMobileDetail ? 'hidden lg:block' : 'block'}`}>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search report reference..."
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-2.5 max-h-[580px] overflow-y-auto">
              {filteredIncidents.map((inc) => {
                const isSelected = activeIncident?.id === inc.id;
                return (
                  <div
                    key={inc.id}
                    onClick={() => { setSelectedIncidentId(inc.id); setShowMobileDetail(true); }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/70 shadow-xs ring-1 ring-amber-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-slate-900">{inc.referenceNumber}</span>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        inc.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                        inc.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {inc.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{inc.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{inc.location}</p>

                    <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>{inc.category}</span>
                      <span>{inc.submittedAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline & Details */}
          {activeIncident && (
            <div className={`lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 ${!showMobileDetail ? 'hidden lg:block' : 'block animate-in slide-in-from-right-4'}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <button 
                    onClick={() => setShowMobileDetail(false)}
                    className="lg:hidden mb-4 flex items-center gap-1 text-slate-500 hover:text-slate-900 font-semibold text-xs bg-slate-100 px-3 py-1.5 rounded-lg w-fit"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Back to List
                  </button>
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {activeIncident.referenceNumber}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-heading mt-1">
                    {activeIncident.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Filed by: <strong>{activeIncident.reporterName}</strong> • {activeIncident.purok}
                  </p>
                </div>

                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full shrink-0 ${
                  activeIncident.status === 'resolved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                  'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  Status: {activeIncident.status.replace('_', ' ')}
                </span>
              </div>

              {/* Description Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Location: <strong>{activeIncident.location}</strong></span>
                  <span>Date/Time: <strong>{activeIncident.incidentDateTime}</strong></span>
                </div>
                <p className="text-slate-800 leading-relaxed pt-2 border-t border-slate-200">
                  {activeIncident.description}
                </p>
                {activeIncident.assignedTo && (
                  <div className="pt-2 text-emerald-800 font-medium">
                    Assigned Officer: <strong>{activeIncident.assignedTo}</strong> ({activeIncident.assignedRole})
                  </div>
                )}
              </div>

              {/* Progress Timeline */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                  Barangay Investigation & Action Timeline:
                </h4>

                <div className="space-y-4">
                  {activeIncident.statusHistory.map((history, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 relative">
                      {idx < activeIncident.statusHistory.length - 1 && (
                        <div className="absolute left-3.5 top-6 w-0.5 h-8 bg-slate-200"></div>
                      )}
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 uppercase">
                            {history.status.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] text-slate-400">{history.updatedAt}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{history.note}</p>
                        <span className="text-[10px] text-slate-400 block mt-1">Logged by: {history.updatedBy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolution if completed */}
              {activeIncident.resolutionSummary && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                  <span className="font-bold block mb-1">Official Resolution Summary:</span>
                  <p>{activeIncident.resolutionSummary}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
