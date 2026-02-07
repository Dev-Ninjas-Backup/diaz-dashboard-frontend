import { baseApi } from '@/redux/api/baseApi';

export const ourStoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOurStory: build.query({
      query: (site) => ({
        url: `/aboutus/our-story?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['OurStory'],
    }),

    createOurStory: build.mutation({
      query: ({ site, formData }) => ({
        url: `/aboutus/our-story?site=${site}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['OurStory'],
    }),

    updateOurStory: build.mutation({
      query: ({ site, formData }) => ({
        url: `/aboutus/our-story?site=${site}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['OurStory'],
    }),
  }),
});

export const {
  useGetOurStoryQuery,
  useCreateOurStoryMutation,
  useUpdateOurStoryMutation,
} = ourStoryApi;
