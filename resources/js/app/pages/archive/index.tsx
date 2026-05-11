import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, router, usePage } from '@inertiajs/react';
import { useCallback } from 'react';
import { index } from '@/actions/App/Http/Controllers/App/ArchiveController';
import type { Category, Idea } from '@/types';
import { ArchiveFilters } from './components/ArchiveFilters';
import { ArchiveHero } from './components/ArchiveHero';
import { ArchiveSearch } from './components/ArchiveSearch';
import { ArchiveSort } from './components/ArchiveSort';
import IdeaList from './components/IdeaList';

type Props = {
    filters: {
        search?: string;
        category?: string;
        day?: string;
        month?: string;
        status?: string;
        sort?: string;
    };
    categories: Category[];
    ideas: {
        data: Idea[];
        links: {
            first: string;
            last: string;
            prev: string | null;
            next: string | null;
        };
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            links: {
                url: string | null;
                label: string;
                active: boolean;
            }[];
            path: string;
            per_page: number;
            to: number;
            total: number;
        };
    };
};

export default function Archive({ filters = {}, categories = [], ideas }: Props) {
    const { __ } = useLang();
    const { locale } = usePage().props as any;

    const updateFilters = useCallback((updatedFilters: any, showProgress = true) => {
        const newFilters = { ...filters, ...updatedFilters };

        // Remove 'all' and empty values to keep URL clean
        Object.keys(newFilters).forEach((key) => {
            const val = newFilters[key];
            
            if (val === 'all' || val === '' || val === undefined || val === null) {
                delete newFilters[key];
            }
        });

        router.get(index.url(), newFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['ideas', 'filters'],
            showProgress,
        });
    }, [filters]);

    const handleFilterChange = useCallback((name: string, value: string) => {
        updateFilters({ [name]: value });
    }, [updateFilters]);

    const handleSearch = useCallback((value: string) => {
        updateFilters({ search: value }, false);
    }, [updateFilters]);

    const handleSortChange = useCallback((value: string) => {
        updateFilters({ sort: value });
    }, [updateFilters]);

    const handleClearFilters = useCallback(() => {
        router.get(index.url(), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['ideas', 'filters'],
        });
    }, []);

    return (
        <>
            <Head title={__('messages.nav.archive')} />

            <ArchiveHero />

            <div className="mx-auto flex max-w-7xl flex-col px-4 pb-12 sm:px-6">
                <ArchiveSearch
                    defaultValue={filters.search}
                    onSearch={handleSearch}
                />

                <ArchiveFilters
                    filters={filters}
                    categories={categories}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                    locale={locale}
                />

                <ArchiveSort
                    value={filters.sort || 'newest'}
                    onSortChange={handleSortChange}
                />

                <IdeaList
                    ideas={ideas}
                    key={JSON.stringify(filters)}
                />
            </div>
        </>
    );
}
