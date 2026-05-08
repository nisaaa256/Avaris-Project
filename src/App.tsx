/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  TrendingUp,
  Users,
  Building2,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User, AppRequest, UserRole, RequestType } from './types';
import { MOCK_USERS, MOCK_REQUESTS } from './mockData';

// --- Components ---

const StatusBadge = ({ status }: { status: string }) => {
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

const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: any, color: string }) => (
  <div className="glass-card flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold font-display">{value}</h3>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState<AppRequest[]>(MOCK_REQUESTS);
  const [showRequestModal, setShowRequestModal] = useState<RequestType | null>(null);

  // Simulated Login
  useEffect(() => {
    // Basic auto-login for demo purposes
    if (!user) {
      setUser(MOCK_USERS[0]); // Default to Employee
    }
  }, []);

  const handleLogout = () => setUser(null);

  const handleLogin = (role: UserRole) => {
    const foundUser = MOCK_USERS.find(u => u.role === role);
    if (foundUser) setUser(foundUser);
  };

  const addRequest = (newRequest: any) => {
    const req: AppRequest = {
      ...newRequest,
      id: `req-${Date.now()}`,
      userId: user?.id || '1',
      userName: user?.name || 'User',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setRequests([req, ...requests]);
    setShowRequestModal(null);
  };

  const updateRequestStatus = (id: string, status: 'approved' | 'rejected', comment?: string) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status, managerComment: comment, updatedAt: new Date().toISOString() } : r
    ));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-brand-500/5 p-8 border border-slate-100"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-brand-600/30">
              <Building2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-display font-bold text-slate-900">AVARIS</h1>
            <p className="text-slate-500 mt-2">Sign in to manage your requests</p>
          </div>

          <div className="space-y-4">
            <button onClick={() => handleLogin('employee')} className="w-full btn-primary py-3 text-lg">
              Login as Employee
            </button>
            <button onClick={() => handleLogin('manager')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-medium transition-all">
              Login as Manager
            </button>
            <button onClick={() => handleLogin('admin')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-medium transition-all">
              Login as Admin
            </button>
          </div>
          
          <p className="text-center text-xs text-slate-400 mt-8">
            &copy; 2024 AVARIS Management System. All rights reserved.
          </p>
        </motion.div>
      </div>
    );
  }

  const filteredRequests = user.role === 'employee' 
    ? requests.filter(r => r.userId === user.id)
    : requests;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-brand-100 border-r border-brand-200 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className={`flex items-center gap-3 px-2 mb-10 ${!isSidebarOpen && 'lg:justify-center'}`}>
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm shadow-brand-600/20 font-bold text-xl">
              A
            </div>
            <h1 className={`text-xl font-display font-bold tracking-tight text-text-heading truncate ${!isSidebarOpen && 'lg:hidden'}`}>AVARIS</h1>
          </div>

          <nav className="flex-1 space-y-1">
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
              collapsed={!isSidebarOpen}
            />
            <SidebarItem 
              icon={FileText} 
              label="My Requests" 
              active={activeTab === 'requests'} 
              onClick={() => setActiveTab('requests')} 
              collapsed={!isSidebarOpen}
            />
            {user.role === 'manager' && (
              <SidebarItem 
                icon={CheckCircle2} 
                label="Approvals" 
                active={activeTab === 'approvals'} 
                onClick={() => setActiveTab('approvals')} 
                collapsed={!isSidebarOpen}
              />
            )}
            {user.role === 'admin' && (
              <>
                <SidebarItem 
                  icon={Users} 
                  label="Employees" 
                  active={activeTab === 'employees'} 
                  onClick={() => setActiveTab('employees')} 
                  collapsed={!isSidebarOpen}
                />
                <SidebarItem 
                  icon={TrendingUp} 
                  label="Reports" 
                  active={activeTab === 'reports'} 
                  onClick={() => setActiveTab('reports')} 
                  collapsed={!isSidebarOpen}
                />
              </>
            )}
          </nav>

          <div className="pt-4 border-t border-brand-200 mt-auto">
            <div className={`p-4 bg-brand-600/10 rounded-2xl mb-4 ${!isSidebarOpen && 'hidden'}`}>
              <p className="text-xs font-semibold text-brand-600 mb-1 uppercase tracking-wider">Logged in as</p>
              <p className="font-bold text-sm text-text-heading truncate">{user.name}</p>
              <p className="text-xs text-text-muted capitalize">{user.role} • Engineering</p>
            </div>
            <button 
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors ${!isSidebarOpen && 'lg:justify-center'}`}
            >
              <LogOut className="w-5 h-5 px-0.5" />
              <span className={`font-medium ${!isSidebarOpen && 'lg:hidden'}`}>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-brand-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-brand-50 rounded-lg transition-colors border border-transparent hover:border-brand-200">
              <Menu className="w-5 h-5 text-text-muted" />
            </button>
            <h2 className="text-2xl font-display font-bold text-text-heading capitalize">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative p-2 hover:bg-brand-50 rounded-full transition-colors cursor-pointer group">
              <Bell className="w-6 h-6 text-text-muted group-hover:text-brand-600" />
              <span className="absolute top-2 right-2 w-4 h-4 bg-brand-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">4</span>
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

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {activeTab === 'dashboard' && <DashboardView user={user} requests={requests} setTab={setActiveTab} onNewRequest={setShowRequestModal} />}
            {activeTab === 'requests' && <RequestsView requests={filteredRequests} onNewRequest={setShowRequestModal} />}
            {activeTab === 'approvals' && <ApprovalsView requests={requests.filter(r => r.status === 'pending')} onUpdate={updateRequestStatus} />}
            {activeTab === 'employees' && <EmployeesAdminView />}
            {activeTab === 'reports' && <ReportsAdminView requests={requests} />}
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showRequestModal && (
          <RequestModal 
            type={showRequestModal} 
            onClose={() => setShowRequestModal(null)} 
            onSubmit={addRequest} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-components (Views) ---

function SidebarItem({ icon: Icon, label, active, onClick, collapsed }: { icon: any, label: string, active: boolean, onClick: () => void, collapsed: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 p-3 rounded-xl transition-all group
        ${active ? 'sidebar-active' : 'text-text-muted hover:bg-brand-50'}
        ${collapsed && 'lg:justify-center lg:px-0'}
      `}
    >
      <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-brand-600' : 'text-text-muted group-hover:text-brand-600'}`} />
      <span className={`font-semibold ${collapsed && 'lg:hidden'}`}>{label}</span>
      {!collapsed && active && <ChevronRight className="w-4 h-4 ml-auto opacity-60" />}
    </button>
  );
}

function DashboardView({ user, requests, setTab, onNewRequest }: { user: User, requests: AppRequest[], setTab: any, onNewRequest: any }) {
  const userRequests = requests.filter(r => r.userId === user.id);
  const pending = userRequests.filter(r => r.status === 'pending').length;
  const approved = userRequests.filter(r => r.status === 'approved').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-brand-600 rounded-3xl p-8 text-white">
        <div className="relative z-10 space-y-2">
          <h2 className="text-3xl font-display font-bold">Good Day, {user.name.split(' ')[0]}! 👋</h2>
          <p className="text-brand-100 opacity-90">You have {pending} pending requests awaiting approval.</p>
          {user.role === 'employee' && (
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => onNewRequest('leave')}
                className="bg-white text-brand-600 px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-50 transition-colors shadow-lg shadow-black/10"
              >
                <Plus className="w-5 h-5" /> New Request
              </button>
              <button onClick={() => setTab('requests')} className="bg-brand-700/50 text-white px-5 py-2 rounded-xl font-bold hover:bg-brand-700 transition-colors backdrop-blur-sm">
                View History
              </button>
            </div>
          )}
        </div>
        <Building2 className="absolute top-1/2 right-0 transform -translate-y-1/2 w-80 h-80 text-white/10 -rotate-12 pointer-events-none" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Pending Requests" value={pending.toString().padStart(2, '0')} icon={Clock} color="bg-white text-brand-600 border border-brand-200" />
        <StatCard title="Active Team Leave" value={approved.toString().padStart(2, '0')} icon={CheckCircle2} color="bg-white text-text-main border border-brand-200" />
        <StatCard title="Remaining Leave" value="12 Days" icon={Calendar} color="bg-white text-text-main border border-brand-200" />
        <StatCard title="Total Requests" value={userRequests.length} icon={FileText} color="bg-white text-brand-500 border border-brand-200" />
      </div>

      {/* Recent Requests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-display font-bold text-text-heading">Recent Activities</h3>
          <button onClick={() => setTab('requests')} className="text-brand-600 font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="grid gap-4">
          {userRequests.slice(0, 4).map(req => (
            <div key={req.id} className="glass-card flex items-center justify-between hover:translate-x-1 hover:border-brand-500 group">
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
            </div>
          ))}
          {userRequests.length === 0 && (
            <div className="text-center py-12 text-text-muted bg-white rounded-2xl border border-dashed border-brand-200">
              No recent requests found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RequestsView({ requests, onNewRequest }: { requests: AppRequest[], onNewRequest: any }) {
  const [filter, setFilter] = useState('all');

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
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      req.type === 'leave' ? 'bg-[#E9EDC9] text-[#606C38]' : 
                      req.type === 'reimbursement' ? 'bg-[#FEFAE0] text-[#D4A373]' : 
                      'bg-brand-100 text-brand-700'
                    }`}>
                      {req.type}
                    </span>
                  </div>
                </td>
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
                  <button className="text-brand-600 hover:underline font-bold text-sm">Review</button>
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
    </div>
  );
}

function ApprovalsView({ requests, onUpdate }: { requests: AppRequest[], onUpdate: any }) {
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
}

function RequestModal({ type, onClose, onSubmit }: { type: RequestType, onClose: () => void, onSubmit: any }) {
  const [formData, setFormData] = useState<any>({});

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
            <h3 className="text-2xl font-display font-bold capitalize">New {type} Request</h3>
            <p className="text-brand-200 text-sm">Fill in the details below to submit.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form className="p-8 space-y-6" onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ ...formData, type });
        }}>
          {type === 'leave' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Start Date</label>
                <input type="date" required className="input-field" onChange={e => setFormData({...formData, startDate: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">End Date</label>
                <input type="date" required className="input-field" onChange={e => setFormData({...formData, endDate: e.target.value})} />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-semibold text-slate-700">Reason</label>
                <textarea required rows={3} className="input-field resize-none" placeholder="e.g. Annual leave" onChange={e => setFormData({...formData, reason: e.target.value})}></textarea>
              </div>
            </div>
          )}

          {type === 'reimbursement' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Amount (IDR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium font-sans">Rp</span>
                  <input type="number" required className="input-field pl-12" placeholder="0" onChange={e => setFormData({...formData, amount: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <input type="text" required className="input-field" placeholder="e.g. Medical bill, Travel cost" onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
            </div>
          )}

          {type === 'overtime' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Date</label>
                  <input type="date" required className="input-field" onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Hours</label>
                  <input type="number" step="0.5" required className="input-field" placeholder="0.0" onChange={e => setFormData({...formData, hours: parseFloat(e.target.value)})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Work Description</label>
                <textarea required rows={3} className="input-field resize-none" placeholder="What were you working on?" onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
            </div>
          )}

          {type === 'permission' && (
            <div className="space-y-4">
               <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Permission Type</label>
                <select required className="input-field" onChange={e => setFormData({...formData, permissionType: e.target.value})}>
                  <option value="">Select Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Personal Matter">Personal Matter</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Reason / Details</label>
                <textarea required rows={3} className="input-field resize-none" placeholder="Provide details here..." onChange={e => setFormData({...formData, reason: e.target.value})}></textarea>
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
}

function EmployeesAdminView() {
  const employees = MOCK_USERS;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-bold text-slate-900">Manage Employees</h3>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Employee
        </button>
      </div>
      <div className="glass-card !p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Employee</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">ID</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Department</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Role</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map(emp => (
              <tr key={emp.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={emp.avatar} className="w-8 h-8 rounded-lg bg-slate-100" alt="" />
                  <span className="font-medium">{emp.name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">EMP-{emp.id.padStart(3, '0')}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{emp.department}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold capitalize">{emp.role}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-600 hover:underline text-sm font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportsAdminView({ requests }: { requests: AppRequest[] }) {
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
}
