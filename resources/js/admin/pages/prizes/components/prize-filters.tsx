import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Sponsor } from '@/types';
import { PrizeStatus } from '@/types';

interface PrizeFiltersProps {
    statusFilter: string;
    sponsorFilter: string;
    sponsors: Sponsor[];
    onStatusChange: (value: string) => void;
    onSponsorChange: (value: string) => void;
}

export default function PrizeFilters({
    statusFilter,
    sponsorFilter,
    sponsors,
    onStatusChange,
    onSponsorChange,
}: PrizeFiltersProps) {
    return (
        <div className="flex items-center gap-3">
            <Select
                dir="rtl"
                value={sponsorFilter}
                onValueChange={onSponsorChange}
            >
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="كل الرعاة" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">كل الرعاة</SelectItem>
                    {sponsors.map((sponsor) => (
                        <SelectItem
                            key={sponsor.id}
                            value={sponsor.id.toString()}
                        >
                            {sponsor.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select
                dir="rtl"
                value={statusFilter}
                onValueChange={onStatusChange}
            >
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="الكل" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value={PrizeStatus.PENDING}>معلق</SelectItem>
                    <SelectItem value={PrizeStatus.DELIVERED}>
                        تم التسليم
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
