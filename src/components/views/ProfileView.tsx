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
      className="space-y-5"
    >
      {/* Profile Header */}
      <div className="relative overflow-hidden bg-white rounded-3xl p-6 border border-brand-100 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 bg-brand-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-brand-600/20"
          >
            <UserCircle className="w-12 h-12" />
          </motion.div>
          
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-2xl font-display font-black text-text-heading">{user.name}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-3 py-0.5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold border border-brand-100 uppercase tracking-wider">
                {user.role}
              </span>
              <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100 uppercase tracking-wider">
                Active Employee
              </span>
            </div>
            <p className="text-text-muted flex items-center justify-center md:justify-start gap-2 mt-1.5 text-xs font-medium">
              <Building className="w-3.5 h-3.5" />
              Engineering Department • Jakarta Office
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Personal Information */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-sm h-full">
            <h3 className="text-lg font-display font-bold text-text-heading mb-5 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              Personal Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
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
        <motion.div variants={itemVariants}>
          <div className="bg-brand-900 rounded-3xl p-6 text-white shadow-xl shadow-brand-900/20 h-full">
            <h3 className="text-lg font-display font-bold mb-5">Employment Summary</h3>
            
            <div className="space-y-4">
              <div className="pb-4 border-b border-white/10">
                <p className="text-brand-300 text-[9px] font-bold uppercase tracking-wider mb-0.5">Employee ID</p>
                <p className="text-lg font-mono font-bold">AVR-2022-042</p>
              </div>
              <div className="pb-4 border-b border-white/10">
                <p className="text-brand-300 text-[9px] font-bold uppercase tracking-wider mb-0.5">Contract Status</p>
                <p className="text-lg font-bold">Permanent</p>
              </div>
              <div>
                <p className="text-brand-300 text-[9px] font-bold uppercase tracking-wider mb-0.5">Tax Status</p>
                <p className="text-lg font-bold">TK/0</p>
              </div>
            </div>

            <button className="w-full mt-8 py-3 bg-white text-brand-900 rounded-xl text-sm font-black hover:bg-brand-50 transition-colors shadow-lg">
              Download Card
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="space-y-0.5 group">
    <div className="flex items-center gap-2 text-text-muted">
      <Icon className="w-3.5 h-3.5 text-brand-600 group-hover:scale-110 transition-transform" />
      <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-base font-bold text-text-heading group-hover:text-brand-600 transition-colors">{value}</p>
  </div>
);
