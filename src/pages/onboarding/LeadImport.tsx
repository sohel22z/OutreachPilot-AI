import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Upload, FileSpreadsheet, Plus, PlusCircle, CheckCircle, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface LeadImportProps {
  updateStep: () => void;
}

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
}

const LeadImport: React.FC<LeadImportProps> = ({ updateStep }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [importedLeads, setImportedLeads] = useState<Lead[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLead, setNewLead] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    position: '',
  });
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }
    
    setIsImporting(true);
    
    // Simulate file processing
    setTimeout(() => {
      // Mock data
      const mockLeads: Lead[] = [
        { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', company: 'Acme Inc', position: 'CEO' },
        { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', company: 'Globex Corp', position: 'Marketing Manager' },
        { id: '3', firstName: 'Robert', lastName: 'Johnson', email: 'robert.j@example.com', company: 'Initech', position: 'Sales Director' },
      ];
      
      setImportedLeads(mockLeads);
      setIsImporting(false);
    }, 1500);
  };
  
  const handleAddNewLead = () => {
    if (!newLead.firstName || !newLead.email) {
      return;
    }
    
    const newLeadWithId: Lead = {
      ...newLead,
      id: Date.now().toString(),
    };
    
    setImportedLeads([...importedLeads, newLeadWithId]);
    setNewLead({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      position: '',
    });
    setShowAddForm(false);
  };
  
  const handleRemoveLead = (id: string) => {
    setImportedLeads(importedLeads.filter(lead => lead.id !== id));
  };
  
  const handleContinue = () => {
    updateStep();
    navigate('/onboarding/campaign-creation');
  };
  
  const handleSkip = () => {
    updateStep();
    navigate('/onboarding/campaign-creation');
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900/50 dark:text-blue-400">
          <Users className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Import your leads</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Upload your contacts or add them manually to start your outreach campaigns
        </p>
      </div>
      
      {importedLeads.length === 0 ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mx-auto flex flex-col items-center max-w-md">
            <Upload className="h-10 w-10 text-gray-400 mb-4 dark:text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Drag and drop your CSV file here</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Or click the button below to browse your files
            </p>
            <div className="mt-6 flex gap-4">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileInputChange}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                leftIcon={<FileSpreadsheet className="h-4 w-4" />}
              >
                Upload CSV
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(true)}
                leftIcon={<Plus className="h-4 w-4" />}
              >
                Add Manually
              </Button>
            </div>
            <a 
              href="#" 
              className="mt-4 text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={(e) => e.preventDefault()}
            >
              Download sample CSV template
            </a>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden dark:border-gray-700">
          <div className="bg-gray-50 px-6 py-3 border-b dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">Imported Leads ({importedLeads.length})</h3>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<PlusCircle className="h-4 w-4" />}
                onClick={() => setShowAddForm(true)}
              >
                Add More
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Position</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {importedLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.firstName} {lead.lastName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{lead.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{lead.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => handleRemoveLead(lead.id)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {showAddForm && (
        <div className="border rounded-lg p-4 space-y-4 mt-4 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-900 dark:text-white">Add New Lead</h3>
            <button 
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              onClick={() => setShowAddForm(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              value={newLead.firstName}
              onChange={(e) => setNewLead({ ...newLead, firstName: e.target.value })}
              required
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={newLead.lastName}
              onChange={(e) => setNewLead({ ...newLead, lastName: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={newLead.email}
              onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
              required
            />
            <Input
              label="Company"
              placeholder="Acme Inc"
              value={newLead.company}
              onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
            />
            <Input
              label="Position"
              placeholder="CEO"
              value={newLead.position}
              onChange={(e) => setNewLead({ ...newLead, position: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleAddNewLead}
            >
              Add Lead
            </Button>
          </div>
        </div>
      )}
      
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
          disabled={isImporting}
        >
          {importedLeads.length > 0 ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Continue with {importedLeads.length} Lead{importedLeads.length !== 1 ? 's' : ''}
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </div>
  );
};

export default LeadImport;