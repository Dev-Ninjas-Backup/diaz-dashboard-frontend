import type { EmailSubscription } from '@/redux/features/subscription/subscriptionApi';
import {
  useGetActiveEmailSubscriptionsQuery,
  useGetEmailSubscriptionsQuery,
} from '@/redux/features/subscription/subscriptionApi';
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, Download, Mail, XCircle } from 'lucide-react';
import React, { useState } from 'react';

const EmailSubscriptionList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'active'>('all');

  const {
    data: allSubscriptions,
    isLoading: isLoadingAll,
  } = useGetEmailSubscriptionsQuery(
    { site: 'FLORIDA', page, limit: 10 },
    { skip: filter !== 'all' },
  );

  const {
    data: activeSubscriptions,
    isLoading: isLoadingActive,
  } = useGetActiveEmailSubscriptionsQuery(
    { site: 'FLORIDA', page, limit: 10 },
    { skip: filter !== 'active' },
  );

  const isLoading = filter === 'all' ? isLoadingAll : isLoadingActive;
  const subscriptionsData = filter === 'all' ? allSubscriptions : activeSubscriptions;
  const subscriptions: EmailSubscription[] = subscriptionsData?.data || [];
  const metadata = subscriptionsData?.metadata;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Site', 'Status', 'Subscribed At', 'Unsubscribed At'];
    const csvRows = subscriptions.map((sub) => [
      sub.email,
      sub.site,
      sub.isActive ? 'Active' : 'Inactive',
      sub.subscribedAt ? formatDate(sub.subscribedAt) : '',
      sub.unsubscribedAt ? formatDate(sub.unsubscribedAt) : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map((row: string[]) => row.map((cell: string) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `email-subscriptions-${filter}-${new Date().toISOString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-500">Loading email subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border-b border-gray-200 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Email Subscriptions</h2>
          <p className="text-sm text-gray-500 mt-1">
            {metadata?.total || 0} total subscriptions
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter Tabs */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => {
                setFilter('all');
                setPage(1);
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'all'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilter('active');
                setPage(1);
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'active'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              Active
            </button>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Email List */}
      {subscriptions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions found</h3>
          <p className="text-gray-500">
            {filter === 'active'
              ? 'No active email subscriptions at the moment.'
              : 'No email subscriptions found.'}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Site
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscribed At
                  </th>
                  <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unsubscribed At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.map((subscription) => (
                  <tr
                    key={subscription.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {subscription.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{subscription.site}</span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${subscription.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {subscription.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(subscription.subscribedAt)}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {subscription.unsubscribedAt ? (
                          <>
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(subscription.unsubscribedAt)}</span>
                          </>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {metadata && (
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-6 py-4 border-t border-gray-200 gap-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{((page - 1) * metadata.limit) + 1}</span> to{' '}
                <span className="font-medium">{Math.min(page * metadata.limit, metadata.total)}</span> of{' '}
                <span className="font-medium">{metadata.total}</span> results
              </div>

              <div className="flex items-center gap-2">
                {/* Page Numbers */}
                {metadata.totalPage > 1 && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, metadata.totalPage) }, (_, i) => {
                      let pageNum: number;
                      if (metadata.totalPage <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= metadata.totalPage - 2) {
                        pageNum = metadata.totalPage - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${page === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Arrow Buttons - Always visible */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1 || !metadata}
                    className="p-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(metadata?.totalPage || 1, p + 1))}
                    disabled={page === (metadata?.totalPage || 1) || !metadata}
                    className="p-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmailSubscriptionList;
