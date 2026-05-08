import { User, AppRequest } from './types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    email: 'budi@company.com',
    role: 'employee',
    department: 'Engineering',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
  },
  {
    id: '2',
    name: 'Siti Aminah',
    email: 'siti@company.com',
    role: 'manager',
    department: 'Engineering',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
  },
  {
    id: '3',
    name: 'Admin Avaris',
    email: 'admin@company.com',
    role: 'admin',
    department: 'Operations',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
];

export const MOCK_REQUESTS: AppRequest[] = [
  {
    id: 'req-1',
    userId: '1',
    userName: 'Budi Santoso',
    type: 'leave',
    status: 'approved',
    startDate: '2024-06-01',
    endDate: '2024-06-05',
    reason: 'Family vacation',
    createdAt: '2024-05-20T10:00:00Z',
  },
  {
    id: 'req-2',
    userId: '1',
    userName: 'Budi Santoso',
    type: 'reimbursement',
    status: 'pending',
    amount: 500000,
    description: 'Cloud training certificate',
    createdAt: '2024-05-25T14:30:00Z',
  },
  {
    id: 'req-3',
    userId: '1',
    userName: 'Budi Santoso',
    type: 'overtime',
    status: 'rejected',
    hours: 4,
    date: '2024-05-22',
    description: 'Urgent server maintenance',
    managerComment: 'Lembur harus disetujui sebelum pengerjaan.',
    createdAt: '2024-05-23T09:15:00Z',
  },
  {
    id: 'req-4',
    userId: '1',
    userName: 'Budi Santoso',
    type: 'permission',
    status: 'pending',
    permissionType: 'Sick Leave',
    reason: 'Flu and fever',
    createdAt: '2024-05-27T08:00:00Z',
  },
];
