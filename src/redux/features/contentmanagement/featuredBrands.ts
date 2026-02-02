import { baseApi } from '@/redux/api/baseApi';
import type { FeaturedBrandsParams, IdParam } from './types';

export const featuredBrandsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFeaturedBrands: build.query({
      query: (site) => ({
        url: `/featured-brands?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['FeaturedBrands'],
    }),

    createFeaturedBrands: build.mutation({
      query: ({ featuredBrands }: FeaturedBrandsParams) => ({
        url: `/featured-brands`,
        method: 'POST',
        body: featuredBrands,
      }),
      invalidatesTags: ['FeaturedBrands'],
    }),

    updateFeaturedBrands: build.mutation({
      query: ({ id, featuredBrands }: FeaturedBrandsParams) => ({
        url: `/featured-brands/${id}`,
        method: 'PATCH',
        body: featuredBrands,
      }),
      invalidatesTags: ['FeaturedBrands'],
    }),

    deleteFeaturedBrands: build.mutation({
      query: ({ id }: IdParam) => ({
        url: `/featured-brands/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FeaturedBrands'],
    }),
  }),
});

export const {
  useGetFeaturedBrandsQuery,
  useCreateFeaturedBrandsMutation,
  useUpdateFeaturedBrandsMutation,
  useDeleteFeaturedBrandsMutation,
} = featuredBrandsApi;
