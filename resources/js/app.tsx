import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AdminAuthLayout from '@/admin/layouts/admin-auth-layout';
import AdminLayout from '@/admin/layouts/admin-layout';
import AdminSettingsLayout from '@/admin/layouts/settings-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`/resources/js/${name}.tsx`, import.meta.glob('/resources/js/**/*.tsx')),
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
            default:
                return null;
        }
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <TooltipProvider delayDuration={0}>
                <App {...props} />
                <Toaster />
            </TooltipProvider>
        );
    },
    strictMode: true,
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
