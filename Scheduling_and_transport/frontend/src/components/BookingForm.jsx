/**
 * BookingForm Component
 * 
 * Handles the complete booking process including:
 *       if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      // numberOfSeats is fixed to 1, no validation neededsenger details collection
 * - Seat selection
 * - Payment processing
 * - Digital ticket generation
 */

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle,
  Download,
  Calendar,
  Ticket,
  Shield,
  AlertCircle,
  Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { formatCurrency, formatTime, formatDate } from '../utils';
import LoadingSpinner from './LoadingSpinner';
import PassengerDetailsStep from './PassengerDetailsStep';
import PaymentStep from './PaymentStep';
import ConfirmationStep from './ConfirmationStep';

const BookingForm = ({ selectedSchedule, onBack, onBookingComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    // Passenger details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    dateOfBirth: '',
    
    // Booking details
    numberOfSeats: 1, // Fixed to 1 seat per booking
    discountType: 'none', // New discount field
    specialRequests: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Payment details
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    
    // Terms acceptance
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});

  // Calculate total price with discount (fixed 1 seat)
  const basePrice = selectedSchedule?.price_zar || 0;
  const discountAmount = (formData.discountType !== 'none') ? 40 : 0;
  const totalPrice = Math.max(basePrice - discountAmount, 0);

  // Form validation
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Passenger details validation
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^[\+]?[0-9\s\-\(\)]{7,20}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number (any international format)';
      }
      if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
      else if (!/^[0-9]{13}$/.test(formData.idNumber)) {
        newErrors.idNumber = 'ID number must be 13 digits';
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (formData.numberOfSeats < 1) newErrors.numberOfSeats = 'At least 1 seat required';
      if (formData.numberOfSeats > selectedSchedule?.available_seats) {
        newErrors.numberOfSeats = `Only ${selectedSchedule?.available_seats} seats available`;
      }
    }

    if (step === 2) {
      // Payment validation
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^[0-9]{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Expiry date must be MM/YY format';
      }
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      else if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
      if (!formData.cardHolderName.trim()) newErrors.cardHolderName = 'Card holder name is required';
      if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    
    // Scroll to top when validation fails to show error messages
    if (!isValid) {
      scrollToTop();
    }
    
    return isValid;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Format card number input
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format expiry date input
  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    scrollToTop();
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Submit booking
  const handleSubmitBooking = async () => {
    if (!validateStep(2)) return;

    setLoading(true);
    try {
      const bookingData = {
        schedule_id: selectedSchedule.id,
        passenger_name: `${formData.firstName} ${formData.lastName}`,
        passenger_email: formData.email,
        passenger_phone: formData.phone,
        passenger_id_number: formData.idNumber,
        date_of_birth: formData.dateOfBirth,
        number_of_seats: formData.numberOfSeats,
        discount_type: formData.discountType, // Include discount type
        special_requests: formData.specialRequests,
        emergency_contact: formData.emergencyContact,
        emergency_phone: formData.emergencyPhone,
        total_amount_zar: totalPrice
      };

      console.log('Submitting booking data:', bookingData);
      

      // Helper to get CSRF token from cookie
      function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }

      const response = await fetch('/api/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(bookingData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        
        // Show detailed validation errors if available
        if (errorData.details) {
          console.error('Validation details:', errorData.details);
          const errorMessages = Object.entries(errorData.details)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('\n');
          throw new Error(`Validation failed:\n${errorMessages}`);
        }
        
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const bookingResult = await response.json();
      setBooking(bookingResult);
      setCurrentStep(3); // Success step
      toast.success('Booking confirmed successfully!');

    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to process booking. Please try again.');
      scrollToTop(); // Scroll to top to show error message
    } finally {
      setLoading(false);
    }
  };

  // Generate digital ticket
  const generateDigitalTicket = async () => {
    if (!booking) return;

    try {
      const response = await fetch(`/api/bookings/${booking.id}/download_ticket/`);
      
      if (!response.ok) {
        throw new Error('Failed to download ticket');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `falcon-ticket-${booking.booking_reference}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('PDF ticket downloaded successfully!');
    } catch (error) {
      console.error('Error downloading ticket:', error);
      toast.error('Failed to download ticket. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-red-500 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Schedules
        </button>
        
        <div className="text-sm text-gray-600">
          Step {currentStep} of 3
        </div>
      </div>

      {/* Progress Bar - Centered with PayFast logo below */}
    <div className="mb-8 flex flex-col items-start w-full">
      <div className="flex items-center w-full px-2 sm:px-4">
        {[1, 2, 3].map((step, index) => (
          <>
            <div key={step} className="flex flex-col items-center min-w-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shadow-md border-2 transition-all duration-300 ${
                step < currentStep
                  ? 'bg-green-500 border-green-600 text-white scale-110'
                  : step === currentStep
                  ? 'bg-white border-green-500 text-green-700 scale-105'
                  : 'bg-gray-200 border-gray-300 text-gray-400'
              }`}>
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {/* Step label below each checkpoint */}
              <div className="mt-3 text-xs text-gray-600 font-semibold w-20 sm:w-28 md:w-32 text-center">
                {step === 1 && 'Passenger Details'}
                {step === 2 && (<span className="flex items-center justify-center"><Lock className="w-4 h-4 mr-1 text-green-600" /> Payment</span>)}
                {step === 3 && 'Confirmation'}
              </div>
            </div>
            {index < 2 && (
              <div className={`flex-grow h-2 mx-1 sm:mx-2 md:mx-4 rounded-full transition-all duration-300 ${
                step < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </>
        ))}
      </div>
        {/* Show PayFast logo only on payment step */}
  {/* PayFast logo removed from here; will be placed in PaymentStep */}
      </div>

      {/* Selected Schedule Summary */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 border-2 border-red-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Ticket className="w-5 h-5 mr-2 text-red-500" />
          Selected Journey
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Route:</span>
            <p className="font-medium">{selectedSchedule?.route?.origin} → {selectedSchedule?.route?.destination}</p>
          </div>
          <div>
            <span className="text-gray-600">Departure:</span>
            <p className="font-medium">{formatDate(selectedSchedule?.departure_time)} at {formatTime(selectedSchedule?.departure_time)}</p>
          </div>
          <div>
            <span className="text-gray-600">Price per seat:</span>
            <p className="font-medium text-red-500">{formatCurrency(selectedSchedule?.price_zar)}</p>
          </div>
          <div>
            <span className="text-gray-600">Available seats:</span>
            <p className="font-medium">{selectedSchedule?.available_seats}</p>
          </div>
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <PassengerDetailsStep
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
          onNext={handleNextStep}
          totalPrice={totalPrice}
          selectedSchedule={selectedSchedule}
        />
      )}

      {currentStep === 2 && (
        <PaymentStep
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
          onPrev={handlePrevStep}
          onSubmit={handleSubmitBooking}
          loading={loading}
          totalPrice={totalPrice}
          formatCardNumber={formatCardNumber}
          formatExpiryDate={formatExpiryDate}
        />
      )}

      {currentStep === 3 && (
        <ConfirmationStep
          booking={booking}
          formData={formData}
          selectedSchedule={selectedSchedule}
          totalPrice={totalPrice}
          onGenerateTicket={generateDigitalTicket}
          onNewBooking={() => {
            setCurrentStep(1);
            setBooking(null);
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              idNumber: '',
              dateOfBirth: '',
              numberOfSeats: 1,
              specialRequests: '',
              emergencyContact: '',
              emergencyPhone: '',
              cardNumber: '',
              expiryDate: '',
              cvv: '',
              cardHolderName: '',
              acceptTerms: false
            });
            onBookingComplete && onBookingComplete();
          }}
        />
      )}
    </div>
  );
};

export default BookingForm;
