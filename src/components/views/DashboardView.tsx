import React from 'react';
import { motion } from 'motion/react';
import { Plus, Calendar, DollarSign, Clock, FileText, Building2, CheckCircle2 } from 'lucide-react';
import { User, AppRequest, RequestType } from '../../types';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';

interface DashboardViewProps {
  user: User;
  requests: AppRequest[];
  setTab: (tab: string) => void;
  onNewRequest: (type: RequestType) => void;
}

export const DashboardView = ({ user, requests, setTab, onNewRequest }: DashboardViewProps) => {
  const userRequests = requests.filter(r => r.userId === user.id);
  const pending = userRequests.filter(r => r.status === 'pending').length;
  const approved = userRequests.filter(r => r.status === 'approved').length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden bg-brand-600 rounded-3xl p-8 text-white shadow-xl shadow-brand-600/20"
      >
        <div className="relative z-10 space-y-2">
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-display font-bold"
          >
            Good Day, {user.name.split(' ')[0]}! 👋
          </motion.h2>
          <motion.p 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-brand-100 opacity-90"
          >
            You have {pending} pending requests awaiting approval.
          </motion.p>
          {user.role === 'employee' && (
            <div className="flex gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNewRequest('leave')}
                className="bg-white text-brand-600 px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-50 transition-colors shadow-lg shadow-black/10"
              >
                <Plus className="w-5 h-5" /> New Request
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTab('requests')} 
                className="bg-brand-700/50 text-white px-5 py-2 rounded-xl font-bold hover:bg-brand-700 transition-colors backdrop-blur-sm"
              >
                View History
              </motion.button>
            </div>
          )}
        </div>
        <motion.div
          animate={{ 
            rotate: [-12, -8, -12],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 w-80 h-80 text-white/10 pointer-events-none"
        >
          <Building2 className="w-full h-full" />
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard title="Pending Requests" value={pending.toString().padStart(2, '0')} icon={Clock} color="bg-white text-brand-600 border border-brand-200" />
        <StatCard title="Active Team Leave" value={approved.toString().padStart(2, '0')} icon={CheckCircle2} color="bg-white text-text-main border border-brand-200" />
        <StatCard title="Remaining Leave" value="12 Days" icon={Calendar} color="bg-white text-text-main border border-brand-200" />
        <StatCard title="Total Requests" value={userRequests.length} icon={FileText} color="bg-white text-brand-500 border border-brand-200" />
      </motion.div>

      {/* Recent Requests Section */}
      <div className="space-y-4">
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-between px-2"
        >
          <h3 className="text-xl font-display font-bold text-text-heading">Recent Activities</h3>
          <button onClick={() => setTab('requests')} className="text-brand-600 font-bold text-sm hover:underline">View All</button>
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="grid gap-4"
        >
          {userRequests.slice(0, 4).map((req, index) => (
            <motion.div 
              key={req.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              whileHover={{ x: 5 }}
              className="glass-card flex items-center justify-between hover:border-brand-500 group cursor-default"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-50 flex items-center justify-center rounded-xl text-brand-500 group-hover:text-brand-600 transition-colors">
                  {req.type === 'leave' && <Calendar className="w-6 h-6" />}
                  {req.type === 'reimbursement' && <DollarSign className="w-6 h-6" />}
                  {req.type === 'overtime' && <Clock className="w-6 h-6" />}
                  {req.type === 'permission' && <FileText className="w-6 h-6" />}
                </div>
                <div>
                  <p className="font-bold text-text-heading capitalize leading-tight">{req.type} Request</p>
                  <p className="text-xs text-text-muted mt-0.5">{new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <StatusBadge status={req.status} />
            </motion.div>
          ))}
          {userRequests.length === 0 && (
            <motion.div 
              variants={itemVariants}
              className="text-center py-12 text-text-muted bg-white rounded-2xl border border-dashed border-brand-200"
            >
              No recent requests found.
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
