import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    ChevronRight,
    FileText,
    Mail,
    MapPin,
    Phone,
    ThumbsUp,
    User as UserIcon,
} from 'lucide-react';
import React from 'react';
import AdminLayout from '@/admin/layouts/admin-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import admin from '@/routes/admin';
import type { BreadcrumbItem, Country, Idea, User } from '@/types';

interface UserWithRelations extends User {
    country?: Country;
    ideas: Idea[];
    votes: {
        id: number;
        idea: Idea;
        created_at: string;
    }[];
}

interface ShowProps {
    user: UserWithRelations;
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
    {
        title: 'تفاصيل المستخدم',
        href: '#',
    },
];

export default function UserShowPage({ user }: ShowProps) {
    return (
        <>
            <Head title={`تفاصيل المستخدم - ${user.name}`} />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex items-center gap-4">
                    <Link
                        href={admin.users.index().url}
                        className="rounded-full p-2 transition-colors hover:bg-muted"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-sm text-muted-foreground">
                            عرض ملف المستخدم ونشاطه في المنصة
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Profile Card */}
                    <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-col items-center pb-2">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
                                <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                />
                                <AvatarFallback>
                                    <UserIcon className="h-12 w-12" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="mt-4 text-center">
                                <CardTitle className="text-xl">
                                    {user.name}
                                </CardTitle>
                                <div className="mt-2 flex items-center justify-center gap-2">
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
                                        {user.is_active ? 'نشط' : 'معطل'}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Separator />
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        البريد:
                                    </span>
                                    <span className="font-medium">
                                        {user.email}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        الهاتف:
                                    </span>
                                    <span className="font-medium">
                                        {user.phone || 'غير متوفر'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        الدولة:
                                    </span>
                                    <span className="font-medium">
                                        {user.country?.name_ar || 'غير محدد'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        تاريخ التسجيل:
                                    </span>
                                    <span className="font-bold">
                                        {
                                            new Date(user.created_at)
                                                .toISOString()
                                                .split('T')[0]
                                        }
                                    </span>
                                </div>
                            </div>

                            {Boolean(user.bio) && (
                                <>
                                    <Separator />
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold">
                                            السيرة الذاتية
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {user.bio as string}
                                        </p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Stats and Activity */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-full bg-primary/10 p-3">
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            الأفكار
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {user.ideas.length}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="rounded-full bg-orange-100 p-3">
                                        <ThumbsUp className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            التصويتات
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {user.votes.length}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Ideas Table */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    الأفكار المقدمة
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>الفكرة</TableHead>
                                            <TableHead>الفئة</TableHead>
                                            <TableHead>الحالة</TableHead>
                                            <TableHead>التاريخ</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {user.ideas.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    className="h-32 text-center text-muted-foreground"
                                                >
                                                    لم يقم المستخدم بتقديم أي
                                                    أفكار بعد.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            user.ideas.map((idea) => (
                                                <TableRow key={idea.id}>
                                                    <TableCell className="font-medium">
                                                        {idea.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        {typeof idea.category ===
                                                        'object'
                                                            ? idea.category
                                                                  .name_ar
                                                            : idea.category}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                idea.status ===
                                                                'approved'
                                                                    ? 'default'
                                                                    : idea.status ===
                                                                        'rejected'
                                                                      ? 'destructive'
                                                                      : 'secondary'
                                                            }
                                                        >
                                                            {idea.status ===
                                                            'approved'
                                                                ? 'مقبول'
                                                                : idea.status ===
                                                                    'rejected'
                                                                  ? 'مرفوض'
                                                                  : 'قيد الانتظار'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="font-bold">
                                                        {
                                                            new Date(
                                                                idea.created_at,
                                                            )
                                                                .toISOString()
                                                                .split('T')[0]
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Votes History */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    سجل التصويت
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>الفكرة</TableHead>
                                            <TableHead>صاحب الفكرة</TableHead>
                                            <TableHead>التاريخ</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {user.votes.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="h-32 text-center text-muted-foreground"
                                                >
                                                    لم يقم المستخدم بالتصويت على
                                                    أي فكرة بعد.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            user.votes.map((vote) => (
                                                <TableRow key={vote.id}>
                                                    <TableCell className="font-medium">
                                                        {vote.idea.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        {vote.idea.user?.name ||
                                                            'غير معروف'}
                                                    </TableCell>
                                                    <TableCell className="font-bold">
                                                        {
                                                            new Date(
                                                                vote.created_at,
                                                            )
                                                                .toISOString()
                                                                .split('T')[0]
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

UserShowPage.layout = (page: React.ReactNode) => (
    <AdminLayout breadcrumbs={breadcrumbs}>{page}</AdminLayout>
);
