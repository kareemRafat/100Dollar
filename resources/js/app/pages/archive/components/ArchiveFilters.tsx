import { useLang } from '@erag/lang-sync-inertia/react';
import { 
    Shapes, 
    Calendar, 
    CalendarDays, 
    Trophy,
    FilterX
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Category } from '@/types';

type Props = {
    filters: {
        category?: string;
        day?: string;
        month?: string;
        status?: string;
    };
    categories: Category[];
    onFilterChange: (name: string, value: string) => void;
    onClearFilters: () => void;
    locale: string;
};

export function ArchiveFilters({ filters, categories, onFilterChange, onClearFilters, locale }: Props) {
    const { __ } = useLang();

    const days = [
        { value: '0', label: __('messages.sponsors.days.sunday') },
        { value: '1', label: __('messages.sponsors.days.monday') },
        { value: '2', label: __('messages.sponsors.days.tuesday') },
        { value: '3', label: __('messages.sponsors.days.wednesday') },
        { value: '4', label: __('messages.sponsors.days.thursday') },
        { value: '5', label: __('messages.sponsors.days.friday') },
        { value: '6', label: __('messages.sponsors.days.saturday') },
    ];

    const months = [
        { value: '1', label: __('messages.archive.months.1') },
        { value: '2', label: __('messages.archive.months.2') },
        { value: '3', label: __('messages.archive.months.3') },
        { value: '4', label: __('messages.archive.months.4') },
        { value: '5', label: __('messages.archive.months.5') },
        { value: '6', label: __('messages.archive.months.6') },
        { value: '7', label: __('messages.archive.months.7') },
        { value: '8', label: __('messages.archive.months.8') },
        { value: '9', label: __('messages.archive.months.9') },
        { value: '10', label: __('messages.archive.months.10') },
        { value: '11', label: __('messages.archive.months.11') },
        { value: '12', label: __('messages.archive.months.12') },
    ];

    const filterKeys = ['category', 'day', 'month', 'status'] as const;
    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
        <div className="mb-8 w-full">
            <div className="-mx-4 flex items-start gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-row sm:flex-wrap sm:items-center sm:overflow-visible sm:px-0 sm:pb-0">
                {/* Category Filter */}
                <div className="shrink-0">
                    <Select 
                        value={filters.category || 'all'} 
                        onValueChange={(v) => onFilterChange('category', v)}
                    >
                        <SelectTrigger className="bg-surface-container-low dark:bg-surface-container-high border-none h-10 px-4 font-medium transition-colors hover:bg-surface-container-high dark:hover:bg-surface-container-highest min-w-[140px]">
                            <div className="flex items-center gap-2">
                                <Shapes className="size-4 text-primary" />
                                <SelectValue placeholder={__('messages.archive.all_fields')} />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{__('messages.archive.all_fields')}</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                    {locale === 'ar' ? cat.name_ar : cat.name_en}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Day Filter */}
                <div className="shrink-0">
                    <Select 
                        value={filters.day || 'all'} 
                        onValueChange={(v) => onFilterChange('day', v)}
                    >
                        <SelectTrigger className="bg-surface-container-low dark:bg-surface-container-high border-none h-10 px-4 font-medium transition-colors hover:bg-surface-container-high dark:hover:bg-surface-container-highest min-w-[140px]">
                            <div className="flex items-center gap-2">
                                <Calendar className="size-4 text-primary" />
                                <SelectValue placeholder={__('messages.archive.all_days')} />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{__('messages.archive.all_days')}</SelectItem>
                            {days.map((day) => (
                                <SelectItem key={day.value} value={day.value}>
                                    {day.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Month Filter */}
                <div className="shrink-0">
                    <Select 
                        value={filters.month || 'all'} 
                        onValueChange={(v) => onFilterChange('month', v)}
                    >
                        <SelectTrigger className="bg-surface-container-low dark:bg-surface-container-high border-none h-10 px-4 font-medium transition-colors hover:bg-surface-container-high dark:hover:bg-surface-container-highest min-w-[140px]">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="size-4 text-primary" />
                                <SelectValue placeholder={__('messages.archive.all_months')} />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{__('messages.archive.all_months')}</SelectItem>
                            {months.map((m) => (
                                <SelectItem key={m.value} value={m.value}>
                                    {m.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Status Filter */}
                <div className="shrink-0">
                    <Select 
                        value={filters.status || 'all'} 
                        onValueChange={(v) => onFilterChange('status', v)}
                    >
                        <SelectTrigger className="bg-surface-container-low dark:bg-surface-container-high border-none h-10 px-4 font-medium transition-colors hover:bg-surface-container-high dark:hover:bg-surface-container-highest min-w-[140px]">
                            <div className="flex items-center gap-2">
                                <Trophy className="size-4 text-primary" />
                                <SelectValue placeholder={__('messages.archive.all_statuses')} />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{__('messages.archive.all_statuses')}</SelectItem>
                            <SelectItem value="winner">{__('messages.archive.winner_status')}</SelectItem>
                            <SelectItem value="non_winner">{__('messages.archive.non_winner_status')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {hasActiveFilters && (
                    <button 
                        onClick={onClearFilters}
                        className="flex shrink-0 items-center gap-1 text-sm font-bold text-primary hover:underline sm:ms-auto"
                    >
                        <FilterX className="size-4" />
                        {__('messages.archive.clear_filter')}
                    </button>
                )}
            </div>
        </div>
    );
}
