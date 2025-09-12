import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, AlertTriangle, Ambulance, Shield, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const EmergencyService = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');
  const [responseTime, setResponseTime] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Emergency Services', number: '8008353069', type: 'emergency' },
    { name: 'Family Doctor', number: '6382396188', type: 'doctor' },
    { name: 'Emergency Contact', number: '9063483689', type: 'family' }
  ]);

  const emergencyTypes = [
    {
      id: 'medical',
      title: 'Medical Emergency',
      description: 'Heart attack, stroke, severe injury',
      icon: Heart,
      color: 'red',
      responseTime: '3-5 min'
    },
    {
      id: 'trauma',
      title: 'Trauma Emergency',
      description: 'Accidents, falls, severe bleeding',
      icon: AlertTriangle,
      color: 'orange',
      responseTime: '5-8 min'
    },
    {
      id: 'ambulance',
      title: 'Ambulance Request',
      description: 'Hospital transport needed',
      icon: Ambulance,
      color: 'blue',
      responseTime: '8-12 min'
    }
  ];

  const handleEmergencyCall = (type) => {
    setEmergencyType(type);
    setEmergencyActive(true);
    setResponseTime(300); // 5 minutes in seconds

    toast.success('Emergency request sent! Help is on the way.');

    // Simulate countdown
    const interval = setInterval(() => {
      setResponseTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          toast.success('Emergency responder has arrived!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (emergencyActive) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-600 text-white p-8 rounded-xl shadow-lg text-center mb-8"
        >
          <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Emergency Response Active</h1>
          <p className="text-red-100 mb-4">Help is on the way to your location</p>

          {responseTime > 0 && (
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
              <h2 className="text-2xl font-bold">ETA: {formatTime(responseTime)}</h2>
              <p className="text-red-100">Emergency responder arrival time</p>
            </div>
          )}

          <button
            onClick={() => setEmergencyActive(false)}
            className="px-6 py-3 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold"
          >
            Cancel Emergency
          </button>
        </motion.div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Live Tracking</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-800">Emergency request received</span>
              <span className="text-sm text-blue-600">✓ Completed</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-800">Nearest responder assigned</span>
              <span className="text-sm text-blue-600">✓ Completed</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <span className="font-medium text-amber-800">Responder en route</span>
              <span className="text-sm text-amber-600">⏳ In Progress</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-600">Arrival at location</span>
              <span className="text-sm text-gray-500">⏳ Pending</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Emergency Services</h1>
        <p className="text-gray-600">24/7 emergency response with 15-minute guarantee</p>
      </div>

      {/* Quick Emergency Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {emergencyTypes.map((emergency, index) => (
          <motion.div
            key={emergency.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${emergency.color === 'red' ? 'bg-red-100' :
                  emergency.color === 'orange' ? 'bg-orange-100' :
                    'bg-blue-100'
                }`}>
                <emergency.icon className={`w-8 h-8 ${emergency.color === 'red' ? 'text-red-600' :
                    emergency.color === 'orange' ? 'text-orange-600' :
                      'text-blue-600'
                  }`} />
              </div>

              <h3 className="font-semibold text-gray-800 mb-2">{emergency.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{emergency.description}</p>
              <p className="text-xs text-gray-500 mb-4">Response: {emergency.responseTime}</p>

              <button
                onClick={() => handleEmergencyCall(emergency.id)}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${emergency.color === 'red' ? 'bg-red-600 hover:bg-red-700 text-white' :
                    emergency.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700 text-white' :
                      'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                Request Help
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.number}</p>
              </div>
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Safety Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Before Emergency:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Keep emergency contacts updated</li>
              <li>• Know your exact location/address</li>
              <li>• Have medical history readily available</li>
              <li>• Keep first aid kit stocked</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">During Emergency:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Stay calm and assess the situation</li>
              <li>• Ensure scene safety before helping</li>
              <li>• Call for professional help immediately</li>
              <li>• Follow first aid instructions carefully</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyService;