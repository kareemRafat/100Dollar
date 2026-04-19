import type { ReactNode } from 'react';
import { TopNavBar } from '@/app/components/old_app/top-nav-bar';
import { Footer } from '@/app/components/old_app/footer';

type Props = {
    children: ReactNode;
    activeRoute?: string;
};

export default function AppLayout({ children, activeRoute }: Props) {
    return (
        <div className="bg-surface text-on-surface flex min-h-screen flex-col">
            <TopNavBar activeRoute={activeRoute} />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
        </div>
    );
}
