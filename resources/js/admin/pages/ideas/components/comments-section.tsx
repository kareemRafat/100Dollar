import { Clock, Loader2, MessageSquare, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Comment } from '@/types';

interface CommentsSectionProps {
    comments: Comment[] | undefined;
    isLoadingComments: boolean;
    onLoadComments: () => void;
    onDeleteComment: (id: number) => void;
}

export function CommentsSection({
    comments,
    isLoadingComments,
    onLoadComments,
    onDeleteComment,
}: CommentsSectionProps) {
    return (
        <Card className="overflow-hidden py-0 pb-5">
            <CardHeader className="flex flex-row items-center justify-between border-b">
                <CardTitle className="flex items-center gap-2 py-4 text-lg font-bold">
                    <MessageSquare className="size-5 text-primary" />
                    التعليقات
                </CardTitle>
                {!comments && (
                    <Button
                        onClick={onLoadComments}
                        disabled={isLoadingComments}
                        variant="outline"
                        size="sm"
                        className="font-bold"
                    >
                        {isLoadingComments && (
                            <Loader2 className="me-2 size-4 animate-spin" />
                        )}
                        عرض التعليقات
                    </Button>
                )}
            </CardHeader>
            <CardContent className="p-0">
                {comments ? (
                    <div className="divide-y">
                        {comments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <MessageSquare className="mb-4 size-12 text-muted-foreground/30" />
                                <p className="text-lg font-bold">
                                    لا توجد تعليقات
                                </p>
                                <p className="text-sm font-semibold text-muted-foreground">
                                    لم يتم إضافة أي تعليقات على هذه الفكرة بعد.
                                </p>
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="p-6 transition-colors hover:bg-muted/30"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex gap-4">
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                                {comment.user?.name?.[0] || 'U'}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">
                                                        {comment.user?.name}
                                                    </span>
                                                    {comment.deleted_at && (
                                                        <Badge
                                                            variant="destructive"
                                                            className="h-5 px-2 py-0 text-[10px] font-bold"
                                                        >
                                                            تم الإشراف (محذوف)
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                                    <Clock className="size-3" />
                                                    {new Date(
                                                        comment.created_at,
                                                    ).toLocaleDateString(
                                                        'ar-SA',
                                                        {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        },
                                                    )}
                                                </div>
                                                <p
                                                    className={cn(
                                                        'mt-3 text-sm leading-relaxed font-semibold',
                                                        comment.deleted_at
                                                            ? 'text-muted-foreground italic line-through opacity-70'
                                                            : 'text-foreground',
                                                    )}
                                                >
                                                    {comment.body}
                                                </p>
                                            </div>
                                        </div>
                                        {!comment.deleted_at && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                                                onClick={() =>
                                                    onDeleteComment(comment.id)
                                                }
                                                title="حذف التعليق"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <MessageSquare className="mb-4 size-12 text-muted-foreground/20" />
                        <p className="mb-6 font-semibold text-muted-foreground">
                            يتم تحميل التعليقات عند الطلب لتسريع تحميل الصفحة.
                        </p>
                        <Button
                            onClick={onLoadComments}
                            disabled={isLoadingComments}
                            className="px-8 font-bold"
                        >
                            {isLoadingComments ? (
                                <>
                                    <Loader2 className="me-2 size-4 animate-spin" />{' '}
                                    جاري التحميل...
                                </>
                            ) : (
                                'تحميل التعليقات الآن'
                            )}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
