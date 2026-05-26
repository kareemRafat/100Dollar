import { Loader2 } from 'lucide-react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SponsorFormFields from './sponsor-form-fields';

interface SponsorFormData {
    name: string;
    day_of_week: string | number;
    contract_start: string;
    contract_end: string;
    is_active: boolean;
    logo: File | null;
}

interface SponsorForm {
    data: SponsorFormData;
    errors: Partial<Record<keyof SponsorFormData | 'logo', string>>;
    processing: boolean;
    setData: (key: keyof SponsorFormData, value: any) => void;
}

interface EditSponsorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: SponsorForm;
    logoPreview: string | null;
    onLogoChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function EditSponsorDialog({ open, onOpenChange, form, logoPreview, onLogoChange, onSubmit }: EditSponsorDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>تعديل بيانات الراعي</DialogTitle>
                        <DialogDescription>
                            تعديل بيانات الراعي المختار.
                        </DialogDescription>
                    </DialogHeader>
                    <SponsorFormFields
                        form={form}
                        logoPreview={logoPreview}
                        onLogoChange={onLogoChange}
                        idPrefix="edit-"
                    />
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            إلغاء
                        </Button>
                        <Button
                            type="submit"
                            disabled={form.processing}
                        >
                            {form.processing && (
                                <Loader2 className="me-2 h-4 w-4 animate-spin" />
                            )}
                            تحديث
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
