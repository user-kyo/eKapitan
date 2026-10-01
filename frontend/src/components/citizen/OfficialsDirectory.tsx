import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { Users, Search, ShieldCheck } from 'lucide-react';

export const OfficialsDirectory: React.FC = () => {
  const { officials, largeTextMode } = useBarangay();
  const [searchQuery, setSearchQuery] = useState('');

  const activeOfficials = officials.filter(o => o.isActive);
  const filteredOfficials = activeOfficials.filter(o => 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.committee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-purple-700 mb-2">
            <Users className="w-6 h-6" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading">Barangay Officials Directory</h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Meet your dedicated public servants in Barangay 4A. Here you can find their contact information and designated committee responsibilities.
          </p>

          <div className="mt-6 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 max-w-md focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-300 transition-all">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name, position, or committee..."
              className="bg-transparent border-none outline-hidden w-full text-sm placeholder-slate-400 text-slate-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOfficials.map(official => (
          <div key={official.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col h-full">
            <div className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                  {official.avatarUrl ? (
                    <img src={official.avatarUrl} alt={official.name} className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight group-hover:text-purple-700 transition-colors">{official.name}</h3>
                  <div className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                    <ShieldCheck className="w-3 h-3" />
                    {official.position}
                  </div>
                </div>
              </div>
              
              <div className="mt-auto space-y-3 pt-4 border-t border-slate-100 text-sm">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Assigned Committee</span>
                  <span className="font-medium text-slate-700">{official.committee}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Public Contact</span>
                  <a href={`mailto:${official.contactDetails}`} className="font-medium text-blue-600 hover:underline break-all">
                    {official.contactDetails}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredOfficials.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            No officials found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};
