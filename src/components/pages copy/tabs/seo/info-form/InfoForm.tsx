import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import * as Yup from 'yup';
import { useFormik } from 'formik'; // CUSTOM COMPONENTS

import { H6 } from '../../../../typography';
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

const InfoForm = ({ settings }: any) => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<any>(false);

  const { t } = useTranslation();

  const userData: any = useAppSelector((state: RootState) => state.user);

  const validationSchema = Yup.object({
    landingTitle: Yup.string().required('Notification email is Required!'),
    landingKeywords: Yup.string().required('From Email is Required!'),
    landingDescription: Yup.string().required('Auth User is Required!')
  });

  const initialValues = {
    landingTitle: settings.landingTitle,
    landingKeywords: settings.landingKeywords,
    landingDescription: settings.landingDescription
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
            key: 'landingTitle',
            value: values.landingTitle
          },
          {
            key: 'landingKeywords',
            value: values.landingKeywords
          },
          {
            key: 'landingDescription',
            value: values.landingDescription
          }
        ];
        let saveSetting = await ApiService.saveSetting(data);
        Toast.showSuccessMessage('Setting Saved Successfully');
      } catch (error: any) {
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <Card>
      <H6 fontSize={14} px={1} m={2}>
        {t('seo_setting')}
      </H6>

      <Divider />

      <form onSubmit={handleSubmit}>
        <Box margin={3}>
          <Grid container spacing={3}>
            <Grid
              size={{
                sm: 6,
                xs: 12
              }}
            >
              <TextBox
                type={'text'}
                fullWidth
                name="landingTitle"
                placeholder={t('title')}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.landingTitle}
                helperText={
                  touched.landingTitle && errors.landingTitle
                    ? String(errors.landingTitle)
                    : ''
                }
                error={Boolean(touched.landingTitle && errors.landingTitle)}
              />
              <Typography variant="caption">
                Custom title for home page (landing page)
              </Typography>
            </Grid>
            <Grid
              size={{
                sm: 6,
                xs: 12
              }}
            >
              <TextBox
                type={'text'}
                fullWidth
                name="landingKeywords"
                placeholder={t('landingKeywords')}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.landingKeywords}
                helperText={
                  touched.landingKeywords && errors.landingKeywords
                    ? String(errors.landingKeywords)
                    : ''
                }
                error={Boolean(touched.landingKeywords && errors.landingKeywords)}
              />
              <Typography variant="caption">
                Custom meta keywords for home page (landing page).
              </Typography>
            </Grid>

            <Grid
              size={{
                sm: 12,
                xs: 12
              }}
            >
              <TextBox
                type={'text'}
                fullWidth
                name="landingDescription"
                placeholder={t('landingDescription')}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.landingDescription}
                helperText={
                  touched.landingDescription && errors.landingDescription
                    ? String(errors.landingDescription)
                    : ''
                }
                error={Boolean(touched.landingDescription && errors.landingDescription)}
                multiline
                rows={4}
              />
            </Grid>

            <Grid size={12}>
              <FlexBox gap={2}>
                <Button variant="outlined" sx={{ minWidth: '120px' }}>
                  Reset
                </Button>
                <LoadingButton
                  loading={isSubmitting}
                  type="submit"
                  variant="contained"
                  sx={{ minWidth: '120px' }}
                >
                  Save
                </LoadingButton>
              </FlexBox>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Card>
  );
};

export default InfoForm;