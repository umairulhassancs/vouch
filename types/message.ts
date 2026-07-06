export type MessageStatus = 'unread' | 'read' | 'replied' | 'resolved';
export type ThreadRole = 'finder' | 'owner';

export interface MessageThreadEntry {
  role: ThreadRole;
  text: string;
  sentAt: Date;
  read: boolean;
}

export interface Message {
  messageId: string;
  itemId: string;
  ownerId: string;
  scanId: string;
  createdAt: Date;
  status: MessageStatus;
  finderInfo: FinderInfo;
  thread: MessageThreadEntry[];
}

export interface FinderInfo {
  name: string;
  email: string;
  location: string;
}
