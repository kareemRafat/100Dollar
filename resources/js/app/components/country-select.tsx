import { useLang } from '@erag/lang-sync-inertia/react';
import { usePage } from '@inertiajs/react';
import { Flag } from 'lucide-react';
import React from 'react';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Country {
    id: number;
    name_en: string;
    name_ar: string;
    code: string;
}

interface Props {
    value: string | number;
    onValueChange: (value: string) => void;
    countries?: Country[];
    placeholder?: string;
    error?: string;
    className?: string;
    triggerClassName?: string;
    labelClassName?: string;
    size?: "sm" | "default" | "lg";
    variant?: "default" | "flat";
    label?: React.ReactNode;
    id?: string;
    required?: boolean;
}

export function CountrySelect({
    value,
    onValueChange,
    countries: countriesProp,
    placeholder,
    error,
    className,
    triggerClassName,
    labelClassName,
    size = "lg",
    variant = "default",
    label,
    id = "country",
    required = false,
}: Props) {
    const { __ } = useLang();
    const { locale } = usePage().props as any;

    // Use passed countries or fallback to empty array
    const countriesSource = countriesProp || [];
    
    // Sort by localized name
    const sortedCountries = [...countriesSource].sort((a, b) => {
        const nameA = locale === 'ar' ? a.name_ar : a.name_en;
        const nameB = locale === 'ar' ? b.name_ar : b.name_en;

        return nameA.localeCompare(nameB, locale, { sensitivity: 'base' });
    });

    const variantClasses = variant === 'flat' 
        ? "bg-surface-container-low dark:bg-surface-container-high border-none focus:bg-white dark:focus:bg-surface-container-highest focus:ring-2 focus:ring-primary shadow-none"
        : "border-input bg-transparent focus-visible:ring-ring/50 focus-visible:ring-[3px]";

    const labelStyles = variant === 'flat'
        ? "font-headline block text-sm font-bold text-on-surface dark:text-white"
        : "";

    return (
        <div className={cn("space-y-2", className)}>
            {label && (
                <Label 
                    htmlFor={id} 
                    className={cn(labelStyles, labelClassName)}
                >
                    {label}
                </Label>
            )}
            <Select
                value={value?.toString()}
                onValueChange={onValueChange}
                required={required}
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
            >
                <SelectTrigger 
                    id={id} 
                    size={size} 
                    className={cn(
                        "w-full px-4 text-on-surface dark:text-white transition-all",
                        variantClasses,
                        triggerClassName
                    )}
                >
                    <SelectValue placeholder={placeholder || __('messages.submit_idea.country_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                    {sortedCountries.map((country) => (
                        <SelectItem key={country.id} value={country.id.toString()}>
                            <div className="flex items-center gap-2">
                                <Flag className="size-4 text-primary" />
                                {locale === 'ar' ? country.name_ar : country.name_en}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <InputError message={error} />}
        </div>
    );
}
