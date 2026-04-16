import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app/app-layout';

const sections = [
    {
        id: 'definitions',
        number: '٠١',
        title: 'تعريفات',
        content: [
            'تُعرف هذه الوثيقة بـ "اتفاقية الاستخدام"، ويُشار إلى "الدفتر الذهبي" بالمنصة. المُشارك هو أي فرد أو جهة قانونية تقوم بتسجيل حساب أو تقديم فكرة استثمارية عبر القنوات الرسمية للمنصة.',
            'الفكرة الاستثمارية: هي المحتوى المعرفي أو المقترح التجاري الذي يتم رفعه من قبل المستخدم لغرض التقييم أو المشاركة في المسابقات القائمة.',
        ],
    },
    {
        id: 'participation',
        number: '٠٢',
        title: 'شروط المشاركة',
        content: [
            'يجب أن يكون المشارك قد أتم سن الثامنة عشرة عاماً أو يمتلك موافقة صريحة من وليه الشرعي. تقتصر المشاركة على الأفكار الأصلية التي لم يسبق تنفيذها كمشروع تجاري قائم برأس مال يتجاوز الحد المسموح به في شروط المسابقة المحددة.',
        ],
        list: [
            'الالتزام بالهوية والآداب العامة المعمول بها.',
            'تقديم بيانات دقيقة وصحيحة عند التسجيل.',
            'عدم المشاركة بأفكار تنتهك حقوق الملكية الفكرية للغير.',
        ],
    },
    {
        id: 'intellectual-property',
        number: '٠٣',
        title: 'ملكية الأفكار',
        highlight: true,
        content: [
            'تظل الملكية الفكرية للأفكار المقدمة ملكاً للمشارك الأصلي، ومع ذلك، بمجرد تقديم الفكرة، يمنح المشارك "الدفتر الذهبي" حقاً غير حصري، عالمياً، ومجانياً لعرض ونشر الفكرة لأغراض التسويق والتصويت. في حال فوز الفكرة بالجائزة الكبرى، يتم توقيع اتفاقية منفصلة لتنظيم حقوق الاستثمار والتنفيذ.',
        ],
    },
    {
        id: 'voting',
        number: '٠٤',
        title: 'آلية التصويت',
        content: [
            'يتم احتساب الأصوات من خلال نظام تقني يمنع التكرار أو التلاعب. يحق لكل مستخدم مسجل التصويت مرة واحدة لكل فكرة. تشكل أصوات الجمهور ٤٠٪ من النتيجة النهائية، بينما تعود الـ ٦٠٪ المتبقية لتقييم لجنة الخبراء المتخصصة بناءً على معايير الجدوى والابتكار.',
        ],
    },
    {
        id: 'prizes',
        number: '٠٥',
        title: 'الجوائز',
        content: [
            'الجوائز المعلنة هي جوائز تشجيعية أو تمويلية تخضع لشروط الجهات المانحة. سيتم التواصل مع الفائزين عبر البريد الإلكتروني المسجل خلال ١٤ يوماً من إعلان النتائج الرسمية. لا يمكن استبدال الجوائز العينية بمبالغ نقدية إلا في الحالات التي تنص عليها شروط المسابقة صراحة.',
        ],
    },
    {
        id: 'disclaimer',
        number: '٠٦',
        title: 'إخلاء المسؤولية',
        content: [
            'منصة "الدفتر الذهبي" غير مسؤولة عن أي خسائر مادية أو معنوية قد تنتج عن تنفيذ الأفكار المطروحة دون دراسة جدوى متكاملة. المنصة هي وسيط يربط المبتكرين بالفرص، ولا نتحمل مسؤولية فشل أي مشروع في مراحل التنفيذ اللاحقة.',
        ],
    },
];

export default function Terms() {
    return (
        <AppLayout>
            <Head title="الشروط والأحكام" />

            <div className="mx-auto max-w-7xl px-8 pt-32 pb-16">
                <header className="mb-12">
                    <h1 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-on-surface dark:text-white md:text-5xl">
                        الشروط والأحكام
                    </h1>
                    <p className="text-on-surface-variant text-sm font-medium">
                        آخر تحديث: ٢٤ مايو ٢٠٢٤
                    </p>
                    <div className="bg-outline-variant/30 mt-8 h-px w-full" />
                </header>

                <div className="flex flex-col-reverse gap-16 md:flex-row">
                    <article className="space-y-20 md:w-3/4">
                        {sections.map((section) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-32"
                            >
                                <h2 className="mb-6 text-2xl font-bold text-on-surface dark:text-white">
                                    {section.title}
                                </h2>
                                {section.highlight ? (
                                    <div className="bg-surface-container-lowest golden-ledger-shadow rounded-lg border-r-4 border-primary p-8">
                                        <div className="mb-4 flex items-center gap-3 text-primary">
                                            <span
                                                className="material-symbols-outlined"
                                                style={{
                                                    fontVariationSettings:
                                                        "'FILL' 1",
                                                }}
                                            >
                                                gavel
                                            </span>
                                            <span className="text-lg font-bold">
                                                بند الملكية الفكرية
                                            </span>
                                        </div>
                                        <p className="leading-loose font-medium text-on-surface dark:text-white">
                                            {section.content[0]}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 leading-loose text-on-surface dark:text-white/80">
                                        {section.content.map(
                                            (paragraph, idx) => (
                                                <p key={idx}>{paragraph}</p>
                                            ),
                                        )}
                                        {section.list && (
                                            <ul className="text-on-surface-variant mr-4 list-inside list-disc space-y-2">
                                                {section.list.map(
                                                    (item, idx) => (
                                                        <li key={idx}>
                                                            {item}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </section>
                        ))}
                    </article>

                    <aside className="md:w-1/4">
                        <div className="bg-surface-container-low sticky top-32 rounded-xl p-8">
                            <h3 className="mb-6 text-lg font-bold text-on-surface dark:text-white">
                                فهرس المحتوى
                            </h3>
                            <nav className="space-y-4">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="group flex items-center gap-3 font-bold text-primary transition-transform hover:-translate-x-1"
                                    >
                                        <span className="text-xs opacity-50">
                                            {section.number}
                                        </span>
                                        <span className="group-hover:underline">
                                            {section.title}
                                        </span>
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>
                </div>
            </div>
        </AppLayout>
    );
}
