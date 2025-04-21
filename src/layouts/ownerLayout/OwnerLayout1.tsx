import { Outlet } from 'react-router-dom'; // MUI

// import useMediaQuery from '@mui/material/useMediaQuery';

import MobileSidebar from '../components/MobileSidebar';
import OwnerDashboardSidebar from '../components/OwnerDashboardSidebar';
// import DashboardHeader from './components/DashboardHeader';
// import LayoutBodyWrapper from './components/LayoutBodyWrapper';
// import LayoutSetting from '../layout-parts/LayoutSetting'; // DASHBOARD LAYOUT BASED CONTEXT PROVIDER

// import LayoutProvider from './context/layoutContext';

import Header from '../components/Header'
import Footer from '../components/Footer'
import { IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Drawer } from '@mui/material';

import OwnerDrower from './OwnerDrower';

import { Span } from '../../components/typography';

// import Sidebar from './components/Sidebar'
import { Box, Container, useMediaQuery } from '@mui/material';
import { useState } from 'react';

export default function OwnerLayout({children}: any) {
 
    return (
      <>
      <Header />
      <Box sx={{width:'100%', height: "100%", flex:1, display:'flex', gap:0, position:'relative', backgroundColor:'rgb(253, 253, 255)',}}>
        {/* left */}
        <Box sx={{backgroundColor:'white.main', minWidth:' 240px', width:' 280px',  display:{xs:'none', md:'block'}, transition:'width 200ms ease 0s', borderRight: '1px dashed rgb(229, 231, 235)'}}>
          <OwnerDashboardSidebar />
        </Box>
        {/* right */}
        <Box  sx={{ transition: 'margin-left 0.3s ease-in-out 0s', flex:1, maxWidth:'100%'}}>
          <Container maxWidth="lg" sx={{ pt:4, pb:4}}>
            <OwnerDrower />
            {children || <Outlet />}
          </Container>
        </Box>

      </Box>
      <Footer />
      </>
    );
}