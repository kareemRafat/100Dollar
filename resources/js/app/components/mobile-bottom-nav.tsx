import { useLang } from '@erag/lang-sync-inertia/react';
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

export function MobileBottomNav({
    activeSection,
    items,
    onItemClick,
}: Props) {
    const { __ } = useLang();

    return (
        <nav className="fixed right-0 bottom-0 left-0 z-50 flex justify-around border-t border-outline-variant/10 bg-surface/80 p-3 backdrop-blur-xl md:hidden dark:border-white/5 dark:bg-surface-container-lowest/80">
            {items?.map((item) => {
                const Icon = item.icon;

                return (
                    <button
                        key={item.id}
                        onClick={() => onItemClick?.(item.id)}
                        className={cn(
                            'flex flex-col items-center transition-all',
                            activeSection === item.id
                                ? 'text-primary'
                                : 'text-on-surface-variant/60',
                        )}
                    >
                        <Icon className="size-6" />
                    </button>
                );
            })}
        </nav>
    );
}
