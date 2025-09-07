/**
 * Simple RoutesList Component
 * 
 * A simplified version to test basic functionality
 */

import { useState, useEffect } from 'react';

const SimpleRoutesList = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simple fetch without React Query
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/routes/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched routes:', data);
        setRoutes(data.results || data);
        setError(null);
      } catch (err) {
        console.error('Error fetching routes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading routes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Routes
          </h3>
          <p className="text-red-600 mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚌 Falcon Bus Lines
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Discover our routes across South Africa
        </p>
      </div>

      {/* Routes Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {routes.length} available routes
        </p>
      </div>

      {/* Routes Grid */}
      {routes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {route.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    route.route_type === 'round_trip' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {route.route_type === 'round_trip' ? 'Round Trip' : 'One Way'}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm">📍 From: <strong>{route.origin}</strong></span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm">🎯 To: <strong>{route.destination}</strong></span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm">⏱️ Duration: {route.duration_hours}h</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm">📏 Distance: {route.distance_km}km</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-2xl font-bold text-green-600">
                        R{route.base_price_zar}
                      </p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                      Select Route
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Routes Available
            </h3>
            <p className="text-gray-600">
              No bus routes are currently available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleRoutesList;
