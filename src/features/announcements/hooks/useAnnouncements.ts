'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAnnouncementsByStore,
  type CreateAnnouncementPayload,
  type UpdateAnnouncementPayload,
} from '../lib/announcements.api';
import type { Announcement } from '../types';

export function useAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: getAnnouncements,
  });
}

export function useAnnouncement(id: string) {
  return useQuery({
    queryKey: ['announcements', id],
    queryFn: () => getAnnouncementById(id),
    enabled: !!id,
  });
}

export function useStoreAnnouncements(storeId: string) {
  return useQuery({
    queryKey: ['announcements', 'store', storeId],
    queryFn: () => getAnnouncementsByStore(storeId),
    enabled: !!storeId,
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAnnouncementPayload) => createAnnouncement(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAnnouncementPayload }) =>
      updateAnnouncement(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcements', data.id] });
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAnnouncement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

