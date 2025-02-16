'use client';

import React from "react";
import DashboardPage from "../app/pages/dashboard/dashboard-page";
import { AccountSummaryProvider } from "./providers/account-summary-provider"; 
import { Box, Container } from "@mui/material"; 
import { MainNav } from "./layout/nav/main-nav";
import { AccountFinancesProvider } from "./providers/account-finances-provider";
import { NavBody } from "./layout/nav/nav-body";


export default function HomePage() {
  

  return (
      <NavBody 
      children={
        
        <main>
        <Container maxWidth="xl" sx={{ py: '64px' }}>
           
            <DashboardPage /> 
        </Container>
      </main>
      }
      />
  );
}
