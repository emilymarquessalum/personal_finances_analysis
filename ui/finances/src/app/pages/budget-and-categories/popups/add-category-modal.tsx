'use client';

import { Modal, Input, Select, Form, ColorPicker, Button } from 'antd';
import { useState } from 'react';
import { Category } from '@/app/data/model/category';
import { Budget } from '@/app/data/model/budget';
import { v4 as uuidv4 } from 'uuid';
import BudgetRelatedFields from './budget-related-fields'; 
import { useBudgetCategories } from '@/app/providers/budget-categories-provider';
import { DEFAULT_CATEGORY_COLORS, getNextAvailableColor } from '@/app/utils/default-colors';

interface AddCategoryModalProps {
    visible: boolean;
    onCancel: () => void;
    onAdd: (category: Category) => void;
    availableBudgets?: Budget[];
}

export default function AddCategoryModal({ visible, onCancel, onAdd, availableBudgets = [] }: AddCategoryModalProps) {
    const [form] = Form.useForm();
    const { categories } = useBudgetCategories();
    
    // Initialize color as undefined
    const [color, setColor] = useState<string | undefined>(undefined);
    const [parentId, setParentId] = useState<string | undefined>(undefined);
    
    const { getRootCategories, getSubcategories } = useBudgetCategories();

    const handleSubmit = () => {
        form.validateFields().then(values => {

            const budget : Budget | undefined = 
                values.hasBudget && 
                {
                    id: uuidv4(),
                    maxValue: values.maxValue,
                    desiredFutureValue: values.desiredFutureValue,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ;
            // If no color is selected, get the next available default color
            const usedColors = categories
                .map(cat => cat.color?.toLowerCase())
                .filter((color): color is string => !!color);
            
            const finalColor = color || getNextAvailableColor(usedColors);

            const newCategory: Category = {
                id: uuidv4(),
                name: values.name,
                description: values.description,
                createdAt: new Date(),
                updatedAt: new Date(),
                color: finalColor,
                budget: budget,
                parentId: parentId
            };
            onAdd(newCategory);
            form.resetFields();
            setColor(undefined); // Reset color after submission
        });
    };

    return (
        <Modal
            title="Add New Category"
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                {/* ... other form items ... */}

                <Form.Item label="Category Color">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ColorPicker
                            value={color}
                            onChange={(color) => setColor(color.toHex())}
                            presets={[
                                {
                                    label: 'Recommended Colors',
                                    colors: DEFAULT_CATEGORY_COLORS
                                }
                            ]}
                        />
                        {color && (
                            <Button 
                                size="small" 
                                onClick={() => setColor(undefined)}
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                    {!color && (
                        <div style={{ marginTop: '8px', color: '#666' }}>
                            A default color will be assigned
                        </div>
                    )}
                </Form.Item>

                <BudgetRelatedFields/>
            </Form>
        </Modal>
    );
}