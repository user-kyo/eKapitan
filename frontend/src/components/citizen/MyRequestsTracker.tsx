import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { DocumentRequest, RequestStatus } from '../../types';
import { 
  FileCheck2, 
  Clock, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  QrCode, 
  Calendar, 
  User, 
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const MyRequestsTracker: React.FC = () => {
  const { 
    documentRequests, 
    currentUser, 
    setSelectedDocumentForPrint, 
    setActiveTab, 
    largeTextMode 
  } = useBarangay();

  // Filter for requests belonging to this citizen or show all if search is active
  const [searchRef, setSearchRef] = useState<string>('');
  const [selectedReqId, setSelectedReqId] = useState<string>(documentRequests[0]?.id || '');

  const filteredRequests = documentRequests.filter((req) => {
    if (searchRef.trim()) {
      return (
        req.referenceNumber.toLowerCase().includes(searchRef.toLowerCase()) ||
        req.residentName.toLowerCase().includes(searchRef.toLowerCase()) ||
        req.verificationCode.toLowerCase().includes(searchRef.toLowerCase())
      );
    }
    // By default show user's requests, or all recent requests if user has none
    return true;
  });

  const activeRequest = documentRequests.find((r) => r.id === selectedReqId) || filteredRequests[0];

  const statusSteps: { status: RequestStatus; label: string; desc: string }[] = [
    { status: 'submitted', label: 'Submitted', desc: 'Received by online system' },
    { status: 'under_review', label: 'Under Review', desc: 'Records staff checking clearances' },
    { status: 'approved', label: 'Approved', desc: 'Signed by Punong Barangay' },
    { status: 'ready_for_release', label: 'Ready for Release', desc: 'Ready for pick-up or download' },
    { status: 'completed', label: 'Completed', desc: 'Document issued & QR authenticated' },
  ];

  const getStatusIndex = (status: RequestStatus) => {
    if (status === 'rejected') return -1;
    return statusSteps.findIndex(s => s.status === status);
  };

  const currentStepIndex = activeRequest ? getStatusIndex(activeRequest.status) : 0;

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Header & Search */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Real-Time Civic Tracking</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Document Request Status & History
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor review stages, verify issued QR codes, and download completed barangay certificates.
          </p>
        </div>

        {/* Search Ref input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search reference (REQ-...)"
            value={searchRef}
            onChange={(e) => setSearchRef(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-emerald-600"
            id="track-ref-search"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Request List Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Applications ({filteredRequests.length})
            </span>
            <button
              onClick={() => setActiveTab('request_wizard')}
              className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
            >
              + New Request
            </button>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredRequests.map((req) => {
              const isSelected = activeRequest?.id === req.id;
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedReqId(req.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  id={`req-card-${req.referenceNumber}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      {req.referenceNumber}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      req.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                      req.status === 'ready_for_release' ? 'bg-blue-100 text-blue-800' :
                      req.status === 'approved' ? 'bg-indigo-100 text-indigo-800' :
                      req.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{req.documentTitle}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{req.residentName} • {req.purok}</p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{req.submittedAt}</span>
                    <span className="font-bold text-slate-700">
                      {req.isFreeDueToExemption ? 'FREE (Waiver)' : `₱${req.fee}.00`}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredRequests.length === 0 && (
              <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-600">No matching requests found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Request Live Step Timeline & Details */}
        {activeRequest ? (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            {/* Top Details & Action */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {activeRequest.referenceNumber}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading mt-1.5">
                  {activeRequest.documentTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Requested by: <strong>{activeRequest.residentName}</strong> ({activeRequest.purok})
                </p>
              </div>

              {/* View / Print Official Document if Approved or Completed */}
              {(activeRequest.status === 'approved' || activeRequest.status === 'ready_for_release' || activeRequest.status === 'completed') && (
                <button
                  onClick={() => setSelectedDocumentForPrint(activeRequest)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                  id="view-printable-certificate-btn"
                >
                  <FileCheck2 className="w-4 h-4 text-amber-300" />
                  <span>View Official Certificate</span>
                </button>
              )}
            </div>

            {/* Step-by-Step Progress Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                Application Review Milestones:
              </h4>

              <div className="space-y-4">
                {statusSteps.map((step, idx) => {
                  const isDone = currentStepIndex >= idx;
                  const isCurrent = currentStepIndex === idx;

                  return (
                    <div key={step.status} className="flex items-start gap-3.5 relative">
                      {idx < statusSteps.length - 1 && (
                        <div
                          className={`absolute left-3.5 top-7 w-0.5 h-8 -ml-[1px] transition-colors ${
                            currentStepIndex > idx ? 'bg-emerald-600' : 'bg-slate-200'
                          }`}
                        ></div>
                      )}

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold z-10 transition-all ${
                          isDone
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-bold ${isCurrent ? 'text-emerald-800' : isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full animate-pulse">
                              Current Status
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verification & Staff Notes Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Digital Verification Hash</span>
                  <span className="text-xs font-mono font-bold text-slate-800">{activeRequest.verificationCode}</span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Assigned Records Desk</span>
                  <span className="text-xs font-semibold text-slate-800">{activeRequest.assignedStaffName || 'Elena Ramos (Records)'}</span>
                </div>
              </div>

              {activeRequest.staffNotes && (
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-700">
                  <p className="font-bold text-slate-800 mb-0.5">Barangay Desk Notes:</p>
                  <p className="italic bg-white p-2 rounded-lg border border-slate-200">
                    "{activeRequest.staffNotes}"
                  </p>
                </div>
              )}

              {activeRequest.appointmentDate && (
                <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-700">
                  <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Pick-up Window: <strong>{activeRequest.appointmentDate}</strong> ({activeRequest.appointmentTime})
                  </span>
                </div>
              )}
            </div>

            {/* QR Code Presentation Box */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center">
                  <QrCode className="w-9 h-9 text-slate-900" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-emerald-950">Show QR Code at Barangay Hall Counter</h5>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Present your digital QR code to the desk clerk to expedite ticket release.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(activeRequest.referenceNumber);
                  alert(`Copied Reference Code: ${activeRequest.referenceNumber}`);
                }}
                className="px-3 py-1.5 bg-white text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors shrink-0"
              >
                Copy Code
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">Select an application from the left to view timeline.</p>
          </div>
        )}
      </div>
    </div>
  );
};
