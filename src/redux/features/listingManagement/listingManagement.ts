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
  }),
});

export const { useGetAllListingQuery } = listingManagementApi;
