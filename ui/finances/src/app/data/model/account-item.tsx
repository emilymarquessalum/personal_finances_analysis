

export interface AccountItem {
    id: string;           // Unique identifier
    originalId?: string;  // Reference to global item's ID if this is a copy
    type: "income" | "expense";
    description: string;
    amount: number;
    date: Date;
    confirmed: boolean;
    endDate?: Date;
    regularity: "daily" | "weekly" | "monthly" | "yearly" | null;
    categoryId?: string;
    subcategoryId?: string;
}