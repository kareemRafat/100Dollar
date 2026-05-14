import { Head, WhenVisible } from '@inertiajs/react';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Skeleton } from '@/components/ui/skeleton';
import admin from '@/routes/admin';
import { CountryDistribution } from './components/country-distribution';
import { StatsCards } from './components/stats-cards';
import { TopIdeas } from './components/top-ideas';
import { TrendsCharts } from './components/trends-charts';

interface DashboardProps {
    stats: {
        ideas_count: number;
        votes_count: number;
        users_count: number;
        sponsors_count: number;
        pending_ideas_count: number;
    };
    trends: {
        ideas: any[];
        votes: any[];
        users: any[];
    } | null;
    top_ideas: any[] | null;
    country_distribution: any[] | null;
}

export default function Dashboard({ stats, trends, top_ideas, country_distribution }: DashboardProps) {
    return (
        <>
            <Head title="لوحة التحكم" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <StatsCards stats={stats} />
                
                <WhenVisible data="trends" fallback={<TrendsSkeleton />}>
                    {trends && <TrendsCharts trends={trends} />}
                </WhenVisible>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <div className="lg:col-span-4">
                        <WhenVisible data="top_ideas" fallback={<TopIdeasSkeleton />}>
                            {top_ideas && <TopIdeas ideas={top_ideas} />}
                        </WhenVisible>
                    </div>
                    <div className="lg:col-span-3">
                        <WhenVisible data="country_distribution" fallback={<CountryDistributionSkeleton />}>
                            {country_distribution && <CountryDistribution data={country_distribution} />}
                        </WhenVisible>
                    </div>
                </div>
            </div>
        </>
    );
}

function TrendsSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-[380px] w-full rounded-xl" />
            <Skeleton className="h-[380px] w-full rounded-xl" />
            <Skeleton className="h-[380px] w-full md:col-span-2 rounded-xl" />
        </div>
    );
}

function TopIdeasSkeleton() {
    return <Skeleton className="h-[400px] w-full rounded-xl" />;
}

function CountryDistributionSkeleton() {
    return <Skeleton className="h-[400px] w-full rounded-xl" />;
}

Dashboard.layout = (page: React.ReactNode) => (
    <AdminLayout
        breadcrumbs={[
            {
                title: 'لوحة التحكم',
                href: admin.dashboard().url,
            },
        ]}
    >
        {page}
    </AdminLayout>
);
