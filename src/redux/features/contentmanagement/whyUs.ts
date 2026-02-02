import { baseApi } from '@/redux/api/baseApi';
import type { SiteParam, WhyUsParams } from './types';

export const whyUsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWhyUs: build.query({
      query: (site) => ({
        url: `/why-us?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['WhyUs'],
    }),

    createWhyUs: build.mutation({
      query: ({ whyUsContent }: WhyUsParams) => ({
        url: `/why-us`,
        method: 'POST',
        body: whyUsContent,
      }),
      invalidatesTags: ['WhyUs'],
    }),

    updateWhyUs: build.mutation({
      query: ({ site, whyUsContent }: WhyUsParams) => ({
        url: `/why-us?site=${site}`,
        method: 'PATCH',
        body: whyUsContent,
      }),
      invalidatesTags: ['WhyUs'],
    }),

    deleteWhyUs: build.mutation({
      query: ({ site }: SiteParam) => ({
        url: `/why-us?site=${site}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WhyUs'],
    }),
  }),
});

export const {
  useGetWhyUsQuery,
  useCreateWhyUsMutation,
  useUpdateWhyUsMutation,
  useDeleteWhyUsMutation,
} = whyUsApi;
