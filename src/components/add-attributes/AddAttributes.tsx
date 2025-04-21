import { Box, Button, Card } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox"
import IconWrapper from '../icon-wrapper'
import { H6 } from "../typography"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { TextBox } from "../textbox";
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ApiService from "../../services/apiServices/apiService";

export default function AddAttributes() {
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    nameEn: Yup.string().required('Name in English is Required!'),
    nameSp: Yup.string().required('Name in Spanish is Required!')
  });

  const initialValues = {
    nameEn: '',
    nameSp: ''
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        await ApiService.addAttribute({ nameEn: values.nameEn, nameSp: values.nameSp });
        Toast.showSuccessMessage('Attribute Added Successfully');
        navigate("/admindashboard/attributes");
      } catch (error: any) {
        console.log('error: ', error);
        Toast.showErrorMessage(error.response.data.message);
      }
    }
  });

  return (
    <Box sx={{padding: 0, marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <form onSubmit={handleSubmit} style={{width:'100%'}}>
        <Card sx={{p: 2}}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <DeviceHubIcon color="primary" />
                </IconWrapper>

                <H6 sx={{m: 0}} fontSize={16}>{t("create_new_attribute")}</H6>
              </FlexBox>
            </Grid>

            <Grid container spacing={2} size={{
                md: 12,
                xs: 12
              }}>
              
              <Grid size={12}>
                <H6 sx={{my: 1}} fontSize={16}>{t("main_parameters")}</H6>
              </Grid>

              <Grid size={{
                  sm: 6,
                  xs: 12
                }}>
                <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={t("name_english")} 
                  name={"nameEn"} 
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  value={values.nameEn}
                  helperText={touched.nameEn && typeof errors.nameEn === "string" ? errors.nameEn : ""} 
                  error={Boolean(touched.nameEn && errors.nameEn)}
                />
              </Grid>

              <Grid size={{
                  sm: 6,
                  xs: 12
                }}>
                <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={t("name_spanish")} 
                  name={"nameSp"} 
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  value={values.nameSp}
                  helperText={touched.nameSp && typeof errors.nameSp === "string" ? errors.nameSp : ""} 
                  error={Boolean(touched.nameSp && errors.nameSp)}
                />
              </Grid>
          </Grid>
          </Grid>

          <FlexBox flexWrap="wrap" sx={{mt: 4}} gap={2}>
            <Button type="submit" variant="contained" >
            {t("create_new_attribute")}
            </Button>

            <Button variant="outlined" color="secondary" type="reset">
            {t("cancel")}
            </Button>
          </FlexBox>

        </Card>
      </form>
    </Box>
  )
}