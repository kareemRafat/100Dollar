import { Link } from '@inertiajs/react';
import { Eye, Pencil, Search, Trash2, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import admin from '@/routes/admin';
import type { Paginated, User } from '@/types';

interface UsersTableProps {
    users: Paginated<User>;
    onEditClick: (user: User) => void;
    onDeleteClick: (user: User) => void;
}

export default function UsersTable({ users, onEditClick, onDeleteClick }: UsersTableProps) {
    return (
        <>
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
                            <TableHead className="min-w-[120px] text-end">الإجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-72 text-center"
                                >
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
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>
                                                <UserIcon className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium whitespace-nowrap">{user.name}</TableCell>
                                    <TableCell className="whitespace-nowrap">{user.email}</TableCell>
                                    <TableCell className="whitespace-nowrap">{user.country?.name_ar || '-'}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                            {user.role === 'admin' ? 'مدير' : 'مستخدم'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.is_active ? 'default' : 'destructive'}
                                            className={user.is_active ? 'bg-green-100 text-green-800' : ''}
                                        >
                                            {user.is_active ? 'نشط' : 'معطل'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-end">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={admin.users.show(user.id).url}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                                                title="عرض التفاصيل"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onEditClick(user)}
                                                className="h-8 w-8 text-primary hover:bg-primary/10"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onDeleteClick(user)}
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
            <div className="mt-6 border-t p-4 sm:border-0 sm:p-0">
                <Pagination links={users.meta.links} />
            </div>
        </>
    );
}
