import React from 'react';
import {
  LayoutDashboard,
  FileText,
  CheckCircle2,
  Users,
  TrendingUp,
  LogOut,
  ChevronRight,
  UserCircle
} from 'lucide-react';
import { User } from '../../types';

interface SidebarItemProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
  collapsed: boolean;
}

function SidebarItem({ icon: Icon, label, active, onClick, collapsed }: SidebarItemProps) {
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

interface SidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSidebarOpen: boolean;
  handleLogout: () => void;
}

export const Sidebar = ({ user, activeTab, setActiveTab, isSidebarOpen, handleLogout }: SidebarProps) => {
  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50 w-72 h-screen lg:h-full bg-brand-100 border-r border-brand-200 transform transition-transform duration-300 ease-in-out
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
    `}>
      <div className="h-full flex flex-col p-6">
        <div className={`flex items-center gap-3 px-2 mb-10 ${!isSidebarOpen && 'lg:justify-center'}`}>
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm shadow-brand-600/20 font-bold text-xl">
            A
          </div>
          <h1 className={`text-xl font-display font-bold tracking-tight text-text-heading truncate ${!isSidebarOpen && 'lg:hidden'}`}>AVARIS</h1>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 -mr-2 scrollbar-hide">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
            collapsed={!isSidebarOpen}
          />
          <SidebarItem
            icon={UserCircle}
            label="My Profile"
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            collapsed={!isSidebarOpen}
          />
          <SidebarItem
            icon={FileText}
            label={user.role === 'employee' ? "My Requests" : "Request History"}
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
  );
};
