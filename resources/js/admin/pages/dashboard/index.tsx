import { Head } from '@inertiajs/react';
import AdminLayout from '@/admin/layouts/admin-layout';
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
    };
    top_ideas: any[];
    country_distribution: any[];
}

export default function Dashboard({ stats, trends, top_ideas, country_distribution }: DashboardProps) {
    return (
        <>
            <Head title="لوحة التحكم" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <StatsCards stats={stats} />
                
                <TrendsCharts trends={trends} />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <TopIdeas ideas={top_ideas} />
                    <CountryDistribution data={country_distribution} />
                </div>
            </div>
        </>
    );
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
