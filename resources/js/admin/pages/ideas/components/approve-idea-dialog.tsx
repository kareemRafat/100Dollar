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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const daysOfWeek = [
    { value: '0', label: 'الأحد' },
    { value: '1', label: 'الاثنين' },
    { value: '2', label: 'الثلاثاء' },
    { value: '3', label: 'الأربعاء' },
    { value: '4', label: 'الخميس' },
    { value: '5', label: 'الجمعة' },
    { value: '6', label: 'السبت' },
];

interface ApproveIdeaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submissionDay: number | string;
    onSubmissionDayChange: (value: number) => void;
    error?: string;
    processing: boolean;
    onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

export function ApproveIdeaDialog({
    open,
    onOpenChange,
    submissionDay,
    onSubmissionDayChange,
    error,
    processing,
    onSubmit,
}: ApproveIdeaDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-start font-bold">
                            الموافقة على الفكرة
                        </DialogTitle>
                        <DialogDescription className="text-start font-semibold">
                            عند الموافقة، يجب تحديد اليوم الذي سيتم فيه نشر الفكرة
                            في الأسبوع القادم.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                        <Label
                            htmlFor="submission_day"
                            className="mb-2 block font-bold"
                        >
                            يوم النشر
                        </Label>
                        <Select
                            dir="rtl"
                            value={submissionDay.toString()}
                            onValueChange={(v) =>
                                onSubmissionDayChange(Number(v))
                            }
                        >
                            <SelectTrigger className="font-semibold">
                                <SelectValue placeholder="اختر يوم النشر" />
                            </SelectTrigger>
                            <SelectContent>
                                {daysOfWeek.map((day) => (
                                    <SelectItem
                                        key={day.value}
                                        value={day.value}
                                        className="font-semibold"
                                    >
                                        {day.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                            disabled={processing}
                            className="bg-green-600 font-bold hover:bg-green-700"
                        >
                            {processing && (
                                <Loader2 className="me-2 size-4 animate-spin" />
                            )}
                            تأكيد الموافقة
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
