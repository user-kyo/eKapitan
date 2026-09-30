import React, { useState } from 'react';
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
  Users2
} from 'lucide-react';

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
    queueTickets
  } = useBarangay();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hotlineModalOpen, setHotlineModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingRequestsCount = documentRequests.filter(r => r.status === 'under_review' || r.status === 'submitted').length;
  const activeQueueCount = queueTickets.filter(q => q.status === 'waiting').length;

  const handleRoleSelect = (role: UserRole) => {
    switchUserRole(role);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Civic Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-medium tracking-wide text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Republic of the Philippines • City of Pasig • Barangay San Jose
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">Office Hours: Mon - Fri 8:00 AM - 5:00 PM</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setHotlineModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold transition-colors cursor-pointer"
            id="emergency-hotlines-btn"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency: (02) 8642-1111</span>
          </button>

          {/* Large Text / Accessibility Toggle */}
          <button
            onClick={() => setLargeTextMode(prev => !prev)}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded transition-all text-xs font-medium cursor-pointer ${
              largeTextMode 
                ? 'bg-amber-400 text-slate-950 font-bold' 
                : 'text-slate-300 hover:text-white bg-slate-800'
            }`}
            title="Toggle Large Text for easier reading (Senior & Accessibility Mode)"
            id="accessibility-text-toggle"
          >
            <Type className="w-3.5 h-3.5" />
            <span>{largeTextMode ? 'Large Text: ON' : 'Large Text'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo & Barangay Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
            if (currentRole === 'citizen') setActiveTab('home');
            else if (currentRole === 'staff') setActiveTab('dashboard');
            else setActiveTab('executive_dashboard');
          }}>
            {/* Seal / Emblem */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 border-2 border-amber-300/60 shrink-0">
              <Building2 className="w-6 h-6 text-white" />
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1 rounded-full border border-white">
                SJ
              </span>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                  e-Kapitan
                </span>
                <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                  Barangay San Jose
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Citizen Service & Digital Local Governance Portal
              </p>
            </div>
          </div>

          {/* Center / Role Switcher Banner (Crucial for testing all user journeys) */}
          <div className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200 shadow-inner">
            <span className="text-[11px] font-semibold text-slate-500 uppercase px-2 tracking-wider">
              Preview Role:
            </span>
            <button
              onClick={() => handleRoleSelect('citizen')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentRole === 'citizen'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              id="role-citizen-btn"
            >
              <User className="w-3.5 h-3.5" />
              <span>Resident / Citizen</span>
            </button>

            <button
              onClick={() => handleRoleSelect('staff')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentRole === 'staff'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              id="role-staff-btn"
            >
              <Users2 className="w-3.5 h-3.5" />
              <span>Barangay Staff</span>
              {pendingRequestsCount > 0 && (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {pendingRequestsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleRoleSelect('official')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentRole === 'official'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              id="role-official-btn"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Officials / Admin</span>
            </button>
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
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Barangay Advisories & Updates
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium">3 Active</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {announcements.map((anc) => (
                      <div key={anc.id} className="p-3 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-2">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            anc.isUrgent ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {anc.category}
                          </span>
                          <span className="text-xs font-medium text-slate-900 line-clamp-1">{anc.title}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{anc.content}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{anc.date} • {anc.author}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setActiveTab('announcements');
                        setNotificationsOpen(false);
                      }}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      View All Announcements →
                    </button>
                  </div>
                </div>
              )}
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
              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                  </div>

                  <div className="px-2 py-1.5">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2">
                      Switch Active Role
                    </span>
                    <button
                      onClick={() => handleRoleSelect('citizen')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left mt-1 ${
                        currentRole === 'citizen' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p>Citizen / Resident</p>
                          <p className="text-[10px] text-slate-400">Request documents, track tickets</p>
                        </div>
                      </div>
                      {currentRole === 'citizen' && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>

                    <button
                      onClick={() => handleRoleSelect('staff')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left mt-1 ${
                        currentRole === 'staff' ? 'bg-blue-50 text-blue-800 font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users2 className="w-4 h-4 text-blue-600" />
                        <div>
                          <p>Barangay Staff</p>
                          <p className="text-[10px] text-slate-400">Process requests, manage queue</p>
                        </div>
                      </div>
                      {currentRole === 'staff' && <Check className="w-4 h-4 text-blue-600" />}
                    </button>

                    <button
                      onClick={() => handleRoleSelect('official')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left mt-1 ${
                        currentRole === 'official' ? 'bg-purple-50 text-purple-800 font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-purple-700" />
                        <div>
                          <p>Barangay Official / Admin</p>
                          <p className="text-[10px] text-slate-400">Executive analytics & controls</p>
                        </div>
                      </div>
                      {currentRole === 'official' && <Check className="w-4 h-4 text-purple-700" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700 block mb-2">Switch Active View:</span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => handleRoleSelect('citizen')}
                className={`py-2 px-1 text-center rounded-lg text-xs font-bold ${
                  currentRole === 'citizen' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Resident
              </button>
              <button
                onClick={() => handleRoleSelect('staff')}
                className={`py-2 px-1 text-center rounded-lg text-xs font-bold ${
                  currentRole === 'staff' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Staff
              </button>
              <button
                onClick={() => handleRoleSelect('official')}
                className={`py-2 px-1 text-center rounded-lg text-xs font-bold ${
                  currentRole === 'official' ? 'bg-purple-700 text-white' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Official
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => { setActiveTab('qr_verify'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>QR Document Verification</span>
            </button>
            <button
              onClick={() => { setActiveTab('ai_assistant'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Ask Ka-Barangay AI</span>
            </button>
          </div>
        </div>
      )}

      {/* Emergency Hotlines Modal */}
      {hotlineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-lg font-heading">
                <PhoneCall className="w-5 h-5" />
                <span>Barangay San Jose Emergency Hotlines</span>
              </div>
              <button
                onClick={() => setHotlineModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
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
                  <p className="text-xs font-bold text-slate-800">Barangay San Jose Health Center</p>
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
          </div>
        </div>
      )}
    </header>
  );
};
