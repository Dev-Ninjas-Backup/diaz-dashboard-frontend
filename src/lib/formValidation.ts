import z from 'zod';

// Engine schema for dynamic engines
export const engineSchema = z.object({
  hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  make: z.string().min(1, 'Engine make is required'),
  model: z.string().optional(),
  totalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  fuelType: z.string().optional(),
  propellerType: z.string().optional(),
});

// Step 1 - Boat Information Schema (matching Florida project)
export const firstStepSchema = z.object({
  buildYear: z.coerce
    .number()
    .min(1900, 'Invalid year')
    .max(new Date().getFullYear() + 1, 'Invalid year'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  name: z.string().min(1, 'Boat name is required'),
  
  // Dimensions - lengthFeet and lengthInches required, others optional
  lengthFt: z.coerce.number().min(0, 'Length feet must be positive'),
  lengthIn: z.coerce
    .number()
    .min(0, 'Length inches must be 0-12')
    .max(12, 'Inches cannot exceed 12'),
  beamFt: z.coerce.number().min(0, 'Beam feet must be positive').optional(),
  beamIn: z.coerce
    .number()
    .min(0, 'Beam inches must be 0-12')
    .max(12, 'Inches cannot exceed 12')
    .optional(),
  maxDraftFt: z.coerce.number().min(0, 'Draft feet must be positive').optional(),
  maxDraftIn: z.coerce
    .number()
    .min(0, 'Draft inches must be 0-12')
    .max(12, 'Inches cannot exceed 12')
    .optional(),
  
  class: z.string().min(1, 'Class is required'),
  material: z.string().optional(),
  fuelType: z.string().optional(),
  propMaterial: z.string().optional(),
  // Optional overall engine / propeller types
  engineType: z.string().optional(),
  propType: z.string().optional(),
  
  numberOfEngines: z.coerce.number().min(1).max(10).optional(),
  numberOfCabins: z.coerce.number().min(0).max(50).optional(),
  numberOfHeads: z.coerce.number().min(0).max(50).optional(),
  engine1Hours: z.coerce.number().min(0).optional(),
  engine1Make: z.string().min(1, 'Engine make is required'),
  engine1Model: z.string().optional(),
  engine1TotalPower: z.coerce.number().min(0).optional(),
  engine1FuelType: z.string().optional(),
  engine1PropellerType: z.string().optional(),

  // Engine fields for engine2..engine10.
  // These exist in the schema so `zodResolver` keeps them in the form data,
  // but they are fully optional so they never block submit.
  engine2Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine2Make: z.string().optional(),
  engine2Model: z.string().optional(),
  engine2TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine2FuelType: z.string().optional(),
  engine2PropellerType: z.string().optional(),

  engine3Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine3Make: z.string().optional(),
  engine3Model: z.string().optional(),
  engine3TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine3FuelType: z.string().optional(),
  engine3PropellerType: z.string().optional(),

  engine4Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine4Make: z.string().optional(),
  engine4Model: z.string().optional(),
  engine4TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine4FuelType: z.string().optional(),
  engine4PropellerType: z.string().optional(),

  engine5Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine5Make: z.string().optional(),
  engine5Model: z.string().optional(),
  engine5TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine5FuelType: z.string().optional(),
  engine5PropellerType: z.string().optional(),

  engine6Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine6Make: z.string().optional(),
  engine6Model: z.string().optional(),
  engine6TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine6FuelType: z.string().optional(),
  engine6PropellerType: z.string().optional(),

  engine7Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine7Make: z.string().optional(),
  engine7Model: z.string().optional(),
  engine7TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine7FuelType: z.string().optional(),
  engine7PropellerType: z.string().optional(),

  engine8Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine8Make: z.string().optional(),
  engine8Model: z.string().optional(),
  engine8TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine8FuelType: z.string().optional(),
  engine8PropellerType: z.string().optional(),

  engine9Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine9Make: z.string().optional(),
  engine9Model: z.string().optional(),
  engine9TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine9FuelType: z.string().optional(),
  engine9PropellerType: z.string().optional(),

  engine10Hours: z.coerce.number().min(0, 'Hours must be positive').optional(),
  engine10Make: z.string().optional(),
  engine10Model: z.string().optional(),
  engine10TotalPower: z.coerce.number().min(0, 'Total power must be positive').optional(),
  engine10FuelType: z.string().optional(),
  engine10PropellerType: z.string().optional(),

  condition: z.string().min(1, 'Condition is required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required'),
  description: z.string().min(1, 'Description is required'),
  // Allow any string or empty for existing data that may not be a strict URL
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
