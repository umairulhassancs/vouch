export type NotificationType = 'scan' | 'message' | 'reply' | 'gps_alert';

export interface Notification {
  notificationId: string;
  ownerId: string;
  type: NotificationType;
  title: string;
  body: string;
  itemId: string;
  itemLabel: string;
  scanId: string;
  messageId: string;
  read: boolean;
  createdAt: Date;
  hasLocation?: boolean;
  locationName?: string;
  lat?: number;
  lng?: number;
}
