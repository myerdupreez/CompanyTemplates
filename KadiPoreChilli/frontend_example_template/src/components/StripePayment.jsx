// PayFast Payment Integration Component

import React, { useState } from 'react';

const PayFastPayment = ({ booking, onPaymentSuccess, onPaymentError }) => {
  const [processing, setProcessing] = useState(false);

  const handlePayFastPayment = async () => {
    setProcessing(true);
    
    try {
      // PayFast works by redirecting to their payment page
      // The payment form data is already prepared by the backend
      
      if (!booking.payment || !booking.payment.form_data) {
        throw new Error('Payment form data not available');
      }

      // Create and submit a form to PayFast
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = booking.payment.action_url;
      form.style.display = 'none';

      // Add all PayFast form fields
      Object.entries(booking.payment.form_data).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      // Add form to page and submit
      document.body.appendChild(form);
      
      // Notify parent component that redirect is happening
      onPaymentSuccess({
        status: 'redirecting',
        payment_id: booking.payment.payment_id,
        message: 'Redirecting to PayFast...'
      });
      
      // Submit form (this will redirect to PayFast)
      form.submit();
      
    } catch (error) {
      console.error('PayFast payment error:', error);
      onPaymentError(error.message || 'Payment setup failed');
      setProcessing(false);
    }
  };

  const handleManualConfirm = async () => {
    // For testing: manually confirm payment
    try {
      const response = await fetch(`/api/bookings/${booking.id}/confirm_payment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        onPaymentSuccess({
          status: 'confirmed',
          booking_reference: result.booking_reference,
          message: 'Payment confirmed successfully!'
        });
      } else {
        const error = await response.json();
        onPaymentError(error.error || 'Payment confirmation failed');
      }
    } catch (error) {
      onPaymentError('Failed to confirm payment');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Complete Payment</h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Booking Reference:</span>
          <span className="font-semibold">{booking.booking_reference}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-semibold text-lg text-green-600">
            R{booking.total_amount_zar}
          </span>
        </div>
        {booking.discount_amount > 0 && (
          <div className="flex justify-between items-center mb-2 text-sm text-green-600">
            <span>Discount Applied ({booking.discount_type}):</span>
            <span>-R{booking.discount_amount}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <button
          onClick={handlePayFastPayment}
          disabled={processing}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Redirecting to PayFast...
            </div>
          ) : (
            `Pay R${booking.total_amount_zar} with PayFast`
          )}
        </button>

        {/* Testing button - remove in production */}
        <button
          onClick={handleManualConfirm}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Manual Confirm (Testing Only)
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-2">
          <strong>Secure Payment:</strong> You will be redirected to PayFast's secure payment page.
        </p>
        <p className="mb-2">
          <strong>Payment Methods:</strong> Credit Card, Instant EFT, and more.
        </p>
        <p>
          <strong>Currency:</strong> South African Rand (ZAR)
        </p>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> After payment, you will be redirected back to complete your booking 
          and download your ticket.
        </p>
      </div>
    </div>
  );
};

export default PayFastPayment;
