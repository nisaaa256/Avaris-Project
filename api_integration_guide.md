# Avaris API Integration Guide for Frontend Agent

This document provides the technical contract for connecting the React frontend to the Django backend. Use this to implement API services, hooks, and state management.

## 1. Connection Details
- **Base URL**: `http://localhost:8000/api/`
- **Auth Mode**: Token Authentication
- **Login Endpoint**: `http://localhost:8000/api/login/` (POST username/password to get Token)
- **CORS**: Allowed for `http://localhost:5173`.

## 2. Main Endpoint: `/requests/`
All employee requests (Leave, Overtime, etc.) are handled by a single unified endpoint.

| Method | URL | Description | Role Access |
| :--- | :--- | :--- | :--- |
| **GET** | `/requests/` | List all requests | **Manager**: All, **User**: Own |
| **POST** | `/requests/` | Create a new request | **Any authenticated user** |
| **GET** | `/requests/{id}/` | Get details of a request | Owner or Manager |
| **PUT/PATCH** | `/requests/{id}/` | Update/Approve/Reject | Owner (Draft) or Manager (Status) |
| **DELETE** | `/requests/{id}/` | Delete a request | Owner only |

## 3. Data Schema (Request Object)
The backend uses a unified model. Map your frontend forms to these fields:

### Common Fields (Required for all)
- `type`: String (`"leave"`, `"permission"`, `"reimbursement"`, `"overtime"`)
- `status`: String (`"pending"`, `"approved"`, `"rejected"`) - *Note: Backend defaults to "pending"*
- `reason`: String/Text (Optional)
- `description`: String/Text (Optional)

### Type-Specific Fields
| Request Type | Fields to Send |
| :--- | :--- |
| **Leave** | `start_date` (YYYY-MM-DD), `end_date` (YYYY-MM-DD), `document_url` (String) |
| **Permission** | `permission_type` (String) |
| **Reimbursement** | `amount` (Decimal), `receipt_url` (String) |
| **Overtime** | `hours` (Decimal), `date` (YYYY-MM-DD) |

### Read-Only Fields (From Backend)
- `id`: Integer
- `user_id`: Integer
- `user_name`: String (Full name of requester)
- `created_at`: ISO Timestamp
- `updated_at`: ISO Timestamp
- `manager_comment`: String (Filled by manager during approval)

## 4. Example Integration (Axios)

### Fetching Data
```javascript
const fetchRequests = async () => {
  const response = await axios.get('http://localhost:8000/api/requests/', {
    headers: { Authorization: `Token ${your_token}` }
  });
  return response.data;
};
```

### Creating a Leave Request
```javascript
const createLeave = async (formData) => {
  const payload = {
    type: 'leave',
    start_date: formData.startDate,
    end_date: formData.endDate,
    reason: formData.reason,
    document_url: formData.fileUrl // if any
  };
  return await axios.post('http://localhost:8000/api/requests/', payload);
};
```

### Manager Approval/Rejection
```javascript
const updateStatus = async (id, status, comment) => {
  return await axios.patch(`http://localhost:8000/api/requests/${id}/`, {
    status: status, // 'approved' or 'rejected'
    manager_comment: comment
  });
};
```

## 5. Role Identification
To determine the role on the frontend, you can check the `is_staff` property if you implement a `/user/me/` endpoint, or simply based on the login credentials:
- **Manager**: `is_staff: true` (Can see all requests).
- **Employee**: `is_staff: false` (Can only see their own requests).

## 6. Test Accounts
| Username | Password | Role |
| :--- | :--- | :--- |
| `manager1` | `password123` | Manager |
| `employee1` | `password123` | Employee |

## 7. Security Note
Include the header: `Authorization: Token <your_token_key>` for all API calls.
