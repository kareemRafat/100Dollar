import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { usePage } from '@inertiajs/react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { languages, locale } = usePage().props;

    // Admin is Arabic only as requested
    if (window.location.pathname.startsWith('/admin')) {
        return null;
    }

    // Find the "other" language (if we are in 'ar', find 'en', and vice-versa)
    const otherLanguage = languages.find((lang) => lang.key !== locale);

    if (!otherLanguage) {
        return null;
    }

    return (
        <DropdownMenuItem
            onClick={() => (window.location.href = otherLanguage.url)}
            className="cursor-pointer rounded-lg py-2 flex items-center justify-between gap-2.5 text-xs font-bold focus:bg-primary/5"
        >
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary uppercase">
                {otherLanguage.key}
            </span>
            <div className="flex items-center gap-2.5">
                <span>{otherLanguage.name}</span>
                <Globe className="size-3.5" />
            </div>
        </DropdownMenuItem>
    );
}
