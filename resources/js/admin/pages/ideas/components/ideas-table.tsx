import { Link } from '@inertiajs/react';
import { Eye, Lightbulb, Trash2, Calendar, User as UserIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import admin from '@/routes/admin';
import type { Idea, Paginated } from '@/types';
import { IdeaStatus } from '@/types';

interface IdeasTableProps {
    ideas: Paginated<Idea>;
    filters: Record<string, string | undefined>;
    onDeleteClick: (idea: Idea) => void;
}

function getStatusBadge(status: IdeaStatus) {
    switch (status) {
        case IdeaStatus.APPROVED:
            return (
                <Badge className="bg-green-100 font-bold text-green-800 hover:bg-green-100">
                    تمت الموافقة
                </Badge>
            );
        case IdeaStatus.REJECTED:
            return (
                <Badge variant="destructive" className="font-bold">
                    مرفوضة
                </Badge>
            );
        default:
            return (
                <Badge
                    variant="secondary"
                    className="bg-amber-100 font-bold text-amber-800 hover:bg-amber-100"
                >
                    قيد الانتظار
                </Badge>
            );
    }
}

export default function IdeasTable({ ideas, filters, onDeleteClick }: IdeasTableProps) {
    return (
        <>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12 text-center font-bold">#</TableHead>
                            <TableHead className="min-w-50 font-bold">الفكرة وصاحبها</TableHead>
                            <TableHead className="min-w-25 font-bold">التصنيف</TableHead>
                            <TableHead className="min-w-30 font-bold">تاريخ التقديم</TableHead>
                            <TableHead className="min-w-25 font-bold">الحالة</TableHead>
                            <TableHead className="min-w-25 text-end font-bold">الإجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ideas.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-72 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <div className="rounded-full bg-muted p-4">
                                            <Lightbulb className="h-10 w-10 text-muted-foreground" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xl font-bold">لا توجد أفكار</p>
                                            <p className="text-sm font-semibold text-muted-foreground">
                                                لا توجد أفكار تطابق المعايير المختارة حالياً.
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            ideas.data.map((idea, index) => (
                                <TableRow key={idea.id}>
                                    <TableCell className="text-center font-bold text-muted-foreground">
                                        {(ideas.meta.current_page - 1) * ideas.meta.per_page + index + 1}
                                    </TableCell>
                                    <TableCell className="font-bold">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm md:text-base">{idea.title}</span>
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                                <UserIcon className="size-3.5" />
                                                {idea.user?.name}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-bold">
                                            {typeof idea.category === 'object'
                                                ? idea.category?.name_ar
                                                : idea.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                            <Calendar className="size-3" />
                                            {idea.date}
                                        </div>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(idea.status)}</TableCell>
                                    <TableCell className="text-end">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={admin.ideas.show(idea.id).url}
                                                data={filters}
                                                prefetch="hover"
                                                className="inline-flex h-9 items-center justify-center rounded-md bg-primary/10 px-4 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
                                            >
                                                <Eye className="me-2 h-4 w-4" />
                                                مراجعة
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onDeleteClick(idea)}
                                                className="h-9 w-9 text-red-500 hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-6">
                <Pagination links={ideas.meta.links} />
            </div>
        </>
    );
}
