import BalanceHistory from "./balance-history";


import { v4 as uuidv4 } from 'uuid';



export default class FinanceHistory {

    history: Map<string, BalanceHistory>;

    constructor(history: Map<string, BalanceHistory>) {
        this.history = history;
    }


    getBalance(date: Date): BalanceHistory {

        if (!this.history.has(`${date.getFullYear()}-${date.getMonth()}`)) {
            this.history.set(`${date.getFullYear()}-${date.getMonth()}`, new BalanceHistory());
        }

        return this.history.get(`${date.getFullYear()}-${date.getMonth()}`)!;
    }

    getAllSumOfItemsCurrentlyReceived(date: Date): number {
        const balance = this.getBalance(date);

        let sum = 0;

        for (const item of balance.income) {
            if (item.confirmed) {
                sum += item.amount;
            }
        }

        for (const item of balance.expenses) {
            if (item.confirmed) {
                sum -= item.amount;
            }
        }

        return sum;
    }

    hasMonth(date: Date): boolean {
        return this.history.has(`${date.getFullYear()}-${date.getMonth()}`);
    }

    // if the month is not in the history, it will be added
    accessNewMonth(date: Date, globalBalance: BalanceHistory): BalanceHistory {

        date = new Date(date);
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        if (!this.history.has(key)) {
            let income = globalBalance.income.map(item => {
                const nextMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
                const targetDay = Math.min(item.date.getDate(), daysInMonth);
                nextMonth.setDate(targetDay);
                
                return {
                    ...item,
                    id: uuidv4(),
                    originalId: item.id,
                    date: nextMonth,
                };
            });
            let expenses = globalBalance.expenses.map(item => {
                const nextMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
                const targetDay = Math.min(item.date.getDate(), daysInMonth);
                nextMonth.setDate(targetDay);
                
                return {
                    ...item,
                    id: uuidv4(),
                    originalId: item.id,
                    date: nextMonth,
                };
            });
            /*income = income.filter(
                item => item.date.getTime() < date.getTime() // only adds if the item is from the future
            );

            expenses = expenses.filter(
                item => item.date.getTime() < date.getTime() // only adds if the item is from the future
            );*/

            const newBalance = new BalanceHistory(income, expenses);

            this.history.set(key, newBalance);
        }

        return this.history.get(key)!;
    }

    forEachNextMonth(currentDate: Date, callback: (month: string, balance: BalanceHistory) => void) {

        currentDate = new Date(currentDate);

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        let key = `${currentYear}-${currentMonth}`;
        while (this.history.has(key)) {
            callback(key, this.history.get(key)!);
            currentDate.setMonth(currentDate.getMonth() + 1);
            key = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
        }
    }

    forCurrentMonth(currentDate: Date, callback: (month: string, balance: BalanceHistory) => void) {

        currentDate = new Date(currentDate);
        const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

        if (!this.history.has(key)) {
            this.history.set(key, new BalanceHistory());
        }

        callback(key, this.history.get(key)!);

    }

    copy(): FinanceHistory {
        return new FinanceHistory(new Map(this.history));
    }
}