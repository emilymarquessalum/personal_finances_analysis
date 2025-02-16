 
import { paths } from '@/paths';
import { NavItemConfig } from './nav';

export const navItems = [
  { key: 'home', title: 'Home', href: paths.home, icon: 'chart-pie' }, 
  { key: 'budget-plan', title: 'Budget Plan', href: paths.budgetPlan, icon: 'chart-line' },
] satisfies NavItemConfig[];
