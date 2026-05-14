import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import SocialLinksController from '@/actions/App/Http/Controllers/Admin/SocialLinksController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/admin/social-links';

interface Settings {
    social_whatsapp: string | null;
    social_x: string | null;
    social_facebook: string | null;
    social_instagram: string | null;
}

export default function SocialLinks({ settings }: { settings: Settings }) {
    const { data, setData, patch, processing, errors } = useForm({
        social_whatsapp: settings.social_whatsapp ?? '',
        social_x: settings.social_x ?? '',
        social_facebook: settings.social_facebook ?? '',
        social_instagram: settings.social_instagram ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(SocialLinksController.update.url());
    };

    return (
        <>
            <Head title="روابط التواصل الاجتماعي" />

            <div className="space-y-6 p-4 md:p-6">
                <Heading
                    variant="small"
                    title="روابط التواصل الاجتماعي"
                    description="تحديث روابط صفحات التواصل الاجتماعي للمنصة"
                />

                <Card>
                    <CardHeader>
                        <CardTitle>منصات التواصل</CardTitle>
                        <CardDescription>
                            أدخل الروابط المباشرة لصفحات المنصة على وسائل التواصل الاجتماعي.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={submit}>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="social_whatsapp">واتساب (WhatsApp)</Label>
                                <Input
                                    id="social_whatsapp"
                                    className="mt-1 block w-full"
                                    value={data.social_whatsapp}
                                    onChange={(e) => setData('social_whatsapp', e.target.value)}
                                    placeholder="https://wa.me/..."
                                    dir="rtl"
                                />
                                <InputError message={errors.social_whatsapp} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="social_x">إكس (X / Twitter)</Label>
                                <Input
                                    id="social_x"
                                    className="mt-1 block w-full"
                                    value={data.social_x}
                                    onChange={(e) => setData('social_x', e.target.value)}
                                    placeholder="https://x.com/..."
                                    dir="rtl"
                                />
                                <InputError message={errors.social_x} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="social_facebook">فيسبوك (Facebook)</Label>
                                <Input
                                    id="social_facebook"
                                    className="mt-1 block w-full"
                                    value={data.social_facebook}
                                    onChange={(e) => setData('social_facebook', e.target.value)}
                                    placeholder="https://facebook.com/..."
                                    dir="rtl"
                                />
                                <InputError message={errors.social_facebook} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="social_instagram">إنستغرام (Instagram)</Label>
                                <Input
                                    id="social_instagram"
                                    className="mt-1 block w-full"
                                    value={data.social_instagram}
                                    onChange={(e) => setData('social_instagram', e.target.value)}
                                    placeholder="https://instagram.com/..."
                                    dir="rtl"
                                />
                                <InputError message={errors.social_instagram} />
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button disabled={processing}>حفظ التغييرات</Button>
                            </div>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </>
    );
}

SocialLinks.layout = {
    breadcrumbs: [
        {
            title: 'إعدادات التواصل الاجتماعي',
            href: edit(),
        },
    ],
};
