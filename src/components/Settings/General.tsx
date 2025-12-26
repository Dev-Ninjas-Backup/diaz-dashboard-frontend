import type { UpdateAdminSettingsPayload } from "@/redux/features/adminBannerApi/adminBannerApi";
import React from "react";
import currencyCodes from "currency-codes";

interface CurrencyOption {
  code: string;
  label: string;
}

const CURRENCIES: CurrencyOption[] = currencyCodes.data
  .filter((c) => c.countries && c.countries.length > 0)
  .map((c) => ({
    code: c.code,
    // @ts-ignore: currency-codes has no symbol property officially
    label: `${c.code} (${(c as any).symbol || ""}) - ${c.currency}`,
  }))
  .sort((a, b) => a.code.localeCompare(b.code));

interface GeneralProps {
  formData: UpdateAdminSettingsPayload;
  setFormData: React.Dispatch<React.SetStateAction<UpdateAdminSettingsPayload>>;
}

const General: React.FC<GeneralProps> = ({ formData, setFormData }) => {
  const renderSwitch = (
    value: boolean,
    onChange: () => void
  ) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
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
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-6">Site Settings</h2>

      <div className="space-y-6">
        {/* Site Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Site Name</label>
          <input
            type="text"
            value={formData.siteName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, siteName: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium mb-2">Currency</label>
          <select
            value={formData.currency}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, currency: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-lg bg-white"
          >
            {CURRENCIES.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.label}
              </option>
            ))}
          </select>
        </div>

        {/* Maintenance Mode */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Maintenance Mode</p>
            <p className="text-sm text-gray-500">
              Temporarily disable public access
            </p>
          </div>
          {renderSwitch(formData.maintenanceMode!, () =>
            setFormData((prev) => ({
              ...prev,
              maintenanceMode: !prev.maintenanceMode,
            }))
          )}
        </div>
      </div>
    </div>
  );
};

export default General;
