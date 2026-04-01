/* eslint-disable @typescript-eslint/no-explicit-any */
import FirstListingPage from '@/components/Listing/FirstListingPage';
import {
  useGetListingByIdQuery,
  useUpdateListingMutation,
} from '@/redux/features/listingManagement/listingManagement';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

const EditListing = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: listingData,
    isLoading: isLoadingListing,
    error,
  } = useGetListingByIdQuery(id!, {
    skip: !id,
  });

  console.log('🔍 Listing ID:', id);
  console.log('📦 Listing Data:', listingData);
  console.log('⚠️ Error:', error);
  console.log('⏳ Loading:', isLoadingListing);

  const [updateListing, { isLoading: isSubmitting }] =
    useUpdateListingMutation();

  const handleSubmit = async (data: any) => {
    if (!id) return;

    try {
      // Only send changed fields to backend
      const updateData: any = {};

      // Basic fields
      if (data.name) updateData.name = data.name;
      if (data.price) updateData.price = parseFloat(data.price);
      if (data.description) updateData.description = data.description;
      if (data.buildYear) updateData.buildYear = parseInt(data.buildYear);
      if (data.make) updateData.make = data.make;
      if (data.model) updateData.model = data.model;
      if (data.fuelType) updateData.fuelType = data.fuelType;
      if (data.class) updateData.class = data.class;
      if (data.material) updateData.material = data.material;
      if (data.condition) updateData.condition = data.condition;
      if (data.engineType) updateData.engineType = data.engineType;
      if (data.propType) updateData.propType = data.propType;
      if (data.propMaterial) updateData.propMaterial = data.propMaterial;

      // Dimensions
      if (data.lengthFt !== undefined || data.lengthIn !== undefined) {
        const ft = parseInt(data.lengthFt || 0);
        const inches = parseInt(data.lengthIn || 0);
        updateData.length = ft + inches / 12;
      }
      if (data.beamFt !== undefined || data.beamIn !== undefined) {
        const ft = parseInt(data.beamFt || 0);
        const inches = parseInt(data.beamIn || 0);
        updateData.beam = ft + inches / 12;
      }
      if (data.maxDraftFt !== undefined || data.maxDraftIn !== undefined) {
        const ft = parseInt(data.maxDraftFt || 0);
        const inches = parseInt(data.maxDraftIn || 0);
        updateData.draft = ft + inches / 12;
      }

      // Numbers
      if (data.numberOfEngines)
        updateData.enginesNumber = parseInt(data.numberOfEngines);
      if (data.numberOfCabins)
        updateData.cabinsNumber = parseInt(data.numberOfCabins);
      if (data.numberOfHeads)
        updateData.headsNumber = parseInt(data.numberOfHeads);

      // Engines array - convert from new format to backend format
      // IMPORTANT: Always send engines array to properly update engine count
      if (data.engines && Array.isArray(data.engines)) {
        const currentListing = listingData?.data || listingData;
        const existingEngines: any[] = Array.isArray(currentListing?.engines)
          ? currentListing.engines
          : [];

        updateData.engines = data.engines.map((engine: any, index: number) => {
          const existingId = existingEngines?.[index]?.id;
          const payloadEngine: any = {
            hours: parseInt(engine.hours || 0),
            horsepower: parseInt(engine.totalPower || 0),
            make: engine.make || '',
            model: engine.model || '',
            fuelType: engine.fuelType || '',
            propellerType: engine.propellerType || '',
          };

          // Backend validates `engines[n].id` as UUID on update.
          // Only include id if we actually have one from the current listing.
          if (typeof existingId === 'string' && existingId.trim() !== '') {
            payloadEngine.id = existingId;
          }

          return payloadEngine;
        });
        // Update enginesNumber to match actual engines array length
        updateData.enginesNumber = data.engines.length;
      }

      // Arrays
      if (data.electronics) updateData.electronics = data.electronics;
      if (data.insideEquipment)
        updateData.insideEquipment = data.insideEquipment;
      if (data.outsideEquipment)
        updateData.outsideEquipment = data.outsideEquipment;
      if (data.electricalEquipment)
        updateData.electricalEquipment = data.electricalEquipment;
      if (data.coversEquipment) updateData.covers = data.coversEquipment;
      if (data.additionalEquipment)
        updateData.additionalEquipment = data.additionalEquipment;

      // Location
      if (data.city) updateData.city = data.city;
      if (data.state) updateData.state = data.state;
      if (data.zip) updateData.zip = data.zip;

      // Extra details
      if (data.moreDetails && data.moreDetails.length > 0) {
        updateData.extraDetails = data.moreDetails
          .filter((detail: any) => detail.title || detail.description)
          .map((detail: any) => ({
            key: detail.title,
            value: detail.description,
          }));
      }

      // Video URL
      if (data.videoURL || data.embedUrl) {
        updateData.videoURL = data.videoURL || data.embedUrl;
      }

      console.log('📝 Update Data:', updateData);

      const result = await updateListing({ id, ...updateData }).unwrap();
      console.log('✅ Update successful:', result);
      toast.success('Listing updated successfully!');
      navigate('/listings');
    } catch (error: any) {
      console.error('❌ Update failed:', error);
      
      const errorMessage = 
        error?.data?.message || 
        error?.data?.error || 
        error?.message || 
        'Failed to update listing';
      
      toast.error(errorMessage);
    }
  };

  if (isLoadingListing) {
    return (
      <div className="min-h-screen bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listing data...</p>
        </div>
      </div>
    );
  }

  if (!listingData) {
    return (
      <div className="min-h-screen bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium">Listing not found</p>
          <p className="text-sm text-gray-500 mt-2">ID: {id}</p>
          {error && (
            <p className="text-sm text-red-500 mt-2">
              Error: {JSON.stringify(error)}
            </p>
          )}
          <button
            onClick={() => navigate('/listings')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  // Transform backend data to form format
  const listing = listingData.data || listingData;
  console.log('🎯 Final Listing Object:', listing);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium">Listing data is empty</p>
          <button
            onClick={() => navigate('/listings')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  // Handle extraDetails - can be array or object
  const parseExtraDetails = () => {
    if (!listing.extraDetails) return [{ title: '', description: '' }];

    if (Array.isArray(listing.extraDetails)) {
      return listing.extraDetails.map((detail: any) => ({
        title: detail.key || '',
        description: detail.value || '',
      }));
    }

    // If it's an object, convert to array
    if (typeof listing.extraDetails === 'object') {
      return Object.entries(listing.extraDetails).map(([key, value]) => ({
        title: key,
        description: String(value),
      }));
    }

    return [{ title: '', description: '' }];
  };

  const initialData = {
    name: listing.name || '',
    price: listing.price || 0,
    description: listing.description || '',
    buildYear: listing.buildYear || listing.year || new Date().getFullYear(),
    make: listing.make || '',
    model: listing.model || '',
    fuelType: listing.fuelType || '',
    class: listing.class || '',
    material: listing.material || '',
    condition: listing.condition || '',
    engineType: listing.engineType || '',
    propType: listing.propType || '',
    propMaterial: listing.propMaterial || '',

    // Dimensions (convert back to feet and inches)
    lengthFt: Math.floor(listing.length || 0),
    lengthIn: Math.round(((listing.length || 0) % 1) * 12),
    beamFt: Math.floor(listing.beam || 0),
    beamIn: Math.round(((listing.beam || 0) % 1) * 12),
    maxDraftFt: Math.floor(listing.draft || listing.maxDraft || 0),
    maxDraftIn: Math.round(((listing.draft || listing.maxDraft || 0) % 1) * 12),

    numberOfEngines: listing.enginesNumber || listing.numberOfEngines || 1,
    numberOfCabins: listing.cabinsNumber || listing.numberOfCabins || 0,
    numberOfHeads: listing.headsNumber || listing.numberOfHeads || 0,

    // Engine data - map from engines array
    ...(listing.engines && listing.engines.length > 0
      ? listing.engines.reduce((acc: any, engine: any, index: number) => {
          const engineNum = index + 1;
          acc[`engine${engineNum}Make`] = engine.make || '';
          acc[`engine${engineNum}Model`] = engine.model || '';
          acc[`engine${engineNum}Hours`] = engine.hours || 0;
          // The form expects `engine{n}TotalPower`, not `engine{n}Horsepower`.
          acc[`engine${engineNum}TotalPower`] = engine.horsepower || 0;
          acc[`engine${engineNum}FuelType`] = engine.fuelType || '';
          acc[`engine${engineNum}PropellerType`] = engine.propellerType || '';
          return acc;
        }, {})
      : {}),

    electronics: listing.electronics || [],
    insideEquipment: listing.insideEquipment || [],
    outsideEquipment: listing.outsideEquipment || [],
    electricalEquipment: listing.electricalEquipment || [],
    coversEquipment: listing.covers || listing.coversEquipment || [],
    additionalEquipment: listing.additionalEquipment || [],

    city: listing.city || '',
    state: listing.state || '',
    zip: listing.zip || '',

    moreDetails: parseExtraDetails(),

    videoURL: listing.videoURL || listing.embedUrl || '',
    embedUrl: listing.embedUrl || listing.videoURL || '',

    // Add cover photo and gallery if available
    coverPhoto: listing.coverImages?.[0]?.url || null,
    galleryPhotos: (listing.galleryImages || [])
      .map((img: any) => img.url)
      .filter(Boolean),
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-lg">
      <div className="p-4 mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/listings')}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Edit Listing</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update listing information for {listing.name}
          </p>
        </div>
      </div>
      <FirstListingPage
        onNext={handleSubmit}
        isSubmitting={isSubmitting}
        initialData={initialData}
        isEditMode={true}
      />
    </div>
  );
};

export default EditListing;
