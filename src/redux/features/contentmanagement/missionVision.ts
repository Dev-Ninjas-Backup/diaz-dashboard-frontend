import { baseApi } from '@/redux/api/baseApi';

export const missionVisionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMissionVision: build.query({
      query: (site) => ({
        url: `/aboutus/mission-vision?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['MissionVision'],
    }),

    createMissionVision: build.mutation({
      query: ({ site, formData }) => ({
        url: `/aboutus/mission-vision?site=${site}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['MissionVision'],
    }),

    updateMissionVision: build.mutation({
      query: ({ site, formData }) => ({
        url: `/aboutus/mission-vision?site=${site}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['MissionVision'],
    }),
  }),
});

export const {
  useGetMissionVisionQuery,
  useCreateMissionVisionMutation,
  useUpdateMissionVisionMutation,
} = missionVisionApi;
