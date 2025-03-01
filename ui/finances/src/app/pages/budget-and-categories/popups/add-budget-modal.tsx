import { Modal, Form } from 'antd';
import { Budget } from '@/app/data/model/budget';
import { v4 as uuidv4 } from 'uuid';
import BudgetRelatedFields from './budget-related-fields';

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
            title="Add Budget to Category"
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <BudgetRelatedFields />
            </Form>
        </Modal>
    );
}