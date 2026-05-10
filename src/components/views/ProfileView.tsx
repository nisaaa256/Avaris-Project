import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCircle, 
  Mail, 
  Briefcase, 
  Building, 
  Calendar, 
  MapPin, 
  Phone,
  ShieldCheck,
  Award,
  Edit3,
  Save,
  X,
  Lock
} from 'lucide-react';
import { User } from '../../types';

interface ProfileViewProps {
  user: User;
  onUpdate: (data: any) => Promise<void>;
}

export const ProfileView = ({ user, onUpdate }: ProfileViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email || '',
    password: '',
  });

  const handleSave = async () => {
    await onUpdate(formData);
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Profile Header */}
      <div className="relative overflow-hidden bg-white rounded-3xl p-6 border border-brand-100 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 bg-brand-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-brand-600/20"
            >
              <UserCircle className="w-12 h-12" />
            </motion.div>
            
            <div className="text-center md:text-left space-y-1">
              {isEditing ? (
                <input 
                  className="text-2xl font-display font-black text-text-heading bg-brand-50 border-none rounded-xl px-3 py-1 focus:ring-2 focus:ring-brand-500 w-full"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <h2 className="text-2xl font-display font-black text-text-heading">{user.name}</h2>
              )}
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-3 py-0.5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold border border-brand-100 uppercase tracking-wider">
                  {user.role}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100 uppercase tracking-wider">
                  Active Employee
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white text-brand-600 border-2 border-brand-100 rounded-2xl font-bold hover:bg-brand-50 transition-all"
              >
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Personal Information */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 border border-brand-100 shadow-sm h-full">
            <h3 className="text-lg font-display font-bold text-text-heading mb-8 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              Account Settings
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> Email Address
                  </label>
                  {isEditing ? (
                    <input 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-700 font-bold focus:ring-2 focus:ring-brand-500 transition-all"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    <p className="text-slate-700 font-bold bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-200">
                      {user.email || 'no-email@avaris.co'}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" /> {isEditing ? 'New Password' : 'Password'}
                  </label>
                  {isEditing ? (
                    <input 
                      type="password"
                      placeholder="Enter new password"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-700 font-bold focus:ring-2 focus:ring-brand-500 transition-all"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                  ) : (
                    <p className="text-slate-700 font-bold bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-200">
                      ••••••••••••
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-3 gap-6">
                <InfoItem icon={Briefcase} label="Department" value="Engineering" />
                <InfoItem icon={MapPin} label="Office Location" value="Jakarta, Indonesia" />
                <InfoItem icon={Calendar} label="Member Since" value="May 2026" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <div className="bg-brand-900 rounded-3xl p-8 text-white shadow-xl shadow-brand-900/20 h-full relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 translate-x-1/2" />
            <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 text-brand-400" />
              Employment Info
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div className="pb-6 border-b border-white/10">
                <p className="text-brand-300 text-[10px] font-black uppercase tracking-widest mb-1.5">Employee ID</p>
                <p className="text-xl font-mono font-bold">AVR-{String(user.id).padStart(3, '0')}</p>
              </div>
              <div className="pb-6 border-b border-white/10">
                <p className="text-brand-300 text-[10px] font-black uppercase tracking-widest mb-1.5">Access Role</p>
                <p className="text-xl font-bold capitalize">{user.role}</p>
              </div>
              <div>
                <p className="text-brand-300 text-[10px] font-black uppercase tracking-widest mb-1.5">Contract Status</p>
                <p className="text-xl font-bold">Active Full-time</p>
              </div>
            </div>

            <button className="w-full mt-12 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl text-sm font-black hover:bg-white/20 transition-all">
              Security Log
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="space-y-1 group">
    <div className="flex items-center gap-2 text-slate-400">
      <Icon className="w-3.5 h-3.5 group-hover:text-brand-600 transition-colors" />
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-sm font-bold text-slate-700">{value}</p>
  </div>
);

