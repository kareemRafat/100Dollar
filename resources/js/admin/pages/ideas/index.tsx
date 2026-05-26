import { Head, router, WhenVisible } from '@inertiajs/react';
import { Search } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import admin from '@/routes/admin';
import type { BreadcrumbItem, Idea, Paginated } from '@/types';
import { IdeaStatus } from '@/types';
import { DeleteIdeaDialog } from './components/delete-idea-dialog';
import IdeaSearchHeader from './components/idea-search-header';
import IdeasTable from './components/ideas-table';

interface IdeasProps {
    ideas: Paginated<Idea>;
    filters: {
        status?: IdeaStatus;
        search?: string;
    };
    counts?: {
        [key in IdeaStatus]?: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
    },
    {
        title: 'إدارة الأفكار',
        href: admin.ideas.index().url,
    },
];

export default function IdeasPage({ ideas, filters, counts }: IdeasProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || IdeaStatus.PENDING);
    const [ideaToDelete, setIdeaToDelete] = useState<Idea | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                admin.ideas.index().url,
                { search, status },
                {
                    preserveState: true,
                    replace: true,
                    only: ['ideas', 'filters'],
                },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, status]);

    const handleDeleteIdea = () => {
        if (!ideaToDelete) return;

        setIsDeleting(true);
        router.delete(admin.ideas.destroy(ideaToDelete.id).url, {
            onSuccess: () => {
                setIdeaToDelete(null);
                toast.success('تم حذف الفكرة وجميع بياناتها بنجاح');
            },
            onFinish: () => setIsDeleting(false),
        });
    };

    return (
        <>
            <Head title="إدارة الأفكار" />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">إدارة الأفكار</h1>
                        <p className="text-sm font-semibold text-muted-foreground">
                            مراجعة وقبول أو رفض الأفكار المقدمة من المستخدمين
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <IdeaSearchHeader
                        status={status}
                        counts={counts}
                        onStatusChange={setStatus}
                    />

                    {!counts && (
                        <WhenVisible
                            data="counts"
                            children={undefined}
                            fallback={undefined}
                        />
                    )}

                    <Card>
                        <CardHeader className="flex flex-col space-y-4 pb-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                            <CardTitle className="font-bold">
                                قائمة الأفكار
                            </CardTitle>
                            <div className="relative w-full sm:w-64">
                                <div className="inset-inline-start-0 pointer-events-none absolute inset-y-0 flex items-center ps-3">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input
                                    type="search"
                                    placeholder="بحث في العناوين أو المستخدمين..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full ps-10 font-semibold"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 sm:p-6 sm:pt-0">
                            <IdeasTable
                                ideas={ideas}
                                filters={filters as Record<string, string | undefined>}
                                onDeleteClick={(idea) => setIdeaToDelete(idea)}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <DeleteIdeaDialog
                open={ideaToDelete !== null}
                onOpenChange={(open) => !open && setIdeaToDelete(null)}
                onConfirm={handleDeleteIdea}
                isDeleting={isDeleting}
                ideaTitle={ideaToDelete?.title || ''}
            />
        </>
    );
}

IdeasPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
