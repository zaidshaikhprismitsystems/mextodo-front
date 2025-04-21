import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as Yup from "yup"

import NavigateBefore from '@mui/icons-material/NavigateBefore'; 

import { H5, Paragraph, H6 } from '../typography';
import { useTranslation } from 'react-i18next';
import ApiService from '../../services/apiServices/apiService';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import Toast from '../../utils/toast';
import { useAppSelector } from '../../services/store/hooks/hooks';
import { TextBox } from '../textbox';

export default function ForgetPassword() {
  
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const initialValues = {
    email: ''
  };

  const userData = useAppSelector((state: any) => state.userData)
    useEffect(() => {
      if(userData !== undefined && userData?.userDetails !== undefined && userData?.userDetails !== null){
        navigate("/");
      }
    }, [userData])

  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("email_validation_message")).max(255).required(t("email_required_message"))
  });

  useEffect(() => {
    validateForm();
  }, [i18n.language]);

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    validateForm
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        setIsSubmitting(true);
        let sendEmail = await ApiService.forgotPassword({email: values.email});
        console.log('sendEmail: ', sendEmail);
        Toast.showSuccessMessage('Password reset link sent to your email address!');
        navigate('/login');
      } catch (error: any) {
        console.log('error: ', error);
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      }finally{
        setIsSubmitting(false);
      }
    }
  });

  return (
    <Box  sx={{ width:'100%',
      backgroundImage: 'white.main', 
      height: '100%', 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat', 
    }}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} maxWidth={"100%"} marginBlock={{xs:6, md:12}} paddingInline={2} >
        <Box maxWidth={"550px"} padding={{xs:2 , md:4}} border={'2px solid '} borderColor={'primary.main'} borderRadius={10} bgcolor={'rgba(255,255,255,0.1)'} sx={{backdropFilter:'blur(10px)', }}>
          {/* <img src="/static/forget-passwod.svg" alt="Logo" /> */}

          <H5 display={"flex"} alignItems={"center"} justifyContent={"center"} color={'primary.main'} fontSize={{ sm: 30, xs: 25 }} marginBottom={2} marginTop={2} >{t("foret_password")}</H5>

          <Paragraph color="text.secondary" mt={0} mb={4} px={4} textAlign={'center'}>
            {t("forget_pass_description")}
          </Paragraph>

          <form onSubmit={handleSubmit}>
            <Grid textAlign="left" container spacing={2}>
                <Grid size={12}>
                {/* <H6 fontSize={16} mb={0.5} color={'black'} fontWeight={500} mt={0}>
                    {t("email_id")}
                  </H6> */}
                  {/* @ts-ignore */}
                  {/* <TextField fullWidth placeholder={t("enter_email")} name="email" onBlur={handleBlur} value={values.email} onChange={handleChange} helperText={touched.email && errors.email} error={Boolean(touched.email && errors.email)} /> */}
                  <TextBox
                      type={"email"}
                      fullWidth={true}
                      placeholder={t("enter_email")} 
                      name={"email"} 
                      handleBlur={handleBlur} 
                      handleChange={handleChange} 
                      value={values.email}
                      helperText={touched.email && typeof errors.email === "string" ? errors.email : ""} 
                      error={Boolean(touched.email && errors.email)}
                    />
                </Grid>

                <LoadingButton disabled={Object.entries(errors).length > 0 || Object.entries(touched).length <= 0 } loading={isSubmitting} type="submit" variant="contained" fullWidth sx={{backgroundColor:'primary.main', color:'white', py:1, px:2, fontSize:16, fontWeight:600, textTransform:'uppercase','&.Mui-disabled':{backgroundColor:'grey.100', color:'grey.300'}}}>
                {t("enter")}
                </LoadingButton>

                <Button disableRipple variant="text" color="secondary" onClick={() => navigate('/login')} sx={{
            backgroundColor: 'primary.50',  color: 'link.main', fontSize:18, py:1, px:2, mx:'auto', textDecoration:'underline', mt:3, fontWeight:400
          }}>
                  <NavigateBefore fontSize="medium" /> {t("back_to_login")}
                </Button>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>

  )
}
