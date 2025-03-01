import { Card, CardContent, List, Stack, Typography } from "@mui/material";
import { AccountItem } from "@/app/data/model/account-item";
import FinanceItemCard from "./finance-item-card";
import { Button } from "antd";
import React from "react";

interface FinanceItemsListProps {
    title: string;
    items: AccountItem[];
    onConfirm: (item: AccountItem) => void;
    onEdit: (item: AccountItem) => void;
    onDelete: (item: AccountItem) => void;
    onAdd: () => void;
}

export default function FinanceItemsList({
    title,
    items,
    onConfirm,
    onEdit,
    onDelete,
    onAdd
}: FinanceItemsListProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const confirmedTotal = items
        .filter(item => item.confirmed)
        .reduce((sum, item) => sum + item.amount, 0);

    const total = items.reduce((sum, item) => sum + item.amount, 0);
    const displayedItems = isOpen ? items : items.slice(0, 2);
    const hasMoreItems = items.length > 2;

    const titleComponent = (

        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    );
    const costsComponent = (

        <Stack>
            <Typography variant="body2" color="text.primary" className="text-gray-700">
                ${confirmedTotal.toFixed(2)}
            </Typography>

            {
                total !== confirmedTotal &&
                <Typography variant="body2" color="text.secondary" className="text-gray-500">
                    ${total.toFixed(2)}
                </Typography>}
        </Stack>
    );

    return (
        <Card>
            
            <CardContent className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="space-y-2 mb-4" style={{
                    borderBottom: '2px solid #e5e7eb',
                }}> 
                    <Stack direction="row"
                    style={{
                        
                    marginBottom: '10px',
                    }}
                        justifyContent="space-between">
                        {costsComponent}
                        {titleComponent}
                        <Button type="primary" onClick={
                            () => {
                                onAdd();
                            }
                        }>
                            +
                        </Button>
                    </Stack>
                </div>
                <List>
                    {displayedItems.length > 0 ? (
                        <>
                            {displayedItems.map((item, index) => (
                                <FinanceItemCard
                                    key={index}
                                    index={index}
                                    item={item}
                                    onConfirm={() => onConfirm(item)}
                                    onEdit={() => onEdit(item)}
                                    onDelete={() => onDelete(item)}
                                />
                            ))}
                            {hasMoreItems && (
                                <Button 
                                    type="link" 
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="w-full mt-2"
                                >
                                    {isOpen ? 'Show Less' : `Show ${items.length - 2} More`}
                                </Button>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-500">No {title.toLowerCase()} recorded</p>
                    )}
                </List>
            </CardContent>
        </Card>
    );
}