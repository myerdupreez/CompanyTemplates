/**
 * ConfirmationStep Component
 * Final step showing booking confirmation and digital ticket generation
 */

import React from 'react';
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard,
  Ticket,
  RefreshCw,
  Phone,
  Clock
} from 'lucide-react';
import { formatCurrency, formatTime, formatDate } from '../utils';
import BookingStatus from './BookingStatus';

const ConfirmationStep = ({ 
  booking, 
  formData, 
  selectedSchedule, 
  totalPrice, 
  onGenerateTicket, 
  onNewBooking 
}) => {
  if (!booking) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-gray-500">Loading booking confirmation...</div>
      </div>
    );
  }

  return (

  <div className="space-y-8">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg shadow-md p-8 text-center border-2 border-green-200">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-extrabold text-green-800 mb-2 tracking-tight">Booking Confirmed!</h2>
        <div className="text-lg text-gray-700 mb-4">Your bus ticket has been successfully booked.</div>
        <div className="flex flex-col items-center justify-center mb-4">
          <span className="text-xs uppercase tracking-widest text-green-700 font-semibold">Booking Reference</span>
          <span className="text-2xl font-mono font-bold text-green-900 bg-white px-4 py-2 rounded-lg border border-green-300 mt-1 shadow-sm">{booking.booking_reference}</span>
        </div>
        <div className="text-sm text-gray-600 mb-2">Please save your booking reference number for check-in and future inquiries.</div>
      </div>

      {/* BookingStatus block below Booking Confirmed */}
      <BookingStatus booking={booking} onDownloadTicket={onGenerateTicket} onRefresh={() => {}} />

      {/* Booking Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Ticket className="w-5 h-5 mr-2 text-red-500" />
          Booking Details
        </h3>

        <div className="space-y-6">
          {/* Journey Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800 border-b border-gray-200 pb-2">
                Journey Information
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-600">Route</div>
                    <div className="font-medium text-gray-800">
                      {selectedSchedule?.route?.origin} → {selectedSchedule?.route?.destination}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-600">Departure Date</div>
                    <div className="font-medium text-gray-800">
                      {formatDate(selectedSchedule?.departure_time)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-600">Departure Time</div>
                    <div className="font-medium text-gray-800">
                      {formatTime(selectedSchedule?.departure_time)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-600">Number of Seats</div>
                    <div className="font-medium text-gray-800">
                      {formData.numberOfSeats} seat{formData.numberOfSeats > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <CreditCard className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-600">Total Amount Paid</div>
                    <div className="font-medium text-red-500 text-lg">
                      {formatCurrency(totalPrice)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800 border-b border-gray-200 pb-2">
                Passenger Information
              </h4>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Name</div>
                  <div className="font-medium text-gray-800">
                    {formData.firstName} {formData.lastName}
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium text-gray-800 break-all">
                      {formData.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="font-medium text-gray-800">
                      {formData.phone}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">ID Number</div>
                  <div className="font-medium text-gray-800 font-mono">
                    {formData.idNumber}
                  </div>
                </div>

                {formData.emergencyContact && (
                  <div>
                    <div className="text-sm text-gray-600">Emergency Contact</div>
                    <div className="font-medium text-gray-800">
                      {formData.emergencyContact}
                      {formData.emergencyPhone && (
                        <div className="text-sm text-gray-600">{formData.emergencyPhone}</div>
                      )}
                    </div>
                  </div>
                )}

                {formData.specialRequests && (
                  <div>
                    <div className="text-sm text-gray-600">Special Requests</div>
                    <div className="font-medium text-gray-800 text-sm">
                      {formData.specialRequests}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">
          Important Information
        </h3>
        <div className="space-y-2 text-sm text-yellow-700">
          <p>• Please arrive at the departure point at least 30 minutes before departure time</p>
          <p>• Bring a valid ID document that matches your booking details</p>
          <p>• Present your digital ticket (printed or on mobile) when boarding</p>
          <p>• Luggage allowance: 1 carry-on bag and 1 checked bag (up to 20kg)</p>
          <p>• Contact our support team at support@falconbuslines.co.za for any assistance</p>
        </div>
      </div>



      {/* Additional Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <button
            onClick={onNewBooking}
            className="bg-gray-100 text-gray-700 px-6 py-4 rounded-lg font-medium hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-300 flex items-center justify-center mx-auto"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Book Another Ticket
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Need Help?
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Customer Support: support@falconbuslines.co.za</p>
          <p>Phone: +27 11 123 4567</p>
          <p>Operating Hours: Monday - Sunday, 6:00 AM - 10:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
