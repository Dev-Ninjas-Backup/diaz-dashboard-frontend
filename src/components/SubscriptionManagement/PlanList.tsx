/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanMutation,
  useGetSubscriptionPlansQuery,
  useUpdateSubscriptionPlanMutation,
} from '@/redux/features/subscription/subscriptionApi';
import type { SubscriptionPlan } from '@/redux/features/subscription/subscriptionApi';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import CreatePlanForm from './CreatePlanForm';
import EditPlanForm from './EditPlanForm';
import PlanCard from './PlanCard';
import { Link } from 'react-router-dom';

const PlanList: React.FC = () => {
  const { data: plans = [], isLoading } = useGetSubscriptionPlansQuery();
  const [createPlan] = useCreateSubscriptionPlanMutation();
  const [updatePlan] = useUpdateSubscriptionPlanMutation();
  const [deletePlan] = useDeleteSubscriptionPlanMutation();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  const handleCreatePlan = async (planData: Parameters<typeof createPlan>[0]) => {
    try {
      await createPlan(planData).unwrap();
      Swal.fire({
        title: 'Success!',
        text: 'Subscription plan created successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setShowCreateForm(false);
    } catch (error: any) {
      Swal.fire({
        title: 'Error!',
        text: error?.data?.message || 'Failed to create subscription plan',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleUpdatePlan = async (
    id: string,
    planData: Parameters<typeof updatePlan>[0]['plan'],
  ) => {
    try {
      await updatePlan({ id, plan: planData }).unwrap();
      Swal.fire({
        title: 'Success!',
        text: 'Subscription plan updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setEditingPlan(null);
    } catch (error: any) {
      Swal.fire({
        title: 'Error!',
        text: error?.data?.message || 'Failed to update subscription plan',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDeletePlan = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await deletePlan(id).unwrap();
        Swal.fire({
          title: 'Deleted!',
          text: 'Subscription plan has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error: any) {
        Swal.fire({
          title: 'Error!',
          text: error?.data?.message || 'Failed to delete subscription plan',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-500">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border-b border-gray-200 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Subscription Plans</h2>
            <p className="text-sm text-gray-500 mt-1">
              {plans.length} of 3 plans created
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Link to="/promoCodeManagement" className="px-4 py-2 mr-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              Manage Promo Codes
            </Link>
            <button
            onClick={() => setShowCreateForm(true)}
            disabled={plans.length >= 3}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors w-full sm:w-auto justify-center ${
              plans.length >= 3
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            Create New Plan
          </button>
          </div>
        </div>

        {/* Plans Grid */}
        {plans.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No plans yet</h3>
            <p className="text-gray-500 mb-4">Create your first subscription plan to get started.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Plan
            </button>
          </div>
        ) : (
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onEdit={handleEditPlan}
                  onDelete={handleDeletePlan}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <CreatePlanForm
          onSubmit={handleCreatePlan}
          onCancel={() => setShowCreateForm(false)}
          existingPlansCount={plans.length}
        />
      )}

      {/* Edit Form Modal */}
      {editingPlan && (
        <EditPlanForm
          plan={editingPlan}
          onSubmit={handleUpdatePlan}
          onCancel={() => setEditingPlan(null)}
        />
      )}
    </>
  );
};

export default PlanList;
