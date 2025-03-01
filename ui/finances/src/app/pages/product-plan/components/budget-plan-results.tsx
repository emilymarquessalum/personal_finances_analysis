import React from 'react'
import { ProductsPlan } from '../data/products-plan';
import { ResultMetricContainer } from './result-metric-container';
import { Stack } from '@mui/material';



type BudgetPlanResultsProps = {
    productPlan: ProductsPlan;
}
export const BudgetPlanResults = ({ productPlan }: BudgetPlanResultsProps) => {

    const productPlanResults =
    productPlan.config === null || productPlan.config === undefined ?
    null :
    productPlan.generateResults(productPlan.config.minPortions, productPlan.config.maxCostPortions);

    if (productPlanResults === null) {
        return (
            <div>  
                <p>Results are not available</p>
            </div>
        );
    }
    return (
        <div>
 
            <Stack spacing={2} direction='row' style={{ justifyContent: 'space-around' }}> 
                <ResultMetricContainer label='Total Cost'
                    value={
                        productPlanResults!.totalCost
                    } maxValue={productPlan.config!.maxCostPortions}
                />
                
                <ResultMetricContainer label='Total Portions'
                    value={
                        productPlanResults!.portions
                    } minValue={productPlan.config!.minPortions}
                />
                <ResultMetricContainer label='Average quality'
                    value={
                        productPlanResults!.averageQuality
                    }  
                />
            </Stack> 
        </div>
    );
}