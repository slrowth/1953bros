'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <AppLayout userRole="HQ" userName="본사 관리자">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">설정</h1>
          <p className="text-muted-foreground mt-2">시스템 설정을 관리하세요</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>프로필 설정</CardTitle>
            <CardDescription>사용자 정보를 수정하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" defaultValue="본사 관리자" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" defaultValue="admin@1953bros.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input id="phone" type="tel" defaultValue="02-1234-5678" />
            </div>
            <Button>저장</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>시스템 설정</CardTitle>
            <CardDescription>시스템 전반의 설정을 관리하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">회사명</Label>
              <Input id="company-name" defaultValue="1953형제돼지국밥" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">페이히어 API 키</Label>
              <Input id="api-key" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ecount-key">이카운트 API 키</Label>
              <Input id="ecount-key" type="password" placeholder="••••••••" />
            </div>
            <Separator />
            <Button>설정 저장</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>위험 영역</CardTitle>
            <CardDescription>주의해서 사용하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>데이터 초기화</Label>
              <p className="text-sm text-muted-foreground">
                모든 데이터를 삭제합니다. 이 작업은 되돌릴 수 없습니다.
              </p>
              <Button variant="destructive">데이터 초기화</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

