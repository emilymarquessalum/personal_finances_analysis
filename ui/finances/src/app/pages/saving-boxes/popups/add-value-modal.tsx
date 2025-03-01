'use client';

import { Modal, Form, InputNumber, Select, DatePicker, Space, Button } from 'antd';
import { SavingBox } from '@/app/data/model/saving-box';
import { useContext } from 'react';
import { AccountFinancesContext } from '@/app/providers/account-finances-provider';
import { AccountItem } from '@/app/data/model/account-item';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

interface AddValueModalProps {
    visible: boolean;
    onCancel: () => void;
    onAdd: (box: SavingBox) => void;
    savingBox: SavingBox | null;
}

export default function AddValueModal({ visible, onCancel, onAdd, savingBox }: AddValueModalProps) {
    const [form] = Form.useForm();
    const accountFinances = useContext(AccountFinancesContext);

    const handleSubmit = () => {
        if (!savingBox || !accountFinances) return;

        form.validateFields().then(values => {
            const expense: AccountItem = {
                id: uuidv4(),
                amount: values.amount,
                type: 'expense',
                description: `Saving: ${savingBox.name}`,
                date: values.date.toDate(),
                confirmed: false,
                regularity: values.regularity
            };

            accountFinances.addItem(expense);

            const updatedBox: SavingBox = {
                ...savingBox,
                currentValue: savingBox.currentValue + values.amount,
                expenseIds: [...savingBox.expenseIds, expense.id],
                updatedAt: new Date()
            };

            onAdd(updatedBox);
            form.resetFields();
        });
    };

    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');

    const setDate = (date: dayjs.Dayjs) => {
        form.setFieldValue('date', date);
    };

    const isToday = (date: dayjs.Dayjs | null) => {
        return date?.isSame(today, 'day');
    };

    const isYesterday = (date: dayjs.Dayjs | null) => {
        return date?.isSame(yesterday, 'day');
    };

    return (
        <Modal
            title={`Add Value to ${savingBox?.name}`}
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical" initialValues={{ date: today }}>
                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: 'Please enter an amount' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          
                        placeholder="Enter amount to save"
                        min={0}
                    />
                </Form.Item>

                <Form.Item
                    name="date"
                    label="Date"
                    rules={[{ required: true, message: 'Please select a date' }]}
                >
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <DatePicker 
                            style={{ width: '100%' }}
                            onChange={(date) => form.setFieldValue('date', date)}
                        />
                        <Space>
                            <Button 
                                disabled={isToday(form.getFieldValue('date'))}
                                onClick={() => setDate(today)}
                            >
                                Today
                            </Button>
                            <Button 
                                disabled={isYesterday(form.getFieldValue('date'))}
                                onClick={() => setDate(yesterday)}
                            >
                                Yesterday
                            </Button>
                        </Space>
                    </Space>
                </Form.Item>

                <Form.Item
                    name="regularity"
                    label="Regularity"
                    initialValue="once"
                >
                    <Select>
                        <Select.Option value="once">One time</Select.Option>
                        <Select.Option value="monthly">Monthly</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}