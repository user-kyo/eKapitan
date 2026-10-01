import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { IncidentReport, IncidentStatus } from '../../types';
import { 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  Clock, 
  User, 
  ShieldAlert, 
  Calendar, 
  MapPin, 
  PlusCircle,
  FileText,
  Filter,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const IncidentBlotterDesk: React.FC = () => {
  const { incidents, officials, updateIncidentReportStatus, largeTextMode } = useBarangay();

  const [selectedIncId, setSelectedIncId] = useState<string>(incidents[0]?.id || '');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Action fields
  const [actionNote, setActionNote] = useState<string>('');
  const [resolutionSummary, setResolutionSummary] = useState<string>('');
  const [showResolveModal, setShowResolveModal] = useState<boolean>(false);

  const filteredIncidents = incidents.filter((inc) => {
    const matchesStatus = filterStatus === 'All' || inc.status === filterStatus;
    const matchesSearch = 
      inc.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.purok.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeIncident = incidents.find(i => i.id === selectedIncId) || filteredIncidents[0];

  const handleUpdateStatus = (newStatus: IncidentStatus) => {
    if (!activeIncident) return;
    updateIncidentReportStatus(
      activeIncident.id, 
      newStatus, 
      actionNote.trim() || `Status updated to ${newStatus.replace('_', ' ')}`
    );
    setActionNote('');
  };

  const handleConfirmResolution = () => {
    if (!activeIncident || !resolutionSummary.trim()) return;
    updateIncidentReportStatus(
      activeIncident.id,
      'resolved',
      `Amicably settled: ${resolutionSummary.trim()}`
    );
    setShowResolveModal(false);
    setResolutionSummary('');
  };

  const getAIRecommendation = () => {
    if (!activeIncident || activeIncident.status !== 'received') return null;

    let targetCommittee = 'Committee on Peace and Order';
    if (activeIncident.category === 'Sanitation & Garbage') targetCommittee = 'Committee on Health and Sanitation';
    if (activeIncident.category === 'Drainage / Flooding') targetCommittee = 'Committee on Public Works';

    const candidates = officials.filter(o => o.committee === targetCommittee);
    let best = candidates[0] || officials.find(o => o.committee.includes('Peace')) || officials[0];

    if (best && best.status === 'On Leave (Absent)') {
      const substitutes = officials.filter(o => o.status === 'Active (Incumbent)' && o.id !== best.id);
      const sub = substitutes[0] || officials[0];
      return { recommended: best, isAbsent: true, substitute: sub };
    }
    return { recommended: best, isAbsent: false, substitute: null };
  };

  const aiRecommendation = getAIRecommendation();

  const handleConfirmAIAssignment = () => {
    if (!activeIncident || !aiRecommendation) return;
    const assignee = aiRecommendation.isAbsent ? aiRecommendation.substitute : aiRecommendation.recommended;
    updateIncidentReportStatus(
      activeIncident.id,
      'assigned',
      `AI Assigned to ${assignee?.name} (${assignee?.position})`
    );
  };

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Peace & Order Desk • Katarungang Pambarangay</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Incident Blotter & Mediation Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Log community concerns, dispatch Barangay Tanod patrols, schedule Lupon Tagapamayapa hearings, and record amicable settlements.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search blotter reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-rose-600"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['All', 'received', 'assigned', 'in_progress', 'hearing_scheduled', 'resolved'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterStatus === s
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {s === 'All' ? 'All Incidents' : s.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Incidents List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
          {filteredIncidents.map((inc) => {
            const isSelected = activeIncident?.id === inc.id;
            return (
              <div
                key={inc.id}
                onClick={() => setSelectedIncId(inc.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-rose-600 bg-rose-50/70 shadow-xs ring-1 ring-rose-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-slate-800">{inc.referenceNumber}</span>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    inc.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                    inc.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    inc.status === 'hearing_scheduled' ? 'bg-purple-100 text-purple-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {inc.status.replace('_', ' ')}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-1">{inc.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{inc.location} • {inc.purok}</p>

                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Category: {inc.category}</span>
                  <span>{inc.submittedAt}</span>
                </div>
              </div>
            );
          })}

          {filteredIncidents.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200">
              No blotter cases match filter.
            </div>
          )}
        </div>

        {/* Right Active Incident Case Detail */}
        {activeIncident ? (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            {/* Header Details */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {activeIncident.referenceNumber}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading mt-1">
                  {activeIncident.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Category: <strong>{activeIncident.category}</strong>
                </p>
              </div>

              {activeIncident.status !== 'resolved' ? (
                <button
                  onClick={() => setShowResolveModal(true)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Case as Resolved</span>
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Case Closed
                </span>
              )}
            </div>

            {/* Case Facts Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Complainant / Reporter</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{activeIncident.reporterName}</span>
                {activeIncident.isAnonymous && (
                  <span className="text-[10px] text-amber-700 font-semibold">(Anonymous submission)</span>
                )}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Investigator</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{activeIncident.assignedTo || 'Tanod Patrol Desk'}</span>
                <span className="text-[10px] text-slate-500">{activeIncident.assignedRole || 'Peace & Order Team'}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Location & Purok</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{activeIncident.location}</span>
                <span className="text-[10px] text-slate-500">{activeIncident.purok}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Incident Date & Time</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{activeIncident.incidentDateTime}</span>
                <span className="text-[10px] text-slate-500">Reported on {activeIncident.submittedAt}</span>
              </div>
            </div>

            {/* Statement of Incident */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Detailed Incident Narrative</span>
              <p className="text-slate-800 leading-relaxed">{activeIncident.description}</p>
            </div>

            {/* Investigation Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Blotter Action Log & Timeline:
              </h4>

              <div className="space-y-3">
                {activeIncident.statusHistory.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 uppercase text-[11px]">
                          {h.status.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400">{h.updatedAt}</span>
                      </div>
                      <p className="text-slate-600 mt-1">{h.note}</p>
                      <span className="text-[10px] text-slate-400 block mt-1">Logged by: {h.updatedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Assignment Recommendation */}
            {aiRecommendation && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-16 h-16 text-indigo-600" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Task Assignment Recommendation</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start justify-between bg-white/60 p-3 rounded-lg border border-indigo-50">
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Primary Match (Role/Load)</p>
                        <p className="text-sm font-bold text-slate-800">{aiRecommendation.recommended?.name}</p>
                        <p className="text-[10px] text-slate-600">{aiRecommendation.recommended?.position} - {aiRecommendation.recommended?.committee}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${aiRecommendation.isAbsent ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {aiRecommendation.isAbsent ? 'ON LEAVE' : 'AVAILABLE'}
                      </span>
                    </div>

                    {aiRecommendation.isAbsent && aiRecommendation.substitute && (
                      <div className="flex items-start justify-between bg-white/60 p-3 rounded-lg border border-purple-100 shadow-xs border-l-4 border-l-purple-500">
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="text-[10px] text-purple-600 font-bold uppercase">Substitute Suggested</p>
                            <ArrowRight className="w-3 h-3 text-purple-400" />
                          </div>
                          <p className="text-sm font-bold text-slate-800">{aiRecommendation.substitute.name}</p>
                          <p className="text-[10px] text-slate-600">{aiRecommendation.substitute.position} - {aiRecommendation.substitute.committee}</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          AVAILABLE
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button onClick={() => setActionNote('Rejected AI recommendation. ')} className="px-3 py-1.5 text-[11px] font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors">
                      Reject
                    </button>
                    <button onClick={handleConfirmAIAssignment} className="px-4 py-1.5 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm Assignment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Inputs */}
            {activeIncident.status !== 'resolved' && (
              <div className="pt-2 border-t border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Log Investigation Action or Escalate Case:
                </h4>

                <div>
                  <input
                    type="text"
                    placeholder="Enter dispatch notes, mediation schedule, or inspection findings..."
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleUpdateStatus('assigned')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Assign Tanod Patrol
                  </button>

                  <button
                    onClick={() => handleUpdateStatus('in_progress')}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Mark In Progress
                  </button>

                  <button
                    onClick={() => handleUpdateStatus('hearing_scheduled')}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Schedule Lupon Hearing
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-sm font-semibold text-slate-700">Select a case from the blotter list.</p>
          </div>
        )}
      </div>

      {/* Case Resolution Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Resolve Blotter Case & Record Agreement
            </h3>
            <p className="text-xs text-slate-500">
              Record the final amicable settlement terms or corrective action taken by the barangay desk.
            </p>

            <textarea
              rows={3}
              value={resolutionSummary}
              onChange={(e) => setResolutionSummary(e.target.value)}
              placeholder="e.g. Both parties signed amicable agreement at Lupon Tagapamayapa; agreed to curfew compliance."
              className="w-full p-3 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResolveModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmResolution}
                className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
              >
                Close & Archive Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
