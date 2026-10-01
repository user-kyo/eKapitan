import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBarangay } from '../../context/BarangayContext';
import { UserRole } from '../../types';
import { 
  Building2, 
  User, 
  ShieldCheck, 
  ChevronDown, 
  PhoneCall, 
  Bell, 
  Type, 
  Check, 
  Sparkles,
  Search,
  Menu,
  X,
  FileCheck2,
  Users2,
  LogOut,
  Settings,
  HelpCircle
} from 'lucide-react';
import { createPortal } from 'react-dom';

export const Header: React.FC = () => {
  const { 
    currentRole, 
    currentUser, 
    switchUserRole, 
    activeTab, 
    setActiveTab, 
    largeTextMode, 
    setLargeTextMode,
    announcements,
    documentRequests,
    queueTickets,
    setIsAuthenticated
  } = useBarangay();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hotlineModalOpen, setHotlineModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const pendingRequestsCount = documentRequests.filter(r => r.status === 'under_review' || r.status === 'submitted').length;
  const activeQueueCount = queueTickets.filter(q => q.status === 'waiting').length;

  const handleRoleSelect = (role: UserRole) => {
    switchUserRole(role);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo & Barangay Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
            if (currentRole === 'citizen') setActiveTab('home');
            else if (currentRole === 'staff') setActiveTab('dashboard');
            else if (currentRole === 'official') setActiveTab('executive_dashboard');
            else setActiveTab('guest_home');
          }}>
            {/* Seal / Emblem */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 border-2 border-amber-300/60 shrink-0">
              <Building2 className="w-6 h-6 text-white" />
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1 rounded-full border border-white">
                4A
              </span>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                  e-Kapitan
                </span>
                <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                  Barangay 4A
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Citizen Service & Digital Local Governance Portal
              </p>
            </div>
          </div>


          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick QR Verify button */}
            <button
              onClick={() => setActiveTab('qr_verify')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-colors cursor-pointer"
              title="Verify an issued Barangay Document QR Code"
              id="verify-document-nav-btn"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Verify Document</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer"
                title="Notifications"
                id="notifications-bell-btn"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>

              {/* Notifications Popover */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-x-4 top-[72px] sm:absolute sm:inset-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Barangay Advisories & Updates
                      </span>
                      <span className="text-[11px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">3 Active</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                      {announcements.map((anc) => (
                        <div key={anc.id} className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${anc.isUrgent ? 'bg-rose-500' : 'bg-blue-500'}`} />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm ${
                                  anc.isUrgent ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {anc.category}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">{anc.date}</span>
                              </div>
                              <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">{anc.title}</span>
                              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{anc.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-100 text-center bg-slate-50/50">
                      <button
                        onClick={() => {
                          setActiveTab('announcements');
                          setNotificationsOpen(false);
                        }}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        View All Announcements &rarr;
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Pill & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                id="user-profile-menu-btn"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs overflow-hidden border border-emerald-300">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    currentUser.name.charAt(0)
                  )}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-slate-900 leading-tight line-clamp-1">{currentUser.name}</p>
                  <p className="text-[10px] font-medium text-slate-500 leading-tight">{currentUser.roleTitle}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Role Dropdown Menu */}
              <AnimatePresence>
                {roleDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 font-medium truncate">{currentUser.email}</p>
                    </div>

                    <div className="px-2 py-2 space-y-1">
                      <button 
                        onClick={() => {
                          setActiveTab('guest_settings');
                          setRoleDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Account Settings</span>
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('guest_help');
                          setRoleDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                        <span>Help & Support</span>
                      </button>
                    </div>

                    <div className="px-2 pb-1 pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setRoleDropdownOpen(false);
                          setLogoutModalOpen(true);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


          </div>
        </div>
      </div>



      {/* Emergency Hotlines Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {hotlineModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHotlineModalOpen(false)}
              className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-lg font-heading">
                    <PhoneCall className="w-5 h-5" />
                    <span>Barangay 4A Emergency Hotlines</span>
                  </div>
                  <button
                    onClick={() => setHotlineModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-rose-900">Barangay Emergency Operations (24/7)</p>
                      <p className="text-sm font-extrabold text-rose-700 mt-0.5">(02) 8642-1111 / 0917-888-5673</p>
                    </div>
                    <span className="text-[10px] font-bold bg-rose-200 text-rose-900 px-2 py-1 rounded-md">24/7 Blue Alert</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Barangay Tanod Headquarters (Security)</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">(02) 8642-2222</p>
                    </div>
                    <span className="text-[10px] text-slate-500">Patrol Base</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Barangay 4A Health Center</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">(02) 8642-3333</p>
                    </div>
                    <span className="text-[10px] text-slate-500">Ambulance Dispatch</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-blue-900">National Emergency Hotline</p>
                      <p className="text-sm font-extrabold text-blue-700 mt-0.5">911 (Police / Fire / Paramedic)</p>
                    </div>
                    <span className="text-[10px] text-blue-800 font-semibold">National</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setHotlineModalOpen(false)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Close Hotlines
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
      document.body)}

      {/* Logout Confirmation Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {logoutModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLogoutModalOpen(false)}
              className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full p-6 sm:p-8 border border-slate-200 text-center"
              >
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-inner">
                  <LogOut className="w-8 h-8 text-rose-500 ml-1" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">Sign Out</h3>
                <p className="text-sm text-slate-500 mb-8">
                  Are you sure you want to sign out? You will need to log in or continue as a guest again to access civic services.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setLogoutModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setLogoutModalOpen(false);
                      setIsAuthenticated(false);
                    }}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/20 transition-all cursor-pointer text-sm"
                  >
                    Yes, Sign Out
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
      document.body)}
    </header>
  );
};
