import { useGetSubscriptionDetailsQuery } from '@/redux/features/subscription/subscriptionApi';
import { CheckCircle, DollarSign, Mail, Package, User, X } from 'lucide-react';
import React from 'react';

interface SubscriptionDetailsModalProps {
  subscriptionId: string;
  onClose: () => void;
}

export const SubscriptionDetailsModal: React.FC<
  SubscriptionDetailsModalProps
> = ({ subscriptionId, onClose }) => {
  const { data, isLoading } = useGetSubscriptionDetailsQuery(subscriptionId);

  const subscription = data?.data;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // const formatCurrency = (amount: number, currency: string) => {
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: currency.toUpperCase(),
  //   }).format(amount / 100);
  // };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      TRIALING: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Trialing' },
      ACTIVE: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      PAST_DUE: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        label: 'Past Due',
      },
      CANCELED: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Canceled' },
      EXPIRED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Expired' },
      PENDING: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        label: 'Pending',
      },
      INCOMPLETE: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        label: 'Incomplete',
      },
      INCOMPLETE_EXPIRED: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: 'Incomplete Expired',
      },
      FAILED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' },
      PAID: { bg: 'bg-green-100', text: 'text-green-800', label: 'Paid' },
      UNPAID: { bg: 'bg-red-100', text: 'text-red-800', label: 'Unpaid' },
      VOID: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Void' },
      REFUNDED: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        label: 'Refunded',
      },
      UPCOMING: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Upcoming' },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Subscription Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-500">Loading details...</p>
              </div>
            </div>
          ) : subscription ? (
            <div className="space-y-6">
              {/* Subscription Info */}
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {subscription.plan.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {subscription.plan.description}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(subscription.status).bg} ${getStatusBadge(subscription.status).text}`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {getStatusBadge(subscription.status).label}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Price</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${subscription.plan.price}
                      <span className="text-sm font-normal text-gray-600">
                        /{subscription.plan.billingPeriodMonths}mo
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Started</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(subscription.planStartedAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Ends</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(subscription.planEndedAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    User Information
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={subscription.user.avatarUrl}
                    alt={subscription.user.name}
                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      {subscription.user.name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Mail className="w-4 h-4" />
                      {subscription.user.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan Benefits */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Plan Benefits
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {subscription.plan.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Picture Limit</p>
                    <p className="text-base font-semibold text-gray-900">
                      {subscription.plan.picLimit} photos
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Word Limit</p>
                    <p className="text-base font-semibold text-gray-900">
                      {subscription.plan.wordLimit} words
                    </p>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              {subscription.promoCode && (
                <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-900">
                      Promo Code Applied
                    </h3>
                  </div>
                  <p className="text-sm text-green-700">
                    Code:{' '}
                    <span className="font-semibold">
                      {subscription.promoCode.code}
                    </span>
                  </p>
                </div>
              )}

              {/* Invoices */}
              {/* {subscription.Invoice && subscription.Invoice.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Receipt className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Invoices ({subscription.Invoice.length})
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {subscription.Invoice.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {formatCurrency(invoice.amount, invoice.currency)}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(invoice.paidAt)}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(invoice.status).bg} ${getStatusBadge(invoice.status).text}`}
                        >
                          {getStatusBadge(invoice.status).label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Stripe Info */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Transaction ID</p>
                    <p className="font-mono text-xs text-gray-900 break-all">
                      {subscription.stripeTransactionId}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Subscription ID</p>
                    <p className="font-mono text-xs text-gray-900 break-all">
                      {subscription.stripeSubscriptionId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Subscription not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
