'use client';

import { NavBody } from '@/app/layout/nav/nav-body';
import { Typography } from 'antd';
import SavingBoxList from './components/saving-box-list';

export default function SavingBoxesPage() {
    return (
        <NavBody children={
            <div className="p-8">
                <div className="mb-8">
                    <Typography.Title level={2}>Saving Boxes</Typography.Title>
                    <Typography.Text className="text-gray-600">
                        Manage your savings in dedicated boxes
                    </Typography.Text>
                </div>
                <SavingBoxList />
            </div>
        } />
    );
}