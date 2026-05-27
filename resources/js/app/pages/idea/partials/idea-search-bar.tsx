import { useLang } from '@erag/lang-sync-inertia/react';
import {
    Search,
    LayoutGrid,
    Clock,
    CheckCircle,
    Trophy,
    XCircle,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { IdeaStatus } from '@/types';

interface FilterProps {
    search?: string;
    status?: IdeaStatus;
}

interface IdeaSearchBarProps {
    search: string;
    onSearchChange: (value: string) => void;
    filters: FilterProps;
    onFilterChange: (status: IdeaStatus | null) => void;
}

const statusFilters: { key: string; status: IdeaStatus | null; icon: any; label: string }[] = [
    { key: 'all', status: null, icon: LayoutGrid, label: 'messages.my_ideas.filter_all' },
    { key: IdeaStatus.PENDING, status: IdeaStatus.PENDING, icon: Clock, label: 'messages.my_ideas.filter_pending' },
    { key: IdeaStatus.APPROVED, status: IdeaStatus.APPROVED, icon: CheckCircle, label: 'messages.my_ideas.filter_approved' },
    { key: IdeaStatus.WINNER, status: IdeaStatus.WINNER, icon: Trophy, label: 'messages.my_ideas.filter_winner' },
    { key: IdeaStatus.REJECTED, status: IdeaStatus.REJECTED, icon: XCircle, label: 'messages.my_ideas.filter_rejected' },
];

export function IdeaSearchBar({
    search,
    onSearchChange,
    filters,
    onFilterChange,
}: IdeaSearchBarProps) {
    const { __ } = useLang();

    return (
        <div className="mb-8 flex flex-col items-center justify-between gap-6 rounded-2xl bg-surface-container-low p-5 md:flex-row dark:bg-surface-container-high">
            <div className="relative w-full md:w-96">
                <Search className="absolute end-3 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant/60" />
                <Input
                    type="search"
                    className="h-10 border-none bg-surface-container-lowest ps-4 pe-10 text-sm focus-visible:ring-1 focus-visible:ring-primary dark:bg-surface-container-low dark:text-white"
                    placeholder={__('messages.my_ideas.search_placeholder')}
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
                {statusFilters.map(({ key, status, icon: Icon, label }) => (
                    <Button
                        key={key}
                        className={cn(
                            'h-11 cursor-pointer rounded-xl px-5 text-xs font-black transition-all duration-300 flex items-center gap-2.5 shrink-0',
                            (status === null ? !filters.status : filters.status === status) && 'shadow-md shadow-primary/20',
                        )}
                        variant={
                            (status === null ? !filters.status : filters.status === status)
                                ? 'default'
                                : 'secondary'
                        }
                        onClick={() => onFilterChange(status)}
                    >
                        <Icon className={cn(
                            'size-4 transition-transform duration-300',
                            (status === null ? !filters.status : filters.status === status) ? 'scale-110' : 'opacity-60',
                        )} />
                        {__(label)}
                    </Button>
                ))}
            </div>
        </div>
    );
}
