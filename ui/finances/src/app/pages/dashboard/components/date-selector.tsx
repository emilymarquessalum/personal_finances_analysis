'use client';

import { Button } from "antd";
import { ChevronLeft, ChevronRight } from "react-feather";
import React from "react"; 
import { AccountFinancesContext } from "@/app/providers/account-finances-provider";



export function DateSelector() {

    const accountItems = React.useContext(AccountFinancesContext);
    
    
    if (!accountItems) return <p>Loading...</p>;

    const {currentDate, goToNextMonth, goToPreviousMonth } = accountItems;

    const formatDate = (date: Date) => date.toLocaleDateString("en-US", { year: "numeric", month: "long" });

    return (
        <div className="flex justify-center items-center space-x-4">
            <Button onClick={goToPreviousMonth} variant="outlined">
                <ChevronLeft />
            </Button>
            <span className="text-lg font-semibold">{formatDate(currentDate)}</span>
            <Button onClick={goToNextMonth} variant="outlined">
                <ChevronRight />
            </Button>
        </div>
    );
}