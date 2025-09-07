/**
 * RoutesList Component
 * 
 * Main component that displays all available bus routes.
 * Features:
 * - Fetches routes from Django backend
 * - Displays routes in a responsive grid
 * - Handles loading and error states
 * - Allows filtering and searching
 */

import { useState, useEffect } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

import { formatCurrency } from '../utils';
import RouteCard from './RouteCard';
import LoadingSpinner from './LoadingSpinner';

const RoutesList = ({ onRouteSelect }) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'one_way', 'round_trip'
  const [sortBy, setSortBy] = useState('price'); // 'price', 'duration', 'name'

  // Fetch routes using native fetch
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/routes/');
        if (!response.ok) {
          throw new Error(`Failed to fetch routes: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched routes data:', data);
        
        // Handle both paginated and direct array responses
        const routesData = data.results || data;
        setRoutes(Array.isArray(routesData) ? routesData : []);
        
      } catch (err) {
        console.error('Error fetching routes:', err);
        setError(err.message);
        toast.error('Failed to load routes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // Handle route selection
  const handleRouteSelect = (route) => {
    if (onRouteSelect) {
      onRouteSelect(route);
    } else {
      toast.success(`Selected route: ${route.origin} → ${route.destination}`);
      // TODO: Navigate to schedule selection
    }
  };

  // Filter and sort routes
  const filteredAndSortedRoutes = routes
    .filter((route) => {
      // Filter by search term
      const matchesSearch = 
        route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by route type
      const matchesType = filterType === 'all' || route.route_type === filterType;

      return matchesSearch && matchesType && route.is_active;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.base_price_zar - b.base_price_zar;
        case 'duration':
          return a.duration_hours - b.duration_hours;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Show error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Unable to Load Routes
          </h3>
          <p className="text-red-600 mb-4">
            {error}
          </p>
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
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-8 animate-slide-in-left">
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
            FALCON
          </h1>
          <div className="text-xl md:text-2xl text-gray-600 font-semibold mb-4">
            Bus Service
          </div>
          {/* Red accent divider */}
          <div className="w-16 h-1 bg-red-500 mx-auto mb-4 rounded-full"></div>
        </div>
        <p className="text-xl md:text-2xl text-gray-700 mb-6 font-light">
          Discover our routes across South Africa
        </p>
        <div className="flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg py-3 px-6 inline-flex border-2 border-transparent hover:border-red-500 transition-all duration-300">
          <MapPin className="w-5 h-5 mr-2 text-red-500" />
          <span className="font-medium">Connecting major cities with comfort and reliability</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-100 border-2 border-gray-200 rounded-lg shadow-md p-6 mb-8 animate-slide-in-right animation-delay-200 hover:border-red-500 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search routes, cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
            />
          </div>

          {/* Route Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none transition-all duration-300"
            >
              <option value="all">All Routes</option>
              <option value="round_trip">Round Trip</option>
              <option value="one_way">One Way</option>
            </select>
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
          >
            <option value="price">Sort by Price</option>
            <option value="duration">Sort by Duration</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {/* Routes Grid */}
      {!loading && (
        <>
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredAndSortedRoutes.length} of {routes.length} routes
            </p>
          </div>

          {/* Routes */}
          {filteredAndSortedRoutes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedRoutes.map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  onSelect={handleRouteSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Routes Found
                </h3>
                <p className="text-gray-600 mb-4">
                  No routes match your current search and filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                  }}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RoutesList;
