import { Head, router, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import type { SubmitEvent } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import type { BreadcrumbItem, Sponsor } from '@/types';
import CreateSponsorDialog from './components/create-sponsor-dialog';
import DeleteSponsorDialog from './components/delete-sponsor-dialog';
import EditSponsorDialog from './components/edit-sponsor-dialog';
import SponsorsTable from './components/sponsors-table';

interface SponsorsProps {
    sponsors: {
        data: Sponsor[];
    };
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

export default function SponsorsPage({ sponsors }: SponsorsProps) {
    const sponsorsData = sponsors.data;
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
    const [createLogoPreview, setCreateLogoPreview] = useState<string | null>(null);
    const [editLogoPreview, setEditLogoPreview] = useState<string | null>(null);

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

    const handleCreateLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            createForm.setData('logo', file);
            setCreateLogoPreview(URL.createObjectURL(file));
        } else {
            createForm.setData('logo', null);
            setCreateLogoPreview(null);
        }
    };

    const handleEditLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            editForm.setData('logo', file);
            setEditLogoPreview(URL.createObjectURL(file));
        } else {
            editForm.setData('logo', null);
            setEditLogoPreview(selectedSponsor?.logo || null);
        }
    };

    const handleCreateSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        createForm.post(admin.sponsors.store().url, {
            forceFormData: true,
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
                setCreateLogoPreview(null);
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
        setEditLogoPreview(sponsor.logo);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedSponsor) {
            return;
        }

        editForm.transform((data) => ({
            ...data,
            _method: 'PATCH',
        }));

        editForm.post(admin.sponsors.update(selectedSponsor.id).url, {
            forceFormData: true,
            onSuccess: () => {
                setIsEditModalOpen(false);
                editForm.reset();
                setEditLogoPreview(null);
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

        if (!selectedSponsor) {
            return;
        }

        deleteForm.delete(admin.sponsors.destroy(selectedSponsor.id).url, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                toast.success('تم حذف الراعي بنجاح');
            },
        });
    };

    const handleToggleStatus = (sponsor: Sponsor) => {
        router.patch(
            admin.sponsors.toggleStatus(sponsor.id).url,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('تم تحديث حالة الراعي');
                },
            },
        );
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
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="w-full md:w-auto"
                    >
                        <Plus className="me-2 h-4 w-4" />
                        إضافة راعي جديد
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>قائمة الرعاة</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        <SponsorsTable
                            sponsors={sponsorsData}
                            onToggleStatus={handleToggleStatus}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                        />
                    </CardContent>
                </Card>
            </div>

            <CreateSponsorDialog
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                form={createForm}
                logoPreview={createLogoPreview}
                onLogoChange={handleCreateLogoChange}
                onSubmit={handleCreateSubmit}
            />

            <EditSponsorDialog
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                form={editForm}
                logoPreview={editLogoPreview}
                onLogoChange={handleEditLogoChange}
                onSubmit={handleEditSubmit}
            />

            <DeleteSponsorDialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                form={deleteForm}
                selectedSponsor={selectedSponsor}
                onSubmit={handleDeleteSubmit}
            />
        </>
    );
}

SponsorsPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
