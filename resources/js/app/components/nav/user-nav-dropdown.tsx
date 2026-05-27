import { useLang } from '@erag/lang-sync-inertia/react';
import { Link } from '@inertiajs/react';
import { LogOut, User as UserIcon, Lightbulb } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { index } from '@/routes/app/ideas';
import { personalInfo as profilePersonalInfo } from '@/routes/app/profile';
import { logout } from '@/routes';

import type { Appearance } from '@/hooks/use-appearance';
import { AppearanceNavItem } from './appearance-nav-item';

interface UserNavDropdownProps {
    user: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
    getInitials: (name: string) => string;
    locale: string;
    appearance: string;
    updateAppearance: (mode: Appearance) => void;
}

export function UserNavDropdown({
    user,
    getInitials,
    locale,
    appearance,
    updateAppearance,
}: UserNavDropdownProps) {
    const { __ } = useLang();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="group relative flex cursor-pointer items-center gap-2 rounded-full border border-outline-variant/10 bg-surface-container-lowest p-1 pe-1 transition-all hover:border-primary/30 dark:border-white/10 dark:bg-card">
                    <div className="hidden flex-col items-start md:flex">
                        <span className="px-1 text-[11px] font-bold text-on-surface dark:text-white">
                            {user.name}
                        </span>
                    </div>
                    <Avatar className="size-7">
                        <AvatarImage
                            src={user.avatar}
                            alt={user.name}
                        />
                        <AvatarFallback className="bg-primary text-[9px] font-bold text-white">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="mt-1 w-56 rounded-xl border-outline-variant/10 p-1 shadow-xl dark:bg-surface-container-low"
                align="end"
            >
                <div className="px-3 py-2">
                    <div className="flex flex-col">
                        <p className="text-xs font-bold text-on-surface dark:text-white">
                            {user.name}
                        </p>
                        <p className="truncate text-[10px] text-on-surface-variant">
                            {user.email}
                        </p>
                    </div>
                </div>

                <DropdownMenuSeparator className="bg-outline-variant/10" />

                <DropdownMenuGroup>
                    <DropdownMenuItem
                        asChild
                        className="cursor-pointer gap-2.5 rounded-lg py-2 text-xs font-bold focus:bg-primary/5 focus:text-primary"
                    >
                        <Link
                            href={profilePersonalInfo().url}
                            className="flex w-full items-center gap-2.5"
                        >
                            <UserIcon className="size-3.5" />
                            <span>
                                {__('messages.auth.profile')}
                            </span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        asChild
                        className="cursor-pointer gap-2.5 rounded-lg py-2 text-xs font-bold focus:bg-primary/5 focus:text-primary"
                    >
                        <Link
                            href={index()}
                            className="flex w-full items-center gap-2.5"
                        >
                            <Lightbulb className="size-3.5" />
                            <span>
                                {__('messages.auth.my_ideas')}
                            </span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-outline-variant/10" />

                <DropdownMenuGroup>
                    <AppearanceNavItem
                        appearance={appearance}
                        updateAppearance={updateAppearance}
                    />
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-outline-variant/10" />

                <DropdownMenuItem
                    asChild
                    className="cursor-pointer gap-2.5 rounded-lg py-2 text-xs font-bold text-error focus:bg-error/5 focus:text-error"
                >
                    <Link
                        href={logout()}
                        method="post"
                        as="button"
                        data={{
                            _locale: locale,
                        }}
                        className="flex w-full items-center gap-2.5"
                    >
                        <LogOut className="size-3.5" />
                        <span>
                            {__('messages.auth.logout')}
                        </span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
