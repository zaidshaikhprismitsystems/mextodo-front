import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ApiService from '../../../../../services/apiServices/apiService';
import Toast from '../../../../../utils/toast';
import { TextBox } from '../../../../textbox';

export default function InfoForm({ settings }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    port: Yup.string().required('Port is Required!'),
    host: Yup.string().required('Host is Required!'),
    authUser: Yup.string().required('Auth User is Required!'),
    authPassword: Yup.string().required('Auth Password is Required!'),
  });

  const initialValues = {
    port: settings.port,
    host: settings.host,
    authUser: settings.authUser,
    authPassword: settings.authPassword,
  };

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      try {
        setIsSubmitting(true);
        const data = [
          { key: 'port', value: values.port },
          { key: 'host', value: values.host },
          { key: 'authUser', value: values.authUser },
          { key: 'authPassword', value: values.authPassword },
        ];
        await ApiService.saveSetting(data);
        Toast.showSuccessMessage('Setting Saved Successfully');
      } catch (error: any) {
        Toast.showErrorMessage(error.response?.data?.message || 'Error saving settings');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Box margin={3}>
          <Grid container spacing={3}>
            <Grid size={{ sm: 6, xs: 12 }}>
              <TextBox
                type="text"
                fullWidth
                name="host"
                placeholder={t('host')}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.host}
                helperText={touched.host && errors.host ? String(errors.host) : ''}
                error={Boolean(touched.host && errors.host)}
              />
            </Grid>
            <Grid size={{ sm: 6, xs: 12 }}>
              <TextBox
                type="text"
                fullWidth
                name="port"
                placeholder={t('port')}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.port}
                helperText={touched.port && errors.port ? String(errors.port) : ''}
                error={Boolean(touched.port && errors.port)}
              />
            </Grid>
            <Grid size={{ sm: 6, xs: 12 }}>
              <TextBox
                type="text"
                fullWidth
                name="authUser"
                placeholder={t('auth_user')}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.authUser}
                helperText={touched.authUser && errors.authUser ? String(errors.authUser) : ''}
                error={Boolean(touched.authUser && errors.authUser)}
              />
            </Grid>
            <Grid size={{ sm: 6, xs: 12 }}>
              <TextBox
                type="password"
                fullWidth
                name="authPassword"
                placeholder={t('auth_password')}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.authPassword}
                helperText={touched.authPassword && errors.authPassword ? String(errors.authPassword) : ''}
                error={Boolean(touched.authPassword && errors.authPassword)}
              />
            </Grid>
            <Grid size={12}>
              <LoadingButton loading={isSubmitting} type="submit" variant="contained">
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Card>
  );
}