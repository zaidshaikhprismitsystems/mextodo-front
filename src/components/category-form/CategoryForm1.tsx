import { Box, Button, TextField } from "@mui/material";
import { Fragment, useState } from 'react'
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card'
import { useTranslation } from "react-i18next";
import { CoverPicWrapper } from './styles'
import * as Yup from 'yup'

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import { TextBox } from "../textbox";

import UserInfo from './UserInfo'
import { FlexBetween } from '../flexbox';
import { Paragraph, Small } from '../typography';
import { useFormik } from 'formik';
import ApiService from '../../services/apiServices/apiService';
import Toast from '../../utils/toast';
import DropZone from '../dropzone';
import { category_url } from '../../config/config';

export default function CategoryForm(
  {
    category,
    isUpdate,
    handleClose,
    onSuccess
  }: any) {
    
  const { t } = useTranslation();
    
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ imagePreview, setImagePreview ] = useState<any>(`${category_url}/${category.image}`);

  const validationSchema = Yup.object({
    nameEn: Yup.string().required('Name in English is Required!'),
    nameSp: Yup.string().required('Name in Spanish is Required!'),
    descriptionEn: Yup.string().required('Description in English is Required!'),
    descriptionSp: Yup.string().required('Description in Spanish is Required!'),
    image: Yup.mixed().required('Image is Required!'),
    status: Yup.string().required('Status is Required!')
  });

  const getInitialValues = () => {
    let initialValues: any = {
      nameEn: category?.nameEn,
      nameSp: category?.nameSp,
      descriptionEn: category?.descriptionEn,
      descriptionSp: category?.descriptionSp,
      image: category?.image,
      status: category?.status
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
          
          let categoryDataForm = {
            id: category.id,
            titleEn: values.nameEn,
            titleSp: values.nameSp,
            descriptionEn: values.descriptionEn,
            descriptionSp: values.descriptionSp,
            image: values.image,
            status: values.status
          };
          
          let updateCategory = await ApiService.updateCategory(categoryDataForm);
          Toast.showSuccessMessage('Category Updated Successfully');
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

    const removeImage = () => {
      setImagePreview(null);
      setFieldValue("image", null)
    }

    const handleDropImage = (event: any) => {
      const file = event[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onloadend = async () => {
          if (!reader.result) return;

          const base64String = reader.result.toString().split(",")[1];
          if (!base64String) return;

          const mimetype = file.type;
          const imageData = { image: base64String, mimetype };

          setImagePreview(reader.result.toString());
          setFieldValue("image", imageData);
      };
    }

    const FILTER_VALUES = [
      { id: 1, name: t("enabled"), value: 'enabled' },
      { id: 2, name: t("disabled"), value: 'disabled' }
    ]
  
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

                <Grid size={{ sm: 6, xs: 12 }}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("descriptionEn")}
                    name={"descriptionEn"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.descriptionEn}
                    helperText={touched.descriptionEn && typeof errors.descriptionEn === "string" ? errors.descriptionEn : ""}
                    error={Boolean(touched.descriptionEn && errors.descriptionEn)}
                    disabled={!isUpdate}
                    multiline
                    rows={3}
                  />
                </Grid>

                <Grid size={{ sm: 6, xs: 12 }}>
                  <TextBox
                    type={"text"}
                    fullWidth={true}
                    placeholder={t("descriptionSp")}
                    name={"descriptionSp"}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.descriptionSp}
                    helperText={touched.descriptionSp && typeof errors.descriptionSp === "string" ? errors.descriptionSp : ""}
                    error={Boolean(touched.descriptionSp && errors.descriptionSp)}
                    disabled={!isUpdate}
                    multiline
                    rows={3}
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
                  values?.image && imagePreview && values?.image !== null && values?.image !== undefined ?
                  <>
                  <Grid container spacing={2} sx={{py:0,}} >
                    <Grid size={12}  sx={{p:0, height:'auto', position:'relative'}}>
                      <img src={imagePreview} width={200} height={200} />
                      <Button disabled={!isUpdate} onClick={() => {removeImage()}}  sx={{width:'100%', cursor:"pointer", backgroundColor:"grey.300"}}>
                        {t("remove")}
                      </Button>
                    </Grid>
                  </Grid>
                  </>
                  :
                  <DropZone 
                    onDrop={handleDropImage} 
                    maxFiles={1} 
                    minFiles={1} 
                    curFile={values.image}
                    placeholder={t("drop_image")}
                    paragraph={t("drop_your_images_here")}
                    accept={['.png', '.gif', '.jpeg', '.jpg']}
                    formError={errors.image}
                  />
                }

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