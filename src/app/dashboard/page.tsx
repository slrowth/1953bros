'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Store } from 'lucide-react';

const dummyKPIs = [
  {
    title: '오늘 매출',
    value: '₩2,450,000',
    change: '+12.5%',
    trend: 'up' as const,
    icon: DollarSign,
  },
  {
    title: '전월 대비',
    value: '₩68,200,000',
    change: '+8.3%',
    trend: 'up' as const,
    icon: TrendingUp,
  },
  {
    title: '활성 매장',
    value: '24',
    change: '-2',
    trend: 'down' as const,
    icon: Store,
  },
  {
    title: '평균 매출',
    value: '₩2,841,667',
    change: '+5.1%',
    trend: 'up' as const,
    icon: TrendingUp,
  },
];

const dummyStores = [
  { id: 1, name: '강남점', sales: '₩3,200,000', status: 'active' },
  { id: 2, name: '홍대점', sales: '₩2,800,000', status: 'active' },
  { id: 3, name: '이태원점', sales: '₩2,100,000', status: 'active' },
  { id: 4, name: '명동점', sales: '₩1,900,000', status: 'warning' },
  { id: 5, name: '부산점', sales: '₩2,500,000', status: 'active' },
];

export default function DashboardPage() {
  return (
    <AppLayout userRole="HQ" userName="본사 관리자">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">대시보드</h1>
          <p className="text-muted-foreground mt-2">실시간 매출 및 매장 현황을 확인하세요</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dummyKPIs.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p
                    className={`text-xs mt-1 flex items-center ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {kpi.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>매출 차트</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                매출 차트 영역 (차트 라이브러리 연동 필요)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>매장 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyStores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{store.name}</p>
                      <p className="text-sm text-muted-foreground">{store.sales}</p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs ${
                        store.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {store.status === 'active' ? '정상' : '주의'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

