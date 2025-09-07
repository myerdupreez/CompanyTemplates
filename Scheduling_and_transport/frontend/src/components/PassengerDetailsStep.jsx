/**
 * PassengerDetailsStep Component
 * First step of the booking form for collecting passenger information
 */

import React from 'react';
import { User, Mail, Phone, Calendar, Users, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils';

const PassengerDetailsStep = ({ 
  formData, 
  errors, 
  onInputChange, 
  onNext, 
  totalPrice,
  selectedSchedule 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <User className="w-6 h-6 mr-3 text-red-500" />
        Passenger Details
      </h2>

      <form className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => onInputChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => onInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-1" />
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="e.g., +27 83 123 4567, +82 10 1234 5678, 083 123 4567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* ID and Date of Birth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID Number *
            </label>
            <input
              type="text"
              value={formData.idNumber}
              onChange={(e) => onInputChange('idNumber', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                errors.idNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="1234567890123"
              maxLength={13}
            />
            {errors.idNumber && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.idNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                errors.dateOfBirth ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.dateOfBirth}
              </p>
            )}
          </div>
        </div>

        {/* Number of Seats - Fixed to 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-lg font-semibold text-blue-800">1 Seat</span>
              </div>
              <p className="text-sm text-blue-600 mt-1">
                One booking per passenger
              </p>
            </div>
          </div>

          <div className="flex items-end">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 w-full">
              <div className="text-sm text-red-600 font-medium">Total Amount</div>
              {formData.discountType !== 'none' && (
                <div className="text-sm text-gray-500 line-through">
                  Original: {formatCurrency(selectedSchedule?.price_zar || 0)}
                </div>
              )}
              <div className="text-2xl font-bold text-red-700">{formatCurrency(totalPrice)}</div>
              {formData.discountType !== 'none' && (
                <div className="text-sm text-green-600 font-medium">
                  R40 discount applied!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Discount Selection */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
            💰 Discount Options (R40 off)
          </h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="discountType"
                value="none"
                checked={formData.discountType === 'none'}
                onChange={(e) => onInputChange('discountType', e.target.value)}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">No discount</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="discountType"
                value="scholar"
                checked={formData.discountType === 'scholar'}
                onChange={(e) => onInputChange('discountType', e.target.value)}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">
                <strong>Scholar</strong> - 13 years & younger (ID verification at boarding)
              </span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="discountType"
                value="student"
                checked={formData.discountType === 'student'}
                onChange={(e) => onInputChange('discountType', e.target.value)}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">
                <strong>Student</strong> - Valid student card required at boarding
              </span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="discountType"
                value="pensioner"
                checked={formData.discountType === 'pensioner'}
                onChange={(e) => onInputChange('discountType', e.target.value)}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">
                <strong>Pensioner</strong> - Valid ID required at boarding
              </span>
            </label>
          </div>
          
          {formData.discountType !== 'none' && (
            <div className="mt-3 p-3 bg-green-100 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Note:</strong> Appropriate documentation must be presented when boarding. 
                If documentation is not available, full fare will be charged.
              </p>
            </div>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Name
            </label>
            <input
              type="text"
              value={formData.emergencyContact}
              onChange={(e) => onInputChange('emergencyContact', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="Emergency contact name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              value={formData.emergencyPhone}
              onChange={(e) => onInputChange('emergencyPhone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="e.g., +27 83 123 4567, +82 10 1234 5678"
            />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests or Comments
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => onInputChange('specialRequests', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            placeholder="Any special requirements, accessibility needs, or comments..."
          />
        </div>

        {/* Continue Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onNext}
            className="px-8 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-200 transition-all duration-300 flex items-center"
          >
            Continue to Payment
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassengerDetailsStep;
