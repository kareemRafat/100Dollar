import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CountryData {
    country: string;
    count: number;
}

const COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
];

export function CountryDistribution({ data }: { data: CountryData[] }) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-bold">
                    توزيع الأفكار حسب الدولة
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[250px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                        minWidth={0}
                        minHeight={0}
                    >
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="count"
                                nameKey="country"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-sidebar)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                    {data.slice(0, 5).map((item, index) => (
                        <div
                            key={item.country}
                            className="flex items-center justify-between text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className="size-3 rounded-full"
                                    style={{
                                        backgroundColor:
                                            COLORS[index % COLORS.length],
                                    }}
                                />
                                <span className="text-muted-foreground">
                                    {item.country}
                                </span>
                            </div>
                            <span className="font-bold">{item.count}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
