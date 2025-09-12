import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Heart, Clock, TrendingUp, MapPin, User } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeNurses: 24,
    todayBookings: 12,
    healthScore: 85,
    avgResponseTime: '8 min'
  });

  const [recentBookings, setRecentBookings] = useState([
    {
      id: '1',
      nurseName: 'Sri Anvitha',
      service: 'General Care',
      status: 'Completed',
      date: '2025-01-10',
      rating: 4.8
    },
    {
      id: '2',
      nurseName: 'Heshmitha',
      service: 'Wound Care',
      status: 'In Progress',
      date: '2025-01-10',
      rating: 4.9
    }
  ]);

  const [nearbyNurses, setNearbyNurses] = useState([
    {
      id: '1',
      name: 'Dheeraj',
      specialty: 'ICU Specialist',
      distance: '0.8 km',
      rating: 4.9,
      availability: 'Available',
      estimatedTime: '5 min'
    },
    {
      id: '2',
      name: 'Dravid',
      specialty: 'Pediatric Care',
      distance: '1.2 km',
      rating: 4.7,
      availability: 'Available',
      estimatedTime: '8 min'
    }
  ]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600">Your health dashboard and nurse booking center</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Users, label: 'Active Nurses', value: stats.activeNurses, color: 'blue' },
          { icon: Calendar, label: 'Today Bookings', value: stats.todayBookings, color: 'green' },
          { icon: Heart, label: 'Health Records', value: `${stats.healthScore}%`, color: 'red' },
          { icon: Clock, label: 'Avg Response', value: stats.avgResponseTime, color: 'amber' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">{booking.nurseName}</h3>
                  <p className="text-sm text-gray-600">{booking.service}</p>
                  <p className="text-xs text-gray-500">{booking.date}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                    }`}>
                    {booking.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">⭐ {booking.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Nearby Nurses */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Nearby Nurses</h2>
          <div className="space-y-4">
            {nearbyNurses.map((nurse) => (
              <div key={nurse.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{nurse.name}</h3>
                    <p className="text-sm text-gray-600">{nurse.specialty}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{nurse.distance}</span>
                      <span>•</span>
                      <span>⭐ {nurse.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {nurse.availability}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{nurse.estimatedTime}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Book Nurse', color: 'blue', path: '/booking' },
            { label: 'Emergency', color: 'red', path: '/emergency' },
            { label: 'First Aid', color: 'green', path: '/first-aid' },
            { label: 'AI Chat', color: 'purple', path: '/chat' }
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className={`p-4 rounded-lg text-center transition-all duration-200 ${action.color === 'blue' ? 'bg-blue-50 hover:bg-blue-100 border border-blue-200' :
                action.color === 'red' ? 'bg-red-50 hover:bg-red-100 border border-red-200' :
                  action.color === 'green' ? 'bg-green-50 hover:bg-green-100 border border-green-200' :
                    'bg-purple-50 hover:bg-purple-100 border border-purple-200'
                }`}
            >
              <span className={`font-medium ${action.color === 'blue' ? 'text-blue-700' :
                action.color === 'red' ? 'text-red-700' :
                  action.color === 'green' ? 'text-green-700' :
                    'text-purple-700'
                }`}>{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;