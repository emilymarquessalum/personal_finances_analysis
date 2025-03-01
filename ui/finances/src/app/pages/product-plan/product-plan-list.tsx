import { Dialog, Typography, Card, CardContent, Button } from "@mui/material";
import { useProductPlans } from "./providers/product-plans-provider";
import { ProductPlanType, ProductsPlan } from "./data/products-plan";
import { ProductPlanConfig } from "./data/budget-config";
import { productFromJson } from "./data/product";
import React from "react";


const productPlanTypes: { type: ProductPlanType; name: string; description: string }[] = [
    { type: "portion", name: "Portion-Based", description: "Used for products measured in portions (mainly proteins that will be used to make the meals). Helps track how many to buy, and choosing how to buy efficiently." },
    { type: "stock", name: "Stock-Based", description: "Used for products that need to be stocked and replenished over time (accounts for everything else you would buy in groceries)" },
    { type: "uses", name: "Usage-Based", description: "Used for products with limited uses, (eating out). Used mostly as an extra-portion-source to add to portion based plan calculations." },
];

const ProductPlanTypeCard = ({ type, name, description, selected, onSelect }: {
    type: ProductPlanType;
    name: string;
    description: string;
    selected: boolean;
    onSelect: (type: ProductPlanType) => void;
}) => (
    <Card 
        onClick={() => onSelect(type)} 
        sx={{
            margin: 1, 
            padding: 2, 
            cursor: "pointer", 
            border: selected ? "2px solid blue" : "1px solid gray", 
            backgroundColor: selected ? "#e3f2fd" : "white",
            maxWidth: 250, // Optional: set a max width for better wrapping behavior
        }}
    >
        <CardContent>
            <Typography variant="h6">{name}</Typography>
            <Typography 
                variant="body2" 
                sx={{ 
                    whiteSpace: "normal", // Ensures the text wraps
                    overflow: "hidden", // Optional: hides overflow if necessary
                    textOverflow: "ellipsis", // Optional: adds ellipsis if the text is too long
                }}
            >
                {description}
            </Typography>
        </CardContent>
    </Card>
);

export default function ProductPlanList() {
    const { productPlans, addProductPlan, setProductPlan, setProductPlans } = useProductPlans();
    const [isAdding, setIsAdding] = React.useState(false);
    const [newProductPlanName, setNewProductPlanName] = React.useState("");
    const [productPlanType, setProductPlanType] = React.useState<ProductPlanType | null>(null);
    const [currentPortionPlan, setCurrentPortionPlan] = React.useState<ProductsPlan | null>(null);
    const [currentStockPlan, setCurrentStockPlan] = React.useState<ProductsPlan | null>(null);

    return (
        <div>
            <Typography variant="h4">Budgets</Typography>
            
            <Typography variant="h6">Currently-Used Portion Plan: {currentPortionPlan ? currentPortionPlan.name : "None"}</Typography>
            <Typography variant="h6">Currently-Used Stock Plan: {currentStockPlan ? currentStockPlan.name : "None"}</Typography>
            
            <Button onClick={() => {
                setIsAdding(true);
                setProductPlanType("portion");

            }}>Add Budget</Button>
            <ul>
                {productPlans.map((plan, index) => (
                    <li key={index}>
                        <Button onClick={() => {
                            if (plan.type === "portion") setCurrentPortionPlan(plan);
                            if (plan.type === "stock") setCurrentStockPlan(plan);
                        }}>Select</Button>
                        <Button onClick={() => setProductPlan(plan)}>Edit</Button>
                        {plan.name}
                    </li>
                ))}
            </ul>

            <Dialog open={isAdding} onClose={() => setIsAdding(false)}>
                <div style={{ padding: 16 }}>
                    <Typography variant="h5">Add Product Plan</Typography>
                    <input type="text" name="name" value={newProductPlanName} onChange={(e) => setNewProductPlanName(e.target.value)} placeholder="Enter plan name" />
                    <Typography variant="h6" style={{ marginTop: 16 }}>Select Product Plan Type</Typography>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {productPlanTypes.map(({ type, name, description }) => (
                            <ProductPlanTypeCard key={type} type={type} name={name} description={description} selected={productPlanType === type} onSelect={setProductPlanType} />
                        ))}
                    </div>
                    <Button onClick={() => {
                        addProductPlan(new ProductsPlan(newProductPlanName,
                            productPlanType!,
                            new ProductPlanConfig(0, 0), []));
                        setIsAdding(false); 
                    }}>Add</Button>
                </div>
            </Dialog>
        </div>
    );
}
