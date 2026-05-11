import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, router, usePage } from '@inertiajs/react';
import { ArchiveHero } from './components/ArchiveHero';
import { ArchiveSearch } from './components/ArchiveSearch';
import { ArchiveFilters } from './components/ArchiveFilters';
import { ArchiveSort } from './components/ArchiveSort';
import { IdeaList } from './components/IdeaList';
import { useCallback } from 'react';
import { index } from '@/actions/App/Http/Controllers/App/ArchiveController';

type Props = {
    filters: {
        search?: string;
        category?: string;
        day?: string;
        month?: string;
        status?: string;
        sort?: string;
    };
    categories: any[];
    ideas: any;
};

export default function Archive({ filters, categories, ideas }: Props) {
    const { __ } = useLang();
    const { locale } = usePage().props as any;

    const handleFilterChange = useCallback((name: string, value: string) => {
        const newFilters = { ...filters, [name]: value === 'all' ? undefined : value };
        
        router.get(index.url(), newFilters, {
            preserveState: true,
            preserveScroll: true,
            only: ['ideas', 'filters'],
        });
    }, [filters]);

    const handleSearch = useCallback((value: string) => {
        router.get(index.url(), { ...filters, search: value || undefined }, {
            preserveState: true,
            preserveScroll: true,
            only: ['ideas', 'filters'],
        });
    }, [filters]);

    const handleSortChange = useCallback((value: string) => {
        router.get(index.url(), { ...filters, sort: value }, {
            preserveState: true,
            preserveScroll: true,
            only: ['ideas', 'filters'],
        });
    }, [filters]);

    const handleClearFilters = useCallback(() => {
        router.get(index.url(), {}, {
            preserveState: true,
            preserveScroll: true,
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
                    locale={locale} 
                />
            </div>
        </>
    );
}
