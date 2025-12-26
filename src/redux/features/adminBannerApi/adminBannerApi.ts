import { baseApi } from "@/redux/api/baseApi";

export interface Banner {
  _id: string;
  page: string;
  site: string;
  bannerTitle: string;
  subtitle?: string;
  background?: string; 
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBannerPayload {
  page: string;
  site: string;
  bannerTitle: string;
  subtitle?: string;
  background?: File;
}

export interface UpdateBannerPayload {
  id: string;
  page?: string;
  site?: string;
  bannerTitle?: string;
  subtitle?: string;
  background?: File;
}

export interface GetSingleBannerQuery {
  page: string;
  site: string;
}

export interface AdminSettings {
  id: string;
  siteName: string;
  currency: string;
  maintenanceMode: boolean;
  logoId: string | null;
  newListingSubmitted: boolean;
  newSellerRegistration: boolean ;
  createdAt: string;
  updatedAt: string;
  logo: string | null;
  logoUrl: string | null;
}

export interface UpdateAdminSettingsPayload {
  siteName?: string;
  currency?: string;
  maintenanceMode?: boolean;
  newListingSubmitted?: boolean;
  newSellerRegistration?: boolean;
  logo?: File | null | string;
}


export const adminBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBanner: builder.mutation<Banner, CreateBannerPayload>({
      query: (data) => {
        const formData = new FormData();

        formData.append('page', data.page);
        formData.append('site', data.site);
        formData.append('bannerTitle', data.bannerTitle);

        if (data.subtitle) {
          formData.append('subtitle', data.subtitle);
        }

        if (data.background) {
          formData.append('background', data.background);
        }

        return {
          url: '/banners',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Admin'],
    }),

    getSingleBanner: builder.query<Banner, GetSingleBannerQuery>({
      query: ({ page, site }) => ({
        url: '/banners/single',
        method: 'GET',
        params: { page, site },
      }),
      providesTags: ['Admin'],
    }),

    updateBanner: builder.mutation<Banner, UpdateBannerPayload>({
      query: ({ id, ...data }) => {
        const formData = new FormData();

        if (data.page) formData.append('page', data.page);
        if (data.site) formData.append('site', data.site);
        if (data.bannerTitle) formData.append('bannerTitle', data.bannerTitle);
        if (data.subtitle) formData.append('subtitle', data.subtitle);
        if (data.background) formData.append('background', data.background);

        return {
          url: `/banners/${id}`,
          method: 'PATCH', 
          body: formData,
        };
      },
      invalidatesTags: ['Admin'],
    }),
  }),
});


export const {
  useCreateBannerMutation,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} = adminBannerApi;
