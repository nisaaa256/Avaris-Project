import React from 'react';
import { AppRequest } from '../../types';

interface ReportsAdminViewProps {
  requests: AppRequest[];
}

export const ReportsAdminView = ({ requests }: ReportsAdminViewProps) => {
  const stats = [
    { label: 'Total Volume', value: requests.length, color: 'text-blue-600' },
    { label: 'Approval Rate', value: '82%', color: 'text-emerald-600' },
    { label: 'Avg Process Time', value: '1.2 Days', color: 'text-amber-600' },
  ];

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
          {['Leave', 'Reimbursement', 'Overtime', 'Permission'].map(type => (
            <div key={type} className="space-y-1">
              <div className="flex justify-between text-sm font-medium">
                <span>{type}</span>
                <span>{Math.floor(Math.random() * 50 + 10)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-600" style={{ width: `${Math.random() * 50 + 40}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
