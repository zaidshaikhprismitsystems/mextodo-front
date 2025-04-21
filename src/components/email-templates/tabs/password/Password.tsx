import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { useFormik } from 'formik'; // CUSTOM COMPONENTS

import { FlexBox } from '../../../flexbox';
import { H6, Paragraph, Small } from '../../../typography'; // STYLED COMPONENT

import { FormWrapper, Dot } from './styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Toast from '../../../../utils/toast';
import ApiService from '../../../../services/apiServices/apiService';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppSelector } from '../../../../services/store/hooks/hooks';
import { RootState } from '../../../../services/store/store';
import { t } from 'i18next';
export default function Password() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const userData: any = useAppSelector((state: RootState) => state.user);

  const initialValues = {
    newPassword: '',
    currentPassword: '',
    confirmNewPassword: ''
  };
  const validationSchema = Yup.object({
    currentPassword: Yup.string().min(3, 'Must be greater then 3 characters').required('Current Password is Required!'),
    newPassword: Yup.string().min(8).required('New Password is Required!'),
    confirmNewPassword: Yup.string().test('password-should-match', 'Passwords must match', function (value) {
      return this.parent.newPassword === value;
    })
  });

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    resetForm
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        let changePass = await ApiService.changeAdminPassword({ currentPassword: values.currentPassword, newPassword: values.newPassword });
        Toast.showSuccessMessage("Password Changed");
        resetForm({});
      } catch (error: any) {
        console.log('error: ', error);
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return <Card>
    <H6 fontSize={14} px={1} m={2}>
      Change Your Password
    </H6>

    <Divider />

    <FormWrapper>
      <Grid container spacing={5}>
        <Grid size={{
          xs: 12
        }}>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            
              <Grid size={{
                  sm: 6,
                  xs: 12
                }}>

              <TextField fullWidth type="password" variant="outlined" name="currentPassword" label={t("current_password")} 
              onBlur={handleBlur} onChange={handleChange} value={values.currentPassword} 
              helperText={touched.currentPassword && errors.currentPassword} error={Boolean(touched.currentPassword && errors.currentPassword)} />
              </Grid>
              <br></br>
              
                <Grid size={{
                  sm: 6,
                  xs: 12
                }}>
                  <TextField fullWidth type="password" name="newPassword" variant="outlined" label={t("new_password")} 
                  onBlur={handleBlur} onChange={handleChange} value={values.newPassword} 
                  helperText={touched.newPassword && errors.newPassword} error={Boolean(touched.newPassword && errors.newPassword)} />
                </Grid>
                <Grid size={{
                  sm: 6,
                  xs: 12
                }}>
                  <TextField fullWidth type="password" variant="outlined" name="confirmNewPassword" label={t("confirm_password")} 
                   onBlur={handleBlur} onChange={handleChange} value={values.confirmNewPassword} 
                   helperText={touched.confirmNewPassword && errors.confirmNewPassword} error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)} />
                </Grid>
              </Grid>

            <Stack direction="row" spacing={2} mt={4}>
             <LoadingButton disabled={Object.entries(errors).length > 0 || Object.entries(touched).length <= 0} loading={isSubmitting} type="submit" variant="contained" >
                Save Changes
              </LoadingButton>
              <Button variant="outlined">Cancel</Button>
            </Stack>
          </form>
        </Grid>

        <Grid size={12}>
          <Paragraph fontWeight={500}>{t("password_req")}:</Paragraph>
          <Small color="grey.500">{t("pass_req_message")}:</Small>

          <Stack spacing={1} mt={2}>
            {REQUIREMENTS.map(item => <FlexBox alignItems="center" gap={1} key={item}>
              <Dot />
              <Small>{item}</Small>
            </FlexBox>)}
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  </Card>;
}
const REQUIREMENTS = ['Minimum 6 characters long - the more, the better', 'At least one lowercase character', 'At least one uppercase character', 'At least one number, symbol, or whitespace character'];