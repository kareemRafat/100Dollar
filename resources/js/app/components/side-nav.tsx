import type { LucideIcon } from 'lucide-react';
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
    return (
        <aside className="hidden w-64 border-e border-outline-variant/10 md:block dark:border-white/5">
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
                                        'flex w-full cursor-pointer items-center gap-2.5 rounded-xl p-2.5 text-sm transition-all duration-300 ease-in-out',
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
                    </div>
                </div>
            </div>
        </aside>
    );
}
