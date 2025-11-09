'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ShoppingCart,
  Megaphone,
  ClipboardCheck,
  BookOpen,
  Settings,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: ('HQ' | 'Store' | 'all')[];
}

const navItems: NavItem[] = [
  {
    title: '대시보드',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['HQ'],
  },
  {
    title: '주문 관리',
    href: '/orders',
    icon: ShoppingCart,
    roles: ['HQ', 'Store'],
  },
  {
    title: '공지사항',
    href: '/announcements',
    icon: Megaphone,
    roles: ['HQ', 'Store'],
  },
  {
    title: '품질 점검',
    href: '/quality-inspection',
    icon: ClipboardCheck,
    roles: ['Store'],
  },
  {
    title: '교육 자료',
    href: '/training',
    icon: BookOpen,
    roles: ['all'],
  },
  {
    title: '설정',
    href: '/settings',
    icon: Settings,
    roles: ['HQ'],
  },
];

interface SidebarProps {
  userRole?: 'HQ' | 'Store';
  className?: string;
}

export function Sidebar({ userRole = 'HQ', className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(userRole) || item.roles.includes('all')
  );

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn('flex flex-col h-full', isMobile && 'w-full')}>
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-foreground">1953국밥관리시스템</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => isMobile && setIsMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent isMobile />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col w-64 border-r bg-background fixed left-0 top-0 h-screen',
          className
        )}
      >
        <SidebarContent />
      </aside>

      {/* Tablet Mini Sidebar */}
      <aside
        className={cn(
          'hidden md:flex lg:hidden flex-col w-16 border-r bg-background fixed left-0 top-0 h-screen',
          className
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-center">
            <h2 className="text-sm font-bold">1953</h2>
          </div>
          <nav className="flex-1 p-2 space-y-2">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-center p-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                  title={item.title}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

