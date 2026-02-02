import { baseApi } from '@/redux/api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    Login: build.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // varifyemailLogin: build.mutation({
    //   query: (credentials) => ({
    //     url: '/auth/verify/email',
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // }),
    // phoneLogin: build.mutation({
    //   query: (credentials) => ({
    //     url: '/auth/login/phone',
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // }),
    // varifyPhoneLogin: build.mutation({
    //   query: (credentials) => ({
    //     url: '/auth/verify/phone',
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // }),
    // superAdminLogin: build.mutation({
    //   query: (credentials) => ({
    //     url: '/auth/login/super-admin',
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // }),
    // updateProfile: build.mutation({
    //   query: (credentials) => ({
    //     url: `/employee/user/profile`,
    //     method: 'PATCH',
    //     body: credentials?.formData,
    //   }),
    // }),
    // updateRole: build.mutation({
    //   query: (credentials) => ({
    //     url: `/admin/user/${credentials?.userId}/role`,
    //     method: 'PATCH',
    //     body: credentials?.data,
    //   }),
    //   invalidatesTags: ['User'],
    // }),
    // getProfile: build.query({
    //   query: (credentials) => ({
    //     url: `/admin/user/id/${credentials}`,
    //   }),
    // }),
    // getUserProfile: build.query({
    //   query: () => ({
    //     url: `/admin/user/me/profile`,
    //     method: 'GET',
    //   }),
    // }),
  }),
});

export const {
  useLoginMutation,
  // useSuperAdminLoginMutation,
  // useVarifyemailLoginMutation,
  // usePhoneLoginMutation,
  // useVarifyPhoneLoginMutation,
  // useUpdateProfileMutation,
  // useGetProfileQuery,
  // useUpdateRoleMutation,
  // useGetUserProfileQuery,
} = authApi;
