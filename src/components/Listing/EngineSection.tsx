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

  // Dynamic field names based on engine number
  const engineFields = {
    hours: `engine${engineNumber}Hours`,
    make: `engine${engineNumber}Make`,
    model: `engine${engineNumber}Model`,
    totalPower: `engine${engineNumber}TotalPower`,
    fuelType: `engine${engineNumber}FuelType`,
    propellerType: `engine${engineNumber}PropellerType`,
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <h2 className="text-lg font-semibold mb-4">Engine {engineNumber}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          label="Hours:"
          name={engineFields.hours}
          register={register}
          type="number"
          required
        />
        <FormField
          label="Make:"
          name={engineFields.make}
          register={register}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          label="Model:"
          name={engineFields.model}
          register={register}
          required
        />
        <FormField
          label="Total Power (HP):"
          name={engineFields.totalPower}
          register={register}
          type="number"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DynamicFormSelect
          label="Engine Fuel Type:"
          name={engineFields.fuelType}
          type="ENGINE_TYPE"
          register={register}
          value={formValues[engineFields.fuelType]}
          onChange={(value) => setValue(engineFields.fuelType, value)}
          required
        />
        <DynamicFormSelect
          label="Propeller Type:"
          name={engineFields.propellerType}
          type="PROP_TYPE"
          register={register}
          value={formValues[engineFields.propellerType]}
          onChange={(value) => setValue(engineFields.propellerType, value)}
          required
        />
      </div>
    </div>
  );
}
