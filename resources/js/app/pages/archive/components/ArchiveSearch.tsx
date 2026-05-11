import { useLang } from '@erag/lang-sync-inertia/react';
import { Search } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

type Props = {
    defaultValue?: string;
    onSearch: (value: string) => void;
};

export function ArchiveSearch({ defaultValue = '', onSearch }: Props) {
    const { __ } = useLang();
    const [value, setValue] = useState(defaultValue || '');
    const [prevDefaultValue, setPrevDefaultValue] = useState(defaultValue);
    const lastSentValue = useRef(defaultValue);

    if (defaultValue !== prevDefaultValue) {
        setPrevDefaultValue(defaultValue);
        setValue(defaultValue || '');
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (value !== defaultValue) {
                onSearch(value);
                lastSentValue.current = value;
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [value, onSearch, defaultValue]);

    return (
        <div className="relative z-10 mx-auto -mt-16 mb-10 w-full max-w-2xl">
            <div className="pointer-events-none absolute inset-y-0 end-4 flex items-center">
                <Search className="size-5 text-outline" />
            </div>
            <input
                className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-lowest py-5 ps-6 pe-12 text-lg shadow-xl transition-all focus:bg-white focus:ring-2 focus:ring-primary dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-surface-container-lowest dark:border-white dark:border-2"
                placeholder={__('messages.archive.search_placeholder')}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
