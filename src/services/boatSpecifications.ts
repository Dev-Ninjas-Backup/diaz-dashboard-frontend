/**
 * Boat Specifications API Service
 * Fetches dynamic form field options from the backend
 * Matches the implementation from diaz-florida-yacht-frontend
 */

const API_BASE_URL = 'http://localhost:3000';

export interface SpecificationParams {
  type: string;
  search?: string;
  limit?: number;
}

export interface SpecificationResponse {
  items: string[];
  total?: number;
}

/**
 * Fetch specifications from API
 * Endpoint: GET /boats/specification/list
 * @param params - Type (MAKE, MODEL, CLASS, etc.), search query, and limit
 * @returns Array of specification values
 */
export const getSpecifications = async ({
  type,
  search = '',
  limit = 20,
}: SpecificationParams): Promise<SpecificationResponse> => {
  try {
    // Build query string - matching Florida yacht implementation
    const queryParams = new URLSearchParams({
      type,
      search,
      limit: limit.toString(),
    });

    const url = `${API_BASE_URL}/boats/specification/list?${queryParams}`;

    console.log('🔍 Fetching specifications:', { url, type, search, limit });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log('✅ Specifications received:', data);

    // Handle different response formats from the API
    if (data.items && Array.isArray(data.items)) {
      return data;
    } else if (Array.isArray(data)) {
      return { items: data };
    } else if (data.data && Array.isArray(data.data)) {
      return { items: data.data, total: data.total };
    } else {
      console.warn('⚠️ Unexpected response format:', data);
      return { items: [] };
    }
  } catch (error) {
    console.error('❌ Error fetching specifications:', error);
    throw error;
  }
};
