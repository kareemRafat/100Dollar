import { useLang } from '@erag/lang-sync-inertia/react';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    defaultValue?: string;
    onSearch: (value: string) => void;
};

export function ArchiveSearch({ defaultValue = '', onSearch }: Props) {
    const { __ } = useLang();
    const [value, setValue] = useState(defaultValue);
    const [prevDefaultValue, setPrevDefaultValue] = useState(defaultValue);

    // Adjust state during render when prop changes
    if (defaultValue !== prevDefaultValue) {
        setValue(defaultValue);
        setPrevDefaultValue(defaultValue);
    }

    const onSearchRef = useRef(onSearch);

    useEffect(() => {
        onSearchRef.current = onSearch;
    }, [onSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (value !== defaultValue) {
                onSearchRef.current(value);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [value, defaultValue]);

    return (
        <div className="relative z-20 mx-auto -mt-12 mb-10 w-full max-w-4xl px-4 md:px-0">
            <div className="pointer-events-none absolute inset-y-0 end-8 flex items-center">
                <Search className="size-6 text-outline" />
            </div>
            <input
                className="w-full rounded-2xl border border-outline-variant/30 bg-surface-container-lowest py-6 ps-8 pe-14 text-xl shadow-lg transition-all placeholder:text-outline-variant focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary focus:outline-none dark:border-primary dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-surface-container-lowest"
                placeholder={__('messages.archive.search_placeholder')}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
