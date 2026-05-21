import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Bar,
    BarChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrendItem {
    day?: string;
    week?: string;
    count: number;
}

interface Trends {
    ideas: TrendItem[];
    votes: TrendItem[];
    users: TrendItem[];
}

export function TrendsCharts({ trends }: { trends: Trends }) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-bold">
                        نشاط الأفكار (آخر 30 يوم)
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                        minWidth={0}
                        minHeight={0}
                    >
                        <AreaChart
                            data={trends.ideas}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id="colorIdeas"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-primary)"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-primary)"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="var(--color-border)"
                            />
                            <XAxis
                                dataKey="day"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (typeof value !== 'string') {
                                        return '';
                                    }

                                    const parts = value.split('-');

                                    return parts.length >= 2
                                        ? parts.slice(1).join('/')
                                        : value;
                                }}
                            />
                            <YAxis
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-sidebar)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                }}
                                labelStyle={{
                                    fontWeight: 'bold',
                                    marginBottom: '4px',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="var(--color-primary)"
                                fillOpacity={1}
                                fill="url(#colorIdeas)"
                                strokeWidth={2}
                                name="عدد الأفكار"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-bold">
                        نشاط التصويت (آخر 30 يوم)
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                        minWidth={0}
                        minHeight={0}
                    >
                        <AreaChart
                            data={trends.votes}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id="colorVotes"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-chart-2)"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-chart-2)"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="var(--color-border)"
                            />
                            <XAxis
                                dataKey="day"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (typeof value !== 'string') {
                                        return '';
                                    }

                                    const parts = value.split('-');

                                    return parts.length >= 2
                                        ? parts.slice(1).join('/')
                                        : value;
                                }}
                            />
                            <YAxis
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-sidebar)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                }}
                                labelStyle={{
                                    fontWeight: 'bold',
                                    marginBottom: '4px',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="var(--color-chart-2)"
                                fillOpacity={1}
                                fill="url(#colorVotes)"
                                strokeWidth={2}
                                name="عدد الأصوات"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="text-base font-bold">
                        نمو المستخدمين (آخر 12 أسبوع)
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                        minWidth={0}
                        minHeight={0}
                    >
                        <BarChart
                            data={trends.users}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="var(--color-border)"
                            />
                            <XAxis
                                dataKey="week"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (value === null || value === undefined) {
                                        return '';
                                    }

                                    const str = value.toString();

                                    return `أسبوع ${str.slice(-2)}`;
                                }}
                            />
                            <YAxis
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                cursor={{
                                    fill: 'var(--color-sidebar-accent)',
                                    opacity: 0.4,
                                }}
                                contentStyle={{
                                    backgroundColor: 'var(--color-sidebar)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                }}
                                labelStyle={{
                                    fontWeight: 'bold',
                                    marginBottom: '4px',
                                }}
                            />
                            <Bar
                                dataKey="count"
                                fill="var(--color-chart-3)"
                                radius={[4, 4, 0, 0]}
                                name="مستخدمين جدد"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
