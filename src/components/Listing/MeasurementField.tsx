/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister } from 'react-hook-form';

interface MeasurementFieldProps {
  label: string;
  ftName: string;
  inName: string;
  register: UseFormRegister<any>;
  required?: boolean;
}

export function MeasurementField({
  label,
  ftName,
  inName,
  register,
  required = false,
}: MeasurementFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            {...register(ftName)}
            type="text"
            placeholder="-"
            className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm text-center bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            ft
          </span>
        </div>
        <div className="relative flex-1">
          <input
            {...register(inName)}
            type="text"
            placeholder="-"
            className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm text-center bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            In
          </span>
        </div>
      </div>
    </div>
  );
}
