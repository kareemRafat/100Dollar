import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';

const faqItems = [
    {
        question: 'كيف أشارك بفكرتي في المنصة؟',
        answer: 'يمكنك تقديم فكرتك من خلال إنشاء حساب مجاني ثم النقر على زر "قدّم فكرتك الآن". املأ النموذج بتفاصيل فكرتك بما في ذلك الوصف والميزانية المتوقعة والفئة المناسبة.',
    },
    {
        question: 'ما هي معايير قبول الأفكار؟',
        answer: 'يجب أن تكون الفكرة أصلية وقابلة للتنفيذ بميزانية لا تتجاوز 100 دولار. كما يُشترط أن تكون الفكرة غير منفذة كمشروع تجاري قائم وأن لا تنتهك حقوق الملكية الفكرية للغير.',
    },
    {
        question: 'كيف يتم التصويت للأفكار؟',
        answer: 'يتم التصويت من خلال نظام تقني يمنع التكرار. لكل مستخدم مسجل صوت واحد لكل فكرة. تشكل أصوات الجمهور ٤٠٪ من النتيجة النهائية بينما تعود الـ ٦٠٪ المتبقية لتقييم لجنة الخبراء.',
    },
    {
        question: 'متى يتم إعلان الفائزين؟',
        answer: 'يتم إعلان الفائز بشكل يومي بعد انتهاء فترة التصويت المحددة. يتم التواصل مع الفائز عبر البريد الإلكتروني المسجل خلال ١٤ يوماً من الإعلان.',
    },
    {
        question: 'هل يمكنني سحب فكرتي بعد تقديمها؟',
        answer: 'نعم، يمكنك سحب فكرتك في أي وقت قبل بدء فترة التصويت. بعد بدء التصويت، لا يمكن سحب الفكرة ولكن يمكنك تعديل بعض التفاصيل غير الجوهرية.',
    },
    {
        question: 'كيف أكون راعياً لجائزة يومية؟',
        answer: 'يمكنك التواصل معنا عبر صفحة "تواصل معنا" واختيار موضوع "رعاية". سيقوم فريقنا بالرد عليك خلال ٤٨ ساعة عمل لمناقشة تفاصيل الرعاية والفوائد المرتبطة بها.',
    },
];

const steps = [
    {
        number: '٠١',
        title: 'سجّل حسابك',
        description:
            'أنشئ حسابك المجاني في أقل من دقيقة واحدة وابدأ رحلتك.',
        icon: 'person_add',
    },
    {
        number: '٠٢',
        title: 'قدّم فكرتك',
        description:
            'اكتب تفاصيل فكرتك الإبداعية مع تحديد الميزانية المطلوبة والفئة المناسبة.',
        icon: 'edit_note',
    },
    {
        number: '٠٣',
        title: 'صوّت ودعم',
        description:
            'شارك في التصويت للأفكار التي تؤمن بها وساعد في اختيار الفائز اليومي.',
        icon: 'how_to_vote',
    },
    {
        number: '٠٤',
        title: 'اربح الجائزة',
        description:
            'الفكرة الحاصلة على أعلى التقييمات تفوز بجائزة ١٠٠ دولار لتنفيذ المشروع.',
        icon: 'emoji_events',
    },
];

export default function HowItWorks() {
    return (
        <AppLayout activeRoute="/how-it-works">
            <Head title="كيف نعمل" />

            <section className="relative flex h-[400px] items-center justify-center overflow-hidden bg-secondary md:h-[500px]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/90 via-deep-navy/80 to-deep-navy" />
                    <div className="pointer-events-none absolute inset-0 opacity-10">
                        <span className="material-symbols-outlined absolute top-20 right-[20%] scale-150 text-primary">
                            lightbulb
                        </span>
                        <span className="material-symbols-outlined absolute bottom-20 left-[15%] scale-125 text-primary">
                            rocket_launch
                        </span>
                        <span className="material-symbols-outlined absolute top-1/3 left-[40%] text-primary opacity-50">
                            psychology
                        </span>
                    </div>
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <div className="mb-6 inline-block rounded-full bg-primary/90 px-4 py-1 text-xs font-bold tracking-widest text-on-primary uppercase">
                        كيف نعمل
                    </div>
                    <h1 className="mb-6 font-headline text-4xl leading-tight font-extrabold text-white md:text-6xl">
                        من الفكرة إلى التمويل في{' '}
                        <span className="text-inverse-primary">أربع خطوات</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
                        عملية بسيطة وشفافة تحول أفكارك الإبداعية إلى مشاريع
                        حقيقية بدعم من مجتمعنا وشركائنا.
                    </p>
                </div>
            </section>

            <section className="bg-surface px-8 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative">
                                <div className="editorial-shadow rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 transition-transform hover:scale-[1.02]">
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                                        <span className="material-symbols-outlined text-3xl text-primary">
                                            {step.icon}
                                        </span>
                                    </div>
                                    <span className="text-5xl font-black text-primary/30">
                                        {step.number}
                                    </span>
                                    <h3 className="mt-4 mb-3 font-headline text-xl font-bold text-on-surface dark:text-white">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-on-surface-variant">
                                        {step.description}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="absolute top-1/2 -left-4 hidden -translate-y-1/2 lg:block">
                                        <span className="material-symbols-outlined text-3xl text-primary/30">
                                            arrow_back
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-surface-container-low px-8 py-24">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-black text-on-surface dark:text-white">
                            الأسئلة الشائعة
                        </h2>
                        <p className="mx-auto max-w-2xl text-on-surface-variant">
                            إجابات على أكثر الأسئلة تكراراً حول آلية عمل المنصة
                            وشروط المشاركة
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <details
                                key={index}
                                className="group rounded-xl border border-outline-variant/10 bg-surface-container-lowest shadow-sm"
                            >
                                <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-on-surface dark:text-white">
                                    <span>{item.question}</span>
                                    <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="border-t border-outline-variant/10 px-6 pt-4 pb-6">
                                    <p className="leading-relaxed text-on-surface-variant">
                                        {item.answer}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-secondary px-8 py-24">
                <div className="absolute inset-0 opacity-10">
                    <span className="material-symbols-outlined absolute top-10 right-[10%] scale-150 text-primary">
                        celebration
                    </span>
                    <span className="material-symbols-outlined absolute bottom-10 left-[15%] scale-125 text-primary">
                        stars
                    </span>
                </div>
                <div className="relative z-10 mx-auto max-w-4xl text-center">
                    <h2 className="mb-6 font-headline text-4xl font-black text-white md:text-5xl">
                        جاهز لبدء رحلتك؟
                    </h2>
                    <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-300">
                        انضم إلى آلاف المبتكرين الذين بدأوا مشاريعهم بـ 100
                        دولار فقط. فكرتك القادمة قد تغير حياتك!
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                        <Link
                            href="/submit-idea"
                            className="rounded-xl bg-primary px-10 py-5 text-xl font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-container"
                        >
                            قدّم فكرتك الآن
                        </Link>
                        <Link
                            href="/archive"
                            className="rounded-xl border border-white/20 px-10 py-5 text-xl font-bold text-white transition-all hover:bg-white/10"
                        >
                            تصفح الأفكار
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
