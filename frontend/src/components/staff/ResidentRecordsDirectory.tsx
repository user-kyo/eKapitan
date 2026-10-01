import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { Resident } from '../../types';
import { 
  Users, 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  MapPin, 
  HeartHandshake, 
  FileText,
  AlertTriangle,
  X,
  Edit,
  Save
} from 'lucide-react';

export const ResidentRecordsDirectory: React.FC = () => {
  const { 
    residents, 
    registerResident, 
    documentRequests, 
    largeTextMode 
  } = useBarangay();

  const [selectedResidentId, setSelectedResidentId] = useState<string>(residents[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterPurok, setFilterPurok] = useState<string>('All');
  const [filterSpecial, setFilterSpecial] = useState<string>('All'); // All, Senior, PWD, Voter
  
  // Duplicate Flags
  const [showDuplicates, setShowDuplicates] = useState<boolean>(true);
  const [showDuplicateModal, setShowDuplicateModal] = useState<boolean>(false);
  
  // Edit State
  const [isEditingActiveResident, setIsEditingActiveResident] = useState<boolean>(false);

  // Modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newFirstName, setNewFirstName] = useState<string>('');
  const [newLastName, setNewLastName] = useState<string>('');
  const [newMiddleName, setNewMiddleName] = useState<string>('');
  const [newPurok, setNewPurok] = useState<string>('Purok 1 - Centro');
  const [newBirthdate, setNewBirthdate] = useState<string>('1995-05-14');
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [newOccupation, setNewOccupation] = useState<string>('Retail Associate');
  const [newContact, setNewContact] = useState<string>('0917-555-9988');
  const [isSenior, setIsSenior] = useState<boolean>(false);
  const [isPWD, setIsPWD] = useState<boolean>(false);
  const [isVoter, setIsVoter] = useState<boolean>(true);

  const filteredResidents = residents.filter((r) => {
    const matchesPurok = filterPurok === 'All' || r.purok === filterPurok;
    const matchesSpecial = 
      filterSpecial === 'All' ? true :
      filterSpecial === 'Senior' ? r.isSenior :
      filterSpecial === 'PWD' ? r.isPWD :
      filterSpecial === 'Voter' ? r.isVoter : true;

    const fullName = `${r.firstName} ${r.lastName}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) ||
      r.residentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.householdId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPurok && matchesSpecial && matchesSearch;
  });

  const activeResident = residents.find(r => r.id === selectedResidentId) || filteredResidents[0];

  // Document history for active resident
  const residentDocs = documentRequests.filter(
    d => d.residentId === activeResident?.id || 
         d.residentName.toLowerCase() === `${activeResident?.firstName} ${activeResident?.lastName}`.toLowerCase()
  );

  const handleAddResident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName.trim() || !newLastName.trim()) return;

    const created = registerResident({
      firstName: newFirstName.trim(),
      lastName: newLastName.trim(),
      middleName: newMiddleName.trim() || undefined,
      birthDate: newBirthdate,
      gender: newGender,
      civilStatus: 'Single',
      address: `${newPurok}, Barangay 4A, San Pablo City`,
      address: `${newPurok}, Barangay 4A, San Pablo City, Laguna`,
      purok: newPurok,
      householdId: `HH-2026-00${residents.length + 1}`,
      isHouseholdHead: false,
      contactNumber: newContact,
      email: `${newFirstName.toLowerCase()}@example.ph`,
      occupation: newOccupation,
      isSenior,
      isPWD,
      isVoter,
      status: 'active'
    });

    setSelectedResidentId(created.id);
    setShowAddModal(false);
    setNewFirstName('');
    setNewLastName('');
    setNewMiddleName('');
  };

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Barangay 4A Civil Masterlist</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Resident Information & Household Records
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Centralized registry of bonafide residents, household profiling, demographic classifications, and aid beneficiaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            id="register-resident-btn"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register New Resident</span>
          </button>
        </div>
      </div>

      {/* Duplicate Alert Banner */}
      {showDuplicates && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5 flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-amber-900">System Alert: Potential Duplicate Records Detected</h4>
            <p className="text-xs sm:text-sm text-amber-700 mt-1 leading-relaxed">
              The AI profile-matching algorithm has flagged <strong>1</strong> potential duplicate entry (Name Similarity: 92%, Birth Date Match: 100%, Same Address).
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button 
                onClick={() => setShowDuplicateModal(true)} 
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Review Duplicates
              </button>
              <button 
                onClick={() => setShowDuplicates(false)} 
                className="px-4 py-1.5 bg-white text-amber-700 border border-amber-300 text-xs font-bold rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
              >
                Mark as False Positive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search name, ID, or household..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-purple-600"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <select
            value={filterPurok}
            onChange={(e) => setFilterPurok(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="All">All Puroks (1-6)</option>
            <option value="Purok 1 - Centro">Purok 1 - Centro</option>
            <option value="Purok 2 - Riverside">Purok 2 - Riverside</option>
            <option value="Purok 3 - Bukidnon">Purok 3 - Bukidnon</option>
            <option value="Purok 4 - Pag-asa">Purok 4 - Pag-asa</option>
            <option value="Purok 5 - San Roque">Purok 5 - San Roque</option>
            <option value="Purok 6 - Industrial Zone">Purok 6 - Industrial Zone</option>
          </select>

          <select
            value={filterSpecial}
            onChange={(e) => setFilterSpecial(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="All">All Classifications</option>
            <option value="Senior">Senior Citizens (60+)</option>
            <option value="PWD">PWD (Persons with Disability)</option>
            <option value="Voter">Registered Voters</option>
          </select>
        </div>
      </div>

      {/* Main Split Dossier View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Residents */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
          {filteredResidents.map((res) => {
            const isSelected = activeResident?.id === res.id;
            const fullName = `${res.firstName} ${res.lastName}`;
            return (
              <div
                key={res.id}
                onClick={() => {
                  setSelectedResidentId(res.id);
                  setIsEditingActiveResident(false);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-1 ring-purple-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                    {res.residentNumber}
                  </span>
                  <span className="text-xs text-slate-400">HH: {res.householdId}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-1">{fullName}</h4>
                <p className="text-xs text-slate-500">{res.purok} • {res.occupation}</p>

                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 flex-wrap">
                  {res.isSenior && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      Senior Citizen
                    </span>
                  )}
                  {res.isPWD && (
                    <span className="text-[10px] font-bold bg-rose-100 text-rose-900 px-2 py-0.5 rounded">
                      PWD
                    </span>
                  )}
                  {res.isVoter && (
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      Voter
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {filteredResidents.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200">
              No resident records match the filters.
            </div>
          )}
        </div>

        {/* Right Detailed Resident Dossier */}
        {activeResident ? (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            {/* Header Profile Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xl font-heading shadow-xs">
                  {activeResident.firstName[0]}{activeResident.lastName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-900">{activeResident.residentNumber}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      Verified Resident
                    </span>
                  </div>
                  {isEditingActiveResident ? (
                    <div className="mt-1 flex gap-2">
                      <input type="text" className="bg-white border border-slate-300 rounded px-2 py-1 text-sm font-bold text-slate-900 w-24" defaultValue={activeResident.firstName} />
                      <input type="text" className="bg-white border border-slate-300 rounded px-2 py-1 text-sm font-bold text-slate-900 w-24" defaultValue={activeResident.lastName} />
                    </div>
                  ) : (
                    <h3 className="text-xl font-bold text-slate-900 font-heading mt-0.5">
                      {activeResident.firstName} {activeResident.middleName || ''} {activeResident.lastName}
                    </h3>
                  )}
                  {isEditingActiveResident ? (
                    <input type="text" className="bg-white border border-slate-300 rounded px-2 py-1 mt-1 text-xs text-slate-500 w-full" defaultValue={activeResident.occupation} />
                  ) : (
                    <p className="text-xs text-slate-500">
                      {activeResident.occupation} • {activeResident.civilStatus}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-left sm:text-right flex flex-col sm:items-end justify-between h-full">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Household Assignment</span>
                  <span className="text-xs font-bold text-slate-900 font-mono">{activeResident.householdId}</span>
                  {activeResident.isHouseholdHead && (
                    <span className="text-[10px] font-bold text-emerald-700 block">Head of Household</span>
                  )}
                </div>
                
                {isEditingActiveResident ? (
                  <button 
                    onClick={() => setIsEditingActiveResident(false)} 
                    className="mt-3 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3 h-3" />
                    Save Changes
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEditingActiveResident(true)} 
                    className="mt-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Edit className="w-3 h-3" />
                    Edit Record
                  </button>
                )}
              </div>
            </div>

            {/* Demographic & Contact Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Gender</span>
                {isEditingActiveResident ? (
                  <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 mt-1 text-xs font-semibold text-slate-900" defaultValue={activeResident.gender}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                ) : (
                  <span className="font-bold text-slate-900 mt-0.5 block">{activeResident.gender}</span>
                )}
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Birthdate</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{activeResident.birthDate}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Residency Area</span>
                {isEditingActiveResident ? (
                  <select className="w-full bg-white border border-slate-300 rounded px-2 py-1 mt-1 text-xs font-semibold text-slate-800" defaultValue={activeResident.purok}>
                    <option>Purok 1 - Centro</option>
                    <option>Purok 2 - Riverside</option>
                    <option>Purok 3 - Bukidnon</option>
                    <option>Purok 4 - Pag-asa</option>
                    <option>Purok 5 - San Roque</option>
                    <option>Purok 6 - Industrial</option>
                  </select>
                ) : (
                  <span className="font-semibold text-slate-800 mt-0.5 block">{activeResident.purok}</span>
                )}
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Number</span>
                {isEditingActiveResident ? (
                  <input type="text" className="w-full bg-white border border-slate-300 rounded px-2 py-1 mt-1 text-xs font-semibold text-slate-800" defaultValue={activeResident.contactNumber} />
                ) : (
                  <span className="font-semibold text-slate-800 mt-0.5 block">{activeResident.contactNumber}</span>
                )}
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">COMELEC Voter</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {activeResident.isVoter ? 'Registered Voter' : 'Non-Voter'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Address</span>
                <span className="font-semibold text-slate-800 mt-0.5 block truncate">{activeResident.address}</span>
              </div>
            </div>

            {/* Historical Document Applications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Document Requests History on Record ({residentDocs.length}):
              </h4>

              <div className="space-y-2">
                {residentDocs.map((doc) => (
                  <div key={doc.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-800">{doc.referenceNumber}</span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {doc.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-900 font-bold mt-0.5">{doc.documentTitle}</p>
                      <p className="text-slate-500 text-[11px]">{doc.purpose}</p>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-slate-800">{doc.isFreeDueToExemption ? 'FREE' : `₱${doc.fee}.00`}</span>
                      <span className="text-[10px] text-slate-400 block">{doc.submittedAt}</span>
                    </div>
                  </div>
                ))}

                {residentDocs.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No previous document requests recorded.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-sm font-semibold text-slate-700">Select a resident to view profile.</p>
          </div>
        )}
      </div>

      {/* Add Resident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-slate-200 shadow-xl space-y-4 animate-in zoom-in-95 my-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Register Resident into Civil Registry
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddResident} className="space-y-3.5">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">First Name *</label>
                  <input
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Middle Name</label>
                  <input
                    type="text"
                    value={newMiddleName}
                    onChange={(e) => setNewMiddleName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Birthdate *</label>
                  <input
                    type="date"
                    value={newBirthdate}
                    onChange={(e) => setNewBirthdate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Gender *</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Purok Area *</label>
                  <select
                    value={newPurok}
                    onChange={(e) => setNewPurok(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Occupation</label>
                  <input
                    type="text"
                    value={newOccupation}
                    onChange={(e) => setNewOccupation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Contact Number</label>
                  <input
                    type="text"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Special Toggles */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
                <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVoter}
                    onChange={(e) => setIsVoter(e.target.checked)}
                    className="text-purple-600 rounded"
                  />
                  <span>Voter</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSenior}
                    onChange={(e) => setIsSenior(e.target.checked)}
                    className="text-purple-600 rounded"
                  />
                  <span>Senior (60+)</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPWD}
                    onChange={(e) => setIsPWD(e.target.checked)}
                    className="text-purple-600 rounded"
                  />
                  <span>PWD</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs shadow-xs"
                >
                  Save Resident Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Duplicate Review Modal */}
      {showDuplicateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-heading">Resolve Duplicate Records</h3>
                  <p className="text-xs text-slate-500">The Jaro-Winkler algorithm detected similar entries.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDuplicateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 bg-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Record A */}
                <div className="bg-white border-2 border-emerald-500 rounded-xl p-4 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">
                    RECOMMENDED ACTIVE
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-3">Record A (Existing)</h4>
                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-3 border-b border-slate-50 pb-1">
                      <span className="text-slate-500 font-semibold">Name</span>
                      <span className="col-span-2 font-bold text-slate-900">Juan D. Dela Cruz</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-slate-50 pb-1">
                      <span className="text-slate-500 font-semibold">Birth Date</span>
                      <span className="col-span-2 text-slate-700">1985-04-12</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-slate-50 pb-1">
                      <span className="text-slate-500 font-semibold">Purok</span>
                      <span className="col-span-2 text-slate-700">Purok 1 - Centro</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-slate-50 pb-1">
                      <span className="text-slate-500 font-semibold">Contact</span>
                      <span className="col-span-2 text-slate-700">0917-555-0001</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-slate-500 font-semibold">ID Ref</span>
                      <span className="col-span-2 text-slate-700 font-mono">RES-2023-0042</span>
                    </div>
                  </div>
                </div>

                {/* Record B */}
                <div className="bg-white border-2 border-amber-300 rounded-xl p-4 shadow-sm relative opacity-90">
                  <div className="absolute top-0 right-0 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">
                    FLAGGED DUPLICATE
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-3">Record B (New Entry)</h4>
                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-3 border-b border-slate-50 pb-1">
                      <span className="text-slate-500 font-semibold">Name</span>
                      <span className="col-span-2 font-bold text-slate-900 bg-amber-50">Juanito Dela Cruz</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-slate-50 pb-1">
                      <span className="text-slate-500 font-semibold">Birth Date</span>
                      <span className="col-span-2 text-slate-700">1985-04-12</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-slate-50 pb-1">
                      <span className="text-slate-500 font-semibold">Purok</span>
                      <span className="col-span-2 text-slate-700">Purok 1 - Centro</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-slate-50 pb-1">
                      <span className="text-slate-500 font-semibold">Contact</span>
                      <span className="col-span-2 text-slate-700">None</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-slate-500 font-semibold">ID Ref</span>
                      <span className="col-span-2 text-slate-700 font-mono">RES-2026-0891</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-800">
                <strong>AI Analysis:</strong> 92% Name Similarity. Identical birth date and purok. Highly likely to be the same individual re-registered by a family member.
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
              <button
                onClick={() => setShowDuplicateModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Record B archived. Record A retained as the active master record.');
                  setShowDuplicateModal(false);
                  setShowDuplicates(false);
                }}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors"
              >
                Merge & Archive Record B
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
