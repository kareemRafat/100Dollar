import { Head, useForm } from '@inertiajs/react';
import { Loader2, MoreVertical, Pencil, Trash2, UserPlus } from 'lucide-react';
import React, { useState } from 'react';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { BreadcrumbItem, User } from '@/types';
import admin from '@/routes/admin';

interface UsersProps {
    users: {
        data: User[];
        links: any[];
        current_page: number;
        last_page: number;
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

export default function UsersPage({ users }: UsersProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(admin.users.store().url, {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
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

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        editForm.patch(admin.users.update(selectedUser.id).url, {
            onSuccess: () => {
                setIsEditModalOpen(false);
                editForm.reset();
            },
        });
    };

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        deleteForm.delete(admin.users.destroy(selectedUser.id).url, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
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
                        <p className="text-muted-foreground text-sm">إدارة مستخدمي النظام وصلاحياتهم</p>
                    </div>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        <UserPlus className="ml-2 h-4 w-4" />
                        إضافة مستخدم جديد
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>قائمة المستخدمين</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>الاسم</TableHead>
                                    <TableHead>البريد الإلكتروني</TableHead>
                                    <TableHead>الدور</TableHead>
                                    <TableHead>الحالة</TableHead>
                                    <TableHead className="text-end">الإجراءات</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                                {user.role === 'admin' ? 'مدير' : 'مستخدم'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={user.is_active ? 'success' : 'destructive'} className={user.is_active ? 'bg-green-100 text-green-800' : ''}>
                                                {user.is_active ? 'نشط' : 'معطل'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEditClick(user)}>
                                                        <Pencil className="ml-2 h-4 w-4" />
                                                        تعديل
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleDeleteClick(user)}
                                                        className="text-red-600 focus:text-red-600"
                                                    >
                                                        <Trash2 className="ml-2 h-4 w-4" />
                                                        حذف
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Create Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent>
                    <form onSubmit={handleCreateSubmit}>
                        <DialogHeader>
                            <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                            <DialogDescription>أدخل بيانات المستخدم الجديد هنا.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">الاسم</Label>
                                <Input
                                    id="name"
                                    value={createForm.data.name}
                                    onChange={e => createForm.setData('name', e.target.value)}
                                />
                                {createForm.errors.name && <p className="text-red-500 text-xs">{createForm.errors.name}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">البريد الإلكتروني</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={createForm.data.email}
                                    onChange={e => createForm.setData('email', e.target.value)}
                                />
                                {createForm.errors.email && <p className="text-red-500 text-xs">{createForm.errors.email}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">كلمة المرور</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={createForm.data.password}
                                    onChange={e => createForm.setData('password', e.target.value)}
                                />
                                {createForm.errors.password && <p className="text-red-500 text-xs">{createForm.errors.password}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">الدور</Label>
                                <Select onValueChange={v => createForm.setData('role', v)} defaultValue={createForm.data.role}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر الدور" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">مستخدم</SelectItem>
                                        <SelectItem value="admin">مدير</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse gap-3">
                                <Switch
                                    id="active"
                                    checked={createForm.data.is_active}
                                    onCheckedChange={v => createForm.setData('is_active', v)}
                                />
                                <Label htmlFor="active">حساب نشط</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>إلغاء</Button>
                            <Button type="submit" disabled={createForm.processing}>
                                {createForm.processing && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
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
                            <DialogDescription>تعديل بيانات المستخدم المختار.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">الاسم</Label>
                                <Input
                                    id="edit-name"
                                    value={editForm.data.name}
                                    onChange={e => editForm.setData('name', e.target.value)}
                                />
                                {editForm.errors.name && <p className="text-red-500 text-xs">{editForm.errors.name}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-email">البريد الإلكتروني</Label>
                                <Input
                                    id="edit-email"
                                    type="email"
                                    value={editForm.data.email}
                                    onChange={e => editForm.setData('email', e.target.value)}
                                />
                                {editForm.errors.email && <p className="text-red-500 text-xs">{editForm.errors.email}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-password">كلمة المرور (اتركها فارغة لعدم التغيير)</Label>
                                <Input
                                    id="edit-password"
                                    type="password"
                                    value={editForm.data.password}
                                    onChange={e => editForm.setData('password', e.target.value)}
                                />
                                {editForm.errors.password && <p className="text-red-500 text-xs">{editForm.errors.password}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-role">الدور</Label>
                                <Select onValueChange={v => editForm.setData('role', v)} value={editForm.data.role}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر الدور" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">مستخدم</SelectItem>
                                        <SelectItem value="admin">مدير</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse gap-3">
                                <Switch
                                    id="edit-active"
                                    checked={editForm.data.is_active}
                                    onCheckedChange={v => editForm.setData('is_active', v)}
                                />
                                <Label htmlFor="edit-active">حساب نشط</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>إلغاء</Button>
                            <Button type="submit" disabled={editForm.processing}>
                                {editForm.processing && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                تحديث
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <form onSubmit={handleDeleteSubmit}>
                        <DialogHeader>
                            <DialogTitle>حذف المستخدم</DialogTitle>
                            <DialogDescription>هل أنت متأكد من حذف المستخدم {selectedUser?.name}؟ لا يمكن التراجع عن هذا الإجراء.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>إلغاء</Button>
                            <Button type="submit" variant="destructive" disabled={deleteForm.processing}>
                                {deleteForm.processing && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
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
