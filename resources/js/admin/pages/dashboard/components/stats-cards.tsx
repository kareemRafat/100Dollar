import {
    Lightbulb,
    Users,
    Vote,
    HeartHandshake,
    AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stats {
    ideas_count: number;
    votes_count: number;
    users_count: number;
    sponsors_count: number;
    pending_ideas_count: number;
}

export function StatsCards({ stats }: { stats: Stats }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-sidebar-border/50 bg-sidebar/50 shadow-sm transition-all hover:bg-sidebar">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-muted-foreground">
                        إجمالي الأفكار
                    </CardTitle>
                    <Lightbulb className="size-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.ideas_count}
                    </div>
                    {stats.pending_ideas_count > 0 && (
                        <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-500">
                            <AlertCircle className="size-3" />
                            {stats.pending_ideas_count} في انتظار المراجعة
                        </p>
                    )}
                </CardContent>
            </Card>

            <Card className="border-sidebar-border/50 bg-sidebar/50 shadow-sm transition-all hover:bg-sidebar">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-muted-foreground">
                        إجمالي الأصوات
                    </CardTitle>
                    <Vote className="size-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.votes_count}
                    </div>
                </CardContent>
            </Card>

            <Card className="border-sidebar-border/50 bg-sidebar/50 shadow-sm transition-all hover:bg-sidebar">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-muted-foreground">
                        المستخدمين
                    </CardTitle>
                    <Users className="size-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.users_count}
                    </div>
                </CardContent>
            </Card>

            <Card className="border-sidebar-border/50 bg-sidebar/50 shadow-sm transition-all hover:bg-sidebar">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold text-muted-foreground">
                        الرعاة
                    </CardTitle>
                    <HeartHandshake className="size-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.sponsors_count}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
