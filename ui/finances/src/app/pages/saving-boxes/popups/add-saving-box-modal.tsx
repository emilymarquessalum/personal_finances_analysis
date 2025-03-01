'use client';

import { Modal, Form, Input } from 'antd';
import { SavingBox } from '@/app/data/model/saving-box';
import { v4 as uuidv4 } from 'uuid';

interface AddSavingBoxModalProps {
    visible: boolean;
    onCancel: () => void;
    onAdd: (box: SavingBox) => void;
}

export default function AddSavingBoxModal({ visible, onCancel, onAdd }: AddSavingBoxModalProps) {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then(values => {
            const newBox: SavingBox = {
                id: uuidv4(),
                name: values.name,
                currentValue: 0,
                expenseIds: [],
                createdAt: new Date(),
                updatedAt: new Date()
            };
            onAdd(newBox);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Create New Saving Box"
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Box Name"
                    rules={[{ required: true, message: 'Please enter a name for your saving box' }]}
                >
                    <Input placeholder="Enter box name" />
                </Form.Item>
            </Form>
        </Modal>
    );
}