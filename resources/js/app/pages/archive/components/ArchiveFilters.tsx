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

type Category = {
    id: number;
    name_ar: string;
    name_en: string;
    icon: string;
};

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
        { value: '1', label: 'يناير' },
        { value: '2', label: 'فبراير' },
        { value: '3', label: 'مارس' },
        { value: '4', label: 'أبريل' },
        { value: '5', label: 'مايو' },
        { value: '6', label: 'يونيو' },
        { value: '7', label: 'يوليو' },
        { value: '8', label: 'أغسطس' },
        { value: '9', label: 'سبتمبر' },
        { value: '10', label: 'أكتوبر' },
        { value: '11', label: 'نوفمبر' },
        { value: '12', label: 'ديسمبر' },
    ];

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

                <button 
                    onClick={onClearFilters}
                    className="ms-auto hidden shrink-0 items-center gap-1 text-sm font-bold text-primary hover:underline sm:flex"
                >
                    <FilterX className="size-4" />
                    {__('messages.archive.clear_filter')}
                </button>
            </div>
        </div>
    );
}
