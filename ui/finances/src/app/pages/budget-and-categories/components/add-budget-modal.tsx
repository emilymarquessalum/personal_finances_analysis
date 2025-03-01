'use client';

import { Modal, Input, Form, InputNumber } from 'antd';
import { Budget } from '@/app/data/model/budget';
import { v4 as uuidv4 } from 'uuid'; 

interface AddBudgetModalProps {
    visible: boolean;
    onCancel: () => void;
    onAdd: (budget: Budget) => void;
}

export default function AddBudgetModal({ visible, onCancel, onAdd }: AddBudgetModalProps) {
    const [form] = Form.useForm();


    const handleSubmit = () => {
        form.validateFields().then(values => {
            const newBudget: Budget = {
                id: uuidv4(),
                maxValue: values.maxValue,
                desiredFutureValue: values.desiredFutureValue,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            onAdd(newBudget);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Add New Budget"
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">

                <Form.Item
                    name="maxValue"
                    label="Maximum Value"
                    rules={[{ required: true, message: 'Please enter a maximum value' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                        placeholder="Enter maximum value"
                    />
                </Form.Item>

                <Form.Item
                    name="desiredFutureValue"
                    label="Target Value"
                    rules={[{ required: true, message: 'Please enter a target value' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                        placeholder="Enter target value"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}