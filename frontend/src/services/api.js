import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Intercept requests to attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('curenova_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses for error formatting
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'Biomedical intelligence service temporarily unavailable.';
    return Promise.reject(new Error(message));
  }
);

export const authService = {
  login: (email, password, role) => api.post('/auth/login', { email, password, role }),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

export const repurposingService = {
  getDiseases: () => api.get('/drug-repurposing/diseases'),
  analyze: (query, minEvidence = 'all') =>
    api.post('/drug-repurposing/analyze', { query, min_evidence_strength: minEvidence }),
  getResult: (id) => api.get(`/drug-repurposing/${id}`),
};

export const safetyService = {
  getCatalog: () => api.get('/medication-safety/catalog'),
  analyze: (medications, patientContext = null, roleView = 'doctor') =>
    api.post('/medication-safety/analyze', {
      medications,
      patient_context: patientContext,
      role_view: roleView,
    }),
  getResult: (id) => api.get(`/medication-safety/${id}`),
  simulateTwin: (baselineMedications, addedDrugs = [], removedDrugs = [], patientContext = null) =>
    api.post('/medication-safety/simulate-twin', {
      baseline_medications: baselineMedications,
      candidate_added_drugs: addedDrugs,
      candidate_removed_drugs: removedDrugs,
      patient_context: patientContext,
    }),
};

export const evidenceService = {
  search: (params) => api.get('/evidence/search', { params }),
};

export const graphService = {
  getOverview: (entityType = null, maxNodes = 60) =>
    api.get('/graph/overview', { params: { entity_type: entityType, max_nodes: maxNodes } }),
  getNodeSubgraph: (entityId) => api.get(`/graph/${entityId}`),
};

export const metaService = {
  getHealth: () => api.get('/health'),
  getDrug: (id) => api.get(`/drugs/${id}`),
  searchDrugs: (q) => api.get('/drugs/search', { params: { q } }),
};

export default api;
