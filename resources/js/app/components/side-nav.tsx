import { useLang } from '@erag/lang-sync-inertia/react';
import { usePage, router } from '@inertiajs/react';
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
    items: NavItem[];
    activeSection: string;
    onItemClick?: (id: string) => void;
};

export function SideNav({ items, activeSection, onItemClick }: Props) {
    const { locale } = usePage().props;
    const { __ } = useLang();
    const isRtl = locale === 'ar';

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <aside className="hidden w-64 border-r border-outline-variant/10 dark:border-white/5 md:block">
            <div className="flex h-full flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-1">
                        {items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onItemClick?.(item.id)}
                                    className={cn(
                                        'flex w-full items-center gap-2.5 p-2.5 text-xs transition-all duration-300 ease-in-out cursor-pointer',
                                        isRtl ? 'rounded-r-xl flex-row' : 'rounded-l-xl flex-row',
                                        activeSection === item.id
                                            ? 'bg-surface-container-lowest font-black text-primary shadow-sm dark:bg-card'
                                            : 'text-on-surface-variant hover:bg-surface-container-lowest/50 dark:hover:bg-on-surface/10',
                                        isRtl ? 'text-right justify-start flex-row-reverse' : 'text-left justify-start'
                                    )}
                                >
                                    <Icon className="size-4.5" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-auto p-4 border-t border-outline-variant/10 dark:border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 p-3 text-xs font-bold text-error transition-all hover:bg-error/5 rounded-xl cursor-pointer"
                    >
                        <LogOut className="size-4.5" />
                        <span>{__('messages.auth.logout')}</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
