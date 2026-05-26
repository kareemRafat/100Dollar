import type { SubmitEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { User } from '@/types';

interface DeleteUserForm {
    processing: boolean;
}

interface DeleteUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: DeleteUserForm;
    selectedUser: User | null;
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function DeleteUserDialog({ open, onOpenChange, form, selectedUser, onSubmit }: DeleteUserDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-6" dir="rtl">
                <form onSubmit={onSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-start">حذف المستخدم</DialogTitle>
                        <DialogDescription className="text-start">
                            هل أنت متأكد من حذف المستخدم {selectedUser?.name}؟ لا يمكن التراجع عن هذا الإجراء.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6 flex flex-row items-center justify-start gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            إلغاء
                        </Button>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={form.processing}
                        >
                            {form.processing && (
                                <Loader2 className="me-2 h-4 w-4 animate-spin" />
                            )}
                            حذف نهائي
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
