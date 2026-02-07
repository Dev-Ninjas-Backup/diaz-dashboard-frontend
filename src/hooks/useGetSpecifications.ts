/**
 * Custom Hook for Fetching Boat Specifications using Redux RTK Query
 * Handles API calls with search, pagination, and caching
 */

import { useEffect, useState } from 'react';
import { useLazyGetSpecificationsQuery } from '@/redux/features/boatSpecifications/boatSpecificationsApi';

export interface SpecificationParams {
  type: string;
  search?: string;
  limit?: number;
}

interface UseGetSpecificationsOptions {
  enabled?: boolean;
  initialParams?: SpecificationParams;
}

interface UseGetSpecificationsReturn {
  data: string[] | null;
  loading: boolean;
  error: Error | null;
  refetch: (params?: SpecificationParams) => Promise<void>;
  setParams: (params: SpecificationParams) => void;
}

export const useGetSpecifications = (
  options: UseGetSpecificationsOptions = {},
): UseGetSpecificationsReturn => {
  const { enabled = true, initialParams } = options;

  const [params, setParams] = useState<SpecificationParams | undefined>(
    initialParams,
  );

  // Use RTK Query lazy query
  const [trigger, { data, isLoading, error, isFetching }] =
    useLazyGetSpecificationsQuery();

  // Fetch data when params change
  useEffect(() => {
    if (enabled && params) {
      console.log('🚀 useGetSpecifications - Fetching:', params);
      trigger(params)
        .then((result) => {
          console.log('✅ useGetSpecifications - Success:', result);
        })
        .catch((err) => {
          console.error('❌ useGetSpecifications - Error:', err);
        });
    }
  }, [enabled, params, trigger]);

  const refetch = async (newParams?: SpecificationParams) => {
    const queryParams = newParams || params;
    if (queryParams) {
      setParams(queryParams);
      await trigger(queryParams);
    }
  };

  return {
    data: data?.items || null,
    loading: isLoading || isFetching,
    error: error ? new Error(JSON.stringify(error)) : null,
    refetch,
    setParams,
  };
};
