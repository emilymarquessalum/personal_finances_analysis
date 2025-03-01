'use client';
import React from "react"; 

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import { Button, Checkbox, List, Stack } from "@mui/material"; 
  
import { AccountSummaryCard } from "./components/account-summary-card";
import { DateSelector } from "./components/date-selector";
import SavingsGraph from "./components/savings-graph";
import { AccountFinancesContext } from "@/app/providers/account-finances-provider";
import FinanceItemCard from "./components/finance-item-card";
import { AccountItem } from "@/app/data/model/account-item";
import ConfirmActionPopup from "@/core/confirm-action-popup";
import { useAccountSummary } from "@/app/providers/account-summary-provider";
import { Plus } from "@phosphor-icons/react";
import AddItemPopup, { AddItemState } from "./popups/add-item-popup";
import EditItemPopup from "./popups/edit-item-popup";
import FinanceItemsList from "./components/finance-items-list";
import CategoryDistributionChart from "./components/category-distribution-chart";
import LoadingScreen from "./components/loading-screen";

export default function DashboardPage() {
    const accountItems = React.useContext(AccountFinancesContext);

    const [deletePopup, setDeletePopup] = React.useState(false);
    const [deleteItem, setDeleteItem] = React.useState<AccountItem | null>(null);
    const [eraseAllMonths, setEraseAllMonths] = React.useState(false);

    const [editItem, setEditItem] = React.useState<AccountItem | null>(null);

    const [addItemState, setAddItemState] = React.useState<AddItemState>({ 
        modalItemType: "income",
        isVisible: false,
    }); 
    if (!accountItems || accountItems.isLoading) return <LoadingScreen />;
    const { income, expenses } = accountItems.getBalance(); 

    const accountSummary = useAccountSummary();
    
    const dataAsGraph = [];

    //for()

    let history = accountSummary.historyOfPreviousMonths?.keys().toArray() ?? [];

    for(let i = 0; i < history.length; i++) {
        const month = history[i];
        const value = ((accountSummary.historyOfPreviousMonths?.get(month) ?? 0)
         
        );
        dataAsGraph.push({
            label: month,
            value: value
        });
    }

    return (
        <div className="p-4 space-y-4"> 

            <AccountSummaryCard 
            bottomAppending={
                <DateSelector/> 
            }
            />
            {<SavingsGraph data={dataAsGraph} objectives={[]}/>}
 
           

            {/* Income List */}
            <FinanceItemsList
                    title="Income"
                    items={income}
                    onConfirm={(item) => accountItems.confirmItem(item)}
                    onEdit={(item) => setEditItem(item)}
                    onDelete={(item) => {
                        setDeleteItem(item);
                        setDeletePopup(true);
                    }}
                    onAdd={() => {
                        setAddItemState({
                            modalItemType: "income",
                            isVisible: true,
                        });
                    }}
                />


            {/* Expenses List */}
            <FinanceItemsList
                    title="Expenses"
                    items={expenses}
                    onConfirm={(item) => accountItems.confirmItem(item)}
                    onEdit={(item) => setEditItem(item)}
                    onDelete={(item) => {
                        setDeleteItem(item);
                        setDeletePopup(true);
                    }}
                    
                    onAdd={() => {
                        setAddItemState({
                            modalItemType: "expense",
                            isVisible: true,
                        });
                    }}
                />
 

            <CategoryDistributionChart items={
                accountItems.getBalance().expenses
            }/> 
            {/* Add New Item Popup */}
            <AddItemPopup 
                state={
                    addItemState
                } 
                onOk={() => {
                    setAddItemState({
                        modalItemType: "income",
                        isVisible: false,
                    });
                }} 
                onCancel={() => {
                    setAddItemState({
                        modalItemType: "income",
                        isVisible: false,
                    });
                }}
            />

            <EditItemPopup  
                isVisible={editItem != null}
                item={editItem}
                onOk={() => {
                    setEditItem(null);
                }}
                onCancel={() => {
                    setEditItem(null);
                }}
            />

            {/* Remote Item Popup */}
            <ConfirmActionPopup
                title="Are you sure you want to delete this item?" 
                open={deletePopup}
                onConfirm={() => {
                    if (deleteItem) {
                        accountItems.deleteItem(deleteItem, eraseAllMonths);
                    }
                    setDeletePopup(false);
                    setDeleteItem(null);
                }}
                additionalActions=
                
                {
                    deleteItem?.regularity &&
                    <Stack>
                        <p>Apagar de Todos os meses</p>
                        <Checkbox
                        checked={eraseAllMonths}
                        onChange={(e) => 
                            setEraseAllMonths(e.target.checked)
                        }></Checkbox>
                    </Stack>
                }
                onCancel={() => {
                    setDeletePopup(false);
                    setDeleteItem(null);
                }}/>
                        

        </div> 
    );
}
