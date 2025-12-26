import { DailyLeadsHeader, DailyLeadsTable } from '@/components/DailyLeads';
import { useGetDailyLeadsQuery } from '@/redux/features/dailyLeads/dailyLeads';
import React from 'react';

const DailyLeads: React.FC = () => {
  const { data: leadsData, isLoading, isError } = useGetDailyLeadsQuery();

  const handleExportCSV = () => {
    if (!leadsData?.leads) return;

    const csvHeaders = ['Serial', 'Product Name', 'Name', 'Email'];
    const csvRows = leadsData.leads.map((lead, index) => [
      index + 1,
      lead.product || 'N/A',
      lead.name || 'Anonymous',
      lead.email || 'Anonymous',
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `daily-leads-${new Date().toISOString().split('T')[0]}.csv`,
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading daily leads...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading daily leads
              </h3>
              <p className="mt-1 text-sm text-red-700">
                There was an error fetching the daily leads. Please try again
                later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <DailyLeadsHeader
        totalLeads={leadsData?.total_leads || 0}
        onExportCSV={handleExportCSV}
      />

      <div className="bg-white rounded-lg shadow">
        <DailyLeadsTable leads={leadsData?.leads || []} />
      </div>
    </div>
  );
};

export default DailyLeads;
