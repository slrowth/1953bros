export type AnnouncementStatus = 'draft' | 'published' | 'archived';

export type AnnouncementTargetType = 'all' | 'store' | 'group';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  attachments?: string[];
  targetType: AnnouncementTargetType;
  targetStores?: string[];
  targetGroups?: string[];
  status: AnnouncementStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface AnnouncementView {
  id: string;
  announcementId: string;
  storeId: string;
  viewedAt: string;
}

export interface AnnouncementAcknowledgment {
  id: string;
  announcementId: string;
  storeId: string;
  acknowledgedAt: string;
}

export interface AnnouncementMetrics {
  announcementId: string;
  totalViews: number;
  totalAcknowledgments: number;
  viewsByStore: Record<string, string>;
  acknowledgmentsByStore: Record<string, string>;
}

