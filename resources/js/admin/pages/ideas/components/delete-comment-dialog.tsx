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

interface DeleteCommentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isDeleting: boolean;
}

export function DeleteCommentDialog({
    open,
    onOpenChange,
    onConfirm,
    isDeleting,
}: DeleteCommentDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-start font-bold">
                        حذف التعليق
                    </DialogTitle>
                    <DialogDescription className="text-start font-semibold">
                        هل أنت متأكد من رغبتك في حذف هذا التعليق؟ سيتم إخفاؤه عن
                        المستخدمين مع بقائه في لوحة التحكم للأرشفة.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="font-bold"
                    >
                        إلغاء
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={onConfirm}
                        className="font-bold"
                    >
                        {isDeleting && (
                            <Loader2 className="me-2 size-4 animate-spin" />
                        )}
                        تأكيد الحذف
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
