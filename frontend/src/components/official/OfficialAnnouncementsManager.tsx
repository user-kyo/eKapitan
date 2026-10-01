import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { 
  Building, 
  PlusCircle, 
  Calendar, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  Megaphone,
  Pin
} from 'lucide-react';

export const OfficialAnnouncementsManager: React.FC = () => {
  const { announcements, createAnnouncement, largeTextMode } = useBarangay();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<'Health' | 'Advisory' | 'Event' | 'Program' | 'Emergency'>('Advisory');
  const [targetPurok, setTargetPurok] = useState<string>('All Puroks (General Public)');
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createAnnouncement({
      title: title.trim(),
      content: content.trim(),
      category,
      targetPurok,
      isUrgent
    });

    setShowAddModal(false);
    setTitle('');
    setContent('');
    setIsUrgent(false);
  };

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Megaphone className="w-4 h-4" />
            <span>Public Information Office</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Official Barangay Advisories & Announcements
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Broadcast health missions, disaster weather warnings, community curfew notices, and civic assemblies.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish Advisory</span>
        </button>
      </div>

      {/* Announcements Stream */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {announcements.map((anc) => (
          <div
            key={anc.id}
            className={`p-6 rounded-2xl border transition-all bg-white shadow-xs flex flex-col justify-between ${
              anc.isUrgent ? 'border-rose-300 ring-1 ring-rose-300' : 'border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                  anc.isUrgent ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-blue-100 text-blue-800'
                }`}>
                  {anc.category} {anc.isUrgent && '• URGENT ALERT'}
                </span>
                <span className="text-xs font-mono text-slate-400">{anc.date}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-heading">
                {anc.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {anc.content}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
              <span>Author: <strong>{anc.author}</strong></span>
              <span className="text-emerald-700 font-semibold">{anc.targetPurok}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Publish Official Advisory
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handlePostAnnouncement} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Schedule for Free Senior Flu Vaccination Drive"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="Health">Health</option>
                    <option value="Advisory">Advisory</option>
                    <option value="Event">Event</option>
                    <option value="Program">Program</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Purok *</label>
                  <select
                    value={targetPurok}
                    onChange={(e) => setTargetPurok(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="All Puroks (General Public)">All Puroks (General Public)</option>
                    <option value="Purok 1 - Centro">Purok 1 - Centro</option>
                    <option value="Purok 2 - Riverside">Purok 2 - Riverside</option>
                    <option value="Purok 3 - Bukidnon">Purok 3 - Bukidnon</option>
                    <option value="Purok 4 - Pag-asa">Purok 4 - Pag-asa</option>
                    <option value="Purok 5 - San Roque">Purok 5 - San Roque</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Advisory Content *</label>
                <textarea
                  rows={4}
                  placeholder="Detailed public announcement text..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Mark as Urgent Advisory</span>
                  <span className="text-[11px] text-slate-500">Highlights announcement with red banner alert</span>
                </div>
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 text-rose-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-xs"
                >
                  Broadcast to Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
