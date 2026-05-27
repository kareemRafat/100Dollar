import { useLang } from '@erag/lang-sync-inertia/react';
import { usePage } from '@inertiajs/react';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface DeleteIdeaDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    ideaTitle: string | null;
    onDelete: () => void;
    isDeleting: boolean;
}

export function DeleteIdeaDialog({
    isOpen,
    onOpenChange,
    ideaTitle,
    onDelete,
    isDeleting,
}: DeleteIdeaDialogProps) {
    const { __ } = useLang();
    const { locale } = usePage().props;
    const isRtl = locale === 'ar';

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md" dir={isRtl ? 'rtl' : 'ltr'}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="size-5" />
                        {__('messages.my_ideas.delete_confirm_title')}
                    </DialogTitle>
                    <DialogDescription className="pt-2 text-start">
                        {__('messages.my_ideas.delete_confirm_desc').replace(
                            ':title',
                            ideaTitle || '',
                        )}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-6 flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => onOpenChange(false)}
                        disabled={isDeleting}
                        className="flex-1"
                    >
                        {__('messages.common.cancel')}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        disabled={isDeleting}
                        className="flex-1"
                    >
                        {isDeleting ? (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        ) : (
                            <Trash2 className="mr-2 size-4" />
                        )}
                        {__('messages.common.delete')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
