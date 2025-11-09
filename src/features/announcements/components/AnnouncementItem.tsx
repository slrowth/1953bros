'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Eye } from 'lucide-react';
import type { Announcement } from '../types';
import { ANNOUNCEMENT_STATUS, ANNOUNCEMENT_TARGET_TYPE } from '../constants';
import { useViewAnnouncement, useAcknowledgeAnnouncement } from '../hooks/useAcknowledgeAnnouncement';

interface AnnouncementItemProps {
  announcement: Announcement;
  storeId?: string;
  showActions?: boolean;
  onView?: (announcement: Announcement) => void;
}

export function AnnouncementItem({
  announcement,
  storeId,
  showActions = false,
  onView,
}: AnnouncementItemProps) {
  const viewMutation = useViewAnnouncement();
  const acknowledgeMutation = useAcknowledgeAnnouncement();

  const handleView = () => {
    if (storeId) {
      viewMutation.mutate({
        announcementId: announcement.id,
        storeId,
      });
    }
    onView?.(announcement);
  };

  const handleAcknowledge = () => {
    if (storeId) {
      acknowledgeMutation.mutate({
        announcementId: announcement.id,
        storeId,
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case ANNOUNCEMENT_STATUS.PUBLISHED:
        return 'default';
      case ANNOUNCEMENT_STATUS.DRAFT:
        return 'secondary';
      case ANNOUNCEMENT_STATUS.ARCHIVED:
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getTargetTypeLabel = (targetType: string) => {
    switch (targetType) {
      case ANNOUNCEMENT_TARGET_TYPE.ALL:
        return '전체 매장';
      case ANNOUNCEMENT_TARGET_TYPE.STORE:
        return '특정 매장';
      case ANNOUNCEMENT_TARGET_TYPE.GROUP:
        return '매장 그룹';
      default:
        return targetType;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{announcement.title}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={getStatusBadgeVariant(announcement.status)}>
              {announcement.status === ANNOUNCEMENT_STATUS.PUBLISHED
                ? '게시됨'
                : announcement.status === ANNOUNCEMENT_STATUS.DRAFT
                  ? '임시저장'
                  : '보관됨'}
            </Badge>
            <Badge variant="outline">{getTargetTypeLabel(announcement.targetType)}</Badge>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {announcement.publishedAt
            ? format(new Date(announcement.publishedAt), 'yyyy년 MM월 dd일 HH:mm', {
                locale: ko,
              })
            : format(new Date(announcement.createdAt), 'yyyy년 MM월 dd일 HH:mm', {
                locale: ko,
              })}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground line-clamp-3">{announcement.body}</p>
        {announcement.attachments && announcement.attachments.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">첨부파일:</p>
            <ul className="list-disc list-inside text-xs text-muted-foreground">
              {announcement.attachments.map((attachment, index) => (
                <li key={index}>{attachment}</li>
              ))}
            </ul>
          </div>
        )}
        {showActions && storeId && (
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" onClick={handleView}>
              <Eye className="h-4 w-4 mr-2" />
              조회
            </Button>
            <Button variant="default" size="sm" onClick={handleAcknowledge}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              확인
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

