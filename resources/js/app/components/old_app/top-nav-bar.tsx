import { Link, usePage } from '@inertiajs/react';
import { Bell, Globe, LogOut, Moon, Sun, User as UserIcon, Heart, Lightbulb } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { logout } from '@/routes';
import { index } from '@/routes/app/ideas';

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

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <header className="fixed top-0 z-50 w-full border-b border-outline-variant/10 bg-surface/80 backdrop-blur-xl dark:bg-surface-container-lowest/80">
            <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link
                        className="font-headline text-xl font-black tracking-tighter text-secondary transition-all hover:opacity-80 dark:text-white"
                        href="/"
                    >
                        <span className="text-primary">أفكار</span> بـ 100$
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
                                    : 'text-on-surface-variant hover:text-on-surface dark:text-slate-400 dark:hover:text-white',
                            )}
                            href={item.href}
                        >
                            {item.title}
                            {activeRoute === item.href && (
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-2">
                    {auth.user ? (
                        <div className="flex items-center gap-1">
                            <Link href="/ideas/create" className="hidden lg:block ml-2">
                                <Button className="h-9 rounded-lg px-4 text-xs font-bold transition-all hover:scale-[1.02] active:scale-95">
                                    قدم فكرتك
                                </Button>
                            </Link>

                            <Button variant="ghost" size="icon" className="rounded-full size-9 text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-white/5">
                                <Bell className="size-4.5" />
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="group relative flex items-center gap-2 rounded-full border border-outline-variant/10 bg-surface-container-lowest p-1 pr-3 transition-all hover:border-primary/30 dark:bg-surface-container-low">
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
                                                <span>الملف الشخصي</span>
                                                <UserIcon className="size-3.5" />
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2 justify-end gap-2.5 text-right text-xs font-bold focus:bg-primary/5 focus:text-primary">
                                            <Link href={index()}>
                                                <span>أفكاري</span>
                                                <Lightbulb className="size-3.5" />
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator className="bg-outline-variant/10" />

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem 
                                            className="cursor-pointer rounded-lg py-2 justify-end gap-2.5 text-right text-xs font-bold focus:bg-primary/5"
                                            onClick={() => updateAppearance(appearance === 'dark' ? 'light' : 'dark')}
                                        >
                                            <span>{appearance === 'dark' ? 'الوضع المضيء' : 'الوضع الليلي'}</span>
                                            {appearance === 'dark' ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="cursor-pointer rounded-lg py-2 justify-end gap-2.5 text-right text-xs font-bold focus:bg-primary/5">
                                            <span className="text-[9px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full ml-auto">AR</span>
                                            <span>اللغة العربية</span>
                                            <Globe className="size-3.5" />
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator className="bg-outline-variant/10" />
                                    
                                    <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2 justify-end gap-2.5 text-right text-xs font-bold text-error focus:bg-error/5 focus:text-error">
                                        <Link href={logout()} method="post" as="button" data={{ _auth_context: 'app' }} className="w-full">
                                            <span>تسجيل الخروج</span>
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
                                تسجيل الدخول
                            </Link>
                            <Link href="/register">
                                <Button className="h-9 rounded-lg px-4 text-xs font-bold transition-all hover:scale-[1.02]">
                                    إنشاء حساب
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
