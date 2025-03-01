// Base product class for budget plans
export abstract class Product {
    name: string;
    cost: number;

    constructor(name: string, cost: number) {
        this.name = name;
        this.cost = cost;
    }
 
}

// Represents a product that will be used in the portions-budget plan.
export class PortionsBasedProduct extends Product { 
    representativePortions: number;
    quality: number;  

    constructor(name: string, cost: number, representativePortions: number, quality: number) {
        super(name, cost);
        this.representativePortions = representativePortions > 0 ? representativePortions : 1;
        this.quality = quality > 0 ? quality : 1;
    }

    costPerPortion(): number {
        return this.cost / this.representativePortions;
    } 

    costPerPortionPerQuality(): number {
        return this.costPerPortion() / this.quality;
    } 
}

// Represents a stock-based product that needs replenishment.
export class BudgetStockProduct extends Product {
    timeBeforeReplenishmentInDays: number;

    constructor(name: string, cost: number, timeBeforeReplenishmentInDays: number) {
        super(name, cost);
        this.timeBeforeReplenishmentInDays = Math.max(1, timeBeforeReplenishmentInDays);
    }
 
}



export function productFromJson(json: any): Product {
    if (json.representativePortions !== undefined) {
        return new PortionsBasedProduct(json.name, json.cost, json.representativePortions, json.quality);
    } else if (json.timeBeforeReplenishmentInDays !== undefined) {
        return new BudgetStockProduct(json.name, json.cost, json.timeBeforeReplenishmentInDays);
    } else {
        throw new Error("Invalid product JSON");
    }
}

export function productToJson(product: Product): any {
    if (product instanceof PortionsBasedProduct) {
        return {
            name: product.name,
            cost: product.cost,
            representativePortions: product.representativePortions,
            quality: product.quality
        };
    } else if (product instanceof BudgetStockProduct) {
        return {
            name: product.name,
            cost: product.cost,
            timeBeforeReplenishmentInDays: product.timeBeforeReplenishmentInDays
        };
    } else {
        throw new Error("Invalid product type");
    }
}