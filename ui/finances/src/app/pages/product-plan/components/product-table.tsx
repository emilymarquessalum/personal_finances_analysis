import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Product, BudgetStockProduct, PortionsBasedProduct } from '../data/product';

const ProductTable = ({ products, purchases }: { products: Product[], 
  purchases?: { [key: string]: number }
 }) => {
  // Determine product type based on the first product
  const hasPortions = products.some(product => product instanceof PortionsBasedProduct);
  const hasStock = products.some(product => product instanceof BudgetStockProduct);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Cost</TableCell>
            {hasPortions && <TableCell>Representative Portions</TableCell>}
            {hasPortions && <TableCell>Quality</TableCell>}
            {hasStock && <TableCell>Time Before Replenishment (Days)</TableCell>}
            {purchases && <TableCell>Purchases</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.cost}</TableCell>
              {product instanceof PortionsBasedProduct && (
                <>
                  <TableCell>{(product as PortionsBasedProduct).representativePortions}</TableCell>
                  <TableCell>{(product as PortionsBasedProduct).quality}</TableCell>
                </>
              )}
              {product instanceof BudgetStockProduct && (
                <TableCell>{(product as BudgetStockProduct).timeBeforeReplenishmentInDays}</TableCell>
              )}

              {purchases && <TableCell>{purchases[product.name] || 0
                 } (or {(purchases[product.name] || 0) * (product as PortionsBasedProduct).representativePortions} portions)</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
