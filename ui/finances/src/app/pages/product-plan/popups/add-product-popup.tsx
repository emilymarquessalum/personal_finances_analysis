import { Input } from '@mui/material';
import { InputNumber } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React, { useEffect, useState } from 'react'



type Props = {
 handleOk: (name: string, cost: string, representativePortions: string, quality: number) => void;
 handleCancel: () => void;
 isModalVisible: boolean;

}
export const AddProductPopup = ({
    isModalVisible, 
    handleOk,
    handleCancel
}: Props) => {

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [representativePortions, setRepresentativePortions] = useState('');
    const [quality, setQuality] = useState(1);
    const [quantity, setQuantity] = useState(1);
    
    useEffect(() => {
        
    setName('');
    setCost('');
    setRepresentativePortions('');
    setQuality(1);
    }, [isModalVisible]);

    return ( 
        <Modal
        title="Create Product"
        open={isModalVisible}
        onOk={
        ()=> {
            handleOk(name, cost, representativePortions, quality);
            setName('');
            setCost('');
            setRepresentativePortions('');
            setQuality(1);
        }
        }
        onCancel={handleCancel}
      >
        <div>
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
        <div>
          <label>Quantity (1-5):</label>
          <InputNumber
            min={1} 
            value={quality}
            onChange={(value) => setQuality(value || 1)}
          />
        </div>
        </div>
      </Modal>
    );
}