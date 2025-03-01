'use client';
import { useAccountSummary } from "@/app/providers/account-summary-provider";
import { CardContent, Stack } from "@mui/material";
import { Card } from "antd";
import React from "react";
import { ResultMetricContainer } from "../../product-plan/components/result-metric-container";


export function AccountSummaryCard({
    topAppending,
    bottomAppending
} : {
    topAppending?: React.ReactNode;
    bottomAppending?: React.ReactNode;
}
) {
    
    const accountSummary = useAccountSummary();
     
    let history = accountSummary.historyOfPreviousMonths?.keys().toArray() ?? [];

    return (
        <Card
        style={{
            
            margin: "0",
            padding: "0",
        }}
        >
        <CardContent
        style={{
            padding: "0",
            margin: "0",
        }}
        className=" text-center"> 

        {topAppending}
            <Stack direction="row" alignItems="center" justifyContent="space-around">
  
            <ResultMetricContainer 
            borderColor={"B0BEC5"}
            label="Start Balance" value={accountSummary.startBalance} 
            tip={
                history.map((month, index) => {

                    const value = ((accountSummary.historyOfPreviousMonths?.get(month) ?? 0)
                    - (
                        index == 0 ? 0 :  
                        accountSummary.historyOfPreviousMonths?.get(
                            history[index - 1]  
                        ) ?? 0
                    )
                    );

                    return (
                        (
                    
                            <p key={index}>
                                
                                {month}: { value >= 0 ? "+" : "-" }{value.toFixed(2)
                                }
                                
                            </p>
                        )
                    );
                }) 
            }
            /> 
            <ResultMetricContainer 
            borderColor="4A90E2"
            label="Current Balance" value={accountSummary.currentBalance} />  
            <ResultMetricContainer
            borderColor="FFC107" 
            label="Final Balance" value={(accountSummary.startBalance + accountSummary.income - accountSummary.expenses)} /> 
             
            </Stack> 
          
           {false &&    <Stack direction="row" alignItems="center" justifyContent="space-around">
            <ResultMetricContainer
            borderColor="26A69A"
            label="Income" value={accountSummary.income} />
            <ResultMetricContainer
            borderColor="D32F2F"
            label="Expenses" value={accountSummary.expenses} />
            
            </Stack>}

            {bottomAppending}
        </CardContent>
    </Card>
    );
}