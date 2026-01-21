import { baseApi } from '@/redux/api/baseApi';

export const whatSetsUsApartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWhatSetsUsApart: build.query({
      query: (site) => ({
        url: `/aboutus/what-sets-us-apart?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['WhatSetsUsApart'],
    }),

    createWhatSetsUsApart: build.mutation({
      query: ({ site, formData }) => ({
        url: `/aboutus/what-sets-us-apart?site=${site}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['WhatSetsUsApart'],
    }),

    updateWhatSetsUsApart: build.mutation({
      query: ({ site, formData }) => ({
        url: `/aboutus/what-sets-us-apart?site=${site}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['WhatSetsUsApart'],
    }),
  }),
});

export const {
  useGetWhatSetsUsApartQuery,
  useCreateWhatSetsUsApartMutation,
  useUpdateWhatSetsUsApartMutation,
} = whatSetsUsApartApi;
