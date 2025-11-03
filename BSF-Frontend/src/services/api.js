// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Token management
const getToken = () => localStorage.getItem('bsf_token');
const setToken = (token) => localStorage.setItem('bsf_token', token);
const removeToken = () => localStorage.removeItem('bsf_token');
const getUser = () => {
  const user = localStorage.getItem('bsf_user');
  return user ? JSON.parse(user) : null;
};
const setUser = (user) => localStorage.setItem('bsf_user', JSON.stringify(user));
const removeUser = () => localStorage.removeItem('bsf_user');

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.success && data.data.token) {
      setToken(data.data.token);
      setUser(data.data.user);
    }
    
    return data;
  },

  logout: () => {
    removeToken();
    removeUser();
  },

  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },

  isAuthenticated: () => {
    return !!getToken();
  },

  getStoredUser: () => {
    return getUser();
  }
};

// Notices API
export const noticesAPI = {
  // Public endpoints
  getPublicNotices: async (category = '', limit = 50) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (limit) params.append('limit', limit);
    
    return await apiRequest(`/notices/public?${params.toString()}`);
  },

  // Admin endpoints
  getAllNotices: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.active !== undefined) params.append('active', filters.active);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return await apiRequest(`/notices?${params.toString()}`);
  },

  getNoticeById: async (id) => {
    return await apiRequest(`/notices/${id}`);
  },

  createNotice: async (noticeData) => {
    return await apiRequest('/notices', {
      method: 'POST',
      body: JSON.stringify(noticeData),
    });
  },

  updateNotice: async (id, noticeData) => {
    return await apiRequest(`/notices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(noticeData),
    });
  },

  deleteNotice: async (id) => {
    return await apiRequest(`/notices/${id}`, {
      method: 'DELETE',
    });
  },
};

// Committee API
export const committeeAPI = {
  // Public endpoints
  getPublicMembers: async (year = new Date().getFullYear()) => {
    return await apiRequest(`/committee/public?year=${year}`);
  },

  getAvailableYears: async () => {
    return await apiRequest('/committee/years');
  },

  // Admin endpoints
  getAllMembers: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.year) params.append('year', filters.year);
    if (filters.active !== undefined) params.append('active', filters.active);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return await apiRequest(`/committee?${params.toString()}`);
  },

  getMemberById: async (id) => {
    return await apiRequest(`/committee/${id}`);
  },

  createMember: async (memberData) => {
    return await apiRequest('/committee', {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  },

  updateMember: async (id, memberData) => {
    return await apiRequest(`/committee/${id}`, {
      method: 'PUT',
      body: JSON.stringify(memberData),
    });
  },

  deleteMember: async (id) => {
    return await apiRequest(`/committee/${id}`, {
      method: 'DELETE',
    });
  },

  reorderMember: async (id, displayOrder) => {
    return await apiRequest(`/committee/${id}/reorder`, {
      method: 'PUT',
      body: JSON.stringify({ displayOrder }),
    });
  },
};

// Export token management for use in components
export { getToken, setToken, removeToken, getUser, setUser, removeUser };
