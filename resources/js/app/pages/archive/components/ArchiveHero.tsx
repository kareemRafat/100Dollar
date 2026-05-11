import { useLang } from '@erag/lang-sync-inertia/react';

export function ArchiveHero() {
    const { __ } = useLang();

    return (
        <header className="relative mb-8 h-[250px] w-full overflow-hidden md:h-[320px]">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYJIXHhzvWUAYG3UbBV4YWSs9_TjTwPATiiFM6b4eZgtWu4Qz79GIoS3lRB0GNcdffoKtJqmkT-2YWyvDM-MpjyqujFb-LBsqRqbjA1YlRDnXCDfjIjmGlS8ElgbR-6qZTkkGAf2S-97DlJeUF91nupHwhfPDiypG0ft833vmyPhWQvEWZo6Dn-KW_RyP_qb-qFLT5l3_lBTsD05wms2KR3nm3rUaHqcxEx3WHiFO2mzrPn1ywDEl3Ig-o9EZeFUB6WK2PDeYMGng')",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 rounded-full bg-primary/90 px-4 py-1 text-[10px] font-bold tracking-widest text-on-primary uppercase shadow-xl">
                    {__('messages.archive.hero_badge')}
                </div>
                <h1 className="mb-4 font-headline text-3xl leading-tight font-extrabold text-white md:text-4xl">
                    {__('messages.archive.hero_title')}{' '}
                    <span className="text-inverse-primary dark:text-primary">
                        {__('messages.archive.golden')}
                    </span>
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-white/80">
                    {__('messages.archive.hero_desc')}
                </p>
            </div>
        </header>
    );
}
