import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Idea } from '@/types';

const PER_PAGE = 10;

interface UserIdeasTableProps {
    ideas: Idea[];
}

export default function UserIdeasTable({ ideas }: UserIdeasTableProps) {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(ideas.length / PER_PAGE);
    const displayed = ideas.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">الأفكار المقدمة</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>الفكرة</TableHead>
                                <TableHead>الفئة</TableHead>
                                <TableHead>الحالة</TableHead>
                                <TableHead>التاريخ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ideas.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                                        لم يقم المستخدم بتقديم أي أفكار بعد.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                displayed.map((idea) => (
                                    <TableRow key={idea.id}>
                                        <TableCell className="font-medium">{idea.title}</TableCell>
                                        <TableCell>
                                            {typeof idea.category === 'object'
                                                ? idea.category.name_ar
                                                : idea.category}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    idea.status === 'approved'
                                                        ? 'default'
                                                        : idea.status === 'rejected'
                                                          ? 'destructive'
                                                          : 'secondary'
                                                }
                                            >
                                                {idea.status === 'approved'
                                                    ? 'مقبول'
                                                    : idea.status === 'rejected'
                                                      ? 'مرفوض'
                                                      : 'قيد الانتظار'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-bold">
                                            {new Date(idea.created_at).toISOString().split('T')[0]}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t px-4 py-3">
                            <p className="text-sm text-muted-foreground">
                                الصفحة {page} من {totalPages}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page <= 1}
                                    onClick={() => setPage((p) => p - 1)}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage((p) => p + 1)}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
