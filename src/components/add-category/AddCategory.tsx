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
import { useState } from "react";
import ApiService from "../../services/apiServices/apiService";
import DropZone from "../dropzone";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import DatasetIcon from '@mui/icons-material/Dataset';

export default function AddCategories() {
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    nameEn: Yup.string().required('Name in English is Required!'),
    nameSp: Yup.string().required('Name in Spanish is Required!'),
    descriptionEn: Yup.string().required('description in English is Required!'),
    descriptionSp: Yup.string().required('description in Spanish is Required!'),
    image: Yup.mixed().required("You need to upload an image")
    // .test("fileSize", "The file is too large", (value) => {
    //     return value && value[0].sienter code hereze <= 2000000;
    // })
    // .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc", (value) => {
    //     return value && (
    //         value[0].type === "image/jpeg" ||
    //         value[0].type === "image/bmp" ||
    //         value[0].type === "image/png" ||
    //         value[0].type === 'application/pdf' ||
    //         value[0].type === "application/msword"
    //     );
    // }),
  });

  const [imagePreview, setImagePreview] = useState<any>(null);

  const initialValues = {
    nameEn: '',
    nameSp: '',
    descriptionEn: '',
    descriptionSp: '',
    image: ''
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
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      try {
        let addCategory = await ApiService.addCategory({nameEn: values.nameEn, nameSp: values.nameSp, descriptionEn: values.descriptionEn, descriptionSp: values.descriptionSp, image: values.image });
        Toast.showSuccessMessage('Category Added Successfully');
        navigate('/admindashboard/categories');
      } catch (error: any) {
        console.log('error: ', error);
        Toast.showErrorMessage(error.response.data.message);
      }
    }
  });

  const handleDropFile = (event: any) => {
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
};

const removeImage = () => {
  setImagePreview(null);
  setFieldValue("image", null);
}

  return (
    <Box sx={{padding: 0, marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <form onSubmit={handleSubmit} style={{width:'100%'}}>
        <Card sx={{p: 2}}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <DatasetIcon color="primary" />
                </IconWrapper>

                <H6 sx={{m: 0}} fontSize={16}>{t("create_new_category")}</H6>
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
            
            {/* Description */}
            <Grid container spacing={2} size={{
                md: 12,
                xs: 12
              }}>
             
              <Grid size={{
                  sm: 6,
                  xs: 12
                }}>
                <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={t("desc_english")}
                  name={"descriptionEn"}
                  rows={4}
                  multiline={true}
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  value={values.descriptionEn}
                  helperText={touched.descriptionEn && typeof errors.descriptionEn === "string" ? errors.descriptionEn : ""} 
                  error={Boolean(touched.descriptionEn && errors.descriptionEn)}
                />
              </Grid>

              <Grid size={{
                  sm: 6,
                  xs: 12
                }}>
                <TextBox
                  type={"text"}
                  fullWidth={true}
                  placeholder={t("desc_spanish")} 
                  name={"descriptionSp"}
                  rows={4}
                  multiline={true}
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  value={values.descriptionSp}
                  helperText={touched.descriptionSp && typeof errors.descriptionSp === "string" ? errors.descriptionSp : ""} 
                  error={Boolean(touched.descriptionSp && errors.descriptionSp)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} size={{
                md: 12,
                xs: 12
              }}>

                <Grid size={12}>
                <H6 sx={{my: 1}} fontSize={16}>Image</H6>
                </Grid>
                 
                <Grid size={12}>
                  <Card sx={{ p: 2, width:'100%', maxWidth:'100%'}}> 
                    {
                      imagePreview && typeof imagePreview !== null && imagePreview !== undefined && imagePreview.trim() !== "" ?
                       <FlexBox  gap={2} justifyContent={'center'}>
                      <Box  sx={{width:{xs:'50%', md:'100px', lg:'150px'} ,p:0, height:{xs:'auto', md:'100px', lg:'150px'}, position:'relative'}}>
                        <span onClick={() => {removeImage()}} style={{position:"absolute", top:'-10px', right:'-10px', cursor:"pointer"}}>
                          <DoDisturbOnIcon sx={{fontSize:"20px", color:'red'}} />
                          </span>
                        <img src={imagePreview} width={'100%'} height={'100%'} style={{objectFit:"cover",  borderRadius:10,}}/>
                      </Box>
                      </FlexBox>
                      :
                      <DropZone 
                        onDrop={(e: any) => {handleDropFile(e)}} 
                        maxFiles={1} 
                        minFiles={1} 
                        curFile={values?.image ? values.image.length : 0} 
                        accept={['.png', '.gif', '.jpeg', '.jpg']} 
                        formError={errors.image}
                        placeholder={'Drop files here or click to upload.'}
                        paragraph={'Upload up to 10 files'}
                      />
                    }
                  </Card>
                </Grid>
                 
              </Grid>
          </Grid>

          <FlexBox flexWrap="wrap" sx={{mt: 4}} gap={2}>
            <Button type="submit" variant="contained" color="primary">
            {t("create_new_category")}
            </Button>

            <Button variant="outlined" type="reset" color="primary">
            {t("cancel")}
            </Button>
          </FlexBox>

        </Card>
      </form>
    </Box>
  )
}