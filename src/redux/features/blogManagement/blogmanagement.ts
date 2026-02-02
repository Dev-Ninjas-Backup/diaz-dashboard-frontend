import { baseApi } from '@/redux/api/baseApi';

const blogManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (blog) => ({
        url: `/blogs`,
        method: 'POST',
        body: blog,
      }),
      invalidatesTags: ['Blog'],
    }),

    getBlogs: build.query({
      query: () => ({
        url: `/blogs`,
        method: 'GET',
      }),
      providesTags: ['Blog'],
    }),

    updateBlog: build.mutation({
      query: ({ id, body }) => ({
        url: `/blogs/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Blog'],
    }),

    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogManagementApi;
