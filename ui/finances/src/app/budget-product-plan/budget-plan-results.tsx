import React from 'react' 
import { Product } from './data/product';
import { Budget } from './page';


type BudgetPlanResultsProps = {
    budget: Budget;
}
export const BudgetPlanResults = ({budget}: BudgetPlanResultsProps) => {
 
   const budgetResults = budget.generateResults();

    return ( 
        <div>  
            
            <div>
                <h3>Products</h3>
                <ul>
                    {budget.products.map((product, index) => (
                        <li key={index}>{product.name} - {budgetResults.productPurchases[product.name] || 0} purchases or {
                            budgetResults.productPortions[product.name]} portions
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Total Cost</h3>
                <p>{budgetResults.totalCost}</p>
                {
                    budgetResults.totalCost < budget.budgetConfig.maxCost ? <p>Money left {budget.budgetConfig.maxCost - budgetResults.totalCost}</p>   :
                    budgetResults.totalCost > budget.budgetConfig.maxCost ? <p>Money overspent {budgetResults.totalCost - budget.budgetConfig.maxCost}</p> :
                    null
                }
            </div>
            <div>
                <h3>Total Portions</h3>
                <p>{budgetResults.portions}</p> 
                {
                    budgetResults.portions < budget.budgetConfig.minPortions ? <p>Portion deficiency {budget.budgetConfig.minPortions - budgetResults.portions}</p> :
                    budgetResults.portions > budget.budgetConfig.minPortions ? <p>Portion surplus {budgetResults.portions - budget.budgetConfig.minPortions}</p> :
                    null
                } 
            </div>
        </div>
    );
}