


export class BudgetConfig {
    maxCost: number;
    minPortions: number;
    
    constructor(maxCost: number, minPortions: number) {
        this.maxCost = maxCost;
        this.minPortions = minPortions;
    }
}