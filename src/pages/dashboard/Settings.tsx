import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Bell, User, Shield, Sliders, Globe, Clock } from 'lucide-react';

const Settings: React.FC = () => {
  const [emailSettings, setEmailSettings] = useState({
    dailyLimit: '100',
    signature: 'Best regards,\nJohn Doe',
    replyTo: 'john@example.com'
  });

  const [notifications, setNotifications] = useState({
    emailOpens: true,
    replies: true,
    campaigns: true,
    dailyDigest: false
  });

  const [timezone, setTimezone] = useState('UTC');

  const handleEmailSettingsChange = (field: string, value: string) => {
    setEmailSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (field: string) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <Button variant="primary">Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Email Settings */}
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <CardTitle className="text-lg">Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Daily Email Limit"
                type="number"
                value={emailSettings.dailyLimit}
                onChange={(e) => handleEmailSettingsChange('dailyLimit', e.target.value)}
                helperText="Maximum number of emails to send per day"
                fullWidth
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Signature
                </label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  value={emailSettings.signature}
                  onChange={(e) => handleEmailSettingsChange('signature', e.target.value)}
                />
              </div>
              <Input
                label="Reply-To Email"
                type="email"
                value={emailSettings.replyTo}
                onChange={(e) => handleEmailSettingsChange('replyTo', e.target.value)}
                fullWidth
              />
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {key.split(/(?=[A-Z])/).join(' ')}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={value}
                        onChange={() => handleNotificationToggle(key)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Settings */}
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Sliders className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <CardTitle className="text-lg">Quick Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
                  <User className="h-5 w-5 mr-3 text-gray-400" />
                  Account Settings
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
                  <Shield className="h-5 w-5 mr-3 text-gray-400" />
                  Privacy & Security
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
                  <Globe className="h-5 w-5 mr-3 text-gray-400" />
                  Language & Region
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
                  <Clock className="h-5 w-5 mr-3 text-gray-400" />
                  Timezone Settings
                </a>
              </nav>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;