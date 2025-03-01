import { AccountItem } from "@/app/data/model/account-item";
import { useBudgetCategories } from "@/app/providers/budget-categories-provider";
import { Card, CardContent, Chip, ListItem, Stack } from "@mui/material";
import { Button, Typography } from "antd";
import { Trash2 } from "lucide-react";

export default function FinanceItemCard({ index, item, onDelete, onEdit, onConfirm }: {
    index: number;
    item: AccountItem;
    onConfirm: () => void;
    onEdit: (item: AccountItem) => void;
    onDelete: (index: number) => void;
}) {

    const categoryId = item.categoryId;

    const categories = useBudgetCategories().categories;
    const category = categories.find(c => c.id === categoryId);

    let subcategory = undefined;
    if(category !== undefined) {

        const subcategoryId = item.subcategoryId;
        const subcategories = useBudgetCategories().getSubcategories(category.id);
        subcategory = subcategories.find(s => s.id === subcategoryId);
    }

    return (
        <Card className="w-full p-4 flex justify-between items-center shadow-md border border-gray-200">
            <CardContent className="flex w-full justify-between items-center p-0">


                <Button
                    onClick={() => {
                        onConfirm();
                    }}
                >
                    {item.confirmed ? "Efetivado" : "Efetivar"}

                </Button>

                <Stack>
                    <span className="text-gray-700 font-medium">{item.description}</span>
                    <Typography >
                        {item.date.toLocaleDateString()}
                    </Typography>
                    {
                        category &&
                        <Chip 
                        style={
                            {
                                backgroundColor: 
                                "#"+category.color 
                            }
                        }
                        label={category!.name}></Chip>
                        
                      
                    }
                    {
                        subcategory &&
                          <Chip 
                          style={
                              {
                                  backgroundColor: 
                                  "#"+subcategory.color 
                              }
                          }
                          label={subcategory!.name}></Chip> 
                          
                          
                    }
                </Stack>
                <span className={
                    item.type === "expense"
                        ? "text-red-600 font-semibold"
                        : "text-green-600 font-semibold"
                }>
                    {item.type === "expense" ? "-" : "+"}${item.amount.toFixed(2)}
                </span>
                <Button
                    color="primary"
                    onClick={
                        () => {
                            onEdit(item);
                        }
                    }
                >
                    Edit
                </Button>
                <Button
                    color="danger"
                    onClick={() => onDelete(index)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    );
}
