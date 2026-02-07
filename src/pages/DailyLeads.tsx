import {
  CustomerContactedTable,
  DailyLeadsHeader,
  DailyLeadsTable,
  YachtLeadsTable,
} from '@/components/DailyLeads';
import { Pagination } from '@/components/ListingManagement';
import { useGetDailyLeadsQuery } from '@/redux/features/dailyLeads/dailyLeads';
import {
  useGetBoatLeadsQuery,
  useGetCustomerContactedQuery,
} from '@/redux/features/leads/leadsApi';
import type { CustomerContacted } from '@/types/customer-contacted-types';
import type { YachtLead } from '@/types/yacht-leads-types';
import { Download, Filter } from 'lucide-react';
import React, { useState } from 'react';

type TabType = 'daily-leads-ai' | 'yacht-leads' | 'customer-contacted';

const AllLeads: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('daily-leads-ai');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [yachtSource, setYachtSource] = useState<string>('');
  const [yachtStatus, setYachtStatus] = useState<string>('');

  const { data: leadsData, isLoading, isError } = useGetDailyLeadsQuery();
  const {
    data: customerContactedData,
    isLoading: isLoadingContacts,
    isError: isErrorContacts,
  } = useGetCustomerContactedQuery({ page, limit });

  const {
    data: yachtLeadsData,
    isLoading: isLoadingYachtLeads,
    isError: isErrorYachtLeads,
  } = useGetBoatLeadsQuery({
    page,
    limit,
    source: yachtSource || undefined,
  });

  const filteredYachtLeads =
    yachtLeadsData?.data?.filter((lead: YachtLead) => {
      if (!yachtStatus) return true;
      return lead.status === yachtStatus;
    }) || [];

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

  const handleExportYachtLeadsCSV = () => {
    if (!filteredYachtLeads || filteredYachtLeads.length === 0) return;

    const csvHeaders = [
      'Serial',
      'Name',
      'Email',
      'Phone',
      'Boat Name',
      'Price',
      'Message',
      'Source',
      'Status',
      'Date',
    ];
    const csvRows = filteredYachtLeads.map((lead: YachtLead, index: number) => {
      const boatName =
        lead.source === 'FLORIDA' && lead.floridaLeads.length > 0
          ? lead.floridaLeads[0].boat.name
          : 'N/A';
      const boatPrice =
        lead.source === 'FLORIDA' && lead.floridaLeads.length > 0
          ? lead.floridaLeads[0].boat.price
          : 'N/A';

      return [
        index + 1,
        lead.name,
        lead.email,
        lead.phone,
        boatName,
        boatPrice,
        lead.message,
        lead.source,
        lead.status,
        new Date(lead.createdAt).toLocaleDateString(),
      ];
    });

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map((row: (string | number)[]) =>
        row.map((cell: string | number) => `"${cell}"`).join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `yacht-leads-${new Date().toISOString().split('T')[0]}.csv`,
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportContactsCSV = () => {
    if (!customerContactedData?.data) return;

    const csvHeaders = [
      'Serial',
      'Full Name',
      'Email',
      'Phone',
      'Boat Information',
      'Comments',
      'Date',
    ];
    const csvRows = customerContactedData.data.map(
      (contact: CustomerContacted, index: number) => [
        index + 1,
        contact.fullName,
        contact.email,
        contact.phone,
        contact.boatInformation,
        contact.comments,
        new Date(contact.createdAt).toLocaleDateString(),
      ],
    );

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map((row: (string | number)[]) =>
        row.map((cell: string | number) => `"${cell}"`).join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `customer-contacted-${new Date().toISOString().split('T')[0]}.csv`,
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
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
      <DailyLeadsHeader totalLeads={leadsData?.total_leads || 0} />

      <div className="bg-white rounded-lg shadow mb-4">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('daily-leads-ai')}
              className={`
                flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2
                ${
                  activeTab === 'daily-leads-ai'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
              Daily Leads - AI
            </button>
            <button
              onClick={() => setActiveTab('yacht-leads')}
              className={`
                flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2
                ${
                  activeTab === 'yacht-leads'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15l3-9h12l3 9M5 21h14M6 18h12"
                />
              </svg>
              Yacht Leads
            </button>
            <button
              onClick={() => setActiveTab('customer-contacted')}
              className={`
                flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2
                ${
                  activeTab === 'customer-contacted'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Customer Contacted
            </button>
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {activeTab === 'daily-leads-ai' && (
          <>
            <div className="p-4 border-b border-gray-200 flex justify-end">
              <button
                onClick={handleExportCSV}
                disabled={!leadsData?.leads || leadsData.leads.length === 0}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
            <DailyLeadsTable leads={leadsData?.leads || []} />
          </>
        )}
        {activeTab === 'yacht-leads' && (
          <>
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-wrap gap-3 items-center">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <div className="flex gap-3">
                    <select
                      value={yachtSource}
                      onChange={(e) => {
                        setYachtSource(e.target.value);
                        setPage(1);
                      }}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Sources</option>
                      <option value="FLORIDA">Florida</option>
                      <option value="JUPITER">Jupiter</option>
                    </select>
                    <select
                      value={yachtStatus}
                      onChange={(e) => {
                        setYachtStatus(e.target.value);
                        setPage(1);
                      }}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Status</option>
                      <option value="Not Contacted">Not Contacted</option>
                      <option value="Contacted">Contacted</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleExportYachtLeadsCSV}
                  disabled={
                    !filteredYachtLeads || filteredYachtLeads.length === 0
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>

            {isLoadingYachtLeads && (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading yacht leads...</p>
              </div>
            )}

            {isErrorYachtLeads && (
              <div className="p-6 text-center text-red-600">
                <p>Error loading yacht leads. Please try again.</p>
              </div>
            )}

            {!isLoadingYachtLeads && !isErrorYachtLeads && (
              <>
                <YachtLeadsTable
                  leads={filteredYachtLeads}
                  currentPage={page}
                  limit={limit}
                />

                {yachtLeadsData?.metadata && (
                  <Pagination
                    currentPage={page}
                    totalPages={yachtLeadsData.metadata.totalPage}
                    onPageChange={handlePageChange}
                    hasNextPage={page < yachtLeadsData.metadata.totalPage}
                    hasPrevPage={page > 1}
                    limit={limit}
                    onLimitChange={handleLimitChange}
                    totalItems={yachtLeadsData.metadata.total}
                  />
                )}
              </>
            )}
          </>
        )}
        {activeTab === 'customer-contacted' && (
          <>
            <div className="p-4 border-b border-gray-200 flex justify-end">
              <button
                onClick={handleExportContactsCSV}
                disabled={
                  !customerContactedData?.data ||
                  customerContactedData.data.length === 0
                }
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {isLoadingContacts && (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading contacts...</p>
              </div>
            )}

            {isErrorContacts && (
              <div className="p-6 text-center text-red-600">
                <p>Error loading customer contacts. Please try again.</p>
              </div>
            )}

            {!isLoadingContacts && !isErrorContacts && (
              <>
                <CustomerContactedTable
                  contacts={customerContactedData?.data || []}
                  currentPage={page}
                  limit={limit}
                />

                {customerContactedData?.metadata && (
                  <Pagination
                    currentPage={page}
                    totalPages={customerContactedData.metadata.totalPage}
                    onPageChange={handlePageChange}
                    hasNextPage={
                      page < customerContactedData.metadata.totalPage
                    }
                    hasPrevPage={page > 1}
                    limit={limit}
                    onLimitChange={handleLimitChange}
                    totalItems={customerContactedData.metadata.total}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllLeads;
