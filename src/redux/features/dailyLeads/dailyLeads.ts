import { baseApi } from '@/redux/api/baseApi';
import type { DailyLeadsResponse } from '@/types/daily-leads-types';

export const dailyLeadsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDailyLeads: builder.query<DailyLeadsResponse, void>({
      query: () => ({
        url: 'https://ai.jupitermarinesales.com/api/v1/generate_daily_leads',
        method: 'GET',
      }),
      transformResponse: (response: DailyLeadsResponse) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useGetDailyLeadsQuery } = dailyLeadsApi;
