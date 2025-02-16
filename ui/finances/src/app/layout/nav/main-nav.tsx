'use client';

import * as React from 'react'; 
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack'; 
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';  
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material'; 
import { MobileNav } from './mobile-nav'; 

export function MainNav(
  { openNav, setOpenNav }: { openNav: boolean; setOpenNav: React.Dispatch<React.SetStateAction<boolean>> }
): React.JSX.Element { 

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        > 
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton 
            color='inherit'
              onClick={(): void => {
                setOpenNav(!openNav);
              }} 
            >
             {openNav  ? 
              <ChevronLeftIcon /> :
             <ListIcon />} 
            </IconButton>
            
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
              {/*Profile*/}
          </Stack>
        </Stack>
      </Box>  
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
