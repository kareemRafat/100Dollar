import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Footer } from '@/app/components/footer';
import { TopNavBar } from '@/app/components/top-nav-bar';

type Props = {
    children: ReactNode;
    activeRoute?: string;
};

export default function AppLayout({ children, activeRoute }: Props) {
    const { url } = usePage();
    const currentRoute = activeRoute || url;

    return (
        <div className="flex min-h-screen flex-col bg-surface text-on-surface">
            <TopNavBar activeRoute={currentRoute} />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
        </div>
    );
}
