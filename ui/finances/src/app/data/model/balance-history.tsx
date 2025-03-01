import { AccountItem } from "./account-item";

export default class BalanceHistory {
    private _income: AccountItem[];
    private _expenses: AccountItem[];

    constructor(income: AccountItem[] = [], expenses: AccountItem[] = []) {
        this._income = income;
        this._expenses = expenses;
    } 

    get income(): AccountItem[] {
        return this._income;
    }

    get expenses(): AccountItem[] {
        return this._expenses;
    }

    addItem(item: AccountItem): void {
        if (item.type === "income") {
            this._income.push(item);
        } else {
            this._expenses.push(item);
        }
    }

    editItem(originalItem: AccountItem, updatedItem: AccountItem): void { 
        this.removeItem(originalItem);
        this.addItem(updatedItem);
    } 

    editItemCopy(originalItem: AccountItem, updatedItem: AccountItem): void {
        if (originalItem.type === "income") {
            this._income = this._income.map((i) => {
                if (i.originalId === originalItem.id) {
                    return { ...updatedItem, id: i.id };
                }
                return i;
            });
        } else {
            this._expenses = this._expenses.map((i) => {
                if (i.originalId === originalItem.id) {
                    return {...updatedItem, id: i.id };
                }   
                return i;
            });
        }
    }

    removeItem(item: AccountItem): void {
        if (item.type === "income") {
            this._income = this._income.filter((i) => i.id!== item.id); 
        } else {
            this._expenses = this._expenses.filter((i) => i.id!== item.id);
        }
    }

    setItemAsConfirmed(item: AccountItem): void {
        if (item.type === "income") {
            this._income = this._income.map((i) => {
                if (i.id === item.id) {
                    return { ...i, confirmed: !i.confirmed };
                }
                return i;
            });
        } else {
            this._expenses = this._expenses.map((i) => {
                if (i.id === item.id) {
                    return {...i, confirmed: !i.confirmed };
                }
                return i;
            });
        }
    }
}
