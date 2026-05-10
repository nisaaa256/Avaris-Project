import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { User, AppRequest, RequestType } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { ViewRequestModal } from '../modals/ViewRequestModal';

interface RequestsViewProps {
  user: User;
  requests: AppRequest[];
  onNewRequest: (type: RequestType) => void;
}

export const RequestsView = ({ user, requests, onNewRequest }: RequestsViewProps) => {
  const [filter, setFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<AppRequest | null>(null);

  const filtered = filter === 'all' ? requests : requests.filter(r => r.type === filter);


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex bg-white p-1 rounded-xl border border-brand-200 shadow-sm">
          {['all', 'leave', 'permission', 'reimbursement', 'overtime'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all capitalize ${filter === type ? 'bg-brand-600 text-white shadow-sm' : 'text-text-muted hover:bg-brand-50'}`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onNewRequest('leave')} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Request
          </button>
        </div>
      </div>

      <div className="overflow-hidden glass-card !p-0">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-brand-50 border-b border-brand-100">
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Type</th>
              {user.role !== 'employee' && <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Employee</th>}
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Date Logged</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Updated</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {filtered.map(req => (
              <tr key={req.id} className="hover:bg-brand-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${req.type === 'leave' ? 'bg-[#E9EDC9] text-[#606C38]' :
                        req.type === 'reimbursement' ? 'bg-[#FEFAE0] text-[#D4A373]' :
                          'bg-brand-100 text-brand-700'
                      }`}>
                      {req.type}
                    </span>
                  </div>
                </td>
                {user.role !== 'employee' && <td className="px-6 py-4 text-sm font-bold text-slate-700">{req.userName}</td>}
                <td className="px-6 py-4 text-sm font-medium text-text-main">
                  {new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">
                  {req.updatedAt ? new Date(req.updatedAt).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setSelectedRequest(req)}
                    className="text-brand-600 hover:underline font-bold text-sm"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            No requests found for this filter.
          </div>
        )}
      </div>

      <ViewRequestModal 
        request={selectedRequest} 
        onClose={() => setSelectedRequest(null)} 
      />
    </div>
  );
};
