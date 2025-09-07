/**
 * API Service for Bus Transport System
 * 
 * This file handles all communication with the Django backend.
 * It provides functions to fetch routes, schedules, create bookings, etc.
 */

import axios from 'axios';

// Get API URL from environment variables
const getApiUrl = () => {
  // In production (served by Django), use relative URL
  if (import.meta.env.PROD) {
    return '/api';
  }
  
  // In development, check for environment variable
  if (import.meta.env.VITE_API_URL) {
    return `${import.meta.env.VITE_API_URL}/api`;
  }
  
  // Default to local development
  return 'http://127.0.0.1:8000/api';
};

console.log('🔍 API Debug Info:', {
  mode: import.meta.env.MODE,
  prod: import.meta.env.PROD,
  dev: import.meta.env.DEV,
  apiUrl: getApiUrl(),
  viteApiUrl: import.meta.env.VITE_API_URL
});

// Create axios instance with base configuration
const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

/**
 * Routes API
 */
export const routesAPI = {
  // Get all available routes
  getRoutes: async () => {
    const response = await api.get('/routes/');
    return response.data;
  },

  // Get specific route details
  getRoute: async (id) => {
    const response = await api.get(`/routes/${id}/`);
    return response.data;
  },
};

/**
 * Schedules API
 */
export const schedulesAPI = {
  // Search schedules with filters
  searchSchedules: async (params) => {
    const response = await api.get('/schedules/search/', { params });
    return response.data;
  },

  // Get specific schedule details
  getSchedule: async (id) => {
    const response = await api.get(`/schedules/${id}/`);
    return response.data;
  },
};

/**
 * Bookings API
 */
export const bookingsAPI = {
  // Create a new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings/', bookingData);
    return response.data;
  },

  // Get booking details by ID
  getBooking: async (bookingId) => {
    const response = await api.get(`/bookings/${bookingId}/`);
    return response.data;
  },
};

/**
 * Payment API
 */
export const paymentAPI = {
  // Create Stripe payment intent
  createPaymentIntent: async (data) => {
    const response = await api.post('/payment/create-intent/', data);
    return response.data;
  },

  // Confirm payment success
  confirmPayment: async (data) => {
    const response = await api.post('/payment/confirm/', data);
    return response.data;
  },
};

/**
 * Company Information API
 */
export const companyAPI = {
  // Get company contact information
  getContactInfo: async () => {
    const response = await api.get('/contact/');
    return response.data;
  },

  // Get FAQs
  getFAQs: async () => {
    const response = await api.get('/faq/');
    return response.data;
  },
};

export default api;
