import { baseApi } from '@/redux/api/baseApi';

export const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryLists: build.query({
      query: () => ({
        url: `/category`,
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),

    createCategory: build.mutation({
      query: (categoryContent) => ({
        url: `/category`,
        method: 'POST',
        body: categoryContent,
      }),
      invalidatesTags: ['Category'],
    }),

    getSingleCategory: build.query({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),

    updateCategory: build.mutation({
      query: ({ categoryId, categoryContent }) => ({
        url: `/category/${categoryId}`,
        method: 'PATCH',
        body: categoryContent,
      }),
      invalidatesTags: ['Category'],
    }),

    deleteCategory: build.mutation({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoryListsQuery,
  useCreateCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = aboutUsApi;

