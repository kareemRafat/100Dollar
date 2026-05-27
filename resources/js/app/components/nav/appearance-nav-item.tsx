import { useLang } from '@erag/lang-sync-inertia/react';
import { Moon, Sun } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

import type { Appearance } from '@/hooks/use-appearance';

interface AppearanceNavItemProps {
    appearance: string;
    updateAppearance: (mode: Appearance) => void;
}

export function AppearanceNavItem({
    appearance,
    updateAppearance,
}: AppearanceNavItemProps) {
    const { __ } = useLang();

    return (
        <DropdownMenuItem
            className="flex cursor-pointer items-center justify-between gap-2.5 rounded-lg py-2 text-xs font-bold focus:bg-primary/5"
            onSelect={(e) => {
                e.preventDefault();
                updateAppearance(
                    appearance === 'dark' ? 'light' : 'dark',
                );
            }}
        >
            <div className="flex items-center gap-2.5">
                {appearance === 'dark' ? (
                    <Sun className="size-3.5" />
                ) : (
                    <Moon className="size-3.5" />
                )}
                <span>
                    {appearance === 'dark'
                        ? __('messages.ui.light_mode')
                        : __('messages.ui.dark_mode')}
                </span>
            </div>
            <Switch
                checked={appearance === 'dark'}
                onCheckedChange={(checked) =>
                    updateAppearance(checked ? 'dark' : 'light')
                }
            />
        </DropdownMenuItem>
    );
}
