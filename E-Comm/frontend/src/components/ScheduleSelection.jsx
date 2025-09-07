/**
 * ScheduleSelection Component
 * 
 * Displays available schedules for a selected route and allows
 * users to choose departure times and dates.
 */

import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Users, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatCurrency, formatTime, formatDate } from '../utils';
import LoadingSpinner from './LoadingSpinner';

const ScheduleSelection = ({ selectedRoute, onBack, onSelectSchedule }) => {
  const [schedules, setSchedules] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [datesLoading, setDatesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [showAllDates, setShowAllDates] = useState(false);

  // Show only first 14 dates initially, or all if showAllDates is true
  const displayedDates = showAllDates ? availableDates : availableDates.slice(0, 14);

  // Fetch available dates for the selected route
  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        setDatesLoading(true);
        setError(null);
        
        const response = await fetch(`/api/schedules/available_dates/?route=${selectedRoute.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch available dates: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Available dates:', data);
        
        const dates = data.available_dates || [];
        setAvailableDates(dates);
        
        // Set default to first available date
        if (dates.length > 0) {
          setSelectedDate(dates[0]);
        }
        
      } catch (err) {
        console.error('Error fetching available dates:', err);
        setError(err.message);
        toast.error('Failed to load available dates. Please try again.');
      } finally {
        setDatesLoading(false);
      }
    };

    if (selectedRoute) {
      fetchAvailableDates();
    }
  }, [selectedRoute]);

  // Fetch schedules for the selected route
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/schedules/search/?route=${selectedRoute.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch schedules: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched schedules:', data);
        
        const schedulesData = data.results || data;
        setSchedules(Array.isArray(schedulesData) ? schedulesData : []);
        
      } catch (err) {
        console.error('Error fetching schedules:', err);
        setError(err.message);
        toast.error('Failed to load schedules. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedRoute) {
      fetchSchedules();
    }
  }, [selectedRoute]);

  // Filter schedules by selected date
  useEffect(() => {
    if (selectedDate && schedules.length > 0) {
      const filtered = schedules.filter(schedule => {
        const scheduleDate = new Date(schedule.departure_time).toISOString().split('T')[0];
        return scheduleDate === selectedDate;
      });
      setFilteredSchedules(filtered);
    }
  }, [selectedDate, schedules]);

  const handleScheduleSelect = (schedule) => {
    onSelectSchedule(schedule);
    toast.success(`Selected departure at ${formatTime(schedule.departure_time)}`);
  };

  if (loading || datesLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
          <span className="ml-3 text-gray-600">
            {datesLoading ? 'Loading available dates...' : 'Loading schedules...'}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-red-500 hover:text-red-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Routes
        </button>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Unable to Load Schedules
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8 bg-white min-h-screen">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-red-500 hover:text-red-600 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Routes
      </button>

      {/* Route Header */}
      <div className="bg-gray-100 border-2 border-gray-200 rounded-lg shadow-md p-4 sm:p-6 mb-6 hover:border-red-500 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">{selectedRoute.name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 self-start sm:self-auto ${
            selectedRoute.route_type === 'round_trip' 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-gray-300 text-gray-800 hover:bg-red-100 hover:text-red-500'
          }`}>
            {selectedRoute.route_type === 'round_trip' ? 'Round Trip' : 'One Way'}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-2">
          <div className="flex items-center mb-2 sm:mb-0">
            <MapPin className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">{selectedRoute.origin}</span>
          </div>
          <span className="hidden sm:inline mx-3 text-red-500">→</span>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-red-500 flex-shrink-0 sm:hidden" />
            <span className="font-medium text-sm sm:text-base">{selectedRoute.destination}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-xs sm:text-sm text-gray-600">
          <span className="mb-1 sm:mb-0">Duration: {selectedRoute.duration_hours}h</span>
          <span className="mb-1 sm:mb-0">Distance: {selectedRoute.distance_km}km</span>
          <span className="font-semibold text-red-500 text-sm sm:text-base">From {formatCurrency(selectedRoute.base_price_zar)}</span>
        </div>
        
        {selectedRoute.operating_days && (
          <div className="mt-3 text-xs sm:text-sm text-gray-600">
            <span className="font-medium">Operating Days:</span> {selectedRoute.operating_days}
          </div>
        )}
      </div>

      {/* Date Selection */}
      <div className="bg-white border-2 border-gray-200 rounded-lg shadow-md p-4 sm:p-6 mb-6 hover:border-red-500 transition-all duration-300">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Select Travel Date
          <span className="block sm:inline text-xs sm:text-sm font-normal text-gray-600 sm:ml-2 mt-1 sm:mt-0">
            ({availableDates.length} dates available)
          </span>
        </h2>
        
        {availableDates.length > 0 ? (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3 mb-4">
              {displayedDates.map((dateStr) => {
                const date = new Date(dateStr);
                const isSelected = selectedDate === dateStr;
                const today = new Date().toISOString().split('T')[0];
                const isToday = dateStr === today;
                const isTomorrow = dateStr === new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                
                let dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
                if (isToday) dayLabel = 'Today';
                else if (isTomorrow) dayLabel = 'Tomorrow';
                
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-2 sm:p-3 rounded-lg border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                      isSelected
                        ? 'bg-red-500 text-white border-red-500 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-red-500 hover:bg-red-50'
                    }`}
                  >
                    <div className="text-xs font-medium truncate">
                      {dayLabel}
                    </div>
                    <div className="text-sm sm:text-base font-bold">
                      {date.getDate()}
                    </div>
                    <div className="text-xs truncate">
                      {date.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {availableDates.length > 14 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAllDates(!showAllDates)}
                  className="text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  {showAllDates 
                    ? 'Show Less Dates' 
                    : `Show All ${availableDates.length} Available Dates`
                  }
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Available Dates
            </h3>
            <p className="text-gray-600">
              No schedules are currently available for this route. Please check back later or contact us for more information.
            </p>
          </div>
        )}
      </div>

      {/* Available Schedules */}
      <div className="bg-white border-2 border-gray-200 rounded-lg shadow-md p-4 sm:p-6 hover:border-red-500 transition-all duration-300">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Available Departures for {formatDate(selectedDate)}
        </h2>

        {filteredSchedules.length > 0 ? (
          <div className="space-y-4">
            {filteredSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 hover:border-red-500 hover:bg-red-50 transition-all duration-300"
              >
                {/* Mobile Layout */}
                <div className="sm:hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-red-500" />
                      <span className="text-lg font-semibold text-gray-800">
                        {formatTime(schedule.departure_time)}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-red-500">
                      {formatCurrency(schedule.price_zar)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-red-500" />
                      <span className="text-sm text-gray-600">
                        {schedule.available_seats} seats
                      </span>
                    </div>
                    <button
                      onClick={() => handleScheduleSelect(schedule)}
                      disabled={schedule.available_seats === 0}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        schedule.available_seats === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {schedule.available_seats === 0 ? 'Sold Out' : 'Select'}
                    </button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-red-500" />
                      <span className="text-lg font-semibold text-gray-800">
                        {formatTime(schedule.departure_time)}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-red-500" />
                      <span className="text-sm text-gray-600">
                        {schedule.available_seats} seats available
                      </span>
                    </div>
                    
                    <div className="text-lg font-bold text-red-500">
                      {formatCurrency(schedule.price_zar)}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleScheduleSelect(schedule)}
                    disabled={schedule.available_seats === 0}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      schedule.available_seats === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {schedule.available_seats === 0 ? 'Sold Out' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : selectedDate ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Departures Available
            </h3>
            <p className="text-gray-600 mb-4">
              No schedules are available for {formatDate(selectedDate)}. This date may have no operating schedules or all seats may be booked.
            </p>
            <p className="text-sm text-gray-500">
              Please select a different date from the available dates above.
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Select a Date
            </h3>
            <p className="text-gray-600">
              Please select a travel date to view available departures.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleSelection;
