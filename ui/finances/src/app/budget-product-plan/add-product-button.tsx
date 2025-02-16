


import { useState } from 'react';
import { Button, Modal, Input, Select, InputNumber } from 'antd';
import { Plus } from 'react-feather';
import * as React from 'react';

const AddProductButton = ({onAdd} : {
    onAdd: (name: string, cost: string, representativePortions: string, quality: number) => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [representativePortions, setRepresentativePortions] = useState('');
  const [quality, setQuality] = useState(1);

  const handleAddClick = () => {
    setIsModalVisible(true);
    setName('');
    setCost('');
    setRepresentativePortions('');
    setQuality(1);

  };

  const handleOk = () => {
    console.log({ name, cost, representativePortions, quality });
    setIsModalVisible(false);
    onAdd(name, cost, representativePortions, quality);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={handleAddClick}>
        <Plus className="mr-2" /> Add Product
      </Button>
      
      <Modal
        title="Create Product"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <label>Product Name:</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
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
          <label>Representative Portions:</label>
          <Input
            value={representativePortions}
            onChange={(e) => setRepresentativePortions(e.target.value)}
            placeholder="Enter representative portions"
          />
        </div>
        <div>
          <label>Quality (1-5):</label>
          <InputNumber
            min={1}
            max={5}
            value={quality}
            onChange={(value) => setQuality(value || 1)}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddProductButton;
