// src/api.js

const API_BASE = import.meta.env.VITE_API_BASE || '';

export const fetchCourses = () =>
  fetch(`${API_BASE}/api/courses`).then(res => res.json());

export const login = (data) =>
  fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const register = (data) =>
  fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const enrollInCourse = (courseId) => {
  const token = localStorage.getItem('token');
  return fetch(`${API_BASE}/api/enroll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ courseId })
  }).then(res => res.json());
};

export const fetchProfile = () => {
  const token = localStorage.getItem('token');
  return fetch(`${API_BASE}/api/auth/me`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  }).then(res => res.json());
};

export const fetchEnrolledCourses = () => {
  const token = localStorage.getItem('token');
  return fetch(`${API_BASE}/api/enroll/me`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  }).then(res => res.json());
};

// Add more as needed (enroll, progress, etc.) 