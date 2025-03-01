


import { useState } from 'react';
import { Button, Modal, Input, Select, InputNumber } from 'antd';
import { Plus } from 'react-feather';
import * as React from 'react';
import { AddProductPopup } from '../popups/add-product-popup';

const AddProductButton = ({onAdd} : {
    onAdd: (name: string, cost: string, representativePortions: string, quality: number, quantity?: number) => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
 

  const handleAddClick = () => {
    setIsModalVisible(true);

  };

  const handleOk = (name: string, cost: string, representativePortions: string, quality: number) => { 
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
      
      <AddProductPopup
      handleCancel={handleCancel}
      handleOk={handleOk}
      isModalVisible={isModalVisible}
      />
      
    </>
  );
};

export default AddProductButton;
