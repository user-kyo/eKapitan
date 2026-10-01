import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  QrCode, 
  FileText, 
  Calendar, 
  User, 
  Printer,
  Building,
  AlertCircle
} from 'lucide-react';

export const DocumentVerification: React.FC = () => {
  const { verifyDocumentByCode, setSelectedDocumentForPrint, largeTextMode } = useBarangay();
  const { verifyDocumentCode, setSelectedDocumentForPrint, largeTextMode } = useBarangay();
  const [inputCode, setInputCode] = useState<string>('VER-B4A-78921-99');
  const [searched, setSearched] = useState<boolean>(false);
  const [verifiedDoc, setVerifiedDoc] = useState<any | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const result = verifyDocumentCode(inputCode.trim());
    setVerifiedDoc(result.document || null);
    setSearched(true);
  };

  const sampleCodes = [
    { code: 'VER-B4A-78921-99', label: 'Juan Dela Cruz (Clearance)' },
    { code: 'VER-B4A-64112-42', label: 'Maria Santos (Residency)' },
    { code: 'REQ-2026-0819', label: 'By Reference Number' }
  ];

  return (
    <div className={`max-w-3xl mx-auto space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Header Banner */}
      <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-slate-100 shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-60 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-8 h-8" />
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto mb-3 border border-indigo-200">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
          Official Document Authenticity Verifier
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
          Verify documents issued by Barangay 4A, San Pablo City, Laguna. External organizations (banks, employers, schools) can validate clearance credentials in real-time.
        </p>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="mt-6 max-w-lg mx-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <QrCode className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Enter QR hash (e.g. VER-B4A-...) or Ref..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-indigo-600 font-mono"
              id="verification-code-input"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight mb-3">
            Document Authenticity Verifier
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Verify official documents issued by Barangay 4A. Perfect for banks, employers, and organizations to validate clearance credentials instantly.
          </p>

          {/* Verification Form */}
          <form onSubmit={handleVerify} className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <QrCode className="w-5 h-5 text-indigo-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Enter QR hash (e.g. VER-B4A-...) or Ref..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 font-mono transition-all outline-none"
                id="verification-code-input"
              />
          </div>
            <button
              type="submit"
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all cursor-pointer shrink-0 active:scale-[0.98]"
              id="verify-doc-btn"
            >
              Verify Document
            </button>
          </form>

          {/* Quick Sample Links */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sample Codes:</span>
          {sampleCodes.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputCode(s.code);
                const result = verifyDocumentCode(s.code);
                setVerifiedDoc(result.document || null);
                setSearched(true);
              }}
              className="px-3 py-1.5 bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 rounded-lg font-mono text-[11px] font-semibold text-slate-600 transition-colors border border-slate-200 cursor-pointer shadow-sm"
            >
              {s.code}
            </button>
          ))}
          </div>
        </div>
      </div>

      {/* Verification Result Display */}
      {searched && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {verifiedDoc ? (
            <div className="bg-white rounded-[2rem] border-2 border-emerald-500 p-6 sm:p-10 shadow-2xl shadow-emerald-900/5 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none"></div>
              {/* Positive Confirmation Stamp */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-emerald-950 font-heading">
                      OFFICIAL & AUTHENTIC BARANGAY RECORD
                    </h3>
                    <p className="text-xs text-emerald-800">
                      Validated against Barangay 4A Civil Registry cryptographic ledger.
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold bg-white text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-300 self-start sm:self-auto">
                  {verifiedDoc.verificationCode}
                </span>
              </div>

              {/* Verified Metadata Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Document Type
                  </span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{verifiedDoc.documentTitle}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Document Recipient (Bearer)
                  </span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{verifiedDoc.residentName}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Residency Jurisdiction
                  </span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">
                    {verifiedDoc.purok}, Barangay 4A, San Pablo City
                    {verifiedDoc.purok}, Barangay 4A, San Pablo City, Laguna
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Certified Legal Purpose
                  </span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">
                    {verifiedDoc.purpose || 'General Legal & Employment Purpose'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    System Reference Number
                  </span>
                  <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                    {verifiedDoc.referenceNumber}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Issuing Authority
                  </span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">
                    Hon. Roberto V. Gomez, Punong Barangay
                  </span>
                </div>
              </div>

              {/* View printable official copy button */}
              <div className="pt-4 flex justify-end relative z-10">
                <button
                  onClick={() => setSelectedDocumentForPrint(verifiedDoc)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <FileText className="w-5 h-5" />
                  <span>Inspect Certified Document Sheet</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] border-2 border-rose-400 p-10 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <XCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-rose-950 font-heading">
                UNVERIFIED / INVALID DOCUMENT CODE
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                The code "{inputCode}" was not found in the official records registry of Barangay 4A. It may be expired, misspelled, or fraudulent.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
