import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, User, Mail, Send, BarChart, ChevronRight, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

interface LaunchDashboardProps {
  updateStep: () => void;
}

const LaunchDashboard: React.FC<LaunchDashboardProps> = ({ updateStep }) => {
  const navigate = useNavigate();
  const [isLaunching, setIsLaunching] = useState(false);
  
  const handleLaunch = async () => {
    setIsLaunching(true);
    
    // Simulate launch process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updateStep();
    navigate('/dashboard');
  };
  
  const setupTasks = [
    { id: 1, name: 'Connect Gmail account', status: 'completed', icon: <Mail className="h-5 w-5" /> },
    { id: 2, name: 'Import leads', status: 'completed', icon: <User className="h-5 w-5" /> },
    { id: 3, name: 'Create a campaign', status: 'completed', icon: <Send className="h-5 w-5" /> },
    { id: 4, name: 'Schedule sending times', status: 'pending', icon: <Calendar className="h-5 w-5" /> },
  ];
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/50 dark:text-blue-400">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">You're all set!</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Your OutreachCRM account is ready to go. Here's what you can expect:
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6 flex items-start">
            <div className="mr-4 mt-1 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Campaign Manager</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Create and manage your outreach campaigns with customizable templates and scheduling.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <div className="mr-4 mt-1 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Lead Management</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Organize and segment your leads with custom tags and pipelines for better targeting.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <div className="mr-4 mt-1 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 dark:bg-green-900/50 dark:text-green-400">
              <BarChart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Analytics Dashboard</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Track your campaign performance with detailed analytics on opens, clicks, and replies.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <div className="mr-4 mt-1 h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Automated Follow-ups</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Set up automated follow-up sequences that trigger based on recipient actions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="border rounded-lg p-5 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 mb-4 dark:text-white">Setup Progress</h3>
        <ul className="space-y-3">
          {setupTasks.map(task => (
            <li key={task.id} className="flex items-center">
              <div className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center mr-3 ${
                task.status === 'completed' 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
              }`}>
                {task.status === 'completed' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  task.icon
                )}
              </div>
              <p className={`text-sm ${
                task.status === 'completed' 
                  ? 'text-gray-500 line-through dark:text-gray-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {task.name}
              </p>
              {task.status === 'completed' && (
                <span className="ml-auto text-xs font-medium text-green-600 dark:text-green-400">Completed</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex items-center pt-4">
        <Button 
          variant="primary" 
          onClick={handleLaunch}
          isLoading={isLaunching}
          fullWidth
        >
          Launch Your Dashboard
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LaunchDashboard;