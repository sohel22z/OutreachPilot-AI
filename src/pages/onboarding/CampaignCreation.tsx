import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle, ChevronRight, ChevronDown, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

interface CampaignCreationProps {
  updateStep: () => void;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preview: string;
  content: string;
}

interface TemplateCardProps {
  template: EmailTemplate;
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all border-2 ${
        isSelected 
          ? 'border-blue-500 dark:border-blue-400' 
          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">{template.subject}</p>
          </div>
          {isSelected && (
            <div className="h-6 w-6 bg-blue-500 text-white rounded-full flex items-center justify-center dark:bg-blue-400">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        <p className="mt-3 text-sm text-gray-500 line-clamp-2 dark:text-gray-400">{template.preview}</p>
      </CardContent>
    </Card>
  );
};

const CampaignCreation: React.FC<CampaignCreationProps> = ({ updateStep }) => {
  const navigate = useNavigate();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('1');
  const [campaignName, setCampaignName] = useState('');
  const [showCustomEditor, setShowCustomEditor] = useState(false);
  const [customTemplate, setCustomTemplate] = useState({
    subject: '',
    body: '',
  });
  
  const templates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Initial Outreach',
      subject: 'Interested in improving your (benefit)?',
      preview: 'Hi {{firstName}}, I noticed that you\'re focused on (observation) and thought you might be interested in...',
      content: 'Full email content would go here',
    },
    {
      id: '2',
      name: 'Follow-up Email',
      subject: 'Following up on my previous email',
      preview: 'Hi {{firstName}}, I wanted to check if you had a chance to review my previous email about...',
      content: 'Full email content would go here',
    },
    {
      id: '3',
      name: 'Case Study Share',
      subject: 'How (Company) achieved (result) with our solution',
      preview: 'Hi {{firstName}}, I thought you might be interested in how one of our clients in your industry achieved...',
      content: 'Full email content would go here',
    }
  ];
  
  const handleContinue = () => {
    updateStep();
    navigate('/onboarding/launch-dashboard');
  };
  
  const handleSkip = () => {
    updateStep();
    navigate('/onboarding/launch-dashboard');
  };
  
  const toggleCustomEditor = () => {
    setShowCustomEditor(!showCustomEditor);
    if (!showCustomEditor) {
      setSelectedTemplateId('');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/50 dark:text-blue-400">
          <Send className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create your first campaign</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Set up your campaign with a name and email template
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Input
            label="Campaign Name"
            placeholder="e.g., Q2 Sales Outreach"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            fullWidth
          />
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select Email Template</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleCustomEditor}
            >
              {showCustomEditor ? 'Use Existing Template' : 'Create Custom Template'}
            </Button>
          </div>
          
          {showCustomEditor ? (
            <div className="border rounded-lg p-4 space-y-4 dark:border-gray-700">
              <Input
                label="Email Subject"
                placeholder="Enter your email subject line"
                value={customTemplate.subject}
                onChange={(e) => setCustomTemplate({ ...customTemplate, subject: e.target.value })}
                fullWidth
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 dark:text-gray-200">
                  Email Body
                </label>
                <textarea
                  className="w-full min-h-[200px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  placeholder="Write your email content here. You can use {{firstName}}, {{company}}, etc. as placeholders."
                  value={customTemplate.body}
                  onChange={(e) => setCustomTemplate({ ...customTemplate, body: e.target.value })}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Use variables like {{firstName}}, {{company}}, {{position}} to personalize your email.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplateId === template.id}
                  onSelect={() => setSelectedTemplateId(template.id)}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mt-6 dark:bg-gray-800/50">
          <div className="flex justify-between items-center cursor-pointer">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Advanced Settings</h3>
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Configure sending schedule, follow-ups, and tracking options
          </p>
        </div>
      </div>
      
      <div className="flex items-center pt-4 space-x-4">
        <Button 
          variant="outline" 
          onClick={handleSkip}
          className="flex-1"
        >
          Skip for now
        </Button>
        <Button 
          variant="primary" 
          onClick={handleContinue}
          className="flex-1"
          disabled={!selectedTemplateId && (!customTemplate.subject || !customTemplate.body)}
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CampaignCreation;