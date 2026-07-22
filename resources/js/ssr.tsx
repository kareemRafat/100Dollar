import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';
import AdminAuthLayout from '@/admin/layouts/admin-auth-layout';
import AdminLayout from '@/admin/layouts/admin-layout';
import AdminSettingsLayout from '@/admin/layouts/settings-layout';
import AppLayout from '@/app/layouts/app-layout';
import { TooltipProvider } from '@/components/ui/tooltip';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            const pages = import.meta.glob('./{app,admin}/pages/**/*.tsx', { eager: true });

            return pages[`./${name}.tsx`] as any;
        },
        layout: (name) => {
            switch (true) {
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
            return (
                <TooltipProvider delayDuration={0}>
                    <App {...props} />
                </TooltipProvider>
            );
        },
    }),
);
