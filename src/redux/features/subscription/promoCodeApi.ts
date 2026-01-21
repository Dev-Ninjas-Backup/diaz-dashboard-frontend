import { baseApi } from '@/redux/api/baseApi';

const promoCodeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPromoCodes: build.query({
      query: ({ page, limit }) => ({
        url: `/admin/subscriptions/promo-codes/all?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['PromoCodes'],
    }),

    getSinglePromoCode: build.query({
      query: ({ promoId }) => ({
        url: `/admin/subscriptions/promo-codes/${promoId}`,
        method: 'GET',
      }),
      providesTags: ['PromoCodes'],
    }),


    createPromoCodes: build.mutation({
     query: ({ promoData }) => ({
        url: `/admin/subscriptions/promo-codes`,
        method: 'POST',
        body: promoData,
      }),
      invalidatesTags: ['PromoCodes'],
    }),

    deletePromoCodes: build.mutation({
        query: ({ promoId }) => ({
        url: `/admin/subscriptions/promo-codes/${promoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PromoCodes'],
    }),

    updatePromoCodes: build.mutation({
        query: ({ promoId, promoData }) => ({
        url: `/admin/subscriptions/promo-codes/${promoId}`,
        method: 'PATCH',
        body: promoData,
      }),
      invalidatesTags: ['PromoCodes'],
    }),
  }),
});

export const {
    useGetAllPromoCodesQuery,
    useGetSinglePromoCodeQuery,
    useCreatePromoCodesMutation,
    useDeletePromoCodesMutation,
    useUpdatePromoCodesMutation
} = promoCodeApi;

