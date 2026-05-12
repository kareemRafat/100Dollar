import { Head, router, useForm } from '@inertiajs/react';
import { Calendar, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import type { SubmitEvent } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import admin from '@/routes/admin';
import type { BreadcrumbItem, Sponsor } from '@/types';

interface SponsorsProps {
    sponsors: Sponsor[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
    },
    {
        title: 'الرعاة',
        href: admin.sponsors.index().url,
    },
];

const DAYS_OF_WEEK = [
    'الأحد',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
];

export default function SponsorsPage({ sponsors }: SponsorsProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);

    const createForm = useForm({
        name: '',
        day_of_week: '' as string | number,
        contract_start: '',
        contract_end: '',
        is_active: true,
        logo: null as File | null,
    });

    const editForm = useForm({
        name: '',
        day_of_week: '' as string | number,
        contract_start: '',
        contract_end: '',
        is_active: true,
        logo: null as File | null,
    });

    const deleteForm = useForm({});

    const handleCreateSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        createForm.post(admin.sponsors.store().url, {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
                toast.success('تم إضافة الراعي بنجاح');
            },
        });
    };

    const handleEditClick = (sponsor: Sponsor) => {
        setSelectedSponsor(sponsor);
        editForm.setData({
            name: sponsor.name,
            day_of_week: sponsor.day_of_week,
            contract_start: sponsor.contract_start.split('T')[0],
            contract_end: sponsor.contract_end.split('T')[0],
            is_active: sponsor.is_active,
            logo: null,
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedSponsor) return;

        // Use post with _method=PATCH for multipart/form-data with file upload
        editForm.post(admin.sponsors.update(selectedSponsor.id).url, {
            forceFormData: true,
            onBefore: () => {
                // Manually add _method since we're using post for file support
                (editForm.data as any)._method = 'PATCH';
            },
            onSuccess: () => {
                setIsEditModalOpen(false);
                editForm.reset();
                toast.success('تم تحديث بيانات الراعي بنجاح');
            },
        });
    };

    const handleDeleteClick = (sponsor: Sponsor) => {
        setSelectedSponsor(sponsor);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedSponsor) return;

        deleteForm.delete(admin.sponsors.destroy(selectedSponsor.id).url, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                toast.success('تم حذف الراعي بنجاح');
            },
        });
    };

    const handleToggleStatus = (sponsor: Sponsor) => {
        router.patch(admin.sponsors.toggleStatus(sponsor.id).url, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('تم تحديث حالة الراعي');
            },
        });
    };

    return (
        <>
            <Head title="إدارة الرعاة" />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">الرعاة</h1>
                        <p className="text-sm text-muted-foreground">
                            إدارة رعاة المنصة وتوزيعهم على أيام الأسبوع
                        </p>
                    </div>
                    <Button onClick={() => setIsCreateModalOpen(true)} className="w-full md:w-auto">
                        <Plus className="me-2 h-4 w-4" />
                        إضافة راعي جديد
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>قائمة الرعاة</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
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
                                                        <AvatarFallback>{sponsor.name.substring(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell className="font-medium whitespace-nowrap">{sponsor.name}</TableCell>
                                                <TableCell>{DAYS_OF_WEEK[sponsor.day_of_week]}</TableCell>
                                                <TableCell className="text-sm">
                                                    <div className="flex items-center gap-1 text-muted-foreground">
                                                        <span>{new Date(sponsor.contract_start).toLocaleDateString('ar-EG')}</span>
                                                        <span>-</span>
                                                        <span>{new Date(sponsor.contract_end).toLocaleDateString('ar-EG')}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{sponsor.ideas_count || 0}</TableCell>
                                                <TableCell>{sponsor.prize_records_count || 0}</TableCell>
                                                <TableCell>
                                                    <Switch 
                                                        checked={sponsor.is_active} 
                                                        onCheckedChange={() => handleToggleStatus(sponsor)}
                                                    />
                                                </TableCell>
                                                <TableCell className="text-end">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleEditClick(sponsor)}
                                                            className="h-8 w-8 text-primary hover:bg-primary/10"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteClick(sponsor)}
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
                    </CardContent>
                </Card>
            </div>

            {/* Create Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent dir="rtl">
                    <form onSubmit={handleCreateSubmit}>
                        <DialogHeader>
                            <DialogTitle>إضافة راعي جديد</DialogTitle>
                            <DialogDescription>أدخل بيانات الراعي الجديد هنا.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">الاسم</Label>
                                <Input
                                    id="name"
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                />
                                {createForm.errors.name && <p className="text-xs text-red-500">{createForm.errors.name}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="day_of_week">اليوم المخصص</Label>
                                <Select
                                    dir="rtl"
                                    value={createForm.data.day_of_week.toString()}
                                    onValueChange={(v) => createForm.setData('day_of_week', parseInt(v))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر اليوم" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DAYS_OF_WEEK.map((day, index) => (
                                            <SelectItem key={index} value={index.toString()}>{day}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {createForm.errors.day_of_week && <p className="text-xs text-red-500">{createForm.errors.day_of_week}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="contract_start">بداية التعاقد</Label>
                                    <Input
                                        id="contract_start"
                                        type="date"
                                        value={createForm.data.contract_start}
                                        onChange={(e) => createForm.setData('contract_start', e.target.value)}
                                    />
                                    {createForm.errors.contract_start && <p className="text-xs text-red-500">{createForm.errors.contract_start}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="contract_end">نهاية التعاقد</Label>
                                    <Input
                                        id="contract_end"
                                        type="date"
                                        value={createForm.data.contract_end}
                                        onChange={(e) => createForm.setData('contract_end', e.target.value)}
                                    />
                                    {createForm.errors.contract_end && <p className="text-xs text-red-500">{createForm.errors.contract_end}</p>}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="logo">الشعار</Label>
                                <Input
                                    id="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => createForm.setData('logo', e.target.files?.[0] || null)}
                                />
                                {createForm.errors.logo && <p className="text-xs text-red-500">{createForm.errors.logo}</p>}
                            </div>
                            <div className="flex items-center gap-3">
                                <Switch
                                    id="active"
                                    checked={createForm.data.is_active}
                                    onCheckedChange={(v) => createForm.setData('is_active', v)}
                                />
                                <Label htmlFor="active">حساب نشط</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>إلغاء</Button>
                            <Button type="submit" disabled={createForm.processing}>
                                {createForm.processing && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
                                حفظ
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent dir="rtl">
                    <form onSubmit={handleEditSubmit}>
                        <DialogHeader>
                            <DialogTitle>تعديل بيانات الراعي</DialogTitle>
                            <DialogDescription>تعديل بيانات الراعي المختار.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">الاسم</Label>
                                <Input
                                    id="edit-name"
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                />
                                {editForm.errors.name && <p className="text-xs text-red-500">{editForm.errors.name}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-day">اليوم المخصص</Label>
                                <Select
                                    dir="rtl"
                                    value={editForm.data.day_of_week.toString()}
                                    onValueChange={(v) => editForm.setData('day_of_week', parseInt(v))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر اليوم" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DAYS_OF_WEEK.map((day, index) => (
                                            <SelectItem key={index} value={index.toString()}>{day}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {editForm.errors.day_of_week && <p className="text-xs text-red-500">{editForm.errors.day_of_week}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-start">بداية التعاقد</Label>
                                    <Input
                                        id="edit-start"
                                        type="date"
                                        value={editForm.data.contract_start}
                                        onChange={(e) => editForm.setData('contract_start', e.target.value)}
                                    />
                                    {editForm.errors.contract_start && <p className="text-xs text-red-500">{editForm.errors.contract_start}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-end">نهاية التعاقد</Label>
                                    <Input
                                        id="edit-end"
                                        type="date"
                                        value={editForm.data.contract_end}
                                        onChange={(e) => editForm.setData('contract_end', e.target.value)}
                                    />
                                    {editForm.errors.contract_end && <p className="text-xs text-red-500">{editForm.errors.contract_end}</p>}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-logo">الشعار (اختياري)</Label>
                                <Input
                                    id="edit-logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => editForm.setData('logo', e.target.files?.[0] || null)}
                                />
                                {editForm.errors.logo && <p className="text-xs text-red-500">{editForm.errors.logo}</p>}
                            </div>
                            <div className="flex items-center gap-3">
                                <Switch
                                    id="edit-active"
                                    checked={editForm.data.is_active}
                                    onCheckedChange={(v) => editForm.setData('is_active', v)}
                                />
                                <Label htmlFor="edit-active">حساب نشط</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>إلغاء</Button>
                            <Button type="submit" disabled={editForm.processing}>
                                {editForm.processing && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
                                تحديث
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="p-6" dir="rtl">
                    <form onSubmit={handleDeleteSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-start">حذف الراعي</DialogTitle>
                            <DialogDescription className="text-start">
                                هل أنت متأكد من حذف الراعي {selectedSponsor?.name}؟ سيتم حذف جميع البيانات المرتبطة به.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-6 flex flex-row items-center justify-start gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>إلغاء</Button>
                            <Button type="submit" variant="destructive" disabled={deleteForm.processing}>
                                {deleteForm.processing && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
                                حذف نهائي
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

SponsorsPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
