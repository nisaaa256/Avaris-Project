import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { RequestType } from '../../types';

interface RequestModalProps {
  type: RequestType;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const RequestModal = ({ type: initialType, onClose, onSubmit }: RequestModalProps) => {
  const [currentType, setCurrentType] = useState<RequestType>(initialType);
  const [formData, setFormData] = useState<any>({});

  const handleTypeChange = (newType: RequestType) => {
    setCurrentType(newType);
    setFormData({}); // Clear form when type changes
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 bg-brand-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-display font-bold capitalize">New Request</h3>
            <p className="text-brand-200 text-sm">Fill in the details below to submit.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="p-8 space-y-6" onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ ...formData, type: currentType });
        }}>
          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Request Category</label>
            <select
              value={currentType}
              onChange={(e) => handleTypeChange(e.target.value as RequestType)}
              className="input-field"
              required
            >
              <option value="leave">Leave</option>
              <option value="reimbursement">Reimbursement</option>
              <option value="overtime">Overtime</option>
              <option value="permission">Permission</option>
            </select>
          </div>

          <hr className="border-slate-100" />

          {currentType === 'leave' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Start Date</label>
                <input type="date" required className="input-field" onChange={e => setFormData({ ...formData, startDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">End Date</label>
                <input type="date" required className="input-field" onChange={e => setFormData({ ...formData, endDate: e.target.value })} />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-semibold text-slate-700">Reason</label>
                <textarea required rows={3} className="input-field resize-none" placeholder="e.g. Annual leave" onChange={e => setFormData({ ...formData, reason: e.target.value })}></textarea>
              </div>
            </div>
          )}

          {currentType === 'reimbursement' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Amount (IDR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium font-sans">Rp</span>
                  <input type="number" required className="input-field pl-12" placeholder="0" onChange={e => setFormData({ ...formData, amount: parseInt(e.target.value) })} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <input type="text" required className="input-field" placeholder="e.g. Medical bill, Travel cost" onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
          )}

          {currentType === 'overtime' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Date</label>
                  <input type="date" required className="input-field" onChange={e => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Hours</label>
                  <input type="number" step="0.5" required className="input-field" placeholder="0.0" onChange={e => setFormData({ ...formData, hours: parseFloat(e.target.value) })} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Work Description</label>
                <textarea required rows={3} className="input-field resize-none" placeholder="What were you working on?" onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
              </div>
            </div>
          )}

          {currentType === 'permission' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Permission Type</label>
                <select required className="input-field" onChange={e => setFormData({ ...formData, permissionType: e.target.value })}>
                  <option value="">Select Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Personal Matter">Personal Matter</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Reason / Details</label>
                <textarea required rows={3} className="input-field resize-none" placeholder="Provide details here..." onChange={e => setFormData({ ...formData, reason: e.target.value })}></textarea>
              </div>
            </div>
          )}

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 px-6 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-3 px-6 rounded-xl font-bold bg-brand-600 text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700 transition-all">Submit Request</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
