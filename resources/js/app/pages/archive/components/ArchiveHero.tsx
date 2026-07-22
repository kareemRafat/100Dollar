import { useLang } from '@erag/lang-sync-inertia/react';

export function ArchiveHero() {
    const { __ } = useLang();

    return (
        <header className="relative flex h-100 items-center justify-center overflow-hidden md:h-125">
            <div className="absolute inset-0 z-0">
                <img
                    alt="Archive Background"
                    className="h-full w-full object-cover brightness-50 grayscale"
                    src="/images/archivenew.webp"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-900" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl px-8 text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-primary-fixed backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-xs font-black tracking-wider uppercase">
                        {__('messages.archive.hero_badge')}
                    </span>
                </div>

                <h1 className="mb-6 font-headline text-4xl leading-tight font-black text-white md:text-5xl">
                    {__('messages.archive.hero_title')}{' '}
                    <span className="text-inverse-primary dark:text-primary">
                        {__('messages.archive.golden')}
                    </span>
                </h1>

                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
                    {__('messages.archive.hero_desc')}
                </p>
            </div>
        </header>
    );
}
