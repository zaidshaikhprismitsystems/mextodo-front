import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import * as Yup from 'yup';
import { useFormik } from 'formik'; // CUSTOM COMPONENTS

import { H6 } from '../../../../../components/typography';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../services/store/hooks/hooks';
import { RootState } from '../../../../../services/store/store';
import ApiService from '../../../../../services/apiServices/apiService';
import LoadingButton from '@mui/lab/LoadingButton';
import Toast from '../../../../../utils/toast';
export default function InfoForm() {

  const navigate = useNavigate();
  
  const [userDetails, setUserData] = useState<any>(false);
  const [isSubmitting, setIsSubmitting] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { t } = useTranslation();

  const userData: any = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      let data = await ApiService.getUserData();
      setUserData(data.data.data.userData);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().min(3, 'Must be greater then 3 characters').required('First Name is Required!'),
    lastName: Yup.string().required('Last Name is Required!'),
    username: Yup.string().required('Username is Required!'),
    email: Yup.string().email('Invalid email address').required('Email is Required!'),
    currency: Yup.string().required('Currency is Required!'),
    language: Yup.string().required('Language is Required!')
  });

  const initialValues = {
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    username: userDetails.username,
    email: userDetails.email,
    currency: userDetails.currency,
    language: userDetails.language,
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
        let saveProfileData = await ApiService.saveProfile({id: userData.userDetails.id, firstName: values.firstName, lastName: values.lastName, currency: values.currency, language: values.language });
        Toast.showSuccessMessage("Profile Updated Successfully");
      } catch (error: any) {
        console.log('error: ', error);
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      }finally{
        setIsSubmitting(false);
      }
    }
  });

  return <Card>
      <H6 fontSize={14} px={1} m={2}>
        Basic Information
      </H6>

      <Divider />

      {
        isLoading ? "Loading..." :
        <form onSubmit={handleSubmit}>
          <Box margin={3}>
            <Grid container spacing={3}>
              <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextField fullWidth name="firstName" label="First Name" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.firstName} helperText={touched.firstName && errors.firstName ? String(errors.firstName) : ""} error={Boolean(touched.firstName && errors.firstName)} />
              </Grid>

              <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextField fullWidth name="lastName" label="Last Name" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.lastName} helperText={touched.lastName && errors.lastName ? String(errors.lastName) : ""} error={Boolean(touched.lastName && errors.lastName)} />
              </Grid>

              <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextField fullWidth disabled name="email" label="Email" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.email} helperText={touched.email && errors.email ? String(errors.email) : ""} error={Boolean(touched.email && errors.email)} />
              </Grid>

              <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextField fullWidth disabled name="username" label="Username" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.username} helperText={touched.username && errors.username ? String(errors.username) : ""} error={Boolean(touched.username && errors.username)} />
              </Grid>

              {/* <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextField fullWidth name="zip" variant="outlined" label="Zip Code" onBlur={handleBlur} onChange={handleChange} value={values.zip} helperText={touched.zip && errors.zip} error={Boolean(touched.zip && errors.zip)} />
              </Grid> */}

              <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextField fullWidth name="currency" variant="outlined" label="Currency" onBlur={handleBlur} onChange={handleChange} value={values.currency} helperText={touched.currency && errors.currency ? String(errors.currency) : ""} error={Boolean(touched.currency && errors.currency)} />
              </Grid>

              {/* <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextField fullWidth name="language" variant="outlined" label="Language" onBlur={handleBlur} onChange={handleChange} value={values.language} helperText={touched.language && errors.language} error={Boolean(touched.language && errors.language)} />
              </Grid> */}

              <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextField select fullWidth name="language" label="Language" variant="outlined" placeholder="Language" onBlur={handleBlur} onChange={handleChange} value={values.language} helperText={touched.language && errors.language ? String(errors.language) : ""} error={Boolean(touched.language && errors.language)} slotProps={{
                select: {
                  native: true,
                  IconComponent: KeyboardArrowDown
                }
              }}>
                  <option value="es">English</option>
                  <option value="es">Spanish</option>
                </TextField>
              </Grid>

              {/* <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextField fullWidth name="state" label="State" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.state} helperText={touched.state && errors.state} error={Boolean(touched.state && errors.state)} />
              </Grid> */}

              <Grid size={12}>
                {/* <Button type="submit" variant="contained">
                  Save Changes
                </Button> */}
                {/* disabled={Object.entries(errors).length > 0 || Object.entries(touched).length <= 0 } */}
                <LoadingButton loading={isSubmitting} type="submit" variant="contained" >
                  Save Changes
                </LoadingButton>

                <Button variant="outlined" sx={{
                    ml: 2
                  }}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      }
    </Card>;
}