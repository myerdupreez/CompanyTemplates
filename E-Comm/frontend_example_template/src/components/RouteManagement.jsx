/**
 * RouteManagement Component
 * 
 * Admin interface for managing bus routes
 * Features:
 * - Add new routes
 * - Edit existing routes
 * - Delete routes
 * - Manage schedules and pricing
 * - Toggle route status
 */

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  MapPin, 
  Clock, 
  DollarSign,
  Calendar,
  Bus,
  ToggleLeft,
  ToggleRight,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminAPI from '../services/adminApi';

const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingRoute, setEditingRoute] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    destination: '',
    distance_km: '',
    duration_hours: '',
    base_price_zar: '',
    route_type: 'one_way',
    is_active: true,
    description: ''
  });

  useEffect(() => {
    fetchRoutes();
    fetchBuses();
  }, []);

  const fetchRoutes = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const routesData = await AdminAPI.getRoutes(token);
      setRoutes(routesData);
    } catch (error) {
      console.error('Failed to fetch routes:', error);
      toast.error('Failed to load routes');
    }
  };

  const fetchBuses = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const busesData = await AdminAPI.getBuses(token);
      setBuses(busesData);
    } catch (error) {
      console.error('Failed to fetch buses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      origin: '',
      destination: '',
      distance_km: '',
      duration_hours: '',
      base_price_zar: '',
      route_type: 'one_way',
      is_active: true,
      description: ''
    });
    setEditingRoute(null);
    setShowAddForm(false);
  };

  const handleAddRoute = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8000/api/routes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          distance_km: parseFloat(formData.distance_km),
          duration_hours: parseFloat(formData.duration_hours),
          base_price_zar: parseFloat(formData.base_price_zar)
        })
      });

      if (response.ok) {
        toast.success('Route added successfully!');
        resetForm();
        fetchRoutes();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add route');
      }
    } catch (error) {
      console.error('Error adding route:', error);
      toast.error('Failed to add route');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRoute = (route) => {
    setFormData({
      name: route.name,
      origin: route.origin,
      destination: route.destination,
      distance_km: route.distance_km.toString(),
      duration_hours: route.duration_hours.toString(),
      base_price_zar: route.base_price_zar.toString(),
      route_type: route.route_type,
      is_active: route.is_active,
      description: route.description || ''
    });
    setEditingRoute(route);
    setShowAddForm(true);
  };

  const handleUpdateRoute = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8000/api/routes/${editingRoute.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          distance_km: parseFloat(formData.distance_km),
          duration_hours: parseFloat(formData.duration_hours),
          base_price_zar: parseFloat(formData.base_price_zar)
        })
      });

      if (response.ok) {
        toast.success('Route updated successfully!');
        resetForm();
        fetchRoutes();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to update route');
      }
    } catch (error) {
      console.error('Error updating route:', error);
      toast.error('Failed to update route');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRoute = async (routeId) => {
    if (!confirm('Are you sure you want to delete this route? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8000/api/routes/${routeId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Route deleted successfully!');
        fetchRoutes();
      } else {
        toast.error('Failed to delete route');
      }
    } catch (error) {
      console.error('Error deleting route:', error);
      toast.error('Failed to delete route');
    }
  };

  const toggleRouteStatus = async (route) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8000/api/routes/${route.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          is_active: !route.is_active
        })
      });

      if (response.ok) {
        toast.success(`Route ${!route.is_active ? 'activated' : 'deactivated'} successfully!`);
        fetchRoutes();
      } else {
        toast.error('Failed to update route status');
      }
    } catch (error) {
      console.error('Error updating route status:', error);
      toast.error('Failed to update route status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading routes...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Route Management</h2>
          <p className="text-gray-600">Manage bus routes, schedules, and pricing</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Route</span>
        </button>
      </div>

      {/* Add/Edit Route Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {editingRoute ? 'Edit Route' : 'Add New Route'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={editingRoute ? handleUpdateRoute : handleAddRoute} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Route Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Route Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                  placeholder="e.g., Pretoria to Phalaborwa"
                  required
                />
              </div>

              {/* Route Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Route Type *
                </label>
                <select
                  name="route_type"
                  value={formData.route_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                  required
                >
                  <option value="one_way">One Way</option>
                  <option value="round_trip">Round Trip</option>
                </select>
              </div>

              {/* Origin */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Origin *
                </label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                  placeholder="e.g., Pretoria"
                  required
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destination *
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                  placeholder="e.g., Phalaborwa"
                  required
                />
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Distance (km) *
                </label>
                <input
                  type="number"
                  name="distance_km"
                  value={formData.distance_km}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                  placeholder="e.g., 450"
                  min="1"
                  step="0.1"
                  required
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (hours) *
                </label>
                <input
                  type="number"
                  name="duration_hours"
                  value={formData.duration_hours}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                  placeholder="e.g., 6.5"
                  min="0.1"
                  step="0.1"
                  required
                />
              </div>

              {/* Base Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Base Price (ZAR) *
                </label>
                <input
                  type="number"
                  name="base_price_zar"
                  value={formData.base_price_zar}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                  placeholder="e.g., 450"
                  min="1"
                  step="0.01"
                  required
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center space-x-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Route Status
                </label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, is_active: !prev.is_active }))}
                  className="flex items-center space-x-2"
                >
                  {formData.is_active ? (
                    <ToggleRight className="w-8 h-8 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                  <span className={`text-sm font-medium ${formData.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                    {formData.is_active ? 'Active' : 'Inactive'}
                  </span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                placeholder="Optional route description or notes..."
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center space-x-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{editingRoute ? 'Update Route' : 'Add Route'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Routes List */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Existing Routes</h3>
          <p className="text-sm text-gray-600 mt-1">{routes.length} routes configured</p>
        </div>

        {routes.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No routes configured</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first bus route</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Route</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {routes.map((route) => (
                  <tr key={route.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{route.name}</div>
                        <div className="text-sm text-gray-500">{route.origin} → {route.destination}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        route.route_type === 'round_trip' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {route.route_type === 'round_trip' ? 'Round Trip' : 'One Way'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {route.distance_km} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {route.duration_hours}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R {route.base_price_zar}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleRouteStatus(route)}
                        className="flex items-center space-x-2"
                      >
                        {route.is_active ? (
                          <ToggleRight className="w-6 h-6 text-green-500" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 text-gray-400" />
                        )}
                        <span className={`text-sm font-medium ${route.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                          {route.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditRoute(route)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRoute(route.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteManagement;
