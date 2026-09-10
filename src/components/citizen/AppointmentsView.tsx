import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';

export const AppointmentsView: React.FC = () => {
  const { currentUser, setActiveTab, largeTextMode } = useBarangay();

  const [service, setService] = useState<string>('Barangay Clearance Application');
  const [date, setDate] = useState<string>('2026-09-12');
  const [timeSlot, setTimeSlot] = useState<string>('09:30 AM - 10:30 AM');
  const [remarks, setRemarks] = useState<string>('First-time job application submission');
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const [userAppointments, setUserAppointments] = useState([
    {
      id: 'APT-2026-001',
      service: 'Barangay Clearance Application',
      date: '2026-09-11',
      time: '10:00 AM - 11:00 AM',
      counter: 'Counter 2 (Clearances)',
      status: 'Confirmed'
    }
  ]);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt = {
      id: `APT-2026-${Math.floor(100 + Math.random() * 900)}`,
      service,
      date,
      time: timeSlot,
      counter: 'Counter 1 / 2 (General Services)',
      status: 'Confirmed'
    };
    setUserAppointments(prev => [newApt, ...prev]);
    setConfirmed(true);
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Express In-Person Appointments</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Schedule a Barangay Counter Visit
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Reserve an appointment slot in advance to skip regular waiting lines. Perfect for busy workers, students, and seniors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900 font-heading pb-2 border-b border-slate-100">
            Select Service & Appointment Window
          </h3>

          <form onSubmit={handleBook} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Service Required *
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
              >
                <option value="Barangay Clearance Application">Barangay Clearance Application</option>
                <option value="Certificate of Residency">Certificate of Residency</option>
                <option value="Certificate of Indigency">Certificate of Indigency</option>
                <option value="Barangay Business Clearance">Barangay Business Clearance</option>
                <option value="Community Tax Certificate (Cedula)">Community Tax Certificate (Cedula)</option>
                <option value="Lupon / Barangay Mediation Desk">Lupon / Barangay Mediation Desk</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Appointment Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Time Slot Window *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                >
                  <option value="08:30 AM - 09:30 AM">08:30 AM - 09:30 AM (Morning Entry)</option>
                  <option value="09:30 AM - 10:30 AM">09:30 AM - 10:30 AM (Popular Slot)</option>
                  <option value="10:30 AM - 11:30 AM">10:30 AM - 11:30 AM</option>
                  <option value="01:30 PM - 02:30 PM">01:30 PM - 02:30 PM (Afternoon)</option>
                  <option value="02:30 PM - 03:30 PM">02:30 PM - 03:30 PM</option>
                  <option value="03:30 PM - 04:30 PM">03:30 PM - 04:30 PM (Closing Slot)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Special Remarks / Notes
              </label>
              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g. Bringing supporting documents for RA 11261"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm Appointment Reservation</span>
            </button>
          </form>

          {confirmed && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Appointment Successfully Booked!</strong>
                <p className="mt-0.5">Please arrive 5 minutes before your time slot and show your confirmation ID at Counter 2.</p>
              </div>
            </div>
          )}
        </div>

        {/* Existing Appointments & Tips */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Your Scheduled Appointments ({userAppointments.length})
            </h3>

            <div className="space-y-3">
              {userAppointments.map((apt) => (
                <div key={apt.id} className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                      {apt.id}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {apt.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{apt.service}</h4>
                  <div className="text-[11px] text-slate-600 space-y-0.5">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{apt.date}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{apt.time}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{apt.counter}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Info className="w-4 h-4 text-emerald-600" />
              <span>Counter Courtesy Guidelines</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Bring original documents (Valid ID and Proof of Residency) to present to the desk clerk. Senior citizens, pregnant women, and PWDs are automatically given front-counter priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
