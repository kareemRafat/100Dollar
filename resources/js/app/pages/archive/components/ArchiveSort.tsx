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
        <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-medium text-outline">
                {__('messages.archive.sort_by')}:
            </span>
            <Select value={value || 'newest'} onValueChange={onSortChange}>
                <SelectTrigger className="w-[180px] bg-transparent border-none focus:ring-0 font-bold text-primary p-0 h-auto">
                    <div className="flex items-center gap-2">
                        <ArrowUpDown className="size-4" />
                        <SelectValue />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">{__('messages.archive.sort_newest')}</SelectItem>
                    <SelectItem value="popular">{__('messages.archive.sort_popular')}</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
