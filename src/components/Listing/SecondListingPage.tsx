import { COUNTRY_OPTIONS } from '@/lib/formConfig';
import { secondStepSchema } from '@/lib/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CityField } from './CityField';
import { FormFieldWithError } from './FormFieldWithError';
import ProgressBar from './ProgressBar';
import RightPreviewSection from './RightPreviewSection';
import { StateField } from './StateField';

type SecondStepFormData = z.infer<typeof secondStepSchema>;

interface SecondListingPageProps {
  onBack: () => void;
  onSubmit: (data: SecondStepFormData) => void;
  initialData?: Partial<SecondStepFormData>;
  currentStep: number;
  isSubmitting?: boolean;
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
  isSubmitting = false,
  previewData,
}: SecondListingPageProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
                <CityField
                  name="sellerCity"
                  stateName="sellerState"
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  required
                />
                <StateField
                  name="sellerState"
                  register={register}
                  setValue={setValue}
                  watch={watch}
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

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Post Now
                    <span>→</span>
                  </>
                )}
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
