import { baseApi } from '@/redux/api/baseApi';

const permissionManageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPermissionUsers: build.query({
      query: () => ({
        url: `/user-permissions/get-admins`,
        method: 'GET',
      }),
      providesTags: ['PERMISSION'],
    }),
    createPermission: build.mutation({
      query: (data) => ({
        url: `/user-permissions/add-admin`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PERMISSION'],
    }),
    changeRole: build.mutation({
      query: ({ id, data }) => ({
        url: `/user-permissions/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PERMISSION'],
    }),

    deletePermission: build.mutation({
      query: (id) => ({
        url: `/user-permissions/delete/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['PERMISSION'],
    }),
  }),
});

export const {
  useGetAllPermissionUsersQuery,
  useCreatePermissionMutation,
  useChangeRoleMutation,
  useDeletePermissionMutation,
} = permissionManageApi;
