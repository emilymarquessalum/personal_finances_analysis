
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Box, GlobalStyles } from "@mui/material";
import React from "react";
import { AccountSummaryProvider } from "./providers/account-summary-provider";
import { AccountFinancesProvider } from "./providers/account-finances-provider";
import { BudgetCategoriesProvider } from "./providers/budget-categories-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finances",
  description: "Manage your personal finances",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {



  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlobalStyles
          styles={{
            body: {
              '--MainNav-height': '56px',
              '--MainNav-zIndex': 1000,
              '--SideNav-width': '280px',
              '--SideNav-zIndex': 1100,
              '--MobileNav-width': '320px',
              '--MobileNav-zIndex': 1100,
            },
          }}
        />
        <AccountSummaryProvider>

          <BudgetCategoriesProvider>

            <AccountFinancesProvider>

              <Box
                sx={{
                  bgcolor: 'var(--mui-palette-background-default)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  minHeight: '100%',
                }}
              >
                {children}

              </Box>

            </AccountFinancesProvider>

          </BudgetCategoriesProvider>
        </AccountSummaryProvider>
      </body>
    </html>
  );
}
