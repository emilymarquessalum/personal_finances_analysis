import React from "react";
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader } from "@mui/material";
import { AccountItem } from "@/app/data/model/account-item";
import { useBudgetCategories } from "@/app/providers/budget-categories-provider";

interface CategoryDistributionChartProps {
    items: AccountItem[];
}

export default function CategoryDistributionChart(
    { items }: CategoryDistributionChartProps
): React.ReactElement {
    const { categories } = useBudgetCategories();
    
    // Calculate totals per category
    const categoryTotals = new Map<string, number>();
    let othersTotal = 0;

    items.forEach(item => {
        if (item.type === 'expense') {
            if (item.categoryId) {
                const currentTotal = categoryTotals.get(item.categoryId) || 0;
                categoryTotals.set(item.categoryId, currentTotal + item.amount);
            } else {
                othersTotal += item.amount;
            }
        }
    });

    // Prepare data for chart
    const data = [...categoryTotals.entries()].map(([categoryId, total]) => ({
        name: categories.find(c => c.id === categoryId)?.name || 'Unknown',
        value: total
    }));

    // Add "Others" category if there are uncategorized items
    if (othersTotal > 0) {
        data.push({ name: "Others", value: othersTotal });
    }

    const chartSize = 250;
    const COLORS = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8',
        '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57'
    ];

    return (
        <Card>
            <CardHeader title="Expense Distribution by Category" />
            <CardContent style={{
                paddingBottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <PieChart width={chartSize} height={chartSize}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({
                            cx,
                            cy,
                            midAngle,
                            innerRadius,
                            outerRadius,
                            value,
                            percent
                        }) => {
                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                            const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                            const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                            return (
                                <text
                                    x={x}
                                    y={y}
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    {`${(percent * 100).toFixed(0)}%`}
                                </text>
                            );
                        }}
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} 
                            />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value: number) => `$${value.toFixed(2)}`}
                    />
                    <Legend />
                </PieChart>
            </CardContent>
        </Card>
    );
}