import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import AdminAuthLayout from '@/admin/layouts/admin-auth-layout';
import AdminLayout from '@/admin/layouts/admin-layout';
import AdminSettingsLayout from '@/admin/layouts/settings-layout';
import { Toaster as AppToaster } from '@/app/components/ui/sonner';
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

        // Listen for navigation changes (like language switching)
        router.on('success', (event) => {
            const nextLocale = (event.detail.page.props.locale as string) || 'en';
            const nextDir = nextLocale === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', nextDir);
            document.documentElement.setAttribute('lang', nextLocale);
        });

        const isAdmin = props.initialPage.component.startsWith('admin/');
        const ActiveToaster = isAdmin ? AdminToaster : AppToaster;

        const content = (
            <TooltipProvider delayDuration={0}>
                <App {...props} />
                <ActiveToaster
                    position="top-center"
                    dir={dir}
                    toastOptions={
                        isAdmin
                            ? { className: '!border-none shadow-lg' }
                            : undefined
                    }
                />
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

