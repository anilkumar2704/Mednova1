import React, { useState } from 'react';
import { Plus, Search, Bell, ShoppingCart, Clock, Pill } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext';
import toast from 'react-hot-toast';

const Medicine = () => {
  const { medicineReminders, addMedicineReminder } = useNotification();
  const [activeTab, setActiveTab] = useState('reminders');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [cart, setCart] = useState([]);

  const [availableMedicines, setAvailableMedicines] = useState([
    {
      id: '1',
      name: 'Aspirin',
      type: 'Pain Relief',
      price: 50,
      description: 'Pain relief and anti-inflammatory',
      inStock: true,
      prescription: false,
      image: 'https://www.shutterstock.com/image-vector/various-meds-pills-capsules-blisters-260nw-1409823341.jpg'
    },
    {
      id: '2',
      name: 'Amoxicillin',
      type: 'Antibiotic',
      price: 100,
      description: 'Broad-spectrum antibiotic',
      inStock: true,
      prescription: true,
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      id: '3',
      name: 'Vitamin D3',
      type: 'Supplement',
      price: 150,
      description: 'Bone health supplement',
      inStock: true,
      prescription: false,
      image: 'https://rubyhall.com/img/services/generalMedicine/gm-sassoon.jpg'
    }
  ]);

  const addToCart = (medicine) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicine.id);
      if (existing) {
        return prev.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
    toast.success(`${medicine.name} added to cart`);
  };

  const renderRemindersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Medicine Reminders</h2>
        <button
          onClick={() => setShowAddReminder(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reminder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medicineReminders.map((reminder, index) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Pill className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{reminder.medicine}</h3>
                  <p className="text-sm text-gray-600">{reminder.dosage}</p>
                </div>
              </div>
              <Bell className="w-5 h-5 text-amber-500" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{reminder.time} • {reminder.frequency}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Edit
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderOrderTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Order Medicines</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search medicines..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {cart.length > 0 && (
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              <span>Cart ({cart.length})</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableMedicines
          .filter(medicine =>
            medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            medicine.type.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((medicine, index) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{medicine.name}</h3>
                    <p className="text-sm text-gray-600">{medicine.type}</p>
                  </div>
                  {medicine.prescription && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                      Prescription
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-3">{medicine.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">₹{medicine.price}</span>
                  <button
                    onClick={() => addToCart(medicine)}
                    disabled={!medicine.inStock}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${medicine.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Medicine Center</h1>
        <p className="text-gray-600">Manage prescriptions, set reminders, and order medicines</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex border-b">
          {[
            { id: 'reminders', label: 'Reminders', icon: Bell },
            { id: 'order', label: 'Order Medicines', icon: ShoppingCart }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'reminders' && renderRemindersTab()}
      {activeTab === 'order' && renderOrderTab()}

      {/* Add Reminder Modal */}
      {showAddReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add Medicine Reminder</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Medicine name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Dosage (e.g., 100mg)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="daily">Daily</option>
                <option value="twice">Twice a day</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddReminder(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowAddReminder(false);
                  }}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medicine;