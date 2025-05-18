import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

interface GmailIntegrationProps {
  updateStep: () => void;
}

const GmailIntegration: React.FC<GmailIntegrationProps> = ({ updateStep }) => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Simulate OAuth connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsConnected(true);
    } catch (err) {
      setError('Connection to Gmail failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleContinue = () => {
    updateStep();
    navigate('/onboarding/lead-import');
  };
  
  const handleSkip = () => {
    updateStep();
    navigate('/onboarding/lead-import');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/50 dark:text-blue-400">
          <Mail className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Connect your Gmail account</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Connect your Gmail account to track emails and automate your outreach campaigns
        </p>
      </div>
      
      {error && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-md flex items-start text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
          <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {isConnected ? (
        <div className="p-4 mb-4 bg-green-50 border border-green-200 rounded-md flex items-start text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
          <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Gmail connected successfully!</p>
            <p className="mt-1 text-sm">You can now track email opens, clicks, and replies through OutreachCRM.</p>
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-5 space-y-4 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white">What we need access to:</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 p-1 rounded-full mr-3 mt-0.5 dark:bg-blue-900/50 dark:text-blue-400">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
              </span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Read and send emails on your behalf</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">We need this to send automated follow-ups and track responses</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 p-1 rounded-full mr-3 mt-0.5 dark:bg-blue-900/50 dark:text-blue-400">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
              </span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Access your contacts</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">To help you easily add leads from your existing network</p>
              </div>
            </li>
          </ul>
          
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">Your security is our priority:</span> We follow strict data privacy practices and will never read your personal emails.
            </p>
          </div>
        </div>
      )}
      
      <div className="flex items-center pt-4 space-x-4">
        {isConnected ? (
          <Button 
            variant="primary" 
            onClick={handleContinue}
            fullWidth
          >
            Continue to Next Step
          </Button>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="flex-1"
            >
              Skip for now
            </Button>
            <Button 
              variant="primary" 
              onClick={handleConnect}
              isLoading={isConnecting}
              className="flex-1"
            >
              Connect Gmail
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default GmailIntegration;