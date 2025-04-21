import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Lottie from "lottie-react";
import SuccessAnimation from "../../assets/success_register_animation.json";

export default function RegisterStatus() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const displayMessage = () => {
      return (
        <>
          {/* <img src='/icon/pending.png' width={60} height={60} style={{marginBottom:10}} />  */}
          <Lottie animationData={SuccessAnimation} loop={false}  style={{ width: 120, height: 120, marginInline:'auto' }} />
          <Typography variant='h6' textAlign={'center'} sx={{fontSize:18, fontWeight:500, color:grey[500] }}>{t("after_register_message")}</Typography>
        </>
      );
  }

  return (
      <Container sx={{maxWidth:{lg:"lg", xl:"xl"}, my:{xs:4, md:12} }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width:'500px', maxWidth:'100%', mx:'auto', p:3, backgroundColor:'white.main', borderRadius:3, boxShadow:'0 0 6px rgba(0,0,0,0.1)' }}>
          <Box textAlign={'center'} >
            {displayMessage()}
              <Button sx={{mt:4, textTransform:'uppercase'}} onClick={() => {navigate('/login')}}>{t("back_to_login")}</Button>
          </Box>
        </Box>
      </Container>
  )
}