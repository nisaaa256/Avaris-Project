const BASE_URL = 'http://localhost:8000/api/';

export const apiService = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token: string) => localStorage.setItem('token', token),
  clearToken: () => localStorage.removeItem('token'),

  getHeaders: () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Token ${token}` } : {}),
    };
  },

  mapToFrontend(req: any) {
    return {
      ...req,
      userId: req.user_id,
      userName: req.user_name,
      createdAt: req.created_at,
      updatedAt: req.updated_at,
      managerComment: req.manager_comment,
      startDate: req.start_date,
      endDate: req.end_date,
      documentUrl: req.document_url,
      permissionType: req.permission_type,
      receiptUrl: req.receipt_url,
    };
  },

  mapToBackend(req: any) {
    return {
      type: req.type,
      reason: req.reason,
      description: req.description,
      start_date: req.startDate,
      end_date: req.endDate,
      document_url: req.documentUrl,
      permission_type: req.permissionType,
      amount: req.amount,
      receipt_url: req.receiptUrl,
      hours: req.hours,
      date: req.date,
    };
  },

  async login(username, password) {
    const response = await fetch(`${BASE_URL}login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    this.setToken(data.token);
    return {
      ...data.user,
      role: data.user.is_superuser ? 'admin' : (data.user.is_staff ? 'manager' : 'employee'),
    };
  },

  async getUsers() {
    const response = await fetch(`${BASE_URL}users/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    return data.map((u: any) => ({
      ...u,
      role: u.is_superuser ? 'admin' : (u.is_staff ? 'manager' : 'employee'),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`,
    }));
  },


  async getRequests() {
    const response = await fetch(`${BASE_URL}requests/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch requests');
    const data = await response.json();
    return data.map(this.mapToFrontend);
  },

  async createRequest(payload) {
    const backendPayload = this.mapToBackend(payload);
    const response = await fetch(`${BASE_URL}requests/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(backendPayload),
    });
    if (!response.ok) throw new Error('Failed to create request');
    const data = await response.json();
    return this.mapToFrontend(data);
  },

  async createUser(payload: any) {
    const response = await fetch(`${BASE_URL}users/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  async updateUser(id: number | string, payload: any) {
    const response = await fetch(`${BASE_URL}users/${id}/`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  async updateProfile(id: number | string, payload: any) {
    return this.updateUser(id, payload);
  },



  async updateRequestStatus(id, status, comment) {
    const response = await fetch(`${BASE_URL}requests/${id}/`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ status, manager_comment: comment }),
    });
    if (!response.ok) throw new Error('Failed to update status');
    const data = await response.json();
    return this.mapToFrontend(data);
  },
};

