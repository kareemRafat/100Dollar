import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

type NavItem = {
    id: string;
    label: string;
    icon: string;
    href: string;
};

type Props = {
    activeSection: string;
    items?: NavItem[];
};

const defaultItems: NavItem[] = [
    {
        id: 'personal-info',
        label: 'المعلومات الشخصية',
        icon: 'person',
        href: '#personal-info',
    },
    {
        id: 'password-security',
        label: 'كلمة المرور والأمان',
        icon: 'shield',
        href: '#password-security',
    },
    {
        id: 'protection',
        label: 'إعدادات الحماية',
        icon: 'lock_person',
        href: '#protection',
    },
];

export function SideNav({ activeSection, items = defaultItems }: Props) {
    return (
        <aside className="z-40 hidden bg-surface-container-low pt-10 md:sticky md:top-20 md:flex md:w-56 md:shrink-0 md:flex-col dark:bg-surface-container-lowest">
            <div className="rtl flex h-full flex-col px-3 text-right">
                <nav className="space-y-1.5">
                    {items.map((item) => (
                        <Link
                            key={item.id}
                            className={cn(
                                'mr-2 flex items-center justify-start gap-2.5 rounded-r-lg p-2 text-xs transition-all duration-300 ease-in-out',
                                activeSection === item.id
                                    ? 'bg-surface-container-lowest font-bold text-primary dark:bg-deep-navy'
                                    : 'pr-5 text-deep-navy hover:bg-surface-container-lowest/50 dark:text-on-surface-variant dark:hover:bg-on-surface/10',
                            )}
                            href={item.href}
                        >
                            <span className="material-symbols-outlined text-lg">
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto mb-6 pr-3">
                    <button
                        className="flex items-center gap-2.5 text-xs font-semibold text-error transition-opacity hover:opacity-80"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-lg">
                            logout
                        </span>
                        <span>الخروج</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
