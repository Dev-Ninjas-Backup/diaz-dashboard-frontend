import { firstStepSchema } from '@/lib/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  CABIN_COUNT_OPTIONS,
  CITY_OPTIONS,
  CLASS_OPTIONS,
  CONDITION_OPTIONS,
  ENGINE_COUNT_OPTIONS,
  FUEL_TYPE_OPTIONS,
  HEAD_COUNT_OPTIONS,
  MAKE_OPTIONS,
  MATERIAL_OPTIONS,
  MODEL_OPTIONS,
  STATE_OPTIONS,
  YEAR_OPTIONS,
} from '../../lib/formConfig';
import { combineMeasurements } from '../../lib/formUtils';
import { EngineSection } from './EngineSection';
import { FormField } from './FormField';
import { GalleryUpload } from './GalleryUpload';
import { ImageUpload } from './ImageUpload';
import { MeasurementField } from './MeasurementField';
import ProgressBar from './ProgressBar';
import RightPreviewSection from './RightPreviewSection';

type FirstStepFormData = z.infer<typeof firstStepSchema>;

interface MoreDetail {
  title: string;
  description: string;
}

interface FirstListingPageProps {
  onNext: (
    data: FirstStepFormData & {
      coverPhoto: string | null;
      galleryPhotos: string[];
      moreDetails: MoreDetail[];
    },
  ) => void;
  initialData?: Partial<FirstStepFormData>;
  currentStep: number;
}

const FirstListingPage = ({
  onNext,
  initialData,
  currentStep,
}: FirstListingPageProps) => {
  const { register, handleSubmit, watch } = useForm<FirstStepFormData>({
    resolver: zodResolver(firstStepSchema),
    defaultValues: initialData || {},
  });

  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const [moreDetails, setMoreDetails] = useState<MoreDetail[]>([
    { title: '', description: '' },
  ]);

  const coverPhotoRef = useRef<HTMLInputElement>(null);
  const galleryPhotoRef = useRef<HTMLInputElement>(null);

  // Watch form values for real-time preview updates
  const formValues = watch();

  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPhotos.push(reader.result as string);
          if (newPhotos.length === files.length) {
            setGalleryPhotos([...galleryPhotos, ...newPhotos]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryPhoto = (index: number) => {
    setGalleryPhotos(galleryPhotos.filter((_, i) => i !== index));
  };

  const addMoreDetail = () => {
    setMoreDetails([...moreDetails, { title: '', description: '' }]);
  };

  const updateMoreDetail = (
    index: number,
    field: 'title' | 'description',
    value: string,
  ) => {
    const updated = [...moreDetails];
    updated[index][field] = value;
    setMoreDetails(updated);
  };

  const onSubmit = (data: FirstStepFormData) => {
    const formattedData = combineMeasurements(data);
    onNext({ ...formattedData, coverPhoto, galleryPhotos, moreDetails });
  };

  return (
    <div className=" mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Progress Bar */}
            <ProgressBar currentStep={currentStep} />

            {/* Specifications Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">Specifications</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormField
                  label="Build Year:"
                  name="buildYear"
                  register={register}
                  type="select"
                  options={YEAR_OPTIONS}
                  required
                />
                <FormField
                  label="Make:"
                  name="make"
                  register={register}
                  type="select"
                  options={MAKE_OPTIONS}
                  required
                />
                <FormField
                  label="Model:"
                  name="model"
                  register={register}
                  type="select"
                  options={MODEL_OPTIONS}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <MeasurementField
                  label="Length (Ft/In):"
                  ftName="lengthFt"
                  inName="lengthIn"
                  register={register}
                />
                <MeasurementField
                  label="Beam Size(Ft/In):"
                  ftName="beamFt"
                  inName="beamIn"
                  register={register}
                />
                <MeasurementField
                  label="Max Draft(Ft/In):"
                  ftName="maxDraftFt"
                  inName="maxDraftIn"
                  register={register}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormField
                  label="Class:"
                  name="class"
                  register={register}
                  type="select"
                  options={CLASS_OPTIONS}
                  required
                />
                <FormField
                  label="Material:"
                  name="material"
                  register={register}
                  type="select"
                  options={MATERIAL_OPTIONS}
                  required
                />
                <FormField
                  label="Fuel Type:"
                  name="fuelType"
                  register={register}
                  type="select"
                  options={FUEL_TYPE_OPTIONS}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Number of Engine:"
                  name="numberOfEngines"
                  register={register}
                  type="select"
                  options={ENGINE_COUNT_OPTIONS}
                  required
                />
                <FormField
                  label="Number of Cabin:"
                  name="numberOfCabins"
                  register={register}
                  type="select"
                  options={CABIN_COUNT_OPTIONS}
                  required
                />
                <FormField
                  label="Number of Heads:"
                  name="numberOfHeads"
                  register={register}
                  type="select"
                  options={HEAD_COUNT_OPTIONS}
                  required
                />
              </div>
            </div>

            {/* Engine 1 Section */}
            <EngineSection register={register} engineNumber={1} />

            {/* Basic Information Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  label="Condition:"
                  name="condition"
                  register={register}
                  type="select"
                  options={CONDITION_OPTIONS}
                  required
                />
                <FormField
                  label="Price:"
                  name="price"
                  register={register}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormField
                  label="City:"
                  name="city"
                  register={register}
                  type="select"
                  options={CITY_OPTIONS}
                  required
                />
                <FormField
                  label="State:"
                  name="state"
                  register={register}
                  type="select"
                  options={STATE_OPTIONS}
                  required
                />
                <FormField
                  label="Zip:"
                  name="zip"
                  register={register}
                  required
                />
              </div>

              <FormField
                label="Name:"
                name="name"
                register={register}
                required
                className="mb-4"
              />
              <FormField
                label="Description:"
                name="description"
                register={register}
                type="textarea"
                placeholder="Write description..."
              />
            </div>

            {/* More Details Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">
                More Details (optional)
              </h2>

              {moreDetails.map((detail, index) => (
                <div key={index} className="mb-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Enter Title"
                    value={detail.title}
                    onChange={(e) =>
                      updateMoreDetail(index, 'title', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white"
                  />
                  <textarea
                    placeholder="Write description..."
                    value={detail.description}
                    onChange={(e) =>
                      updateMoreDetail(index, 'description', e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white resize-none"
                  ></textarea>
                </div>
              ))}

              <button
                type="button"
                onClick={addMoreDetail}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Another Description
              </button>
            </div>

            {/* Media & Gallery Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-2">Media & Gallery</h2>
              <p className="text-sm text-gray-500 mb-4">
                Your package allows 25 images.
              </p>

              <div className="mb-4">
                <FormField
                  label="Enter Embed URL (YouTube or Vimeo):"
                  name="embedUrl"
                  register={register}
                  placeholder="url"
                />
              </div>

              <div className="mb-4">
                <ImageUpload
                  label="Upload Cover Photo"
                  image={coverPhoto}
                  onUpload={handleCoverPhotoUpload}
                  onRemove={() => setCoverPhoto(null)}
                  inputRef={coverPhotoRef}
                />
              </div>

              <GalleryUpload
                photos={galleryPhotos}
                onRemove={removeGalleryPhoto}
                inputRef={galleryPhotoRef}
                onUpload={handleGalleryUpload}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                Next
                <span>→</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Preview Section */}
        <div className="lg:col-span-1">
          <RightPreviewSection
            data={{
              coverPhoto,
              city: formValues.city,
              state: formValues.state,
              name: formValues.name,
              make: formValues.make,
              model: formValues.model,
              buildYear: formValues.buildYear,
              price: formValues.price,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FirstListingPage;
