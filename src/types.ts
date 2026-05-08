export type UserRole = 'employee' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
}

export type RequestType = 'leave' | 'permission' | 'reimbursement' | 'overtime';
export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface BaseRequest {
  id: string;
  userId: string;
  userName: string;
  type: RequestType;
  status: RequestStatus;
  createdAt: string;
  updatedAt?: string;
  managerComment?: string;
}

export interface LeaveRequest extends BaseRequest {
  type: 'leave';
  startDate: string;
  endDate: string;
  reason: string;
  documentUrl?: string;
}

export interface PermissionRequest extends BaseRequest {
  type: 'permission';
  permissionType: string;
  reason: string;
}

export interface ReimbursementRequest extends BaseRequest {
  type: 'reimbursement';
  amount: number;
  description: string;
  receiptUrl?: string;
}

export interface OvertimeRequest extends BaseRequest {
  type: 'overtime';
  hours: number;
  date: string;
  description: string;
}

export type AppRequest = LeaveRequest | PermissionRequest | ReimbursementRequest | OvertimeRequest;

export interface DashboardStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  remainingLeave?: number;
}
