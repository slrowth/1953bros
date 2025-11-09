'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { AnnouncementList } from '@/features/announcements/components/AnnouncementList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AnnouncementsPage() {
  const router = useRouter();
  const [userRole] = useState<'HQ' | 'Store'>('HQ');
  const storeId = userRole === 'Store' ? 'store-dummy-id' : undefined;

  return (
    <AppLayout userRole={userRole} userName={userRole === 'HQ' ? '본사 관리자' : '매장 점주'}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">공지사항</h1>
            <p className="text-muted-foreground mt-2">
              {userRole === 'HQ'
                ? '공지사항을 작성하고 관리하세요'
                : '공지사항을 확인하세요'}
            </p>
          </div>
          {userRole === 'HQ' && (
            <Button onClick={() => router.push('/announcements/new')}>
              <Plus className="h-4 w-4 mr-2" />
              새 공지사항
            </Button>
          )}
        </div>

        <AnnouncementList storeId={storeId} />
      </div>
    </AppLayout>
  );
}

