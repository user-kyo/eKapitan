import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { DocumentRequest, RequestStatus } from '../../types';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Printer, 
  User, 
  Calendar, 
  Filter,
  Check,
  AlertCircle,
  QrCode,
  ArrowRight
} from 'lucide-react';

export const DocumentProcessingQueue: React.FC = () => {
  const { 
    documentRequests, 
    updateDocumentStatus, 
    setSelectedDocumentForPrint, 
    largeTextMode 
  } = useBarangay();

  const [selectedReqId, setSelectedReqId] = useState<string>(documentRequests[0]?.id || '');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [staffNotesInput, setStaffNotesInput] = useState<string>('');
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>('');

  const filteredRequests = documentRequests.filter((req) => {
    const matchesStatus = filterStatus === 'All' || req.status === filterStatus;
    const matchesSearch = 
      req.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.purok.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.documentTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeRequest = documentRequests.find(r => r.id === selectedReqId) || filteredRequests[0];

  const handleStatusChange = (status: RequestStatus) => {
    if (!activeRequest) return;
    updateDocumentStatus(activeRequest.id, status, staffNotesInput.trim() || undefined);
    setStaffNotesInput('');
  };

  const handleConfirmReject = () => {
    if (!activeRequest || !rejectReason.trim()) return;
    updateDocumentStatus(activeRequest.id, 'rejected', rejectReason.trim());
    setShowRejectModal(false);
    setRejectReason('');
  };

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Records & Civil Documentation Desk</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Document Requests Processing Queue
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review online applications, verify civil records, apply fee waivers, and authorize cryptographic QR signatures.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search ref or applicant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-emerald-600"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['All', 'submitted', 'under_review', 'approved', 'ready_for_release', 'completed', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterStatus === status
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {status === 'All' ? 'All Applications' : status.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
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
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-slate-800">{req.referenceNumber}</span>
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

                <h4 className="text-sm font-bold text-slate-900">{req.documentTitle}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{req.residentName} • {req.purok}</p>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{req.submittedAt}</span>
                  <span className="font-bold text-slate-800">
                    {req.isFreeDueToExemption ? 'FREE (Exempt)' : `₱${req.fee}.00`}
                  </span>
                </div>
              </div>
            );
          })}

          {filteredRequests.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
              <p className="text-xs text-slate-500">No applications match the current filter.</p>
            </div>
          )}
        </div>

        {/* Right Active Processing Console */}
        {activeRequest ? (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            {/* Header & QR Hash */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {activeRequest.referenceNumber}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    QR Hash: {activeRequest.verificationCode}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading mt-1">
                  {activeRequest.documentTitle}
                </h3>
              </div>

              {/* Inspect Printable Certificate */}
              <button
                onClick={() => setSelectedDocumentForPrint(activeRequest)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                id="staff-inspect-cert-btn"
              >
                <Printer className="w-4 h-4" />
                <span>View / Print Certificate</span>
              </button>
            </div>

            {/* Applicant & Background Check Verification Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Applicant Name</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{activeRequest.residentName}</span>
                <span className="text-slate-500">{activeRequest.purok}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Contact & Delivery</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{activeRequest.contactNumber}</span>
                <span className="text-slate-500 capitalize">Method: {activeRequest.processingMethod.replace('_', ' ')}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Declared Purpose</span>
                <span className="font-medium text-slate-800 mt-0.5 block">{activeRequest.purpose}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Fee Assessment</span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {activeRequest.isFreeDueToExemption ? 'FREE OF CHARGE' : `₱${activeRequest.fee}.00`}
                </span>
                {activeRequest.isFreeDueToExemption && (
                  <span className="text-emerald-700 font-medium text-[11px] block">
                    {activeRequest.exemptionReason || 'Legal Exemption (RA 11261 / Indigent)'}
                  </span>
                )}
              </div>
            </div>

            {/* Clearance Derogatory Records Validation Stamp */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-950 block">Barangay San Jose Civil Blotter Verification</span>
                  <span className="text-emerald-800">Clear Record: No active warrant, pending Lupon mediation, or citation.</span>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                PASSED
              </span>
            </div>

            {/* Submitted Requirements Checklist */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Mandatory Supporting Documents Submitted:
              </h4>
              <div className="space-y-1.5">
                {activeRequest.requirementsSubmitted.map((req, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-800">{req.name}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-3 h-3" /> Uploaded & Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff Internal Note Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Add Clerk Internal Notes / Pickup Instructions
              </label>
              <input
                type="text"
                placeholder="e.g. Verified cedula # 109281. Ready for Punong Barangay dry seal..."
                value={staffNotesInput}
                onChange={(e) => setStaffNotesInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white"
              />
            </div>

            {/* Operational Action Buttons by Workflow Stage */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {activeRequest.status === 'submitted' && (
                  <button
                    onClick={() => handleStatusChange('under_review')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all cursor-pointer"
                  >
                    Start Review Process
                  </button>
                )}

                {activeRequest.status === 'under_review' && (
                  <button
                    onClick={() => handleStatusChange('approved')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all cursor-pointer"
                  >
                    Approve Application
                  </button>
                )}

                {activeRequest.status === 'approved' && (
                  <button
                    onClick={() => handleStatusChange('ready_for_release')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all cursor-pointer"
                  >
                    Set Ready for Release
                  </button>
                )}

                {activeRequest.status === 'ready_for_release' && (
                  <button
                    onClick={() => handleStatusChange('completed')}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs transition-all cursor-pointer"
                  >
                    Mark Released & Completed
                  </button>
                )}
              </div>

              {activeRequest.status !== 'rejected' && activeRequest.status !== 'completed' && (
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Reject Application
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-sm font-semibold text-slate-700">Select an application from the left to process.</p>
          </div>
        )}
      </div>

      {/* Reject Application Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Reject Document Application
            </h3>
            <p className="text-xs text-slate-500">
              Please specify the official reason for rejection (e.g. incomplete cedula, address outside jurisdiction). The applicant will be notified immediately.
            </p>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Official reason for rejection..."
              className="w-full p-3 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-rose-600"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
