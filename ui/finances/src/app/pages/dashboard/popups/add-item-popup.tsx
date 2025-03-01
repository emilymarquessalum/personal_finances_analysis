import { Modal, Input, Select, DatePicker } from 'antd';
import * as React from 'react';
import dayjs from 'dayjs';
import { AccountFinancesContext } from '@/app/providers/account-finances-provider';
import InputBox from '@/core/input-box';
import { v4 as uuidv4 } from 'uuid';
import ItemForm from './components/item-form';

interface AddItemPopupProps {
    state: AddItemState;
    onOk: () => void;
    onCancel: () => void;
}

export interface AddItemState {
    
    isVisible: boolean;
    modalItemType: 'income'|'expense';
}

const AddItemPopup: React.FC<AddItemPopupProps> = ({ state, onOk, onCancel }) => {
    const accountFinances = React.useContext(AccountFinancesContext);
    const [description, setDescription] = React.useState('');
    const [cost, setCost] = React.useState('');
    const [type, setType] = React.useState<'income'|'expense'>('income');
    const [recurrence, setRecurrence] = React.useState<'daily'|'weekly'|'monthly'|'yearly'|'null'|null>(null);
    const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
    const [confirmed, setConfirmed] = React.useState(false);
    const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(null);
    const [categoryId, setCategoryId] = React.useState<string | undefined>(undefined);
    const [subcategoryId, setSubcategoryId] = React.useState<string | undefined>(undefined);
    const resetForm = () => {
        setDescription('');
        setCost('');
        //setType('income');
        setRecurrence(null);
        setDate(null);
        setConfirmed(false);
        setEndDate(null);
    };
    React.useEffect(() => {
        setType(state.modalItemType);
    }, [state]);
    const { isVisible } = state; 
    const handleSubmit = () => {
        accountFinances?.addItem({
            id: uuidv4(),
            description,
            amount: parseFloat(cost),
            type,
            date: date?.toDate() || dayjs(accountFinances?.currentDate).toDate(),
            regularity: recurrence === 'null' ? null : recurrence,
            confirmed: confirmed,
            endDate: endDate?.toDate(),
            categoryId: categoryId,
            subcategoryId: subcategoryId
        });
        resetForm();
        onOk();
    };

    // Reset form when popup is opened
    React.useEffect(() => {
        if (isVisible) {
            resetForm();
        }
    }, [isVisible]);

    return (
        <Modal
            title="Create Account Item"
            open={isVisible}
            onOk={handleSubmit}
            onCancel={onCancel}
        >
            <ItemForm
                description={description}
                setDescription={setDescription}
                cost={cost}
                setCost={setCost}
                type={type}
                setType={setType}
                recurrence={recurrence}
                setRecurrence={setRecurrence}
                date={date}
                setDate={setDate}
                currentDate={accountFinances?.currentDate || new Date()}
                confirmed={confirmed}
                setConfirmed={setConfirmed}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                setSubcategoryId={setSubcategoryId}
                subcategoryId={subcategoryId}
            />
        </Modal>
    );
};

export default AddItemPopup;