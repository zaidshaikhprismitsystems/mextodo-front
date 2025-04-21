import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../services/store/hooks/hooks';
import { RootState } from '../../../../../services/store/store';
import ApiService from '../../../../../services/apiServices/apiService';
import LoadingButton from '@mui/lab/LoadingButton';
import Toast from '../../../../../utils/toast';
import { FlexBox } from '../../../../flexbox';
import { TextBox } from '../../../../textbox';
import Checkbox from '@mui/material/Checkbox';

export default function InfoForm({settings}: any) {

  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState<any>(false);
  
  const { t } = useTranslation();

  const userData: any = useAppSelector((state: RootState) => state.user);

  const validationSchema = Yup.object({
    port: Yup.string().required('Notification email is Required!'),
    host: Yup.string().required('From Email is Required!'),
    authUser: Yup.string().required('Auth User is Required!'),
    authPassword: Yup.string().required('Auth Password is Required!')
  });

  const initialValues = {
    port: settings.port,
    host: settings.host,
    authUser: settings.authUser,
    authPassword: settings.authPassword
  };
  
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched
  } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      try {
        setIsSubmitting(true);
        let data = [
          {
            "key": "port",
            "value": values.port
          },
          {
            "key": "host",
            "value": values.host
          },
          {
            "key": "authUser",
            "value": values.authUser
          },
          {
            "key": "authPassword",
            "value": values.authPassword
          }
        ];
        let saveSetting = await ApiService.saveSetting(data);
        Toast.showSuccessMessage("Setting Saved Successfully");
      } catch (error: any) {
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      }finally{
        setIsSubmitting(false);
      }
    }
  });


  return <Card>
      <H6 fontSize={14} px={1} m={2}>
      SMTP Settings
      </H6>

      <Divider />

        <form onSubmit={handleSubmit}>
          <Box margin={3}>
            <Grid container spacing={3}>

              
              <Grid size={{ xs: 12 }}>
                  <H6 fontSize={14} >SMTP Transport</H6>
              </Grid>
              <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextBox type={"text"} fullWidth name="host" placeholder={t("host")} 
                  handleBlur={handleBlur} handleChange={handleChange} 
                  value={values.host} helperText={touched.host && errors.host ? String(errors.host) : ""} error={Boolean(touched.host && errors.host)}
                />
              </Grid>

              <Grid size={{
                sm: 6,
                xs: 12
              }}>
               <TextBox type={"text"} fullWidth name="port" placeholder={t("port")} 
                  handleBlur={handleBlur} handleChange={handleChange} 
                  value={values.port} helperText={touched.port && errors.port ? String(errors.port) : ""} error={Boolean(touched.port && errors.port)}
                />
              </Grid>
              <Grid size={{
                    xs: 12
                  }}>
                    <label style={{ paddingLeft:0, display:'flex', justifyContent:'left', alignItems:'center' }} >
                      <Checkbox sx={{ p: 0, color:'primary.main','&.Mui-checked':{color:'primary.main'}, mr:0.5, }} checked={true} onChange={() => {}} />
                      <Paragraph m={0} color="Black" fontSize={14} fontWeight={400}>
                        {t("secure_port_message")}
                      </Paragraph>
                    </label>
                  </Grid>
              <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextBox type={"text"} fullWidth name="authUser" placeholder={t("auth_user")} 
                  handleBlur={handleBlur} handleChange={handleChange} 
                  value={values.authUser} helperText={touched.authUser && errors.authUser ? String(errors.authUser) : ""} error={Boolean(touched.authUser && errors.authUser)}
                />
              </Grid>

              <Grid size={{
                sm: 6,
                xs: 12
              }}>
               <TextBox type={"text"} fullWidth name="authPassword" placeholder={t("auth_password")} 
                  handleBlur={handleBlur} handleChange={handleChange} 
                  value={values.authPassword} helperText={touched.authPassword && errors.authPassword ? String(errors.authPassword) : ""} error={Boolean(touched.authPassword && errors.authPassword)}
                />
              </Grid>
              <Grid size={{
                sm: 6,
                xs: 12
              }}>

              <Paragraph m={0} color="Black" fontSize={14} fontWeight={400}>
                {t("setup_smtp")}
                </Paragraph>
                <Button type='button' variant='text' color='info' sx={{p:0, mt:1}} disableTouchRipple>
                {t("save_message")}
                </Button>
              </Grid>
              

             
              <Grid size={12}>
                <FlexBox gap={2}>
                
                <LoadingButton loading={isSubmitting} type="submit" variant="contained"  sx={{minWidth:'120px' }}>
                  Save
                </LoadingButton>
                </FlexBox>

              </Grid>
            </Grid>
          </Box>
        </form>
    </Card>;
}