import {
  EmailSubscriptionList,
  PlanList,
} from '@/components/SubscriptionManagement';
import React, { useState } from 'react';

type Tab = 'plan' | 'email';

const SubscriptionManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('plan');

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Subscription Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage subscriptions and subscription plans
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 p-2 bg-gray-100 rounded-full max-w-full sm:max-w-max overflow-x-auto">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${activeTab === 'plan'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
          >
             Plan
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${activeTab === 'email'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
          >
             Email
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'plan' ? <PlanList /> : <EmailSubscriptionList />}
    </div>
  );
};

export default SubscriptionManagement;