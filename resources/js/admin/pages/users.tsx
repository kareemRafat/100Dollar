import { Head, router, useForm } from '@inertiajs/react';
import { Loader2, Pencil, Search, Trash2, UserPlus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import type { SubmitEvent } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
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
import type { BreadcrumbItem, User } from '@/types';

interface UsersProps {
    users: {
        data: User[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
        role?: string;
        status?: string;
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

export default function UsersPage({ users, filters }: UsersProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [status, setStatus] = useState(filters.status || '');

    useEffect(() => {
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

            router.get(admin.users.index().url, params, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, role, status]);

    const resetFilters = () => {
        setSearch('');
        setRole('');
        setStatus('');
        router.get(admin.users.index().url);
    };

    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user' as 'admin' | 'user',
        phone: '',
        is_active: true,
    });

    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user' as 'admin' | 'user',
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
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">المستخدمين</h1>
                        <p className="text-sm text-muted-foreground">
                            إدارة مستخدمي النظام وصلاحياتهم
                        </p>
                    </div>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        <UserPlus className="ml-2 h-4 w-4" />
                        إضافة مستخدم جديد
                    </Button>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle>قائمة المستخدمين</CardTitle>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute top-2.5 right-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="بحث..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-64 pr-9"
                                />
                            </div>
                            <Select
                                value={role || 'all'}
                                onValueChange={(v) =>
                                    setRole(v === 'all' ? '' : v)
                                }
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="الدور" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">الكل</SelectItem>
                                    <SelectItem value="admin">مدير</SelectItem>
                                    <SelectItem value="user">مستخدم</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={status || 'all'}
                                onValueChange={(v) =>
                                    setStatus(v === 'all' ? '' : v)
                                }
                            >
                                <SelectTrigger className="w-32">
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
                            <Button variant="outline" onClick={resetFilters}>
                                إعادة تعيين
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>الاسم</TableHead>
                                    <TableHead>البريد الإلكتروني</TableHead>
                                    <TableHead>الدور</TableHead>
                                    <TableHead>الحالة</TableHead>
                                    <TableHead className="text-end">
                                        الإجراءات
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {user.name}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
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
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleEditClick(user)
                                                    }
                                                    className="h-8 w-8 text-primary hover:bg-primary/10"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleDeleteClick(user)
                                                    }
                                                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination links={users.links} />
                    </CardContent>
                </Card>
            </div>

            {/* Create Modal */}
            <Dialog
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
            >
                <DialogContent>
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
                            <div className="grid gap-2">
                                <Label htmlFor="role">الدور</Label>
                                <Select
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
                            <div className="flex items-center gap-3 space-x-2 space-x-reverse">
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
                                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                )}
                                حفظ
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
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
                            <div className="grid gap-2">
                                <Label htmlFor="edit-role">الدور</Label>
                                <Select
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
                            <div className="flex items-center gap-3 space-x-2 space-x-reverse">
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
                                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
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
                <DialogContent className="p-6">
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
                                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
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
