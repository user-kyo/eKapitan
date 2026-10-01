/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { BarangayProvider, useBarangay } from './context/BarangayContext';
import { Header } from './components/common/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { OfficialDocumentTemplate } from './components/common/OfficialDocumentTemplate';
import { PageSkeleton } from './components/common/PageSkeleton';
import { LandingLogin } from './components/auth/LandingLogin';

// Citizen Components
import { CitizenHome } from './components/citizen/CitizenHome';
import { ServicesDirectory } from './components/citizen/ServicesDirectory';
import { DocumentRequestWizard } from './components/citizen/DocumentRequestWizard';
import { MyRequestsTracker } from './components/citizen/MyRequestsTracker';
import { ComplaintsView } from './components/citizen/ComplaintsView';
import { AICitizenAssistant } from './components/citizen/AICitizenAssistant';
import { DocumentVerification } from './components/citizen/DocumentVerification';
import { AppointmentsView } from './components/citizen/AppointmentsView';
import { GuestPortal } from './components/citizen/GuestPortal';
import { GuestReportIncident } from './components/citizen/GuestReportIncident';
import { GuestReportStatus } from './components/citizen/GuestReportStatus';
import { GuestSettings } from './components/citizen/GuestSettings';
import { GuestHelp } from './components/citizen/GuestHelp';

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
  CheckCircle2,
  Home,
  QrCode,
  LayoutDashboard,
  Calendar,
  Users2,
  ClipboardList,
  PieChart,
  FileSignature,
  FileCheck2
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    isAuthenticated,
    activeTab, 
    setActiveTab, 
    currentRole, 
    selectedDocumentForPrint, 
    setSelectedDocumentForPrint,
    largeTextMode 
  } = useBarangay();

  const [selectedServiceForWizard, setSelectedServiceForWizard] = useState<any | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Trigger simulated loading skeleton when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 600); // 600ms skeleton display
    return () => clearTimeout(timer);
  }, [activeTab, currentRole]);

  // Define tab navigation for each role
  const citizenTabs = [
    { id: 'home', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { id: 'services', label: 'Services', icon: <FileText className="w-5 h-5" /> },
    { id: 'tracking', label: 'My Applications', icon: <Clock className="w-5 h-5" /> },
    { id: 'complaints', label: 'Report Incident', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'appointments', label: 'Book Appointment', icon: <Calendar className="w-5 h-5" /> },
    { id: 'qr_verify', label: 'Verify QR', icon: <QrCode className="w-5 h-5" /> },
    { id: 'ai_assistant', label: 'AI Assistant', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'announcements', label: 'Advisories', icon: <Megaphone className="w-5 h-5" /> },
  ];

  const staffTabs = [
    { id: 'dashboard', label: 'Operations Desk', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'staff_documents', label: 'Document Queue', icon: <FileText className="w-5 h-5" /> },
    { id: 'staff_queue', label: 'Smart Queue', icon: <Users className="w-5 h-5" /> },
    { id: 'staff_residents', label: 'Masterlist', icon: <Users2 className="w-5 h-5" /> },
    { id: 'staff_incidents', label: 'Blotter & Lupon', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'staff_cashier', label: 'Treasury', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'staff_announcements', label: 'Advisories', icon: <Megaphone className="w-5 h-5" /> },
  ];

  const officialTabs = [
    { id: 'executive_dashboard', label: 'Intelligence', icon: <PieChart className="w-5 h-5" /> },
    { id: 'official_blotter', label: 'Blotter', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'official_audit', label: 'Audit Trail', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'official_announcements', label: 'Advisories', icon: <Megaphone className="w-5 h-5" /> },
  ];

  const guestTabs = [
    { id: 'guest_home', label: 'Guest Portal', icon: <Home className="w-5 h-5" /> },
    { id: 'file_report', label: 'File Report', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'report_status', label: 'Report Status', icon: <FileCheck2 className="w-5 h-5" /> },
    { id: 'qr_verify', label: 'Verify Document', icon: <QrCode className="w-5 h-5" /> },
    { id: 'ai_assistant', label: 'Ka-Barangay AI', icon: <Sparkles className="w-5 h-5" /> },
  ];

  const currentTabs = 
    currentRole === 'citizen' ? citizenTabs :
    currentRole === 'staff' ? staffTabs : 
    currentRole === 'official' ? officialTabs : 
    currentRole === 'guest' ? guestTabs : [];

  const renderCurrentView = () => {
    if (isPageLoading) {
      return <PageSkeleton />;
    }

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

      // Guest Views (added explicitly here for clarity, though qr_verify/ai_assistant fall through to Citizen if no exact match, we should handle them explicitly here if we want to ensure separation)
      case 'guest_home':
        return <GuestPortal />;
      case 'file_report':
        return <GuestReportIncident />;
      case 'report_status':
        return <GuestReportStatus />;
      case 'guest_settings':
        return <GuestSettings />;
      case 'guest_help':
        return <GuestHelp />;

      default:
        return currentRole === 'citizen' 
          ? <CitizenHome /> 
          : currentRole === 'staff' 
          ? <StaffDashboard /> 
          : currentRole === 'guest'
          ? <GuestPortal />
          : <ExecutiveDashboard />;
    }
  };

  // The login check is now handled in MainAppWrapper

  return (
    <div className={`min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 ${
      largeTextMode ? 'text-lg' : 'text-base'
    }`}>
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Global Civic Header */}
      <Header />

      {/* Bottom Navigation Bar */}
      {currentTabs.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
          <div className="flex items-center justify-around w-full overflow-x-auto scrollbar-none px-2 py-2 gap-2">
            {currentTabs.map((tab) => {
              const isActive = activeTab === tab.id || (tab.id === 'dashboard' && activeTab === 'staff_dashboard') || (tab.id === 'executive_dashboard' && activeTab === 'official_dashboard') || (tab.id === 'guest_home' && activeTab === 'guest_home');
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  title={tab.label}
                  className={`flex flex-col items-center justify-center p-3 min-w-[64px] transition-colors rounded-xl ${
                    isActive
                      ? currentRole === 'citizen'
                        ? 'text-emerald-700 bg-emerald-50'
                        : currentRole === 'staff'
                        ? 'text-blue-700 bg-blue-50'
                        : currentRole === 'official'
                        ? 'text-purple-800 bg-purple-50'
                        : 'text-slate-900 bg-slate-100' // Guest active state
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                  id={`bottomnav-${tab.id}`}
                >
                  <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                    {tab.icon}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Desktop Sidebar / Sub-Navbar Navigation */}
      {currentTabs.length > 0 && (
        <div className="hidden md:block bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-30 shadow-2xs overflow-x-auto scrollbar-none">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 sm:gap-2 py-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-2 hidden md:inline">
                Navigation:
              </span>
              {currentTabs.map((tab) => {
                const isActive = activeTab === tab.id || (tab.id === 'dashboard' && activeTab === 'staff_dashboard') || (tab.id === 'executive_dashboard' && activeTab === 'official_dashboard') || (tab.id === 'guest_home' && activeTab === 'guest_home');
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? currentRole === 'citizen'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : currentRole === 'staff'
                          ? 'bg-blue-700 text-white shadow-xs'
                          : currentRole === 'official'
                          ? 'bg-purple-800 text-white shadow-xs'
                          : 'bg-slate-800 text-white shadow-xs' // Guest active state
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    id={`subnav-${tab.id}`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden pb-24 md:pb-8 relative">
        {!currentTabs.some(tab => tab.id === activeTab) && (
          <button 
            onClick={() => setActiveTab(currentRole === 'guest' ? 'guest_home' : currentRole === 'staff' ? 'staff_dashboard' : currentRole === 'official' ? 'official_dashboard' : 'home')}
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 mb-6 font-bold text-sm transition-colors w-fit cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            Back
          </button>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${currentRole}-${isPageLoading ? 'skeleton' : 'loaded'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Printable Official Certificate Modal Overlay */}
      {selectedDocumentForPrint && (
        <OfficialDocumentTemplate
          document={selectedDocumentForPrint}
          onClose={() => setSelectedDocumentForPrint(null)}
        />
      )}

      {/* Clean Civic Footer */}
      <footer className="no-print bg-white border-t border-slate-200 mt-auto py-6 text-center text-slate-500 text-xs">
        © 2026 e-Kapitan Civic Platform. All rights reserved.
      </footer>
    </div>
  );
};

const MainAppWrapper: React.FC = () => {
  const { isAuthenticated } = useBarangay();

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        <motion.div
          key="login"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="min-h-screen bg-slate-50"
        >
          <LandingLogin />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <MainAppContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <BarangayProvider>
      <MainAppWrapper />
    </BarangayProvider>
  );
}
