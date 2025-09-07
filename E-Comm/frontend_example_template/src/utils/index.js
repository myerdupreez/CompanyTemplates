/**
 * Utility Functions
 * 
 * Common utility functions used throughout the application
 */

import { format, parseISO, isValid } from 'date-fns';

/**
 * Format currency in South African Rand
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date for display
 */
export const formatDate = (dateString, formatStr = 'PPP') => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    if (!isValid(date)) return 'Invalid date';
    return format(date, formatStr);
  } catch (error) {
    return 'Invalid date';
  }
};

/**
 * Format time for display
 */
export const formatTime = (dateString) => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    if (!isValid(date)) return 'Invalid time';
    return format(date, 'HH:mm');
  } catch (error) {
    return 'Invalid time';
  }
};

/**
 * Format duration (hours to human readable)
 */
export const formatDuration = (hours) => {
  if (hours < 1) {
    return `${Math.round(hours * 60)}min`;
  }
  
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (minutes === 0) {
    return `${wholeHours}h`;
  }
  
  return `${wholeHours}h ${minutes}min`;
};

/**
 * Calculate travel duration between two dates
 */
export const calculateDuration = (departure, arrival) => {
  try {
    const depDate = typeof departure === 'string' ? parseISO(departure) : departure;
    const arrDate = typeof arrival === 'string' ? parseISO(arrival) : arrival;
    
    if (!isValid(depDate) || !isValid(arrDate)) return 'Unknown';
    
    const diffMs = arrDate - depDate;
    const hours = diffMs / (1000 * 60 * 60);
    
    return formatDuration(hours);
  } catch (error) {
    return 'Unknown';
  }
};

/**
 * Validate South African phone number
 */
export const validateSAPhoneNumber = (phone) => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid SA number
  // Can start with +27, 27, or 0
  const saPhoneRegex = /^(?:\+27|27|0)([1-9]\d{8})$/;
  return saPhoneRegex.test(cleanPhone);
};

/**
 * Format South African phone number
 */
export const formatSAPhoneNumber = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.startsWith('27')) {
    return `+${cleanPhone}`;
  } else if (cleanPhone.startsWith('0')) {
    return `+27${cleanPhone.substring(1)}`;
  }
  
  return phone;
};

/**
 * Validate email address
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate a random booking reference (for display purposes)
 */
export const generateBookingReference = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let reference = 'FB'; // Falcon Bus prefix
  
  // Add 4 random letters
  for (let i = 0; i < 4; i++) {
    reference += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // Add 4 random numbers
  for (let i = 0; i < 4; i++) {
    reference += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return reference;
};

/**
 * Debounce function for search inputs
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Get route type display text
 */
export const getRouteTypeText = (routeType) => {
  switch (routeType) {
    case 'round_trip':
      return 'Round Trip';
    case 'one_way':
      return 'One Way';
    default:
      return 'Unknown';
  }
};

/**
 * Get bus type display text and color
 */
export const getBusTypeInfo = (busType) => {
  switch (busType) {
    case 'luxury':
      return {
        text: 'Luxury',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
      };
    case 'standard':
      return {
        text: 'Standard',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
      };
    case 'economy':
      return {
        text: 'Economy',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
      };
    default:
      return {
        text: 'Unknown',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
      };
  }
};

/**
 * Get booking status display info
 */
export const getBookingStatusInfo = (status) => {
  switch (status) {
    case 'pending':
      return {
        text: 'Pending Payment',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
      };
    case 'confirmed':
      return {
        text: 'Confirmed',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
      };
    case 'cancelled':
      return {
        text: 'Cancelled',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
      };
    case 'completed':
      return {
        text: 'Completed',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
      };
    case 'no_show':
      return {
        text: 'No Show',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
      };
    default:
      return {
        text: 'Unknown',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
      };
  }
};
