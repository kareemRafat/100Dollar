import { useState, useRef   } from 'react';
import type {KeyboardEvent, ChangeEvent} from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (pin: string) => void;
    email?: string;
};

export function PinModal({ isOpen, onClose, onSubmit, email }: Props) {
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

        if (newPin.every((d) => d !== '')) {
            onSubmit(newPin.join(''));
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep-navy/10 p-4 backdrop-blur-sm sm:p-6">
            <div className="relative flex w-full max-w-[440px] flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-12">
                <button
                    className="absolute top-6 left-6 text-gray-400 transition-colors hover:text-deep-navy"
                    onClick={handleClose}
                    type="button"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="mb-8 rounded-full border border-gray-100 bg-gray-50 p-5">
                    <span
                        className="material-symbols-outlined text-4xl text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        verified_user
                    </span>
                </div>

                <div className="w-full">
                    <div className="mb-10 text-center">
                        <h2 className="mb-3 font-headline text-2xl font-bold text-deep-navy">
                            تحقق من هويتك
                        </h2>
                        <p className="px-4 font-body text-sm leading-relaxed text-gray-500">
                            أدخل الرمز المكون من 6 أرقام المرسل إلى
                            <br />
                            {email && (
                                <span className="font-semibold text-deep-navy">
                                    {email}
                                </span>
                            )}
                        </p>
                    </div>

                    <div
                        className="mb-10 flex flex-row-reverse justify-center gap-3"
                        dir="ltr"
                    >
                        {pin.map((digit, i) => (
                            <input
                                key={i}
                                ref={(el) => {
                                    inputRefs.current[i] = el;
                                }}
                                className="h-16 w-12 rounded-xl border-gray-200 bg-gray-50 text-center text-2xl font-bold text-deep-navy transition-all placeholder:text-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary"
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

                    <button
                        className="mb-8 w-full rounded-xl bg-primary py-4 text-lg font-bold text-on-primary shadow-sm transition-all hover:bg-primary-container active:scale-[0.98]"
                        onClick={() => onSubmit(pin.join(''))}
                        type="button"
                    >
                        تأكيد التصويت
                    </button>

                    <div className="flex flex-col items-center gap-4">
                        <button
                            className="flex items-center gap-1 text-sm font-bold text-primary transition-all hover:text-primary-container"
                            type="button"
                        >
                            إعادة إرسال الرمز
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
