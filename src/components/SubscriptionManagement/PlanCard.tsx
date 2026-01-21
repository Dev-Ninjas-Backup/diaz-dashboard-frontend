import type { SubscriptionPlan } from '@/redux/features/subscription/subscriptionApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Check, Image, FileText, Calendar } from 'lucide-react';

interface PlanCardProps {
  plan: SubscriptionPlan;
  onEdit: (plan: SubscriptionPlan) => void;
  onDelete: (id: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onEdit, onDelete }) => {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPlanTypeColor = (planType: string) => {
    switch (planType.toUpperCase()) {
      case 'GOLD':
        return 'bg-yellow-100 text-yellow-800';
      case 'PLATINUM':
        return 'bg-gray-100 text-gray-800';
      case 'DIAMOND':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col border border-gray-200">
      {/* Most Popular Badge */}
      {plan.isBest && (
        <div className="absolute top-0 right-0 z-20 w-0 h-0">
          <div className="absolute top-5 right-[-35px] w-[180px] bg-green-500 text-white text-xs font-bold py-2 shadow-lg transform rotate-45 text-center">
            Most Popular
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
          {plan.description && (
            <p className="text-sm text-gray-600">{plan.description}</p>
          )}
        </div>

        {/* Price and Plan Type */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-1">
            <div className="text-3xl font-bold text-teal-600">
              {formatPrice(plan.price, plan.currency)}
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPlanTypeColor(
                plan.planType,
              )}`}
            >
              {plan.planType}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            per {plan.billingPeriodMonths === 1 ? 'month' : `${plan.billingPeriodMonths} months`}
          </div>
        </div>

        {/* Limits */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Image className="w-4 h-4 text-teal-600" />
              <span>
                <strong>{plan.picLimit}</strong> Pics
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FileText className="w-4 h-4 text-teal-600" />
              <span>
                <strong>{plan.wordLimit.toLocaleString()}</strong> Words
              </span>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="mb-4">
          <ul className="space-y-2">
            {plan.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Info */}
        <div className="mb-4 pb-4 border-b border-gray-200 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Created: {formatDate(plan.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Updated: {formatDate(plan.updatedAt)}</span>
          </div>
        </div>

        {/* Actions - At the end of card */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                plan.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {plan.isActive ? 'Active' : 'Inactive'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(plan)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Edit plan"
              >
                <FaEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(plan.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Delete plan"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
