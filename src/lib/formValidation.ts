import z from 'zod';

export const firstStepSchema = z.object({
  buildYear: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  lengthFt: z.string().optional(),
  lengthIn: z.string().optional(),
  beamFt: z.string().optional(),
  beamIn: z.string().optional(),
  maxDraftFt: z.string().optional(),
  maxDraftIn: z.string().optional(),
  class: z.string().optional(),
  material: z.string().optional(),
  fuelType: z.string().optional(),
  numberOfEngines: z.string().optional(),
  numberOfCabins: z.string().optional(),
  numberOfHeads: z.string().optional(),
  engine1Hours: z.string().optional(),
  engine1Make: z.string().optional(),
  engine1Model: z.string().optional(),
  engine1TotalPower: z.string().optional(),
  engine1FuelType: z.string().optional(),
  engine1PropellerType: z.string().optional(),
  condition: z.string().optional(),
  price: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  embedUrl: z.string().optional(),
});

export const secondStepSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    contactNumber: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    country: z.string().optional(),
    sellerCity: z.string().optional(),
    sellerState: z.string().optional(),
    sellerZip: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
