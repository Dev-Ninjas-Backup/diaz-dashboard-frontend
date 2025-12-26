/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister } from 'react-hook-form';
import { FormField } from './FormField';

interface EngineSectionProps {
  register: UseFormRegister<any>;
  engineNumber?: number;
}

const fuelTypeOptions = [
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Gas', label: 'Gas' },
];

const propellerTypeOptions = [
  { value: 'Fixed', label: 'Fixed' },
  { value: 'Folding', label: 'Folding' },
];

export function EngineSection({
  register,
  engineNumber = 1,
}: EngineSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <h2 className="text-lg font-semibold mb-4">Engine {engineNumber}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField label="Hours:" name="engine1Hours" register={register} />
        <FormField label="Make:" name="engine1Make" register={register} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField label="Model:" name="engine1Model" register={register} />
        <FormField
          label="Total Power (HP):"
          name="engine1TotalPower"
          register={register}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Fuel Type"
          name="engine1FuelType"
          register={register}
          type="select"
          options={fuelTypeOptions}
        />
        <FormField
          label="Propeller Type"
          name="engine1PropellerType"
          register={register}
          type="select"
          options={propellerTypeOptions}
        />
      </div>
    </div>
  );
}
