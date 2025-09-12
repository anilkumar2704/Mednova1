import React, { useState } from 'react';
import { Plus, Search, Calendar, Heart, FileText, Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState('records');
  const [showAddRecord, setShowAddRecord] = useState(false);

  const [healthRecords, setHealthRecords] = useState([
    {
      id: '1',
      type: 'Lab Results',
      title: 'Blood Test - Complete Panel',
      date: '2025-01-08',
      doctor: 'Dr. Anvitha',
      status: 'Normal',
      files: ['blood_test_jan2025.pdf']
    },
    {
      id: '2',
      type: 'Prescription',
      title: 'Hypertension Medication',
      date: '2025-01-05',
      doctor: 'Dr. Heshmitha',
      status: 'Active',
      files: ['prescription_jan2025.pdf']
    },
    {
      id: '3',
      type: 'Vaccination',
      title: 'COVID-19 Booster',
      date: '2024-12-15',
      doctor: 'Nurse Jyothi',
      status: 'Completed',
      files: ['vaccine_record.pdf']
    }
  ]);

  const [vitalSigns, setVitalSigns] = useState([
    { date: '2025-01-10', bp: '120/80', heartRate: 72, temperature: 98.6, weight: 165 },
    { date: '2025-01-08', bp: '118/78', heartRate: 68, temperature: 98.4, weight: 164 },
    { date: '2025-01-05', bp: '122/82', heartRate: 75, temperature: 98.8, weight: 166 }
  ]);

  const renderRecordsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Medical Records</h2>
        <button
          onClick={() => setShowAddRecord(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Record</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search medical records..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {healthRecords.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{record.title}</h3>
                      <p className="text-sm text-gray-600">{record.type} • {record.doctor}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {record.date}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === 'Normal' ? 'bg-green-100 text-green-800' :
                            record.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                          }`}>
                          {record.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-green-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVitalsTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Vital Signs Tracking</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', color: 'blue' },
          { label: 'Heart Rate', value: '72', unit: 'bpm', color: 'red' },
          { label: 'Temperature', value: '98.6', unit: '°F', color: 'orange' },
          { label: 'Weight', value: '165', unit: 'lbs', color: 'green' }
        ].map((vital) => (
          <div key={vital.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{vital.label}</span>
              <Heart className={`w-4 h-4 text-${vital.color}-600`} />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-gray-800">{vital.value}</span>
              <span className="text-sm text-gray-500">{vital.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Measurements</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Blood Pressure</th>
                <th className="text-left py-2">Heart Rate</th>
                <th className="text-left py-2">Temperature</th>
                <th className="text-left py-2">Weight</th>
              </tr>
            </thead>
            <tbody>
              {vitalSigns.map((vital, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2">{vital.date}</td>
                  <td className="py-2">{vital.bp} mmHg</td>
                  <td className="py-2">{vital.heartRate} bpm</td>
                  <td className="py-2">{vital.temperature}°F</td>
                  <td className="py-2">{vital.weight} lbs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Records</h1>
        <p className="text-gray-600">Comprehensive health data management and tracking</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex border-b">
          {[
            { id: 'records', label: 'Medical Records', icon: FileText },
            { id: 'vitals', label: 'Vital Signs', icon: Heart }
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

      {activeTab === 'records' && renderRecordsTab()}
      {activeTab === 'vitals' && renderVitalsTab()}

      {/* Add Record Modal */}
      {showAddRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Record</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Record title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select record type</option>
                <option value="lab">Lab Results</option>
                <option value="prescription">Prescription</option>
                <option value="vaccination">Vaccination</option>
                <option value="checkup">Checkup</option>
              </select>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddRecord(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowAddRecord(false);
                  }}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecords;