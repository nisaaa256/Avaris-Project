import React from 'react';
import { motion } from 'motion/react';
import { Calendar, DollarSign, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { AppRequest } from '../../types';

interface ApprovalsViewProps {
  requests: AppRequest[];
  onUpdate: (id: string, status: 'approved' | 'rejected') => void;
}

export const ApprovalsView = ({ requests, onUpdate }: ApprovalsViewProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {requests.map(req => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={req.id}
            className="glass-card flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shrink-0">
                {req.type === 'leave' && <Calendar className="w-6 h-6" />}
                {req.type === 'reimbursement' && <DollarSign className="w-6 h-6" />}
                {req.type === 'overtime' && <Clock className="w-6 h-6" />}
                {req.type === 'permission' && <FileText className="w-6 h-6" />}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-lg">{req.userName} filed a <span className="text-brand-600 capitalize">{req.type}</span> request</h4>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(req.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Dept: Engineering</span>
                </div>
                <div className="mt-3 p-3 bg-slate-50 rounded-xl text-sm italic text-slate-600 border border-slate-100">
                  {req.type === 'leave' && `Reason: ${req.reason}`}
                  {req.type === 'reimbursement' && `Amount: Rp ${req.amount.toLocaleString('id-ID')} - ${req.description}`}
                  {req.type === 'overtime' && `Duration: ${req.hours} hours - ${req.description}`}
                  {req.type === 'permission' && `Type: ${req.permissionType} - ${req.reason}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onUpdate(req.id, 'rejected')}
                className="flex-1 md:flex-none px-6 py-2 rounded-xl font-semibold border-2 border-rose-100 text-rose-600 hover:bg-rose-50 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => onUpdate(req.id, 'approved')}
                className="flex-1 md:flex-none px-6 py-2 rounded-xl font-semibold bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-colors"
              >
                Approve
              </button>
            </div>
          </motion.div>
        ))}
        {requests.length === 0 && (
          <div className="text-center py-32 text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-lg font-medium text-slate-500">All caught up!</p>
            <p className="text-sm">No pending approvals at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};
