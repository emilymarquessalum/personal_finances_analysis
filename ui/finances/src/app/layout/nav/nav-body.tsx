
import { Box } from '@mui/material';
import React from 'react'
import { MainNav } from './main-nav';



type Props = {
    children: React.ReactNode;
}
export const NavBody = ({children}: Props) => {


    
    const [openNav, setOpenNav] = React.useState<boolean>(false); 

    return ( 
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', 
        
            pl:
              openNav ?
              'var(--SideNav-width)' : '0px'  }}>

                
            <MainNav  openNav={openNav} setOpenNav={setOpenNav}/>
            {children}
                
          </Box>
    );
}