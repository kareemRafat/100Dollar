import { useLang } from '@erag/lang-sync-inertia/react';
import { usePage } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
    id: string;
    label: string;
    icon: LucideIcon;
    href: string;
};

type Props = {
    activeSection: string;
    items?: NavItem[];
    onItemClick?: (id: string) => void;
};

export function SideNav({ activeSection, items, onItemClick }: Props) {
    const { locale } = usePage().props;
    const { __ } = useLang();
    const isRtl = locale === 'ar';

    return (
        <aside className="z-40 hidden bg-surface-container-low pt-10 md:sticky md:top-20 md:flex md:w-56 md:shrink-0 md:flex-col dark:bg-surface-container-lowest">
            <div className={cn(
                "flex h-full flex-col px-3",
                isRtl ? "text-right" : "text-left"
            )}>
                <nav className="space-y-1.5">
                    {items?.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                onClick={() => onItemClick?.(item.id)}
                                className={cn(
                                    'flex w-full items-center gap-2.5 p-2.5 text-xs transition-all duration-300 ease-in-out',
                                    isRtl ? 'rounded-r-xl' : 'rounded-l-xl',
                                    activeSection === item.id
                                        ? 'bg-surface-container-lowest font-black text-primary shadow-sm dark:bg-card'
                                        : 'text-on-surface-variant hover:bg-surface-container-lowest/50 dark:hover:bg-on-surface/10',
                                )}
                            >
                                <Icon className="size-4.5" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
                <div className={cn(
                    "mt-auto mb-6",
                    isRtl ? "pr-3" : "pl-3"
                )}>
                    <button
                        className="flex items-center gap-2.5 text-xs font-bold text-error transition-opacity hover:opacity-80"
                        type="button"
                    >
                        <LogOut className="size-4.5" />
                        <span>{__('messages.auth.logout')}</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
