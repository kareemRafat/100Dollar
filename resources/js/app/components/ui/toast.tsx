import { cn } from '@/lib/utils';
import { useFlashToast } from '@/app/hooks/use-flash-toast';
import { useEffect, useState } from 'react';

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
    add: (type: ToastType, title: string, description?: string, duration = 5000) => {
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
    success: (title: string, description?: string) => toast.add('success', title, description),
    info: (title: string, description?: string) => toast.add('info', title, description),
    error: (title: string, description?: string) => toast.add('error', title, description),
    warning: (title: string, description?: string) => toast.add('warning', title, description),
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

function ToastCard({ id, title, description, type, onClose, isRtl }: { 
    id: string; 
    title: string; 
    description?: string; 
    type: ToastType; 
    onClose: (id: string) => void;
    isRtl: boolean;
}) {
    const style = styles[type];

    return (
        <div
            className={cn(
                "w-full max-w-md bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border-s-4 transition-all duration-200 active:scale-95 cursor-pointer",
                style.border
            )}
            onClick={() => onClose(id)}
        >
            <div className={cn("flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center", style.iconBg)}>
                <span 
                    className={cn("material-symbols-outlined", style.iconColor)} 
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                    {icons[type]}
                </span>
            </div>
            <div className="flex-1 space-y-0.5">
                <h3 className={cn(
                    "font-bold text-secondary font-headline leading-tight",
                    isRtl ? "text-[15px]" : "text-base"
                )}>
                    {title}
                </h3>
                {description && (
                    <p className={cn(
                        "text-on-surface-variant leading-relaxed font-body",
                        isRtl ? "text-[13px]" : "text-sm"
                    )}>
                        {description}
                    </p>
                )}
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose(id);
                }}
                className="text-on-surface-variant/40 hover:text-on-surface transition-colors"
            >
                <span className="material-symbols-outlined text-lg">close</span>
            </button>
        </div>
    );
}

// --- Exported Component ---
export function Toaster() {
    const [activeToasts, setActiveToasts] = useState<Toast[]>([]);
    const [isRtl, setIsRtl] = useState(false);

    useEffect(() => {
        // Detect direction
        const dir = document.documentElement.getAttribute('dir') || 'ltr';
        setIsRtl(dir === 'rtl');

        // Observe direction changes
        const observer = new MutationObserver(() => {
            setIsRtl(document.documentElement.getAttribute('dir') === 'rtl');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        return toast.subscribe((newToasts) => {
            setActiveToasts(newToasts);
        });
    }, []);

    useFlashToast();

    return (
        <div 
            className={cn(
                "fixed top-0 z-[100] p-4 md:p-6 pointer-events-none flex flex-col gap-4 w-full md:w-auto",
                isRtl ? "left-0" : "right-0"
            )}
        >
            {activeToasts.map((t) => (
                <div
                    key={t.id}
                    className={cn(
                        "pointer-events-auto w-full max-w-md transition-all duration-300 animate-in fade-in slide-in-from-top-4",
                        isRtl ? "md:mr-0" : "md:ml-0"
                    )}
                >
                    <ToastCard
                        id={t.id}
                        title={t.title}
                        description={t.description}
                        type={t.type}
                        onClose={(id) => toast.dismiss(id)}
                        isRtl={isRtl}
                    />
                </div>
            ))}
        </div>
    );
}
