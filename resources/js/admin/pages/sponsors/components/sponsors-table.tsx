import { Pencil, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Sponsor } from '@/types';
import { DAYS_OF_WEEK } from './sponsor-form-fields';

interface SponsorsTableProps {
    sponsors: Sponsor[];
    onToggleStatus: (sponsor: Sponsor) => void;
    onEditClick: (sponsor: Sponsor) => void;
    onDeleteClick: (sponsor: Sponsor) => void;
}

export default function SponsorsTable({ sponsors, onToggleStatus, onEditClick, onDeleteClick }: SponsorsTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>اليوم المخصص</TableHead>
                        <TableHead>فترة التعاقد</TableHead>
                        <TableHead>الأفكار</TableHead>
                        <TableHead>الجوائز</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead className="text-end">الإجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sponsors.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-48 text-center text-muted-foreground">
                                لا يوجد رعاة مضافين حالياً.
                            </TableCell>
                        </TableRow>
                    ) : (
                        sponsors.map((sponsor) => (
                            <TableRow key={sponsor.id}>
                                <TableCell>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={sponsor.logo} alt={sponsor.name} />
                                        <AvatarFallback>
                                            {sponsor.name.substring(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-semibold whitespace-nowrap">
                                    {sponsor.name}
                                </TableCell>
                                <TableCell className="font-semibold">
                                    {DAYS_OF_WEEK[sponsor.day_of_week]}
                                </TableCell>
                                <TableCell className="text-sm">
                                    <div className="flex flex-col text-sm text-muted-foreground">
                                        <span>
                                            من: <span className="font-bold">
                                                {new Date(sponsor.contract_start).toISOString().split('T')[0]}
                                            </span>
                                        </span>
                                        <span>
                                            إلى: <span className="font-bold">
                                                {new Date(sponsor.contract_end).toISOString().split('T')[0]}
                                            </span>
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>{sponsor.ideas_count || 0}</TableCell>
                                <TableCell>{sponsor.prize_records_count || 0}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={sponsor.is_active}
                                        onCheckedChange={() => onToggleStatus(sponsor)}
                                    />
                                </TableCell>
                                <TableCell className="text-end">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEditClick(sponsor)}
                                            className="h-8 w-8 text-primary hover:bg-primary/10"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDeleteClick(sponsor)}
                                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
