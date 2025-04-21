import { Outlet, useNavigate } from 'react-router-dom'; // MUI

// import useMediaQuery from '@mui/material/useMediaQuery';

// import MobileSidebar from '../components/MobileSidebar';
import AdminDashboardSidebar from './AdminDashboardSidebar';
// import DashboardHeader from './components/DashboardHeader';
// import LayoutBodyWrapper from './components/LayoutBodyWrapper';
// import LayoutSetting from '../layout-parts/LayoutSetting'; // DASHBOARD LAYOUT BASED CONTEXT PROVIDER

// import LayoutProvider from './context/layoutContext';

import AdminHeader from '../components/AdminHeader'
// import AdminFooter from '../components/AdminFooter'
// import Sidebar from './components/Sidebar'
import { Box, Container, useMediaQuery } from '@mui/material';
import { useAppSelector } from '../../services/store/hooks/hooks';
import { RootState } from '../../services/store/store';
import { useEffect } from 'react';
import Toast from '../../utils/toast';

export default function AdminLayout({children}: any) {

  const userData: any = useAppSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(userData?.isLoading === false){
      console.log('userData: ', userData);
      if(userData?.userDetails?.role === "seller"){
        Toast.showErrorMessage("You are not authorized to access this page.");
        navigate("/dashboard");
      }
      if(userData?.isLoading === false && (!userData || userData == null || userData?.userDetails == null)){
        Toast.showErrorMessage("User Not Logged in Or Token Expired");
        navigate("/adminlogin");
      }
    }
  }, [userData])

    return (
      <>
     
     <Box sx={{width:'100%', height: "100%", flex:1, display:'flex', flexDirection:'column', gap:0, position:'relative', backgroundColor:'rgb(253, 253, 255)',}}>
        {/* left */}
        {
          userData?.userDetails && userData?.userDetails !== null && userData?.userDetails?.role === "super_admin" ?
          <Box sx={{backgroundColor:'white.main',  minWidth:' 240px', width:' 280px', height: "100%",  display:{xs:'none', md:'block'}, position:'fixed', top:0, left:0, transition:'width 200ms ease 0s', borderRight: '1px dashed rgb(229, 231, 235)'}}>
            <AdminDashboardSidebar />
          </Box>
          : ''
        }
        {/* right */}
        <Box  sx={{marginLeft: {xs:0, md:'280px'}, transition: 'margin-left 0.3s ease-in-out 0s', flex:1, }}>
        <Container maxWidth="lg" sx={{ pb:4}}>
            <AdminHeader />

          {children || <Outlet />}
        </Container>
          
          
        </Box>

      </Box>
      {/* <AdminFooter /> */}
      </>
    );
}
