import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Toaster as Sonner  } from 'sonner';
import type {ToasterProps} from 'sonner';
import { useAppearance } from '@/hooks/use-appearance';
import { useFlashToast } from '@/hooks/use-flash-toast';

function Toaster({ ...props }: ToasterProps) {
    const { appearance } = useAppearance();

    useFlashToast();

    return (
        <Sonner
            theme={appearance}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-deep-navy group-[.toaster]:text-white group-[.toaster]:border-primary/30 group-[.toaster]:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-[.toaster]:rounded-2xl group-[.toaster]:px-6 group-[.toaster]:py-5 group-[.toaster]:backdrop-blur-xl group-[.toaster]:font-headline group-[.toaster]:border-s-4 group-[.toaster]:border-s-primary",
                    description: "group-[.toast]:text-white/70 group-[.toast]:text-xs font-medium",
                    actionButton: "group-[.toast]:bg-primary group-[.toast]:text-on-primary group-[.toast]:font-bold group-[.toast]:rounded-xl group-[.toast]:px-4",
                    cancelButton: "group-[.toast]:bg-white/10 group-[.toast]:text-white group-[.toast]:font-bold group-[.toast]:rounded-xl group-[.toast]:px-4",
                    success: "!border-s-primary group-[.toaster]:bg-gradient-to-br group-[.toaster]:from-deep-navy group-[.toaster]:to-[#1a1a2e]",
                    error: "!border-s-error group-[.toaster]:bg-gradient-to-br group-[.toaster]:from-deep-navy group-[.toaster]:to-[#2a1a1a]",
                    info: "!border-s-secondary group-[.toaster]:bg-gradient-to-br group-[.toaster]:from-deep-navy group-[.toaster]:to-[#1a1a3e]",
                    warning: "!border-s-yellow-500 group-[.toaster]:bg-gradient-to-br group-[.toaster]:from-deep-navy group-[.toaster]:to-[#2a2a1a]",
                },
            }}
            icons={{
                success: <CheckCircle2 className="size-6 text-primary shadow-[0_0_15px_rgba(120,86,0,0.5)]" />,
                error: <AlertCircle className="size-6 text-error shadow-[0_0_15px_rgba(186,26,26,0.5)]" />,
                info: <Info className="size-6 text-secondary shadow-[0_0_15px_rgba(93,92,116,0.5)]" />,
                warning: <AlertTriangle className="size-6 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]" />,
            }}
            {...props}
        />
    );
}

export { Toaster };
