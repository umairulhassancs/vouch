export type ProductType = 'sticker' | 'classic' | 'whistle' | 'gps';
export type ItemStatus = 'safe' | 'lost';

export interface Item {
  itemId: string;
  ownerId: string;
  label: string;
  productType: ProductType;
  status: ItemStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  scanCount: number;
  lastScannedAt: Date;
  lastLocation: GeoLocation;
  finderSettings: FinderSettings;
  gps?: GPSData;
}

export interface FinderSettings {
  showFirstName: boolean;
  allowCall: boolean;
  showEmergency: boolean;
  emergencyName: string;
  emergencyPhone: string;
  customMessage: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export interface GPSData {
  lat: number;
  lng: number;
  accuracy: number;
  updatedAt: Date;
  isOnline: boolean;
}

export interface Scan {
  scanId: string;
  itemId: string;
  ownerId: string;
  scannedAt: Date;
  location: ScanLocation;
  device: ScanDevice;
  hasMessage: boolean;
  messageId: string;
  notified: boolean;
}

export interface ScanLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
  accuracy: number;
  permissionGranted: boolean;
}

export interface ScanDevice {
  userAgent: string;
  platform: string;
  browser: string;
}
