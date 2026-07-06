export interface VouchUser {
  uid: string;
  email: string;
  displayName: string;
  phone: string;
  photoURL: string;
  createdAt: Date;
  updatedAt: Date;
  plan: 'free' | 'standard' | 'premium' | 'business';
  planExpiresAt: Date | null;
  fcmTokens: string[];
  notifyPush: boolean;
  notifyEmail: boolean;
  notifySMS: boolean;
  itemCount: number;
  emailVerified: boolean;
  emergencyName?: string;
  emergencyPhone?: string;
}
