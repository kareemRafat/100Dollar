import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Country } from '@/types';

interface UserFiltersProps {
    search: string;
    role: string;
    status: string;
    countryId: string;
    countries: Country[];
    onSearchChange: (value: string) => void;
    onRoleChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onCountryIdChange: (value: string) => void;
    onReset: () => void;
}

export default function UserFilters({
    search,
    role,
    status,
    countryId,
    countries,
    onSearchChange,
    onRoleChange,
    onStatusChange,
    onCountryIdChange,
    onReset,
}: UserFiltersProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
                <div className="inset-inline-start-0 pointer-events-none absolute inset-y-0 flex items-center ps-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                    type="search"
                    placeholder="بحث..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full ps-10"
                />
            </div>
            <div className="flex flex-1 items-center gap-2">
                <Select
                    dir="rtl"
                    value={role || 'all'}
                    onValueChange={(v) => onRoleChange(v === 'all' ? '' : v)}
                >
                    <SelectTrigger className="w-full sm:w-32">
                        <SelectValue placeholder="الدور" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">الكل</SelectItem>
                        <SelectItem value="admin">مدير</SelectItem>
                        <SelectItem value="user">مستخدم</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    dir="rtl"
                    value={countryId || 'all'}
                    onValueChange={(v) => onCountryIdChange(v === 'all' ? '' : v)}
                >
                    <SelectTrigger className="w-full sm:w-32">
                        <SelectValue placeholder="الدولة" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">كل الدول</SelectItem>
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
                <Select
                    dir="rtl"
                    value={status || 'all'}
                    onValueChange={(v) => onStatusChange(v === 'all' ? '' : v)}
                >
                    <SelectTrigger className="w-full sm:w-32">
                        <SelectValue placeholder="الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">الكل</SelectItem>
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="inactive">معطل</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button
                variant="link"
                onClick={onReset}
                className="h-9 px-2 text-muted-foreground hover:text-primary sm:px-4"
            >
                إعادة تعيين
            </Button>
        </div>
    );
}
