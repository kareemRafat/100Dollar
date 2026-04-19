import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';

export default function SubmitIdea() {
    return (
        <AppLayout activeRoute="/submit-idea">
            <Head title="إرسال فكرة" />

            <header className="relative mt-16 h-[400px] w-full overflow-hidden md:h-[500px]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYJIXHhzvWUAYG3UbBV4YWSs9_TjTwPATiiFM6b4eZgtWu4Qz79GIoS3lRB0GNcdffoKtJqmkT-2YWyvDM-MpjyqujFb-LBsqRqbjA1YlRDnXCDfjIjmGlS8ElgbR-6qZTkkGAf2S-97DlJeUF91nupHwhfPDiypG0ft833vmyPhWQvEWZo6Dn-KW_RyP_qb-qFLT5l3_lBTsD05wms2KR3nm3rUaHqcxEx3WHiFO2mzrPn1ywDEl3Ig-o9EZeFUB6WK2PDeYMGng')",
                    }}
                />
                <div className="bg-deep-navy/80 absolute inset-0 backdrop-blur-[2px]" />
                <div className="from-deep-navy via-deep-navy/70 absolute inset-0 bg-gradient-to-t to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <div className="text-on-primary mb-4 rounded-full bg-primary px-4 py-1 text-xs font-bold tracking-widest uppercase shadow-lg shadow-primary/20">
                        شارك رؤيتك
                    </div>
                    <h1 className="font-headline mb-6 text-4xl leading-tight font-black text-white drop-shadow-md md:text-6xl">
                        شارك فكرتك{' '}
                        <span className="text-primary">العبقرية</span>
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed font-medium text-white/90 drop-shadow md:text-xl">
                        حول شغفك إلى مشروع تجاري حقيقي بميزانية ذكية لا تتجاوز
                        100 دولار. كن الملهم التالي في مجتمعنا.
                    </p>
                </div>
            </header>

            <main className="bg-surface flex-grow px-6 py-16">
                <div className="text-outline mx-auto mb-8 flex max-w-[800px] items-center gap-2 text-sm">
                    <Link
                        className="transition-colors hover:text-primary"
                        href="/"
                    >
                        الرئيسية
                    </Link>
                    <span className="material-symbols-outlined text-xs">
                        chevron_left
                    </span>
                    <span className="font-medium text-on-surface dark:text-white">
                        إرسال فكرة
                    </span>
                </div>

                <div className="mx-auto max-w-[800px]">
                    <div className="border-outline-variant/10 bg-surface-container-lowest relative overflow-hidden rounded-xl border p-8 shadow-xl md:p-12">
                        <form className="relative z-10 space-y-8">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                        الدولة
                                    </label>
                                    <select className="bg-surface-container-low w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white focus:ring-2 focus:ring-primary">
                                        <option>اختر الدولة</option>
                                        <option>
                                            المملكة العربية السعودية
                                        </option>
                                        <option>
                                            الإمارات العربية المتحدة
                                        </option>
                                        <option>مصر</option>
                                        <option>الأردن</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                        المدينة
                                    </label>
                                    <input
                                        className="bg-surface-container-low w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white focus:ring-2 focus:ring-primary"
                                        placeholder="أدخل اسم المدينة"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    تصنيف الفكرة
                                </label>
                                <select className="bg-surface-container-low w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white focus:ring-2 focus:ring-primary">
                                    <option>اختر التصنيف</option>
                                    <option>تجارة إلكترونية</option>
                                    <option>خدمات منزلية</option>
                                    <option>صناعة يدوية</option>
                                    <option>تقنية وبرمجيات</option>
                                    <option>أخرى</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    عنوان الفكرة
                                </label>
                                <input
                                    className="bg-surface-container-low w-full rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white focus:ring-2 focus:ring-primary"
                                    placeholder="مثال: متجر بيع النباتات المنزلية النادرة"
                                    type="text"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    تفاصيل الفكرة (كيف ستبدأ بـ 100 دولار؟)
                                </label>
                                <textarea
                                    className="bg-surface-container-low w-full resize-none rounded-lg border-none p-4 text-on-surface dark:text-white transition-all focus:bg-white focus:ring-2 focus:ring-primary"
                                    placeholder="اشرح خطوات التنفيذ والميزانية المقترحة بالتفصيل..."
                                    rows={6}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    صورة الفكرة (اختياري)
                                </label>
                                <div className="group border-outline-variant bg-surface-container-low hover:bg-surface-container flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-all hover:border-primary">
                                    <span className="material-symbols-outlined mb-3 text-5xl text-primary transition-transform group-hover:scale-110">
                                        add_photo_alternate
                                    </span>
                                    <p className="font-headline text-sm font-bold text-on-surface dark:text-white">
                                        اسحب الصورة هنا أو اضغط للتحميل
                                    </p>
                                    <p className="text-outline mt-1 text-xs">
                                        PNG, JPG حتى 5 ميجابايت
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-headline block text-sm font-bold text-on-surface dark:text-white">
                                    ملف إضافي (PDF أو مخطط مالي)
                                </label>
                                <div className="border-outline-variant/10 bg-surface-container-low flex items-center gap-4 rounded-lg border p-4">
                                    <span className="material-symbols-outlined text-primary">
                                        upload_file
                                    </span>
                                    <span className="flex-grow text-sm text-on-surface dark:text-white">
                                        اختر ملفاً...
                                    </span>
                                    <button
                                        className="text-sm font-bold text-primary hover:underline"
                                        type="button"
                                    >
                                        تصفح الجهاز
                                    </button>
                                </div>
                            </div>

                            <div className="border-outline-variant/20 space-y-4 border-t pt-6">
                                <label className="group flex cursor-pointer items-start gap-3">
                                    <input
                                        className="border-outline-variant mt-1 h-5 w-5 rounded text-primary transition-all focus:ring-primary"
                                        type="checkbox"
                                    />
                                    <span className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white">
                                        أوافق على شروط الاستخدام وسياسة الخصوصية
                                        الخاصة بالمنصة.
                                    </span>
                                </label>
                                <label className="group flex cursor-pointer items-start gap-3">
                                    <input
                                        className="border-outline-variant mt-1 h-5 w-5 rounded text-primary transition-all focus:ring-primary"
                                        type="checkbox"
                                    />
                                    <span className="text-sm leading-relaxed text-on-surface dark:text-white/80 group-hover:text-on-surface dark:text-white">
                                        أتعهد بأن هذه الفكرة أصلية ويمكن تنفيذها
                                        بميزانية 100 دولار أو أقل.
                                    </span>
                                </label>
                            </div>

                            <div className="pt-6">
                                <button
                                    className="font-headline text-on-primary flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-5 text-lg font-bold shadow-lg shadow-primary/30 transition-all hover:opacity-90 active:scale-95"
                                    type="submit"
                                >
                                    <span>إرسال الفكرة للمراجعة</span>
                                    <span
                                        className="material-symbols-outlined"
                                        style={{
                                            fontVariationSettings: "'FILL' 1",
                                        }}
                                    >
                                        rocket_launch
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
