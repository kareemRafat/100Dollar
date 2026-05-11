import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import AdminAuthLayout from '@/admin/layouts/admin-auth-layout';
import AdminLayout from '@/admin/layouts/admin-layout';
import AdminSettingsLayout from '@/admin/layouts/settings-layout';
import { Toaster as AppToaster } from '@/app/components/ui/toast';
import AppLayout from '@/app/layouts/app-layout';
import { Toaster as AdminToaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            const pages = import.meta.glob('./**/*.tsx', { eager: true });

            return (pages[`./${name}.tsx`] || pages[`./pages/${name}.tsx`]) as any;
        },
        layout: (name) => {
            switch (true) {
                case name === 'welcome':
                    return null;
                case name.startsWith('admin/pages/auth/'):
                    return AdminAuthLayout;
                case name.startsWith('admin/pages/settings/'):
                    return [AdminLayout, AdminSettingsLayout];
                case name.startsWith('admin/'):
                    return AdminLayout;
                case name.startsWith('app/pages/auth/'):
                    return null;
                case name.startsWith('app/pages/errors/'):
                    return null;
                case name.startsWith('app/pages/'):
                    return AppLayout;
                default:
                    return null;
            }
        },
        setup: ({ App, props }) => {
            const locale = (props.initialPage.props.locale as string) || 'en';
            const dir = locale === 'ar' ? 'rtl' : 'ltr';
            const isAdmin = props.initialPage.component.startsWith('admin/');

            return (
                <TooltipProvider delayDuration={0}>
                    <App {...props} />
                    {isAdmin ? (
                        <AdminToaster
                            position="top-center"
                            dir={dir}
                            toastOptions={{ className: '!border-none shadow-lg' }}
                        />
                    ) : (
                        <AppToaster />
                    )}
                </TooltipProvider>
            );
        },
    }),
);
