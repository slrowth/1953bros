import { createClient } from '@/lib/supabase/client';
import type {
  Announcement,
  CreateAnnouncementPayload,
  UpdateAnnouncementPayload,
  AnnouncementMetrics,
} from '../types';
import {
  ANNOUNCEMENT_TABLE_NAME,
  ANNOUNCEMENT_VIEWS_TABLE_NAME,
  ANNOUNCEMENT_ACKNOWLEDGMENTS_TABLE_NAME,
} from '../constants';

const supabase = createClient();

function transformAnnouncement(data: any): Announcement {
  return {
    id: data.id,
    title: data.title,
    body: data.body,
    attachments: data.attachments || [],
    targetType: data.target_type || data.targetType,
    targetStores: data.target_stores || data.targetStores || [],
    targetGroups: data.target_groups || data.targetGroups || [],
    status: data.status,
    createdBy: data.created_by || data.createdBy,
    createdAt: data.created_at || data.createdAt,
    updatedAt: data.updated_at || data.updatedAt,
    publishedAt: data.published_at || data.publishedAt,
  };
}

export async function createAnnouncement(
  payload: CreateAnnouncementPayload,
): Promise<Announcement> {
  const insertData = {
    title: payload.title,
    body: payload.body,
    attachments: payload.attachments,
    target_type: payload.targetType,
    target_stores: payload.targetStores,
    target_groups: payload.targetGroups,
    status: payload.status,
  };

  const { data, error } = await supabase
    .from(ANNOUNCEMENT_TABLE_NAME)
    .insert(insertData)
    .select()
    .single();

  if (error) {
    throw new Error(`공지사항 생성 실패: ${error.message}`);
  }

  return transformAnnouncement(data);
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from(ANNOUNCEMENT_TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`공지사항 조회 실패: ${error.message}`);
  }

  return (data ?? []).map(transformAnnouncement);
}

export async function getAnnouncementById(id: string): Promise<Announcement> {
  const { data, error } = await supabase
    .from(ANNOUNCEMENT_TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`공지사항 조회 실패: ${error.message}`);
  }

  return transformAnnouncement(data);
}

export async function updateAnnouncement(
  id: string,
  payload: UpdateAnnouncementPayload,
): Promise<Announcement> {
  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (payload.title !== undefined) updateData.title = payload.title;
  if (payload.body !== undefined) updateData.body = payload.body;
  if (payload.attachments !== undefined) updateData.attachments = payload.attachments;
  if (payload.targetType !== undefined) updateData.target_type = payload.targetType;
  if (payload.targetStores !== undefined) updateData.target_stores = payload.targetStores;
  if (payload.targetGroups !== undefined) updateData.target_groups = payload.targetGroups;
  if (payload.status !== undefined) {
    updateData.status = payload.status;
    if (payload.status === 'published' && !payload.publishedAt) {
      updateData.published_at = new Date().toISOString();
    }
  }

  const { data, error } = await supabase
    .from(ANNOUNCEMENT_TABLE_NAME)
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`공지사항 수정 실패: ${error.message}`);
  }

  return transformAnnouncement(data);
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const { error } = await supabase
    .from(ANNOUNCEMENT_TABLE_NAME)
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`공지사항 삭제 실패: ${error.message}`);
  }
}

export async function getAnnouncementsByStore(storeId: string): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from(ANNOUNCEMENT_TABLE_NAME)
    .select('*')
    .or(`target_type.eq.all,target_stores.cs.{${storeId}}`)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    throw new Error(`공지사항 조회 실패: ${error.message}`);
  }

  return (data ?? []).map(transformAnnouncement);
}

export async function viewAnnouncement(
  announcementId: string,
  storeId: string,
): Promise<void> {
  const { error } = await supabase
    .from(ANNOUNCEMENT_VIEWS_TABLE_NAME)
    .upsert({
      announcement_id: announcementId,
      store_id: storeId,
      viewed_at: new Date().toISOString(),
    }, {
      onConflict: 'announcement_id,store_id',
    });

  if (error) {
    throw new Error(`공지사항 조회 기록 실패: ${error.message}`);
  }
}

export async function acknowledgeAnnouncement(
  announcementId: string,
  storeId: string,
): Promise<void> {
  const { error } = await supabase
    .from(ANNOUNCEMENT_ACKNOWLEDGMENTS_TABLE_NAME)
    .upsert({
      announcement_id: announcementId,
      store_id: storeId,
      acknowledged_at: new Date().toISOString(),
    }, {
      onConflict: 'announcement_id,store_id',
    });

  if (error) {
    throw new Error(`공지사항 확인 기록 실패: ${error.message}`);
  }
}

export async function getAnnouncementMetrics(
  announcementId: string,
): Promise<AnnouncementMetrics> {
  const [viewsResult, acknowledgmentsResult] = await Promise.all([
    supabase
      .from(ANNOUNCEMENT_VIEWS_TABLE_NAME)
      .select('store_id, viewed_at')
      .eq('announcement_id', announcementId),
    supabase
      .from(ANNOUNCEMENT_ACKNOWLEDGMENTS_TABLE_NAME)
      .select('store_id, acknowledged_at')
      .eq('announcement_id', announcementId),
  ]);

  if (viewsResult.error) {
    throw new Error(`조회 메트릭 조회 실패: ${viewsResult.error.message}`);
  }

  if (acknowledgmentsResult.error) {
    throw new Error(`확인 메트릭 조회 실패: ${acknowledgmentsResult.error.message}`);
  }

  const viewsByStore: Record<string, string> = {};
  viewsResult.data?.forEach((view) => {
    const storeId = view.store_id || (view as any).storeId;
    const viewedAt = view.viewed_at || (view as any).viewedAt;
    viewsByStore[storeId] = viewedAt;
  });

  const acknowledgmentsByStore: Record<string, string> = {};
  acknowledgmentsResult.data?.forEach((ack) => {
    const storeId = ack.store_id || (ack as any).storeId;
    const acknowledgedAt = ack.acknowledged_at || (ack as any).acknowledgedAt;
    acknowledgmentsByStore[storeId] = acknowledgedAt;
  });

  return {
    announcementId,
    totalViews: viewsResult.data?.length ?? 0,
    totalAcknowledgments: acknowledgmentsResult.data?.length ?? 0,
    viewsByStore,
    acknowledgmentsByStore,
  };
}
