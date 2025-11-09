'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Play, FileText, Video } from 'lucide-react';

const dummyMaterials = [
  {
    id: 1,
    title: '돼지국밥 조리법',
    type: 'video' as const,
    duration: '15분',
    category: '조리법',
  },
  {
    id: 2,
    title: '위생 관리 매뉴얼',
    type: 'document' as const,
    pages: '20페이지',
    category: '위생',
  },
  {
    id: 3,
    title: '고객 서비스 가이드',
    type: 'video' as const,
    duration: '10분',
    category: '서비스',
  },
  {
    id: 4,
    title: '재고 관리 가이드',
    type: 'document' as const,
    pages: '15페이지',
    category: '관리',
  },
];

export default function TrainingPage() {
  return (
    <AppLayout userRole="Store" userName="매장 점주">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">교육 자료</h1>
          <p className="text-muted-foreground mt-2">교육 자료, 매뉴얼, 동영상을 확인하세요</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="교육 자료 검색..." className="pl-10" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dummyMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{material.title}</CardTitle>
                    <CardDescription className="mt-1">{material.category}</CardDescription>
                  </div>
                  {material.type === 'video' ? (
                    <Video className="h-5 w-5 text-primary" />
                  ) : (
                    <FileText className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {material.type === 'video' ? material.duration : material.pages}
                  </span>
                  <Button size="sm">
                    {material.type === 'video' ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        재생
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        보기
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

