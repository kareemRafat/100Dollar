import { useEffect, useState } from 'react';
import { useFlashToast } from '@/app/hooks/use-flash-toast';
import { cn } from '@/lib/utils';

// --- Types ---
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;
}

// --- Logic ---
let toasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

function emitChange() {
    listeners.forEach((listener) => listener([...toasts]));
}

export const toast = {
    add: (
        type: ToastType,
        title: string,
        description?: string,
        duration = 5000,
    ) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { id, type, title, description, duration };
        toasts = [...toasts, newToast];
        emitChange();

        if (duration !== Infinity) {
            setTimeout(() => {
                toast.dismiss(id);
            }, duration);
        }

        return id;
    },
    success: (title: string, description?: string) =>
        toast.add('success', title, description),
    info: (title: string, description?: string) =>
        toast.add('info', title, description),
    error: (title: string, description?: string) =>
        toast.add('error', title, description),
    warning: (title: string, description?: string) =>
        toast.add('warning', title, description),
    dismiss: (id: string | number) => {
        toasts = toasts.filter((t) => t.id !== id.toString());
        emitChange();
    },
    subscribe: (listener: (toasts: Toast[]) => void) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    },
};

// --- Internal Components ---
const icons = {
    success: 'check_circle',
    error: 'warning',
    info: 'info',
    warning: 'warning',
};

const styles = {
    success: {
        border: 'border-primary',
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
    },
    error: {
        border: 'border-error',
        iconBg: 'bg-error/10',
        iconColor: 'text-error',
    },
    info: {
        border: 'border-secondary',
        iconBg: 'bg-secondary/10',
        iconColor: 'text-secondary',
    },
    warning: {
        border: 'border-yellow-500',
        iconBg: 'bg-yellow-500/10',
        iconColor: 'text-yellow-500',
    },
};

function ToastCard({
    id,
    title,
    description,
    type,
    onClose,
    isRtl,
    isExiting,
}: {
    id: string;
    title: string;
    description?: string;
    type: ToastType;
    onClose: (id: string) => void;
    isRtl: boolean;
    isExiting?: boolean;
}) {
    const style = styles[type];

    return (
        <div
            className={cn(
                'flex w-full max-w-md cursor-pointer items-center gap-4 rounded-xl border-s-4 bg-surface-container-lowest p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 active:scale-95 md:min-w-[450px]',
                style.border,
                isExiting
                    ? 'translate-y-[-10px] scale-95 opacity-0'
                    : 'translate-y-0 scale-100 opacity-100',
            )}
            onClick={() => onClose(id)}
        >
            <div
                className={cn(
                    'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
                    style.iconBg,
                )}
            >
                <span
                    className={cn('material-symbols-outlined', style.iconColor)}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                    {icons[type]}
                </span>
            </div>
            <div className="flex-1 space-y-0.5">
                <h3 className="font-headline text-[14px] leading-tight font-bold text-on-surface">
                    {title}
                </h3>
                {description && (
                    <p className="font-body text-[13px] leading-relaxed text-on-surface-variant">
                        {description}
                    </p>
                )}
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose(id);
                }}
                className="text-on-surface-variant/40 transition-colors hover:text-on-surface"
            >
                <span className="material-symbols-outlined text-lg">close</span>
            </button>
        </div>
    );
}

// --- Exported Component ---
export function Toaster() {
    const [activeToasts, setActiveToasts] = useState<
        (Toast & { isExiting?: boolean })[]
    >([]);
    const [isRtl, setIsRtl] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Detect direction
        const dir = document.documentElement.getAttribute('dir') || 'ltr';
        setIsRtl(dir === 'rtl');

        // Observe direction changes
        const observer = new MutationObserver(() => {
            setIsRtl(document.documentElement.getAttribute('dir') === 'rtl');
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['dir'],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        return toast.subscribe((newToasts) => {
            setActiveToasts((current) => {
                // Find toasts that were removed
                const removedIds = current
                    .filter(
                        (t) =>
                            !t.isExiting &&
                            !newToasts.find((nt) => nt.id === t.id),
                    )
                    .map((t) => t.id);

                if (removedIds.length === 0) {
                    // Update current ones with new data, preserve isExiting
                    const merged = newToasts.map((nt) => {
                        const existing = current.find((t) => t.id === nt.id);

                        return existing
                            ? { ...nt, isExiting: existing.isExiting }
                            : nt;
                    });

                    // Keep the exiting ones too
                    const exiting = current.filter((t) => t.isExiting);

                    // Filter out exiting that are now back in newToasts (shouldn't happen with unique IDs but just in case)
                    const filteredExiting = exiting.filter(
                        (et) => !newToasts.find((nt) => nt.id === et.id),
                    );

                    return [...merged, ...filteredExiting];
                }

                // Mark removed as exiting
                const updated = current.map((t) => {
                    if (removedIds.includes(t.id)) {
                        return { ...t, isExiting: true };
                    }

                    return t;
                });

                // Add any new toasts that weren't in current
                newToasts.forEach((nt) => {
                    if (!current.find((t) => t.id === nt.id)) {
                        updated.push(nt);
                    }
                });

                // Set timeout to remove them from state
                removedIds.forEach((id) => {
                    setTimeout(() => {
                        setActiveToasts((prev) =>
                            prev.filter((t) => t.id !== id),
                        );
                    }, 300);
                });

                return updated;
            });
        });
    }, []);

    useFlashToast();

    if (!mounted) {
        return null;
    }

    return (
        <div
            className={cn(
                'pointer-events-none fixed top-0 z-[100] flex w-full flex-col gap-4 p-4 md:w-auto md:p-6',
                isRtl ? 'left-0' : 'right-0',
            )}
        >
            {activeToasts.map((t) => (
                <div
                    key={t.id}
                    className={cn(
                        'pointer-events-auto w-full max-w-md animate-in duration-300 fade-in slide-in-from-top-4',
                        isRtl ? 'md:mr-0' : 'md:ml-0',
                    )}
                >
                    <ToastCard
                        id={t.id}
                        title={t.title}
                        description={t.description}
                        type={t.type}
                        onClose={(id) => toast.dismiss(id)}
                        isRtl={isRtl}
                        isExiting={t.isExiting}
                    />
                </div>
            ))}
        </div>
    );
}
