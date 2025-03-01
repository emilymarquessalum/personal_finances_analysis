'use client';

import { Button } from "antd";
import { ChevronLeft, ChevronRight } from "react-feather";
import React from "react";
import { AccountFinancesContext } from "@/app/providers/account-finances-provider";
import { Stack } from "@mui/material";



export function DateSelector() {

    const accountItems = React.useContext(AccountFinancesContext);

    if (!accountItems) return <p>Loading...</p>;

    const { currentDate, goToNextMonth, goToPreviousMonth, realCurrentDate, endMonthEarlier } = accountItems;
    const formatDate = (date: Date) => date.toLocaleDateString("en-US", { year: "numeric", month: "long" });

    return (
        <div className="flex justify-center items-center space-x-4">
            <Stack>
                <div style={{height: '40px'}} className="flex justify-center gap-2">
                    {(currentDate.getMonth() !== realCurrentDate.getMonth() ||
                        currentDate.getFullYear() !== realCurrentDate.getFullYear()) &&
                    <Button
                        style={{marginBottom: "1rem"}}
                        onClick={() => accountItems.goToCurrentMonth()}
                        variant="outlined"
                    >
                        Go to Current Month
                    </Button>}
                    
                    {currentDate.getMonth() === realCurrentDate.getMonth() &&
                     currentDate.getFullYear() === realCurrentDate.getFullYear() &&
                    <Button
                        style={{marginBottom: "1rem"}}
                        onClick={endMonthEarlier}
                        variant="outlined"
                        type="primary"
                        danger
                    >
                        End Month Earlier
                    </Button>}
                </div>

                <Stack direction="row" alignItems="center" justifyContent="center">
                    <Button onClick={goToPreviousMonth} variant="outlined">
                        <ChevronLeft />
                    </Button>
                    <span 
                        style={{margin: "0 1rem"}}
                        className="text-lg font-semibold"
                    >
                        {formatDate(currentDate)}
                    </span>
                    <Button onClick={goToNextMonth} variant="outlined">
                        <ChevronRight />
                    </Button>
                </Stack>
            </Stack>
        </div>
    );
}