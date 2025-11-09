# 공지사항 (Announcements) 기능

본사 관리자가 공지사항을 작성하고 게시하며, 매장에서 공지사항을 조회하고 확인할 수 있는 기능입니다.

## 기능 개요

### 본사 관리자
- 공지사항 작성 (제목, 내용, 첨부파일)
- 대상 선택 (전체 매장, 특정 매장, 매장 그룹)
- 공지사항 게시/임시저장/보관
- 공지사항 수정 및 삭제
- 조회 및 확인 메트릭 확인

### 매장 사용자
- 공지사항 목록 조회
- 공지사항 상세 조회
- 공지사항 확인 처리
- 실시간 알림 수신

## 디렉토리 구조

```
/features/announcements/
├── components/
│   ├── AnnouncementForm.tsx      # 공지사항 작성/수정 폼
│   ├── AnnouncementList.tsx      # 공지사항 목록
│   └── AnnouncementItem.tsx      # 공지사항 아이템
├── hooks/
│   ├── useAnnouncements.ts       # 공지사항 CRUD 훅
│   └── useAcknowledgeAnnouncement.ts  # 조회/확인 훅
├── lib/
│   └── announcements.api.ts      # Supabase API 호출 함수
├── schema.ts                     # Zod 스키마 정의
├── types.ts                      # TypeScript 타입 정의
├── constants.ts                  # 상수 정의
└── README.md                     # 이 파일
```

## 사용 방법

### 1. 공지사항 목록 조회

```tsx
import { AnnouncementList } from '@/features/announcements/components/AnnouncementList';

function AnnouncementsPage() {
  return <AnnouncementList storeId="store-uuid" />;
}
```

### 2. 공지사항 작성

```tsx
import { AnnouncementForm } from '@/features/announcements/components/AnnouncementForm';

function CreateAnnouncementPage() {
  return (
    <AnnouncementForm
      onSuccess={() => {
        // 성공 처리
      }}
      onCancel={() => {
        // 취소 처리
      }}
    />
  );
}
```

### 3. 공지사항 수정

```tsx
import { AnnouncementForm } from '@/features/announcements/components/AnnouncementForm';
import { useAnnouncement } from '@/features/announcements/hooks/useAnnouncements';

function EditAnnouncementPage({ id }: { id: string }) {
  const { data: announcement } = useAnnouncement(id);

  if (!announcement) return <div>로딩 중...</div>;

  return <AnnouncementForm announcement={announcement} />;
}
```

### 4. 훅 사용

```tsx
import { useAnnouncements, useCreateAnnouncement } from '@/features/announcements/hooks/useAnnouncements';
import { useAcknowledgeAnnouncement } from '@/features/announcements/hooks/useAcknowledgeAnnouncement';

function MyComponent() {
  const { data: announcements } = useAnnouncements();
  const createMutation = useCreateAnnouncement();
  const acknowledgeMutation = useAcknowledgeAnnouncement();

  const handleCreate = async () => {
    await createMutation.mutateAsync({
      title: '제목',
      body: '내용',
      targetType: 'all',
      status: 'published',
    });
  };

  const handleAcknowledge = async () => {
    await acknowledgeMutation.mutateAsync({
      announcementId: 'announcement-id',
      storeId: 'store-id',
    });
  };

  return (
    // 컴포넌트 내용
  );
}
```

## 데이터베이스 스키마

### announcements 테이블
- `id`: UUID (Primary Key)
- `title`: VARCHAR(200) - 제목
- `body`: TEXT - 내용
- `attachments`: TEXT[] - 첨부파일 URL 배열
- `targetType`: VARCHAR(20) - 대상 유형 (all, store, group)
- `targetStores`: UUID[] - 대상 매장 ID 배열
- `targetGroups`: UUID[] - 대상 매장 그룹 ID 배열
- `status`: VARCHAR(20) - 상태 (draft, published, archived)
- `createdBy`: UUID - 작성자 ID
- `createdAt`: TIMESTAMP - 작성 일시
- `updatedAt`: TIMESTAMP - 수정 일시
- `publishedAt`: TIMESTAMP - 게시 일시

### announcement_views 테이블
- `id`: UUID (Primary Key)
- `announcementId`: UUID (Foreign Key)
- `storeId`: UUID - 매장 ID
- `viewedAt`: TIMESTAMP - 조회 일시

### announcement_acknowledgments 테이블
- `id`: UUID (Primary Key)
- `announcementId`: UUID (Foreign Key)
- `storeId`: UUID - 매장 ID
- `acknowledgedAt`: TIMESTAMP - 확인 일시

## 다음 단계

1. **데이터베이스 마이그레이션**: Supabase에서 위의 테이블 스키마를 생성해야 합니다.
2. **실시간 알림**: WebSocket을 통한 실시간 알림 기능을 구현해야 합니다.
3. **파일 업로드**: 첨부파일 업로드 기능을 구현해야 합니다.
4. **매장/그룹 관리**: 매장 및 매장 그룹 관리 기능과 연동해야 합니다.
5. **권한 관리**: 본사 관리자와 매장 사용자 권한을 구분해야 합니다.

## 통합 가이드

### Supabase 마이그레이션

```sql
-- announcements 테이블 생성
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  attachments TEXT[],
  target_type VARCHAR(20) NOT NULL,
  target_stores UUID[],
  target_groups UUID[],
  status VARCHAR(20) NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- announcement_views 테이블 생성
CREATE TABLE announcement_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  store_id UUID NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(announcement_id, store_id)
);

-- announcement_acknowledgments 테이블 생성
CREATE TABLE announcement_acknowledgments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  store_id UUID NOT NULL,
  acknowledged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(announcement_id, store_id)
);

-- 인덱스 생성
CREATE INDEX idx_announcements_status ON announcements(status);
CREATE INDEX idx_announcements_created_at ON announcements(created_at DESC);
CREATE INDEX idx_announcement_views_announcement_id ON announcement_views(announcement_id);
CREATE INDEX idx_announcement_views_store_id ON announcement_views(store_id);
CREATE INDEX idx_announcement_acknowledgments_announcement_id ON announcement_acknowledgments(announcement_id);
CREATE INDEX idx_announcement_acknowledgments_store_id ON announcement_acknowledgments(store_id);
```

### 환경 변수

다음 환경 변수가 필요합니다:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anonymous Key

## 참고사항

- 모든 컴포넌트는 클라이언트 컴포넌트입니다 (`'use client'`).
- React Query를 사용하여 서버 상태를 관리합니다.
- Zod를 사용하여 폼 유효성 검사를 수행합니다.
- date-fns를 사용하여 날짜 포맷팅을 수행합니다.

