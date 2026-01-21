import type {
  CreateSubscriptionPlanPayload,
  SubscriptionPlan,
} from '@/redux/features/subscription/subscriptionApi';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface EditPlanFormProps {
  plan: SubscriptionPlan;
  onSubmit: (id: string, plan: CreateSubscriptionPlanPayload) => void;
  onCancel: () => void;
}

const PLAN_TYPES = ['GOLD', 'PLATINUM', 'DIAMOND'];

const EditPlanForm: React.FC<EditPlanFormProps> = ({ plan, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateSubscriptionPlanPayload>({
    title: plan.title,
    planType: plan.planType,
    description: plan.description,
    benefits: plan.benefits.length > 0 ? plan.benefits : [''],
    picLimit: plan.picLimit,
    wordLimit: plan.wordLimit,
    isBest: plan.isBest,
    isActive: plan.isActive,
    price: plan.price,
    currency: plan.currency,
    billingPeriodMonths: plan.billingPeriodMonths,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateSubscriptionPlanPayload, string>>>(
    {},
  );

  useEffect(() => {
    setFormData({
      title: plan.title,
      planType: plan.planType,
      description: plan.description,
      benefits: plan.benefits.length > 0 ? plan.benefits : [''],
      picLimit: plan.picLimit,
      wordLimit: plan.wordLimit,
      isBest: plan.isBest,
      isActive: plan.isActive,
      price: plan.price,
      currency: plan.currency,
      billingPeriodMonths: plan.billingPeriodMonths,
    });
  }, [plan]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'benefits') {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
            ? parseFloat(value) || 0
            : value,
    }));

    if (errors[name as keyof CreateSubscriptionPlanPayload]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData((prev) => ({ ...prev, benefits: newBenefits }));
  };

  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ''],
    }));
  };

  const removeBenefit = (index: number) => {
    if (formData.benefits.length > 1) {
      const newBenefits = formData.benefits.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, benefits: newBenefits }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateSubscriptionPlanPayload, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (formData.picLimit <= 0) {
      newErrors.picLimit = 'Picture limit must be greater than 0';
    }
    if (formData.wordLimit <= 0) {
      newErrors.wordLimit = 'Word limit must be greater than 0';
    }
    if (formData.benefits.some((b) => !b.trim())) {
      newErrors.benefits = 'All benefits must be filled';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const filteredBenefits = formData.benefits.filter((b) => b.trim());
      onSubmit(plan.id, { ...formData, benefits: filteredBenefits });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Edit Subscription Plan</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Gold Package"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Plan Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Type <span className="text-red-500">*</span>
            </label>
            <select
              name="planType"
              value={formData.planType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {PLAN_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe the plan..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Price and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency <span className="text-red-500">*</span>
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </select>
            </div>
          </div>

          {/* Limits */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Picture Limit <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="picLimit"
                value={formData.picLimit}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.picLimit ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.picLimit && (
                <p className="mt-1 text-sm text-red-500">{errors.picLimit}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Word Limit <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="wordLimit"
                value={formData.wordLimit}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.wordLimit ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.wordLimit && (
                <p className="mt-1 text-sm text-red-500">{errors.wordLimit}</p>
              )}
            </div>
          </div>

          {/* Billing Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Billing Period (Months) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="billingPeriodMonths"
              value={formData.billingPeriodMonths}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benefits <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Benefit ${index + 1}`}
                  />
                  {formData.benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addBenefit}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Benefit
              </button>
            </div>
            {errors.benefits && (
              <p className="mt-1 text-sm text-red-500">{errors.benefits}</p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isBest"
                checked={formData.isBest}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Mark as Best Plan</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlanForm;
