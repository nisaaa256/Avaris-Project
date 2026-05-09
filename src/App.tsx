/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

// Types and Mock Data
import { User, AppRequest, UserRole, RequestType } from './types';
import { MOCK_USERS, MOCK_REQUESTS } from './mockData';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

// View Components
import { LoginView } from './components/views/LoginView';
import { DashboardView } from './components/views/DashboardView';
import { RequestsView } from './components/views/RequestsView';
import { ApprovalsView } from './components/views/ApprovalsView';
import { EmployeesAdminView } from './components/views/EmployeesAdminView';
import { ReportsAdminView } from './components/views/ReportsAdminView';
import { ProfileView } from './components/views/ProfileView';

// Modals
import { RequestModal } from './components/modals/RequestModal';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState<AppRequest[]>(MOCK_REQUESTS);
  const [showRequestModal, setShowRequestModal] = useState<RequestType | null>(null);

  // Simulated Login
  // useEffect(() => {
  //   // Basic auto-login for demo purposes
  //   if (!user) {
  //     setUser(MOCK_USERS[0]); // Default to Employee
  //   }
  // }, []);

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
    return <LoginView onLogin={handleLogin} />;
  }

  const filteredRequests = user.role === 'employee'
    ? requests.filter(r => r.userId === user.id)
    : requests;

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      <Sidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        handleLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          user={user}
          activeTab={activeTab}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {activeTab === 'dashboard' && (
              <DashboardView
                user={user}
                requests={requests}
                setTab={setActiveTab}
                onNewRequest={setShowRequestModal}
              />
            )}
            {activeTab === 'requests' && (
              <RequestsView
                requests={filteredRequests}
                onNewRequest={setShowRequestModal}
              />
            )}
            {activeTab === 'approvals' && (
              <ApprovalsView
                requests={requests.filter(r => r.status === 'pending')}
                onUpdate={updateRequestStatus}
              />
            )}
            {activeTab === 'employees' && <EmployeesAdminView />}
            {activeTab === 'reports' && <ReportsAdminView requests={requests} />}
            {activeTab === 'profile' && <ProfileView user={user} />}
          </div>
        </div>
      </main>

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
