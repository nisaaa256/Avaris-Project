import React, { useState } from 'react';
import { Plus, X, UserPlus, Mail, Briefcase, Building, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_USERS } from '../../mockData';
import { UserRole } from '../../types';

export const EmployeesAdminView = () => {
  const [employees, setEmployees] = useState(MOCK_USERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    department: 'Engineering',
    role: 'employee' as UserRole,
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp = {
      id: (employees.length + 1).toString(),
      name: formData.name,
      role: formData.role,
      department: formData.department,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
    };
    setEmployees([...employees, newEmp]);
    setShowAddModal(false);
    setFormData({ name: '', department: 'Engineering', role: 'employee' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-display font-bold text-slate-900">Manage Employees</h3>
          <p className="text-slate-500 text-sm">You have {employees.length} active employees in the system.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20"
        >
          <Plus className="w-5 h-5" /> Add Employee
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Employee</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">ID</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Department</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {employees.map(emp => (
              <motion.tr 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={emp.id} 
                className="hover:bg-brand-50/30 transition-colors group"
              >
                <td className="px-8 py-5 flex items-center gap-4">
                  <img src={emp.avatar} className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 p-0.5" alt="" />
                  <span className="font-bold text-slate-700 group-hover:text-brand-600 transition-colors">{emp.name}</span>
                </td>
                <td className="px-8 py-5 text-sm font-mono text-slate-400">AVR-{emp.id.padStart(3, '0')}</td>
                <td className="px-8 py-5 text-sm font-medium text-slate-500">{emp.department}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    emp.role === 'admin' ? 'bg-rose-50 text-rose-600' :
                    emp.role === 'manager' ? 'bg-amber-50 text-amber-600' :
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    {emp.role}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-slate-400 hover:text-brand-600 font-bold text-sm transition-colors">Edit</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="p-8 bg-brand-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold">New Employee</h3>
                    <p className="text-brand-200 text-sm font-medium">Add a new member to your team.</p>
                  </div>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="p-8 space-y-6" onSubmit={handleAddEmployee}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Building className="w-4 h-4 text-brand-500" /> Full Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. John Doe"
                    className="input-field" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-brand-500" /> Department
                    </label>
                    <select 
                      className="input-field"
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Product">Product</option>
                      <option value="HR">HR</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-brand-500" /> Access Role
                    </label>
                    <select 
                      className="input-field"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4 px-6 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 px-6 rounded-2xl font-black bg-brand-600 text-white shadow-xl shadow-brand-600/30 hover:bg-brand-700 transition-all"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
