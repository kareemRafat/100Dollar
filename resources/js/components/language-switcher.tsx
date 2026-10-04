import { useLang } from '@erag/lang-sync-inertia/react';
import { usePage } from '@inertiajs/react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Language {
    key: string;
    name: string;
    url: string;
}

const FLAGS: Record<string, string> = {
    ar: '🇸🇦',
    en: '🇺🇸',
};

/**
 * Build the URL that switches to the given language.
 *
 * The `set_locale` flag is what tells SetRequestLocale to persist the choice
 * to the authenticated user's record instead of only the session.
 */
function buildLocaleUrl(language: Language): string {
    return `${language.url}${language.url.includes('?') ? '&' : '?'}set_locale=1`;
}

function useSupportedLanguages() {
    const { languages, locale } = usePage().props as {
        languages?: Language[];
        locale: string;
    };

    return {
        languages: languages ?? [],
        locale,
        // Admin is Arabic only as requested
        isAdmin: window.location.pathname.startsWith('/admin'),
    };
}

/**
 * Radio group listing every supported language, with the active one marked.
 *
 * Renders no trigger of its own, so it can be dropped into an existing
 * dropdown menu. When used standalone, wrap it in a `DropdownMenu` with a
 * trigger, or use the `navbar` variant of the default export.
 */
export function LanguageMenuGroup({ className }: { className?: string }) {
    const { languages, locale, isAdmin } = useSupportedLanguages();

    if (isAdmin || languages.length === 0) {
        return null;
    }

    return (
        <DropdownMenuRadioGroup
            value={locale}
            onValueChange={(value) => {
                const target = languages.find((lang) => lang.key === value);

                // Ignore re-selecting the active language to skip a pointless reload
                if (target && target.key !== locale) {
                    window.location.href = buildLocaleUrl(target);
                }
            }}
            className={className}
        >
            {languages.map((language) => (
                <DropdownMenuRadioItem
                    key={language.key}
                    value={language.key}
                    className="cursor-pointer gap-2 rounded-lg py-2 text-xs font-bold focus:bg-primary/5 focus:text-primary dark:focus:bg-primary/10"
                >
                    <span aria-hidden="true">{FLAGS[language.key]}</span>
                    <span>{language.name}</span>
                </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
    );
}

export default function LanguageSwitcher({
    variant = 'navbar',
    className,
}: {
    variant?: 'navbar' | 'standalone' | 'segmented';
    className?: string;
}) {
    const { __ } = useLang();
    const { languages, locale, isAdmin } = useSupportedLanguages();

    if (isAdmin || languages.length === 0) {
        return null;
    }

    if (variant === 'standalone') {
        const otherLanguage = languages.find((lang) => lang.key !== locale);

        if (!otherLanguage) {
            return null;
        }

        return (
            <button
                onClick={() =>
                    (window.location.href = buildLocaleUrl(otherLanguage))
                }
                className="flex items-center gap-2 rounded-lg border border-outline-variant/10 bg-surface-container-low px-3 py-1.5 text-xs font-bold text-on-surface-variant transition-all hover:bg-primary/10 hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-primary"
            >
                <Globe className="size-3.5" />
                <span>{otherLanguage.name}</span>
                <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[9px] text-primary uppercase">
                    {otherLanguage.key}
                </span>
            </button>
        );
    }

    if (variant === 'segmented') {
        return (
            <div
                className={cn(
                    'flex items-center gap-1 rounded-lg bg-surface-container-high p-1 dark:bg-white/5',
                    className,
                )}
            >
                {languages.map((language) => (
                    <button
                        key={language.key}
                        type="button"
                        onClick={() => {
                            if (language.key !== locale) {
                                window.location.href = buildLocaleUrl(language);
                            }
                        }}
                        className={cn(
                            'flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-bold transition-colors',
                            language.key === locale
                                ? 'bg-primary text-on-primary shadow-sm'
                                : 'text-on-surface-variant hover:text-on-surface dark:text-gray-400 dark:hover:text-white',
                        )}
                    >
                        <span aria-hidden="true">{FLAGS[language.key]}</span>
                        {language.name}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'size-9 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary dark:hover:bg-white/5 dark:hover:text-primary',
                        className,
                    )}
                >
                    <Globe className="size-[1.15rem]" />
                    <span className="sr-only">
                        {__('messages.ui.language')}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="mt-1 w-44 rounded-xl border-outline-variant/10 p-1 shadow-xl dark:bg-surface-container-low"
            >
                <LanguageMenuGroup />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
