'use client';

import { Button, Card, List, Typography } from 'antd';
import { Plus } from 'react-feather';
import { useState } from 'react';
import { SavingBox } from '@/app/data/model/saving-box'; 
import AddSavingBoxModal from '../popups/add-saving-box-modal';
import AddValueModal from '../popups/add-value-modal';

export default function SavingBoxList() {
    const [savingBoxes, setSavingBoxes] = useState<SavingBox[]>([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedBox, setSelectedBox] = useState<SavingBox | null>(null);
    const [isAddValueModalVisible, setIsAddValueModalVisible] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Typography.Title level={4}>Your Saving Boxes</Typography.Title>
                <Button 
                    type="primary"
                    icon={<Plus className="w-4 h-4" />}
                    onClick={() => setIsAddModalVisible(true)}
                >
                    Create New Box
                </Button>
            </div>

            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={savingBoxes}
                renderItem={(box) => (
                    <List.Item>
                        <Card 
                            title={box.name}
                            extra={
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setSelectedBox(box);
                                        setIsAddValueModalVisible(true);
                                    }}
                                >
                                    Add Value
                                </Button>
                            }
                        >
                            <div className="space-y-2">
                                <Typography.Text className="text-lg font-semibold block">
                                    ${box.currentValue.toFixed(2)}
                                </Typography.Text>
                                <Typography.Text type="secondary">
                                    Created on {box.createdAt.toLocaleDateString()}
                                </Typography.Text>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />

            <AddSavingBoxModal
                visible={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                onAdd={(box) => {
                    setSavingBoxes([...savingBoxes, box]);
                    setIsAddModalVisible(false);
                }}
            />

            <AddValueModal
                visible={isAddValueModalVisible}
                savingBox={selectedBox}
                onCancel={() => {
                    setIsAddValueModalVisible(false);
                    setSelectedBox(null);
                }}
                onAdd={(box) => {
                    setSavingBoxes(boxes => 
                        boxes.map(b => b.id === box.id ? box : b)
                    );
                    setIsAddValueModalVisible(false);
                    setSelectedBox(null);
                }}
            />
        </div>
    );
}