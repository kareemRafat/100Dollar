import { useForm, Head, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import ProfileController from '@/actions/App/Http/Controllers/Admin/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { edit } from '@/routes/admin/settings/profile';

interface Country {
    id: number;
    name_ar: string;
    name_en: string;
    code: string;
}

type Props = {
    countries: Country[];
};

export default function Profile({ countries }: Props) {
    const { auth } = usePage().props as any;

    const { data, setData, patch, processing, errors } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone || '',
        nationality: auth.user.nationality || '',
        country_id: auth.user.country_id?.toString() || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(ProfileController.update.url(), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="إعدادات الملف الشخصي" />

            <h1 className="sr-only">إعدادات الملف الشخصي</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="معلومات الملف الشخصي"
                    description="تحديث اسمك وعنوان بريدك الإلكتروني"
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">الاسم</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                name="name"
                                required
                                autoComplete="name"
                                placeholder="الاسم الكامل"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">عنوان البريد الإلكتروني</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                name="email"
                                required
                                autoComplete="username"
                                placeholder="البريد الإلكتروني"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="phone">رقم الهاتف</Label>

                            <Input
                                id="phone"
                                type="tel"
                                dir="rtl"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                name="phone"
                                required
                                placeholder="رقم الهاتف"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.phone}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="nationality">الجنسية</Label>

                            <Input
                                id="nationality"
                                className="mt-1 block w-full"
                                value={data.nationality}
                                onChange={(e) => setData('nationality', e.target.value)}
                                name="nationality"
                                required
                                placeholder="الجنسية"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.nationality}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="country_id">الدولة</Label>

                        <Select
                            value={data.country_id}
                            onValueChange={(value) => setData('country_id', value)}
                        >
                            <SelectTrigger id="country_id" className="mt-1 w-full">
                                <SelectValue placeholder="اختر الدولة" />
                            </SelectTrigger>                            <SelectContent>
                                {countries.map((country) => (
                                    <SelectItem key={country.id} value={country.id.toString()}>
                                        {country.name_ar}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError
                            className="mt-2"
                            message={errors.country_id}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            disabled={processing}
                            data-test="update-profile-button"
                        >
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            حفظ
                        </Button>
                    </div>
                </form>
            </div>

            <DeleteUser />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'إعدادات الملف الشخصي',
            href: edit(),
        },
    ],
};
