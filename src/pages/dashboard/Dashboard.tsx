import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { BarChart, LineChart, PieChart, Users, Mail, Send, CheckCircle, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const recentCampaigns = [
    { id: 1, name: 'B2B SaaS Outreach', sent: 120, opened: 68, replied: 23, status: 'Active' },
    { id: 2, name: 'Follow-up Sequence', sent: 85, opened: 54, replied: 18, status: 'Active' },
    { id: 3, name: 'Product Launch', sent: 250, opened: 175, replied: 42, status: 'Completed' },
  ];
  
  const upcomingTasks = [
    { id: 1, name: 'Review campaign analytics', due: 'Today' },
    { id: 2, name: 'Follow up with 5 new leads', due: 'Tomorrow' },
    { id: 3, name: 'Update email templates', due: 'In 2 days' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">1,284</p>
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">+8% from last month</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Emails Sent</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">8,532</p>
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">+12% from last month</p>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                <Send className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Open Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">42.8%</p>
                <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">-2% from last month</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400">
                <Mail className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Response Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">18.3%</p>
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">+5% from last month</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center text-gray-400 dark:text-gray-500">
              <LineChart className="h-12 w-12 mr-3" />
              <p className="text-sm">Campaign performance chart would appear here</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Email Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-center justify-center text-gray-400 dark:text-gray-500">
                <PieChart className="h-10 w-10 mr-3" />
                <p className="text-sm">Email engagement chart would appear here</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingTasks.map(task => (
                  <li key={task.id} className="py-3 flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0 dark:text-gray-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {task.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Due: {task.due}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Campaign Name</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Sent</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Opened</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Replied</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentCampaigns.map(campaign => (
                  <tr key={campaign.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{campaign.sent}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{campaign.opened} ({Math.round(campaign.opened / campaign.sent * 100)}%)</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{campaign.replied} ({Math.round(campaign.replied / campaign.sent * 100)}%)</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;