import { Loader2 } from 'lucide-react';
import type { SubmitEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Sponsor } from '@/types';

interface DeleteSponsorForm {
    processing: boolean;
}

interface DeleteSponsorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: DeleteSponsorForm;
    selectedSponsor: Sponsor | null;
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function DeleteSponsorDialog({ open, onOpenChange, form, selectedSponsor, onSubmit }: DeleteSponsorDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-6" dir="rtl">
                <form onSubmit={onSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-start">حذف الراعي</DialogTitle>
                        <DialogDescription className="text-start">
                            هل أنت متأكد من حذف الراعي {selectedSponsor?.name}؟ سيتم حذف جميع البيانات المرتبطة به.
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
