import { useLang } from '@erag/lang-sync-inertia/react';
import { Mail, Phone, Clock } from 'lucide-react';

export function ContactInfoCard() {
    const { __ } = useLang();

    const contactCards = [
        {
            icon: Mail,
            label: __('messages.contact.email_card_label'),
            value: __('messages.contact.email_value'),
        },
        {
            icon: Phone,
            label: __('messages.contact.whatsapp_card_label'),
            value: __('messages.contact.whatsapp_value'),
            dir: 'ltr' as const,
        },
        {
            icon: Clock,
            label: __('messages.contact.working_hours_card_label'),
            value: __('messages.contact.working_hours_value'),
        },
    ];

    return (
        <div className="flex flex-col gap-6 lg:col-span-5">
            {contactCards.map((card) => (
                <div
                    key={card.label}
                    className="flex items-start gap-6 rounded-xl border border-outline-variant/20 bg-surface-container-low p-8 transition-transform hover:-translate-x-2 dark:border-white/5 dark:bg-white/5"
                >
                    <div className="flex items-center justify-center rounded-lg bg-primary/10 p-4">
                        <card.icon className="size-6 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="mb-1 text-sm font-bold tracking-wider text-outline uppercase">
                            {card.label}
                        </span>
                        <span
                            className="text-lg font-bold text-on-surface dark:text-white"
                            dir={card.dir}
                        >
                            {card.value}
                        </span>
                    </div>
                </div>
            ))}
            <div className="mt-4 overflow-hidden rounded-xl border border-outline-variant/20 shadow-sm dark:border-white/5">
                <div className="group relative h-48">
                    <img
                        alt="Modern collaborative space"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDajC8yjkqysfCz6mqaKhjI-hDDpBiWe02Jzt39vG2lLz1VemVnPjWRRTLd3qhNFOeb-0_fBQ9DEMMOOQvons-Km57oC8YgyLi68fd63zNBETjr5Vx4w-FgiMbV0ZEaLU57reIxcZ-qWbC3K4rBZjY-YK3YlTAfsJF2X63oZt6p2UuaKojTGoOyI7sTi5bK2FSGsdg-KFGknkvNja9sS3nwaqYlZXoT6nv9lgrlv_mBylZmOwbsi2KboK-P-zqNmn-Tl6Sq7pdQkvs"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 to-transparent" />
                </div>
            </div>
        </div>
    );
}
