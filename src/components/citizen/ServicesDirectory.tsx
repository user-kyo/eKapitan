import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { ServiceItem } from '../../types';
import { 
  FileText, 
  Search, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Filter,
  ShieldAlert,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface ServicesDirectoryProps {
  onSelectService?: (service: ServiceItem) => void;
}

export const ServicesDirectory: React.FC<ServicesDirectoryProps> = ({ onSelectService }) => {
  const { services, setActiveTab, largeTextMode } = useBarangay();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Clearance', 'Certification', 'Permit', 'Social Service'];

  const filteredServices = services.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.requirements.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleStartRequest = (service: ServiceItem) => {
    if (onSelectService) {
      onSelectService(service);
    }
    setActiveTab('request_wizard');
  };

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Directory Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Official Barangay San Jose Services</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Services & Document Requirements Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Review requirements, official municipal fees, legal exemptions, and turnaround times before requesting documents or visiting the counter.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search requirements or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-emerald-600 transition-all"
            id="service-search-input"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'All' ? 'All Services' : cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all"
            id={`service-item-${service.id}`}
          >
            <div>
              {/* Category & Fee header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {service.category}
                </span>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-900">
                    {service.fee === 0 ? 'FREE (₱0.00)' : `₱${service.fee}.00`}
                  </span>
                  {service.isFreeForEligible && service.fee > 0 && (
                    <span className="block text-[10px] font-semibold text-emerald-600">
                      Waiver Available
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                {service.description}
              </p>

              {/* Legal Exemption / Free criteria note if any */}
              {service.eligibleCriteria && (
                <div className="mt-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{service.eligibleCriteria}</span>
                </div>
              )}

              {/* Requirements Checklist */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Required Documents & Prerequisites:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {service.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Processing time & validity */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Estimated: {service.processingTime}
                </span>
                <span>Validity: {service.validityMonths} months</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={() => handleStartRequest(service)}
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                id={`request-btn-${service.id}`}
              >
                <span>Request Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Book an appointment for this service"
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Book Slot</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Search State */}
      {filteredServices.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Services Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No barangay service matched "{searchQuery}". You can ask our AI Assistant or check with our desk officer.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
