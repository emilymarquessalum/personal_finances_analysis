'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Category } from '../data/model/category';
import { Budget } from '../data/model/budget';
import { v4 as uuidv4 } from 'uuid';

interface BudgetCategoriesContextValue {
    categories: Category[];
    budgets: Budget[];
    addCategory: (category: Category) => void;
    updateCategory: (category: Category) => void;
    deleteCategory: (categoryId: string) => void;
    addBudget: (budget: Budget) => void;
    updateBudget: (budget: Budget) => void;
    deleteBudget: (budgetId: string) => void;
    getBudgetById: (budgetId: string) => Budget | undefined;
    getCategoryById: (categoryId: string) => Category | undefined;
    getSubcategories: (parentId: string) => Category[];
    getRootCategories: () => Category[];
}

const BudgetCategoriesContext = createContext<BudgetCategoriesContextValue | null>(null);

export function useBudgetCategories() {
    const context = useContext(BudgetCategoriesContext);
    if (!context) {
        throw new Error('useBudgetCategories must be used within a BudgetCategoriesProvider');
    }
    return context;
}

interface BudgetCategoriesProviderProps {
    children: React.ReactNode;
}

export function BudgetCategoriesProvider({ children }: BudgetCategoriesProviderProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [budgets, setBudgets] = useState<Budget[]>([]);

    const addCategory = (category: Category) => {
        setCategories(prev => [...prev, category]);
    };

    useEffect(() => {
        const storedCategories = localStorage.getItem('categories');
        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
        } else {
            const defaultCategories = [
                {
                    id: uuidv4(),
                    name: 'Alimentação',
                    budget: undefined,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    parentId: undefined
                },
                {
                    id: uuidv4(),
                    name: 'Transporte',
                    budget: undefined,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    parentId: undefined
                },
                {
                    id: uuidv4(),
                    name: 'Moradia',
                    budget: undefined,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    parentId: undefined
                },
            ];
            setCategories(defaultCategories);
        }
    }, []);

    const updateCategory = (updatedCategory: Category) => {
        setCategories(prev =>
            prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat)
        );
    };

    const deleteCategory = (categoryId: string) => {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    };

    const addBudget = (budget: Budget) => {
        setBudgets(prev => [...prev, budget]);
    };

    const updateBudget = (updatedBudget: Budget) => {
        setBudgets(prev =>
            prev.map(budget => budget.id === updatedBudget.id ? updatedBudget : budget)
        );

        // Update any categories that use this budget
        setCategories(prev =>
            prev.map(category => {
                if (category.budget?.id === updatedBudget.id) {
                    return {
                        ...category,
                        budget: updatedBudget,
                        updatedAt: new Date()
                    };
                }
                return category;
            })
        );
    };

    const deleteBudget = (budgetId: string) => {
        setBudgets(prev => prev.filter(budget => budget.id !== budgetId));

        // Remove budget reference from categories
        setCategories(prev =>
            prev.map(category => {
                if (category.budget?.id === budgetId) {
                    return {
                        ...category,
                        budget: undefined,
                        updatedAt: new Date()
                    };
                }
                return category;
            })
        );
    };

    const getBudgetById = (budgetId: string) => {
        return budgets.find(budget => budget.id === budgetId);
    };
    // Add new helper functions
    const getSubcategories = (parentId: string) => {
        return categories.filter(category => category.parentId === parentId);
    };

    const getRootCategories = () => {
        return categories.filter(category => !category.parentId);
    };
    
    const getCategoryById = (categoryId: string) => {
        return categories.find(category => category.id === categoryId);
    };

    return (
        <BudgetCategoriesContext.Provider value={{
            categories,
            budgets,
            addCategory,
            updateCategory,
            deleteCategory,
            addBudget,
            updateBudget,
            deleteBudget,
            getBudgetById,
            getCategoryById,
            getSubcategories,
            getRootCategories
        }}>
            {children}
        </BudgetCategoriesContext.Provider>
    );
}