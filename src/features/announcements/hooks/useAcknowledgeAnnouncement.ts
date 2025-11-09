'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  viewAnnouncement,
  acknowledgeAnnouncement,
  getAnnouncementMetrics,
} from '../lib/announcements.api';

export function useViewAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ announcementId, storeId }: { announcementId: string; storeId: string }) =>
      viewAnnouncement(announcementId, storeId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['announcements', variables.announcementId, 'metrics'],
      });
    },
  });
}

export function useAcknowledgeAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ announcementId, storeId }: { announcementId: string; storeId: string }) =>
      acknowledgeAnnouncement(announcementId, storeId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['announcements', variables.announcementId, 'metrics'],
      });
      queryClient.invalidateQueries({
        queryKey: ['announcements', 'store', variables.storeId],
      });
    },
  });
}

export function useAnnouncementMetrics(announcementId: string) {
  return useQuery({
    queryKey: ['announcements', announcementId, 'metrics'],
    queryFn: () => getAnnouncementMetrics(announcementId),
    enabled: !!announcementId,
  });
}

