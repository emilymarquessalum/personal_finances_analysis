import { Modal } from 'antd';
import * as React from 'react';
import dayjs from 'dayjs';
import { AccountFinancesContext } from '@/app/providers/account-finances-provider';
import { AccountItem } from '@/app/data/model/account-item';
import ItemForm from './components/item-form';

interface EditItemPopupProps {
    isVisible: boolean;
    onOk: () => void;
    onCancel: () => void;
    item: AccountItem | null;
}

const EditItemPopup: React.FC<EditItemPopupProps> = ({ isVisible, onOk, onCancel, item }) => {
    const accountFinances = React.useContext(AccountFinancesContext);
    const [description, setDescription] = React.useState('');
    const [cost, setCost] = React.useState('');
    const [type, setType] = React.useState<'income'|'expense'>('income');
    const [recurrence, setRecurrence] = React.useState<'daily'|'weekly'|'monthly'|'yearly'|'null'|null>(null);
    const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
    const [editAllMonths, setEditAllMonths] = React.useState(false);
    const [confirmed, setConfirmed] = React.useState(false);

    const [categoryId, setCategoryId] = React.useState<string | undefined>(undefined);

    const [subcategoryId, setSubcategoryId] = React.useState<string | undefined>(undefined);
    React.useEffect(() => {
        if (item) {
            setDescription(item.description);
            setCost(item.amount.toString());
            setType(item.type);
            setRecurrence(item.regularity);
            setDate(dayjs(item.date));
            setConfirmed(item.confirmed);
        }
    }, [item]); 

    const handleSubmit = () => {
        if (!item) return;

        const updatedItem: AccountItem = {
            ...item,
            description,
            amount: parseFloat(cost),
            type,
            date: date?.toDate() || dayjs(accountFinances?.currentDate).toDate(),
            regularity: recurrence === 'null' ? null : recurrence,
            confirmed: confirmed,
            categoryId: categoryId,
            subcategoryId: subcategoryId
        };

        accountFinances?.editItem(item, updatedItem, editAllMonths);
        onOk();
    };

    return (
        <Modal
            title="Edit Account Item"
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
                showEditAllMonths={item?.regularity === 'monthly'}
                editAllMonths={editAllMonths}
                setEditAllMonths={setEditAllMonths}
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

export default EditItemPopup;