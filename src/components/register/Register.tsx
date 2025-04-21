import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import ApiService from "../../services/apiServices/apiService";
import Toast from "../../utils/toast";
import { TextBox } from '../textbox';
import { H5, H6, Paragraph } from '../../components/typography';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../services/store/hooks/hooks';

const Register = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const initialValues = {
    email: '',
    password: '',
    remember: false
  };

  const userData = useAppSelector((state: any) => state.userData);
  useEffect(() => {
    if (userData?.userDetails) {
      navigate("/");
    }
  }, [userData]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTermSet, setIsTermSet] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("email_validation_message")).max(255).required(t("email_required_message")),
    username: Yup.string().max(15).required(t("username_required_message")),
    password: Yup.string().min(6, t("password_validation_message")).required(t("password_required_message")),
    cpassword: Yup.string().oneOf([Yup.ref("password")], t("password_match_message")).required(t("confirm_password_message"))
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
        await ApiService.userRegistration({ username: values.username, email: values.email, password: values.password });
        Toast.showSuccessMessage('Registration Successfully');
        navigate('/register-success-message');
      } catch (error: any) {
        console.log(error.response.data.message);
        setIsSubmitting(false);
        Toast.showErrorMessage(error?.response?.data?.message || 'Registration Failed');
      } finally {
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
          <H5 display={"flex"} alignItems={"center"} justifyContent={"center"} color={'primary.main'} fontSize={{ sm: 30, xs: 25 }} marginBottom={5} marginTop={2} >
            {t("create_account")}
          </H5>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={12}>
              <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={t("username")}
                  name={"username"}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.username}
                  helperText={touched.username && typeof errors.username === "string" ? errors.username : ""}
                  error={Boolean(touched.username && errors.username)}
                />
              </Grid>

              <Grid size={12}>
                <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={t("email_id")}
                  name={"email"}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.email}
                  helperText={touched.email && typeof errors.email === "string" ? errors.email : ""}
                  error={Boolean(touched.email && errors.email)}
                />
              </Grid>

              <Grid size={12}>
                <TextBox
                  type={"password"}
                  fullWidth={true}
                  placeholder={t("password")}
                  name={"password"}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.password}
                  helperText={touched.password && typeof errors.password === "string" ? errors.password : ""}
                  error={Boolean(touched.password && errors.password)}
                />
              </Grid>

              <Grid size={12}>
                <TextBox
                  type={"password"}
                  fullWidth={true}
                  placeholder={t("repeat_password")}
                  name={"cpassword"}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.cpassword}
                  helperText={touched.cpassword && typeof errors.cpassword === "string" ? errors.cpassword : ""}
                  error={Boolean(touched.cpassword && errors.cpassword)}
                />
              </Grid>

              <Grid size={12}>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <Box pl={0} display={"flex"} justifyContent={"left"} alignItems={"center"}>
                  <Checkbox sx={{ p: 0, color:'primary.main','&.Mui-checked':{color:'primary.main'}, mr:0.5, }}  checked={isTermSet} onChange={() => setIsTermSet(!isTermSet)} />
                  <Paragraph m={0.5} color="black" fontSize={14} fontWeight={400}>
                    {t("i_accept_the")} <Link  sx={{ marginLeft: "auto", color:'link.main' }} fontWeight={400} >{t("terms_and_conditions")}</Link>
                  </Paragraph>
                </Box>
                </Box>
                <LoadingButton
                  disabled={!isTermSet || Object.keys(errors).length > 0 || Object.keys(touched).length <= 0}
                  loading={isSubmitting}
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{backgroundColor:'primary.main', color:'white', py:1, px:2, fontSize:16, fontWeight:600, textTransform:'uppercase','&.Mui-disabled':{backgroundColor:'grey.100', color:'grey.300'}}}>
                  {t("confirm")}
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
            {t("already_have_an_account")}
          </Divider>

          <Button fullWidth variant="text" onClick={() => navigate('/login')} sx={{
            backgroundColor: 'primary.50',  color: 'link.main', fontSize:18, py:1, px:2, textDecoration:'underline', mt:3, fontWeight:400
          }}>
            {t("login")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
