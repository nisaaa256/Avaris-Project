import React from 'react';

export const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    pending: 'bg-brand-50 text-brand-500 border-brand-200',
    approved: 'bg-[#E9EDC9] text-[#606C38] border-[#DDE5B6]',
    rejected: 'bg-rose-50 text-rose-600 border-rose-200',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
      {status.charAt(0)?.toUpperCase() + status.slice(1)}
    </span>
  );
};
