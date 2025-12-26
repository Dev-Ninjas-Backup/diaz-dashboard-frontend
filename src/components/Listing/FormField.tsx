import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: 'text' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  className?: string;
}

export function FormField<T extends FieldValues>({
  label,
  name,
  register,
  type = 'text',
  placeholder = 'Type here',
  required = false,
  options = [],
  rows = 4,
  className = '',
}: FormFieldProps<T>) {
  const baseInputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white';
  const selectClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent';

  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {type === 'select' ? (
        <select {...register(name)} className={selectClass}>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          rows={rows}
          className={`${baseInputClass} resize-none`}
        />
      ) : (
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={baseInputClass}
        />
      )}
    </div>
  );
}
