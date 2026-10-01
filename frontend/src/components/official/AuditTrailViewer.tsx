import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Clock, 
  User, 
  FileText, 
  Lock,
  Download
} from 'lucide-react';

export const AuditTrailViewer: React.FC = () => {
  const { auditLogs, largeTextMode } = useBarangay();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterModule, setFilterModule] = useState<string>('All');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesModule = filterModule === 'All' || log.category === filterModule;
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const modules = ['All', 'Records', 'Documents', 'Queue', 'Security', 'Configuration'];

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Lock className="w-4 h-4" />
            <span>Good Governance & DILG Audit Compliance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            System Transparency & Audit Trail
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tamper-evident logs of all administrative actions, document approvals, clearance status transitions, and user logins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              alert('Exporting encrypted CSV audit ledger for Commission on Audit (COA) / DILG review...');
            }}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export DILG Audit Log</span>
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search action, user, or target ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-indigo-600"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {modules.map((m) => (
            <button
              key={m}
              onClick={() => setFilterModule(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterModule === m
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-5 py-3">Timestamp</th>
                <th className="px-5 py-3">Operator</th>
                <th className="px-5 py-3">Action Event</th>
                <th className="px-5 py-3">Module</th>
                <th className="px-5 py-3">Target Entity</th>
                <th className="px-5 py-3">Details / Audit Payload</th>
                <th className="px-5 py-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-5 py-3 font-semibold">
                    {log.userName}
                    <span className="block text-[10px] text-slate-400 capitalize font-normal">{log.userRole}</span>
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-900 text-xs">
                    {log.action}
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      {log.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] text-indigo-700 font-bold">
                    {log.id}
                  </td>
                  <td className="px-5 py-3 text-slate-600 text-xs max-w-xs">
                    {log.details}
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] text-slate-400">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No audit logs found for the search criteria.
          </div>
        )}
      </div>
    </div>
  );
};
