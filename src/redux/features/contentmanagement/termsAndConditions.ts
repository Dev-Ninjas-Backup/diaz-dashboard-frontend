import { baseApi } from '@/redux/api/baseApi';
import type { TermsAndConditionsParams } from './types';

export const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTermsAndConditions: build.query({
      query: (site) => ({
        url: `/terms-of-service?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['TermsOfService'],
    }),

    createTermsAndConditions: build.mutation({
      query: ({ site, termsAndConditions }: TermsAndConditionsParams) => ({
        url: `/terms-of-service/create?site=${site}`,
        method: 'POST',
        body: termsAndConditions,
      }),
      invalidatesTags: ['TermsOfService'],
    }),

    updateTermsAndConditions: build.mutation({
      query: ({ site, termsAndConditions }: TermsAndConditionsParams) => ({
        url: `/terms-of-service?site=${site}`,
        method: 'PATCH',
        body: termsAndConditions,
      }),
      invalidatesTags: ['TermsOfService'],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useCreateTermsAndConditionsMutation,
  useUpdateTermsAndConditionsMutation,
} = termsAndConditionsApi;
