import { baseApi } from '@/redux/api/baseApi';

const sellerManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSellers: build.query({
      query: () => ({
        url: `/seller-management/sellers`,
        method: 'GET',
      }),
      providesTags: ['Seller'],
    }),
    getSellerById: build.query({
      query: (sellerId: string) => ({
        url: `/seller-management/seller/${sellerId}`,
        method: 'GET',
      }),
      providesTags: ['Seller'],
    }),
  }),
});

export const { useGetAllSellersQuery, useGetSellerByIdQuery } =
  sellerManagementApi;
