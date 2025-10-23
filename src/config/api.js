// src/config/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  COMPLIANCE_ANALYZE: `${API_BASE_URL}/api/compliance/analyze`,
  COMPLIANCE_ANALYZE_ENHANCED: `${API_BASE_URL}/api/compliance/analyze-enhanced`,
  COMPLIANCE_HEALTH: `${API_BASE_URL}/api/compliance/health`,
  COMPLIANCE_RULES: `${API_BASE_URL}/api/compliance/rules`,
  COMPLIANCE_READ_DOCUMENT: `${API_BASE_URL}/api/compliance/read-document`, 
};

export default API_BASE_URL;