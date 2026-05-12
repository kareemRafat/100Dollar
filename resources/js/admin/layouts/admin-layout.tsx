import AppLayoutTemplate from '@/admin/layouts/app/app-sidebar-layout';
import { Toaster as AdminToaster } from '@/components/ui/sonner';
import type { BreadcrumbItem } from '@/types';

export default function AdminLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <div dir="rtl">
            <AppLayoutTemplate breadcrumbs={breadcrumbs}>
                {children}
            </AppLayoutTemplate>
            <AdminToaster
                position="top-center"
                dir="rtl"
                toastOptions={{ className: '!border-none shadow-lg' }}
            />
        </div>
    );
}
