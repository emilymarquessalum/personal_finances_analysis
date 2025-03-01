 
import { paths } from '@/paths';
import { NavItemConfig } from './nav';
import { title } from 'process';

export const navItems = [
  { key: 'home', title: 'Home', href: paths.home, icon: 'chart-pie' }, 
  { key: "categories", title:"Categories", href: paths.budgetsAndCategories, icon: 'list' },
  { key: 'saving-boxes', title: 'Saving Boxes', href: paths.savingBoxes, icon: 'piggy-bank' },
  { key: 'budget-plan', title: 'Grocery Planning', icon: 'chart-line', 
      children: [ 
        {
          key: 'product-plans',
          href: paths.productPlan, 
          title: 'Plans'
        },
        {
          key: 'product-stock',
          href: paths.productStock, 
          title: 'Stock'
        }
      ]
   },

   { key: 'about', title: 'About', href: paths.about, icon: 'info'}
] satisfies NavItemConfig[];
