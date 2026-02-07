export interface SellerData {
  sellerId: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string;
  boatsCount: number;
  totalSalesValue: number;
}

export interface SellerResponse {
  page: number;
  limit: number;
  total: number;
  items: SellerData[];
}

export interface SellerDetailResponse {
  id: string;
  email: string;
  username: string;
  password: string;
  googleId: string | null;
  phone: string;
  name: string;
  avatarUrl: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  isLoggedIn: boolean;
  lastLoginAt: string | null;
  lastLogoutAt: string | null;
  lastActiveAt: string | null;
  isVerified: boolean;
  otp: string | null;
  otpExpiresAt: string | null;
  otpType: string | null;
  stripeCustomerId: string;
  currentPlanId: string;
  currentPlanStatus: string;
  createdAt: string;
  updatedAt: string;
}
