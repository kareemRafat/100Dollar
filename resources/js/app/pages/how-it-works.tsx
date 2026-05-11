import { useLang } from '@erag/lang-sync-inertia/react';
import { Head, Link } from '@inertiajs/react';

export default function HowItWorks() {
    const { __ } = useLang();

    const faqItems = [
        {
            question: __('messages.how_it_works.faq_q1', { defaultValue: 'كيف أشارك بفكرتي في المنصة؟' }),
            answer: __('messages.how_it_works.faq_a1', { defaultValue: 'يمكنك تقديم فكرتك من خلال إنشاء حساب مجاني ثم النقر على زر "قدّم فكرتك الآن". املأ النموذج بتفاصيل فكرتك بما في ذلك الوصف والميزانية المتوقعة والفئة المناسبة.' }),
        },
        {
            question: __('messages.how_it_works.faq_q2', { defaultValue: 'ما هي معايير قبول الأفكار؟' }),
            answer: __('messages.how_it_works.faq_a2', { defaultValue: 'يجب أن تكون الفكرة أصلية وقابلة للتنفيذ بميزانية لا تتجاوز 100 دولار. كما يُشترط أن تكون الفكرة غير منفذة كمشروع تجاري قائم وأن لا تنتهك حقوق الملكية الفكرية للغير.' }),
        },
        {
            question: __('messages.how_it_works.faq_q3', { defaultValue: 'كيف يتم التصويت للأفكار؟' }),
            answer: __('messages.how_it_works.faq_a3', { defaultValue: 'يتم التصويت من خلال نظام تقني يمنع التكرار. لكل مستخدم مسجل صوت واحد لكل فكرة. تشكل أصوات الجمهور ٤٠٪ من النتيجة النهائية بينما تعود الـ ٦٠٪ المتبقية لتقييم لجنة الخبراء.' }),
        },
        {
            question: __('messages.how_it_works.faq_q4', { defaultValue: 'متى يتم إعلان الفائزين؟' }),
            answer: __('messages.how_it_works.faq_a4', { defaultValue: 'يتم إعلان الفائز بشكل يومي بعد انتهاء فترة التصويت المحددة. يتم التواصل مع الفائز عبر البريد الإلكتروني المسجل خلال ١٤ يوماً من الإعلان.' }),
        },
        {
            question: __('messages.how_it_works.faq_q5', { defaultValue: 'هل يمكنني سحب فكرتي بعد تقديمها؟' }),
            answer: __('messages.how_it_works.faq_a5', { defaultValue: 'نعم، يمكنك سحب فكرتك في أي وقت قبل بدء فترة التصويت. بعد بدء التصويت، لا يمكن سحب الفكرة ولكن يمكنك تعديل بعض التفاصيل غير الجوهرية.' }),
        },
        {
            question: __('messages.how_it_works.faq_q6', { defaultValue: 'كيف أكون راعياً لجائزة يومية؟' }),
            answer: __('messages.how_it_works.faq_a6', { defaultValue: 'يمكنك التواصل معنا عبر صفحة "تواصل معنا" واختيار موضوع "رعاية". سيقوم فريقنا بالرد عليك خلال ٤٨ ساعة عمل لمناقشة تفاصيل الرعاية والفوائد المرتبطة بها.' }),
        },
    ];

    const steps = [
        {
            number: '01',
            title: __('messages.how_it_works.step1_title'),
            description: __('messages.how_it_works.step1_desc'),
            icon: 'person_add',
        },
        {
            number: '02',
            title: __('messages.how_it_works.step2_title'),
            description: __('messages.how_it_works.step2_desc'),
            icon: 'edit_note',
        },
        {
            number: '03',
            title: __('messages.how_it_works.step3_title'),
            description: __('messages.how_it_works.step3_desc'),
            icon: 'how_to_vote',
        },
        {
            number: '04',
            title: __('messages.how_it_works.step4_title'),
            description: __('messages.how_it_works.step4_desc'),
            icon: 'emoji_events',
        },
    ];

    return (
        <>
            <Head title={__('messages.ui.how_it_works')} />

            <section className="relative flex h-[280px] items-center justify-center overflow-hidden bg-secondary md:h-[350px]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/90 via-deep-navy/80 to-deep-navy" />
                    <div className="pointer-events-none absolute inset-0 opacity-10">
                        <span className="material-symbols-outlined absolute top-20 end-[20%] scale-125 text-primary">
                            lightbulb
                        </span>
                        <span className="material-symbols-outlined absolute bottom-20 start-[15%] scale-110 text-primary">
                            rocket_launch
                        </span>
                    </div>
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <div className="mb-4 inline-block rounded-full bg-primary/90 px-4 py-1 text-[10px] font-bold tracking-widest text-on-primary uppercase">
                        {__('messages.how_it_works.hero_badge')}
                    </div>
                    <h1 className="mb-4 font-headline text-xl leading-tight font-extrabold text-white md:text-3xl">
                        {__('messages.how_it_works.hero_title')}{' '}
                        <span className="text-inverse-primary">{__('messages.how_it_works.hero_steps')}</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-xs leading-relaxed text-gray-300">
                        {__('messages.how_it_works.hero_desc')}
                    </p>
                </div>
            </section>

            <section className="bg-surface px-8 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative">
                                <div className="editorial-shadow rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5 transition-transform hover:scale-[1.02]">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                        <span className="material-symbols-outlined text-xl text-primary">
                                            {step.icon}
                                        </span>
                                    </div>
                                    <span className="text-3xl font-black text-primary/30">
                                        {step.number}
                                    </span>
                                    <h3 className="mt-3 mb-1.5 font-headline text-base font-bold text-on-surface dark:text-white">
                                        {step.title}
                                    </h3>
                                    <p className="text-[10px] leading-relaxed text-on-surface-variant">
                                        {step.description}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="absolute top-1/2 -start-4 hidden -translate-y-1/2 lg:block">
                                        <span className="material-symbols-outlined text-xl text-primary/30 rtl:rotate-180">
                                            arrow_forward
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-surface-container-low px-8 py-12">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8 text-center">
                        <h2 className="mb-3 text-2xl font-black text-on-surface dark:text-white">
                            {__('messages.how_it_works.faq_title')}
                        </h2>
                        <p className="mx-auto max-w-2xl text-xs text-on-surface-variant">
                            {__('messages.how_it_works.faq_desc')}
                        </p>
                    </div>
                    <div className="space-y-3">
                        {faqItems.map((item, index) => (
                            <details
                                key={index}
                                className="group rounded-xl border border-outline-variant/10 bg-surface-container-lowest shadow-sm"
                            >
                                <summary className="flex cursor-pointer items-center justify-between p-3.5 px-6 font-bold text-on-surface dark:text-white">
                                    <span className="text-xs">{item.question}</span>
                                    <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180 text-lg">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="border-t border-outline-variant/10 px-6 pt-2 pb-4">
                                    <p className="text-xs leading-relaxed text-on-surface-variant">
                                        {item.answer}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-secondary px-8 py-12">
                <div className="absolute inset-0 opacity-10">
                    <span className="material-symbols-outlined absolute top-10 end-[10%] scale-110 text-primary">
                        celebration
                    </span>
                    <span className="material-symbols-outlined absolute bottom-10 start-[15%] scale-100 text-primary">
                        stars
                    </span>
                </div>
                <div className="relative z-10 mx-auto max-w-4xl text-center">
                    <h2 className="mb-5 font-headline text-2xl font-black text-white md:text-3xl">
                        {__('messages.how_it_works.ready_title')}
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-300">
                        {__('messages.how_it_works.ready_desc')}
                    </p>
                    <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
                        <Link
                            href="/submit-idea"
                            className="rounded-xl bg-primary px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-container"
                        >
                            {__('messages.ui.submit_your_idea_now')}
                        </Link>
                        <Link
                            href="/archive"
                            className="rounded-xl border border-white/20 px-6 py-3 text-base font-bold text-white transition-all hover:bg-white/10"
                        >
                            {__('messages.how_it_works.browse_ideas')}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
