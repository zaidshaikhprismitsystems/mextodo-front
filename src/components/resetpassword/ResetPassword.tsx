import { useNavigate } from 'react-router-dom';

import ApiService from "../../services/apiServices/apiService"
import { useSearchParams } from "react-router-dom"

import { H5, H6 } from '../../components/typography';
import { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField'; // CUSTOM DEFINED HOOK
import LoadingButton from '@mui/lab/LoadingButton';

import Toast from '../../utils/toast';
import { useAppSelector } from '../../services/store/hooks/hooks';
import { TextBox } from '../textbox';

const ResetPassword = () => {
  const navigate = useNavigate();
 
  let [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get("token");
  
  const { t, i18n } = useTranslation();

  const userData = useAppSelector((state: any) => state.userData)
    useEffect(() => {
      if(userData !== undefined && userData?.userDetails !== undefined && userData?.userDetails !== null){
        navigate("/");
      }
    }, [userData])

  const initialValues = {
    email: '',
    password: '',
    npassword: ''
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().min(6, "Password should be of minimum 6 characters length").required("Password is required"),
    cpassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must be match").required("Confirm password is required"),
  });

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        setIsSubmitting(true);
        let resetPassword = await ApiService.resetPassword({token, email: values.email, password: values.password});
        Toast.showSuccessMessage('Password reset successfully');
        navigate('/login');
      } catch (error: any) {
        console.log(error.response.data.message);
        setIsSubmitting(false);
        Toast.showErrorMessage(error.response.data.message ? error.response.data.message : 'Password reset failed');
        navigate("/login");
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
            <H5  display={"flex"} alignItems={"center"} justifyContent={"center"} color={'primary.main'} fontSize={{ sm: 30, xs: 25 }} marginBottom={5} marginTop={2} >{t("reset_password")}</H5>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
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

                  <Grid size={12}>
                    {/* <H6 fontSize={16} mb={0.5} color={'black'} fontWeight={500} mt={0}>
                    {t("password")}
                    </H6> */}
                    {/* @ts-ignore */}
                    {/* <TextField type="password" fullWidth placeholder={t("enter_password")} name="password" onBlur={handleBlur} value={values.password} onChange={handleChange} helperText={touched.password && errors.password} error={Boolean(touched.password && errors.password)} /> */}
                    <TextBox
                      // type={showPassword ? 'text' : 'password'} 
                      type={"password"}
                      fullWidth={true}
                      placeholder={t("enter_password")} 
                      name={"password"} 
                      handleBlur={handleBlur} 
                      handleChange={handleChange} 
                      value={values.password}
                      helperText={touched.password && typeof errors.password === "string" ? errors.password : ""}
                      error={Boolean(touched.password && errors.password)} 
                      // slotProps={{
                      //   input: {
                      //     endAdornment: 
                      //       <ButtonBase disableRipple disableTouchRipple onClick={() => setShowPassword(!showPassword)} sx={{color:'primary.main'}}>
                      //         {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      //       </ButtonBase>
                      //   }
                      // }}
                    />
                  </Grid>

                  <Grid size={12}>
                    {/* <H6 fontSize={16} mb={0.5} color={'black'} fontWeight={500} mt={0}>
                    {t("repeat_password")}
                    </H6> */}
                    {/* @ts-ignore */}
                    {/* <TextField type="password" fullWidth placeholder={t("enter_repeat_password")} name="cpassword" onBlur={handleBlur} value={values.cpassword} onChange={handleChange} helperText={touched.cpassword && errors.cpassword} error={Boolean(touched.cpassword && errors.cpassword)} /> */}
                    <TextBox
                      // type={showPassword ? 'text' : 'password'} 
                      type={"password"}
                      fullWidth={true}
                      placeholder={t("enter_repeat_password")} 
                      name={"cpassword"} 
                      handleBlur={handleBlur} 
                      handleChange={handleChange} 
                      value={values.cpassword}
                      helperText={touched.cpassword && typeof errors.cpassword === "string" ? errors.cpassword : ""}
                      error={Boolean(touched.cpassword && errors.cpassword)} 
                      // slotProps={{
                      //   input: {
                      //     endAdornment: 
                      //       <ButtonBase disableRipple disableTouchRipple onClick={() => setShowPassword(!showPassword)} sx={{color:'primary.main'}}>
                      //         {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      //       </ButtonBase>
                      //   }
                      // }}
                    />
                  </Grid>

                  <Grid size={12}>
                    <LoadingButton disabled={Object.entries(errors).length > 0 || Object.entries(touched).length <= 0 } loading={isSubmitting} type="submit" variant="contained" fullWidth sx={{backgroundColor:'primary.main', mt:2, color:'white', py:1, px:2, fontSize:16, fontWeight:600, textTransform:'uppercase','&.Mui-disabled':{backgroundColor:'grey.100', color:'grey.300'}}}>
                    {t("confirm")}
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>

            {/* <Divider sx={{
              my: 2,
              color: 'text.secondary',
              fontSize: 13
            }}>
              {t("already_have_an_account")}
            </Divider> */}

            {/* <Button fullWidth variant="text" onClick={() => navigate('/login')} sx={{
              backgroundColor: 'primary.50'
            }}>
              {t("login")}
            </Button> */}
          </Box>
        </Box>
      </Box>
  )
}

export default ResetPassword;