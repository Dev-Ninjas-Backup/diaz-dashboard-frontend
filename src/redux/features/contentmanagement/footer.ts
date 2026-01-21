import { baseApi } from '@/redux/api/baseApi';
import type { FooterParams, SiteParam } from './types';

export const footerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFooter: build.query({
      query: ({ site }: SiteParam) => ({
        url: `/footer?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['Footer'],
    }),

    createFooter: build.mutation({
      query: ({ site, footerContent }: FooterParams) => ({
        url: `/footer?site=${site}`,
        method: 'POST',
        body: footerContent,
      }),
      invalidatesTags: ['Footer'],
    }),

    updateFooter: build.mutation({
      query: ({ site, footerContent }: FooterParams) => ({
        url: `/footer?site=${site}`,
        method: 'PATCH',
        body: footerContent,
      }),
      invalidatesTags: ['Footer'],
    }),
  }),
});

export const {
  useGetFooterQuery,
  useCreateFooterMutation,
  useUpdateFooterMutation,
} = footerApi;
