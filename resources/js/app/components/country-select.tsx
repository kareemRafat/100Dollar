import { useLang } from '@erag/lang-sync-inertia/react';
import { usePage } from '@inertiajs/react';
import { Flag } from 'lucide-react';
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
import React from 'react';

interface Props {
    value: string;
    onValueChange: (value: string) => void;
    countries?: Record<string, string>;
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
    const { locale, translations } = usePage().props as any;

    // Use passed countries or fallback to shared translations
    const countriesSource = countriesProp || translations?.messages?.countries || {};
    
    // Convert to array and sort by localized name
    const sortedCountries = Object.entries(countriesSource as Record<string, string>)
        .map(([code, name]) => ({ code, name }))
        .sort((a, b) => a.name.localeCompare(b.name, locale, { sensitivity: 'base' }));

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
                value={value}
                onValueChange={onValueChange}
                required={required}
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
                    {sortedCountries.map(({ code, name }) => (
                        <SelectItem key={code} value={code}>
                            <div className="flex items-center gap-2">
                                <Flag className="size-4 text-primary" />
                                {name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <InputError message={error} />}
        </div>
    );
}
