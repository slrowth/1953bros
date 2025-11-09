'use client';

import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { Breadcrumbs } from './Breadcrumbs';

interface AppLayoutProps {
  children: React.ReactNode;
  userRole?: 'HQ' | 'Store';
  userName?: string;
}

export function AppLayout({ children, userRole = 'HQ', userName }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={userRole} />
      <div className="lg:pl-64 md:pl-16">
        <TopNav userName={userName} userRole={userRole} />
        <Breadcrumbs />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

