import { Outlet } from 'react-router-dom'; // MUI

// import useMediaQuery from '@mui/material/useMediaQuery';

import MobileSidebar from '../components/MobileSidebar';
import OwnerDashboardSidebar from './OwnerDashboardSidebar';
// import DashboardHeader from './components/DashboardHeader';
// import LayoutBodyWrapper from './components/LayoutBodyWrapper';
// import LayoutSetting from '../layout-parts/LayoutSetting'; // DASHBOARD LAYOUT BASED CONTEXT PROVIDER

// import LayoutProvider from './context/layoutContext';

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Alert, Button, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Drawer } from '@mui/material';

import OwnerDrower from './OwnerDrower';

import { Span } from '../../components/typography';

// import Sidebar from './components/Sidebar'
import { Container } from '@mui/material';

import Box from '@mui/material/Box';

import ApiService from "../../services/apiServices/apiService"
import { useEffect, useState } from 'react';
import { RootState } from '../../services/store/store';
import { useAppDispatch, useAppSelector } from "../../services/store/hooks/hooks";
import { setUserDetails } from '../../services/store/slices/userSlice';
import Toast from '../../utils/toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function OwnerLayout({children}: any) {

  const [ loadingGenerate, setLoadingGenerate ] = useState(false);
  const userData: any = useAppSelector((state: RootState) => state.user)
  const {t} = useTranslation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(userData?.isLoading === false){
      if(userData?.userDetails?.role === "super_admin"){
        // Toast.showErrorMessage("You are not authorized to access this page.");
        navigate("/admindashboard");
      }
      if(userData?.isLoading === false && (!userData || userData == null || userData?.userDetails == null)){
        Toast.showErrorMessage("User Not Logged in Or Token Expired");
        navigate("/login");
      }
    }
  }, [userData])

  useEffect(() => {
    stripeConnectCheck();
  }, [])

  const stripeConnectCheck = async () => {
    try{
      let data = await ApiService.checkStripeConnect();
      if(data.data.is_enabled){
        dispatch(setUserDetails({
          ...userData,
          is_stripe_complete: true
        }));
      }else{
        // set stripe onboarding pending
        if(userData){
          dispatch(setUserDetails({
            ...userData.userDetails,
            is_stripe_complete: false
          }));
        }
      }
    }catch(e){
    }
  }

  const generateOnBoarding = async () => {
    try{
      setLoadingGenerate(true);
      let data = await ApiService.goToStripeOnBoarding();
      if(data.data.success){
        window.open(data.data.link, "__blank");
        Toast.showSuccessMessage(data.data.message);
      }else{
        Toast.showErrorMessage(data.data.message);
      }
    }catch(e){
    }
    finally{
      setLoadingGenerate(false);
    }
  }

  return (
    <>
    <Header />
    <Box sx={{width:'100%', height: "100%", flex:1, display:'flex', gap:0, position:'relative', backgroundColor:'rgb(253, 253, 255)',}}>
      {/* left */}
      <Box  position={'static'}  sx={{backgroundColor:'white.main', minWidth:' 240px', width:' 280px',  display:{xs:'none', md:'block'}, transition:'width 200ms ease 0s', borderRight: '1px dashed rgb(229, 231, 235)' }}>
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
    {
        userData && userData?.userDetails?.is_stripe_complete !== undefined && userData?.userDetails?.is_stripe_complete === false ?
        <Box sx={{position: "fixed", width: "300px", zIndex: 99999, bottom: { xs: 20, md: 40 }, right: { xs: 20, md: 40 }}}>
          <Alert severity="error">
            {t('stripe_vendor_message')}
            <a onClick={() => { generateOnBoarding() }}>{t('click_to_onboarding')}</a>
          </Alert>
        </Box>
        :''
      }
    <Footer />
    </>
  );
}