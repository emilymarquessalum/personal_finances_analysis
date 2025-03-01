'use client';

import { Typography, Tabs } from 'antd'; 
import CategoryList from './components/category-list';
import BudgetList from './components/budget-list';
import { NavBody } from '@/app/layout/nav/nav-body';
import { useBudgetCategories } from '@/app/providers/budget-categories-provider';

const { TabPane } = Tabs;

export default function BudgetAndCategoriesPage() {
    const { categories, budgets } = useBudgetCategories();

    return (
        <NavBody children={
            <div className="p-8">
                <div className="mb-8">
                    <Typography.Title level={2}>Budgets & Categories</Typography.Title>
                    <Typography.Text className="text-gray-600">
                        Manage your budgets and expense categories
                    </Typography.Text>
                </div>

                <Tabs defaultActiveKey="categories">
                    <TabPane tab={`Categories (${categories.length})`} key="categories">
                        <CategoryList />
                    </TabPane>
                    <TabPane tab={`Budgets (${budgets.length})`} key="budgets">
                        <BudgetList />
                    </TabPane>
                </Tabs>
            </div>
        } />
    );
}