import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, ShieldCheck, UserCircle, Briefcase, Lock, User as UserIcon, ChevronDown, Check } from 'lucide-react';
import { UserRole } from '../../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
}

export const LoginView = ({ onLogin }: LoginViewProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('employee');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roles: { id: UserRole; label: string; desc: string; icon: any }[] = [
    { id: 'employee', label: 'Employee', desc: 'Manage your requests', icon: UserCircle },
    { id: 'manager', label: 'Manager', desc: 'Approve team requests', icon: Briefcase },
    { id: 'admin', label: 'Admin', desc: 'System administration', icon: ShieldCheck },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  const selectedRoleData = roles.find(r => r.id === selectedRole)!;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
        />

        {/* Decorative Floating Colorful Circles */}
        {[...Array(30)].map((_, i) => {
          const colors = ['bg-brand-500/20', 'bg-emerald-500/20', 'bg-rose-500/20', 'bg-amber-500/20', 'bg-indigo-500/20'];
          return (
            <motion.div
              key={i}
              initial={{ x: Math.random() * 1000, y: Math.random() * 1000, opacity: 0 }}
              animate={{
                y: [0, -200, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.5, 1]
              }}
              transition={{ duration: 10 + Math.random() * 15, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
              className={`absolute rounded-full ${colors[i % colors.length]} blur-[1px]`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 4}px`,
                height: `${Math.random() * 10 + 4}px`,
              }}
            />
          );
        })}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[380px] w-full relative z-10"
      >
        <motion.div
          layout
          className="bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8 border border-white/60"
        >
          <div className="text-center mb-6">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-xl shadow-brand-600/40 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Building2 className="w-7 h-7" />
            </motion.div>
            <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight">
              AVARIS
            </h1>
            <p className="text-slate-500 mt-1.5 text-xs font-medium leading-relaxed">
              Login to access your HR management dashboard.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Username</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors">
                  <UserIcon className="w-4.5 h-4.5" />
                </div>
                <input
                  type="text"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-brand-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-slate-700 placeholder:text-slate-300"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  type="password"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-brand-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-slate-700 placeholder:text-slate-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="space-y-1.5 relative">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Login As</label>
              <button
                type="button"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`w-full flex items-center justify-between p-3 bg-slate-50 border-2 rounded-xl transition-all hover:bg-slate-100 ${showRoleDropdown ? 'border-brand-500/20 bg-white ring-4 ring-brand-500/5' : 'border-transparent'}`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 bg-white rounded-lg text-brand-600 shadow-sm border border-slate-100">
                    <selectedRoleData.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 leading-none">{selectedRoleData.label}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{selectedRoleData.desc}</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showRoleDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showRoleDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowRoleDropdown(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-20 p-1.5"
                    >
                      {roles.map((role) => (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => {
                            setSelectedRole(role.id);
                            setShowRoleDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all ${selectedRole === role.id ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`p-1.5 rounded-md ${selectedRole === role.id ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              <role.icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-xs">{role.label}</p>
                              <p className="text-[9px] opacity-70">{role.desc}</p>
                            </div>
                          </div>
                          {selectedRole === role.id && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 bg-brand-600 text-white rounded-xl font-black text-sm shadow-xl shadow-brand-600/30 hover:bg-brand-700 transition-all mt-4 relative overflow-hidden group"
            >
              <span className="relative z-10">Login to Dashboard</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-medium">
              &copy; 2024 AVARIS • The Future of HR Management
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
