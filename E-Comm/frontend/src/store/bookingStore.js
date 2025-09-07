/**
 * Global State Management using Zustand
 * 
 * This store manages the booking flow state and user selections.
 * It keeps track of selected routes, schedules, passenger info, etc.
 */

import { create } from 'zustand';

const useBookingStore = create((set, get) => ({
  // Search criteria
  searchCriteria: {
    origin: '',
    destination: '',
    date: '',
    passengers: 1,
  },

  // Search results
  routes: [],
  schedules: [],
  selectedSchedule: null,

  // Booking flow
  currentStep: 1, // 1: Search, 2: Select Schedule, 3: Passenger Info, 4: Payment
  passengerInfo: {
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    specialRequests: '',
  },

  // Loading and error states
  loading: false,
  error: null,

  // Actions
  setSearchCriteria: (criteria) =>
    set((state) => ({
      searchCriteria: { ...state.searchCriteria, ...criteria },
    })),

  setRoutes: (routes) => set({ routes }),

  setSchedules: (schedules) => set({ schedules }),

  setSelectedSchedule: (schedule) => set({ selectedSchedule: schedule }),

  setCurrentStep: (step) => set({ currentStep: step }),

  setPassengerInfo: (info) =>
    set((state) => ({
      passengerInfo: { ...state.passengerInfo, ...info },
    })),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  // Reset booking flow
  resetBooking: () =>
    set({
      selectedSchedule: null,
      currentStep: 1,
      passengerInfo: {
        name: '',
        email: '',
        phone: '',
        idNumber: '',
        specialRequests: '',
      },
      error: null,
    }),

  // Calculate total amount
  getTotalAmount: () => {
    const { selectedSchedule, searchCriteria } = get();
    if (!selectedSchedule) return 0;
    return selectedSchedule.price_zar * searchCriteria.passengers;
  },
}));

export default useBookingStore;
