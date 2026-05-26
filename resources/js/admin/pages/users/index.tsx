import { Head, router, useForm } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import type { SubmitEvent } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import type { BreadcrumbItem, Country, Paginated, User } from '@/types';
import CreateUserDialog from './components/create-user-dialog';
import DeleteUserDialog from './components/delete-user-dialog';
import EditUserDialog from './components/edit-user-dialog';
import UserFilters from './components/user-filters';
import UsersTable from './components/users-table';

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
            const params: Record<string, string> = {};

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
        router.get(admin.users.index().url, {}, { replace: true });
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
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="w-full md:w-auto"
                    >
                        <UserPlus className="me-2 h-4 w-4" />
                        إضافة مستخدم جديد
                    </Button>
                </div>

                <Card>
                    <CardHeader className="flex flex-col space-y-4 pb-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <CardTitle>قائمة المستخدمين</CardTitle>
                        <UserFilters
                            search={search}
                            role={role}
                            status={status}
                            countryId={countryId}
                            countries={countries}
                            onSearchChange={setSearch}
                            onRoleChange={setRole}
                            onStatusChange={setStatus}
                            onCountryIdChange={setCountryId}
                            onReset={resetFilters}
                        />
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        <UsersTable
                            users={users}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                        />
                    </CardContent>
                </Card>
            </div>

            <CreateUserDialog
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                form={createForm}
                countries={countries}
                onSubmit={handleCreateSubmit}
            />

            <EditUserDialog
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                form={editForm}
                countries={countries}
                onSubmit={handleEditSubmit}
            />

            <DeleteUserDialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                form={deleteForm}
                selectedUser={selectedUser}
                onSubmit={handleDeleteSubmit}
            />
        </>
    );
}

UsersPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
