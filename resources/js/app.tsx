import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import AdminAuthLayout from '@/admin/layouts/admin-auth-layout';
import AdminLayout from '@/admin/layouts/admin-layout';
import AdminSettingsLayout from '@/admin/layouts/settings-layout';
import { Toaster as AppToaster } from '@/app/components/ui/toast';
import AppLayout from '@/app/layouts/app-layout';
import { Toaster as AdminToaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`/resources/js/${name}.tsx`, import.meta.glob('/resources/js/**/*.tsx')) as any,
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
    setup({ el, App, props }) {
        const locale = (props.initialPage.props.locale as string) || 'en';
        const dir = locale === 'ar' ? 'rtl' : 'ltr';

        // Initial setup
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', locale);

        const initialIsAdmin = props.initialPage.component.startsWith('admin/');
        if (initialIsAdmin) {
            document.documentElement.classList.remove('theme-gold');
        } else {
            document.documentElement.classList.add('theme-gold');
        }

        // Listen for navigation changes (like language switching and theme switching)
        router.on('success', (event) => {
            const nextLocale = (event.detail.page.props.locale as string) || 'en';
            const nextDir = nextLocale === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', nextDir);
            document.documentElement.setAttribute('lang', nextLocale);

            const isAdmin = event.detail.page.component.startsWith('admin/');
            if (isAdmin) {
                document.documentElement.classList.remove('theme-gold');
            } else {
                document.documentElement.classList.add('theme-gold');
            }
        });

        const content = (
            <TooltipProvider delayDuration={0}>
                <App {...props} />
            </TooltipProvider>
        );

        if (el && el.innerHTML.trim().length > 0) {
            hydrateRoot(el, content);
        } else if (el) {
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

