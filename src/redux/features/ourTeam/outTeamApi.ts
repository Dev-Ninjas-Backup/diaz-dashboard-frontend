import { baseApi } from '@/redux/api/baseApi';

export interface TeamMemberImage {
  id: string;
  filename: string;
  originalFilename: string;
  path: string;
  url: string;
  fileType: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  imageId: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  image: TeamMemberImage;
}

export interface OurTeamResponse {
  success: boolean;
  message: string;
  data: TeamMember[];
}

export interface SingleTeamMemberResponse {
  success: boolean;
  message: string;
  data: TeamMember;
}

const ourTeamApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOurTeam: build.query<OurTeamResponse, void>({
      query: () => ({
        url: `/our-team`,
        method: 'GET',
      }),
      providesTags: ['OurTeam'],
    }),

    getSingleTeamMember: build.query<SingleTeamMemberResponse, string>({
      query: (id) => ({
        url: `/our-team/${id}`,
        method: 'GET',
      }),
      providesTags: ['OurTeam'],
    }),

    createOurTeam: build.mutation<SingleTeamMemberResponse, FormData>({
      query: (data) => ({
        url: `/our-team`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OurTeam'],
    }),

    updateOurTeam: build.mutation<
      SingleTeamMemberResponse,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/our-team/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['OurTeam'],
    }),

    deleteOurTeam: build.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/our-team/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OurTeam'],
    }),
  }),
});

export const {
  useGetOurTeamQuery,
  useGetSingleTeamMemberQuery,
  useCreateOurTeamMutation,
  useUpdateOurTeamMutation,
  useDeleteOurTeamMutation,
} = ourTeamApi;
