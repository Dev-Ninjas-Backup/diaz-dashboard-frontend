import {
  CustomerContactedTable,
  DailyLeadsHeader,
  YachtLeadsTable,
} from '@/components/DailyLeads';
import { Pagination } from '@/components/ListingManagement';
import {
  useGetBoatLeadsQuery,
  useGetCustomerContactedQuery,
} from '@/redux/features/leads/leadsApi';
import type { CustomerContacted } from '@/types/customer-contacted-types';
import type { YachtLead } from '@/types/yacht-leads-types';
import { Download, Filter, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';

type TabType = 'yacht-leads' | 'customer-contacted';

const AllLeads: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('yacht-leads');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [yachtSource, setYachtSource] = useState<string>('');
  const [yachtStatus, setYachtStatus] = useState<string>('');

  const {
    data: customerContactedData,
    isLoading: isLoadingContacts,
    isError: isErrorContacts,
    refetch: refetchCustomerContacted,
  } = useGetCustomerContactedQuery(
    { page, limit },
    {
      pollingInterval: 30000, // Auto-refresh every 30 seconds
    },
  );

  const {
    data: yachtLeadsData,
    isLoading: isLoadingYachtLeads,
    isError: isErrorYachtLeads,
    refetch: refetchYachtLeads,
  } = useGetBoatLeadsQuery(
    {
      page,
      limit,
      source: yachtSource || undefined,
    },
    {
      pollingInterval: 30000, // Auto-refresh every 30 seconds
    },
  );

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      if (activeTab === 'yacht-leads') {
        await refetchYachtLeads();
      } else if (activeTab === 'customer-contacted') {
        await refetchCustomerContacted();
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredYachtLeads =
    yachtLeadsData?.data?.filter((lead: YachtLead) => {
      if (!yachtStatus) return true;
      return lead.status === yachtStatus;
    }) || [];

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

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <DailyLeadsHeader totalLeads={0} />
        <button
          onClick={handleRefreshData}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refresh data"
        >
          <RefreshCw
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
          />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-4">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px" aria-label="Tabs">
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
              FL Yacht Leads
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
                      aria-label="Filter by source"
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
                      aria-label="Filter by status"
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
                  onRefetch={refetchYachtLeads}
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
