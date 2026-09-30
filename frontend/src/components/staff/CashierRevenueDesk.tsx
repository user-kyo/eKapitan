import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { 
  DollarSign, 
  FileText, 
  Search, 
  CheckCircle2, 
  Printer, 
  Calendar, 
  ShieldCheck, 
  TrendingUp,
  CreditCard,
  Building
} from 'lucide-react';

export const CashierRevenueDesk: React.FC = () => {
  const { documentRequests, largeTextMode } = useBarangay();
  const [filterPeriod, setFilterPeriod] = useState<string>('Today');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const completedOrPaid = documentRequests.filter(
    d => d.status === 'completed' || d.status === 'approved' || d.status === 'ready_for_release'
  );

  const totalCollected = completedOrPaid
    .filter(d => !d.isFreeDueToExemption)
    .reduce((sum, d) => sum + d.fee, 0);

  const totalWaivedValue = completedOrPaid
    .filter(d => d.isFreeDueToExemption)
    .reduce((sum, d) => sum + (d.fee > 0 ? d.fee : 50), 0);

  const totalWaiversCount = completedOrPaid.filter(d => d.isFreeDueToExemption).length;

  const filteredRecords = completedOrPaid.filter((d) => {
    return (
      d.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.documentTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <DollarSign className="w-4 h-4" />
            <span>Office of the Barangay Treasurer</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Treasury, Cashier & Fee Waiver Ledger
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official receipt issuance, municipal clearance revenue tracking, and statutory exemptions audit (RA 11261 / RA 9994).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Daily Collection Report</span>
          </button>
        </div>
      </div>

      {/* Revenue KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Total Revenue Remitted
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-slate-900 font-heading font-mono">
              ₱{totalCollected.toLocaleString()}.00
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Audited
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Deposited into Barangay General Fund
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Statutory Fee Waivers Issued
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-emerald-700 font-heading">
              {totalWaiversCount}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              100% Subsidized
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            First-Time Jobseeker (RA 11261) & Indigency
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Subsidy Value Granted
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-purple-700 font-heading font-mono">
              ₱{totalWaivedValue.toLocaleString()}.00
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Direct citizen financial relief delivered
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Official Receipts & Collections Ledger
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search receipt or citizen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-emerald-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-5 py-3">Receipt / Ref</th>
                <th className="px-5 py-3">Citizen Name</th>
                <th className="px-5 py-3">Service Document</th>
                <th className="px-5 py-3">Assessment Type</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3 font-mono font-bold text-slate-900 text-xs">
                    {rec.referenceNumber}
                  </td>
                  <td className="px-5 py-3 font-semibold">
                    {rec.residentName}
                    <span className="block text-[11px] text-slate-400 font-normal">{rec.purok}</span>
                  </td>
                  <td className="px-5 py-3">
                    {rec.documentTitle}
                  </td>
                  <td className="px-5 py-3">
                    {rec.isFreeDueToExemption ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Fee Exemption (Waiver)
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                        Official Barangay Fee
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 font-bold font-mono">
                    {rec.isFreeDueToExemption ? '₱0.00' : `₱${rec.fee}.00`}
                  </td>
                  <td className="px-5 py-3 text-slate-500 text-xs">
                    {rec.submittedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
