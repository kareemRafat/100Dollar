import { useLang } from '@erag/lang-sync-inertia/react';
import { Link, usePage } from '@inertiajs/react';
import { create } from '@/actions/App/Http/Controllers/App/IdeaController';
import { ParticlesBackground } from '@/app/components/particles-background';
import { login } from '@/routes';

export default function Hero() {
    const { __ } = useLang();
    const { auth } = usePage().props;

    const submitUrl = !auth.user
        ? login()
        : auth.user.role === 'admin'
            ? '/admin'
            : create.url();

    const submitText = auth.user?.role === 'admin'
        ? __('messages.ui.dashboard')
        : __('messages.ui.submit_your_idea_now');

    return (
        <section className="airy-dots relative flex flex-col items-center overflow-hidden bg-surface py-20 text-center md:py-32">
            <ParticlesBackground />
            <div className="relative z-10 flex w-full flex-col items-center">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-2 text-sm font-semibold text-on-primary-fixed">
                    <span className="material-symbols-outlined text-sm">
                        rocket_launch
                    </span>
                    {__('messages.welcome')}
                </div>
                <h1 className="mb-8 max-w-4xl font-headline text-5xl leading-tight font-black text-on-surface md:text-7xl dark:text-white">
                    <span className="block">
                        {__('messages.home.hero_title')}{' '}
                    </span>
                    <span className="mx-2 inline-block -rotate-2 transform rounded-lg bg-primary px-4 py-1 text-white shadow-lg">
                        {__('messages.for_100')}
                    </span>
                </h1>
                <p className="mb-12 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl dark:text-slate-300">
                    {__('messages.home.hero_desc')}
                </p>
                <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
                    <Link
                        href={submitUrl}
                        className="rounded-xl bg-primary px-10 py-5 text-center text-xl font-bold text-on-primary shadow-lg transition-all hover:translate-y-[-2px]"
                    >
                        {submitText}
                    </Link>
                    <Link
                        href="/how-it-works"
                        className="rounded-xl border border-outline-variant/20 bg-surface-container-low px-10 py-5 text-center text-xl font-bold text-on-surface transition-all hover:bg-surface-container-high dark:text-white"
                    >
                        {__('messages.ui.how_it_works')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
