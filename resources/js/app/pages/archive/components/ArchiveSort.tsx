import { useLang } from '@erag/lang-sync-inertia/react';
import { ArrowUpDown } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Props = {
    value: string;
    onSortChange: (value: string) => void;
};

export function ArchiveSort({ value, onSortChange }: Props) {
    const { __ } = useLang();

    return (
        <div className="mb-6 flex items-center">
            <Select value={value} onValueChange={onSortChange}>
                <SelectTrigger className="h-9 w-fit rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 font-bold text-primary transition-all hover:bg-surface-container-high focus:ring-2 focus:ring-primary/20 dark:bg-surface-container-high dark:hover:bg-surface-container-highest">
                    <div className="flex items-center gap-2">
                        <ArrowUpDown className="size-4 text-outline" />
                        <span className="text-sm font-medium text-outline">
                            {__('messages.archive.sort_by')}:
                        </span>
                        <SelectValue
                            placeholder={__('messages.archive.sort_newest')}
                        />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">
                        {__('messages.archive.sort_newest')}
                    </SelectItem>
                    <SelectItem value="popular">
                        {__('messages.archive.sort_popular')}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
