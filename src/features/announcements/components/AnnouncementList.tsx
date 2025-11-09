'use client';

import { useAnnouncements, useStoreAnnouncements } from '../hooks/useAnnouncements';
import { AnnouncementItem } from './AnnouncementItem';
import type { Announcement } from '../types';

interface AnnouncementListProps {
  storeId?: string;
  onItemClick?: (announcement: Announcement) => void;
}

export function AnnouncementList({ storeId, onItemClick }: AnnouncementListProps) {
  const { data: allAnnouncements, isLoading: isLoadingAll } = useAnnouncements();
  const { data: storeAnnouncements, isLoading: isLoadingStore } = useStoreAnnouncements(
    storeId || '',
  );

  const announcements = storeId ? storeAnnouncements : allAnnouncements;
  const isLoading = storeId ? isLoadingStore : isLoadingAll;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">공지사항이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <AnnouncementItem
          key={announcement.id}
          announcement={announcement}
          storeId={storeId}
          showActions={!!storeId}
          onView={onItemClick}
        />
      ))}
    </div>
  );
}

