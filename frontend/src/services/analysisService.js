const BASE = import.meta.env.VITE_API_URL || '';

export const getPdfUrl = (id) => `${BASE}/api/v1/reports/${id}/pdf`;
export const getJsonUrl = (id) => `${BASE}/api/v1/reports/${id}/json`;