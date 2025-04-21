import { Outlet } from 'react-router-dom'; // MUI

// import useMediaQuery from '@mui/material/useMediaQuery';

// import MobileSidebar from './components/MobileSidebar';
// import DashboardHeader from './components/DashboardHeader';
// import LayoutBodyWrapper from './components/LayoutBodyWrapper';
// import LayoutSetting from '../layout-parts/LayoutSetting'; // DASHBOARD LAYOUT BASED CONTEXT PROVIDER

// import LayoutProvider from './context/layoutContext';

import Header from '../components/Header'
import Footer from '../components/Footer'
// import Sidebar from './components/Sidebar'
import { Box } from '@mui/material';

export default function MainLayout({children}: any) {
    // const downLg = useMediaQuery(theme => theme.breakpoints.down('lg'));
    return (
      <>
      <Header />
      {/* <Sidebar /> */}
      <Box component="main" sx={{display: "flex", justifyContent:"center", alignItems: "center"}}>
        {children || <Outlet />}
      </Box>
      <Footer />
      </>
    );
}