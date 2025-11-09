export const ANNOUNCEMENT_NOTIFICATION_CHANNEL = 'announcements';

export const ANNOUNCEMENT_EVENTS = {
  CREATED: 'announcement:created',
  UPDATED: 'announcement:updated',
  PUBLISHED: 'announcement:published',
  VIEWED: 'announcement:viewed',
  ACKNOWLEDGED: 'announcement:acknowledged',
} as const;

export const ANNOUNCEMENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const ANNOUNCEMENT_TARGET_TYPE = {
  ALL: 'all',
  STORE: 'store',
  GROUP: 'group',
} as const;

export const ANNOUNCEMENT_TABLE_NAME = 'announcements';
export const ANNOUNCEMENT_VIEWS_TABLE_NAME = 'announcement_views';
export const ANNOUNCEMENT_ACKNOWLEDGMENTS_TABLE_NAME = 'announcement_acknowledgments';

