'use client';


/*
 HOLDS INFORMATION OF ALL MONTHS, AND COORDINATES IT ACCORDINGLY
*/

import React, { useEffect, useState } from "react";
import { AccountItem } from "../data/model/account-item";
import { useAccountSummary } from "./account-summary-provider";
import BalanceHistory from "../data/model/balance-history";
import FinanceHistory from "../data/model/finance-history";
import { v4 as uuidv4 } from 'uuid';


export interface AccountFinancesContextValue {
    confirmItem(item: AccountItem): unknown;
    currentDate: Date;
    realCurrentDate: Date;
    setRealCurrentDate: (date: Date) => void;
    goToNextMonth: () => void;
    goToPreviousMonth: () => void;
    goToCurrentMonth: () => void;
    addItem: (item: AccountItem) => void;
    deleteItem: (item: AccountItem, eraseAllMonths: boolean) => void;
    getBalance: () => BalanceHistory;
    isLoading: boolean;
    editItem: (oldItem: AccountItem, newItem: AccountItem, editAllMonths: boolean) => void;

    endMonthEarlier: () => void;
}



export interface AccountFinancesProps {
    children: React.ReactNode;
    isLoading: boolean;
    
}

export const AccountFinancesContext = React.createContext<AccountFinancesContextValue | undefined>(undefined);


export function AccountFinancesProvider({ children }: AccountFinancesProps): React.JSX.Element {
    const [state, setState] = useState<AccountFinancesContextValue>({
        currentDate: new Date(),
        realCurrentDate: new Date(),
        setRealCurrentDate: () => { },
        goToNextMonth: () => { },
        goToPreviousMonth: () => { },
        addItem: () => { },
        getBalance: () => {
            return new BalanceHistory();
        },
        deleteItem: () => { },
        confirmItem: () => { },
        goToCurrentMonth: () => { },
        editItem: () => { },
        endMonthEarlier: () => { },
        isLoading: true
    });
    useEffect(() => {
        // Simulate initial loading
        const timer = setTimeout(() => {
            setState(prev => ({
                ...prev,
                isLoading: false
            }));
        }, 1000); // Add a small delay to prevent flash

        return () => clearTimeout(timer);
    }, []);
    const [realCurrentDate, setRealCurrentDate] = useState<Date>(new Date());
    const [finalBalance, setFinalBalance] = useState<number>(0);
    //const [balanceHistory, ]
    /// ALL ITEMS THAT HAVE A REGULARITY RULE ARE SAVED HERE (and make copies of themselves for specific months)
    const [globalBalance, setGlobalBalance] = useState<BalanceHistory>(new BalanceHistory());
    const [history, setHistory] = useState<FinanceHistory>(new FinanceHistory(new Map()));
    // Will hold the final balance of each previous month before this one
    const [historyOfPreviousMonths, setHistoryOfPreviousMonths] = useState<Map<string, number>>(new Map());

    function addItem(item: AccountItem) {
        if (item.regularity === "monthly") {
            setGlobalBalance((prev) => {
                const newBalance = new BalanceHistory();
                prev.income.forEach(i => newBalance.addItem(i));
                prev.expenses.forEach(i => newBalance.addItem(i));
                newBalance.addItem(item);
                return newBalance;
            });

            history.forEachNextMonth(
                state.currentDate,
                (month, balance) => {
                    const itemCopy = {
                        ...item,
                        id: uuidv4(),
                        originalId: item.id
                    };
                    balance.addItem(itemCopy);
                });
            setHistory(history.copy());
            return;
        }

        history.forCurrentMonth(
            state.currentDate,
            (month, balance) => {
                balance.addItem(item);
            }
        );

        setHistory(history.copy());
    };
    const accountSummary = useAccountSummary();
    useEffect(() => {

        let currentBalance = history.getBalance(state.currentDate);

        let balanceCurrently = finalBalance + history.getAllSumOfItemsCurrentlyReceived(state.currentDate);
        accountSummary.changeAll(
            currentBalance!.income.reduce((sum, item) => sum + item.amount, 0),
            currentBalance!.expenses.reduce((sum, item) => sum + item.amount, 0),
            state.currentDate,
            finalBalance,
            balanceCurrently
        );
        accountSummary.setHistoryOfPreviousMonths(historyOfPreviousMonths);
    }, [state.currentDate, history]);
    function goNMonthsNext(n: number) {
        let currentDate = state.currentDate;
        let endBalance = finalBalance;

        for (let i = 0; i < n; i++) {
            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
            const key = `${newDate.getFullYear()}-${newDate.getMonth()}`;
            const currentKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

            // Retrieve current balance and update the end balance
            const currentBalance = history.getBalance(currentDate);
            if (currentBalance) {
                endBalance += currentBalance.income.reduce((sum, item) => sum + item.amount, 0) -
                    currentBalance.expenses.reduce((sum, item) => sum + item.amount, 0);
            }

            // Store previous month's balance
            setHistoryOfPreviousMonths((prev) => {
                prev.set(currentKey, endBalance);
                return new Map(prev);
            });

            // Access the new month and update history
            history.accessNewMonth(newDate, globalBalance);
            currentDate = newDate;
        }

        // Update state after the loop
        setState((prev) => ({
            ...prev,
            currentDate: currentDate
        }));

        setFinalBalance(endBalance);
        setHistory(history.copy());
    }
    function goToNextMonth() {

        goNMonthsNext(1);
    }
    function goNMonthsBack(n: number) {
        let currentDate = state.currentDate;
        let endBalance = finalBalance;

        for (let i = 0; i < n; i++) {
            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
            const key = `${newDate.getFullYear()}-${newDate.getMonth()}`;

            // Remove history of previous months
            setHistoryOfPreviousMonths((prev) => {
                prev.delete(key);
                return new Map(prev);
            });

            if (!history.hasMonth(newDate)) {
                history.accessNewMonth(newDate, globalBalance);
                endBalance = 0; // Reset balance when going to an empty month
            } else {
                const currentBalance = history.getBalance(newDate);
                if (currentBalance) {
                    endBalance -= currentBalance.income.reduce((sum, item) => sum + item.amount, 0) -
                        currentBalance.expenses.reduce((sum, item) => sum + item.amount, 0);
                }
            }

            currentDate = newDate;
        }

        // Update state after the loop
        setState((prev) => ({
            ...prev,
            currentDate: currentDate
        }));

        setFinalBalance(endBalance);
    }
    function goToPreviousMonth() {

        goNMonthsBack(1);
    }
    // Update deleteItem to use IDs
    const deleteItem = (item: AccountItem, eraseAllMonths: boolean) => {
        history.forCurrentMonth(
            state.currentDate,
            (month, balance) => {
                balance.removeItem(item);
            }
        );
        setHistory(history.copy());

        if (eraseAllMonths) {
            setGlobalBalance((prev) => {
                prev.removeItem(item);
                return prev;
            });


            let newDate = new Date(item.date.getFullYear(), item.date.getMonth() + 1);
            let key = `${newDate.getFullYear()}-${newDate.getMonth()}`;

            history.forEachNextMonth(
                newDate,
                (month, balance) => {
                    balance.removeItem(item);
                }
            );
            setHistory(history.copy());


        }
    };
    function confirmItem(item: AccountItem) {

        history.forCurrentMonth(
            state.currentDate,
            (month, balance) => {
                balance.setItemAsConfirmed(item);
            }
        );
        setHistory(history.copy());

    }
    const editItem = (oldItem: AccountItem, newItem: AccountItem, editAllMonths: boolean) => {
        const updatedItem = { ...newItem, id: oldItem.id, originalId: oldItem.originalId };

        if(oldItem.regularity !=="monthly" && newItem.regularity==="monthly") {
            deleteItem(oldItem, false);
            addItem(updatedItem);
            return;     
        } 

        /*if(oldItem.regularity==="monthly" && newItem.regularity!=="monthly") {
            deleteItem(oldItem, true);
            addItem(updatedItem);
            return; 
        }*/
        history.forCurrentMonth(
            state.currentDate,
            (month, balance) => {
                balance.editItem(oldItem, updatedItem);
            }
        );

        if (editAllMonths && oldItem.regularity === "monthly") {
            setGlobalBalance((prev) => {
                prev.editItem(oldItem, updatedItem);
                return prev;
            });

            history.forEachNextMonth(
                state.currentDate,
                (month, balance) => {
                    balance.editItemCopy(oldItem, updatedItem);
                }
            );
        }

        setHistory(history.copy());
    };
    const getBalance = () => {
        return history.getBalance(state.currentDate);
    };
    function goToCurrentMonth(params?: { currentDate?: Date | null }) {
        let currentDate = params?.currentDate ?? realCurrentDate;
        currentDate ??= realCurrentDate;

        let stateDate = new Date(state.currentDate);
        const yearDiff = currentDate.getFullYear() - stateDate.getFullYear();
        const monthDiff = currentDate.getMonth() - stateDate.getMonth();
        const totalMonthsDiff = yearDiff * 12 + monthDiff;

        if (totalMonthsDiff > 0) {
            goNMonthsNext(totalMonthsDiff); // Move forward
        } else if (totalMonthsDiff < 0) {
            goNMonthsBack(-totalMonthsDiff); // Move backward (use positive value)
        }
    }

    const endMonthEarlier = () => {

        const newDate = new Date(realCurrentDate.getFullYear(), realCurrentDate.getMonth() + 1);
        setRealCurrentDate(newDate);

        goToNextMonth();
        //goToCurrentMonth({currentDate: newDate}); 
    };

    return (
        <AccountFinancesContext.Provider value={{
            ...state,
            isLoading: state.isLoading,
            realCurrentDate,
            setRealCurrentDate,
            goToNextMonth,
            goToPreviousMonth,
            addItem,
            getBalance,
            deleteItem,
            confirmItem,
            goToCurrentMonth,
            editItem,
            endMonthEarlier
        }}>
            {children}
        </AccountFinancesContext.Provider>
    );
}