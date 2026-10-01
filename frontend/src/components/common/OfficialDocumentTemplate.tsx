import React from 'react';
import { DocumentRequest } from '../../types';
import { Printer, Download, CheckCircle2, ShieldCheck, X, Building2 } from 'lucide-react';

interface OfficialDocumentTemplateProps {
  document: DocumentRequest;
  onClose: () => void;
}

export const OfficialDocumentTemplate: React.FC<OfficialDocumentTemplateProps> = ({ document, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const getDocTitle = () => {
    switch (document.documentType) {
      case 'barangay_clearance':
        return 'BARANGAY CLEARANCE';
      case 'certificate_of_residency':
        return 'CERTIFICATE OF RESIDENCY';
      case 'certificate_of_indigency':
        return 'CERTIFICATE OF INDIGENCY';
      case 'business_clearance':
        return 'BARANGAY BUSINESS CLEARANCE';
      case 'first_time_jobseeker':
        return 'FIRST-TIME JOBSEEKER CERTIFICATION (RA 11261)';
      default:
        return 'BARANGAY CERTIFICATION';
    }
  };

  const getDocBodyText = () => {
    switch (document.documentType) {
      case 'barangay_clearance':
        return (
          <>
            <p className="indent-8 leading-relaxed mb-4 text-justify">
              This is to certify that <strong>{document.residentName}</strong>, of legal age, Filipino citizen, and a bonafide resident of <strong>{document.purok}</strong>, Barangay 4A, San Pablo City, Laguna, is a person of good moral character and reputable standing in the community.
            </p>
            <p className="indent-8 leading-relaxed mb-4 text-justify">
              Records of this office further show that as of this date, the subject individual has <strong>NO DEROGATORY RECORD</strong> nor any pending criminal case, citation, or dispute filed before the Lupon Tagapamayapa of this barangay.
            </p>
            <p className="indent-8 leading-relaxed text-justify">
              This certification is hereby issued upon the request of the interested party for: <strong>{document.purpose || 'Official employment and general legal purposes'}</strong>.
            </p>
          </>
        );
      case 'certificate_of_residency':
        return (
          <>
            <p className="indent-8 leading-relaxed mb-4 text-justify">
              This is to certify that <strong>{document.residentName}</strong>, of legal age, is a documented resident residing at <strong>{document.purok}</strong>, Barangay 4A, San Pablo City, Laguna, Metro Manila, having continuously resided in this jurisdiction for more than six (6) months.
            </p>
            <p className="indent-8 leading-relaxed text-justify">
              This certification is issued upon the request of the bearer for the purpose of: <strong>{document.purpose || 'School enrollment, postal ID, and general identification'}</strong>.
            </p>
          </>
        );
      case 'certificate_of_indigency':
        return (
          <>
            <p className="indent-8 leading-relaxed mb-4 text-justify">
              This is to certify that <strong>{document.residentName}</strong>, residing at <strong>{document.purok}</strong>, Barangay 4A, San Pablo City, Laguna, belongs to an indigent family residing in this barangay, with monthly household earnings falling within the low-income threshold.
            </p>
            <p className="indent-8 leading-relaxed mb-4 text-justify">
              Pursuant to government social welfare guidelines and local ordinances, all local processing fees for this document have been <strong>WAIVED (100% FREE OF CHARGE)</strong>.
            </p>
            <p className="indent-8 leading-relaxed text-justify">
              This certificate is issued to support the bearer's application for: <strong>{document.purpose || 'Financial, medical, or legal assistance through DSWD / Malasakit Center'}</strong>.
            </p>
          </>
        );
      case 'business_clearance':
        return (
          <>
            <p className="indent-8 leading-relaxed mb-4 text-justify">
              This certifies that commercial enterprise or establishment registered under <strong>{document.residentName}</strong>, situated at <strong>{document.purok}</strong>, Barangay 4A, has complied with the barangay environmental, sanitation, and peace ordinances.
            </p>
            <p className="indent-8 leading-relaxed text-justify">
              Clearance is granted for the operation of: <strong>{document.purpose || 'Commercial business permit renewal'}</strong>, subject to regular inspection and compliance with local municipal codes.
            </p>
          </>
        );
      case 'first_time_jobseeker':
        return (
          <>
            <p className="indent-8 leading-relaxed mb-4 text-justify">
              This certification is issued in compliance with <strong>Republic Act No. 11261 (First Time Jobseekers Assistance Act)</strong>, certifying that <strong>{document.residentName}</strong> is a qualified first-time jobseeker residing in <strong>{document.purok}</strong>, Barangay 4A.
            </p>
            <p className="indent-8 leading-relaxed text-justify">
              By virtue of RA 11261, no government fees or charges were collected for this document. Valid for one (1) year from date of issuance.
            </p>
          </>
        );
      default:
        return (
          <p className="indent-8 leading-relaxed text-justify">
            This certifies that <strong>{document.residentName}</strong> is an active resident of <strong>{document.purok}</strong>, Barangay 4A, San Pablo City, Laguna, and that this document is issued for: <strong>{document.purpose}</strong>.
          </p>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-auto animate-in zoom-in-95">
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold text-sm">Official Barangay Issued Document Viewer</span>
            <span className="text-[11px] bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded-full">
              Status: {document.status.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              id="print-document-btn"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Sheet */}
        <div className="p-8 sm:p-12 text-slate-900 bg-white relative print:p-0 print:border-none">
          {/* Subtle Watermark Seal */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035]">
            <Building2 className="w-96 h-96 text-slate-900" />
          </div>

          {/* Letterhead Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center relative">
            <div className="flex items-center justify-between mb-2">
              {/* San Pablo City Seal Placeholder */}
              <div className="w-16 h-16 rounded-full border-2 border-slate-800 flex items-center justify-center bg-slate-50 shrink-0">
                <span className="text-[10px] font-bold text-center leading-tight">PASIG<br/>CITY</span>
              </div>

              <div className="flex-1 px-4">
                <p className="text-xs font-medium tracking-wider text-slate-600 uppercase">Republic of the Philippines</p>
                <p className="text-xs font-medium text-slate-600">National Capital Region • City of Pasig</p>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight mt-0.5">
                  BARANGAY SAN JOSE
                </h2>
                <p className="text-xs font-semibold text-slate-700 uppercase tracking-widest mt-0.5">
                  Office of the Punong Barangay
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  Barangay Hall Complex, E. Santos St., San Pablo City • Tel: (02) 8642-1111
                </p>
              </div>

              {/* Barangay 4A Seal */}
              <div className="w-16 h-16 rounded-full border-2 border-emerald-800 bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold text-xs shrink-0">
                <span className="text-[10px] font-extrabold text-center leading-tight">BRGY<br/>SAN JOSE</span>
              </div>
            </div>
          </div>

          {/* Document Content Split Layout */}
          <div className="grid grid-cols-12 gap-6 mt-6">
            {/* Left Sidebar: Sangguniang Barangay Council */}
            <div className="col-span-12 sm:col-span-4 border-r-0 sm:border-r border-slate-200 pr-0 sm:pr-4 text-center sm:text-left text-xs space-y-3">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <p className="text-[11px] font-black text-slate-900 uppercase">Hon. Roberto V. Gomez</p>
                <p className="text-[10px] font-semibold text-emerald-700">Punong Barangay</p>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-700">
                <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">
                  Sangguniang Barangay Kagawad
                </p>
                <p className="font-medium">Hon. Antonio Morales <span className="text-[10px] text-slate-500 block">Peace & Order</span></p>
                <p className="font-medium">Hon. Dr. Evelyn Cruz <span className="text-[10px] text-slate-500 block">Health & Sanitation</span></p>
                <p className="font-medium">Hon. Gabriel Santos <span className="text-[10px] text-slate-500 block">Infrastructure</span></p>
                <p className="font-medium">Hon. Corazon Dizon <span className="text-[10px] text-slate-500 block">Social Services</span></p>
                <p className="font-medium">Hon. Jaime Rivera <span className="text-[10px] text-slate-500 block">Livelihood & Commerce</span></p>
                <p className="font-medium">Hon. Patricia Reyes <span className="text-[10px] text-slate-500 block">Education & Youth</span></p>
                <p className="font-medium">Hon. Mark Alcantara <span className="text-[10px] text-slate-500 block">SK Chairman</span></p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-600">
                <p><strong>Atty. Katrina David</strong><br/>Barangay Secretary</p>
                <p className="mt-1"><strong>Ramon S. Perez</strong><br/>Barangay Treasurer</p>
              </div>
            </div>

            {/* Main Certificate Body */}
            <div className="col-span-12 sm:col-span-8 flex flex-col justify-between">
              <div>
                {/* Title */}
                <div className="text-center my-4">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading tracking-wide underline underline-offset-4 decoration-2 decoration-emerald-600">
                    {getDocTitle()}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">Ref: {document.referenceNumber}</p>
                </div>

                <p className="font-bold text-xs uppercase tracking-widest text-slate-800 mb-3">
                  TO WHOM IT MAY CONCERN:
                </p>

                <div className="text-xs sm:text-sm text-slate-800">
                  {getDocBodyText()}
                </div>
              </div>

              {/* Signatures & QR Authentication Footer */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Dynamic QR Verification Box */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 bg-slate-50/80">
                    {/* SVG Stylized QR representation */}
                    <div className="w-16 h-16 bg-white p-1 rounded-md border border-slate-300 shadow-2xs shrink-0 flex flex-col items-center justify-center">
                      <div className="w-full h-full grid grid-cols-5 gap-0.5 p-0.5">
                        <div className="bg-slate-900 col-span-2 row-span-2"></div>
                        <div className="bg-slate-200"></div>
                        <div className="bg-slate-900 col-span-2 row-span-2"></div>
                        <div className="bg-slate-900"></div>
                        <div className="bg-slate-900"></div>
                        <div className="bg-slate-200"></div>
                        <div className="bg-slate-900"></div>
                        <div className="bg-slate-900"></div>
                        <div className="bg-slate-900 col-span-2 row-span-2"></div>
                        <div className="bg-slate-200"></div>
                        <div className="bg-slate-900"></div>
                        <div className="bg-slate-900"></div>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        e-Kapitan QR Verified
                      </p>
                      <p className="text-[9px] font-mono text-slate-500">{document.verificationCode}</p>
                      <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">
                        Scan or enter code on portal to verify document authenticity.
                      </p>
                    </div>
                  </div>

                  {/* Punong Barangay Signature */}
                  <div className="text-center sm:text-right min-w-[180px]">
                    <div className="h-10 flex items-end justify-center sm:justify-end">
                      <span className="font-serif italic text-emerald-800 text-sm font-semibold transform -rotate-3">
                        R.V. Gomez
                      </span>
                    </div>
                    <div className="border-t border-slate-900 pt-1">
                      <p className="text-xs font-black text-slate-900 uppercase">HON. ROBERTO V. GOMEZ</p>
                      <p className="text-[10px] font-medium text-slate-600">Punong Barangay</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2">
                  <span>Issued on: {document.updatedAt || document.submittedAt}</span>
                  <span>Document Fee: {document.isFreeDueToExemption ? 'FREE (Exempt)' : `₱${document.fee}.00`}</span>
                  <span>System Ref: {document.referenceNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
