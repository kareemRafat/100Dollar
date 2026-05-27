import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

interface DesktopNavLinksProps {
    navItems: NavItem[];
    isActive: (href: string | { url: string }) => boolean;
}

export function DesktopNavLinks({ navItems, isActive }: DesktopNavLinksProps) {
    return (
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {navItems.map((item) => (
                <Link
                    key={item.title}
                    className={cn(
                        'group relative px-3 py-1.5 font-headline text-[15px] font-bold transition-all duration-300',
                        isActive(item.href)
                            ? 'text-primary'
                            : 'text-on-surface-variant hover:text-on-surface dark:text-on-surface-variant dark:hover:text-white',
                    )}
                    href={item.href}
                >
                    {item.title}
                    <span
                        className={cn(
                            'absolute start-3 end-3 bottom-0 h-0.5 origin-center rounded-full bg-primary transition-transform duration-300',
                            isActive(item.href)
                                ? 'scale-x-100'
                                : 'scale-x-0 group-hover:scale-x-100',
                        )}
                    />
                </Link>
            ))}
        </div>
    );
}
