import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { 
  FileText, 
  Search, 
  Calendar, 
  AlertTriangle, 
  Sparkles, 
  FileCheck2, 
  Clock, 
  PhoneCall, 
  ChevronRight, 
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';

export const CitizenHome: React.FC = () => {
  const { 
    currentUser, 
    setActiveTab, 
    documentRequests, 
    announcements, 
    queueTickets,
    largeTextMode 
  } = useBarangay();

  const [trackInput, setTrackInput] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);

  // Active requests for the current citizen
  const myRequests = documentRequests.filter(r => r.residentName === currentUser.name || r.residentId === currentUser.residentId);
  const activeRequest = myRequests.find(r => r.status !== 'completed' && r.status !== 'rejected') || myRequests[0];

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;
    setActiveTab('tracking');
  };

  const serviceCategories = [
    {
      title: 'Request Documents',
      desc: 'Barangay Clearance, Residency, Indigency, and Business Permits online.',
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      badge: 'Most Popular',
      tab: 'request_wizard',
      color: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/40'
    },
    {
      title: 'Track Request Status',
      desc: 'Check live review, approval, and release updates for your application.',
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      badge: `${myRequests.length} on record`,
      tab: 'tracking',
      color: 'border-blue-200 hover:border-blue-400 bg-blue-50/40'
    },
    {
      title: 'Schedule Appointment',
      desc: 'Book a preferred date and counter time slot to avoid waiting lines.',
      icon: <Calendar className="w-6 h-6 text-purple-600" />,
      badge: 'Zero Waiting',
      tab: 'appointments',
      color: 'border-purple-200 hover:border-purple-400 bg-purple-50/40'
    },
    {
      title: 'File Incident / Concern',
      desc: 'Report noise disturbances, sanitation issues, or request Lupon mediation.',
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      badge: 'Monitored',
      tab: 'complaints',
      color: 'border-amber-200 hover:border-amber-400 bg-amber-50/40'
    },
    {
      title: 'Ask Ka-Barangay AI',
      desc: 'Instant answers to document requirements, fees, and office hours.',
      icon: <Sparkles className="w-6 h-6 text-emerald-600" />,
      badge: '24/7 AI Guide',
      tab: 'ai_assistant',
      color: 'border-emerald-300 hover:border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50/60'
    },
    {
      title: 'Verify Issued Document',
      desc: 'Scan or enter a QR verification code to check legal document authenticity.',
      icon: <FileCheck2 className="w-6 h-6 text-indigo-600" />,
      badge: 'Anti-Fraud',
      tab: 'qr_verify',
      color: 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/40'
    }
  ];

  return (
    <div className={`space-y-8 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Warm Civic Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-10 shadow-xl overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Digital Service Portal • Barangay 4A</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
            Mabuhay, {currentUser.name.split(' ')[0]}!
          </h1>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Welcome to e-Kapitan. Request official documents, track approvals, book counter appointments, or report community concerns from the comfort of your home.
          </p>

          {/* Quick Tracking Search Bar */}
          <div className="mt-6 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 max-w-xl flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 px-3 py-2 flex-1">
              <Search className="w-4 h-4 text-emerald-400 shrink-0" />
              <input
                type="text"
                placeholder="Track request code (e.g. REQ-2026-0819)..."
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                className="bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm w-full outline-hidden"
                id="quick-track-input"
              />
            </div>
            <button
              onClick={handleTrackSubmit}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              id="quick-track-btn"
            >
              <span>Track Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
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

      {/* Ongoing Request Alert Card (if any) */}
      {activeRequest && (
        <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Active Application</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  {activeRequest.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {activeRequest.documentTitle} ({activeRequest.referenceNumber})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeRequest.status === 'ready_for_release' || activeRequest.status === 'approved' 
                  ? 'Your document is approved and ready! View or print your official copy.'
                  : `Submitted on ${activeRequest.submittedAt}. Currently under review by barangay staff.`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('tracking')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs shrink-0 cursor-pointer"
            id="view-active-request-btn"
          >
            <span>View Progress Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Service Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
              Barangay Citizen Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select a service below or browse the complete requirements directory
            </p>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Directory</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {serviceCategories.map((service, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab(service.tab)}
              className={`p-5 rounded-2xl border transition-all hover:shadow-md cursor-pointer flex flex-col justify-between group ${service.color}`}
              id={`service-card-${service.tab}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-white rounded-xl shadow-2xs group-hover:scale-105 transition-transform">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
                    {service.badge}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-emerald-700">
                <span>Access Service</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements & Emergency Hotline Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Latest Announcements */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 className="font-bold text-slate-900 text-base font-heading flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-600" />
              <span>Official Barangay Announcements</span>
            </h3>
            <button
              onClick={() => setActiveTab('announcements')}
              className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
            >
              All Advisories →
            </button>
          </div>

          <div className="space-y-4">
            {announcements.slice(0, 2).map((anc) => (
              <div key={anc.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    anc.isUrgent ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {anc.category} {anc.isUrgent && '• URGENT'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{anc.date}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{anc.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">{anc.content}</p>
                <div className="mt-2 text-[11px] text-slate-500 font-medium">
                  Source: {anc.author} • Target: {anc.targetPurok}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Assistance & Hotlines Sidecard */}
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <PhoneCall className="w-4 h-4" />
              <span>Direct Barangay Hotlines</span>
            </div>
            <h3 className="text-lg font-bold font-heading">Need Assistance?</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Our barangay desk officers and emergency response teams are on standby 24/7.
            </p>

            <div className="space-y-3 mt-5">
              <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                <span className="text-[10px] uppercase text-emerald-300 font-bold block">Barangay Hall Direct</span>
                <span className="text-sm font-black text-white">(049) 562-1111</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                <span className="text-[10px] uppercase text-amber-300 font-bold block">Tanod Patrol / Security</span>
                <span className="text-sm font-black text-white">(049) 562-2222</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                <span className="text-[10px] uppercase text-blue-300 font-bold block">Health Center & Ambulance</span>
                <span className="text-sm font-black text-white">(049) 562-3333</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button
              onClick={() => setActiveTab('ai_assistant')}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
              id="home-ask-ai-btn"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask Ka-Barangay AI Citizen Guide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
