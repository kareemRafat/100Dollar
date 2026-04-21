import { useLang } from '@erag/lang-sync-inertia/react';
import { Link, usePage } from '@inertiajs/react';
import { Bell, LogOut, Moon, Sun, User as UserIcon, Lightbulb } from 'lucide-react';
import LanguageSwitcher from '@/components/language-switcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { logout } from '@/routes';
import { index } from '@/routes/app/ideas';
import type { NavItem } from '@/types';




type Props = {
    activeRoute?: string;
};

export function TopNavBar({ activeRoute }: Props) {
    const { auth } = usePage().props;
    const { appearance, updateAppearance } = useAppearance();
    const { __ } = useLang();

    const navItems: NavItem[] = [
        { title: __('messages.nav.home'), href: '/' },
        { title: __('messages.nav.archive'), href: '/archive' },
        { title: __('messages.nav.sponsors'), href: '/sponsors' },
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

    return (
        <header className="fixed top-0 z-50 w-full border-b border-outline-variant/10 bg-surface/80 backdrop-blur-xl dark:border-white/5 dark:bg-surface/80">
            <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link
                        className="font-headline text-xl font-black tracking-tighter text-secondary transition-all hover:opacity-80 dark:text-white"
                        href="/"
                    >
                        <span className="text-primary">{__('messages.ideas')}</span> {__('messages.for_100')}
                    </Link>
                </div>

                {/* Centered Navigation */}
                <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.title}
                            className={cn(
                                'font-headline relative px-3 py-1.5 text-sm font-bold transition-all duration-300',
                                activeRoute === item.href
                                    ? 'text-primary'
                                    : 'text-on-surface-variant hover:text-on-surface dark:text-on-surface-variant dark:hover:text-white',
                            )}
                            href={item.href}
                        >
                            {item.title}
                            {activeRoute === item.href && (
                                <span className="absolute bottom-0 start-3 end-3 h-0.5 rounded-full bg-primary" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-2">
                    {auth.user ? (
                        <div className="flex items-center gap-1">
                            {auth.user.role === 'admin' ? (
                                <Link href="/admin" className="hidden lg:block ms-2">
                                    <Button className="h-9 rounded-lg px-4 text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 bg-secondary hover:bg-secondary/90">
                                        {__('messages.ui.dashboard')}
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/ideas/create" className="hidden lg:block ms-2">
                                    <Button className="h-9 rounded-lg px-4 text-xs font-bold transition-all hover:scale-[1.02] active:scale-95">
                                        {__('messages.ui.submit_your_idea')}
                                    </Button>
                                </Link>
                            )}

                            <Button variant="ghost" size="icon" className="rounded-full size-9 text-on-surface-variant hover:bg-surface-container-high dark:text-on-surface-variant dark:hover:bg-white/5">
                                <Bell className="size-4.5" />
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="group relative flex items-center gap-2 rounded-full border border-outline-variant/10 bg-surface-container-lowest p-1 pe-3 transition-all hover:border-primary/30 dark:border-white/10 dark:bg-card">
                                        <div className="hidden flex-col items-end sm:flex">
                                            <span className="text-[11px] font-bold text-on-surface dark:text-white">{auth.user.name}</span>
                                        </div>
                                        <Avatar className="size-7">
                                            <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                            <AvatarFallback className="bg-primary text-[9px] font-bold text-white">
                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="mt-1 w-56 origin-top-right rounded-xl border-outline-variant/10 p-1 shadow-xl dark:bg-surface-container-low" align="end">
                                    <div className="px-3 py-2">
                                        <div className="flex flex-col text-right">
                                            <p className="text-xs font-bold text-on-surface dark:text-white">{auth.user.name}</p>
                                            <p className="text-[10px] text-on-surface-variant truncate">{auth.user.email}</p>
                                        </div>
                                    </div>

                                    <DropdownMenuSeparator className="bg-outline-variant/10" />

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2 justify-end gap-2.5 text-right text-xs font-bold focus:bg-primary/5 focus:text-primary">
                                            <Link href="/profile">
                                                <span>{__('messages.auth.profile')}</span>
                                                <UserIcon className="size-3.5" />
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2 justify-end gap-2.5 text-right text-xs font-bold focus:bg-primary/5 focus:text-primary">
                                            <Link href={index()}>
                                                <span>{__('messages.auth.my_ideas')}</span>
                                                <Lightbulb className="size-3.5" />
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator className="bg-outline-variant/10" />

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            className="cursor-pointer rounded-lg py-2 flex items-center justify-between gap-2.5 text-xs font-bold focus:bg-primary/5"
                                            onSelect={(e) => {
                                                e.preventDefault();
                                                updateAppearance(appearance === 'dark' ? 'light' : 'dark');
                                            }}
                                        >
                                            <Switch
                                                checked={appearance === 'dark'}
                                                onCheckedChange={(checked) => updateAppearance(checked ? 'dark' : 'light')}
                                            />
                                            <div className="flex items-center gap-2.5">
                                                <span>{appearance === 'dark' ? __('messages.ui.light_mode') : __('messages.ui.dark_mode')}</span>
                                                {appearance === 'dark' ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
                                            </div>
                                        </DropdownMenuItem>

                                        <LanguageSwitcher />
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator className="bg-outline-variant/10" />

                                    <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2 justify-end gap-2.5 text-right text-xs font-bold text-error focus:bg-error/5 focus:text-error">
                                        <Link href={logout()} method="post" as="button" data={{ _auth_context: 'app' }} className="w-full">
                                            <span>{__('messages.auth.logout')}</span>
                                            <LogOut className="size-3.5" />
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <Link
                                className="px-3 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface dark:text-slate-400"
                                href="/login"
                            >
                                {__('messages.auth.login')}
                            </Link>
                            <Link href="/register">
                                <Button className="h-9 rounded-lg px-4 text-xs font-bold transition-all hover:scale-[1.02]">
                                    {__('messages.auth.register')}
                                </Button>
                            </Link>
                        </div>
                    )}

                    {! auth.user && (
                        <Link href="/login" className="hidden lg:block ms-1">
                            <Button className="h-9 rounded-lg px-4 text-xs font-bold transition-all hover:scale-[1.02] active:scale-95">
                                {__('messages.ui.submit_your_idea')}
                            </Button>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
