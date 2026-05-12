import { Link } from '@inertiajs/react';
import { Handshake, LayoutGrid, Users, FileText, Trophy } from 'lucide-react';
import AppLogo from '@/admin/components/app-logo';
import { NavMain } from '@/admin/components/nav-main';
import { NavUser } from '@/admin/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import admin from '@/routes/admin';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'المستخدمين',
        href: admin.users.index().url,
        icon: Users,
    },
    {
        title: 'الرعاة',
        href: admin.sponsors.index().url,
        icon: Handshake,
    },
    {
        title: 'طلبات الرعاية',
        href: admin.sponsorshipRequests.index().url,
        icon: FileText,
    },
    {
        title: 'الجوائز',
        href: admin.prizes.index().url,
        icon: Trophy,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" side="right">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={admin.dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
