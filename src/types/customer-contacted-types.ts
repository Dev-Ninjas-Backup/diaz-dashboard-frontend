// Customer Contacted types
export interface CustomerContacted {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  boatInformation: string;
  comments: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerContactedResponse {
  success: boolean;
  message: string;
  data: CustomerContacted[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}
