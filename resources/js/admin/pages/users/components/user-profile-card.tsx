import { Calendar, Mail, MapPin, Phone, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Country, User } from '@/types';

interface UserWithRelations extends User {
    country?: Country;
    bio?: string;
}

interface UserProfileCardProps {
    user: UserWithRelations;
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
    return (
        <Card className="lg:col-span-1">
            <CardHeader className="flex flex-col items-center pb-2">
                <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                        <UserIcon className="h-12 w-12" />
                    </AvatarFallback>
                </Avatar>
                <div className="mt-4 text-center">
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                    <div className="mt-2 flex items-center justify-center gap-2">
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role === 'admin' ? 'مدير' : 'مستخدم'}
                        </Badge>
                        <Badge
                            variant={user.is_active ? 'default' : 'destructive'}
                            className={user.is_active ? 'bg-green-100 text-green-800' : ''}
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
                        <span className="text-muted-foreground">البريد:</span>
                        <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">الهاتف:</span>
                        <span className="font-medium">{user.phone || 'غير متوفر'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">الدولة:</span>
                        <span className="font-medium">
                            {user.country?.name_ar || 'غير محدد'}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">تاريخ التسجيل:</span>
                        <span className="font-bold">
                            {new Date(user.created_at).toISOString().split('T')[0]}
                        </span>
                    </div>
                </div>

                {Boolean(user.bio) && (
                    <>
                        <Separator />
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold">السيرة الذاتية</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {user.bio as string}
                            </p>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
