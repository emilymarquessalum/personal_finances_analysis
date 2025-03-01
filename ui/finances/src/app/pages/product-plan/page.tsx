'use client';

import React, { useEffect } from "react";
import AddProductButton from "./components/add-product-button";

import { PortionsBasedProduct } from "./data/product";
import BudgetConfiguration from "./components/budget-configuration";
import { ProductPlanConfig } from "./data/budget-config";
import { Typography } from "@mui/material";
import { BudgetPlanResults } from "./components/budget-plan-results";
import ProductTable from "./components/product-table";
import { NavBody } from "../../layout/nav/nav-body";
import { ProductsPlan } from "./data/products-plan";
import ProductPlanList from "./product-plan-list";
import PortionBasedProductPlan from "./portion-based-product-plan";
import { ProductPlansProvider, useProductPlans } from "./providers/product-plans-provider";






export default function Page() {

   

    return (
        <ProductPlansProvider>

            <NavBody
                children={
                    <Body/>
                }
            />
        </ProductPlansProvider>

    );
}

function Body() {

    const { productPlan } = useProductPlans();

    return (

        <div className="p-4 space-y-4">

        {productPlan === null || productPlan === undefined ?
            <ProductPlanList /> :

            <PortionBasedProductPlan />
        }

    </div>
    );
}