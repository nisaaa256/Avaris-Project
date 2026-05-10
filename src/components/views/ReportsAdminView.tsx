import React from 'react';
import { AppRequest } from '../../types';

interface ReportsAdminViewProps {
  requests: AppRequest[];
}

export const ReportsAdminView = ({ requests }: ReportsAdminViewProps) => {
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const approvalRate = requests.length > 0 ? Math.round((approvedCount / requests.length) * 100) : 0;

  const stats = [
    { label: 'Total Volume', value: requests.length, color: 'text-blue-600' },
    { label: 'Approval Rate', value: `${approvalRate}%`, color: 'text-emerald-600' },
    { label: 'Pending Count', value: requests.filter(r => r.status === 'pending').length, color: 'text-amber-600' },
  ];

  const types = ['leave', 'reimbursement', 'overtime', 'permission'];
  const getDistribution = (type: string) => {
    const count = requests.filter(r => r.type === type).length;
    return requests.length > 0 ? Math.round((count / requests.length) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-bold text-slate-900">System Reports</h3>
        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-all">
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(s => (
          <div key={s.label} className="glass-card">
            <p className="text-slate-500 text-sm font-medium">{s.label}</p>
            <p className={`text-3xl font-bold font-display mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card">
        <h4 className="font-bold mb-4">Request Distribution</h4>
        <div className="space-y-4">
          {types.map(type => {
            const percentage = getDistribution(type);
            return (
              <div key={type} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span className="capitalize">{type}</span>
                  <span>{percentage}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-600" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
