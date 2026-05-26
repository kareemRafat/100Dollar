import { Head, Link } from '@inertiajs/react';
import { ChevronRight, FileText, ThumbsUp } from 'lucide-react';
import React from 'react';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import admin from '@/routes/admin';
import type { BreadcrumbItem, Country, Idea, User } from '@/types';
import UserIdeasTable from './components/user-ideas-table';
import UserProfileCard from './components/user-profile-card';
import UserVotesTable from './components/user-votes-table';

interface UserWithRelations extends User {
    country?: Country;
    bio?: string;
    ideas: Idea[];
    votes: {
        id: number;
        idea: Idea;
        created_at: string;
    }[];
}

interface ShowProps {
    user: UserWithRelations;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
    },
    {
        title: 'المستخدمين',
        href: admin.users.index().url,
    },
    {
        title: 'تفاصيل المستخدم',
        href: '#',
    },
];

export default function UserShowPage({ user }: ShowProps) {
    return (
        <>
            <Head title={`تفاصيل المستخدم - ${user.name}`} />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex items-center gap-4">
                    <Link
                        href={admin.users.index().url}
                        className="rounded-full p-2 transition-colors hover:bg-muted"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-sm text-muted-foreground">
                            عرض ملف المستخدم ونشاطه في المنصة
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <UserProfileCard user={user} />

                    <div className="space-y-6 lg:col-span-2">
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-full bg-primary/10 p-3">
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">الأفكار</p>
                                        <p className="text-2xl font-bold">{user.ideas.length}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-full bg-orange-100 p-3">
                                        <ThumbsUp className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">التصويتات</p>
                                        <p className="text-2xl font-bold">{user.votes.length}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <UserIdeasTable ideas={user.ideas} />
                        <UserVotesTable votes={user.votes} />
                    </div>
                </div>
            </div>
        </>
    );
}

UserShowPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
