import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            locale: string;
            translations: Record<string, any>;
            languages: { key: string; name: string; url: string }[];
            social_links: {
                whatsapp: string | null;
                x: string | null;
                facebook: string | null;
                instagram: string | null;
            };
            [key: string]: unknown;
        };
    }
}
