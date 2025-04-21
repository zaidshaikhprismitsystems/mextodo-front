import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField'; // MUI ICON COMPONENT

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'; // CUSTOM COMPONENTS

import FlexBetween from '../../../flexbox/FlexBetween';
import { H6, Paragraph, Small } from '../../../typography'; // CUSTOM DUMMY DATA SET

import { PREFERENCES } from './data';
import { FlexBox } from '../../../flexbox';
import IconWrapper from '../../../icon-wrapper'
import * as Yup from 'yup';
import { useFormik } from "formik";
import { TextBox } from "../../../textbox";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoryIcon from '@mui/icons-material/Category';
import ApiService from "../../../../services/apiServices/apiService";
import DropZone from "../../../dropzone";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import Toast from '../../../../utils/toast';
import { setting_url } from '../../../../config/config';

export default function Preferences({settings}: any) {
  console.log('settings: ', settings);

  const [imagePreview, setImagePreview] = useState<any>(settings.siteLogo ? `${setting_url}/${settings.siteLogo}` : '');
  const [faviconPreview, setFaviconPreview] = useState<any>(settings.siteFavicon ? `${setting_url}/${settings.siteFavicon}` : '');

  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState<any>(false);
  
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    globalName: Yup.string().required('Global Name is Required!'),
    siteLogo: Yup.mixed().required('Site Logo is Required!'),
    siteFavicon: Yup.mixed().required('Site Favicon is Required!'),
    isEmailVerification: Yup.boolean().required('Is email verification is Required!'),
    isMaintenanceMode: Yup.boolean().required('Is maintenance mode is Required!')
  });

  const initialValues = {
    globalName: settings.globalName,
    siteLogo: settings.siteLogo,
    siteFavicon: settings.siteFavicon,
    isEmailVerification: settings.isEmailVerification && settings.isEmailVerification == 'true' ? true : false,
    isMaintenanceMode: settings.isMaintenanceMode && settings.isMaintenanceMode == 'true' ? true : false
  };

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
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
            "key": "globalName",
            "value": values.globalName
          },
          {
            "key": "siteLogo",
            "value": values.siteLogo
          },
          {
            "key": "siteFavicon",
            "value": values.siteFavicon
          },
          {
            "key": "isEmailVerification",
            "value": values.isEmailVerification
          },
          {
            "key": "isMaintenanceMode",
            "value": values.isMaintenanceMode
          }
        ];
        console.log('data: ', data);
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

  const handleDropFile = (event: any, name: string) => {
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
        if(name === "siteLogo"){
          setImagePreview(reader.result.toString());
        }else{
          setFaviconPreview(reader.result.toString());
        }
        setFieldValue(name, imageData);
    };
  };

  const removeImage = (name: string) => {
    if(name === "siteLogo"){
      setImagePreview(null);
    }else{
      setFaviconPreview(null);
    }
    setFieldValue(name, null);
  }


  console.log(errors);
  

  return <Card>
    <H6 fontSize={14} px={1} m={2}>
      General Settings
    </H6>

    <Divider />
    <form onSubmit={handleSubmit}>
      <Box padding={3}>
        <Grid container spacing={4}>
          <Grid size={{
            xs: 12
          }}>
            <TextBox type={"text"} fullWidth name="globalName" placeholder={t("global_name")} 
              handleBlur={handleBlur} handleChange={handleChange} 
              value={values.globalName} helperText={touched.globalName && errors.globalName ? String(errors.globalName) : ""} 
              error={Boolean(touched.globalName && errors.globalName)}
            />
          </Grid>

          {/* Site Logo */}
          <Grid size={{
            sm: 4,
            xs: 12
          }}>
            <fieldset aria-hidden="true" style={{
              padding: '8px', border: '1px solid #e5e7eb', borderRadius: '8px', height:'100%'

            }} >
              <legend style={{ color: '#0009 ', fontWeight: 400, fontSize: '1rem', lineHeight: ' 1.4375em', transform: 'scale(0.75)' }} ><span>Site logo</span></legend>
              {
                imagePreview && typeof imagePreview !== null && imagePreview !== undefined && imagePreview.trim() !== "" ?
                  <FlexBox gap={2} justifyContent={'center'}>
                    <Box sx={{ width: { xs: '50%', md: '100px', lg: '150px' }, p: 0, height: { xs: 'auto', md: '100px', lg: '150px' }, position: 'relative' }}>
                      <span onClick={() => { removeImage("site_logo") }} style={{ position: "absolute", top: '-10px', right: '-10px', cursor: "pointer" }}>
                        <DoDisturbOnIcon sx={{ fontSize: "20px", color: 'red' }} />
                      </span>
                      <img src={imagePreview} width={'100%'} height={'100%'} style={{ objectFit: "cover", borderRadius: 10, }} />
                    </Box>
                  </FlexBox>
                  :
                  <DropZone
                    onDrop={(e: any) => { handleDropFile(e, "siteLogo") }}
                    maxFiles={1}
                    minFiles={1}
                    curFile={values?.siteLogo ? values.siteLogo.length : 0} 
                    accept={['.png', '.gif', '.jpeg', '.jpg']}
                    formError={errors.siteLogo}
                    placeholder={'Drop files here or click to upload.'}
                    paragraph={'Upload up to 1 files'}
                  />
              }
            </fieldset>
          </Grid>
          
          {/* Site Favicon */}
          <Grid size={{
            sm: 4,
            xs: 12
          }}>
            <fieldset aria-hidden="true" style={{
              padding: '8px', border: '1px solid #e5e7eb', borderRadius: '8px', height:'100%'

            }} >
              <legend style={{ color: '#0009 ', fontWeight: 400, fontSize: '1rem', lineHeight: ' 1.4375em', transform: 'scale(0.75)' }} ><span>Site favicon</span></legend>
              {
                faviconPreview && typeof faviconPreview !== null && faviconPreview !== undefined && faviconPreview.trim() !== "" ?
                  <FlexBox gap={2} justifyContent={'center'}>
                    <Box sx={{ width: { xs: '50%', md: '100px', lg: '150px' }, p: 0, height: { xs: 'auto', md: '100px', lg: '150px' }, position: 'relative' }}>
                      <span onClick={() => { removeImage("site_favicon") }} style={{ position: "absolute", top: '-10px', right: '-10px', cursor: "pointer" }}>
                        <DoDisturbOnIcon sx={{ fontSize: "20px", color: 'red' }} />
                      </span>
                      <img src={faviconPreview} width={'100%'} height={'100%'} style={{ objectFit: "cover", borderRadius: 10, }} />
                    </Box>
                  </FlexBox>
                  :
                  <DropZone
                    onDrop={(e: any) => { handleDropFile(e, "siteFavicon") }}
                    maxFiles={1}
                    minFiles={1}
                    curFile={values?.siteFavicon ? values.siteFavicon.length : 0} 
                    accept={['.png', '.gif', '.jpeg', '.jpg', '.ico']}
                    formError={errors.siteFavicon}
                    placeholder={'Drop files here or click to upload.'}
                    paragraph={'Upload up to 1 files'}
                  />
              }
            </fieldset>
          </Grid>

          <Grid size={{
            sm: 6,
            xs: 12
          }}>
            <FlexBetween>
              <div>
                <Paragraph fontWeight={500}>{t('mandatory_email_verification')}
                </Paragraph>
                <Small color="text.secondary">{t('mandatory_message')}</Small>
              </div>
              <Switch checked={values.isEmailVerification} onChange={(e: any) => { setFieldValue("isEmailVerification", e.target.checked) }} />
            </FlexBetween>

            <FlexBetween mt={2}>
              <div>
                <Paragraph fontWeight={500}>{t('maintenance_mode')}</Paragraph>
                <Small color="text.secondary">{t('maintenance_message')}</Small>
              </div>
              <Switch checked={values.isMaintenanceMode} onChange={(e: any) => { setFieldValue("isMaintenanceMode", e.target.checked) }} />
            </FlexBetween>
          </Grid>
        </Grid>
      </Box>
      
      <Stack direction="row" spacing={3} padding={3}>
        <Button type='submit' variant="contained">Save Changes</Button>
        <Button variant="outlined">Cancel</Button>
      </Stack>
    </form>
  </Card>;
}