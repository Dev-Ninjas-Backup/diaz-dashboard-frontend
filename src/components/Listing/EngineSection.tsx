/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { DynamicFormSelect } from './DynamicFormSelect';
import { FormField } from './FormField';

interface EngineSectionProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  engineNumber?: number;
}

export function EngineSection({
  register,
  setValue,
  watch,
  engineNumber = 1,
}: EngineSectionProps) {
  const formValues = watch();

  const fieldNames = {
    hours: `engine${engineNumber}Hours`,
    make: `engine${engineNumber}Make`,
    model: `engine${engineNumber}Model`,
    totalPower: `engine${engineNumber}TotalPower`,
    fuelType: `engine${engineNumber}FuelType`,
    propellerType: `engine${engineNumber}PropellerType`,
  } as const;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <h2 className="text-lg font-semibold mb-4">Engine {engineNumber}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          label="Hours:"
          name={fieldNames.hours}
          register={register}
          type="number"
        />
        <FormField
          label="Make:"
          name={fieldNames.make}
          register={register}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          label="Model:"
          name={fieldNames.model}
          register={register}
        />
        <FormField
          label="Total Power (HP):"
          name={fieldNames.totalPower}
          register={register}
          type="number"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DynamicFormSelect
          label="Engine Fuel Type:"
          name={fieldNames.fuelType}
          type="ENGINE_TYPE"
          register={register}
          value={formValues[fieldNames.fuelType]}
          onChange={(value) => setValue(fieldNames.fuelType, value)}
        />
        <DynamicFormSelect
          label="Propeller Type:"
          name={fieldNames.propellerType}
          type="PROP_TYPE"
          register={register}
          value={formValues[fieldNames.propellerType]}
          onChange={(value) => setValue(fieldNames.propellerType, value)}
        />
      </div>
    </div>
  );
}
