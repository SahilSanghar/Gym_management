import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL if different

const api = axios.create({
    baseURL: API_URL,
});

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getMembers = () => api.get('/members');
export const addMember = (data) => api.post('/members', data);
export const updateMember = (id, data) => api.put(`/members/${id}`, data);
export const deleteMember = (id) => api.delete(`/members/${id}`);
export const getBills = () => api.get('/bills');
export const createBill = (data) => api.post('/bills', data);
export const getNotifications = () => api.get('/notifications');
export const createNotification = (data) => api.post('/notifications', data);

export default api;
