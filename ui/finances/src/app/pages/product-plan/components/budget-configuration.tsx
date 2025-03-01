
import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { ProductPlanConfig } from '../data/budget-config';

const BudgetConfiguration = ({ onSave, budgetConfig } : {
    onSave: (config: ProductPlanConfig) => void;
    budgetConfig: ProductPlanConfig | null;
}) => {
  const [maxCost, setMaxCost] = useState('');
  const [minPortions, setMinPortions] = useState(''); 

  const handleSave = () => {
    onSave({ maxCostPortions: parseFloat(maxCost), minPortions: parseInt(minPortions, 10),
 
     });
  };


  useEffect(() => {
    if (!budgetConfig) {
      return;
    }
    setMaxCost(budgetConfig.maxCostPortions.toString());
    setMinPortions(budgetConfig.minPortions.toString());
  }, [budgetConfig]);

  return (
    <Paper style={{ padding: 16, maxWidth: 400, margin: 'auto' }}>
      <h2>Budget Configuration</h2>
 
      <TextField
        label="Maximum Cost"
        type="number"
        value={maxCost}
        onChange={(e) => setMaxCost(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Minimum Portions"
        type="number"
        value={minPortions}
        onChange={(e) => setMinPortions(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
        Save Configuration
      </Button>
    </Paper>
  );
};

export default BudgetConfiguration;
