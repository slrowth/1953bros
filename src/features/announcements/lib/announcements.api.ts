import { createClient, type SupabaseBrowserClient } from '@/lib/supabase/client';
import type { Announcement, AnnouncementMetrics } from '../types';
import type { CreateAnnouncementInput, UpdateAnnouncementInput } from '../schema';
import {
  ANNOUNCEMENT_TABLE_NAME,
  ANNOUNCEMENT_VIEWS_TABLE_NAME,
  ANNOUNCEMENT_ACKNOWLEDGMENTS_TABLE_NAME,
} from '../constants';

const supabase = createClient();
const isSupabaseConfigured = Boolean(supabase);

const fallbackAnnouncements: Announcement[] = [
  {
    id: 'mock-1',
    title: '설 연휴 운영 안내',
    body: '설 연휴 동안 본사 물류 일정이 변경됩니다. 주문 마감일을 확인해주세요.',
    attachments: [],
    targetType: 'all',
    targetStores: [],
    targetGroups: [],
    status: 'published',
    createdBy: 'hq-admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    title: '신메뉴 시식 교육 일정',
    body: '직영점 교육장에서 신메뉴 시식 교육이 진행됩니다. 점주님들의 참여를 부탁드립니다.',
    attachments: [],
    targetType: 'store',
    targetStores: ['store-1', 'store-2'],
    targetGroups: [],
    status: 'published',
    createdBy: 'hq-education',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
];

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
  payload: CreateAnnouncementInput,
): Promise<Announcement> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      id: `mock-${Date.now()}`,
      title: payload.title,
      body: payload.body,
      attachments: payload.attachments ?? [],
      targetType: payload.targetType,
      targetStores: payload.targetStores ?? [],
      targetGroups: payload.targetGroups ?? [],
      status: payload.status,
      createdBy: 'mock-user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: payload.status === 'published' ? new Date().toISOString() : undefined,
    };
  }

  const insertData = {
    title: payload.title,
    body: payload.body,
    attachments: payload.attachments,
    target_type: payload.targetType,
    target_stores: payload.targetStores,
    target_groups: payload.targetGroups,
    status: payload.status,
  };

  const client = supabase as SupabaseBrowserClient;

  const { data, error } = await client
    .from(ANNOUNCEMENT_TABLE_NAME)
    .insert(insertData as any)
    .select()
    .single();

  if (error) {
    throw new Error(`공지사항 생성 실패: ${error.message}`);
  }

  return transformAnnouncement(data);
}

export async function getAnnouncements(): Promise<Announcement[]> {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackAnnouncements;
  }

  const client = supabase as SupabaseBrowserClient;

  const { data, error } = await client
    .from(ANNOUNCEMENT_TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`공지사항 조회 실패: ${error.message}`);
  }

  return (data ?? []).map(transformAnnouncement);
}

export async function getAnnouncementById(id: string): Promise<Announcement> {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackAnnouncements.find((item) => item.id === id) ?? fallbackAnnouncements[0];
  }

  const client = supabase as SupabaseBrowserClient;

  const { data, error } = await client
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
  payload: UpdateAnnouncementInput,
): Promise<Announcement> {
  if (!isSupabaseConfigured || !supabase) {
    const existing = fallbackAnnouncements.find((item) => item.id === id);
    if (!existing) {
      throw new Error('Mock announcement not found');
    }
    return {
      ...existing,
      ...payload,
      attachments: payload.attachments ?? existing.attachments,
      targetStores: payload.targetStores ?? existing.targetStores,
      targetGroups: payload.targetGroups ?? existing.targetGroups,
      updatedAt: new Date().toISOString(),
      publishedAt: payload.status === 'published' ? new Date().toISOString() : existing.publishedAt,
    };
  }

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
    if (payload.status === 'published') {
      updateData.published_at = new Date().toISOString();
    }
  }

  const client = supabase as SupabaseBrowserClient;

  const { data, error } = await client
    .from(ANNOUNCEMENT_TABLE_NAME)
    .update(updateData as any)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`공지사항 수정 실패: ${error.message}`);
  }

  return transformAnnouncement(data);
}

export async function deleteAnnouncement(id: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  const client = supabase as SupabaseBrowserClient;

  const { error } = await client
    .from(ANNOUNCEMENT_TABLE_NAME)
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`공지사항 삭제 실패: ${error.message}`);
  }
}

export async function getAnnouncementsByStore(storeId: string): Promise<Announcement[]> {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackAnnouncements.filter((item) => {
      if (item.targetType === 'all') return true;
      if (item.targetType === 'store') {
        return item.targetStores?.includes(storeId);
      }
      return false;
    });
  }

  const client = supabase as SupabaseBrowserClient;

  const { data, error } = await client
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
  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  const client = supabase as SupabaseBrowserClient;

  const { error } = await client
    .from(ANNOUNCEMENT_VIEWS_TABLE_NAME)
    .upsert(
      {
        announcement_id: announcementId,
        store_id: storeId,
        viewed_at: new Date().toISOString(),
      } as any,
      {
        onConflict: 'announcement_id,store_id',
      },
    );

  if (error) {
    throw new Error(`공지사항 조회 기록 실패: ${error.message}`);
  }
}

export async function acknowledgeAnnouncement(
  announcementId: string,
  storeId: string,
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  const client = supabase as SupabaseBrowserClient;

  const { error } = await client
    .from(ANNOUNCEMENT_ACKNOWLEDGMENTS_TABLE_NAME)
    .upsert(
      {
        announcement_id: announcementId,
        store_id: storeId,
        acknowledged_at: new Date().toISOString(),
      } as any,
      {
        onConflict: 'announcement_id,store_id',
      },
    );

  if (error) {
    throw new Error(`공지사항 확인 기록 실패: ${error.message}`);
  }
}

export async function getAnnouncementMetrics(
  announcementId: string,
): Promise<AnnouncementMetrics> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      announcementId,
      totalViews: 0,
      totalAcknowledgments: 0,
      viewsByStore: {},
      acknowledgmentsByStore: {},
    };
  }

  const client = supabase as SupabaseBrowserClient;

  const [viewsResult, acknowledgmentsResult] = await Promise.all([
    client
      .from(ANNOUNCEMENT_VIEWS_TABLE_NAME)
      .select('store_id, viewed_at')
      .eq('announcement_id', announcementId),
    client
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
