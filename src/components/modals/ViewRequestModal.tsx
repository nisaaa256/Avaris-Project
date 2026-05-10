import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, DollarSign, FileText, User, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { AppRequest } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface ViewRequestModalProps {
  request: AppRequest | null;
  onClose: () => void;
}

export const ViewRequestModal = ({ request, onClose }: ViewRequestModalProps) => {
  if (!request) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Header */}
          <div className="p-8 bg-brand-900 text-white relative">
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
                {request.type === 'leave' && <Calendar className="w-7 h-7" />}
                {request.type === 'reimbursement' && <DollarSign className="w-7 h-7" />}
                {request.type === 'overtime' && <Clock className="w-7 h-7" />}
                {request.type === 'permission' && <FileText className="w-7 h-7" />}
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold capitalize">{request.type} Details</h3>
                <p className="text-brand-200 text-sm font-medium">Request ID: AVR-{String(request.id).padStart(3, '0')}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-xl transition-colors z-20"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* Status Section */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <StatusBadge status={request.status} />
                <span className="text-xs text-slate-400 font-medium">
                  Logged on {new Date(request.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-3 h-3" /> Submitted By
                </label>
                <p className="text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {request.userName}
                </p>
              </div>

              {request.type === 'leave' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Date</label>
                    <p className="text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{request.startDate}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End Date</label>
                    <p className="text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{request.endDate}</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reason</label>
                    <p className="text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">{request.reason}</p>
                  </div>
                </div>
              )}

              {request.type === 'reimbursement' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (IDR)</label>
                    <p className="text-xl font-black text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                      Rp {request.amount?.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                    <p className="text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">{request.description}</p>
                  </div>
                </div>
              )}

              {request.type === 'overtime' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</label>
                    <p className="text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{request.date}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hours</label>
                    <p className="text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{request.hours} Hours</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                    <p className="text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">{request.description}</p>
                  </div>
                </div>
              )}

              {request.type === 'permission' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</label>
                    <p className="text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{request.permissionType}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reason</label>
                    <p className="text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">{request.reason}</p>
                  </div>
                </div>
              )}
            </div>

            {request.managerComment && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-600 uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" /> Manager Comment
                </label>
                <p className="text-sm font-medium text-slate-600 bg-brand-50 p-4 rounded-xl border border-brand-100">
                  {request.managerComment}
                </p>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
