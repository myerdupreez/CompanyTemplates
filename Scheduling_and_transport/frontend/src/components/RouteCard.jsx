/**
 * RouteCard Component
 * 
 * Displays individual bus route information including:
 * - Origin and destination cities
 * - Travel time and distance
 * - Base pricing
 * - Route type (one-way or round-trip)
 */

import { Clock, MapPin, ArrowRight, Banknote, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency, formatDuration, getRouteTypeText } from '../utils';
import { useState } from 'react';

const RouteCard = ({ route, onSelect }) => {
  const [showDescription, setShowDescription] = useState(false);

  const hasDescription = route.description && route.description.trim() !== '';

  const renderDescription = () => {
    if (!hasDescription) return null;

    // Check if description contains URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = route.description.split(urlRegex);

    return (
      <div className="text-sm text-gray-600 leading-relaxed">
        {parts.map((part, index) => {
          if (part.match(urlRegex)) {
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-600 underline transition-colors duration-300"
              >
                {part.includes('maps.google') || part.includes('goo.gl') ? '📍 View on Google Maps' : part}
              </a>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-500 p-4 sm:p-6 border-2 border-gray-200 hover:border-red-500 transform hover:scale-105 animate-fade-in-up hover:animate-float group">
      {/* Route Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <div className="text-xl sm:text-2xl animate-gentle-bounce">🚌</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-red-500 transition-colors duration-300 leading-tight">{route.name}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform group-hover:scale-110 self-start sm:self-auto ${
          route.route_type === 'round_trip' 
            ? 'bg-red-500 text-white group-hover:bg-red-600' 
            : 'bg-gray-200 text-gray-800 group-hover:bg-red-100 group-hover:text-red-500'
        }`}>
          {getRouteTypeText(route.route_type)}
        </span>
      </div>

      {/* Route Path */}
      <div className="flex flex-col sm:flex-row sm:items-center mb-4 text-gray-600">
        <div className="flex items-center mb-2 sm:mb-0">
          <MapPin className="w-4 h-4 mr-1 text-red-500 flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">{route.origin}</span>
        </div>
        <ArrowRight className="w-5 h-5 mx-0 sm:mx-3 text-gray-400 group-hover:text-red-500 transition-colors duration-300 self-start sm:self-auto hidden sm:block" />
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1 text-red-500 flex-shrink-0 sm:hidden" />
          <span className="font-medium text-sm sm:text-base">{route.destination}</span>
        </div>
      </div>

      {/* Route Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
          <span className="text-xs sm:text-sm">{formatDuration(route.duration_hours)} journey</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="text-xs sm:text-sm">{route.distance_km} km</span>
        </div>
      </div>

      {/* Operating Days */}
      {route.operating_days && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span className="font-medium text-red-700">Operating Days:</span>
            <span className="ml-2 text-red-600">{route.operating_days.replace(/,/g, ', ')}</span>
          </div>
        </div>
      )}

      {/* Route Description */}
      {hasDescription && (
        <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden group-hover:border-red-200 transition-all duration-300">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-red-50 transition-all duration-300"
          >
            <div className="flex items-center text-sm font-medium text-gray-700">
              <Info className="w-4 h-4 mr-2 text-red-500" />
              <span>Pickup & Drop-off Details</span>
            </div>
            {showDescription ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          {showDescription && (
            <div className="px-4 py-3 bg-white border-t border-gray-200 animate-fade-in">
              {renderDescription()}
            </div>
          )}
        </div>
      )}

      {/* Pricing */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center group-hover:animate-pulse">
          <Banknote className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-red-500 animate-gentle-bounce flex-shrink-0" />
          <span className="text-xl sm:text-2xl font-bold text-gray-800 transition-all duration-300 group-hover:text-red-500">
            {formatCurrency(route.base_price_zar)}
          </span>
          <span className="text-gray-500 ml-1 text-xs sm:text-sm">per person</span>
        </div>
        
        <button
          onClick={() => onSelect(route)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-110 hover:shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-white before:translate-x-full before:transition-transform before:duration-300 hover:before:translate-x-0 before:opacity-10 text-sm sm:text-base w-full sm:w-auto"
        >
          <span className="relative z-10">View Schedules</span>
        </button>
      </div>

      {/* Active Status */}
      {route.is_active && (
        <div className="mt-3 flex items-center text-xs sm:text-sm text-red-500">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse flex-shrink-0"></div>
          <span className="animate-fade-in">Available for booking</span>
        </div>
      )}
    </div>
  );
};

export default RouteCard;
