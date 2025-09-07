/**
 * PaymentStep Component
 * Second step of the booking form for payment processing
 */

import React from 'react';
import { CreditCard, Shield, ArrowLeft, AlertCircle, Lock } from 'lucide-react';
import { formatCurrency } from '../utils';
import LoadingSpinner from './LoadingSpinner';

const PaymentStep = ({ 
  formData, 
  errors, 
  onInputChange, 
  onPrev, 
  onSubmit, 
  loading, 
  totalPrice, 
  formatCardNumber, 
  formatExpiryDate 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      {/* PayFast logo near card input */}
      <div className="flex justify-end mb-2">
        <img
          src="/payfast_logo.png"
          alt="PayFast Logo"
          className="h-8 opacity-90"
          style={{ filter: 'grayscale(0.2)' }}
        />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <CreditCard className="w-6 h-6 mr-3 text-red-500" />
        Payment Information
      </h2>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-green-800">Secure Payment</h3>
            <p className="text-sm text-green-700 mt-1">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-6">
        {/* Total Amount Summary */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-red-800">Total Amount</h3>
              <p className="text-sm text-red-600">
                {formData.numberOfSeats} seat{formData.numberOfSeats > 1 ? 's' : ''} × {formatCurrency(totalPrice / formData.numberOfSeats)}
              </p>
            </div>
            <div className="text-3xl font-bold text-red-700">
              {formatCurrency(totalPrice)}
            </div>
          </div>
        </div>

        {/* Card Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => onInputChange('cardNumber', formatCardNumber(e.target.value))}
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                  errors.cardNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              <CreditCard className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
            </div>
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.cardNumber}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => onInputChange('expiryDate', formatExpiryDate(e.target.value))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                  errors.expiryDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.expiryDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => onInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                    errors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="123"
                  maxLength={4}
                />
                <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Holder Name *
            </label>
            <input
              type="text"
              value={formData.cardHolderName}
              onChange={(e) => onInputChange('cardHolderName', e.target.value.toUpperCase())}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                errors.cardHolderName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="JOHN SMITH"
            />
            {errors.cardHolderName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.cardHolderName}
              </p>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={formData.acceptTerms}
              onChange={(e) => onInputChange('acceptTerms', e.target.checked)}
              className="mt-1 w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
              I accept the{' '}
              <a href="#" className="text-red-500 hover:text-red-600 underline">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-red-500 hover:text-red-600 underline">
                Privacy Policy
              </a>{' '}
              *
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-600 flex items-center ml-7">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.acceptTerms}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200 space-y-3 sm:space-y-0">
          <button
            type="button"
            onClick={onPrev}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all duration-300 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Details
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                <span className="ml-2">Processing...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Complete Booking
              </>
            )}
          </button>
        </div>
      </form>

      {/* Security Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <Shield className="w-4 h-4 mr-2 text-green-600" />
          256-bit SSL encrypted • PCI DSS compliant • Your data is secure
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
