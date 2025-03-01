import { Input, Select, DatePicker, Checkbox } from 'antd';
import * as React from 'react';
import dayjs from 'dayjs';
import InputBox from '@/core/input-box';
import { AccountItem } from '@/app/data/model/account-item';
// Add to imports
import { useBudgetCategories } from '@/app/providers/budget-categories-provider';

interface ItemFormProps {
    description: string;
    setDescription: (value: string) => void;
    cost: string;
    setCost: (value: string) => void;
    type: 'income' | 'expense';
    setType: (value: 'income' | 'expense') => void;
    recurrence: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'null' | null;
    setRecurrence: (value: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'null' | null) => void;
    date: dayjs.Dayjs | null;
    setDate: (value: dayjs.Dayjs | null) => void;
    currentDate: Date;
    showEditAllMonths?: boolean;
    editAllMonths?: boolean;
    setEditAllMonths?: (value: boolean) => void;
    confirmed: boolean;
    setConfirmed: (value: boolean) => void;
    categoryId: string | undefined;
    setCategoryId: (value: string | undefined) => void;
    setSubcategoryId?: (value: string | undefined) => void;
    subcategoryId?: string | undefined;
}

const ItemForm: React.FC<ItemFormProps> = ({
    description,
    setDescription,
    cost,
    setCost,
    type,
    setType,
    recurrence,
    setRecurrence,
    date,
    setDate,
    currentDate,
    showEditAllMonths,
    editAllMonths,
    setEditAllMonths,
    confirmed,
    setConfirmed,
    categoryId,
    setCategoryId,
    setSubcategoryId,
    subcategoryId
}) => {
    const { categories, getSubcategories } = useBudgetCategories();
    const subcategories = categoryId ? getSubcategories(categoryId) : [];

    return (
        <>
            <InputBox child={
                <Input
                    style={{ width: '100%', height: '50px' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                />
            } />

            <InputBox
                icon={<span
                    style={{
                        backgroundColor: type == 'income' ? 'green' : 'red',
                        paddingLeft: '0.5rem',
                        paddingRight: '0.5rem',
                        borderTopLeftRadius: '0.25rem',
                        borderBottomLeftRadius: '0.25rem',
                        paddingTop: '0.25rem',
                        paddingBottom: '0.25rem',
                        color: 'white'
                    }}
                >$</span>} 
                child={
                    <Input
                        style={{ width: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        placeholder="Enter cost"
                    />
                }
            />

            <InputBox child={
                <Select
                    value={type}
                    onChange={setType}
                >
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expense">Expense</Select.Option>
                </Select>
            } />

            <InputBox
                label="Category"
                child={
                    <Select
                        value={categoryId}
                        onChange={(value) => {
                            setCategoryId(value);
                            // Clear subcategory when main category changes
                            if (setSubcategoryId) {
                                setSubcategoryId(undefined);
                            }
                        }}
                        allowClear
                        placeholder="Select a category"
                    >
                        {categories.filter(cat => !cat.parentId).map(category => (
                            <Select.Option key={category.id} value={category.id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                }
            />

            {categoryId && subcategories.length > 0 && (
                <InputBox
                    label="Subcategory"
                    child={
                        <Select
                            value={subcategoryId}
                            onChange={setSubcategoryId}
                            allowClear
                            placeholder="Select a subcategory"
                        >
                            {subcategories.map(subcategory => (
                                <Select.Option key={subcategory.id} value={subcategory.id}>
                                    {subcategory.name}
                                </Select.Option>
                            ))}
                        </Select>
                    }
                />
            )}

            <InputBox
                label="Recurrence"
                child={
                    <Select
                        size='large'
                        value={recurrence ?? 'null'}
                        onChange={setRecurrence}
                    >
                        <Select.Option value={`null`}>None</Select.Option>
                        <Select.Option value="monthly">Monthly</Select.Option>
                    </Select>
                }
            />

            <InputBox child={
                <DatePicker
                    value={date || dayjs(currentDate)}
                    onChange={(date) => setDate(date || dayjs())}
                />
            } />
            <InputBox child={
                <Checkbox
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                >
                    Mark as paid
                </Checkbox>
            } />
            {showEditAllMonths && setEditAllMonths && (
                <InputBox child={
                    <Checkbox
                        checked={editAllMonths}
                        onChange={(e) => setEditAllMonths(e.target.checked)}
                    >
                        Apply changes to all future months
                    </Checkbox>
                } />
            )}
        </>
    );
};

export default ItemForm;