


export class Product {

    name: string;
    cost: number;
    representativePortions: number;
    quality: number;

    constructor(name: string, cost: number, representativePortions: number, quality: number) {
        this.name = name;
        this.cost = cost;
        this.representativePortions = representativePortions;
        this.quality = quality;
    }


    costPerPortion(): number {
        return (this.cost) / (this.representativePortions);
    } 

    // Takes into account the quality of the product and the cost per portion, 
    // to calculate the linear relevancy metric for the product.
    costPerPortionPerQuality(): number {
        return this.costPerPortion()/ (this.quality);
    }
}