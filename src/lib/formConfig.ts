// Form field configuration types and data

export const YEAR_OPTIONS = Array.from({ length: 50 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

export const MAKE_OPTIONS = [
  { value: 'Viking', label: 'Viking' },
  { value: 'Hatteras', label: 'Hatteras' },
  { value: 'SeaVee', label: 'SeaVee' },
];

export const MODEL_OPTIONS = [{ value: '80 Enclosed', label: '80 Enclosed' }];

export const CLASS_OPTIONS = [
  { value: 'Power', label: 'Power' },
  { value: 'Sail', label: 'Sail' },
];

export const MATERIAL_OPTIONS = [
  { value: 'Fiberglass', label: 'Fiberglass' },
  { value: 'Aluminum', label: 'Aluminum' },
];

export const FUEL_TYPE_OPTIONS = [
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Gas', label: 'Gas' },
];

export const ENGINE_COUNT_OPTIONS = [
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
];

export const CABIN_COUNT_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];

export const HEAD_COUNT_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

export const CONDITION_OPTIONS = [
  { value: 'New', label: 'New' },
  { value: 'Used', label: 'Used' },
];

export const COUNTRY_OPTIONS = [
  { value: 'USA', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Mexico', label: 'Mexico' },
];
