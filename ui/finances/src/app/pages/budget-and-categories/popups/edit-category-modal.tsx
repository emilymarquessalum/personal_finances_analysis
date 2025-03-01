'use client';

import { Modal, Input, Select, Form, Checkbox, InputNumber } from 'antd';
import { useEffect } from 'react';
import { Category } from '@/app/data/model/category';
import { Budget } from '@/app/data/model/budget';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import BudgetRelatedFields from './budget-related-fields';

interface EditCategoryModalProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (category: Category) => void;
    category: Category | null;
    availableBudgets?: Budget[];
}

export default function EditCategoryModal({ 
    visible, 
    onCancel, 
    onSave, 
    category,
    availableBudgets = [] 
}: EditCategoryModalProps) {
    const [form] = Form.useForm();
    const [showBudgetFields, setShowBudgetFields] = useState(false);

    useEffect(() => {
        if (category && visible) {
            form.setFieldsValue({
                name: category.name,
                description: category.description,
                hasBudget: !!category.budget,
                maxValue: category.budget?.maxValue,
                desiredFutureValue: category.budget?.desiredFutureValue
            });
            setShowBudgetFields(!!category.budget);
        }
    }, [category, visible, form]);

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (!category) return;

            const newBudget = showBudgetFields ? {
                id: category.budget?.id || uuidv4(),
                name: `${values.name}'s Budget`,
                maxValue: values.maxValue,
                desiredFutureValue: values.desiredFutureValue,
                createdAt: category.budget?.createdAt || new Date(),
                updatedAt: new Date()
            } : undefined;

            const updatedCategory: Category = {
                ...category,
                name: values.name,
                description: values.description,
                budget: showBudgetFields ? newBudget : undefined,
                updatedAt: new Date()
            };
            onSave(updatedCategory);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Edit Category"
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Category Name"
                    rules={[{ required: true, message: 'Please enter a category name' }]}
                >
                    <Input placeholder="Enter category name" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea placeholder="Enter category description" />
                </Form.Item>

                <BudgetRelatedFields/>
            </Form>
        </Modal>
    );
}