import { useLang } from '@erag/lang-sync-inertia/react';
import { Link, usePage } from '@inertiajs/react';
import {
    LogOut,
    Moon,
    Sun,
    User as UserIcon,
    Lightbulb,
    Menu,
} from 'lucide-react';
import { create } from '@/actions/App/Http/Controllers/App/IdeaController';
import { NotificationBell } from '@/app/components/notification-bell';
import { Button } from '@/app/components/ui/button';
import LanguageSwitcher from '@/components/language-switcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { logout, login, register } from '@/routes';
import { sponsors as sponsorsIndex, home as homeIndex } from '@/routes/app';
import { index } from '@/routes/app/ideas';
import type { NavItem } from '@/types';


type Props = {
    activeRoute?: string;
};

export function TopNavBar({ activeRoute }: Props) {
    const { auth, locale } = usePage().props;
    const { appearance, updateAppearance } = useAppearance('app');
    const { __ } = useLang();

    const navItems: NavItem[] = [
        { title: __('messages.nav.home'), href: homeIndex().url },
        { title: __('messages.nav.archive'), href: '/archive' },
        { title: __('messages.nav.sponsors'), href: sponsorsIndex().url },
        { title: __('messages.nav.about'), href: '/about' },
        { title: __('messages.nav.contact'), href: '/contact' },
    ];

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    const isRtl = locale === 'ar';

    return (
        <header className="fixed top-0 z-40 w-full border-b border-outline-variant/10 bg-surface/80 backdrop-blur-xl dark:border-white/5 dark:bg-surface/80">
            <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
                {/* Burger Menu for Mobile */}
                <div className="flex items-center md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-10 rounded-xl text-on-surface-variant hover:bg-surface-container-high dark:text-on-surface-variant dark:hover:bg-white/5"
                            >
                                <Menu className="size-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side={isRtl ? 'right' : 'left'}
                            className="flex w-[300px] flex-col border-outline-variant/10 bg-surface p-0 dark:border-white/5 dark:bg-surface"
                        >
                            <SheetHeader className="relative border-b border-outline-variant/10 p-5 dark:border-white/5">
                                <SheetTitle className={cn(
                                    "font-headline text-lg font-black tracking-tighter text-secondary dark:text-white",
                                    isRtl ? "text-right" : "text-left"
                                )}>
                                    <span className="text-primary">
                                        {__('messages.ideas')}
                                    </span>{' '}
                                    {__('messages.for_100')}
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-1 flex-col p-4 overflow-y-auto no-scrollbar">
                                <div className="flex flex-col gap-0.5">
                                    {navItems.map((item) => (
                                        <SheetClose asChild key={item.title}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    'flex items-center rounded-xl px-4 py-2.5 font-headline text-sm font-bold transition-all',
                                                    activeRoute === item.href
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface dark:text-on-surface-variant dark:hover:text-white',
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>

                                <div className="my-4 h-px bg-outline-variant/10 dark:bg-white/5" />

                                <div className="flex flex-col gap-4 px-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-on-surface-variant dark:text-gray-400">
                                            {appearance === 'dark'
                                                ? __('messages.ui.dark_mode')
                                                : __('messages.ui.light_mode')}
                                        </span>
                                        <Switch
                                            checked={appearance === 'dark'}
                                            onCheckedChange={(checked) =>
                                                updateAppearance(
                                                    checked ? 'dark' : 'light',
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-on-surface-variant dark:text-gray-400">
                                            {__('messages.ui.language')}
                                        </span>
                                        <LanguageSwitcher variant="standalone" />
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col gap-3">
                                    {auth.user ? (
                                        <div className="flex flex-col gap-4">
                                            <SheetClose asChild>
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 rounded-xl p-2 transition-all hover:bg-surface-container-high dark:hover:bg-white/5"
                                                >
                                                    <Avatar className="size-10">
                                                        <AvatarImage
                                                            src={auth.user.avatar}
                                                            alt={auth.user.name}
                                                        />
                                                        <AvatarFallback className="bg-primary font-bold text-white">
                                                            {getInitials(
                                                                auth.user.name,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className={cn(
                                                        "flex flex-col",
                                                        isRtl ? "text-right" : "text-left"
                                                    )}>
                                                        <span className="text-sm font-bold text-on-surface dark:text-white">
                                                            {auth.user.name}
                                                        </span>
                                                        <span className="text-xs text-on-surface-variant">
                                                            {auth.user.email}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </SheetClose>

                                            <div className="grid grid-cols-2 gap-2">
                                                {auth.user.role === 'admin' ? (
                                                    <SheetClose asChild>
                                                        <Button
                                                            asChild
                                                            className="h-9 rounded-xl bg-secondary font-bold text-xs"
                                                        >
                                                            <a href="/admin">
                                                                {__(
                                                                    'messages.ui.dashboard',
                                                                )}
                                                            </a>
                                                        </Button>
                                                    </SheetClose>
                                                ) : (
                                                    <SheetClose asChild>
                                                        <Button
                                                            asChild
                                                            className="h-9 rounded-xl font-bold text-xs"
                                                        >
                                                            <Link href={create.url()}>
                                                                {__(
                                                                    'messages.ui.submit_your_idea',
                                                                )}
                                                            </Link>
                                                        </Button>
                                                    </SheetClose>
                                                )}

                                                <SheetClose asChild>
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        className="h-9 rounded-xl font-bold text-xs border-error/20 text-error hover:bg-error/5"
                                                    >
                                                        <Link
                                                            href={logout()}
                                                            method="post"
                                                            as="button"
                                                            data={{
                                                                _locale: locale,
                                                            }}
                                                        >
                                                            <LogOut className="size-3.5 me-1.5" />
                                                            {__(
                                                                'messages.auth.logout',
                                                            )}
                                                        </Link>
                                                    </Button>
                                                </SheetClose>
                                            </div>
                                        </div>
                                    ) : (
                                    <div className="flex flex-col gap-2">
                                            <SheetClose asChild>
                                                <Button
                                                    asChild
                                                    className="h-9 rounded-xl font-bold text-xs transition-all active:scale-[0.98]"
                                                >
                                                    <Link href={login.url({ query: { redirect: window.location.pathname } })}>
                                                        {__(
                                                            'messages.ui.submit_your_idea',
                                                        )}
                                                    </Link>
                                                </Button>
                                            </SheetClose>
                                            <div className="grid grid-cols-2 gap-2">
                                                <SheetClose asChild>
                                                    <Button
                                                        asChild
                                                        variant="ghost"
                                                        className="h-9 rounded-xl font-bold text-xs"
                                                    >
                                                        <Link href={login.url({ query: { redirect: window.location.pathname } })}>
                                                            {__('messages.auth.login')}
                                                        </Link>
                                                    </Button>
                                                </SheetClose>
                                                <SheetClose asChild>
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        className="h-9 rounded-xl font-bold text-xs"
                                                    >
                                                        <Link href={register.url()}>
                                                            {__(
                                                                'messages.auth.register',
                                                            )}
                                                        </Link>
                                                    </Button>
                                                </SheetClose>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Logo Section */}
                <div className="flex items-center">
                    <Link
                        className="font-headline text-xl font-black tracking-tighter text-secondary transition-all hover:opacity-80 dark:text-white"
                        href="/"
                    >
                        <span className="text-primary">
                            {__('messages.ideas')}
                        </span>{' '}
                        {__('messages.for_100')}
                    </Link>
                </div>

                {/* Centered Navigation */}
                <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.title}
                            className={cn(
                                'relative px-3 py-1.5 font-headline text-[15px] font-bold transition-all duration-300',
                                activeRoute === item.href
                                    ? 'text-primary'
                                    : 'text-on-surface-variant hover:text-on-surface dark:text-on-surface-variant dark:hover:text-white',
                            )}
                            href={item.href}
                        >
                            {item.title}
                            {activeRoute === item.href && (
                                <span className="absolute start-3 end-3 bottom-0 h-0.5 rounded-full bg-primary" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-2">
                    {auth.user ? (
                        <div className="flex items-center gap-1">
                            {auth.user.role === 'admin' ? (
                                <Button
                                    asChild
                                    className="h-9 rounded-lg bg-secondary px-4 text-sm font-bold transition-all hover:scale-[1.02] hover:bg-secondary/90 active:scale-95 ms-2 hidden md:inline-flex"
                                >
                                    <a href="/admin">
                                        {__('messages.ui.dashboard')}
                                    </a>
                                </Button>
                            ) : (
                                <Button
                                    asChild
                                    className="h-9 rounded-lg px-4 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 ms-2 hidden md:inline-flex"
                                >
                                    <Link href={create.url()}>
                                        {__('messages.ui.submit_your_idea')}
                                    </Link>
                                </Button>
                            )}

                            <NotificationBell />

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="group relative flex items-center gap-2 rounded-full border border-outline-variant/10 bg-surface-container-lowest p-1 pe-1 transition-all hover:border-primary/30 dark:border-white/10 dark:bg-card cursor-pointer">
                                        <div className="hidden flex-col md:flex items-start">
                                            <span className="text-[11px] font-bold text-on-surface dark:text-white px-1">
                                                {auth.user.name}
                                            </span>
                                        </div>
                                        <Avatar className="size-7">
                                            <AvatarImage
                                                src={auth.user.avatar}
                                                alt={auth.user.name}
                                            />
                                            <AvatarFallback className="bg-primary text-[9px] font-bold text-white">
                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    className="mt-1 w-56 rounded-xl border-outline-variant/10 p-1 shadow-xl dark:bg-surface-container-low"
                                    align="end"
                                >
                                    <div className="px-3 py-2">
                                        <div className="flex flex-col">
                                            <p className="text-xs font-bold text-on-surface dark:text-white">
                                                {auth.user.name}
                                            </p>
                                            <p className="truncate text-[10px] text-on-surface-variant">
                                                {auth.user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <DropdownMenuSeparator className="bg-outline-variant/10" />

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            asChild
                                            className="cursor-pointer gap-2.5 rounded-lg py-2 text-xs font-bold focus:bg-primary/5 focus:text-primary"
                                        >
                                            <Link href="/profile" className="w-full flex items-center gap-2.5">
                                                <UserIcon className="size-3.5" />
                                                <span>
                                                    {__(
                                                        'messages.auth.profile',
                                                    )}
                                                </span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            asChild
                                            className="cursor-pointer gap-2.5 rounded-lg py-2 text-xs font-bold focus:bg-primary/5 focus:text-primary"
                                        >
                                            <Link href={index()} className="w-full flex items-center gap-2.5">
                                                <Lightbulb className="size-3.5" />
                                                <span>
                                                    {__(
                                                        'messages.auth.my_ideas',
                                                    )}
                                                </span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator className="bg-outline-variant/10" />

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            className="flex cursor-pointer items-center justify-between gap-2.5 rounded-lg py-2 text-xs font-bold focus:bg-primary/5"
                                            onSelect={(e) => {
                                                e.preventDefault();
                                                updateAppearance(
                                                    appearance === 'dark'
                                                        ? 'light'
                                                        : 'dark',
                                                );
                                            }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                {appearance === 'dark' ? (
                                                    <Sun className="size-3.5" />
                                                ) : (
                                                    <Moon className="size-3.5" />
                                                )}
                                                <span>
                                                    {appearance === 'dark'
                                                        ? __(
                                                              'messages.ui.light_mode',
                                                          )
                                                        : __(
                                                              'messages.ui.dark_mode',
                                                          )}
                                                </span>
                                            </div>
                                            <Switch
                                                checked={appearance === 'dark'}
                                                onCheckedChange={(checked) =>
                                                    updateAppearance(
                                                        checked
                                                            ? 'dark'
                                                            : 'light',
                                                    )
                                                }
                                            />
                                        </DropdownMenuItem>

                                        <LanguageSwitcher />
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator className="bg-outline-variant/10" />

                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer gap-2.5 rounded-lg py-2 text-xs font-bold text-error focus:bg-error/5 focus:text-error"
                                    >
                                        <Link
                                            href={logout()}
                                            method="post"
                                            as="button"
                                            data={{
                                                _locale: locale,
                                            }}
                                            className="w-full flex items-center gap-2.5"
                                        >
                                            <LogOut className="size-3.5" />
                                            <span>
                                                {__('messages.auth.logout')}
                                            </span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <Button
                                asChild
                                className="h-9 rounded-lg px-4 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 ms-2 hidden md:inline-flex"
                            >
                                <Link href={login.url({ query: { redirect: window.location.pathname } })}>
                                    {__('messages.ui.submit_your_idea')}
                                </Link>
                            </Button>
                            <Link
                                className="px-3 py-2 text-sm font-bold text-on-surface-variant hover:text-on-surface dark:text-slate-400 hidden md:inline-block"
                                href={login.url({ query: { redirect: window.location.pathname } })}
                            >
                                {__('messages.auth.login')}
                            </Link>
                            <Button
                                asChild
                                variant="outline"
                                className="h-9 rounded-lg px-4 text-sm font-bold transition-all hover:scale-[1.02] hidden md:inline-flex"
                            >
                                <Link href={register.url()}>
                                    {__(
                                        'messages.auth.register',
                                    )}
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
