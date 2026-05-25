import { useLang } from '@erag/lang-sync-inertia/react';
import { Briefcase, Calendar, Clock, Eye, Image as ImageIcon, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Idea } from '@/types';

interface IdeaSidebarProps {
    idea: Idea;
}

export function IdeaSidebar({ idea }: IdeaSidebarProps) {
    const { __ } = useLang();

    return (
        <div className="space-y-6">
            <Card className="py-0 pb-5">
                <CardHeader className="border-b bg-muted/10 py-4">
                    <CardTitle className="text-lg font-bold">
                        معلومات إضافية
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2.5">
                            <User className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="mb-0.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                صاحب الفكرة
                            </p>
                            <p className="font-bold text-foreground">
                                {idea.user?.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2.5">
                            <Briefcase className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="mb-0.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                التصنيف
                            </p>
                            <p className="font-bold text-foreground">
                                {typeof idea.category === 'object'
                                    ? idea.category?.name_ar
                                    : idea.category}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2.5">
                            <MapPin className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="mb-0.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                الموقع
                            </p>
                            <p className="font-bold text-foreground">
                                {idea.city || 'غير محدد'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2.5">
                            <Clock className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="mb-0.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                مدة التنفيذ
                            </p>
                            <p className="font-bold text-foreground">
                                {idea.implementation_time
                                    ? __(
                                          `messages.submit_idea.times.${idea.implementation_time}`,
                                      )
                                    : 'غير محدد'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2.5">
                            <Calendar className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="mb-0.5 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                تاريخ التقديم
                            </p>
                            <p className="font-bold text-foreground">
                                {idea.date}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="overflow-hidden py-0 pb-5">
                <CardHeader className="border-b bg-muted/10 px-6 py-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold">
                        <ImageIcon className="size-5 text-primary" />
                        الصورة المرفقة
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {idea.image ? (
                        <div className="group relative aspect-video overflow-hidden rounded-xl border bg-muted shadow-sm sm:aspect-square">
                            <img
                                src={idea.image}
                                alt={idea.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    asChild
                                    className="font-bold shadow-lg"
                                >
                                    <a
                                        href={idea.image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Eye className="me-2 size-4" />
                                        عرض الصورة كاملة
                                    </a>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-muted bg-muted/5 text-muted-foreground">
                            <div className="flex flex-col items-center gap-2">
                                <div className="rounded-full bg-muted/50 p-3">
                                    <ImageIcon className="size-8 opacity-40" />
                                </div>
                                <span className="text-sm font-bold">
                                    لا توجد صور مرفقة
                                </span>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
