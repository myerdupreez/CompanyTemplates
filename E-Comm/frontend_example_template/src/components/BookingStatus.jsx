/**
 * BookingStatus Component
 * Shows booking status and payment confirmation state
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Download, 
  RefreshCw,
  AlertTriangle,
  CreditCard,
  Ticket
} from 'lucide-react';

const BookingStatus = ({ booking, onDownloadTicket, onRefresh }) => {
  const [statusInfo, setStatusInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookingStatus = async () => {
    try {
      const response = await fetch(`/api/bookings/${booking.id}/status/`);
      if (response.ok) {
        const data = await response.json();
        setStatusInfo(data);
      }
    } catch (error) {
      console.error('Error fetching booking status:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (booking?.id) {
      fetchBookingStatus();
    }
  }, [booking?.id]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBookingStatus();
    if (onRefresh) {
      onRefresh();
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Checking booking status...</p>
      </div>
    );
  }

  const getStatusDisplay = () => {
    if (!statusInfo) return null;

    switch (statusInfo.status) {
      case 'confirmed':
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-500" />,
          title: 'Payment Confirmed!',
          message: 'Your payment has been confirmed. You can now download your ticket.',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          canDownload: true
        };
      
      case 'payment_processing':
        return {
          icon: <Clock className="w-12 h-12 text-yellow-500 animate-pulse" />,
          title: 'Awaiting Payment Confirmation',
          message: (
            <div className="space-y-2">
              <div>We have received your payment and are waiting for confirmation from <span className="font-semibold text-yellow-900">PayFast</span>.</div>
              <div className="flex items-center justify-center gap-2 text-yellow-800">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>This usually takes a few minutes.</span>
              </div>
              <div className="text-xs text-yellow-700 mt-2">You will receive a confirmation email and your ticket will be available for download once payment is verified.</div>
            </div>
          ),
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          canDownload: false
        };
      
      case 'pending':
        return {
          icon: <CreditCard className="w-12 h-12 text-blue-500" />,
          title: 'Payment Pending',
          message: 'Please complete your payment to confirm your booking.',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          canDownload: false
        };
      
      case 'cancelled':
        return {
          icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
          title: 'Booking Cancelled',
          message: 'This booking has been cancelled.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          canDownload: false
        };
      
      default:
        return {
          icon: <Ticket className="w-12 h-12 text-gray-500" />,
          title: `Status: ${statusInfo.status}`,
          message: statusInfo.status_message,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          canDownload: false
        };
    }
  };

  const statusDisplay = getStatusDisplay();
  if (!statusDisplay) return null;

  return (
    <div className={`${statusDisplay.bgColor} ${statusDisplay.borderColor} border-2 rounded-lg p-6 mb-6`}>
      <div className="text-center mb-6">
        <div className="mb-4">
          {statusDisplay.icon}
        </div>
        <h3 className={`text-xl font-semibold ${statusDisplay.textColor} mb-2`}>
          {statusDisplay.title}
        </h3>
        <p className={`${statusDisplay.textColor} mb-4`}>
          {statusDisplay.message}
        </p>
        
        {statusInfo?.payment_date && (
          <p className="text-sm text-gray-600">
            Payment confirmed on: {new Date(statusInfo.payment_date).toLocaleString()}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {statusDisplay.canDownload ? (
          <button
            onClick={onDownloadTicket}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-300 flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF Ticket
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Checking...' : 'Check Status'}
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Click to check if payment has been confirmed
            </p>
          </div>
        )}
      </div>

      {statusInfo?.status === 'payment_processing' && (
        <div className="mt-6 p-4 bg-white rounded-lg border border-yellow-300">
          <h4 className="font-medium text-yellow-800 mb-2">What happens next?</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• PayFast is processing your payment</li>
            <li>• You will receive a confirmation email when payment is verified</li>
            <li>• Your ticket will be available for download once confirmed</li>
            <li>• This process usually takes 2-5 minutes</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingStatus;
