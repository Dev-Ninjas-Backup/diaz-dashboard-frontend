import FirstListingPage from '@/components/Listing/FirstListingPage';
import SecondListingPage from '@/components/Listing/SecondListingPage';
import { useState } from 'react';

interface FormData {
  // Step 1 - Boat Information
  buildYear?: string;
  make?: string;
  model?: string;
  lengthFt?: string;
  lengthIn?: string;
  beamFt?: string;
  beamIn?: string;
  maxDraftFt?: string;
  maxDraftIn?: string;
  class?: string;
  material?: string;
  fuelType?: string;
  numberOfEngines?: string;
  numberOfCabins?: string;
  numberOfHeads?: string;

  // Engine 1
  engine1Hours?: string;
  engine1Make?: string;
  engine1Model?: string;
  engine1TotalPower?: string;
  engine1FuelType?: string;
  engine1PropellerType?: string;

  // Basic Information
  condition?: string;
  price?: string;
  city?: string;
  state?: string;
  zip?: string;
  name?: string;
  description?: string;
  moreDetails?: Array<{ title: string; description: string }>;
  embedUrl?: string;
  coverPhoto?: string | null;
  galleryPhotos?: string[];

  // Step 2 - Seller Information
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  email?: string;
  country?: string;
  sellerCity?: string;
  sellerState?: string;
  sellerZip?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const AddListing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});

  const handleNextStep = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleBackStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (data: Partial<FormData>) => {
    const finalData = { ...formData, ...data };
    console.log('Final Form Data:', finalData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-lg">
      {currentStep === 1 ? (
        <FirstListingPage
          onNext={handleNextStep}
          initialData={formData}
          currentStep={currentStep}
        />
      ) : (
        <SecondListingPage
          onBack={handleBackStep}
          onSubmit={handleSubmit}
          initialData={formData}
          currentStep={currentStep}
          previewData={{
            coverPhoto: formData.coverPhoto,
            city: formData.city,
            state: formData.state,
            name: formData.name,
            make: formData.make,
            model: formData.model,
            buildYear: formData.buildYear,
            price: formData.price,
          }}
        />
      )}
    </div>
  );
};

export default AddListing;
