import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface DeleteContactDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: () => void;
    processing: boolean;
}

export default function DeleteContactDialog({
    open,
    onOpenChange,
    onDelete,
    processing,
}: DeleteContactDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-start font-bold">
                        حذف رسالة التواصل
                    </DialogTitle>
                    <DialogDescription className="text-start font-semibold">
                        سيتم حذف الرسالة نهائياً من لوحة التحكم. هل أنت متأكد؟
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        إلغاء
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onDelete}
                        disabled={processing}
                    >
                        {processing && <Loader2 className="me-2 size-4 animate-spin" />}
                        حذف الرسالة
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
