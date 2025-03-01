'use client';

import { Button, Card, List, Typography } from 'antd';
import { Plus, Edit2 } from 'react-feather';
import { useState } from 'react';
import { Category } from '@/app/data/model/category';
import AddCategoryModal from '../popups/add-category-modal';
import EditCategoryModal from '../popups/edit-category-modal';
import { useBudgetCategories } from '@/app/providers/budget-categories-provider';
import CategoryCard from './category-card';

export default function CategoryList() {
    const { categories, addCategory, updateCategory, budgets, 

        deleteCategory
     } = useBudgetCategories();
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsEditModalVisible(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Typography.Title level={4}>Categories</Typography.Title>
                <Button 
                    type="primary"
                    icon={<Plus className="w-4 h-4" />}
                    onClick={() => setIsAddModalVisible(true)}
                >
                    Add Category
                </Button>
            </div>

            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={categories}
                renderItem={(category) => (
                    <CategoryCard 
                        category={category}
                        handleEdit={handleEdit} 
                        handleDelete={(category) => {
                            // TODO: Implement delete logic
                            deleteCategory(category.id);
                        }}
                    />
                )}
            />

            <AddCategoryModal
                visible={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                onAdd={(category) => {
                    addCategory(category);
                    setIsAddModalVisible(false);
                }}
                availableBudgets={budgets}
            />

            <EditCategoryModal
                visible={isEditModalVisible}
                onCancel={() => {
                    setIsEditModalVisible(false);
                    setSelectedCategory(null);
                }}
                onSave={(category) => {
                    updateCategory(category);
                    setIsEditModalVisible(false);
                    setSelectedCategory(null); 
                }}
                category={selectedCategory}
                availableBudgets={budgets}
            />
        </div>
    );
}