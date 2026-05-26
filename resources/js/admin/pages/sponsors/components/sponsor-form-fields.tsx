import { Image as ImageIcon } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export const DAYS_OF_WEEK = [
    'الأحد',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
];

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
    setData: (key: keyof SponsorFormData, value: any) => void;
}

interface SponsorFormFieldsProps {
    form: SponsorForm;
    logoPreview: string | null;
    onLogoChange: (e: ChangeEvent<HTMLInputElement>) => void;
    idPrefix?: string;
}

export default function SponsorFormFields({ form, logoPreview, onLogoChange, idPrefix = '' }: SponsorFormFieldsProps) {
    return (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}name`}>الاسم</Label>
                <Input
                    id={`${idPrefix}name`}
                    placeholder="أدخل اسم الراعي"
                    value={form.data.name}
                    onChange={(e) => form.setData('name', e.target.value)}
                />
                {form.errors.name && (
                    <p className="text-xs text-red-500">{form.errors.name}</p>
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}day`}>اليوم المخصص</Label>
                <Select
                    dir="rtl"
                    value={form.data.day_of_week.toString()}
                    onValueChange={(v) => form.setData('day_of_week', parseInt(v))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="اختر اليوم" />
                    </SelectTrigger>
                    <SelectContent>
                        {DAYS_OF_WEEK.map((day, index) => (
                            <SelectItem key={index} value={index.toString()}>
                                {day}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {form.errors.day_of_week && (
                    <p className="text-xs text-red-500">{form.errors.day_of_week}</p>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}start`}>بداية التعاقد</Label>
                    <Input
                        id={`${idPrefix}start`}
                        type="date"
                        value={form.data.contract_start}
                        onChange={(e) => form.setData('contract_start', e.target.value)}
                    />
                    {form.errors.contract_start && (
                        <p className="text-xs text-red-500">{form.errors.contract_start}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor={`${idPrefix}end`}>نهاية التعاقد</Label>
                    <Input
                        id={`${idPrefix}end`}
                        type="date"
                        value={form.data.contract_end}
                        onChange={(e) => form.setData('contract_end', e.target.value)}
                    />
                    {form.errors.contract_end && (
                        <p className="text-xs text-red-500">{form.errors.contract_end}</p>
                    )}
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`${idPrefix}logo`}>الشعار</Label>
                <div className="flex items-center gap-4">
                    {logoPreview ? (
                        <div className="h-16 w-16 overflow-hidden rounded-lg border bg-muted shadow-sm">
                            <img
                                src={logoPreview}
                                alt="Preview"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    ) : (
                        <div className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg border border-dashed bg-muted/20 text-muted-foreground/50">
                            <ImageIcon className="size-6" />
                            <span className="text-[10px] font-bold">لا يوجد</span>
                        </div>
                    )}
                    <Input
                        id={`${idPrefix}logo`}
                        type="file"
                        accept="image/*"
                        onChange={onLogoChange}
                        className="flex-1"
                    />
                </div>
                {form.errors.logo && (
                    <p className="text-xs text-red-500">{form.errors.logo}</p>
                )}
            </div>
            <div className="flex items-center gap-3">
                <Switch
                    id={`${idPrefix}active`}
                    checked={form.data.is_active}
                    onCheckedChange={(v) => form.setData('is_active', v)}
                />
                <Label htmlFor={`${idPrefix}active`}>حساب نشط</Label>
            </div>
        </div>
    );
}
