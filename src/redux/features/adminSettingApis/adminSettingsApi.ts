import { baseApi } from "@/redux/api/baseApi";
import type { AdminSettings, UpdateAdminSettingsPayload } from "../adminBannerApi/adminBannerApi";

export const adminSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSettings: builder.query<AdminSettings, void>({
      query: () => ({
        url: "/admin/settings",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    updateAdminSettings: builder.mutation< AdminSettings, UpdateAdminSettingsPayload >({
      query: (data) => {
        const formData = new FormData();

        if (data.siteName !== undefined)
          formData.append("siteName", data.siteName);

        if (data.currency !== undefined)
          formData.append("currency", data.currency);

        if (data.maintenanceMode !== undefined)
          formData.append(
            "maintenanceMode",
            String(data.maintenanceMode)
          );

        if (data.newListingSubmitted !== undefined)
          formData.append(
            "newListingSubmitted",
            String(data.newListingSubmitted)
          );

        if (data.newSellerRegistration !== undefined)
          formData.append(
            "newSellerRegistration",
            String(data.newSellerRegistration)
          );

        if (data.logo) {
          formData.append("logo", data.logo);
        }

        return {
          url: "/admin/settings",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Admin"],
    }),
  }),
});


export const {
useGetAdminSettingsQuery ,
useUpdateAdminSettingsMutation
} = adminSettingsApi;
