import axios from 'axios';
import { toast } from 'react-hot-toast';
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:2100/',
  timeout: 25000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const apiJson = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:2100/',
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
  },
});
let token = localStorage.getItem('token') || null;
export const apiAuth = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:2100/',
  timeout: 25000,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: localStorage.getItem('token'),
  },
});
export const apiJsonAuth = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:2100/',
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
});
export async function postInstituteRegister(data) {
  try {
    const res = await api.post('v2/register/institution', data);
    return res;
  } catch (error) {
    return error;
  }
}
export async function postCampusRegister(data) {
  try {
    const res = await api.post('register/campussherpa', data);
    return res;
  } catch (error) {
    return error;
  }
}
export async function getResourcesLibrary() {
  const res = await api.get('content/resource');
  return res;
}
export async function getYouthGallery() {
  const res = await api.get('content/youthgallery');
  return res;
}

export async function postVerifyCaptcha(data) {
  try {
    const res = await api.post('captcha/verify', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export const apiForum = axios.create({
  baseURL: process.env.REACT_APP_EKS_API_ENDPOINT || 'http://localhost:5000',
  headers: {
    'x-api-key': process.env.REACT_APP_EKS_API_KEY,
  },
});

export const apiEksathi = axios.create({
  baseURL: process.env.REACT_APP_EKSATHI_API_ENDPOINT || 'http://localhost:5000',
});
