import React from 'react';
import { motion } from 'motion/react';
import { 
  UserCircle, 
  Mail, 
  Briefcase, 
  Building, 
  Calendar, 
  MapPin, 
  Phone,
  ShieldCheck,
  Award
} from 'lucide-react';
import { User } from '../../types';

interface ProfileViewProps {
  user: User;
}

export const ProfileView = ({ user }: ProfileViewProps) => {
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
      className="space-y-8"
    >
      {/* Profile Header */}
      <div className="relative overflow-hidden bg-white rounded-3xl p-8 border border-brand-100 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 bg-brand-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-xl shadow-brand-600/20"
          >
            <UserCircle className="w-16 h-16" />
          </motion.div>
          
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-display font-black text-text-heading">{user.name}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-4 py-1 rounded-full bg-brand-50 text-brand-600 text-sm font-bold border border-brand-100">
                {user.role.toUpperCase()}
              </span>
              <span className="px-4 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold border border-emerald-100">
                Active Employee
              </span>
            </div>
            <p className="text-text-muted flex items-center justify-center md:justify-start gap-2 mt-2 font-medium">
              <Building className="w-4 h-4" />
              Engineering Department • Jakarta Office
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-brand-100 shadow-sm h-full">
            <h3 className="text-xl font-display font-bold text-text-heading mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-brand-600" />
              Personal Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoItem icon={Mail} label="Email Address" value={`${user.name.toLowerCase().replace(' ', '.')}@avaris.co`} />
              <InfoItem icon={Phone} label="Phone Number" value="+62 812 3456 7890" />
              <InfoItem icon={Briefcase} label="Job Role" value="Senior Software Engineer" />
              <InfoItem icon={Calendar} label="Joined Date" value="March 15, 2022" />
              <InfoItem icon={MapPin} label="Location" value="Jakarta, Indonesia" />
              <InfoItem icon={Award} label="Manager" value="Budi Santoso" />
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-brand-900 rounded-3xl p-8 text-white shadow-xl shadow-brand-900/20 h-full">
            <h3 className="text-xl font-display font-bold mb-6">Employment Summary</h3>
            
            <div className="space-y-6">
              <div className="pb-6 border-b border-white/10">
                <p className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-1">Employee ID</p>
                <p className="text-xl font-mono font-bold">AVR-2022-042</p>
              </div>
              <div className="pb-6 border-b border-white/10">
                <p className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-1">Contract Status</p>
                <p className="text-xl font-bold">Permanent</p>
              </div>
              <div>
                <p className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-1">Tax Status</p>
                <p className="text-xl font-bold">TK/0</p>
              </div>
            </div>

            <button className="w-full mt-10 py-4 bg-white text-brand-900 rounded-2xl font-black hover:bg-brand-50 transition-colors shadow-lg">
              Download Employee Card
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="space-y-1 group">
    <div className="flex items-center gap-2 text-text-muted mb-1">
      <Icon className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-lg font-bold text-text-heading group-hover:text-brand-600 transition-colors">{value}</p>
  </div>
);
