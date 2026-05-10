import React, { useState } from 'react';
import { Menu, Bell, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  activeTab: string;
  setSidebarOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
}

export const Header = ({ user, activeTab, setSidebarOpen, isSidebarOpen }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Request Approved', desc: 'Your leave request for next week has been approved.', time: '2h ago', icon: CheckCircle, color: 'text-emerald-500' },
    { id: 2, title: 'New Message', desc: 'Manager left a comment on your reimbursement.', time: '5h ago', icon: MessageSquare, color: 'text-brand-500' },
    { id: 3, title: 'System Update', desc: 'Avaris will be down for maintenance tonight.', time: '1d ago', icon: Clock, color: 'text-amber-500' },
  ];

  return (
    <header className="h-20 bg-white border-b border-brand-200 px-8 flex items-center justify-between shrink-0 relative z-[60]">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-brand-50 rounded-lg transition-colors border border-transparent hover:border-brand-200">
          <Menu className="w-5 h-5 text-text-muted" />
        </button>
        <h2 className="text-2xl font-display font-bold text-text-heading capitalize">{activeTab}</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-full transition-all group ${showNotifications ? 'bg-brand-50 text-brand-600' : 'hover:bg-brand-50 text-text-muted'}`}
          >
            <Bell className="w-6 h-6 group-hover:text-brand-600" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-brand-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
              {notifications.length}
            </span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-brand-100 overflow-hidden z-50"
                >
                  <div className="p-5 border-b border-brand-50 bg-brand-50/30 flex items-center justify-between">
                    <h3 className="font-bold text-text-heading">Notifications</h3>
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-100 px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                  </div>
                  <div className="max-h-[400px] overflow-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className="p-4 hover:bg-slate-50 transition-colors border-b border-brand-50 cursor-pointer group">
                        <div className="flex gap-3">
                          <div className={`mt-1 ${notif.color}`}>
                            <notif.icon className="w-5 h-5" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold text-sm text-text-heading group-hover:text-brand-600 transition-colors">{notif.title}</p>
                            <p className="text-xs text-text-muted leading-relaxed">{notif.desc}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center">
                    <button className="text-xs font-bold text-brand-600 hover:underline">View all notifications</button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-brand-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-text-heading">{user.name}</p>
            <p className="text-xs text-text-muted capitalize">{user.role}</p>
          </div>
          <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200" />
        </div>
      </div>
    </header>
  );
};
