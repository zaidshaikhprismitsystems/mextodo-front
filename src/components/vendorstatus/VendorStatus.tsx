import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container'; // CUSTOM COMPONENTS
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ApiService from '../../services/apiServices/apiService';
import Toast from '../../utils/toast';
import LoadingButton from '@mui/lab/LoadingButton';

export default function VendorStatus({status, checkUserVendor}: any) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  
  const resetApplication = async() => {
    try{
      setloading(true);
      await ApiService.resetVendor();
      Toast.showSuccessMessage("Vendor Profile Rejected Successfully. Email with reason sent.");
      checkUserVendor();
    }catch(e: any){
      console.log(e);
      Toast.showSuccessMessage(e.response.data.message || "Error Accepting Vendor");
      console.log(e);
    }finally{
      setloading(false);
    }
  }

  const displayMessage = (status: string) => {
    if (status === "pending") {
      return (
        <>
          <img src='/icon/pending.png' width={60} height={60} style={{marginBottom:10}} /> 
          <Typography variant='h6' textAlign={'center'} sx={{fontSize:18, fontWeight:500, color:grey[500] }}>{t("seller_pending_message")}</Typography>
        </>
      );
    }
    
    if (status === "suspended") {
      return  (
        <>
          <img src='/icon/suspended.png' width={60} height={60} style={{marginBottom:10}} /> 
          <Typography variant='h6' textAlign={'center'} sx={{fontSize:18, fontWeight:500, color:grey[500] }}>{t("seller_suspended_message")}</Typography>
        </>
      );
    }
    
    if (status === "disabled") {
      return (
        <>
          <img src='/icon/disabled.png' width={60} height={60} style={{marginBottom:10}} /> 
          <Typography variant='h6' textAlign={'center'} sx={{fontSize:18, fontWeight:500, color:grey[500] }}>{t("seller_disabled_message")}</Typography>
        </>
      );
    }
    
    if (status === "rejected") {
      return (
        <>
          <img src='/icon/rejected.png' width={60} height={60} style={{marginBottom:10}} /> 
          <Typography variant='h6' textAlign={'center'} sx={{fontSize:18, fontWeight:500, color:grey[500] }}>{t("seller_rejected_message")}</Typography>
        </>
      );
    }
  }

  return (
      <Container sx={{maxWidth:{lg:"lg", xl:"xl"}, my:{xs:4, md:12} }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width:'500px', maxWidth:'100%', mx:'auto', p:3, backgroundColor:'white.main', borderRadius:3, boxShadow:'0 0 6px rgba(0,0,0,0.1)' }}>
          <Box textAlign={'center'} >
            {displayMessage(status)}
            {
              status === "rejected" ?
              <Button sx={{px:3, py:0.5, mt:2, textTransform:'uppercase'}} onClick={() => {resetApplication()}}>{t("reset_application")}</Button>
              : 
              <LoadingButton loading={loading} sx={{px:3, py:0.5, mt:2, textTransform:'uppercase'}} onClick={() => {navigate("/")}}>{t("back_to_home")}</LoadingButton>
            }
          </Box>
        </Box>
      </Container>
  )
}