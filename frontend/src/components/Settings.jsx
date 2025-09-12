import React, { useState } from 'react';
import { Bell, Shield, Globe, Moon, Volume2, Smartphone, Database, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: true,
      sms: false,
      medicineReminders: true,
      appointmentReminders: true,
      emergencyAlerts: true
    },
    privacy: {
      shareLocation: true,
      dataAnalytics: false,
      thirdPartySharing: false,
      publicProfile: false
    },
    preferences: {
      language: 'en',
      timezone: 'America/New_York',
      theme: 'light',
      voiceAssistant: true,
      autoBooking: false
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
    toast.success('Setting updated successfully');
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-300'
        }`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'translate-x-7' : 'translate-x-1'
        }`} />
    </button>
  );

  const renderNotificationSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
      </div>

      <div className="space-y-4">
        {[
          { key: 'push', label: 'Push Notifications', description: 'Receive notifications on your device' },
          { key: 'email', label: 'Email Notifications', description: 'Get updates via email' },
          { key: 'sms', label: 'SMS Alerts', description: 'Text message notifications' },
          { key: 'medicineReminders', label: 'Medicine Reminders', description: 'Medication schedule alerts' },
          { key: 'appointmentReminders', label: 'Appointment Reminders', description: 'Upcoming appointment notifications' },
          { key: 'emergencyAlerts', label: 'Emergency Alerts', description: 'Critical health emergency notifications' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">{item.label}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <ToggleSwitch
              enabled={settings.notifications[item.key]}
              onChange={(value) => handleSettingChange('notifications', item.key, value)}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderPrivacySettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-800">Privacy & Security</h2>
      </div>

      <div className="space-y-4">
        {[
          { key: 'shareLocation', label: 'Share Location', description: 'Allow location sharing for nearby nurse finding' },
          { key: 'dataAnalytics', label: 'Data Analytics', description: 'Help improve our services with usage data' },
          { key: 'thirdPartySharing', label: 'Third-party Sharing', description: 'Share data with partner healthcare providers' },
          { key: 'publicProfile', label: 'Public Profile', description: 'Make your health achievements visible to others' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">{item.label}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <ToggleSwitch
              enabled={settings.privacy[item.key]}
              onChange={(value) => handleSettingChange('privacy', item.key, value)}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderPreferencesSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Globe className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.preferences.language}
            onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.preferences.timezone}
            onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-800">Voice Assistant</h3>
            <p className="text-sm text-gray-600">Enable voice commands and responses</p>
          </div>
          <ToggleSwitch
            enabled={settings.preferences.voiceAssistant}
            onChange={(value) => handleSettingChange('preferences', 'voiceAssistant', value)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-800">Auto-booking</h3>
            <p className="text-sm text-gray-600">Automatically book nearest available nurse in emergencies</p>
          </div>
          <ToggleSwitch
            enabled={settings.preferences.autoBooking}
            onChange={(value) => handleSettingChange('preferences', 'autoBooking', value)}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Customize your MediCare Connect experience</p>
      </div>

      <div className="space-y-8">
        {renderNotificationSettings()}
        {renderPrivacySettings()}
        {renderPreferencesSettings()}

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Database className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Data Management</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-800">Export Health Data</h3>
              <p className="text-sm text-gray-600">Download all your health records and data</p>
            </button>

            <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-800">Import Health Records</h3>
              <p className="text-sm text-gray-600">Upload medical records from other providers</p>
            </button>

            <button className="w-full text-left p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <h3 className="font-medium text-red-800">Delete Account</h3>
              <p className="text-sm text-red-600">Permanently remove your account and data</p>
            </button>
          </div>
        </motion.div>

        {/* Help & Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Help & Support</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-800">Contact Support</h3>
              <p className="text-sm text-gray-600">Get help from our support team</p>
            </button>

            <button className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-800">FAQ</h3>
              <p className="text-sm text-gray-600">Frequently asked questions</p>
            </button>

            <button className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-800">Terms & Privacy</h3>
              <p className="text-sm text-gray-600">Review our terms and privacy policy</p>
            </button>

            <button className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-800">About</h3>
              <p className="text-sm text-gray-600">App version and information</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;