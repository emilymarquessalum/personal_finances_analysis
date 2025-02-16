'use client';
import { useAccountSummary } from "@/app/providers/account-summary-provider";
import { CardContent } from "@mui/material";
import { Card } from "antd";
import React from "react";


export function AccountSummaryCard() {
    
    const accountSummary = useAccountSummary();
    
    return (
        <Card>
        <CardContent className="p-4 text-center space-y-2">
            <h1 className="text-xl font-bold">Account Summary</h1>
            <p>Start Balance: ${accountSummary.startBalance.toFixed(2)}</p>
            <p>Income: ${accountSummary.income.toFixed(2)}</p>
            <p>Expenses: ${accountSummary.expenses.toFixed(2)}</p>
            <p>Final Balance: ${(accountSummary.startBalance + accountSummary.income - accountSummary.expenses).toFixed(2)}</p>
        </CardContent>
    </Card>
    );
}