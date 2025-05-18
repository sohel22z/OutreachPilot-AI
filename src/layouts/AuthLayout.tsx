import React from 'react';
import { Outlet } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';

const AuthLayout: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-xl text-gray-900 dark:text-white">OutreachCRM</span>
        </div>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <Outlet />
      </main>
      
      <footer className="py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} OutreachCRM. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;