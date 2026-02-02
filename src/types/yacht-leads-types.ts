// Yacht Leads types
export interface BoatInfo {
  id: string;
  name: string;
  listingId: string;
  price: number;
}

export interface FloridaLead {
  id: string;
  contactId: string;
  boatId: string;
  createdAt: string;
  updatedAt: string;
  boat: BoatInfo;
}

export interface YachtLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: 'FLORIDA' | 'JUPITER';
  type: string;
  listingId: string;
  listingSource: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  floridaLeads: FloridaLead[];
}

export interface YachtLeadsResponse {
  success: boolean;
  message: string;
  data: YachtLead[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}
