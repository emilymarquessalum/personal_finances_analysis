import { Budget } from "./budget";

export interface Category {
    id: string;
    name: string;
    color?: string;
    description?: string;
    parentId?: string;
    budget?: Budget;
    createdAt: Date;
    updatedAt: Date;
}