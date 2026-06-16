import apiClient from './api';

export async function uploadAndAnalyze(file) {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await apiClient.post('/api/v1/images/analyze', formData);
  return data;
}