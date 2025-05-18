import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Mail, 
  LayoutDashboard, 
  Users, 
  Send, 
  FileText, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  Moon, 
  Sun 
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/ui/Button';

interface DashboardLayoutProps {
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  const navItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Send className="h-5 w-5" />, label: 'Campaigns', path: '/campaigns' },
    { icon: <Users className="h-5 w-5" />, label: 'Leads', path: '/leads' },
    { icon: <FileText className="h-5 w-5" />, label: 'Templates', path: '/templates' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/settings' },
  ];
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-lg text-gray-900 dark:text-white">OutreachCRM</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={onLogout}
            leftIcon={<LogOut className="h-5 w-5" />}
          >
            Log out
          </Button>
        </div>
      </aside>
      
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" 
          onClick={toggleSidebar}
        ></div>
        
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">OutreachCRM</span>
            </div>
            <button 
              onClick={toggleSidebar}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200' 
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={onLogout}
              leftIcon={<LogOut className="h-5 w-5" />}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-2 md:ml-0 text-xl font-semibold text-gray-900 dark:text-white">
                {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <div className="hidden md:block">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                  U
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;