'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

const dummyChecklist = [
  { id: 1, item: '식기 소독 상태', status: 'pass' as const },
  { id: 2, item: '조리대 청결도', status: 'pass' as const },
  { id: 3, item: '냉장고 온도', status: 'fail' as const },
  { id: 4, item: '화장실 청결도', status: 'pending' as const },
  { id: 5, item: '음식물 쓰레기 처리', status: 'pending' as const },
];

export default function QualityInspectionPage() {
  return (
    <AppLayout userRole="Store" userName="매장 점주">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">품질 점검</h1>
          <p className="text-muted-foreground mt-2">정기적인 품질 및 위생 점검을 수행하세요</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>오늘의 점검 항목</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyChecklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox id={`item-${item.id}`} />
                    <Label htmlFor={`item-${item.id}`} className="font-medium cursor-pointer">
                      {item.item}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status === 'pass' && (
                      <Badge variant="default" className="bg-green-600 text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        합격
                      </Badge>
                    )}
                    {item.status === 'fail' && (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        불합격
                      </Badge>
                    )}
                    {item.status === 'pending' && (
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        대기중
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline">임시 저장</Button>
              <Button>제출하기</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>최근 점검 기록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: '2025-01-08', score: 95, status: 'pass' },
                { date: '2025-01-07', score: 88, status: 'pass' },
                { date: '2025-01-06', score: 75, status: 'warning' },
              ].map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{record.date}</p>
                    <p className="text-sm text-muted-foreground">점수: {record.score}점</p>
                  </div>
                  <Badge
                    variant={record.status === 'pass' ? 'default' : 'destructive'}
                    className={record.status === 'pass' ? 'bg-green-600 text-white' : ''}
                  >
                    {record.status === 'pass' ? '합격' : '주의'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

