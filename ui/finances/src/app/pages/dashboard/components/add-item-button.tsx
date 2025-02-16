import { useState } from 'react';
import { Button, Modal, Input, Select, DatePicker } from 'antd';
import { Plus } from 'react-feather'; 
import * as React from 'react';
import dayjs from 'dayjs';
import { AccountFinancesContext } from '@/app/providers/account-finances-provider';

const AddItemButton = () => {
  const accountFinances = React.useContext(AccountFinancesContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [type, setType] = useState<'income'|'expense'>('income'); // Default to 'income'
  const [recurrence, setRecurrence] = useState<'daily'|'weekly'|'monthly'|'yearly'|null>(null);  
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  const handleAddClick = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log({ description, cost, type, date: date?.toDate() });

    accountFinances?.addItem(
        {
            description,
            amount: parseFloat(cost),
            type,
            date: date?.toDate() || dayjs(accountFinances?.currentDate).toDate(),
            regularity: recurrence
        }
    );
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={handleAddClick}>
        <Plus className="mr-2" /> Add Item
      </Button>
      
      <Modal
        title="Create Account Item"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <label>Description:</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>
        <div>
          <label>Cost:</label>
          <Input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Enter cost"
          />
        </div>
        <div>
          <label>Type:</label>
          <Select
            value={type}
            onChange={setType} 
          >
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>
        <div>
          <label>Recurrence:</label>
          <Select
            value={recurrence}
            onChange={setRecurrence} 
          >
            <Select.Option value={`null`}>None</Select.Option>
            <Select.Option value="monthly">Monthly</Select.Option>
          </Select>
        </div>
        <div>
          <label>Date:</label>
          <DatePicker 
            value={dayjs(accountFinances?.currentDate) || date} 
            onChange={(date) => setDate(date || dayjs())} 
          />
        </div>
      </Modal>
    </>
  );
};

export default AddItemButton;
