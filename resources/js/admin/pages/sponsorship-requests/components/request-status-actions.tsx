import { CheckCircle, Loader2, Trash2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface RequestStatusActionsProps {
    status: string;
    isProcessing: boolean;
    onUpdateStatus: (status: 'approved' | 'rejected' | 'pending') => void;
    onDeleteClick: () => void;
}

export default function RequestStatusActions({ status, isProcessing, onUpdateStatus, onDeleteClick }: RequestStatusActionsProps) {
    return (
        <div className="flex items-center gap-3">
            {status === 'pending' && (
                <>
                    <Button
                        variant="destructive"
                        onClick={() => onUpdateStatus('rejected')}
                        disabled={isProcessing}
                        className="font-bold"
                    >
                        {isProcessing ? (
                            <Loader2 className="me-2 size-4 animate-spin" />
                        ) : (
                            <XCircle className="me-2 size-4" />
                        )}
                        رفض الطلب
                    </Button>
                    <Button
                        onClick={() => onUpdateStatus('approved')}
                        disabled={isProcessing}
                        className="bg-green-600 font-bold hover:bg-green-700"
                    >
                        {isProcessing ? (
                            <Loader2 className="me-2 size-4 animate-spin" />
                        ) : (
                            <CheckCircle className="me-2 size-4" />
                        )}
                        قبول الطلب
                    </Button>
                </>
            )}
            {status !== 'pending' && (
                <Button
                    variant="outline"
                    onClick={() => onUpdateStatus('pending')}
                    disabled={isProcessing}
                    className="font-bold"
                >
                    إعادة تعيين الحالة
                </Button>
            )}
            <Separator orientation="vertical" className="mx-1 h-8" />
            <Button
                variant="ghost"
                size="icon"
                onClick={onDeleteClick}
                className="text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
            >
                <Trash2 className="size-5" />
            </Button>
        </div>
    );
}
