import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { DocumentType } from '../../types';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  User, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Upload, 
  AlertCircle,
  FileCheck2,
  Sparkles
} from 'lucide-react';

interface DocumentRequestWizardProps {
  initialServiceId?: string;
}

export const DocumentRequestWizard: React.FC<DocumentRequestWizardProps> = ({ initialServiceId }) => {
  const { 
    services, 
    currentUser, 
    createDocumentRequest, 
    setActiveTab, 
    largeTextMode 
  } = useBarangay();

  const [step, setStep] = useState<number>(1);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>(
    (initialServiceId as DocumentType) || 'barangay_clearance'
  );

  // Form states
  const [purpose, setPurpose] = useState<string>('Local Employment Requirement');
  const [residentName, setResidentName] = useState<string>(currentUser.name);
  const [contactNumber, setContactNumber] = useState<string>('0917-555-0123');
  const [purok, setPurok] = useState<string>('Purok 2 - Riverside');
  const [processingMethod, setProcessingMethod] = useState<'pickup' | 'express_counter' | 'digital_copy'>('pickup');
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-09-11');
  const [appointmentTime, setAppointmentTime] = useState<string>('10:00 AM - 11:00 AM');
  
  // Exemption
  const [claimExemption, setClaimExemption] = useState<boolean>(false);
  const [exemptionReason, setExemptionReason] = useState<string>('First-Time Jobseeker (RA 11261)');

  // Uploaded requirements simulation
  const [requirementsState, setRequirementsState] = useState<{ name: string; submitted: boolean }[]>([
    { name: 'Valid Government or Student ID', submitted: true },
    { name: 'Community Tax Certificate (Cedula)', submitted: true },
    { name: 'Proof of Billing / Residency', submitted: true }
  ]);

  const currentService = services.find(s => s.id === selectedDocType) || services[0];
  const fee = claimExemption || currentService.fee === 0 ? 0 : currentService.fee;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    createDocumentRequest({
      documentType: selectedDocType,
      documentTitle: currentService.title,
      residentName,
      purok,
      contactNumber,
      purpose,
      fee,
      isFreeDueToExemption: claimExemption || currentService.fee === 0,
      exemptionReason: claimExemption ? exemptionReason : undefined,
      processingMethod,
      appointmentDate: processingMethod !== 'digital_copy' ? appointmentDate : undefined,
      appointmentTime: processingMethod !== 'digital_copy' ? appointmentTime : undefined,
      requirementsSubmitted: requirementsState.map(r => ({ ...r, verified: false }))
    });

    setActiveTab('tracking');
  };

  return (
    <div className={`max-w-3xl mx-auto space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Step Indicator */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Select Document' },
            { num: 2, label: 'Applicant Details' },
            { num: 3, label: 'Processing & Schedule' },
            { num: 4, label: 'Review & Submit' }
          ].map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step > s.num
                      ? 'bg-emerald-600 text-white'
                      : step === s.num
                      ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-600'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-xs font-semibold hidden md:inline ${
                  step === s.num ? 'text-slate-900 font-bold' : 'text-slate-400'
                }`}>
                  {s.label}
                </span>
              </div>
              {idx < 3 && <div className="flex-1 h-0.5 mx-2 sm:mx-4 bg-slate-200"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1: Select Document */}
      {step === 1 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Step 1: Select Document to Request
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Choose the official certificate you need from Barangay San Jose.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((svc) => (
              <div
                key={svc.id}
                onClick={() => setSelectedDocType(svc.id as DocumentType)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedDocType === svc.id
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                      {svc.category}
                    </span>
                    <span className="text-xs font-black text-slate-900">
                      {svc.fee === 0 ? 'FREE' : `₱${svc.fee}.00`}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{svc.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{svc.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Turnaround: {svc.processingTime}</span>
                  {selectedDocType === svc.id && (
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Purpose of Request */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Specific Purpose of Request *
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Local employment at DepEd, Postal ID, Bank Account Opening, Scholarship application"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-emerald-600"
              id="wizard-purpose-input"
            />
          </div>
        </div>
      )}

      {/* Step 2: Applicant Details */}
      {step === 2 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Step 2: Applicant & Residency Confirmation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verify your information as it appears in the Barangay San Jose resident registry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name (As registered)
              </label>
              <input
                type="text"
                value={residentName}
                onChange={(e) => setResidentName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Contact Number (SMS Updates)
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Purok / Area in Barangay San Jose
              </label>
              <select
                value={purok}
                onChange={(e) => setPurok(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
              >
                <option value="Purok 1 - Centro">Purok 1 - Centro</option>
                <option value="Purok 2 - Riverside">Purok 2 - Riverside</option>
                <option value="Purok 3 - Bukidnon">Purok 3 - Bukidnon</option>
                <option value="Purok 4 - Pag-asa">Purok 4 - Pag-asa</option>
                <option value="Purok 5 - San Roque">Purok 5 - San Roque</option>
                <option value="Purok 6 - Industrial Zone">Purok 6 - Industrial Zone</option>
              </select>
            </div>
          </div>

          {/* Legal Exemption Option (First-time jobseeker / Indigent) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="claim-exemption-checkbox"
                checked={claimExemption}
                onChange={(e) => setClaimExemption(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded mt-0.5 cursor-pointer"
              />
              <div>
                <label htmlFor="claim-exemption-checkbox" className="text-xs sm:text-sm font-bold text-slate-900 cursor-pointer">
                  I qualify for Legal Fee Exemption / Waiver
                </label>
                <p className="text-xs text-slate-500 mt-0.5">
                  Under RA 11261 (First-Time Jobseeker) or indigent social service exemption, government fees are completely waived.
                </p>
                {claimExemption && (
                  <div className="mt-3">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Legal Exemption Basis:
                    </label>
                    <select
                      value={exemptionReason}
                      onChange={(e) => setExemptionReason(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                    >
                      <option value="First-Time Jobseeker (RA 11261)">First-Time Jobseeker Assistance Act (RA 11261)</option>
                      <option value="Senior Citizen (RA 9994)">Senior Citizen Exemption (RA 9994)</option>
                      <option value="Registered Indigent Household">Registered Indigent Household / 4Ps Beneficiary</option>
                      <option value="Person with Disability (RA 7277)">Person with Disability (RA 7277)</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Processing & Schedule */}
      {step === 3 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Step 3: Document Release & Delivery Option
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select how you would like to receive your official document.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'pickup' as const,
                title: 'Standard Pick-up',
                desc: 'Pick up at the Barangay Hall counter when notified.',
                badge: 'Recommended'
              },
              {
                id: 'express_counter' as const,
                title: 'Express Counter Queue',
                desc: 'Generate immediate priority queue number for today.',
                badge: 'Fast-Track'
              },
              {
                id: 'digital_copy' as const,
                title: 'Certified Digital Copy',
                desc: 'Download printable document with QR authentication.',
                badge: 'Instant Release'
              }
            ].map((method) => (
              <div
                key={method.id}
                onClick={() => setProcessingMethod(method.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  processingMethod === method.id
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-200 inline-block mb-2">
                    {method.badge}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{method.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{method.desc}</p>
                </div>
                {processingMethod === method.id && (
                  <span className="mt-3 text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Selected
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Schedule Window if Pick-up */}
          {processingMethod !== 'digital_copy' && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Preferred Pick-up / Counter Appointment Slot</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Target Date</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Time Slot Window</label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="08:30 AM - 09:30 AM">08:30 AM - 09:30 AM (Opening Slot)</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM (Morning Slot)</option>
                    <option value="01:30 PM - 02:30 PM">01:30 PM - 02:30 PM (Afternoon Slot)</option>
                    <option value="03:30 PM - 04:30 PM">03:30 PM - 04:30 PM (Late Afternoon Slot)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {step === 4 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Step 4: Review Application Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Please double check all information before submitting to the barangay records office.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Document Requested</span>
              <span className="font-bold text-slate-900">{currentService.title}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Applicant Name</span>
              <span className="font-bold text-slate-900">{residentName}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Residency Area</span>
              <span className="font-bold text-slate-900">{purok}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Purpose</span>
              <span className="font-semibold text-slate-900 text-right max-w-xs">{purpose}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Processing Method</span>
              <span className="font-bold text-emerald-800 capitalize">{processingMethod.replace('_', ' ')}</span>
            </div>
            {processingMethod !== 'digital_copy' && (
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Scheduled Appointment</span>
                <span className="font-semibold text-slate-900">{appointmentDate} at {appointmentTime}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-sm font-bold text-slate-900 block">Total Processing Fee</span>
                {claimExemption && (
                  <span className="text-[11px] text-emerald-700 font-medium">
                    Exemption applied: {exemptionReason}
                  </span>
                )}
              </div>
              <span className="text-lg font-extrabold text-slate-900">
                {fee === 0 ? 'FREE (₱0.00)' : `₱${fee}.00`}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Upon submission, you will receive a unique tracking reference code. Barangay records officers will review your records immediately during official hours.
            </span>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>
        ) : (
          <div></div>
        )}

        {step < 4 ? (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            id="wizard-next-step-btn"
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            id="wizard-submit-btn"
          >
            <FileCheck2 className="w-4 h-4 text-amber-300" />
            <span>Submit Request & Generate Tracking</span>
          </button>
        )}
      </div>
    </div>
  );
};
