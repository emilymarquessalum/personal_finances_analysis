import { Checkbox, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";



export default function OtherProducts() {



    const [costSpentOnOtherProducts, setCostSpentOnOtherProducts] = useState('');
    const [useListOfProducts, setUseListOfProducts] = useState(false);

    const [products, setProducts] = useState([]);

    return (
        <Paper style={{ padding: 16, maxWidth: 400, margin: 'auto' }}>
        <h2>Budget on other products</h2>

            <Stack direction="row" spacing={1}>
                <Checkbox
                    checked={useListOfProducts}
                    onChange={(e) => setUseListOfProducts(e.target.checked)}>
                </Checkbox>
                <p>Use a list of products</p>
            </Stack> 
              {
                !useListOfProducts &&
                <TextField
                label="Cost Spent on Other Products"
                type="number"
                value={costSpentOnOtherProducts}
                onChange={(e) => setCostSpentOnOtherProducts(e.target.value)}
                fullWidth
                margin="normal"/>}

                {useListOfProducts &&
                    <div>
                        
                    </div>
                }
        </Paper>
    );
}