import apiClient from './api';

const BASE = import.meta.env.VITE_API_URL;

export const getPdfUrl = (id) => `${BASE}/api/v1/reports/${id}/pdf`;