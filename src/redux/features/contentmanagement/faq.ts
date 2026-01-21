import { baseApi } from '@/redux/api/baseApi';
import type { FaqParams, SiteParam } from './types';

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFaq: build.query({
      query: (site) => ({
        url: `/faq?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['FAQ'],
    }),

    createFaq: build.mutation({
      query: ({ faqContent }: FaqParams) => ({
        url: `/faq`,
        method: 'POST',
        body: faqContent,
      }),
      invalidatesTags: ['FAQ'],
    }),

    updateFaq: build.mutation({
      query: ({ site, faqContent }: FaqParams) => ({
        url: `/faq?site=${site}`,
        method: 'PATCH',
        body: faqContent,
      }),
      invalidatesTags: ['FAQ'],
    }),

    deleteFaq: build.mutation({
      query: ({ site }: SiteParam) => ({
        url: `/faq?site=${site}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FAQ'],
    }),
  }),
});

export const {
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
