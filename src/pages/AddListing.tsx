/* eslint-disable @typescript-eslint/no-explicit-any */
import FirstListingPage from '@/components/Listing/FirstListingPage';
import { useCreateListingMutation } from '@/redux/features/listingManagement/listingManagement';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface FormData {
  buildYear?: number;
  make?: string;
  model?: string;
  lengthFt?: number;
  lengthIn?: number;
  beamFt?: number;
  beamIn?: number;
  maxDraftFt?: number;
  maxDraftIn?: number;
  class?: string;
  material?: string;
  fuelType?: string;
  propMaterial?: string;
  numberOfEngines?: number;
  numberOfCabins?: number;
  numberOfHeads?: number;

  [key: `engine${number}Hours`]: number | undefined;
  [key: `engine${number}Make`]: string | undefined;
  [key: `engine${number}Model`]: string | undefined;
  [key: `engine${number}TotalPower`]: number | undefined;
  [key: `engine${number}FuelType`]: string | undefined;
  [key: `engine${number}PropellerType`]: string | undefined;

  condition?: string;
  price?: number;
  city?: string;
  state?: string;
  zip?: string;
  name?: string;
  description?: string;
  moreDetails?: Array<{ title: string; description: string }>;
  embedUrl?: string;
  videoURL?: string;
  coverPhoto?: string | null;
  galleryPhotos?: string[];

  electricalEquipment?: string[];
  additionalEquipment?: string[];
  outsideEquipment?: string[];
  insideEquipment?: string[];
  coversEquipment?: string[];
  electronics?: string[];

  engineType?: string;
  propType?: string;
}

const createBoatRegistrationFormData = async (
  data: FormData,
): Promise<FormData> => {
  const formData = new FormData();

  const toNumber = (value: number | string | null | undefined): number => {
    if (typeof value === 'number') return value;
    if (value === null || value === undefined) return 0;
    return parseInt(String(value || '0')) || 0;
  };

  const toFloat = (value: number | string | null | undefined): number => {
    if (typeof value === 'number') return value;
    if (value === null || value === undefined) return 0;
    return parseFloat(String(value || '0')) || 0;
  };

  const boatInfo = {
    zip: data.zip || '',
    electricalEquipment: data.electricalEquipment || [],
    additionalEquipment: data.additionalEquipment || [],
    material: data.material || '',
    price: toFloat(data.price),
    outsideEquipment: data.outsideEquipment || [],
    model: data.model || '',
    propMaterial: data.propMaterial || '',
    city: data.city || '',
    name: data.name || '',
    buildYear: toNumber(data.buildYear),
    boatDimensions: {
      lengthFeet: toNumber(data.lengthFt),
      lengthInches: toNumber(data.lengthIn),
      beamFeet: toNumber(data.beamFt),
      beamInches: toNumber(data.beamIn),
      draftFeet: toNumber(data.maxDraftFt),
      draftInches: toNumber(data.maxDraftIn),
    },
    make: data.make || '',
    fuelType: data.fuelType || '',
    state: data.state || '',
    engines: Array.from(
      { length: toNumber(data.numberOfEngines) || 1 },
      (_, index) => {
        const engineNum = index + 1;
        return {
          hours: toNumber(
            (data as any)[`engine${engineNum}Hours`] as number | undefined,
          ),
          horsepower: toNumber(
            (data as any)[`engine${engineNum}TotalPower`] as number | undefined,
          ),
          make: ((data as any)[`engine${engineNum}Make`] as string) || '',
          model: ((data as any)[`engine${engineNum}Model`] as string) || '',
          fuelType:
            ((data as any)[`engine${engineNum}FuelType`] as string) || '',
          propellerType:
            ((data as any)[`engine${engineNum}PropellerType`] as string) || '',
        };
      },
    ),
    extraDetails:
      data.moreDetails?.map((detail) => ({
        key: detail.title,
        value: detail.description,
      })) || [],
    insideEquipment: data.insideEquipment || [],
    coversEquipment: data.coversEquipment || [],
    cabinsNumber: toNumber(data.numberOfCabins),
    videoURL: data.videoURL || data.embedUrl || '',
    electronics: data.electronics || [],
    boatClass: data.class || '',
    enginesNumber: toNumber(data.numberOfEngines),
    condition: data.condition || '',
    engineType: data.engineType || '',
    headsNumber: toNumber(data.numberOfHeads),
    description: data.description || '',
    propType: data.propType || '',
  };

  console.log('\n🔧 Engines Array:', boatInfo.engines);
  console.log(`📊 Number of Engines: ${boatInfo.enginesNumber}`);
  console.log(`✅ Engines in Array: ${boatInfo.engines.length}`);

  formData.append('boatInfo', JSON.stringify(boatInfo));

  if (data.coverPhoto) {
    if (
      typeof data.coverPhoto === 'string' &&
      data.coverPhoto.startsWith('data:')
    ) {
      const blob = dataURLtoBlob(data.coverPhoto);
      let file = new File([blob], 'cover.jpg', { type: 'image/jpeg' });
      file = await compressImage(file);
      formData.append('covers', file);
    } else if (data.coverPhoto && typeof data.coverPhoto !== 'string') {
      const compressedFile = await compressImage(data.coverPhoto as File);
      formData.append('covers', compressedFile);
    }
  }

  if (data.galleryPhotos && data.galleryPhotos.length > 0) {
    for (let index = 0; index < data.galleryPhotos.length; index++) {
      const photo = data.galleryPhotos[index];
      if (typeof photo === 'string' && photo.startsWith('data:')) {
        const blob = dataURLtoBlob(photo);
        let file = new File([blob], `gallery-${index}.jpg`, {
          type: 'image/jpeg',
        });
        file = await compressImage(file);
        formData.append('galleries', file);
      } else if (typeof photo !== 'string') {
        const compressedFile = await compressImage(photo as File);
        formData.append('galleries', compressedFile);
      }
    }
  }

  return formData as unknown as FormData;
};

const dataURLtoBlob = (dataURL: string): Blob => {
  const parts = dataURL.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const maxWidth = 1920;
        const maxHeight = 1920;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          } else {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Compression failed'));
            }
          },
          'image/jpeg',
          0.8,
        );
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

const AddListing = () => {
  const [createListing, { isLoading: isSubmitting }] =
    useCreateListingMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: Partial<FormData>) => {
    const finalData = data;

    const formDataToSubmit = await createBoatRegistrationFormData(finalData);

    console.log('========== BOAT REGISTRATION SUBMISSION ==========');
    console.log('\n📋 Complete Form Data:', finalData);
    console.log('\n📦 FormData Object:', formDataToSubmit);

    console.log('\n📝 FormData Entries:');
    for (const [key, value] of (formDataToSubmit as any).entries()) {
      if (value instanceof File) {
        console.log(
          `  ${key}: [File] ${value.name} (${(value.size / 1024).toFixed(2)} KB)`,
        );
      } else if (typeof value === 'string' && value.startsWith('{')) {
        try {
          console.log(`  ${key}:`, JSON.parse(value));
        } catch {
          console.log(`  ${key}:`, value);
        }
      } else {
        console.log(`  ${key}:`, value);
      }
    }

    console.log('\n==================================================\n');

    try {
      const result = await createListing(formDataToSubmit).unwrap();
      console.log('✅ Submission successful:', result);
      toast.success('Boat listing created successfully!');
      navigate('/listings');
    } catch (error: any) {
      console.error('❌ Submission failed:', error);
      toast.error(error?.data?.message || 'Failed to create listing');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-lg">
      <FirstListingPage onNext={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default AddListing;
