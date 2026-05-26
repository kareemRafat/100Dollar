import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { PrizeRecord } from '@/types';
import { PrizeStatus } from '@/types';

interface PayoutConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    confirmingPrize: PrizeRecord | null;
    processing: boolean;
    onConfirm: () => void;
}

export default function PayoutConfirmDialog({
    open,
    onOpenChange,
    confirmingPrize,
    processing,
    onConfirm,
}: PayoutConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <DialogTitle className="mt-4 text-center">
                        {confirmingPrize?.status === PrizeStatus.DELIVERED
                            ? 'تغيير حالة الجائزة إلى معلق'
                            : 'تأكيد تسليم الجائزة'}
                    </DialogTitle>
                    <DialogDescription className="text-center font-bold">
                        هل أنت متأكد من تغيير حالة الجائزة الخاصة بـ{' '}
                        <span className="block font-bold text-foreground">
                            "{confirmingPrize?.idea?.user?.name}" ؟{' '}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-2 rounded-lg bg-muted p-4">
                    <div className="flex justify-between text-sm">
                        <span className="font-bold text-muted-foreground">
                            الفكرة :
                        </span>
                        <span className="max-w-50 truncate text-end font-semibold">
                            {confirmingPrize?.idea?.title}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-bold text-muted-foreground">
                            المبلغ :
                        </span>
                        <span className="font-bold text-primary">
                            ${confirmingPrize?.amount}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-bold text-muted-foreground">
                            الراعي :
                        </span>
                        <span className="font-semibold">
                            {confirmingPrize?.sponsor?.name}
                        </span>
                    </div>
                </div>
                <DialogFooter className="mt-6 flex flex-row gap-3">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={processing}
                        className="flex-1"
                    >
                        إلغاء
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={processing}
                        className={
                            confirmingPrize?.status === PrizeStatus.DELIVERED
                                ? 'flex-1 bg-amber-600 hover:bg-amber-700'
                                : 'flex-1 bg-green-600 hover:bg-green-700'
                        }
                    >
                        {processing ? 'جاري التحديث...' : 'تأكيد'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
