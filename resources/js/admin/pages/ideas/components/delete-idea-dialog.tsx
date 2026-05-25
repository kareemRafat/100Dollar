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

interface DeleteIdeaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isDeleting: boolean;
    ideaTitle: string;
}

export function DeleteIdeaDialog({
    open,
    onOpenChange,
    onConfirm,
    isDeleting,
    ideaTitle,
}: DeleteIdeaDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-start font-bold">
                        حذف الفكرة نهائياً
                    </DialogTitle>
                    <DialogDescription className="text-start font-semibold break-words">
                        هل أنت متأكد من رغبتك في حذف هذه الفكرة "
                        <span
                            className="inline-block font-bold text-foreground"
                            title={ideaTitle}
                        >
                            {ideaTitle}
                        </span>
                        "؟ سيتم حذف جميع البيانات المتعلقة بها (التعليقات،
                        التصويتات، الملفات) نهائياً ولا يمكن التراجع عن هذا
                        الإجراء.
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
                        تأكيد الحذف النهائي
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
