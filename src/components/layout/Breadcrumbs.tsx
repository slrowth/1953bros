'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const pathMap: Record<string, string> = {
  dashboard: '대시보드',
  orders: '주문 관리',
  announcements: '공지사항',
  'quality-inspection': '품질 점검',
  training: '교육 자료',
  settings: '설정',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: '홈', href: '/' },
    ...paths.map((path, index) => ({
      label: pathMap[path] || path,
      href: '/' + paths.slice(0, index + 1).join('/'),
    })),
  ];

  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground px-4 lg:px-6 py-4">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <div key={crumb.href} className="flex items-center space-x-2">
            {index === 0 ? (
              <Link
                href={crumb.href}
                className={cn(
                  'flex items-center hover:text-foreground transition-colors',
                  isLast && 'text-foreground font-medium'
                )}
              >
                <Home className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <ChevronRight className="h-4 w-4" />
                {isLast ? (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}

