'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductsPlan } from "../data/products-plan";
import { PortionsBasedProduct, Product } from "../data/product";
import { ProductPlanConfig } from "../data/budget-config";


// Define context value interface
export interface ProductPlansContextValue {
    productPlans: ProductsPlan[];
    productPlan: ProductsPlan | null;
    
    setProductPlans: (plans: ProductsPlan[]) => void;
    setProductPlan: (plan: ProductsPlan | null) => void;
    addProductPlan: (plan: ProductsPlan) => void;
    updateProductPlan: (updatedPlan: ProductsPlan) => void;
    removeProductPlan: (planName: string) => void;
    
    changeConfig: (config: ProductPlanConfig) => void;
    addProduct: (product: Product) => void;
}

// Create context
const ProductPlansContext = createContext<ProductPlansContextValue | undefined>(undefined);

// Custom hook to use the context
export function useProductPlans(): ProductPlansContextValue {
    const context = useContext(ProductPlansContext);
    if (!context) {
        throw new Error('useProductPlans must be used within a ProductPlansProvider');
    }
    return context;
}

// Provider component
export function ProductPlansProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
    const [productPlans, setProductPlans] = useState<ProductsPlan[]>([]);
    const [productPlan, setProductPlan] = useState<ProductsPlan | null>(null);

    // Load productPlans from local storage
    useEffect(() => {
        const storedProductPlans = localStorage.getItem('productPlans');
        if (storedProductPlans) {

            console.log("storedProductPlans", storedProductPlans);
            try {

                const parsedPlans = JSON.parse(storedProductPlans).map((plan: any) => 
                    new ProductsPlan(
                        plan.name, 
                        plan.type,
                        plan.budgetConfig,
                        plan.products.map((product: any) => 
                            new PortionsBasedProduct(
                                product.name, 
                                product.cost, 
                                product.representativePortions, 
                                product.quality
                            )
                        )
                    )
                );
                setProductPlans(parsedPlans);
            } catch (error) { 
                console.error("Error parsing product plans from local storage:", error);
            }
        }
    }, []);

    // Save productPlans to local storage when state changes
    useEffect(() => {
        if (productPlans.length === 0) {
            //localStorage.removeItem('productPlans');
            return;
        }
        localStorage.setItem('productPlans', JSON.stringify(productPlans));
    }, [productPlans]);

    // Methods to modify state
    const addProductPlan = (plan: ProductsPlan) => {
        setProductPlans((prevPlans) => [...prevPlans, plan]);
    };

    const updateProductPlan = (updatedPlan: ProductsPlan) => {
        setProductPlans((prevPlans) =>
            prevPlans.map((plan) => (plan.name === updatedPlan.name ? updatedPlan : plan))
        );
        setProductPlan(updatedPlan);
    };

    const removeProductPlan = (planName: string) => {
        setProductPlans((prevPlans) => prevPlans.filter((plan) => plan.name !== planName));
    };

    const changeConfig = (config: ProductPlanConfig) => {
        if (!productPlan) {
            throw new Error('No product plan selected');
        }
        const updatedPlan = new ProductsPlan(productPlan.name, 
            productPlan.type,
            config, productPlan.products);
        updateProductPlan(updatedPlan);
    }  

    const addProduct = (product: Product) => {
        if (!productPlan) {
            throw new Error('No product plan selected');
        }
        const updatedProducts = [...productPlan.products, product];
        const updatedPlan = new ProductsPlan(productPlan.name,
            productPlan.type,
            productPlan.config, updatedProducts);
        updateProductPlan(updatedPlan);
    }

    

    return (
        <ProductPlansContext.Provider value={{ 
            productPlans, productPlan, setProductPlan, addProductPlan, updateProductPlan, removeProductPlan,
            changeConfig,
            addProduct,
            setProductPlans
        }}>
            {children}
        </ProductPlansContext.Provider>
    );
}
