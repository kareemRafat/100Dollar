import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DeleteRequestDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    companyName: string;
    onConfirm: () => void;
}

export default function DeleteRequestDialog({ open, onOpenChange, companyName, onConfirm }: DeleteRequestDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-6" dir="rtl">
                <div className="space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-start font-bold">حذف الطلب</DialogTitle>
                        <DialogDescription className="text-start font-semibold">
                            هل أنت متأكد من حذف طلب الرعاية الخاص بـ{' '}
                            <span className="font-bold text-foreground">{companyName}</span>
                            ؟ لا يمكن التراجع عن هذا الإجراء.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6 flex flex-row items-center justify-start gap-2">
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
                            onClick={onConfirm}
                            className="font-bold"
                        >
                            حذف نهائي
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
