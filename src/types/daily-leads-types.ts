export interface Lead {
  name: string | null;
  email: string | null;
  product: string;
}

export interface DailyLeadsResponse {
  status: string;
  total_leads: number;
  leads: Lead[];
}
