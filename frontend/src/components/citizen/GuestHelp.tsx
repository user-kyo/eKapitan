import React from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { HelpCircle, Mail, Phone, ExternalLink, ChevronRight } from 'lucide-react';

export const GuestHelp: React.FC = () => {
  const { largeTextMode } = useBarangay();

  const faqs = [
    {
      q: "How do I file an anonymous report?",
      a: "Navigate to the 'File Report' tab from the guest portal. Fill out the details of the incident. Note down the Reference Code provided at the end to track the status later."
    },
    {
      q: "How can I verify a barangay document?",
      a: "Go to the 'Verify Document' section and enter the verification code found on the printed document, or use a scanner to scan the QR code."
    },
    {
      q: "Can I request a clearance as a guest?",
      a: "No, formal document requests require a registered and verified resident account. Please sign up or log in to access the Document Request Wizard."
    }
  ];

  return (
    <div className={`max-w-3xl mx-auto space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shrink-0">
            <HelpCircle className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">Help & Support</h2>
            <p className="text-sm text-slate-500">Guides and contact information for assistance.</p>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          
          {/* FAQs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-200 transition-colors">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="text-sm text-slate-600 pl-6 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Contact Us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="mailto:support@ekapitan.local" className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all group">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Email Support</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">support@ekapitan.local</p>
                </div>
              </a>

              <a href="tel:0286421111" className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all group">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Barangay Hotline</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700">(02) 8642-1111</p>
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
