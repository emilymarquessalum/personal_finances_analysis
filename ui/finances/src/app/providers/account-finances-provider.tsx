'use client';


/*
 HOLDS INFORMATION OF ALL MONTHS, AND COORDINATES IT ACCORDINGLY
*/

import React, { useEffect, useState } from "react"; 
import { AccountItem } from "../data/model/account-item";
import { useAccountSummary } from "./account-summary-provider";


export interface AccountFinancesContextValue {
    currentDate: Date;
    goToNextMonth: () => void;
    goToPreviousMonth: () => void;
    addItem: (item: AccountItem) => void;
    getBalance: () => { income: AccountItem[], expenses: AccountItem[] };
}



export interface AccountFinancesProps {
    children: React.ReactNode;
}

export const AccountFinancesContext = React.createContext<AccountFinancesContextValue | undefined>(undefined);

interface BalanceHistory {
    income: AccountItem[];
    expenses: AccountItem[];
}

export function AccountFinancesProvider({ children }: AccountFinancesProps): React.JSX.Element {

    const [state, setState] = useState<AccountFinancesContextValue>({
        currentDate: new Date(),
        goToNextMonth: () => { },
        goToPreviousMonth: () => { },
        addItem: () => { },
        getBalance: () => ({ income: [], expenses: [] })
    });

    const [finalBalance, setFinalBalance] = useState<number>(0);

    //const [balanceHistory, ]

    /// ALL ITEMS THAT HAVE A REGULARITY RULE ARE SAVED HERE (and make copies of themselves for specific months)
    const [globalBalance, setGlobalBalance] = useState<BalanceHistory>(
        {
            income: [],
            expenses: []
        }
    );

    const [history, setHistory] = useState<Map<string, BalanceHistory>>(new Map());
 

    function getBalance(): { income: AccountItem[], expenses: AccountItem[] } {
        const key = `${state.currentDate.getFullYear()}-${state.currentDate.getMonth()}`;
        return history.get(key) ?? { income: [], expenses: [] };
    }


    function canAddItem(item: AccountItem, currentDate: Date): boolean {
        return (
            item.date.getMonth() === currentDate.getMonth() &&
            item.date.getFullYear() === currentDate.getFullYear()
        ) || (
                item.regularity === "monthly" &&
                (item.date.getMonth() <= currentDate.getMonth() || item.date.getFullYear() < currentDate.getFullYear())
            );
    }

    function addItem(item: AccountItem) {

        if (item.regularity === "monthly") {

            setGlobalBalance((prev) => {
                if (item.type === "income") {
                    return {
                        ...prev,
                        income: [...prev.income, item]
                    };
                } else {
                    return {
                        ...prev,
                        expenses: [...prev.expenses, item]
                    };
                }
            });

            let key = `${item.date.getFullYear()}-${item.date.getMonth()}`;
            let monthsChanged = 0;
            const newHistory = new Map(history);
            while (newHistory.has(key)) {
                const current = newHistory.get(key);

                if (current === undefined) {
                    break;
                }

                if (item.type == 'expense') {
                    current.expenses.push(item);
                } else {
                    current.income.push(item);
                }
                monthsChanged++;
                newHistory.set(key, current);
                const newDate = new Date(item.date.getFullYear(), item.date.getMonth() + monthsChanged);
                key = `${newDate.getFullYear()}-${newDate.getMonth()}`;
            }

            setHistory(newHistory);
            return;
        }

        const key = `${item.date.getFullYear()}-${String(item.date.getMonth())}`;

        // Generate the new Map before setting the state
        const newHistory = new Map(history);

        let current = newHistory.get(key) ?? { income: [], expenses: [] };

        if (item.type === "income") {
            current.income.push(item);
        } else {
            current.expenses.push(item);
        }

        newHistory.set(key, current);

        // Now use setState to update it
        setHistory(newHistory);




    }
 

    
    const accountSummary = useAccountSummary();

    useEffect(() => {

        let currentBalance = history.get(`${state.currentDate.getFullYear()}-${state.currentDate.getMonth()}`);

        if(!currentBalance) {
            currentBalance = {
                income: [],
                expenses: []
            };
        }
        accountSummary.changeAll(
            currentBalance!.income.reduce((sum, item) => sum + item.amount, 0),
            currentBalance!.expenses.reduce((sum, item) => sum + item.amount, 0),
            state.currentDate,
            finalBalance
        );
    }, [state.currentDate, history]);

    function goToNextMonth() {

        const currentDate = state.currentDate; 
        const newDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1);
        const key = `${newDate.getFullYear()}-${newDate.getMonth()}`;
        const currentKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

        // state.currentDate = newDate;
        setState((prev) => ({
            ...prev,
            currentDate: newDate
        }));

        const currentBalance = history.get(currentKey);
         
        setFinalBalance(finalBalance + currentBalance!.income.reduce((sum, item) => sum + item.amount, 0) -
            currentBalance!.expenses.reduce((sum, item) => sum + item.amount, 0));

        if (!history.has(key)) {

            const newBalance = {
                income: globalBalance.income.map(item => ({ ...item })),
                expenses: globalBalance.expenses.map(item => ({ ...item }))
            };
            setHistory((prevHistory) => {
                prevHistory.set(key, newBalance);

                return new Map(prevHistory);
            }); 
        }  

    }

    function goToPreviousMonth() {


        const newDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1);
        const key = `${newDate.getFullYear()}-${newDate.getMonth()}`;


        if (!history.has(key)) {
            const newBalance = {
                income: [],
                expenses: []
            };
            setHistory((prevHistory) => {
                prevHistory.set(key, newBalance);

                return new Map(prevHistory);
            }); 
            setFinalBalance(0);
        } else {
            const currentBalance = history.get(key);
            setFinalBalance(finalBalance - 
                (currentBalance!.income.reduce((sum, item) => sum + item.amount, 0) -
                currentBalance!.expenses.reduce((sum, item) => sum + item.amount, 0)
            ));
        }

        setState((prev) => ({
            ...prev,
            currentDate: newDate
        }));
    }

    return (
        <AccountFinancesContext.Provider value={{
            ...state, goToNextMonth, goToPreviousMonth,
            addItem, getBalance
        }}>
            {children}
        </AccountFinancesContext.Provider>
    );
}