import React from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { Settings, Save, Moon, Sun, Bell, Shield, User } from 'lucide-react';

export const GuestSettings: React.FC = () => {
  const { largeTextMode, setLargeTextMode } = useBarangay();

  return (
    <div className={`max-w-3xl mx-auto space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white shadow-lg shrink-0">
            <Settings className="w-6 h-6 text-slate-200" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">Account Settings</h2>
            <p className="text-sm text-slate-500">Manage your guest profile and preferences.</p>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          {/* Profile Details (Readonly for Guest) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Profile Information</h3>
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Guest User</p>
                <p className="text-sm text-slate-500">guest@ekapitan.local</p>
                <span className="mt-2 inline-block text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                  Unverified Account
                </span>
              </div>
            </div>
            <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
              To update your profile or access full citizen services, please register for a permanent resident account.
            </p>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Preferences</h3>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <span className="text-lg font-bold">A</span>
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Large Text Mode</p>
                    <p className="text-xs text-slate-500">Increase font sizes across the application</p>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={largeTextMode}
                  onChange={(e) => setLargeTextMode(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors opacity-70">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Push Notifications</p>
                    <p className="text-xs text-slate-500">Available for registered users only</p>
                  </div>
                </div>
                <input type="checkbox" disabled className="w-5 h-5" />
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
