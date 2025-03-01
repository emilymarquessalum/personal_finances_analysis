import { Typography } from "@mui/material";
import BudgetConfiguration from "./components/budget-configuration";
import ProductTable from "./components/product-table";
import { ProductPlanConfig } from "./data/budget-config";
import { ProductsPlan } from "./data/products-plan";
import { useProductPlans } from "./providers/product-plans-provider";
import { BudgetPlanResults } from "./components/budget-plan-results";
import AddProductButton from "./components/add-product-button";
import { PortionsBasedProduct } from "./data/product";





export default function PortionBasedProductPlan() {


    const { productPlans,   setProductPlan, productPlan, changeConfig, addProduct } = useProductPlans();
    
    const budgetResults = 
    productPlan!.config === null || productPlan!.config === undefined ?
    null :
    productPlan!.generateResults(productPlan!.config.minPortions, productPlan!.config.maxCostPortions);

    return (
        <div>

                            <button onClick={() => {
                                setProductPlan(null);
                            }}>Back</button>
                            <BudgetConfiguration
                                budgetConfig={productPlan!.config}
                                onSave={function (config: ProductPlanConfig): void {

                                    changeConfig(config);
                                }} />
                                
                            <Typography variant="h4" style={
                                {
                                    paddingTop: '40px'
                                }
                            }>Constant Portions</Typography>
                            <AddProductButton onAdd={
                                (name, cost, representativePortions, quality, quantity) => {

                                    const newProduct = new PortionsBasedProduct(name, parseFloat(cost), parseInt(representativePortions), quality);
                                    
                                    addProduct(newProduct);
                                }
                            } />
                            <ProductTable products={productPlan!.products}/>
                            <Typography variant="h4" style={
                                {
                                    paddingTop: '40px'
                                }
                            }>Choice Portions</Typography>
                            <AddProductButton onAdd={
                                (name, cost, representativePortions, quality) => {

                                    const newProduct = new PortionsBasedProduct(name, parseFloat(cost), parseInt(representativePortions), quality);
                                    
                                    addProduct(newProduct);
                                }
                            } />
                            <ProductTable products={productPlan!.products}
                            purchases={budgetResults?.productPurchases}
                            />

                            <Typography variant="h4" style={
                                {
                                    paddingTop: '40px'
                                }
                            }>Results</Typography>
                            <BudgetPlanResults productPlan={productPlan!} />

                        </div>
    );
}