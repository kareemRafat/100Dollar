import { useLang } from '@erag/lang-sync-inertia/react';
import { ImagePlus, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';

interface SponsorLogoUploaderProps {
    onLogoChange: (file: File | null) => void;
    error?: string;
}

export function SponsorLogoUploader({
    onLogoChange,
    error,
}: SponsorLogoUploaderProps) {
    const { __ } = useLang();
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const processLogo = (file: File) => {
        onLogoChange(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            processLogo(file);
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];

        if (file && file.type.startsWith('image/')) {
            processLogo(file);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                <ImagePlus className="size-3.5 text-primary" />
                {__('messages.sponsors.company_logo')}
            </Label>
            <div
                onClick={() =>
                    document.getElementById('logo-upload')?.click()
                }
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    'group relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low p-8 transition-all hover:bg-surface-container dark:border-outline-variant/30 dark:bg-surface-container-high dark:hover:bg-surface-container-highest',
                    isDragging
                        ? 'scale-[1.02] border-primary bg-primary/5 dark:bg-primary/10'
                        : 'hover:border-primary dark:hover:border-primary',
                )}
            >
                {logoPreview ? (
                    <img
                        src={logoPreview}
                        alt="Preview"
                        className="absolute inset-0 h-full w-full object-contain p-2 opacity-80 transition-opacity group-hover:opacity-60"
                    />
                ) : (
                    <UploadCloud
                        className={cn(
                            'mb-2 size-10 transition-transform',
                            isDragging
                                ? 'scale-110 text-primary'
                                : 'text-primary group-hover:scale-110',
                        )}
                    />
                )}
                <div className="relative z-10 flex flex-col items-center">
                    <p className="text-center font-headline text-sm font-bold text-on-surface dark:text-white">
                        {logoPreview
                            ? __('messages.submit_idea.change_image')
                            : __('messages.submit_idea.image_placeholder')}
                    </p>
                    <p className="mt-1 text-xs text-outline dark:text-slate-400">
                        {__('messages.submit_idea.image_hint')}
                    </p>
                </div>
                <input
                    id="logo-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoChange}
                />
            </div>
            <InputError message={error} />
        </div>
    );
}
