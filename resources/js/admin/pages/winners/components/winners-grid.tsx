import type { Idea, Sponsor } from '@/types';
import WinnerCard from './winner-card';

interface WinnerDay {
    day_index: number;
    sponsor: Sponsor | null;
    leading_idea: Idea | null;
    announced_winner: Idea | null;
    is_today: boolean;
    is_tied?: boolean;
    voting_status?: 'voting_open' | 'completed' | null;
    remaining_days?: number | null;
}

interface WinnersGridProps {
    days: WinnerDay[];
    onConfirm: (idea: Idea) => void;
}

const dayNames = [
    'الأحد',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
];

const weekOrder = [6, 0, 1, 2, 3, 4, 5];

export default function WinnersGrid({ days, onConfirm }: WinnersGridProps) {
    const sortedDays = [...days].sort(
        (a, b) =>
            weekOrder.indexOf(a.day_index) - weekOrder.indexOf(b.day_index),
    );

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedDays.map((day, index) => (
                <WinnerCard
                    key={day.day_index}
                    day={day}
                    dayName={dayNames[day.day_index]}
                    isLastInGrid={index === sortedDays.length - 1}
                    onConfirm={onConfirm}
                />
            ))}
        </div>
    );
}
