import { baseApi } from '@/redux/api/baseApi';
import type { AboutUsParams } from './types';

export const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAboutUs: build.query({
      query: (site) => ({
        url: `/aboutus?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['AboutUs'],
    }),

    createAboutUs: build.mutation({
      query: ({ site, aboutUsContent }: AboutUsParams) => ({
        url: `/aboutus/create?site=${site}`,
        method: 'POST',
        body: aboutUsContent,
      }),
      invalidatesTags: ['AboutUs'],
    }),

    updateAboutUs: build.mutation({
      query: ({ site, aboutUsContent }: AboutUsParams) => ({
        url: `/aboutus?site=${site}`,
        method: 'PATCH',
        body: aboutUsContent,
      }),
      invalidatesTags: ['AboutUs'],
    }),

    getAboutUsOurStory: build.query({
      query: (site) => ({
        url: `/aboutus/our-story?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['AboutUs'],
    }),

    createAboutUsOurStory: build.mutation({
      query: ({ site, aboutUsOurStory }) => ({
        url: `/aboutus/our-story?site=${site}`,
        method: 'POST',
        body: aboutUsOurStory,
      }),
      invalidatesTags: ['AboutUs'],
    }),

    updateAboutUsOurStory: build.mutation({
      query: ({ site, aboutUsOurStory }) => ({
        url: `/aboutus/our-story?site=${site}`,
        method: 'PATCH',
        body: aboutUsOurStory,
      }),
      invalidatesTags: ['AboutUs'],
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,

  useGetAboutUsOurStoryQuery,
  useCreateAboutUsOurStoryMutation,
  useUpdateAboutUsOurStoryMutation,
} = aboutUsApi;

export { useGetAboutUsQuery as useGetAboutUsContentQuery };
