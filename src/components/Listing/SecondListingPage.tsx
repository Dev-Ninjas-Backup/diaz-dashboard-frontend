import { CITY_OPTIONS, COUNTRY_OPTIONS, STATE_OPTIONS } from '@/lib/formConfig';
import { secondStepSchema } from '@/lib/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormFieldWithError } from './FormFieldWithError';
import { PasswordField } from './PasswordField';
import ProgressBar from './ProgressBar';
import RightPreviewSection from './RightPreviewSection';

type SecondStepFormData = z.infer<typeof secondStepSchema>;

interface SecondListingPageProps {
  onBack: () => void;
  onSubmit: (data: SecondStepFormData) => void;
  initialData?: Partial<SecondStepFormData>;
  currentStep: number;
  previewData?: {
    coverPhoto?: string | null;
    city?: string;
    state?: string;
    name?: string;
    make?: string;
    model?: string;
    buildYear?: string;
    price?: string;
  };
}

const SecondListingPage = ({
  onBack,
  onSubmit,
  initialData,
  currentStep,
  previewData,
}: SecondListingPageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecondStepFormData>({
    resolver: zodResolver(secondStepSchema),
    defaultValues: initialData || {},
  });

  const handleFormSubmit = (data: SecondStepFormData) => {
    onSubmit(data);
  };

  return (
    <div className="mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Progress Bar */}
            <ProgressBar currentStep={currentStep} />

            {/* Your Contact Details Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">
                Your Contact Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormFieldWithError
                  label="First Name:"
                  name="firstName"
                  register={register}
                  errors={errors}
                  required
                />
                <FormFieldWithError
                  label="Last Name:"
                  name="lastName"
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormFieldWithError
                  label="Contact Number:"
                  name="contactNumber"
                  register={register}
                  errors={errors}
                  required
                />
                <FormFieldWithError
                  label="Email:"
                  name="email"
                  register={register}
                  errors={errors}
                  type="email"
                  required
                />
              </div>

              <FormFieldWithError
                label="Country:"
                name="country"
                register={register}
                errors={errors}
                type="select"
                options={COUNTRY_OPTIONS}
                required
                className="mb-4"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormFieldWithError
                  label="City:"
                  name="sellerCity"
                  register={register}
                  errors={errors}
                  type="select"
                  options={CITY_OPTIONS}
                  required
                />
                <FormFieldWithError
                  label="State:"
                  name="sellerState"
                  register={register}
                  errors={errors}
                  type="select"
                  options={STATE_OPTIONS}
                  required
                />
                <FormFieldWithError
                  label="Zip:"
                  name="sellerZip"
                  register={register}
                  errors={errors}
                  required
                />
              </div>
            </div>

            {/* Seller Account Information Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">
                Seller Account Information
              </h2>

              <FormFieldWithError
                label="Username:"
                name="username"
                register={register}
                errors={errors}
                placeholder="username"
                required
                className="mb-4"
              />

              <PasswordField
                label="Password:"
                name="password"
                register={register}
                errors={errors}
                required
              />

              <div className="mt-4">
                <PasswordField
                  label="Confirm Password:"
                  name="confirmPassword"
                  register={register}
                  errors={errors}
                  required
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                Post Now
                <span>→</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Preview Section */}
        <div className="lg:col-span-1">
          <RightPreviewSection data={previewData || {}} />
        </div>
      </div>
    </div>
  );
};

export default SecondListingPage;
