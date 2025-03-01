'use client'
import React from "react";



/*
    ONLY HOLDS RESULTANT DATA OF THE MONTH (not knowing details like why the values are the way they are)
*/

export function useAccountSummary(): AccountSummaryContextValue {
    const context = React.useContext(AccountSummaryContext);

    if (!context) {
        throw new Error('useAccountSummary must be used within a AccountSummaryProvider');
    }

    return context;
}



export interface AccountSummaryContextValue {
    income: number;
    expenses: number;
    currentDate: Date;
    startBalance: number;
    currentBalance: number;
    historyOfPreviousMonths?: Map<string, number>;


    setHistoryOfPreviousMonths(historyOfPreviousMonths: Map<string, number>): unknown;
    changeIncome: (value: number) => void;
    changeExpenses: (value: number) => void;
    changeCurrentDate: (value: Date) => void;
    changeStartBalance: (value: number) => void;

    changeAll: (income: number, expenses: number, currentDate: Date, startBalance: number, currentBalance: number) => void;
}

export interface AccountSummaryProps {
    children: React.ReactNode;
}


export const AccountSummaryContext = React.createContext<AccountSummaryContextValue | undefined>(undefined);


export function AccountSummaryProvider({ children }: AccountSummaryProps): React.JSX.Element {


    const [state, setState] = React.useState<AccountSummaryContextValue>({
        expenses: 0,
        income: 0,
        currentDate: new Date(),
        startBalance: 0,
        currentBalance  : 0,
        historyOfPreviousMonths: new Map(),
        changeIncome: (value: number) => {
            setState((prevState) => ({ ...prevState, income: value }));
        },
        changeExpenses: (value: number) => {
            setState((prevState) => ({ ...prevState, expenses: value }));
        },
        changeCurrentDate: (value: Date) => {
            setState((prevState) => ({ ...prevState, currentDate: value }));
        },
        changeStartBalance: (value: number) => {
            setState((prevState) => ({ ...prevState, startBalance: value }));
        },
        changeAll: (income: number, expenses: number, currentDate: Date, startBalance: number, currentBalance: number) => {
            setState((prevState) => ({ ...prevState, income, expenses, currentDate, startBalance, currentBalance }));
        },
        setHistoryOfPreviousMonths: (historyOfPreviousMonths: Map<string, number>) => {
            setState((prevState) => ({ ...prevState, historyOfPreviousMonths }));
        } 
    });


    return (
        <AccountSummaryContext.Provider value={state}>
            {children}
        </AccountSummaryContext.Provider>
    );
}