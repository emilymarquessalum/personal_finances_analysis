'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';
import { paths } from '@/paths';
import { NavItemConfig } from './nav';
import { navIcons } from './nav-icons';
import { isNavItemActive } from './is-nav-item-active';
import { Logo } from '../logo';
import { navItems } from './config';

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
  items?: NavItemConfig[];
}

export function MobileNav({ open, onClose }: MobileNavProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Drawer
      variant="persistent"
      PaperProps={{
        sx: {
          bgcolor: 'var(--MobileNav-background)',
          color: 'var(--MobileNav-color)',
          display: 'flex',
          flexDirection: 'column',
          width: 'var(--SideNav-width)',
          zIndex: 'var(--MobileNav-zIndex)',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      }}
      onClose={onClose}
      open={open}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
          <Logo color="light" height={32} width={122} />
        </Box>
      </Stack>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        {renderNavItems({ pathname, items: navItems })}
      </Box>
    </Drawer>
  );
}

 
interface NavItemProps {
  item: NavItemConfig;  // Accept the entire NavItemConfig as a prop
  pathname: string;
}

function NavItem({ item, pathname }: NavItemProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const active = isNavItemActive({ ...item, pathname });  // Use the entire item
  const Icon = item.icon ? navIcons[item.icon] : null;

  if (item.children) {
    return (
      <li>
        <Box
          role="button"
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            p: '10px 16px',
            borderRadius: 1,
            bgcolor: open ? 'var(--NavItem-active-background)' : 'transparent',
            color: open ? 'var(--NavItem-active-color)' : 'var(--NavItem-color)',
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>{item.title}</Typography>
          <CaretUpDownIcon fontSize="var(--icon-fontSize-md)" />
        </Box>
        {open && (
          <Stack spacing={1} sx={{ pl: 3, mt: 1 }}>
            {item.children.map((child) => (
              <NavItem key={child.key} pathname={pathname} item={child} />
            ))}
          </Stack>
        )}
      </li>
    );
  }

  return (
    <li>
      <Box
        component={item.href ? (item.external ? 'a' : RouterLink) : 'div'}
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noreferrer' : undefined}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: '6px 16px',
          borderRadius: 1,
          color: active ? 'var(--NavItem-active-color)' : 'var(--NavItem-color)',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        {Icon && <Icon fontSize="var(--icon-fontSize-md)" />}
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, ml: 1 }}>{item.title}</Typography>
      </Box>
    </li>
  );
}

function renderNavItems({ items = [], pathname }: { items?: NavItemConfig[]; pathname: string }): React.JSX.Element {
  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {items.map((item) => (
        <NavItem key={item.key} pathname={pathname} item={item} /> // Pass the entire item here
      ))}
    </Stack>
  );
}
