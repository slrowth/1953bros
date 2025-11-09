'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, ShoppingCart } from 'lucide-react';

const dummyProducts = [
  { id: 1, name: '돼지국밥 재료', price: 15000, unit: 'kg', stock: 100 },
  { id: 2, name: '국물 양념', price: 5000, unit: 'L', stock: 50 },
  { id: 3, name: '밥', price: 2000, unit: 'kg', stock: 200 },
  { id: 4, name: '김치', price: 8000, unit: 'kg', stock: 80 },
];

const dummyOrders = [
  { id: 1, product: '돼지국밥 재료', quantity: 10, total: 150000, status: 'pending', date: '2025-01-09' },
  { id: 2, product: '국물 양념', quantity: 5, total: 25000, status: 'confirmed', date: '2025-01-08' },
  { id: 3, product: '밥', quantity: 20, total: 40000, status: 'delivered', date: '2025-01-07' },
];

export default function OrdersPage() {
  return (
    <AppLayout userRole="Store" userName="매장 점주">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">주문 관리</h1>
            <p className="text-muted-foreground mt-2">제품을 주문하고 주문 현황을 확인하세요</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            새 주문
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>제품 카탈로그</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="제품 검색..." className="pl-10" />
                  </div>
                </div>
                <div className="space-y-3">
                  {dummyProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ₩{product.price.toLocaleString()} / {product.unit} • 재고: {product.stock}
                        </p>
                      </div>
                      <Button size="sm">주문하기</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  주문 요약
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    주문한 제품이 없습니다
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>총액</span>
                      <span>₩0</span>
                    </div>
                    <Button className="w-full mt-4">주문 제출</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>주문 내역</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dummyOrders.map((order) => (
                    <div key={order.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{order.product}</span>
                        <Badge
                          variant={
                            order.status === 'delivered'
                              ? 'default'
                              : order.status === 'confirmed'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {order.status === 'delivered'
                            ? '배송완료'
                            : order.status === 'confirmed'
                              ? '확인됨'
                              : '대기중'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        수량: {order.quantity} • ₩{order.total.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{order.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

