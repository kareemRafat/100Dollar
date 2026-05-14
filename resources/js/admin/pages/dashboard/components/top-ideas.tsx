import { Link } from '@inertiajs/react';
import { Eye, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import admin from '@/routes/admin';

interface Idea {
    id: number;
    title: string;
    votes_count: number;
    user: { name: string };
    country: { name_ar: string };
}

export function TopIdeas({ ideas }: { ideas: Idea[] }) {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-bold">أفضل 5 أفكار (بالأصوات)</CardTitle>
                <Trophy className="size-5 text-amber-500" />
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">الفكرة</TableHead>
                            <TableHead className="text-right">المشارك</TableHead>
                            <TableHead className="text-center">الأصوات</TableHead>
                            <TableHead className="text-left"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ideas.map((idea) => (
                            <TableRow key={idea.id}>
                                <TableCell className="font-medium">
                                    <div className="flex flex-col">
                                        <span>{idea.title}</span>
                                        <span className="text-xs text-muted-foreground">{idea.country.name_ar}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{idea.user.name}</TableCell>
                                <TableCell className="text-center font-bold text-primary">{idea.votes_count}</TableCell>
                                <TableCell className="text-left">
                                    <Link 
                                        href={admin.ideas.show(idea.id).url}
                                        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    >
                                        <Eye className="size-4" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
