import AuthLayoutTemplate from '@/admin/layouts/auth/auth-simple-layout';
import { Toaster as AdminToaster } from '@/components/ui/sonner';

export default function AdminAuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <div dir="rtl">
            <AuthLayoutTemplate title={title} description={description}>
                {children}
            </AuthLayoutTemplate>
            <AdminToaster
                position="top-center"
                dir="rtl"
                toastOptions={{ className: '!border-none shadow-lg' }}
            />
        </div>
    );
}
