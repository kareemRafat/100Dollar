import { useLang } from '@erag/lang-sync-inertia/react';
import { useState, useRef   } from 'react';
import type {KeyboardEvent, ChangeEvent} from 'react';
import { Button } from '@/app/components/ui/button';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (pin: string) => void;
    email?: string;
};

export function PinModal({ isOpen, onClose, onSubmit, email }: Props) {
    const { __ } = useLang();
    const [pin, setPin] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    if (!isOpen) {
        return null;
    }

    function handleChange(index: number, e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.slice(-1);

        if (!/^\d*$/.test(value)) {
            return;
        }

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    function handleClose() {
        setPin(Array(6).fill(''));
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep-navy/10 p-4 backdrop-blur-sm sm:p-6 dark:bg-deep-navy/40">
            <div className="relative flex w-full max-w-[440px] flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-12 dark:border-gray-800 dark:bg-gray-900">
                <button
                    className="absolute top-6 left-6 text-gray-400 transition-colors hover:text-deep-navy dark:text-gray-500 dark:hover:text-gray-100"
                    onClick={handleClose}
                    type="button"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="mb-8 rounded-full border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-800/50">
                    <span
                        className="material-symbols-outlined text-4xl text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        verified_user
                    </span>
                </div>

                <div className="w-full">
                    <div className="mb-10 text-center">
                        <h2 className="mb-3 font-headline text-2xl font-bold text-deep-navy dark:text-gray-100">
                            {__('messages.vote_pin.title')}
                        </h2>
                        <p className="px-4 font-body text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            {__('messages.vote_pin.desc')}
                            <br />
                            {email && (
                                <span className="font-semibold text-deep-navy dark:text-primary">
                                    {email}
                                </span>
                            )}
                        </p>
                    </div>

                    <div
                        className="mb-10 flex justify-center gap-3"
                        dir="ltr"
                    >
                        {pin.map((digit, i) => (
                            <input
                                key={i}
                                autoFocus={i === 0}
                                ref={(el) => {
                                    inputRefs.current[i] = el;
                                }}
                                className="h-16 w-12 rounded-xl border-gray-200 bg-gray-50 text-center text-2xl font-bold text-deep-navy transition-all placeholder:text-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-600"
                                maxLength={1}
                                placeholder="-"
                                type="text"
                                inputMode="numeric"
                                value={digit}
                                onChange={(e) => handleChange(i, e)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                            />
                        ))}
                    </div>

                    <Button
                        className="mb-8 w-full rounded-xl py-6 text-lg font-bold shadow-sm"
                        onClick={() => onSubmit(pin.join(''))}
                    >
                        {__('messages.vote_pin.confirm')}
                    </Button>

                    <div className="flex flex-col items-center gap-4">
                        <button
                            className="flex items-center gap-1 text-sm font-bold text-primary transition-all hover:text-primary/80"
                            type="button"
                        >
                            {__('messages.vote_pin.resend')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

