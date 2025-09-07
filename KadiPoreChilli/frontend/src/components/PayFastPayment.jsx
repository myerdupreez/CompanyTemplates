// PayFast Payment Integration Component

import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/solid';

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
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <LockClosedIcon className="h-6 w-6 text-green-600" />
          <span className="text-green-700 font-semibold text-base">100% Secure Payment</span>
        </div>
        <img src="https://www.payfast.co.za/wp-content/themes/payfast/assets/images/logos/pf-logo-2022.svg" alt="PayFast Logo" className="h-8" />
      </div>

      <h3 className="text-2xl font-bold mb-2 text-gray-900">Complete Your Payment</h3>
      <p className="text-gray-500 mb-6 text-sm">All transactions are encrypted and processed securely by PayFast.</p>

      <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-100">
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
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg shadow"
        >
          {processing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Redirecting to PayFast...
            </div>
          ) : (
            <span className="flex items-center justify-center">
              <LockClosedIcon className="h-5 w-5 mr-2 text-white" />
              Pay R{booking.total_amount_zar} Securely with PayFast
            </span>
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
        <p className="mb-2 flex items-center">
          <LockClosedIcon className="h-4 w-4 mr-1 text-green-600" />
          <span><strong>Secure Payment:</strong> You will be redirected to PayFast's secure payment page.</span>
        </p>
        <p className="mb-2">
          <strong>Payment Methods:</strong> Credit Card, Instant EFT, Debit Card, and more.
        </p>
        <p>
          <strong>Currency:</strong> South African Rand (ZAR)
        </p>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> After payment, you will be redirected back to complete your booking and download your ticket.
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <img src="https://www.payfast.co.za/wp-content/themes/payfast/assets/images/icons/secure-payments.svg" alt="Secure" className="h-6 mr-2" />
        <span className="text-xs text-gray-400">Powered by PayFast • PCI DSS Compliant</span>
      </div>
    </div>
  );
};

export default PayFastPayment;
