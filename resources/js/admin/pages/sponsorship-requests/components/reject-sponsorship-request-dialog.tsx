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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface RejectSponsorshipRequestDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    rejectionReason: string;
    onRejectionReasonChange: (value: string) => void;
    error?: string;
    processing: boolean;
    onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

export default function RejectSponsorshipRequestDialog({
    open,
    onOpenChange,
    rejectionReason,
    onRejectionReasonChange,
    error,
    processing,
    onSubmit,
}: RejectSponsorshipRequestDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-start font-bold">
                            رفض طلب الرعاية
                        </DialogTitle>
                        <DialogDescription className="text-start font-semibold">
                            يرجى كتابة سبب الرفض بوضوح ليتم إرساله للمتقدم.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                        <Label
                            htmlFor="rejection_reason"
                            className="mb-2 block font-bold"
                        >
                            سبب الرفض
                        </Label>
                        <Textarea
                            id="rejection_reason"
                            placeholder="اكتب سبب الرفض هنا..."
                            value={rejectionReason}
                            onChange={(e) =>
                                onRejectionReasonChange(e.target.value)
                            }
                            className="min-h-[120px] font-semibold"
                        />
                        {error && (
                            <p className="mt-1 text-sm font-semibold text-red-500">
                                {error}
                            </p>
                        )}
                    </div>
                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="font-bold"
                        >
                            إلغاء
                        </Button>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={processing}
                            className="font-bold"
                        >
                            {processing && (
                                <Loader2 className="me-2 size-4 animate-spin" />
                            )}
                            تأكيد الرفض
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
