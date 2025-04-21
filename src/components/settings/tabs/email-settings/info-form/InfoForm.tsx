import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import * as Yup from 'yup';
import { useFormik } from 'formik'; // CUSTOM COMPONENTS

import { H6, Paragraph } from '../../../../../components/typography';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../services/store/hooks/hooks';
import { RootState } from '../../../../../services/store/store';
import ApiService from '../../../../../services/apiServices/apiService';
import LoadingButton from '@mui/lab/LoadingButton';
import Toast from '../../../../../utils/toast';
import { FlexBox } from '../../../../flexbox';
import { TextBox } from '../../../../textbox';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
export default function InfoForm({settings}: any) {
  console.log('settings: ', settings);

  const navigate = useNavigate();
  
  // const [settings, setSettings] = useState<any>(false);
  const [isSubmitting, setIsSubmitting] = useState<any>(false);
  
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    notificationEmail: Yup.string().email().required('Notification email is Required!'),
    fromEmail: Yup.string().email().required('From Email is Required!')
  });

  const initialValues = {
    notificationEmail: settings.notificationEmail,
    fromEmail: settings.fromEmail
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
            "key": "notificationEmail",
            "value": values.notificationEmail
          },
          {
            "key": "fromEmail",
            "value": values.fromEmail
          }
        ];
        let saveEmailSetting = await ApiService.saveSetting(data);
        Toast.showSuccessMessage("Email Setting Saved Successfully");
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
      Email Settings
      </H6>
      <Divider />
      <form onSubmit={handleSubmit}>
        <Box margin={3}>
          <Grid container spacing={3}>
          <Grid size={{
              sm: 6,
              xs: 12
            }}>
              <TextBox type={"email"} fullWidth name="notificationEmail" placeholder={t("notification_email")} 
                handleBlur={handleBlur} handleChange={handleChange} 
                value={values.notificationEmail} helperText={touched.notificationEmail && errors.notificationEmail ? String(errors.notificationEmail) : ""} error={Boolean(touched.notificationEmail && errors.notificationEmail)}
              />
            <Typography sx={{fontSize: "12px"}}>{t('notification_message')}</Typography>
            </Grid>

            <Grid size={{
              sm: 6,
              xs: 12
            }}>
              <TextBox type={"email"} fullWidth name="fromEmail" placeholder={t("from_email")} handleBlur={handleBlur} handleChange={handleChange} 
                value={values.fromEmail} helperText={touched.fromEmail && errors.fromEmail ? String(errors.fromEmail) : ""} 
                error={Boolean(touched.fromEmail && errors.fromEmail)}
              />
              <Typography sx={{fontSize: "12px"}}>{t('from_email_message')}</Typography>
            </Grid>
            
            <Grid size={12}>
              <FlexBox gap={2}>
              
              <Button variant="outlined" sx={{minWidth:'120px' }}>
                Reset
              </Button>
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