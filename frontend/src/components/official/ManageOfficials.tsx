import React, { useState } from 'react';
import { useBarangay } from '../../context/BarangayContext';
import { Users, Edit, Save, Plus, ShieldCheck, X } from 'lucide-react';
import { Official } from '../../types';

export const ManageOfficials: React.FC = () => {
  const { officials, updateOfficial, addOfficial, largeTextMode } = useBarangay();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Official>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEditClick = (official: Official) => {
    setEditingId(official.id);
    setEditForm(official);
    setIsAdding(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setIsAdding(false);
  };

  const handleSaveEdit = () => {
    if (editingId && editForm.name) {
      updateOfficial(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleAddNew = () => {
    if (editForm.name && editForm.position) {
      addOfficial(editForm as Omit<Official, 'id'>);
      setIsAdding(false);
      setEditForm({});
    }
  };

  const startAdding = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditForm({ isActive: true, position: 'Barangay Kagawad' });
  };

  return (
    <div className={`space-y-6 ${largeTextMode ? 'text-lg' : 'text-base'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-purple-800">
          <Users className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-bold font-heading">Manage Officials Directory</h2>
        </div>
        {!isAdding && (
          <button 
            onClick={startAdding}
            className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Official</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white rounded-2xl border border-purple-200 p-6 shadow-sm mb-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-purple-600" /> Add New Official
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                value={editForm.name || ''}
                onChange={e => setEditForm({...editForm, name: e.target.value})}
                placeholder="e.g. Hon. Juan Dela Cruz"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Position</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                value={editForm.position || ''}
                onChange={e => setEditForm({...editForm, position: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Committee / Responsibility</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                value={editForm.committee || ''}
                onChange={e => setEditForm({...editForm, committee: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Details</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                value={editForm.contactDetails || ''}
                onChange={e => setEditForm({...editForm, contactDetails: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={handleCancelEdit} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-semibold cursor-pointer">Cancel</button>
            <button onClick={handleAddNew} className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 flex items-center gap-1.5 cursor-pointer">
              <Save className="w-4 h-4" /> Save Official
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-700">Official Name & Position</th>
                <th className="px-6 py-4 font-bold text-slate-700">Committee</th>
                <th className="px-6 py-4 font-bold text-slate-700">Status</th>
                <th className="px-6 py-4 font-bold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {officials.map(official => (
                <tr key={official.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    {editingId === official.id ? (
                      <div className="flex flex-col gap-2 min-w-[240px]">
                        <input 
                          type="text" 
                          className="w-full bg-white border border-purple-300 rounded-md px-2 py-1 text-sm font-bold focus:ring-2 focus:ring-purple-500 outline-none"
                          value={editForm.name || ''}
                          onChange={e => setEditForm({...editForm, name: e.target.value})}
                        />
                        <input 
                          type="text" 
                          className="w-full bg-white border border-purple-300 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                          value={editForm.position || ''}
                          onChange={e => setEditForm({...editForm, position: e.target.value})}
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold text-slate-900">{official.name}</div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                          <ShieldCheck className="w-3 h-3" />
                          {official.position}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === official.id ? (
                      <div className="flex flex-col gap-2 min-w-[240px]">
                        <input 
                          type="text" 
                          className="w-full bg-white border border-purple-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                          value={editForm.committee || ''}
                          onChange={e => setEditForm({...editForm, committee: e.target.value})}
                        />
                        <input 
                          type="text" 
                          className="w-full bg-white border border-purple-300 rounded-md px-2 py-1 text-xs text-slate-500 focus:ring-2 focus:ring-purple-500 outline-none"
                          value={editForm.contactDetails || ''}
                          onChange={e => setEditForm({...editForm, contactDetails: e.target.value})}
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium text-slate-700">{official.committee}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{official.contactDetails}</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === official.id ? (
                      <select 
                        className="bg-white border border-purple-300 rounded-md px-2 py-1 text-sm outline-none"
                        value={editForm.isActive ? 'active' : 'inactive'}
                        onChange={e => setEditForm({...editForm, isActive: e.target.value === 'active'})}
                      >
                        <option value="active">Active (Incumbent)</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        official.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {official.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {editingId === official.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={handleCancelEdit} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-lg cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                        <button onClick={handleSaveEdit} className="p-1.5 text-white bg-purple-600 hover:bg-purple-700 rounded-lg cursor-pointer">
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEditClick(official)}
                        className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer inline-flex"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
