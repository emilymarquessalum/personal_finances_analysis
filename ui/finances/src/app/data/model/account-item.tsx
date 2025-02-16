

export interface AccountItem {

    type: "income" | "expense";
    description: string;
    amount: number;
    date: Date;
    endDate?: Date; // Only for recurring items

    // creating a 'regular' account item creates a global one, and copies of it in all months
    // where it is applicable. Additionally, you can modify the amount of copies without modifying the global one 
    // (it will be asked to the user which one they want to change). Changing the global one for future months will, of course,
    // not affect the already created copies, although the copy used to edit will inevitably be affected either way ().
    regularity: "daily" | "weekly" | "monthly" | "yearly" | null;

    
}