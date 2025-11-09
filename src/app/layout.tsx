import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: '1953국밥관리시스템',
  description: '1953형제돼지국밥 가맹점 및 직영점의 주문, 매출, 소통을 통합 관리하여 업무 효율성과 매출 증대를 지원하는 웹 기반 관리 시스템입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ko">
      <body className="antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
