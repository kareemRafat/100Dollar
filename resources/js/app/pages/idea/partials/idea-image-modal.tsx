import type { ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface IdeaImageModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    image: string | null | undefined;
    title: string;
    children?: ReactNode;
}

export function IdeaImageModal({
    open,
    onOpenChange,
    image,
    title,
    children,
}: IdeaImageModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] border-none bg-transparent p-0 shadow-none outline-none sm:max-w-[90vw] md:max-w-[85vw]">
                <DialogHeader className="hidden">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="group relative">
                    <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-surface-container-low/50 backdrop-blur-sm">
                        {image && (
                            <img
                                src={image}
                                alt={title}
                                className="block h-auto max-h-[90vh] w-auto max-w-full cursor-zoom-out object-contain"
                                onClick={() => onOpenChange(false)}
                            />
                        )}
                        {children}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
