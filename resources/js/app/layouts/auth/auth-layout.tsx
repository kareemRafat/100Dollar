import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useLang } from '@erag/lang-sync-inertia/react';

type Props = {
    children: ReactNode;
    maxWidth?: string;
};

export default function AuthLayout({ children, maxWidth = 'max-w-md' }: Props) {
    const { __ } = useLang();

    return (
        <main className="flex min-h-screen flex-col md:flex-row">
            <section className="airy-dots relative z-10 flex flex-1 flex-col justify-center overflow-y-auto bg-surface px-6 py-12 md:px-24 md:py-20 text-start">
                <div className={cn("relative z-10 mx-auto w-full", maxWidth)}>
                    {children}
                </div>
            </section>
            <section className="bg-editorial-gradient relative hidden flex-col justify-between overflow-hidden p-12 text-white md:flex md:w-2/5 text-start">
                <div className="pointer-events-none absolute inset-0 opacity-10">
                    <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                </div>
                <div className="relative z-10">
                    <Link className="mb-16 flex items-center gap-3" href="/">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
                            <span
                                className="material-symbols-outlined text-white"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                account_balance
                            </span>
                        </div>
                        <span className="font-headline text-2xl font-bold tracking-tight text-inverse-primary">
                            {__('messages.ideas_100')}
                        </span>
                    </Link>
                    <div className="space-y-8">
                        <h1 className="font-headline text-4xl leading-tight font-extrabold">
                            {__('messages.auth_layout.invest_future')} <br />
                            <span className="text-inverse-primary">
                                {__('messages.auth_layout.one_idea_at_time')}
                            </span>
                        </h1>
                        <p className="max-w-sm text-lg leading-relaxed text-white/70">
                            &ldquo;{__('messages.auth_layout.quote')}&rdquo;
                        </p>
                    </div>
                </div>
                <div className="relative z-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-12">
                    <div className="flex items-center gap-2 opacity-60">
                        <span className="material-symbols-outlined text-sm">
                            shield
                        </span>
                        <span className="text-xs">{__('messages.auth_layout.iso_certified')}</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-60">
                        <span className="material-symbols-outlined text-sm">
                            gpp_good
                        </span>
                        <span className="text-xs">{__('messages.auth_layout.encrypted_data')}</span>
                    </div>
                </div>
            </section>
        </main>
    );
}
