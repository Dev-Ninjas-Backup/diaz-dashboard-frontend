import { baseApi } from '@/redux/api/baseApi';

export interface SubscriptionPlan {
  id: string;
  title: string;
  planType: string;
  description: string;
  benefits: string[];
  picLimit: number;
  wordLimit: number;
  isBest: boolean;
  isActive: boolean;
  stripeProductId?: string;
  stripePriceId?: string;
  currency: string;
  price: number;
  billingPeriodMonths: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlanResponse {
  success: boolean;
  message: string;
  data: SubscriptionPlan[];
}

export interface SingleSubscriptionPlanResponse {
  success: boolean;
  message: string;
  data: SubscriptionPlan;
}

export interface CreateSubscriptionPlanPayload {
  title: string;
  planType: string;
  description: string;
  benefits: string[];
  picLimit: number;
  wordLimit: number;
  isBest: boolean;
  isActive: boolean;
  price: number;
  currency: string;
  billingPeriodMonths: number;
}

export interface EmailSubscription {
  id: string;
  email: string;
  site: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EmailSubscriptionResponse {
  success: boolean;
  message: string;
  data: EmailSubscription[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface EmailSubscriptionQueryParams {
  site?: string;
  page?: number;
  limit?: number;
}

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubscriptionPlans: build.query<SubscriptionPlan[], void>({
      query: () => ({
        url: `/subscription/plans`,
        method: 'GET',
      }),
      transformResponse: (response: SubscriptionPlanResponse) => response.data,
      providesTags: ['Subscription'],
    }),

    getSubscriptionPlan: build.query<SubscriptionPlan, string>({
      query: (id) => ({
        url: `/subscription/plans/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: SingleSubscriptionPlanResponse) =>
        response.data,
      providesTags: ['Subscription'],
    }),

    createSubscriptionPlan: build.mutation<
      SubscriptionPlan,
      CreateSubscriptionPlanPayload
    >({
      query: (plan) => ({
        url: `/subscription/plans`,
        method: 'POST',
        body: plan,
      }),
      transformResponse: (response: SingleSubscriptionPlanResponse) =>
        response.data,
      invalidatesTags: ['Subscription'],
    }),

    updateSubscriptionPlan: build.mutation<
      SubscriptionPlan,
      { id: string; plan: CreateSubscriptionPlanPayload }
    >({
      query: ({ id, plan }) => ({
        url: `/subscription/plans/${id}`,
        method: 'PATCH',
        body: plan,
      }),
      transformResponse: (response: SingleSubscriptionPlanResponse) =>
        response.data,
      invalidatesTags: ['Subscription'],
    }),

    deleteSubscriptionPlan: build.mutation<void, string>({
      query: (id) => ({
        url: `/subscription/plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscription'],
    }),

    // Email Subscription Endpoints
    getEmailSubscriptions: build.query<
      EmailSubscriptionResponse,
      EmailSubscriptionQueryParams
    >({
      query: (params = {}) => {
        const { site = 'FLORIDA', page = 1, limit = 10 } = params;
        return {
          url: `/email-subscribe/list`,
          method: 'GET',
          params: { site, page, limit },
        };
      },
      providesTags: ['Subscription'],
    }),

    getActiveEmailSubscriptions: build.query<
      EmailSubscriptionResponse,
      EmailSubscriptionQueryParams
    >({
      query: (params = {}) => {
        const { site = 'FLORIDA', page = 1, limit = 10 } = params;
        return {
          url: `/email-subscribe/active`,
          method: 'GET',
          params: { site, page, limit },
        };
      },
      providesTags: ['Subscription'],
    }),
  }),
});

export const {
  useGetSubscriptionPlansQuery,
  useGetSubscriptionPlanQuery,
  useCreateSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanMutation,
  useGetEmailSubscriptionsQuery,
  useGetActiveEmailSubscriptionsQuery,
} = subscriptionApi;
