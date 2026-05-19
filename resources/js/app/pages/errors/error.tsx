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
            className="error-page-shell"
            dir={isRtl ? 'rtl' : 'ltr'}
            lang={currentLocale}
        >
            <Head title={`${status} - ${__('messages.ideas_100')}`} />

            <main className="error-page-card">
                <div className="error-page-copy">
                    <h1 className="error-page-status">{status}</h1>
                    <h2 className="error-page-title">{content.title}</h2>
                    <p className="error-page-description">
                        {content.description}
                    </p>
                </div>

                <div className="error-page-actions">
                    <Button asChild className="error-page-home-button">
                        <Link href="/">
                            {__('messages.errors.back_to_home')}
                        </Link>
                    </Button>
                    <button
                        className="error-page-refresh-button"
                        onClick={() => window.location.reload()}
                    >
                        <span>{__('messages.ui.refresh')}</span>
                        <RefreshCw className="error-page-refresh-icon" />
                    </button>
                </div>
            </main>
        </div>
    );
}
