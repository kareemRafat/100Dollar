import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import AdminAuthLayout from '@/admin/layouts/admin-auth-layout';
import AdminLayout from '@/admin/layouts/admin-layout';
import AdminSettingsLayout from '@/admin/layouts/settings-layout';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';

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
        const locale = (props.initialPage.props.locale as string) || 'en';

        // Initial setup
        const dir = locale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', locale);

        // Listen for navigation changes (like language switching)
        router.on('success', (event) => {
            const nextLocale = (event.detail.page.props.locale as string) || 'en';
            const nextDir = nextLocale === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', nextDir);
            document.documentElement.setAttribute('lang', nextLocale);
        });

        const content = (
            <TooltipProvider delayDuration={0}>
                <App {...props} />
                <Toaster position="top-center" dir="rtl" toastOptions={{ className: '!border-none shadow-lg' }} />
            </TooltipProvider>
        );

        if (el.innerHTML.trim().length > 0) {
            hydrateRoot(el, content);
        } else {
            createRoot(el).render(content);
        }
    },
    strictMode: true,
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();

