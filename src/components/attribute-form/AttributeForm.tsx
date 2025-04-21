import { Box, Button, MenuItem, TextField } from '@mui/material'
import { Fragment, useState } from 'react'
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card'
import { useTranslation } from "react-i18next";
import * as Yup from 'yup'

import { TextBox } from "../textbox";

import { useFormik } from 'formik';
import ApiService from '../../services/apiServices/apiService';
import Toast from '../../utils/toast';

export default function AttributeForm(
  {
    attribute,
    isUpdate,
    handleClose,
    onSuccess
  }: any) {
    
  const { t } = useTranslation();
    
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const validationSchema = Yup.object({
    nameEn: Yup.string().required('Name in English is Required!'),
    nameSp: Yup.string().required('Name in Spanish is Required!'),
    status: Yup.string().required('Status is Required!')
  });
  
  console.log('attribute: ', attribute);

  const getInitialValues = () => {
    let initialValues: any = {
      nameEn: attribute?.nameEn,
      nameSp: attribute?.nameSp,
      status: attribute?.status
    };
    return initialValues;
  };
  
    const {
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue
    } = useFormik({
      initialValues: getInitialValues(),
      validationSchema,
      enableReinitialize: true,
      onSubmit: async (values: any) => {
        try {
          setIsSubmitting(true);
          
          let attributeDataForm = {
            id: attribute.id,
            nameEn: values.nameEn,
            nameSp: values.nameSp,
            status: values.status
          };
          
          await ApiService.updateAttribute(attributeDataForm);
          Toast.showSuccessMessage('Attribute Updated Successfully');
          handleClose(true);
          onSuccess();
          // navigate('/dashboard/products');
        } catch (error: any) {
          console.log('Error caught: ', error);
          // Safeguard: check if error.response exists before accessing error.response.data
          if (error?.response?.data?.message) {
            Toast.showErrorMessage(error.response.data.message);
          } else if (error?.message) {
            Toast.showErrorMessage(`Error: ${error.message}`);
          } else {
            Toast.showErrorMessage('An unexpected error occurred');
          }
          setIsSubmitting(false);
        }finally{
          setIsSubmitting(false);
        }
      }
    });

    const FILTER_VALUES = [
      { id: 1, name: t("enabled"), value: 'enabled' },
      { id: 2, name: t("disabled"), value: 'disabled' }
    ]
    
    console.log(values);
    

  return (
    <Box
      sx={{
        width: '100%',
        backgroundImage: 'white.main',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <Box px={{ xs: 1, md: 3 }} bgcolor={'rgba(255,255,255,0.1)'} sx={{ backdropFilter: 'blur(10px)', }}>
        <Fragment>
          <Card sx={{ padding: 3, position: 'relative', mt: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>

                <Grid size={{ sm: 6, xs: 12 }}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("nameEn")}
                    name={"nameEn"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.nameEn}
                    helperText={touched.nameEn && typeof errors.nameEn === "string" ? errors.nameEn : ""}
                    error={Boolean(touched.nameEn && errors.nameEn)}
                    disabled={!isUpdate}
                  />
                </Grid>

                <Grid size={{ sm: 6, xs: 12 }}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("nameSp")}
                    name={"nameSp"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.nameSp}
                    helperText={touched.nameSp && typeof errors.nameSp === "string" ? errors.nameSp : ""}
                    error={Boolean(touched.nameSp && errors.nameSp)}
                    disabled={!isUpdate}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    select
                    fullWidth
                    label={t("status")}
                    className="select"
                    value={values.status}
                    onChange={(e) => setFieldValue('status', e.target.value)}
                    disabled={!isUpdate}
                  >
                    {FILTER_VALUES.map(({ id, name, value }) => (
                      <MenuItem key={id} value={value}>
                        {name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {
                  isUpdate ?
                    <Grid container mt={2} size={12}>
                      <Grid size={6}>
                        <LoadingButton loading={isSubmitting} type="submit" variant="contained" fullWidth >
                          {t("confirm")}
                        </LoadingButton>
                      </Grid>
                      <Grid size={6}>
                        <Button onClick={handleClose} variant="outlined" fullWidth >
                          {t("cancel")}
                        </Button>
                      </Grid>
                    </Grid>
                    :
                    ''
                }
              </Grid>
            </form>
          </Card>
        </Fragment>
      </Box>
    </Box>


  )
}