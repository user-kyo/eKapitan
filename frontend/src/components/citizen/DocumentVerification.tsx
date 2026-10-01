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
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all cursor-pointer shrink-0"
            id="verify-doc-btn"
          >
            Verify Document
          </button>
        </form>

        {/* Quick Sample Links */}
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500">
          <span className="text-[11px] font-semibold text-slate-400">Try sample valid codes:</span>
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
              className="px-2 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-800 rounded-md font-mono text-[11px] transition-colors border border-slate-200 cursor-pointer"
            >
              {s.code}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Result Display */}
      {searched && (
        <div className="animate-in fade-in zoom-in-95">
          {verifiedDoc ? (
            <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 sm:p-8 shadow-md space-y-6">
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
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedDocumentForPrint(verifiedDoc)}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Inspect Certified Document Sheet</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-rose-400 p-8 text-center space-y-3">
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
