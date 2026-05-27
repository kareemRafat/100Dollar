import { useLang } from '@erag/lang-sync-inertia/react';
import { Link } from '@inertiajs/react';
import { LogOut, Menu } from 'lucide-react';
import { create } from '@/actions/App/Http/Controllers/App/IdeaController';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { logout, login, register } from '@/routes';
import { personalInfo as profilePersonalInfo } from '@/routes/app/profile';
import type { Appearance } from '@/hooks/use-appearance';
import type { NavItem } from '@/types';

interface MobileNavSheetProps {
    navItems: NavItem[];
    isActive: (href: string | { url: string }) => boolean;
    isRtl: boolean;
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            avatar?: string;
            role?: string;
        } | null;
    };
    locale: string;
    appearance: string;
    updateAppearance: (mode: Appearance) => void;
    getInitials: (name: string) => string;
}

export function MobileNavSheet({
    navItems,
    isActive,
    isRtl,
    auth,
    locale,
    appearance,
    updateAppearance,
    getInitials,
}: MobileNavSheetProps) {
    const { __ } = useLang();

    return (
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
                    <SheetTitle
                        className={cn(
                            'font-headline text-lg font-black tracking-tighter text-secondary dark:text-white',
                            isRtl ? 'text-right' : 'text-left',
                        )}
                    >
                        <span className="text-primary">
                            {__('messages.ideas')}
                        </span>{' '}
                        {__('messages.for_100')}
                    </SheetTitle>
                </SheetHeader>

                <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto p-4">
                    <div className="flex flex-col gap-0.5">
                        {navItems.map((item) => (
                            <SheetClose asChild key={item.title}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center rounded-xl px-4 py-2.5 font-headline text-sm font-bold transition-all',
                                        isActive(item.href)
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
                    </div>

                    <div className="mt-8 flex flex-col gap-3">
                        {auth.user ? (
                            <div className="flex flex-col gap-4">
                                <SheetClose asChild>
                                    <Link
                                        href={profilePersonalInfo().url}
                                        className="flex items-center gap-3 rounded-xl p-2 transition-all hover:bg-surface-container-high dark:hover:bg-white/5"
                                    >
                                        <Avatar className="size-10">
                                            <AvatarImage
                                                src={auth.user.avatar}
                                                alt={auth.user.name}
                                            />
                                            <AvatarFallback className="bg-primary font-bold text-white">
                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div
                                            className={cn(
                                                'flex flex-col',
                                                isRtl
                                                    ? 'text-right'
                                                    : 'text-left',
                                            )}
                                        >
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
                                                className="h-9 rounded-xl bg-secondary text-xs font-bold"
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
                                                className="h-9 rounded-xl text-xs font-bold"
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
                                            className="h-9 rounded-xl border-error/20 text-xs font-bold text-error hover:bg-error/5"
                                        >
                                            <Link
                                                href={logout()}
                                                method="post"
                                                as="button"
                                                data={{
                                                    _locale: locale,
                                                }}
                                            >
                                                <LogOut className="me-1.5 size-3.5" />
                                                {__('messages.auth.logout')}
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
                                        className="h-9 rounded-xl text-xs font-bold transition-all active:scale-[0.98]"
                                    >
                                        <Link
                                            href={login.url({
                                                query: {
                                                    redirect:
                                                        window.location.pathname,
                                                },
                                            })}
                                        >
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
                                            className="h-9 rounded-xl text-xs font-bold"
                                        >
                                            <Link
                                                href={login.url({
                                                    query: {
                                                        redirect:
                                                            window.location
                                                                .pathname,
                                                    },
                                                })}
                                            >
                                                {__('messages.auth.login')}
                                            </Link>
                                        </Button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="h-9 rounded-xl text-xs font-bold"
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
    );
}
