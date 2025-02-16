'use client';

import React, { useEffect } from "react";
import AddProductButton from "./add-product-button";

import { Product } from "./data/product";
import BudgetConfiguration from "./budget-configuration";
import { BudgetConfig } from "./data/budget-config";
import { Typography } from "@mui/material";
import { BudgetPlanResults } from "./budget-plan-results";
import ProductTable from "./product-table";
import { NavBody } from "../layout/nav/nav-body";
import { NormalDistribution } from "./normal-distribution";
import { adaptEventsOfChild } from "recharts/types/util/types";

export class Budget {
    name: string;
    budgetConfig: BudgetConfig;
    products: Product[];

    constructor(name: string, budgetConfig: BudgetConfig, products: Product[]) {
        this.name = name;
        this.budgetConfig = budgetConfig;
        this.products = products;
    }
    generateResults(): BudgetResult {
        const productPurchases: Record<string, number> = {};
        const productPortions: Record<string, number> = {};
        const maxCost = this.budgetConfig.maxCost;
        const minPortions = this.budgetConfig.minPortions;


        const purchases = [];

        if (this.products.length === 0) {
            return new BudgetResult(productPurchases, productPortions, 0, 0);
        }
        // Sort products by cost per portion to determine priority
        const sortedProducts = [...this.products].sort((a, b) => a.costPerPortion() - b.costPerPortion());
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
                    continue;
                }

                while (currentCheapestIndex < sortedProducts.length) {
                    const currentCheapest = sortedProducts[currentCheapestIndex];
                    if (!purchases.includes(currentCheapest)) {
                        currentCheapestIndex++;
                        continue;
                    }

                    const differenceInPortions = product.representativePortions - currentCheapest.representativePortions;
                    const amountToRemove = Math.ceil(product.cost / currentCheapest.cost);

                    // Check if there are enough instances of the cheapest product to remove
                    const availableToRemove = purchases.filter(p => p === currentCheapest).length;
                    if (availableToRemove < amountToRemove) {
                        currentCheapestIndex++;
                        continue;
                    }

                    const canChangeBasedOnPortions =
                        minPortions <= sumOfPortions + differenceInPortions - (amountToRemove - 1) * currentCheapest.representativePortions;

                    if (canChangeBasedOnPortions) {
                        noneWereChanged
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

        return new BudgetResult(productPurchases, productPortions, sumOfProducts, sumOfPortions);
    }


}




export class BudgetResult {

    constructor(public productPurchases: Record<string, number>, public productPortions: Record<string, number>, public totalCost: number, public portions: number) {

    }
}


export default function Page() {

    const [budgets, setBudgets] = React.useState<Budget[]>([]);
    const [budget, setBudget] = React.useState<Budget | null>(null);

    useEffect(() => {
        const budgets = localStorage.getItem('budgets');
        if (budgets) {
            console.log(budgets);
            setBudgets(JSON.parse(budgets).map((budget: any) => new Budget(budget.name, budget.budgetConfig,

                budget.products.map((product: any) => new Product(product.name, product.cost, product.representativePortions, product.quality)
                ))));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('budgets', JSON.stringify(budgets));
    }, [budgets]);

    const exportBudgets = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(budgets));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "budgets.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const importBudgets = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            console.log("No file selected");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(e);
            try {
                if (!e.target?.result) {
                    console.error("File reading failed");
                    return;
                }
    
                const parsedBudgets = JSON.parse(e.target.result as string);
                if (!Array.isArray(parsedBudgets)) {
                    console.error("Invalid file format");
                    return;
                }
    
                const newBudgets = parsedBudgets.map((budget: any) => 
                    new Budget(
                        budget.name, 
                        new BudgetConfig(budget.budgetConfig.maxCost, budget.budgetConfig.minPortions),
                        budget.products.map((product: any) => 
                            new Product(product.name, product.cost, product.representativePortions, product.quality)
                        )
                    )
                );
                console.log(newBudgets);
                setBudgets(newBudgets);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };
    
        reader.readAsText(file);
    };
    

    return (
        <NavBody
            children={

                <div className="p-4 space-y-4">

                    {budget === null || budget === undefined ?
                        <div >

                            <Typography variant="h4">Budgets</Typography>

                <button onClick={exportBudgets}>Export</button>
                <br />
                <input type="file" accept=".json" onChange={importBudgets} />
                <br />
                            <button onClick={() => setBudgets([...budgets, new Budget("Budget", new BudgetConfig(0, 0), [])])}>
                                Add Budget</button>
                            <ul>
                                {budgets.map((budget, index) => (
                                    <li key={index}>
                                        <a href="#" onClick={() => setBudget(budget)}>{budget.name}</a>
                                    </li>
                                ))}
                            </ul>

                        </div> :
                        <div>

                            <button onClick={() => {
                                setBudget(null);
                            }}>Back</button>
                            <BudgetConfiguration
                                budgetConfig={budget.budgetConfig}
                                onSave={function (config: BudgetConfig): void {

                                    const newBudget = new Budget(budget.name, config, budget.products.map(
                                        p => new Product(p.name, p.cost, p.representativePortions, p.quality)
                                    ));

                                    setBudgets(budgets.map(b => b === budget ? newBudget : b));
                                    setBudget(newBudget);
                                }} />
                            <AddProductButton onAdd={
                                (name, cost, representativePortions, quality) => {

                                    const newProduct = new Product(name, parseFloat(cost), parseInt(representativePortions), quality);
                                    const newProducts = [...budget.products.map(
                                        p => new Product(p.name, p.cost, p.representativePortions, p.quality)
                                    ), newProduct];

                                    const newBudget = new Budget(budget.name, budget.budgetConfig, newProducts);
                                    setBudgets(budgets.map(b => b === budget ? newBudget : b));
                                    setBudget(newBudget);
                                }
                            } />
                            <ProductTable products={budget.products} />

                            <Typography variant="h4">Results</Typography>
                            <BudgetPlanResults budget={budget} />

                        </div>}

                </div>
            }
        />

    );
}