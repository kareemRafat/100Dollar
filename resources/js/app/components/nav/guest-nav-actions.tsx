import { useLang } from '@erag/lang-sync-inertia/react';
import { Link } from '@inertiajs/react';
import { Button } from '@/app/components/ui/button';
import { login, register } from '@/routes';

interface GuestNavActionsProps {
    locale: string;
}

export function GuestNavActions({ locale }: GuestNavActionsProps) {
    const { __ } = useLang();

    return (
        <div className="flex items-center gap-1">
            <Button
                asChild
                className="ms-2 hidden h-9 rounded-lg px-4 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 md:inline-flex"
            >
                <Link
                    href={login.url({
                        query: {
                            redirect: window.location.pathname,
                        },
                    })}
                >
                    {__('messages.ui.submit_your_idea')}
                </Link>
            </Button>
            <Link
                className="hidden px-3 py-2 text-sm font-bold text-on-surface-variant hover:text-on-surface md:inline-block dark:text-slate-400"
                href={login.url({
                    query: {
                        redirect: window.location.pathname,
                    },
                })}
            >
                {__('messages.auth.login')}
            </Link>
            <Button
                asChild
                variant="outline"
                className="hidden h-9 rounded-lg px-4 text-sm font-bold transition-all hover:scale-[1.02] md:inline-flex"
            >
                <Link href={register.url()}>
                    {__('messages.auth.register')}
                </Link>
            </Button>
        </div>
    );
}
