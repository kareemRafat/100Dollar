import { Loader2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IdeaStatus } from '@/types';

interface IdeaSearchHeaderProps {
    status: string;
    counts?: Record<string, number>;
    onStatusChange: (status: IdeaStatus) => void;
}

const statusTabs = [
    {
        id: IdeaStatus.PENDING,
        label: 'في انتظار المراجعة',
        icon: Clock,
        color: 'text-amber-500',
    },
    {
        id: IdeaStatus.APPROVED,
        label: 'تمت الموافقة',
        icon: CheckCircle,
        color: 'text-green-500',
    },
    {
        id: IdeaStatus.REJECTED,
        label: 'مرفوضة',
        icon: XCircle,
        color: 'text-red-500',
    },
];

export default function IdeaSearchHeader({ status, counts, onStatusChange }: IdeaSearchHeaderProps) {
    return (
        <div className="flex flex-wrap gap-2 border-b pb-4">
            {statusTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = status === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onStatusChange(tab.id)}
                        className={cn(
                            'flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all',
                            isActive
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'bg-muted/50 text-muted-foreground hover:bg-muted',
                        )}
                    >
                        <Icon
                            className={cn('size-4', !isActive && tab.color)}
                        />
                        {tab.label}
                        <Badge
                            variant={isActive ? 'secondary' : 'outline'}
                            className={cn(
                                'ms-1.5 flex h-4.5 min-w-6 items-center justify-center px-1 py-0 text-[10px] font-bold transition-all',
                                isActive
                                    ? 'border-none bg-white/20 text-white'
                                    : 'bg-muted text-muted-foreground',
                            )}
                        >
                            {counts ? (
                                counts[tab.id]
                            ) : (
                                <Loader2 className="size-2.5 animate-spin opacity-70" />
                            )}
                        </Badge>
                    </button>
                );
            })}
        </div>
    );
}
