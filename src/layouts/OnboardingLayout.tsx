import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';

interface OnboardingLayoutProps {
  currentStep: number;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ currentStep }) => {
  const steps = [
    { label: 'Connect Gmail', path: '/onboarding/gmail-integration' },
    { label: 'Import Leads', path: '/onboarding/lead-import' },
    { label: 'Create Campaign', path: '/onboarding/campaign-creation' },
    { label: 'Launch', path: '/onboarding/launch-dashboard' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-xl text-gray-900 dark:text-white">OutreachCRM</span>
        </div>
        <ThemeToggle />
      </header>
      
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to OutreachCRM</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Let's get you set up in just a few steps
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.path}>
                {/* Step indicator */}
                <div className="relative">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2
                    ${index <= currentStep 
                      ? 'border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500' 
                      : 'border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400'}
                  `}>
                    {index < currentStep ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-600 dark:text-gray-400">
                    {step.label}
                  </span>
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    index < currentStep ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Back button for steps after the first one */}
        {currentStep > 0 && (
          <div className="mb-6">
            <Link 
              to={steps[currentStep - 1].path} 
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to {steps[currentStep - 1].label}
            </Link>
          </div>
        )}
        
        <main className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OnboardingLayout;