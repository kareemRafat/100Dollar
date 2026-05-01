import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Props {
    status: number;
}

export default function Error({ status }: Props) {
    const { __ } = useLang();
    const { locale } = usePage().props;

    // Default to 'ar' if no locale is provided or if it's empty
    const currentLocale = (locale as string) || 'ar';
    const isRtl = currentLocale === 'ar';

    const content = {
        503: {
            title: __('messages.errors.500_title'),
            description: __('messages.errors.500_desc'),
        },
        500: {
            title: __('messages.errors.500_title'),
            description: __('messages.errors.500_desc'),
        },
        404: {
            title: __('messages.errors.404_title'),
            description: __('messages.errors.404_desc'),
        },
        403: {
            title: __('messages.errors.403_title'),
            description: __('messages.errors.403_desc'),
        },
    }[status] || {
        title: __('messages.errors.500_title'),
        description: __('messages.errors.500_desc'),
    };

    return (
        <div
            className="airy-dots flex min-h-screen items-center justify-center overflow-x-hidden bg-surface text-on-surface antialiased"
            dir={isRtl ? 'rtl' : 'ltr'}
            lang={currentLocale}
        >
            <Head title={`${status} - ${__('messages.ideas_100')}`} />

            <main className="relative z-10 w-full max-w-3xl space-y-12 px-6 py-12 text-center">
                <div className="space-y-4">
                    <h1 className="font-headline text-[12rem] leading-none font-black text-[#1A1A2E] select-none md:text-[16rem] dark:text-white/20">
                        {status}
                    </h1>
                    <h2 className="font-headline text-3xl leading-tight font-black text-[#1A1A2E] md:text-5xl dark:text-white">
                        {content.title}
                    </h2>
                    <p className="mx-auto max-w-xl font-body text-lg leading-relaxed text-secondary opacity-80 md:text-xl dark:text-gray-400">
                        {content.description}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-6 pt-4 sm:flex-row-reverse">
                    <Button
                        asChild
                        className="h-auto w-full rounded-xl bg-primary px-10 py-5 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95 sm:w-auto"
                    >
                        <Link href="/">
                            {__('messages.errors.back_to_home')}
                        </Link>
                    </Button>
                    <button
                        className="group flex items-center gap-2 text-lg font-bold text-[#1A1A2E] transition-colors hover:text-[#B8860B] dark:text-white"
                        onClick={() => window.location.reload()}
                    >
                        <span>{__('messages.ui.refresh')}</span>
                        <RefreshCw className="size-5 transition-transform duration-500 group-hover:rotate-180" />
                    </button>
                </div>
            </main>
        </div>
    );
}
