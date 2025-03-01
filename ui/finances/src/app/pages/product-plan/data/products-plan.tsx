import { ProductPlanConfig as ProductPlanConfig } from "./budget-config";
import { BudgetResult } from "./budget-result";
import { PortionsBasedProduct, Product } from "./product";


export type ProductPlanType = "portion" | "stock" | "uses";


export class ProductsPlan {
    name: string;
    type: ProductPlanType;
    config: ProductPlanConfig | null;
    products: Product[];
    

    constructor(name: string, type: ProductPlanType, budgetConfig: ProductPlanConfig | null, products: Product[]) {
        this.name = name;
        this.type = type;
        this.config = budgetConfig;
        this.products = products; 
    }
    
    // only considers products that are BudgetPortionsProducts
    generateResults(minPortions: number, maxCost: number): BudgetResult {

        const products = this.products.filter(p => p instanceof PortionsBasedProduct) as PortionsBasedProduct[];

        const productPurchases: Record<string, number> = {};
        const productPortions: Record<string, number> = {};
  

        const purchases = [];

        if (this.products.length === 0) {

            return new BudgetResult(productPurchases, productPortions, 0, 0, 0);
        }
        // Sort products by cost per portion to determine priority
        const sortedProducts = [...products].sort((a, b) => a.costPerPortion() - b.costPerPortion());
        const cheapestProduct = sortedProducts[0];

        let sumOfProducts = 0;
        let sumOfPortions = 0;
        let currentCheapestIndex = 0;

        // Fill the list with the cheapest product until maxCost is reached
        while (sumOfProducts + cheapestProduct.cost <= maxCost) {
            purchases.push(cheapestProduct);
            sumOfProducts += cheapestProduct.cost;
            sumOfPortions += cheapestProduct.representativePortions;
        }

        let noneWereChanged = false;

        while(!noneWereChanged) {

            noneWereChanged = true;
            // Try to replace cheaper items with better-quality ones iteratively
            for (const product of sortedProducts) {
                if (product === cheapestProduct || product.quality <= cheapestProduct.quality) {
                    //console.log("product is cheapest or quality is lower than cheapest");
                    continue;
                }

                while (currentCheapestIndex < sortedProducts.length) {
                    const currentCheapest = sortedProducts[currentCheapestIndex];
                    if (!purchases.includes(currentCheapest)) {
                        
                        //console.log("purchases dont include the cheapest!"); 
                        currentCheapestIndex++;
                        continue;
                    }

                    const differenceInPortions = product.representativePortions - currentCheapest.representativePortions;
                    const amountToRemove = Math.ceil(product.cost / currentCheapest.cost);

                    // Check if there are enough instances of the cheapest product to remove
                    const availableToRemove = purchases.filter(p => p === currentCheapest).length;
                    if (availableToRemove < amountToRemove) {
                        currentCheapestIndex++;
                        //console.log("not enough to remove"); 
                        continue;
                    }

                    const canChangeBasedOnPortions =
                        minPortions <= sumOfPortions + differenceInPortions - (amountToRemove - 1) * currentCheapest.representativePortions;

                    if (canChangeBasedOnPortions) {

                        //console.log("can change based on portions");
                        noneWereChanged = false;
                        
                        sumOfProducts += product.cost;
                        sumOfPortions += product.representativePortions;
                        purchases.push(product);

                        for (let i = 0; i < amountToRemove; i++) {
                            const indexToRemove = purchases.indexOf(currentCheapest);
                            if (indexToRemove !== -1) {
                                sumOfPortions -= currentCheapest.representativePortions;
                                sumOfProducts -= currentCheapest.cost;
                                purchases.splice(indexToRemove, 1);
                            }
                        }
                    }

                    if (!purchases.includes(currentCheapest)) {
                        currentCheapestIndex++;
                    } else {
                        break;
                    }
                }
            }

        }


        for(const product of purchases) {
            if (!productPurchases[product.name]) {
                productPurchases[product.name] = 0;
                productPortions[product.name] = 0;
            }
            productPurchases[product.name]++;  
            productPortions[product.name] += product.representativePortions;
        }

        let averageQuality = 0;

        for (const product of purchases) {
            averageQuality += product.quality;
        }

        averageQuality /= purchases.length;

        return new BudgetResult(productPurchases, productPortions, sumOfProducts, sumOfPortions, averageQuality);
    }


}
