import { Head, Link, router, useForm } from '@inertiajs/react';
import { Eye, Loader2, Pencil, Search, Trash2, UserPlus, User as UserIcon } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
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
import { Pagination } from '@/components/ui/pagination';
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
import type { BreadcrumbItem, Country, Paginated, User } from '@/types';

interface UsersProps {
    users: Paginated<User>;
    countries: Country[];
    filters: {
        search?: string;
        role?: string;
        status?: string;
        country_id?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: admin.dashboard().url,
    },
    {
        title: 'المستخدمين',
        href: admin.users.index().url,
    },
];

export default function UsersPage({ users, countries, filters }: UsersProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [status, setStatus] = useState(filters.status || '');
    const [countryId, setCountryId] = useState(filters.country_id || '');

    const isFirstRender = useRef(true);
    const skipNextEffect = useRef(false);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            
            return;
        }

        if (skipNextEffect.current) {
            skipNextEffect.current = false;

            return;
        }

        const timeout = setTimeout(() => {
            const params: any = {};

            if (search) {
                params.search = search;
            }

            if (role) {
                params.role = role;
            }

            if (status) {
                params.status = status;
            }

            if (countryId) {
                params.country_id = countryId;
            }

            router.get(admin.users.index().url, params, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, role, status, countryId]);

    const resetFilters = () => {
        skipNextEffect.current = true;
        setSearch('');
        setRole('');
        setStatus('');
        setCountryId('');
        router.get(admin.users.index().url, {}, {
            replace: true,
        });
    };

    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user' as 'admin' | 'user',
        country_id: '' as string | number,
        phone: '',
        is_active: true,
    });

    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user' as 'admin' | 'user',
        country_id: '' as string | number,
        phone: '',
        is_active: true,
    });

    const deleteForm = useForm({});

    const handleCreateSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        createForm.post(admin.users.store().url, {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
                toast.success('تم إنشاء المستخدم بنجاح');
            },
        });
    };

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role as 'admin' | 'user',
            country_id: user.country_id || '',
            phone: user.phone || '',
            is_active: user.is_active,
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedUser) {
            return;
        }

        editForm.patch(admin.users.update(selectedUser.id).url, {
            onSuccess: () => {
                setIsEditModalOpen(false);
                editForm.reset();
                toast.success('تم تحديث المستخدم بنجاح');
            },
        });
    };

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedUser) {
            return;
        }

        deleteForm.delete(admin.users.destroy(selectedUser.id).url, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                toast.success('تم حذف المستخدم بنجاح');
            },
        });
    };

    return (
        <>
            <Head title="إدارة المستخدمين" />
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">المستخدمين</h1>
                        <p className="text-sm text-muted-foreground">
                            إدارة مستخدمي النظام وصلاحياتهم
                        </p>
                    </div>
                    <Button onClick={() => setIsCreateModalOpen(true)} className="w-full md:w-auto">
                        <UserPlus className="me-2 h-4 w-4" />
                        إضافة مستخدم جديد
                    </Button>
                </div>

                <Card>
                    <CardHeader className="flex flex-col space-y-4 pb-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <CardTitle>قائمة المستخدمين</CardTitle>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative w-full sm:w-64">
                                <div className="pointer-events-none absolute inset-y-0 inset-inline-start-0 flex items-center ps-3">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input
                                    type="search"
                                    placeholder="بحث..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full ps-10"
                                />
                            </div>
                            <div className="flex flex-1 items-center gap-2">
                                <Select
                                    dir="rtl"
                                    value={role || 'all'}
                                    onValueChange={(v) =>
                                        setRole(v === 'all' ? '' : v)
                                    }
                                >
                                    <SelectTrigger className="w-full sm:w-32">
                                        <SelectValue placeholder="الدور" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">الكل</SelectItem>
                                        <SelectItem value="admin">مدير</SelectItem>
                                        <SelectItem value="user">مستخدم</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select
                                    dir="rtl"
                                    value={countryId || 'all'}
                                    onValueChange={(v) =>
                                        setCountryId(v === 'all' ? '' : v)
                                    }
                                >
                                    <SelectTrigger className="w-full sm:w-32">
                                        <SelectValue placeholder="الدولة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">كل الدول</SelectItem>
                                        {countries.map((country) => (
                                            <SelectItem
                                                key={country.id}
                                                value={country.id.toString()}
                                            >
                                                {country.name_ar}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select
                                    dir="rtl"
                                    value={status || 'all'}
                                    onValueChange={(v) =>
                                        setStatus(v === 'all' ? '' : v)
                                    }
                                >
                                    <SelectTrigger className="w-full sm:w-32">
                                        <SelectValue placeholder="الحالة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">الكل</SelectItem>
                                        <SelectItem value="active">نشط</SelectItem>
                                        <SelectItem value="inactive">
                                            معطل
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                variant="link"
                                onClick={resetFilters}
                                className="h-9 px-2 text-muted-foreground hover:text-primary sm:px-4"
                            >
                                إعادة تعيين
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]"></TableHead>
                                        <TableHead className="min-w-[150px]">الاسم</TableHead>
                                        <TableHead className="min-w-[200px]">البريد الإلكتروني</TableHead>
                                        <TableHead className="min-w-[100px]">الدولة</TableHead>
                                        <TableHead className="min-w-[100px]">الدور</TableHead>
                                        <TableHead className="min-w-[100px]">الحالة</TableHead>
                                        <TableHead className="text-end min-w-[120px]">
                                            الإجراءات
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-72 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-4 px-4">
                                                    <div className="rounded-full bg-muted p-4 ring-8 ring-muted/20">
                                                        <Search className="h-10 w-10 text-muted-foreground" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xl font-semibold">لم يتم العثور على نتائج</p>
                                                        <p className="max-w-xs text-sm text-muted-foreground">
                                                            لا يوجد مستخدمين يطابقون معايير البحث الحالية. جرب تغيير الفلاتر أو كلمة البحث.
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        users.data.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage
                                                            src={user.avatar}
                                                            alt={user.name}
                                                        />
                                                        <AvatarFallback>
                                                            <UserIcon className="h-4 w-4" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell className="font-medium whitespace-nowrap">
                                                    {user.name}
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap">{user.email}</TableCell>
                                                <TableCell className="whitespace-nowrap">
                                                    {user.country?.name_ar || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            user.role === 'admin'
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {user.role === 'admin'
                                                            ? 'مدير'
                                                            : 'مستخدم'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            user.is_active
                                                                ? 'default'
                                                                : 'destructive'
                                                        }
                                                        className={
                                                            user.is_active
                                                                ? 'bg-green-100 text-green-800'
                                                                : ''
                                                        }
                                                    >
                                                        {user.is_active
                                                            ? 'نشط'
                                                            : 'معطل'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-end">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={admin.users.show(user.id).url}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                                                            title="عرض التفاصيل"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                handleEditClick(
                                                                    user,
                                                                )
                                                            }
                                                            className="h-8 w-8 text-primary hover:bg-primary/10"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                handleDeleteClick(
                                                                    user,
                                                                )
                                                            }
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
                        <div className="p-4 border-t sm:p-0 sm:border-0 mt-6">
                            <Pagination links={users.meta.links} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Create Modal */}
            <Dialog
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
            >
                <DialogContent dir="rtl">
                    <form onSubmit={handleCreateSubmit}>
                        <DialogHeader>
                            <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                            <DialogDescription>
                                أدخل بيانات المستخدم الجديد هنا.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">الاسم</Label>
                                <Input
                                    id="name"
                                    value={createForm.data.name}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                />
                                {createForm.errors.name && (
                                    <p className="text-xs text-red-500">
                                        {createForm.errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">البريد الإلكتروني</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={createForm.data.email}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'email',
                                            e.target.value,
                                        )
                                    }
                                />
                                {createForm.errors.email && (
                                    <p className="text-xs text-red-500">
                                        {createForm.errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">كلمة المرور</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={createForm.data.password}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'password',
                                            e.target.value,
                                        )
                                    }
                                />
                                {createForm.errors.password && (
                                    <p className="text-xs text-red-500">
                                        {createForm.errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="country">الدولة</Label>
                                    <Select
                                        dir="rtl"
                                        value={createForm.data.country_id?.toString()}
                                        onValueChange={(v) =>
                                            createForm.setData('country_id', v)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="اختر الدولة" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((country) => (
                                                <SelectItem
                                                    key={country.id}
                                                    value={country.id.toString()}
                                                >
                                                    {country.name_ar}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {createForm.errors.country_id && (
                                        <p className="text-xs text-red-500">
                                            {createForm.errors.country_id}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="role">الدور</Label>
                                    <Select
                                        dir="rtl"
                                        value={createForm.data.role}
                                        onValueChange={(v: 'admin' | 'user') =>
                                            createForm.setData('role', v)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="اختر الدور" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">
                                                مستخدم
                                            </SelectItem>
                                            <SelectItem value="admin">
                                                مدير
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Switch
                                    id="active"
                                    checked={createForm.data.is_active}
                                    onCheckedChange={(v) =>
                                        createForm.setData('is_active', v)
                                    }
                                />
                                <Label htmlFor="active">حساب نشط</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsCreateModalOpen(false)}
                            >
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                disabled={createForm.processing}
                            >
                                {createForm.processing && (
                                    <Loader2 className="me-2 h-4 w-4 animate-spin" />
                                )}
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
                            <DialogTitle>تعديل بيانات المستخدم</DialogTitle>
                            <DialogDescription>
                                تعديل بيانات المستخدم المختار.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">الاسم</Label>
                                <Input
                                    id="edit-name"
                                    value={editForm.data.name}
                                    onChange={(e) =>
                                        editForm.setData('name', e.target.value)
                                    }
                                />
                                {editForm.errors.name && (
                                    <p className="text-xs text-red-500">
                                        {editForm.errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-email">
                                    البريد الإلكتروني
                                </Label>
                                <Input
                                    id="edit-email"
                                    type="email"
                                    value={editForm.data.email}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'email',
                                            e.target.value,
                                        )
                                    }
                                />
                                {editForm.errors.email && (
                                    <p className="text-xs text-red-500">
                                        {editForm.errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-password">
                                    كلمة المرور (اتركها فارغة لعدم التغيير)
                                </Label>
                                <Input
                                    id="edit-password"
                                    type="password"
                                    value={editForm.data.password}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'password',
                                            e.target.value,
                                        )
                                    }
                                />
                                {editForm.errors.password && (
                                    <p className="text-xs text-red-500">
                                        {editForm.errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-country">الدولة</Label>
                                    <Select
                                        dir="rtl"
                                        value={editForm.data.country_id?.toString()}
                                        onValueChange={(v) =>
                                            editForm.setData('country_id', v)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="اختر الدولة" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((country) => (
                                                <SelectItem
                                                    key={country.id}
                                                    value={country.id.toString()}
                                                >
                                                    {country.name_ar}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {editForm.errors.country_id && (
                                        <p className="text-xs text-red-500">
                                            {editForm.errors.country_id}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-role">الدور</Label>
                                    <Select
                                        dir="rtl"
                                        value={editForm.data.role}
                                        onValueChange={(v: 'admin' | 'user') =>
                                            editForm.setData('role', v)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="اختر الدور" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">
                                                مستخدم
                                            </SelectItem>
                                            <SelectItem value="admin">
                                                مدير
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Switch
                                    id="edit-active"
                                    checked={editForm.data.is_active}
                                    onCheckedChange={(v) =>
                                        editForm.setData('is_active', v)
                                    }
                                />
                                <Label htmlFor="edit-active">حساب نشط</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                disabled={editForm.processing}
                            >
                                {editForm.processing && (
                                    <Loader2 className="me-2 h-4 w-4 animate-spin" />
                                )}
                                تحديث
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <Dialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            >
                <DialogContent className="p-6" dir="rtl">
                    <form onSubmit={handleDeleteSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-start">
                                حذف المستخدم
                            </DialogTitle>
                            <DialogDescription className="text-start">
                                هل أنت متأكد من حذف المستخدم{' '}
                                {selectedUser?.name}؟ لا يمكن التراجع عن هذا
                                الإجراء.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-6 flex flex-row items-center justify-start gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={deleteForm.processing}
                            >
                                {deleteForm.processing && (
                                    <Loader2 className="me-2 h-4 w-4 animate-spin" />
                                )}
                                حذف نهائي
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

UsersPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
