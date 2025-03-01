


export class ProductPlanConfig {
     
    maxCostPortions: number;
    minPortions: number;

    
    constructor(maxCost: number, minPortions: number) {
        this.maxCostPortions = maxCost;
        this.minPortions = minPortions;  
    }
}