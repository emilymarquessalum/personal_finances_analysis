export interface SavingBox {
    id: string;
    name: string;
    currentValue: number;
    expenseIds: string[];
    createdAt: Date;
    updatedAt: Date;
}