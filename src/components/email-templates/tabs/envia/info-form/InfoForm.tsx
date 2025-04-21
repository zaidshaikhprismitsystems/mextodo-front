import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import * as Yup from 'yup';
import { useFormik } from 'formik'; // CUSTOM COMPONENTS

import { H6, Paragraph } from '../../../../typography';
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
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
export default function InfoForm({settings}: any) {
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState<any>(false);
  
  const { t } = useTranslation();

  const userData: any = useAppSelector((state: RootState) => state.user);

  const validationSchema = Yup.object({
    sandboxKey: Yup.string().required('Sandbox Key is Required!'),
    sandboxApi: Yup.string().required('Sandbox Api is Required!'),
    liveKey: Yup.string().required('Live Key is Required!'),
    liveApi: Yup.string().required('Live Api is Required!'),
    mode: Yup.string().required('Mode is Required!')
  });

  const initialValues = {
    sandboxKey: settings.sandboxKey,
    sandboxApi: settings.sandboxApi,
    liveKey: settings.liveKey,
    liveApi: settings.liveApi,
    mode: settings.mode
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
            "key": "sandboxKey",
            "value": values.sandboxKey
          },
          {
            "key": "sandboxApi",
            "value": values.sandboxApi
          },
          {
            "key": "liveKey",
            "value": values.liveKey
          },
          {
            "key": "liveApi",
            "value": values.liveApi
          },
          {
            "key": "mode",
            "value": values.mode
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

  console.log(errors);
  

  return <Card>
      <H6 fontSize={14} px={1} m={2}>
      {t("envia_settings")}
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
                <TextBox type={"text"} fullWidth name="sandboxKey" placeholder={t("sandboxKey")} 
                  handleBlur={handleBlur} handleChange={handleChange} 
                  value={values.sandboxKey} helperText={touched.sandboxKey && errors.sandboxKey ? String(errors.sandboxKey) : ""} 
                  error={Boolean(touched.sandboxKey && errors.sandboxKey)}
                />
              </Grid>

              <Grid size={{
                sm: 6,
                xs: 12
              }}>
               <TextBox type={"text"} fullWidth name="sandboxApi" placeholder={t("sandboxApi")} 
                  handleBlur={handleBlur} handleChange={handleChange} 
                  value={values.sandboxApi} helperText={touched.sandboxApi && errors.sandboxApi ? String(errors.sandboxApi) : ""} 
                  error={Boolean(touched.sandboxApi && errors.sandboxApi)}
                />
              </Grid>
             
              <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <TextBox type={"text"} fullWidth name="liveKey" placeholder={t("liveKey")} 
                  handleBlur={handleBlur} handleChange={handleChange} 
                  value={values.liveKey} helperText={touched.liveKey && errors.liveKey ? String(errors.liveKey) : ""} 
                  error={Boolean(touched.liveKey && errors.liveKey)}
                />
              
              </Grid>

              <Grid size={{
                sm: 6,
                xs: 12
              }}>
               <TextBox type={"text"} fullWidth name="liveApi" placeholder={t("liveApi")} 
                  handleBlur={handleBlur} handleChange={handleChange} 
                  value={values.liveApi} 
                  helperText={touched.liveApi && errors.liveApi ? String(errors.liveApi) : ""} 
                  error={Boolean(touched.liveApi && errors.liveApi)}
                />
              </Grid>

              <Grid size={{
                sm: 6,
                xs: 12
              }}>
                <label id="demo-row-radio-buttons-group-label">{t('mode')}</label>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="sandbox" control={<Radio checked={values.mode === 'sandbox'} onChange={(e: any) => {setFieldValue("mode", e.target.value)}} />} label="Sandbox" />
                  <FormControlLabel value="live" control={<Radio checked={values.mode === 'live'} onChange={(e: any) => {setFieldValue("mode", e.target.value)}} />} label="Live" />
                </RadioGroup>
                <Typography sx={{fontSize: "12px"}}>{touched.liveApi && errors.liveApi ? String(errors.liveApi) : ""}</Typography>
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