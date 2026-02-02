import z from 'zod';

// Step 1 - Boat Information Schema
export const firstStepSchema = z.object({
  buildYear: z.coerce
    .number()
    .min(1900, 'Invalid year')
    .max(new Date().getFullYear() + 1, 'Invalid year'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  lengthFt: z.coerce.number().min(0, 'Length feet must be positive'),
  lengthIn: z.coerce
    .number()
    .min(0, 'Length inches must be 0-12')
    .max(12, 'Inches cannot exceed 12'),
  beamFt: z.coerce.number().min(0, 'Beam feet must be positive'),
  beamIn: z.coerce
    .number()
    .min(0, 'Beam inches must be 0-12')
    .max(12, 'Inches cannot exceed 12'),
  maxDraftFt: z.coerce.number().min(0, 'Draft feet must be positive'),
  maxDraftIn: z.coerce
    .number()
    .min(0, 'Draft inches must be 0-12')
    .max(12, 'Inches cannot exceed 12'),
  class: z.string().min(1, 'Class is required'),
  material: z.string().min(1, 'Material is required'),
  fuelType: z.string().min(1, 'Fuel type is required'),
  propMaterial: z.string().min(1, 'Propeller material is required'),
  numberOfEngines: z.coerce
    .number()
    .min(1, 'Number of engines is required')
    .max(10, 'Maximum 10 engines'),
  numberOfCabins: z.coerce
    .number()
    .min(0, 'Number of cabins must be positive')
    .max(50, 'Maximum 50 cabins'),
  numberOfHeads: z.coerce
    .number()
    .min(0, 'Number of heads must be positive')
    .max(50, 'Maximum 50 heads'),
  engine1Hours: z.coerce.number().min(0, 'Hours must be positive'),
  engine1Make: z.string().min(1, 'Engine make is required'),
  engine1Model: z.string().min(1, 'Engine model is required'),
  engine1TotalPower: z.coerce.number().min(0, 'Total power must be positive'),
  engine1FuelType: z.string().min(1, 'Engine fuel type is required'),
  engine1PropellerType: z.string().min(1, 'Propeller type is required'),
  condition: z.string().min(1, 'Condition is required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  embedUrl: z.string().optional(),
});

// Step 2 - Seller Information Schema
export const secondStepSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  country: z.string().min(1, 'Country is required'),
  sellerCity: z.string().min(1, 'City is required'),
  sellerState: z.string().min(1, 'State is required'),
  sellerZip: z.string().min(1, 'Zip code is required'),
});
