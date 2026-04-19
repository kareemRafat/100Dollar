import { AppContent } from '@/admin/components/app-content';
import { AppShell } from '@/admin/components/app-shell';
import { AppSidebar } from '@/admin/components/app-sidebar';
import { AppSidebarHeader } from '@/admin/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
