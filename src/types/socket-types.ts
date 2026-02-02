// Socket.IO TypeScript Types & Interfaces

// Visitor Tracking
export interface VisitorCount {
  active: number;
}

export interface VisitorStats {
  active: number;
  todayVisitors: number;
  totalVisitors: number;
}

export interface AnalyticsOverview {
  totalVisitors: {
    value: number;
    growth: number;
  };
  pageViews: {
    value: number;
    growth: number;
  };
  avgSessionTime: {
    value: string; // "2:34" format
    seconds: number;
    growth: number;
  };
}

// Notifications
export interface Notification {
  notificationId: string;
  type: string;
  title: string;
  message: string;
  meta?: Record<string, unknown>;
  createdAt?: string;
  read?: boolean;
}

export interface NotificationSocketEvents {
  success: (data: { data: User }) => void;
  error: (error: { message: string }) => void;
  'boat:approved': (notification: Notification) => void;
  'boat:rejected': (notification: Notification) => void;
  'boat:new': (notification: Notification) => void;
  notification: (notification: Notification) => void;
}

// Featured Yachts
export type SiteType = 'FLORIDA' | 'JUPITER';

export interface FeaturedYacht {
  id: string;
  boatId: string;
  site: SiteType;
  featuredAt: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  boat: Boat;
}

export interface Boat {
  id: string;
  name: string;
  year: number;
  price: number;
  description: string;
  status: 'ACTIVE' | 'PENDING' | 'SOLD';
  images: BoatImage[];
  engines: BoatEngine[];
  user: User;
}

export interface BoatImage {
  id: string;
  file: {
    id: string;
    url: string;
    key: string;
    size: number;
    mimeType: string;
  };
}

export interface BoatEngine {
  id: string;
  make: string;
  model: string;
  horsepower: number;
  year: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// API Responses
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Visit tracking
export interface VisitStartPayload {
  page: string;
}

// Socket connection status
export interface SocketConnectionStatus {
  isConnected: boolean;
  error: string | null;
}
