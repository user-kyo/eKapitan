/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BarangayProvider, useBarangay } from './context/BarangayContext';
import { Header } from './components/common/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { OfficialDocumentTemplate } from './components/common/OfficialDocumentTemplate';

// Citizen Components
import { CitizenHome } from './components/citizen/CitizenHome';
import { ServicesDirectory } from './components/citizen/ServicesDirectory';
import { DocumentRequestWizard } from './components/citizen/DocumentRequestWizard';
import { MyRequestsTracker } from './components/citizen/MyRequestsTracker';
import { ComplaintsView } from './components/citizen/ComplaintsView';
import { AICitizenAssistant } from './components/citizen/AICitizenAssistant';
import { DocumentVerification } from './components/citizen/DocumentVerification';
import { AppointmentsView } from './components/citizen/AppointmentsView';
import { OfficialsDirectory } from './components/citizen/OfficialsDirectory';

// Staff Components
import { StaffDashboard } from './components/staff/StaffDashboard';
import { DocumentProcessingQueue } from './components/staff/DocumentProcessingQueue';
import { SmartQueueManagement } from './components/staff/SmartQueueManagement';
import { ResidentRecordsDirectory } from './components/staff/ResidentRecordsDirectory';
import { IncidentBlotterDesk } from './components/staff/IncidentBlotterDesk';
import { CashierRevenueDesk } from './components/staff/CashierRevenueDesk';

// Official Components
import { ExecutiveDashboard } from './components/official/ExecutiveDashboard';
import { AuditTrailViewer } from './components/official/AuditTrailViewer';
import { OfficialAnnouncementsManager } from './components/official/OfficialAnnouncementsManager';
import { ManageOfficials } from './components/official/ManageOfficials';

import { 
  Building2, 
  ShieldCheck, 
  HeartHandshake, 
  HelpCircle, 
  PhoneCall, 
  Sparkles,
  Printer,
  FileText,
  Clock,
  Users,
  AlertTriangle,
  DollarSign,
  Lock,
  Megaphone,
  CheckCircle2
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentRole, 
    selectedDocumentForPrint, 
    setSelectedDocumentForPrint,
    largeTextMode 
  } = useBarangay();

  const [selectedServiceForWizard, setSelectedServiceForWizard] = useState<any | null>(null);

  // Define tab navigation for each role
  const citizenTabs = [
    { id: 'home', label: 'Overview' },
    { id: 'services', label: 'Services & Clearances' },
    { id: 'tracking', label: 'My Applications' },
    { id: 'complaints', label: 'Report Incident' },
    { id: 'appointments', label: 'Book Appointment' },
    { id: 'qr_verify', label: 'Verify QR Code' },
    { id: 'ai_assistant', label: 'Ka-Barangay AI' },
    { id: 'announcements', label: 'Advisories' },
    { id: 'officials_directory', label: 'Officials Directory' },
  ];

  const guestTabs = [
    { id: 'complaints', label: 'Report Incident' },
    { id: 'qr_verify', label: 'Verify Document' },
    { id: 'announcements', label: 'Advisories' },
    { id: 'officials_directory', label: 'Officials Directory' },
  ];

  const staffTabs = [
    { id: 'dashboard', label: 'Operations Desk' },
    { id: 'staff_documents', label: 'Document Queue' },
    { id: 'staff_queue', label: 'Smart Counter Queue' },
    { id: 'staff_residents', label: 'Resident Masterlist' },
    { id: 'staff_incidents', label: 'Blotter & Lupon' },
    { id: 'staff_cashier', label: 'Treasury & Revenue' },
    { id: 'staff_announcements', label: 'Publish Advisory' },
  ];

  const officialTabs = [
    { id: 'executive_dashboard', label: 'Executive Intelligence' },
    { id: 'official_blotter', label: 'Peace & Order Blotter' },
    { id: 'official_audit', label: 'Audit Trail' },
    { id: 'official_announcements', label: 'Barangay Advisories' },
    { id: 'manage_officials', label: 'Manage Officials' },
  ];

  const currentTabs = 
    currentRole === 'guest' ? guestTabs :
    currentRole === 'citizen' ? citizenTabs :
    currentRole === 'staff' ? staffTabs : officialTabs;

  const renderCurrentView = () => {
    switch (activeTab) {
      // Citizen Views
      case 'home':
        return <CitizenHome />;
      case 'services':
        return (
          <ServicesDirectory 
            onSelectService={(service) => {
              setSelectedServiceForWizard(service);
              setActiveTab('request_wizard');
            }} 
          />
        );
      case 'request_wizard':
        return <DocumentRequestWizard initialServiceId={selectedServiceForWizard?.id} />;
      case 'tracking':
        return <MyRequestsTracker />;
      case 'complaints':
        return <ComplaintsView />;
      case 'ai_assistant':
        return <AICitizenAssistant />;
      case 'qr_verify':
        return <DocumentVerification />;
      case 'appointments':
        return <AppointmentsView />;
      case 'announcements':
        return <OfficialAnnouncementsManager />;
      case 'officials_directory':
        return <OfficialsDirectory />;

      // Staff Views
      case 'dashboard':
      case 'staff_dashboard':
        return <StaffDashboard />;
      case 'staff_documents':
        return <DocumentProcessingQueue />;
      case 'staff_queue':
        return <SmartQueueManagement />;
      case 'staff_residents':
        return <ResidentRecordsDirectory />;
      case 'staff_incidents':
        return <IncidentBlotterDesk />;
      case 'staff_cashier':
        return <CashierRevenueDesk />;
      case 'staff_announcements':
        return <OfficialAnnouncementsManager />;

      // Official Views
      case 'executive_dashboard':
      case 'official_dashboard':
      case 'official_analytics':
        return <ExecutiveDashboard />;
      case 'official_blotter':
        return <IncidentBlotterDesk />;
      case 'official_audit':
        return <AuditTrailViewer />;
      case 'official_announcements':
        return <OfficialAnnouncementsManager />;
      case 'manage_officials':
        return <ManageOfficials />;

      default:
        return currentRole === 'citizen'
          ? <CitizenHome />
          : currentRole === 'guest'
          ? <OfficialAnnouncementsManager />
          : currentRole === 'staff' 
          ? <StaffDashboard /> 
          : <ExecutiveDashboard />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 ${
      largeTextMode ? 'text-lg' : 'text-base'
    }`}>
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Global Civic Header */}
      <Header />

      {/* Role-Specific Sub-Navbar Navigation */}
      <div className="hidden lg:block bg-white border-b border-slate-200 shadow-2xs overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-2 py-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-2 hidden md:inline">
              Navigation:
            </span>
            {currentTabs.map((tab) => {
              const isActive = activeTab === tab.id || (tab.id === 'dashboard' && activeTab === 'staff_dashboard') || (tab.id === 'executive_dashboard' && activeTab === 'official_dashboard');
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? currentRole === 'guest'
                        ? 'bg-amber-700 text-white shadow-xs'
                        : currentRole === 'citizen'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : currentRole === 'staff'
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'bg-purple-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  id={`subnav-${tab.id}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main App Container */}
      <main className="print:hidden flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {renderCurrentView()}
      </main>

      {/* Printable Official Certificate Modal Overlay */}
      {selectedDocumentForPrint && (
        <OfficialDocumentTemplate
          document={selectedDocumentForPrint}
          onClose={() => setSelectedDocumentForPrint(null)}
        />
      )}

      {/* Clean Civic Footer */}
      <footer className="print:hidden bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center font-bold text-[11px] text-emerald-800 bg-emerald-50">
              B4A
            </div>
            <div>
              <p className="font-bold text-slate-800 text-xs">
                e-Kapitan Civic Platform • Barangay 4A, San Pablo City, Laguna
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Republic of the Philippines • National Capital Region • Anti-Red Tape Authority (ARTA) Compliant
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
            <button
              onClick={() => setActiveTab('qr_verify')}
              className="hover:text-emerald-700 cursor-pointer font-medium"
            >
              Verify Document Authenticity
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('ai_assistant')}
              className="hover:text-emerald-700 cursor-pointer font-medium flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Ka-Barangay AI Citizen Guide</span>
            </button>
            <span>•</span>
            <span className="font-mono text-slate-400">Version 2.4.0-ARTA</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <BarangayProvider>
      <MainAppContent />
    </BarangayProvider>
  );
}
