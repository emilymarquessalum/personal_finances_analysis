import { Category } from "@/app/data/model/category";
import { useBudgetCategories } from "@/app/providers/budget-categories-provider";
import { Remove } from "@mui/icons-material";
import { Button, Card, List, Typography } from "antd";
import React, { useState } from "react";
import { Edit2 } from "react-feather";
import AddBudgetModal from "../popups/add-budget-modal";

export default function CategoryCard({
    category,
    handleEdit,
    handleDelete,
}: {
    category: Category,
    handleEdit: (category: Category) => void,
    handleDelete: (category: Category) => void,
}): React.ReactElement {
    const { categories, updateCategory } = useBudgetCategories();
    const [showAddBudget, setShowAddBudget] = useState(false);

    const parent = categories.find(c => c.id === category.parentId);

    const parentElement = (
        parent === undefined ?
            <div>
            </div> :
            <div>
                <p>
                    {parent.name}
                </p>
            </div>
    );
    return (
        <>
            <List.Item>
                <Card
                    title={
                        (






                            <p>
                                {parentElement}
                                {category.name} 
                            </p>

                        )
                    }
                    extra={
                        <div>
                            <Button
                                type="text"
                                icon={<Edit2 className="w-4 h-4" />}
                                onClick={() => handleEdit(category)}
                            />
                            <Button
                                type="text"
                                icon={<Remove className="w-4 h-4" />}
                                onClick={() => handleDelete(category)}
                            />
                        </div>
                    }
                    style={
                        {
                            borderBottom: '20px solid '
                                + (
                                    category.color === null
                                        || category.color === undefined
                                        ?
                                        "#ece6d5" :
                                        "#" + category.color
                                )
                            ,
                        }
                    }
                >
                    <p>{category.description}</p>
                    {category.budget && (
                        <div className="mt-2">
                            <Typography.Text type="secondary">
                                Budget: ${category.budget.maxValue}
                            </Typography.Text>
                        </div>
                    )}

                    {!category.budget && (
                        <Button onClick={() => setShowAddBudget(true)}>
                            Add Budget
                        </Button>
                    )}
                </Card>
            </List.Item>

            <AddBudgetModal
                visible={showAddBudget}
                onCancel={() => setShowAddBudget(false)}
                onAdd={(budget) => {
                    updateCategory({
                        ...category,
                        budget,
                        updatedAt: new Date()
                    });
                    setShowAddBudget(false);
                }}
            />
        </>
    );
}