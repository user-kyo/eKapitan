import React from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { 
  Users, 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  PlusCircle, 
  PhoneCall, 
  Search, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  DollarSign
} from 'lucide-react';

interface StaffDashboardProps {
  onOpenWalkInModal?: () => void;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({ onOpenWalkInModal }) => {
  const { 
    documentRequests, 
    queueTickets, 
    incidents, 
    residents, 
    setActiveTab, 
    callNextQueueTicket,
    largeTextMode 
  } = useBarangay();

  const pendingRequests = documentRequests.filter(r => r.status === 'submitted' || r.status === 'under_review');
  const waitingTickets = queueTickets.filter(t => t.status === 'waiting');
  const openIncidents = incidents.filter(i => i.status !== 'resolved');
  const seniorCount = residents.filter(r => r.isSenior).length;

  // Calculate today's revenue & waivers
  const todayPaid = documentRequests
    .filter(r => r.status === 'completed' && !r.isFreeDueToExemption)
    .reduce((acc, curr) => acc + curr.fee, 0);

  const waivedCount = documentRequests.filter(r => r.isFreeDueToExemption).length;

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Top Operations Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Barangay 4A Operations Center</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Staff Operations & Service Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Live monitoring for document processing, counter queue flow, incident blotter, and civil registry.
          </p>
        </div>

        {/* Quick Operational Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => callNextQueueTicket(1)}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            id="call-next-ticket-quick-btn"
          >
            <Clock className="w-4 h-4 text-amber-300" />
            <span>Call Next Ticket</span>
          </button>
          <button
            onClick={() => setActiveTab('staff_queue')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Issue Walk-In Ticket</span>
          </button>
        </div>
      </div>

      {/* 4 Core Operational KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pending Requests */}
        <div 
          onClick={() => setActiveTab('staff_documents')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Documents</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-heading">{pendingRequests.length}</span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Requires Review
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center justify-between">
            <span>Avg. Turnaround: 2.1 hrs</span>
            <span className="text-emerald-700 font-semibold">Open Desk →</span>
          </p>
        </div>

        {/* Counter Queue */}
        <div 
          onClick={() => setActiveTab('staff_queue')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Queue Waiting</span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-heading">{waitingTickets.length}</span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              Active Counter Line
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center justify-between">
            <span>Priority Lanes Active</span>
            <span className="text-blue-700 font-semibold">Manage Queue →</span>
          </p>
        </div>

        {/* Community Incidents */}
        <div 
          onClick={() => setActiveTab('staff_incidents')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-rose-400 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Open Incidents / Blotter</span>
            <div className="p-2 bg-rose-50 text-rose-700 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-heading">{openIncidents.length}</span>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
              Active Cases
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center justify-between">
            <span>Tanod / Lupon Assigned</span>
            <span className="text-rose-700 font-semibold">Incident Desk →</span>
          </p>
        </div>

        {/* Civil Registry */}
        <div 
          onClick={() => setActiveTab('staff_residents')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-purple-400 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registered Population</span>
            <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-heading">{residents.length}</span>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              {seniorCount} Seniors
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center justify-between">
            <span>Purok 1-6 Masterlist</span>
            <span className="text-purple-700 font-semibold">View Registry →</span>
          </p>
        </div>
      </div>

      {/* Operational Congestion Alert / Status Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping shrink-0"></div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              Counter Operational Flow: Normal Flow • Average Wait 8.4 Minutes
            </h4>
            <p className="text-xs text-slate-600">
              Counters 1, 2, 3, and 4 are staffed and responding. RA 11261 / RA 9994 fee exemptions automatically applied.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 shrink-0">
          <span>Today Collected: <strong>₱{todayPaid}.00</strong></span>
          <span>•</span>
          <span className="text-emerald-800">Waivers Issued: <strong>{waivedCount}</strong></span>
        </div>
      </div>

      {/* Split Section: Real-time Action Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Applications Awaiting Review */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Recent Document Requests
              </h3>
              <p className="text-xs text-slate-500">Applications submitted online requiring clerk verification</p>
            </div>
            <button
              onClick={() => setActiveTab('staff_documents')}
              className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({documentRequests.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {documentRequests.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                onClick={() => setActiveTab('staff_documents')}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-800">{doc.referenceNumber}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      doc.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                      doc.status === 'ready_for_release' ? 'bg-blue-100 text-blue-800' :
                      doc.status === 'approved' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {doc.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{doc.documentTitle}</h4>
                  <p className="text-xs text-slate-500">{doc.residentName} • {doc.purok}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-900 block">
                    {doc.isFreeDueToExemption ? 'FREE (Waiver)' : `₱${doc.fee}.00`}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{doc.submittedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Counters Snapshot */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Active Service Counters
              </h3>
              <p className="text-xs text-slate-500">Live physical queue boards</p>
            </div>
            <button
              onClick={() => setActiveTab('staff_queue')}
              className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
            >
              Full Queue Board →
            </button>
          </div>

          <div className="space-y-3">
            {[
              { counter: 'Counter 1', name: 'Document Clearances', ticket: 'A-012', status: 'SERVING', staff: 'Elena Ramos' },
              { counter: 'Counter 2', name: 'Certificates & Indigency', ticket: 'B-008', status: 'SERVING', staff: 'Grace Bautista' },
              { counter: 'Counter 3', name: 'Cashier & Assessment', ticket: 'C-019', status: 'SERVING', staff: 'Ramon Perez' },
              { counter: 'Counter 4', name: 'Community Blotter & Lupon', ticket: 'D-004', status: 'SERVING', staff: 'Officer Dizon' }
            ].map((c, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{c.counter}</span>
                    <span className="text-[10px] text-slate-500">({c.name})</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">Clerk: {c.staff}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black font-mono text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {c.ticket}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-700 block mt-1 uppercase tracking-wider">
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('staff_queue')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Open Queue Management Console</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
