import { Link, usePage } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

type Props = {
    activeRoute?: string;
};

const navItems: NavItem[] = [
    { title: 'الرئيسية', href: '/' },
    { title: 'الأرشيف', href: '/archive' },
    { title: 'الرعاة', href: '/sponsors' },
    { title: 'من نحن', href: '/about' },
    { title: 'تواصل معنا', href: '/contact' },
];

export function TopNavBar({ activeRoute }: Props) {
    const { auth } = usePage().props;
    const { appearance, updateAppearance } = useAppearance();

    return (
        <header className="glass-header fixed top-0 z-50 w-full shadow-sm">
            <nav className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-8 py-4">
                <div className="flex items-center">
                    <Link
                        className="font-headline text-xl font-bold text-deep-navy transition-all duration-300 ease-in-out hover:opacity-80 dark:text-white"
                        href="/"
                    >
                        أفكار بـ 100 دولار
                    </Link>
                </div>

                <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.title}
                            className={cn(
                                'font-headline font-medium transition-all duration-300 ease-in-out',
                                activeRoute === item.href
                                    ? 'border-b-2 border-primary pb-1 text-primary'
                                    : 'text-on-surface-variant hover:text-on-surface dark:text-slate-400 dark:hover:text-slate-100',
                            )}
                            href={item.href}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() =>
                            updateAppearance(
                                appearance === 'dark' ? 'light' : 'dark',
                            )
                        }
                        className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                        aria-label="Toggle theme"
                    >
                        {appearance === 'dark' ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>

                    {auth.user ? (
                        <Link
                            className="scale-95 rounded-lg bg-primary px-5 py-2 font-headline font-bold text-on-primary transition-all hover:shadow-md active:scale-90"
                            href="/profile"
                        >
                            حسابي
                        </Link>
                    ) : (
                        <>
                            <Link
                                className="scale-95 px-5 py-2 font-headline font-semibold text-on-surface-variant transition-all hover:text-on-surface active:scale-90 dark:text-slate-400 dark:hover:text-slate-100"
                                href="/login"
                            >
                                تسجيل الدخول
                            </Link>
                            <Link
                                className="scale-95 rounded-lg bg-primary px-5 py-2 font-headline font-bold text-on-primary transition-all hover:shadow-md active:scale-90"
                                href="/register"
                            >
                                إنشاء حساب
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
