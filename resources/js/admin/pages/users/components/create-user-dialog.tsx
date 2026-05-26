import type { SubmitEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { Country } from '@/types';

interface CreateUserFormData {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    country_id: string | number;
    phone: string;
    is_active: boolean;
}

interface CreateUserForm {
    data: CreateUserFormData;
    errors: Partial<Record<keyof CreateUserFormData, string>>;
    processing: boolean;
    setData: (key: keyof CreateUserFormData, value: any) => void;
}

interface CreateUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: CreateUserForm;
    countries: Country[];
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function CreateUserDialog({ open, onOpenChange, form, countries, onSubmit }: CreateUserDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                        <DialogDescription>
                            أدخل بيانات المستخدم الجديد هنا.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">الاسم</Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                            />
                            {form.errors.name && (
                                <p className="text-xs text-red-500">{form.errors.name}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input
                                id="email"
                                type="email"
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                            />
                            {form.errors.email && (
                                <p className="text-xs text-red-500">{form.errors.email}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <Input
                                id="password"
                                type="password"
                                value={form.data.password}
                                onChange={(e) => form.setData('password', e.target.value)}
                            />
                            {form.errors.password && (
                                <p className="text-xs text-red-500">{form.errors.password}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="country">الدولة</Label>
                                <Select
                                    dir="rtl"
                                    value={form.data.country_id?.toString()}
                                    onValueChange={(v) => form.setData('country_id', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر الدولة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem
                                                key={country.id}
                                                value={country.id.toString()}
                                            >
                                                {country.name_ar}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.country_id && (
                                    <p className="text-xs text-red-500">{form.errors.country_id}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">الدور</Label>
                                <Select
                                    dir="rtl"
                                    value={form.data.role}
                                    onValueChange={(v: 'admin' | 'user') => form.setData('role', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر الدور" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">مستخدم</SelectItem>
                                        <SelectItem value="admin">مدير</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Switch
                                id="active"
                                checked={form.data.is_active}
                                onCheckedChange={(v) => form.setData('is_active', v)}
                            />
                            <Label htmlFor="active">حساب نشط</Label>
                        </div>
                    </div>
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
                            حفظ
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
