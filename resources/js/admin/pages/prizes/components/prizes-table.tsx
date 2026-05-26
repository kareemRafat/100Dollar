import { CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Paginated, PrizeRecord } from '@/types';
import { PrizeStatus } from '@/types';

interface PrizesTableProps {
    prizes: Paginated<PrizeRecord>;
    onConfirmClick: (prize: PrizeRecord) => void;
}

function getStatusBadge(status: string) {
    switch (status) {
        case PrizeStatus.DELIVERED:
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="me-1 h-3 w-3" /> تم التسليم
                </Badge>
            );
        default:
            return (
                <Badge variant="secondary">
                    <Clock className="me-1 h-3 w-3" /> معلق
                </Badge>
            );
    }
}

export default function PrizesTable({ prizes, onConfirmClick }: PrizesTableProps) {
    return (
        <>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12 text-center">#</TableHead>
                            <TableHead>الراعي</TableHead>
                            <TableHead>الفائز</TableHead>
                            <TableHead>الفكرة</TableHead>
                            <TableHead>المبلغ</TableHead>
                            <TableHead>التاريخ</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead className="text-end">الإجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {prizes.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-48 text-center text-muted-foreground">
                                    لا يوجد سجلات جوائز تطابق المعايير.
                                </TableCell>
                            </TableRow>
                        ) : (
                            prizes.data.map((prize, index) => (
                                <TableRow key={prize.id}>
                                    <TableCell className="text-center font-bold text-muted-foreground">
                                        {(prizes.meta.current_page - 1) *
                                            prizes.meta.per_page +
                                            index +
                                            1}
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        {prize.sponsor?.name || '-'}
                                    </TableCell>
                                    <TableCell>
                                        {prize.idea?.user?.name || '-'}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate font-semibold">
                                        {prize.idea?.title || '-'}
                                    </TableCell>
                                    <TableCell className="font-medium text-primary">
                                        ${prize.amount}
                                    </TableCell>
                                    <TableCell className="text-sm font-bold text-muted-foreground">
                                        {new Date(prize.created_at)
                                            .toLocaleDateString('en-GB', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })
                                            .split('/')
                                            .reverse()
                                            .join('-')}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(prize.status)}</TableCell>
                                    <TableCell className="text-end">
                                        <Button
                                            size="sm"
                                            onClick={() => onConfirmClick(prize)}
                                            className={
                                                prize.status === PrizeStatus.DELIVERED
                                                    ? 'bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700'
                                                    : 'bg-orange-500 text-xs font-semibold text-white hover:bg-orange-600'
                                            }
                                        >
                                            {prize.status === PrizeStatus.DELIVERED
                                                ? 'تغيير للمعلق'
                                                : 'تأكيد التسليم'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-6">
                <Pagination links={prizes.meta.links} />
            </div>
        </>
    );
}
