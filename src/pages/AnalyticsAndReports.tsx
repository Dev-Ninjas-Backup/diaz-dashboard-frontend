import { demodata } from '@/assets/demo/demodata';
import ProductCard from '@/components/Product/ProductCard';
import React from 'react';

interface MetricCard {
  id: number;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const DEMO_METRICS: MetricCard[] = [
  {
    id: 1,
    title: 'Total Visitors',
    value: '24,891',
    change: '+12.5% from last month',
    isPositive: true,
  },
  {
    id: 2,
    title: 'Page Views',
    value: '145,672',
    change: '+8.2% from last month',
    isPositive: true,
  },
  {
    id: 3,
    title: 'Avg. Session Time',
    value: '4:32',
    change: '+15% from last month',
    isPositive: true,
  },
];

const AnalyticsAndReports: React.FC = () => {
  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Analytics & Reports
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track performance and insights
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {DEMO_METRICS.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Title */}
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              {metric.title}
            </h3>

            {/* Value */}
            <div className="text-3xl font-semibold text-gray-900 mb-3">
              {metric.value}
            </div>

            {/* Change Indicator */}
            <div
              className={`text-sm font-medium ${
                metric.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {metric.change}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 md:p-5 border border-gray-200 rounded-lg mt-4 md:mt-5">
        <h1 className="text-lg md:text-xl">Top Viewed Yachts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mt-4 md:mt-5">
          {demodata.slice(0, 4).map((data, index) => (
            <ProductCard key={index} product={data} isPremium={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsAndReports;
