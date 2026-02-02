import { baseApi } from '@/redux/api/baseApi';

const listingManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllListing: build.query({
      query: ({ page, limit, search, status }) => {
        let url = `/admin/listings?page=${page}&limit=${limit}`;

        if (search && search.trim() !== '') {
          url += `&search=${encodeURIComponent(search.trim())}`;
        }

        if (status && status.trim() !== '') {
          url += `&status=${encodeURIComponent(status)}`;
        }

        return {
          url,
          method: 'GET',
        };
      },
      providesTags: ['Listing'],
    }),

    createListing: build.mutation({
      query: (listingData) => ({
        url: `/admin/listings/admin-create-listing`,
        method: 'POST',
        body: listingData,
      }),
      invalidatesTags: ['Listing'],
    }),

    deleteListing: build.mutation({
      query: (id) => ({
        url: `/admin/listings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Listing'],
    }),
  }),
});

export const {
  useGetAllListingQuery,
  useCreateListingMutation,
  useDeleteListingMutation,
} = listingManagementApi;
