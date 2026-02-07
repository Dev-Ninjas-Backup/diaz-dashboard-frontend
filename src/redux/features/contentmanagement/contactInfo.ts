import { baseApi } from '@/redux/api/baseApi';
import type { ContactInfoParams } from './types';

export const contactInfoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContactInfo: build.query({
      query: (site) => ({
        url: `/contact/contact-info?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['ContactInfo'],
    }),

    createContactInfo: build.mutation({
      query: ({ contactInfo }: ContactInfoParams) => ({
        url: `/contact-info`,
        method: 'POST',
        body: contactInfo,
      }),
      invalidatesTags: ['ContactInfo'],
    }),

    updateContactInfo: build.mutation({
      query: ({ site, contactInfo }: ContactInfoParams) => ({
        url: `/contact/contact-info?site=${site}`,
        method: 'PATCH',
        body: contactInfo,
      }),
      invalidatesTags: ['ContactInfo'],
    }),
  }),
});

export const {
  useGetContactInfoQuery,
  useCreateContactInfoMutation,
  useUpdateContactInfoMutation,
} = contactInfoApi;
