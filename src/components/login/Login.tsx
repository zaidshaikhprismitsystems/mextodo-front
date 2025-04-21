import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Box from '@mui/material/Box';
import { ButtonBase, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import ApiService from "../../services/apiServices/apiService"
import { TextBox } from '../textbox';
import { H5, Paragraph } from '../../components/typography';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../services/store/hooks/hooks";
import { setUserDetails } from "../../services/store/slices/userSlice";
import { useTranslation } from 'react-i18next';
import { RootState } from '../../services/store/store';
import Toast from '../../utils/toast';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const Login = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const userData: any = useAppSelector((state: RootState) => state.user)
  
  useEffect(() => {
    if(userData !== undefined && userData?.userDetails !== undefined && userData?.userDetails !== null){
      Toast.showSuccessMessage('Already Logged in ');
      navigate("/");
    }
  }, [])

  const initialValues = {
    username: '',
    password: '',
    remember: false
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRemember, setIsRemeber] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().max(15).required(i18n.language == 'en' ? 'Username is required' : 'El nombre de usuario es obligatorio'),
    password: Yup.string().min(6, i18n.language == 'en' ? "Password should be of minimum 6 characters length" : "La contraseña debe tener un mínimo de 6 caracteres.").required(i18n.language == 'en' ? "Password is required" : "Se requiere contraseña")
  });

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
        let loginUser = await ApiService.loginUser({username: values.username, password: values.password, isRemember});
        dispatch(setUserDetails({
          ...loginUser.data.userData
        }));
        localStorage.setItem("authToken", loginUser.token);
        Toast.showSuccessMessage('Logged In Successfully',);
        navigate('/');
      } catch (error: any) {
        console.log('error: ', error);
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      }finally{
        setIsSubmitting(false);
      }
    }
  });

  useEffect(() => {
    validateForm();
  }, [i18n.language]); 

  return (
    <Box  sx={{ width:'100%',
      backgroundImage: 'white.main', 
      height: '100%', 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat', 
    }}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} maxWidth={"100%"} marginBlock={{xs:6, md:12}} paddingInline={2} >
        <Box maxWidth={"550px"} padding={{xs:2 , md:4}} border={'2px solid '} borderColor={'primary.main'} borderRadius={10} bgcolor={'rgba(255,255,255,0.1)'} sx={{backdropFilter:'blur(10px)', }}>
          <H5 display={"flex"} alignItems={"center"} justifyContent={"center"} color={'primary.main'} fontSize={{ sm: 30, xs: 25 }} marginBottom={5} marginTop={2} >{t("login")}</H5>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  {/* <H6 fontSize={16} mb={0.5} color={'black'} fontWeight={500} mt={0}>
                    {t("username")}
                  </H6> */}
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("enter_username")} 
                    name={"username"} 
                    handleBlur={handleBlur} 
                    handleChange={handleChange} 
                    value={values.username}
                    helperText={touched.username && typeof errors.username === "string" ? errors.username : ""} 
                    error={Boolean(touched.username && errors.username)}
                  />
                </Grid>

                <Grid size={12}>
                  {/* <H6 fontSize={16} mb={0.5} color={'black'} fontWeight={500} mt={0}>
                    {t("password")}
                  </H6> */}
                  <TextBox
                    type={showPassword ? 'text' : 'password'} 
                    fullWidth={true}
                    placeholder={t("enter_password")} 
                    name={"password"} 
                    handleBlur={handleBlur} 
                    handleChange={handleChange} 
                    value={values.password}
                    helperText={touched.password && typeof errors.password === "string" ? errors.password : ""}
                    error={Boolean(touched.password && errors.password)} 
                    slotProps={{
                      input: {
                        endAdornment: 
                          <ButtonBase disableRipple disableTouchRipple onClick={() => setShowPassword(!showPassword)} sx={{color:'primary.main'}}>
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </ButtonBase>
                      }
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <Box pl={0} display={"flex"} justifyContent={"left"} alignItems={"center"}>
                      <Checkbox sx={{ p: 0, color:'primary.main','&.Mui-checked':{color:'primary.main'}, mr:0.5, }} checked={isRemember} onChange={() => {setIsRemeber(!isRemember)}} />
                      <Paragraph m={0} color="Black" fontSize={14} fontWeight={400}>
                        {t("remember_me")}
                      </Paragraph>
                    </Box>
                    <Box fontSize={13} component={Link} sx={{ marginLeft: "auto", color:'link.main' }} fontWeight={400}  onClick={() => { navigate("/forget-password") }}>
                      Forget Password?
                    </Box>
                  </Box>

                  <LoadingButton disabled={Object.entries(errors).length > 0 || Object.entries(touched).length <= 0 } loading={isSubmitting} type="submit" variant="contained" fullWidth sx={{backgroundColor:'primary.main', color:'white', py:1, px:2, fontSize:16, fontWeight:600, textTransform:'uppercase','&.Mui-disabled':{backgroundColor:'grey.100', color:'grey.300'}}}>
                  {t("enter")}
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>

          <Divider sx={{
            mt: 3,
            color: 'primary.main',
            fontSize: 13,
            '&::before, &::after':{borderColor:'primary.main'},
          }}>
            {t("dont_have_an_account")}
          </Divider>

          <Button fullWidth variant="text" onClick={() => navigate('/register')} sx={{
            backgroundColor: 'primary.50',  color: 'link.main', fontSize:18, py:1, px:2, textDecoration:'underline', mt:3, fontWeight:400
          }}>
            {t("register")}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login;