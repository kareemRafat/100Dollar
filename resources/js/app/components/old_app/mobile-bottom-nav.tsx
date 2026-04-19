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
        label: 'الشخصية',
        icon: 'person',
        href: '#personal-info',
    },
    {
        id: 'password-security',
        label: 'الأمان',
        icon: 'shield',
        href: '#password-security',
    },
    {
        id: 'protection',
        label: 'الحماية',
        icon: 'lock_person',
        href: '#protection',
    },
];

export function MobileBottomNav({
    activeSection,
    items = defaultItems,
}: Props) {
    return (
        <nav className="fixed right-0 bottom-0 left-0 z-50 flex justify-around border-t-0 bg-surface p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden">
            {items.map((item) => (
                <a
                    key={item.id}
                    className={cn(
                        'flex flex-col items-center',
                        activeSection === item.id
                            ? 'text-primary'
                            : 'text-secondary opacity-60',
                    )}
                    href={item.href}
                >
                    <span className="material-symbols-outlined">
                        {item.icon}
                    </span>
                    <span className="mt-1 text-[10px] font-bold">
                        {item.label}
                    </span>
                </a>
            ))}
            <a
                className="flex flex-col items-center text-error opacity-80"
                href="#"
            >
                <span className="material-symbols-outlined">logout</span>
                <span className="mt-1 text-[10px]">الخروج</span>
            </a>
        </nav>
    );
}
