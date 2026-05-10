/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

// Types and Mock Data
import { User, AppRequest, UserRole, RequestType } from './types';
import { apiService } from './services/api';

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
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState<AppRequest[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [showRequestModal, setShowRequestModal] = useState<RequestType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      fetchRequests();
      if (user.role === 'admin') {
        fetchEmployees();
      }
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const fetchRequests = async () => {
    try {
      const data = await apiService.getRequests();
      setRequests(data);
    } catch (error) {
      console.error('Fetch error:', error);
      if (error instanceof Error && error.message.includes('401')) {
        handleLogout();
      }
    }
  };

  const fetchEmployees = async () => {
    try {
      const data = await apiService.getUsers();
      setEmployees(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleAddEmployee = async (newEmp: any) => {
    try {
      await apiService.createUser({
        username: newEmp.username || newEmp.name.toLowerCase().replace(/\s/g, ''),
        first_name: newEmp.name.split(' ')[0],
        last_name: newEmp.name.split(' ').slice(1).join(' '),
        password: newEmp.password || 'password123',
        is_staff: newEmp.role === 'manager' || newEmp.role === 'admin',
        is_superuser: newEmp.role === 'admin',
      });
      fetchEmployees();
    } catch (error) {
      alert('Failed to create employee');
    }
  };

  const handleUpdateEmployee = async (id: number | string, updatedData: any) => {
    try {
      const payload: any = {
        first_name: updatedData.name.split(' ')[0],
        last_name: updatedData.name.split(' ').slice(1).join(' '),
        is_staff: updatedData.role === 'manager' || updatedData.role === 'admin',
        is_superuser: updatedData.role === 'admin',
      };
      if (updatedData.password) {
        payload.password = updatedData.password;
      }
      await apiService.updateUser(id, payload);
      fetchEmployees();
    } catch (error) {
      alert('Failed to update employee');
    }
  };

  const handleUpdateProfile = async (updatedData: any) => {
    if (!user) return;
    try {
      const payload: any = {
        email: updatedData.email,
        first_name: updatedData.name.split(' ')[0],
        last_name: updatedData.name.split(' ').slice(1).join(' '),
      };
      if (updatedData.password) {
        payload.password = updatedData.password;
      }
      
      const updatedUser = await apiService.updateProfile(user.id, payload);
      const newUser = {
        ...user,
        name: updatedUser.name,
        email: updatedUser.email,
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    }
  };


  const handleLogout = () => {
    setUser(null);
    apiService.clearToken();
  };

  const handleLogin = async (username, password) => {
    try {
      const userData = await apiService.login(username, password);
      setUser(userData);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  const addRequest = async (newRequest: any) => {
    try {
      const created = await apiService.createRequest(newRequest);
      setRequests([created, ...requests]);
      setShowRequestModal(null);
    } catch (error) {
      alert('Failed to submit request');
    }
  };

  const updateRequestStatus = async (id: string, status: 'approved' | 'rejected', comment?: string) => {
    try {
      const updated = await apiService.updateRequestStatus(id, status, comment);
      setRequests(requests.map(r => r.id === id ? updated : r));
    } catch (error) {
      alert('Failed to update request');
    }
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
                user={user}
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
            {activeTab === 'employees' && (
              <EmployeesAdminView 
                employees={employees} 
                onRefresh={fetchEmployees} 
                onAddEmployee={handleAddEmployee}
                onUpdateEmployee={handleUpdateEmployee}
              />
            )}
            {activeTab === 'reports' && <ReportsAdminView requests={requests} />}
            {activeTab === 'profile' && <ProfileView user={user} onUpdate={handleUpdateProfile} />}
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
