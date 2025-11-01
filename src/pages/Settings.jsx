import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Mail, Save } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    email: 'demo@investoriq.com',
    name: 'Demo User',
    notifications: true,
    reportFrequency: 'weekly',
    theme: 'light',
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-bg-light dark:bg-transparent">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary mb-1">Settings</h1>
          <p className="text-text-secondary dark:text-gray-300 text-sm">Manage your account preferences and notifications</p>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-blue/5 flex items-center justify-center">
                <User className="w-5 h-5 text-accent-blue" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-warning/5 flex items-center justify-center">
                <Bell className="w-5 h-5 text-warning" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary dark:text-text-primary">Email Notifications</p>
                  <p className="text-xs text-text-secondary dark:text-gray-300">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleChange('notifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1.5">
                  Report Frequency
                </label>
                <select
                  value={settings.reportFrequency}
                  onChange={(e) => handleChange('reportFrequency', e.target.value)}
                  className="input-field appearance-none cursor-pointer"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-success/5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary">Security</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 border border-gray-200 dark:border-white/[0.12] text-text-primary dark:text-text-primary font-medium rounded-md hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="accent-button flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

