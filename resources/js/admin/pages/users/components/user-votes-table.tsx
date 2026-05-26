import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
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

interface UserVote {
    id: number;
    idea: Idea;
    created_at: string;
}

interface UserVotesTableProps {
    votes: UserVote[];
}

export default function UserVotesTable({ votes }: UserVotesTableProps) {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(votes.length / PER_PAGE);
    const displayed = votes.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">سجل التصويت</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>الفكرة</TableHead>
                                <TableHead>صاحب الفكرة</TableHead>
                                <TableHead>التاريخ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {votes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
                                        لم يقم المستخدم بالتصويت على أي فكرة بعد.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                displayed.map((vote) => (
                                    <TableRow key={vote.id}>
                                        <TableCell className="font-medium">{vote.idea.title}</TableCell>
                                        <TableCell>
                                            {vote.idea.user?.name || 'غير معروف'}
                                        </TableCell>
                                        <TableCell className="font-bold">
                                            {new Date(vote.created_at).toISOString().split('T')[0]}
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
