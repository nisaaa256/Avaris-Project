import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, ShieldCheck, UserCircle, Briefcase, Lock, User as UserIcon, ArrowLeft } from 'lucide-react';
import { UserRole } from '../../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
}

export const LoginView = ({ onLogin }: LoginViewProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

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
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"
        />
        
        {/* Decorative Floating Colorful Circles */}
        {[...Array(50)].map((_, i) => {
          const colors = [
            'bg-brand-500/30', 
            'bg-emerald-500/30', 
            'bg-rose-500/30', 
            'bg-amber-500/30', 
            'bg-indigo-500/30',
            'bg-sky-500/30',
            'bg-fuchsia-500/30'
          ];
          const color = colors[i % colors.length];
          return (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 1200, 
                y: Math.random() * 1000,
                opacity: 0 
              }}
              animate={{ 
                y: [0, -250, 0],
                x: [0, Math.random() * 120 - 60, 0],
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.8, 1]
              }}
              transition={{ 
                duration: 8 + Math.random() * 18, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.2
              }}
              className={`absolute rounded-full ${color} blur-[1px]`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 14 + 4}px`,
                height: `${Math.random() * 14 + 4}px`,
              }}
            />
          );
        })}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-sm w-full relative z-10"
      >
        <motion.div
          layout
          className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-brand-500/10 p-8 border border-white/50"
        >
          <AnimatePresence mode="wait">
            {!selectedRole ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center mb-8">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="w-16 h-16 bg-brand-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-5 text-white shadow-xl shadow-brand-600/30"
                  >
                    <Building2 className="w-8 h-8" />
                  </motion.div>
                  <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight">
                    AVARIS
                  </h1>
                  <p className="text-slate-500 mt-2 text-sm font-medium leading-relaxed">
                    Choose your role to continue.
                  </p>
                </div>

                <div className="space-y-4">
                  <LoginButton 
                    onClick={() => setSelectedRole('employee')} 
                    icon={UserCircle} 
                    label="Employee" 
                    description="Request leave, overtime & more"
                    primary
                  />
                  <LoginButton 
                    onClick={() => setSelectedRole('manager')} 
                    icon={Briefcase} 
                    label="Manager" 
                    description="Review and approve requests"
                  />
                  <LoginButton 
                    onClick={() => setSelectedRole('admin')} 
                    icon={ShieldCheck} 
                    label="Admin" 
                    description="System management & reporting"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <button 
                  onClick={() => setSelectedRole(null)}
                  className="flex items-center gap-2 text-slate-400 hover:text-brand-600 transition-colors mb-6 font-bold text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to roles
                </button>

                <div className="mb-8">
                  <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight capitalize">
                    {selectedRole} Login
                  </h2>
                  <p className="text-slate-500 mt-1 text-sm font-medium">
                    Please enter your credentials below.
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-500/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input 
                        type="password" 
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-500/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-brand-600 text-white rounded-2xl font-black shadow-xl shadow-brand-600/30 hover:bg-brand-700 transition-all mt-4"
                  >
                    Login to Dashboard
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            variants={itemVariants}
            className="mt-10 pt-8 border-t border-slate-100 text-center"
          >
            <p className="text-xs text-slate-400 font-medium">
              &copy; 2024 AVARIS • The Future of HR Management
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};


interface LoginButtonProps {
  onClick: () => void;
  icon: any;
  label: string;
  description: string;
  primary?: boolean;
}

const LoginButton = ({ onClick, icon: Icon, label, description, primary }: LoginButtonProps) => {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full group relative flex items-center gap-3.5 p-4 rounded-[1.5rem] border-2 transition-all text-left overflow-hidden
        ${primary 
          ? 'bg-brand-600 border-brand-600 text-white shadow-xl shadow-brand-600/30 hover:bg-brand-700' 
          : 'bg-white border-slate-100 text-slate-700 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/10'}
      `}
    >
      <div className={`
        p-2.5 rounded-xl transition-all duration-300 relative z-10
        ${primary 
          ? 'bg-white/20 group-hover:bg-white/30' 
          : 'bg-slate-50 group-hover:bg-brand-600 group-hover:text-white text-brand-600'}
      `}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="relative z-10">
        <p className="font-black text-base leading-tight tracking-tight">{label}</p>
        <p className={`text-[10px] mt-0.5 font-medium ${primary ? 'text-brand-100' : 'text-slate-400'}`}>{description}</p>
      </div>
    </motion.button>
  );
};
