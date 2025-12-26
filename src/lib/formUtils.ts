/* eslint-disable @typescript-eslint/no-explicit-any */
// Utility functions for form data processing

export const formatMeasurement = (
  ft?: string,
  inches?: string,
): string | undefined => {
  if (!ft && !inches) return undefined;

  const ftPart = ft ? `${ft}ft` : '';
  const inPart = inches ? `${inches}in` : '';

  return `${ftPart} ${inPart}`.trim();
};

export const combineMeasurements = (data: any) => {
  return {
    ...data,
    length: formatMeasurement(data.lengthFt, data.lengthIn),
    beamSize: formatMeasurement(data.beamFt, data.beamIn),
    maxDraft: formatMeasurement(data.maxDraftFt, data.maxDraftIn),
  };
};
