import type { UpdateAdminSettingsPayload } from "@/redux/features/adminBannerApi/adminBannerApi";

interface Props {
  formData: UpdateAdminSettingsPayload;
  setFormData: React.Dispatch<
    React.SetStateAction<UpdateAdminSettingsPayload>
  >;
}

const Notifications: React.FC<Props> = ({ formData, setFormData }) => {
  const renderSwitch = (
    value: boolean,
    onChange: () => void
  ) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer  ${
        value ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="bg-white border rounded-lg p-6 space-y-6">
      <h2 className="text-lg font-semibold mb-6">Email Notifications</h2>

      {/* New Listing */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">New Listing Submitted</p>
          <p className="text-sm text-gray-500">
            Notify when sellers submit listings
          </p>
        </div>
        {renderSwitch(formData.newListingSubmitted!, () =>
          setFormData((p) => ({
            ...p,
            newListingSubmitted: !p.newListingSubmitted,
          }))
        )}
      </div>

      {/* New Seller */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">New Seller Registration</p>
          <p className="text-sm text-gray-500">
            Notify when sellers register
          </p>
        </div>
        {renderSwitch(formData.newSellerRegistration!, () =>
          setFormData((p) => ({
            ...p,
            newSellerRegistration: !p.newSellerRegistration,
          }))
        )}
      </div>
    </div>
  );
};

export default Notifications;
