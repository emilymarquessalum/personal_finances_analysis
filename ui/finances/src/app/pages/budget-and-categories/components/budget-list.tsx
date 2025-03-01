import React from 'react';
import { Button, Card, List, Typography } from 'antd';
import { useBudgetCategories } from '@/app/providers/budget-categories-provider';
import { PlusCircle } from '@phosphor-icons/react';

export default function BudgetList() {
    const { budgets, categories } = useBudgetCategories();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <Typography.Text className="text-lg">
                    Your Budgets
                </Typography.Text>
                <Button type="primary" icon={<PlusCircle />}>
                    Add Budget
                </Button>
            </div>

            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={budgets}
                renderItem={budget => (
                    <List.Item>
                        <Card>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Typography.Title level={5}>
                                        ${budget.maxValue.toFixed(2)}
                                    </Typography.Title>
                                    <Typography.Text type="secondary">
                                        Target: ${budget.desiredFutureValue?.toFixed(2) || 'Not set'}
                                    </Typography.Text>
                                    <div className="mt-2">
                                        <Typography.Text type="secondary">
                                            Used by categories:
                                        </Typography.Text>
                                        <div className="ml-2">
                                            {categories
                                                .filter(cat => cat.budget?.id === budget.id)
                                                .map(cat => (
                                                    <Typography.Text key={cat.id} className="block">
                                                        • {cat.name}
                                                    </Typography.Text>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}