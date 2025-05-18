import React from 'react';

const Leads: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Leads
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Your leads will appear here once you import them or they engage with your campaigns.
        </p>
      </div>
    </div>
  );
};

export default Leads;