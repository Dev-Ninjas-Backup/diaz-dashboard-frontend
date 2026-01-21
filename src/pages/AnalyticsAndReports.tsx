/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from '@/components/Product/ProductCard';
import {
  useGetAnalyticsStatsQuery,
  useGetTopViewedBoatsQuery,
} from '@/redux/features/analytics/analyticsApi';
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
  const {
    data: metricsData,
    isLoading,
    isError,
  } = useGetAnalyticsStatsQuery({});
  const { data: topViewedYachtsData, isLoading: isLoadingYachts } =
    useGetTopViewedBoatsQuery({});

  // Transform API metrics data to match the display format
  const metrics: MetricCard[] = metricsData
    ? [
        {
          id: 1,
          title: 'Total Visitors',
          value: metricsData.totalVisitors?.value?.toLocaleString() || '0',
          change: `${metricsData.totalVisitors?.growth >= 0 ? '+' : ''}${metricsData.totalVisitors?.growth || 0}% from last month`,
          isPositive: (metricsData.totalVisitors?.growth || 0) >= 0,
        },
        {
          id: 2,
          title: 'Page Views',
          value: metricsData.pageViews?.value?.toLocaleString() || '0',
          change: `${metricsData.pageViews?.growth >= 0 ? '+' : ''}${metricsData.pageViews?.growth || 0}% from last month`,
          isPositive: (metricsData.pageViews?.growth || 0) >= 0,
        },
        {
          id: 3,
          title: 'Avg. Session Time',
          value: metricsData.avgSessionTime?.value || '0:00',
          change: `${metricsData.avgSessionTime?.growth >= 0 ? '+' : ''}${metricsData.avgSessionTime?.growth || 0}% from last month`,
          isPositive: (metricsData.avgSessionTime?.growth || 0) >= 0,
        },
      ]
    : DEMO_METRICS;

  // Transform yacht data to match ProductCard expectations
  const transformedYachts =
    topViewedYachtsData?.map((yacht: any) => ({
      id: yacht.id,
      name: yacht.name,
      image: yacht.images?.[0]?.file?.url || '',
      location: `${yacht.city}, ${yacht.state}`,
      brand_make: yacht.make,
      model: yacht.model,
      built_year: yacht.buildYear,
      price: yacht.price,
      views: yacht.pageViewCount || 0,
    })) || [];

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
        {isLoading ? (
          // Loading state for metrics
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </>
        ) : isError ? (
          <div className="col-span-3 text-center text-red-600 py-4">
            Failed to load analytics data
          </div>
        ) : (
          metrics.map((metric) => (
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
          ))
        )}
      </div>
      <div className="p-4 md:p-5 border border-gray-200 rounded-lg mt-4 md:mt-5">
        <h1 className="text-lg md:text-xl">Top Viewed Yachts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mt-4 md:mt-5">
          {isLoadingYachts ? (
            // Loading state for yachts
            <>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
                >
                  <div className="w-full aspect-[4/2.6] bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </>
          ) : transformedYachts.length > 0 ? (
            transformedYachts
              .slice(0, 4)
              .map((data: any) => (
                <ProductCard key={data.id} product={data} isPremium={true} />
              ))
          ) : (
            <div className="col-span-4 text-center text-gray-500 py-8">
              No yacht data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsAndReports;
