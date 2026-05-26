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
import type { Idea } from '@/types';

const dayNames = [
    'الأحد',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
];

interface ConfirmWinnerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    confirmingIdea: Idea | null;
    processing: boolean;
    onConfirm: () => void;
}

export default function ConfirmWinnerDialog({
    open,
    onOpenChange,
    confirmingIdea,
    processing,
    onConfirm,
}: ConfirmWinnerDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <DialogTitle className="mt-4 text-center">
                        تأكيد الفائز الرسمي
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        هل أنت متأكد من اختيار فكرة{' '}
                        <span className="font-bold text-foreground">
                            "{confirmingIdea?.title}"
                        </span>{' '}
                        كفائز رسمي لهذا اليوم؟
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-2 rounded-lg bg-muted p-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">صاحب الفكرة:</span>
                        <span className="font-semibold">
                            {confirmingIdea?.user?.name}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">عدد الأصوات:</span>
                        <span className="font-semibold text-primary">
                            {confirmingIdea?.votes_count} صوت
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">اليوم:</span>
                        <span className="font-semibold">
                            {confirmingIdea
                                ? dayNames[confirmingIdea.submission_day]
                                : ''}
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
                        className="flex-1"
                    >
                        {processing ? 'جاري التأكيد...' : 'تأكيد الفائز'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
