'use client';
import React from "react"; 

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import { List, ListItem } from "@mui/material"; 
 
import AddItemButton from "./components/add-item-button";
import { AccountSummaryCard } from "./components/account-summary-card";
import { DateSelector } from "./components/date-selector";
import SavingsGraph from "./components/savings-graph";
import { AccountFinancesContext } from "@/app/providers/account-finances-provider";

export default function DashboardPage() {
    const accountItems = React.useContext(AccountFinancesContext);

    if (!accountItems) return <p>Loading...</p>;

    const { income, expenses } = accountItems.getBalance();
    
    const dataAsGraph = [];

    //for()

    return (
        <div className="p-4 space-y-4"> 

            <AccountSummaryCard/>
            {false && <SavingsGraph data={[]} objectives={[]}/>}
 
            <DateSelector/> 

            {/* Income List */}
            <Card>
                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Income</h2>
                    <List>
                        {income.length > 0 ? (
                            income.map((item, index) => (
                                <ListItem key={index} className="flex justify-between">
                                    <span>{item.description}</span>
                                    <span className="text-green-600">+${item.amount.toFixed(2)}</span>
                                </ListItem>
                            ))
                        ) : (
                            <p className="text-gray-500">No income recorded</p>
                        )}
                    </List>
                </CardContent>
            </Card>

            {/* Expenses List */}
            <Card>
                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Expenses</h2>
                    <List>
                        {expenses.length > 0 ? (
                            expenses.map((item, index) => (
                                <ListItem key={index} className="flex justify-between">
                                    <span>{item.description}</span>
                                    <span className="text-red-600">-${item.amount.toFixed(2)}</span>
                                </ListItem>
                            ))
                        ) : (
                            <p className="text-gray-500">No expenses recorded</p>
                        )}
                    </List>
                </CardContent>
            </Card>

            {/* Add New Item Button */}
            <AddItemButton />  
        </div> 
    );
}
