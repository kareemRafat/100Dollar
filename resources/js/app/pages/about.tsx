import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';

const partners = [
    'FINTECH_CO',
    'GLOBAL_VENTURES',
    'ARAB_TECH',
    'INNOVATE_HUB',
    'SEED_FUND',
];

const coreValues = [
    {
        icon: 'rocket_launch',
        title: 'الابتكار',
        description:
            'نسعى دائماً خلف الأفكار التي تكسر القواعد التقليدية للسوق.',
    },
    {
        icon: 'groups',
        title: 'المجتمع',
        description: 'قوتنا تكمن في جمهورنا الذي يقيّم ويدعم الأفكار بكل شغف.',
    },
    {
        icon: 'gavel',
        title: 'الشفافية',
        description: 'عمليات التصويت والتمويل واضحة ومعلنة للجميع دون استثناء.',
    },
    {
        icon: 'bolt',
        title: 'السرعة',
        description: 'من الفكرة إلى التمويل في وقت قياسي يواكب تسارع العصر.',
    },
];

export default function About() {
    return (
        <AppLayout activeRoute="/about">
            <Head title="من نحن" />

            <section className="relative overflow-hidden bg-secondary px-8 py-24 text-white">
                <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-16 md:flex-row-reverse">
                    <div className="z-10 md:w-1/2">
                        <h1 className="mb-8 text-4xl leading-tight font-black md:text-6xl">
                            نحن نؤمن أن كل فكرة تستحق فرصة
                        </h1>
                        <p className="text-on-surface-variant dark:text-slate-300 mb-10 max-w-xl text-lg leading-relaxed">
                            من قلب التحديات المالية، ولدنا لنمكّن العقول المبدعة
                            من تحويل أفكارها البسيطة إلى مشاريع قائمة بتمويلات
                            ذكية تبدأ من 100 دولار فقط.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="/"
                                className="hover:bg-primary-container rounded-xl bg-primary px-8 py-4 text-lg font-bold transition-all"
                            >
                                اكتشف الأفكار
                            </Link>
                            <Link
                                href="/how-it-works"
                                className="border-outline-variant/30 rounded-xl border px-8 py-4 text-lg font-bold transition-all hover:bg-white/10"
                            >
                                كيف نعمل؟
                            </Link>
                        </div>
                    </div>
                    <div className="relative md:w-1/2">
                        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                        <img
                            alt="Digital Innovation"
                            className="border-outline-variant/10 editorial-shadow relative z-10 rounded-3xl border border-white/5 grayscale transition-all duration-700 hover:grayscale-0"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4vgEmdJRyUxWT85Dgd6ZwmMLZ6_CgTuo_bZLM-15f0VfDjV-bqU4wS46vRi7P-iZItUHsclbyh7jZ0HbmV_2D0KRvZu2kQ0FBsRvvQJYgPNzJkML0L9pB2hmo0eD62ymukMpm_Vt7CM9SME7EcSjLWT5SWZkGRFBm6tnblRI0oBGfAZNDW0Ko-9MP2zckvGR4MrcFedgJbegfqxJy4wK1Kj93KRTv6l6F8Rf0RDrAsY8D647x_84x3FlGX3yUtmAdYxMtpTOULoE"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-surface-container-lowest dark:bg-surface-container-low px-8 py-24">
                <div className="mx-auto grid max-w-7xl items-center gap-20 md:grid-cols-2">
                    <div className="space-y-12">
                        <div className="flex items-start gap-6">
                            <div className="bg-primary-container/10 rounded-2xl p-4">
                                <span className="material-symbols-outlined text-4xl text-primary">
                                    lightbulb
                                </span>
                            </div>
                            <div>
                                <h3 className="mb-4 text-3xl font-black text-on-surface dark:text-white">
                                    مهمتنا
                                </h3>
                                <p className="text-on-surface-variant text-lg leading-relaxed">
                                    سد الفجوة بين الأفكار الخلاقة ومصادر التمويل
                                    الأولية عبر منصة شفافة تجمع المبدعين
                                    بالمستثمرين الذين يؤمنون بالقيمة قبل
                                    الأرقام.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="bg-primary-container/10 rounded-2xl p-4">
                                <span className="material-symbols-outlined text-4xl text-primary">
                                    visibility
                                </span>
                            </div>
                            <div>
                                <h3 className="mb-4 text-3xl font-black text-on-surface dark:text-white">
                                    رؤيتنا
                                </h3>
                                <p className="text-on-surface-variant text-lg leading-relaxed">
                                    أن نصبح السجل الذهبي لكل رائد أعمال يبدأ من
                                    الصفر، محولين 100 دولار إلى حجر الأساس
                                    لإمبراطوريات تجارية كبرى.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border-outline-variant/10 bg-surface-container-low relative rounded-3xl border p-12">
                        <p className="font-headline text-right text-2xl leading-relaxed font-medium text-on-surface dark:text-white italic">
                            "الابتكار ليس حكراً على من يملكون الملايين، بل هو حق
                            لكل من يمتلك الشجاعة لرسم مسار جديد بـ 100 دولار
                            فقط."
                        </p>
                        <div className="mt-8 flex items-center justify-end gap-4">
                            <div className="text-right">
                                <p className="font-bold text-on-surface dark:text-white">
                                    فريق الإدارة
                                </p>
                                <p className="text-on-surface-variant text-sm">
                                    السجل الذهبي
                                </p>
                            </div>
                            <div className="h-1 w-12 bg-primary" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-outline-variant/10 bg-primary-container/5 border-y px-8 py-20">
                <div className="mx-auto grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="text-center">
                        <p className="mb-2 text-5xl font-black text-primary md:text-6xl">
                            1,500+
                        </p>
                        <p className="font-bold text-on-surface dark:text-white">فكرة مُقدمة</p>
                    </div>
                    <div className="text-center">
                        <p className="mb-2 text-5xl font-black text-primary md:text-6xl">
                            45,000+
                        </p>
                        <p className="font-bold text-on-surface dark:text-white">مُصوّت نشط</p>
                    </div>
                    <div className="text-center">
                        <p className="mb-2 text-5xl font-black text-primary md:text-6xl">
                            85
                        </p>
                        <p className="font-bold text-on-surface dark:text-white">فائز محظوظ</p>
                    </div>
                    <div className="text-center">
                        <p className="mb-2 text-5xl font-black text-primary md:text-6xl">
                            $10M+
                        </p>
                        <p className="font-bold text-on-surface dark:text-white">
                            استثمارات لاحقة
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-surface px-8 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-black text-on-surface dark:text-white">
                            قيمنا الجوهرية
                        </h2>
                        <p className="text-on-surface-variant mx-auto max-w-2xl">
                            المبادئ التي تحكم كل تفاعل داخل منصتنا لضمان بيئة
                            عادلة ومحفزة للجميع
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-4">
                        {coreValues.map((value) => (
                            <div
                                key={value.icon}
                                className="border-outline-variant/5 bg-surface-container-lowest editorial-shadow rounded-2xl p-8 transition-transform hover:scale-[1.02]"
                            >
                                <span className="material-symbols-outlined mb-6 text-3xl text-primary">
                                    {value.icon}
                                </span>
                                <h4 className="mb-3 text-xl font-bold text-on-surface dark:text-white">
                                    {value.title}
                                </h4>
                                <p className="text-on-surface-variant text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-surface-container-low px-8 py-24">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">
                    <div className="md:w-1/2">
                        <div className="relative">
                            <div className="absolute -bottom-6 -left-6 h-full w-full rounded-3xl border-2 border-primary" />
                            <img
                                alt="Founder Portrait"
                                className="editorial-shadow relative z-10 rounded-3xl"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRWXYBtDY5262YQECmriYAZMWZx9NgZoqDXOE5FlJgrnHzt0WHO3mjKBQGkD2TUGnLu6qwNK2vsGBhDkk8S-sUyr1wTJ-f8N2HPMaCdqR-PjTFkjeszpXu4nXubtiyQSUkakXhXD5HVZgHulQLjhuLbFQyy4y_hvFoQwPMvkNAZXr2rDyELxRhyRo50ET7HKHU_vFMMwscXQePz-AKkd2V13kfiXNe8rlf8aTt6cmVWkvMIT_ITMYnvxLC_To9-6jWz4MZ65ZgUoA"
                            />
                        </div>
                    </div>
                    <div className="text-right md:w-1/2">
                        <span className="mb-4 block text-sm font-bold tracking-widest text-primary uppercase">
                            قصة البداية
                        </span>
                        <h2 className="mb-8 text-4xl leading-tight font-black text-on-surface dark:text-white">
                            كيف بدأت رحلة الـ 100 دولار في عام 2020؟
                        </h2>
                        <p className="text-on-surface-variant mb-6 text-lg leading-relaxed">
                            في ذروة المتغيرات العالمية عام 2020، لاحظنا أن هناك
                            آلاف العقول التي تمتلك أفكاراً ذكية ولكنها تفتقر إلى
                            "الدفعة الأولى". لم تكن المشكلة في الملايين، بل في
                            غياب من يؤمن بالخطوة الأولى.
                        </p>
                        <p className="text-on-surface-variant mb-10 text-lg leading-relaxed">
                            بدأنا كمدونة بسيطة لاستعراض الأفكار، واليوم نحن منصة
                            متكاملة تدير استثمارات وتدعم مشاريع غيرت حياة
                            العشرات. هدفنا لم يتغير: جعل ريادة الأعمال متاحة
                            للجميع.
                        </p>
                        <div className="border-outline-variant/10 inline-block rounded-2xl border bg-surface-container-lowest p-6 shadow-sm">
                            <p className="text-xl font-bold text-on-surface dark:text-white">
                                عمر الجابر
                            </p>
                            <p className="text-primary">
                                المؤسس والمدير التنفيذي
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-outline-variant/10 bg-surface overflow-hidden border-t px-8 py-12">
                <div className="mx-auto max-w-7xl">
                    <p className="text-outline mb-8 text-center text-sm font-bold tracking-widest uppercase">
                        شركاء النجاح والممولون
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale md:gap-24">
                        {partners.map((partner) => (
                            <span
                                key={partner}
                                className="font-headline text-2xl font-bold"
                            >
                                {partner}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
