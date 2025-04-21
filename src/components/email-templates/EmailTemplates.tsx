import { useEffect, useState } from 'react'; // MUI

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
// CUSTOM COMPONENTS
import { H3 } from '../typography';
import FlexBox from '../flexbox/FlexBox'; // CUSTOM PAGE SECTION COMPONENTS
import * as Yup from 'yup';

import { Button, Container, Divider, MenuItem, TextField } from '@mui/material';
import ApiService from '../../services/apiServices/apiService';
import EditComponent from '../edit-component/EditComponent';
import { useFormik } from 'formik';
import Toast from '../../utils/toast';
import { useNavigate } from 'react-router-dom';
import { TextBox } from '../textbox';
import { useTranslation } from 'react-i18next';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const EmailTemplates = () => {

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedValue, setSelectedValue] = useState('customer_register');
  const [pattern, setPattern] = useState<any>();

  function toTitleCase(str: string) {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const handleChangeFilter = (value: string) => {
    console.log(value);
    setSelectedValue(value);
    setFieldValue("slug", value);
    setFieldValue("name", toTitleCase(value));
  }

  useEffect(() => {
    getEmailPattern();
  }, [selectedValue])

  const getEmailPattern = async () => {
    setLoading(true);
    try{
      let pattern = await ApiService.getEmailPattern(selectedValue);
      setPattern(pattern.data);
      console.log(pattern);
      // setFieldValue("slug", selectedValue);
      // setFieldValue("name", toTitleCase(selectedValue));
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required!'),
    slug: Yup.string().required('Slug is Required!'),
    subject: Yup.string().required('Subject is Required!'),
    subjectSp: Yup.string().required('Subject Spanish is Required!'),
    html: Yup.string().required('Html is Required!'),
    htmlSp: Yup.string().required('Html Spanish is Required!') 
  });

  const initialValues = {
    name: pattern?.name,
    subject: pattern?.subject,
    subjectSp: pattern?.subjectSp,
    slug: pattern?.slug,
    html: pattern?.html,
    htmlSp: pattern?.htmlSp
  };

  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: async (values: any) => {
      try {
        console.log(values);
        setIsSubmitting(true);
        let addPattern = await ApiService.addPattern({ name: values.name, slug: values.slug, subject: values.subject, html: values.html, subjectSp: values.subjectSp, htmlSp: values.htmlSp });
        Toast.showSuccessMessage('Pattern Added Successfully');
        // navigate("/admindashboard/attributes");
      } catch (error: any) {
        console.log('error: ', error);
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      }finally{
        setIsSubmitting(false);
      }
    }
  });

  const setHtmlData = (html: any) => {
    setFieldValue("html", html);
  }

  const setHtmlDataSp = (html: any) => {
    setFieldValue("htmlSp", html);
  }

  const { t } = useTranslation();

  let menuItems = [
    { value: 'customer_register', label: t('customer_register') },
    { value: 'forget_password', label: t('forget_password') },
    { value: 'seller_register', label: t('seller_register') },
    { value: 'seller_approve', label: t('seller_approve') },
    { value: 'seller_reject', label: t('seller_reject') },
    { value: 'seller_reset', label: t('seller_reset') },
  
    { value: 'create_product', label: t('create_product') },
    { value: 'approve_product', label: t('approve_product') },
    { value: 'reject_product', label: t('reject_product') },
  
    { value: 'create_ticket', label: t('create_ticket') },
    { value: 'ticket_status', label: t('ticket_status') },
    { value: 'ticket_reply', label: t('ticket_reply') },
    { value: 'ticket_close', label: t('ticket_close') },
  
    { value: 'order_placed', label: t('order_placed') },
    { value: 'order_shipped', label: t('order_shipped') },
    { value: 'order_delivered', label: t('order_delivered') },
    { value: 'order_cancelled', label: t('order_cancelled') },
    { value: 'order_returned', label: t('order_returned') },
    { value: 'order_refunded', label: t('order_refunded') },
    { value: 'order_review_request', label: t('order_review_request') },
    { value: 'order_review_reminder', label: t('order_review_reminder') },
    { value: 'order_invoice', label: t('order_invoice') },
  
    { value: 'order_thank_you', label: t('order_thank_you') },
    { value: 'order_status_update', label: t('order_status_update') },
    { value: 'order_tracking', label: t('order_tracking') }
  ];
  

  return (
    <>
      <FlexBox gap={0.5} alignItems="center">
        <H3 sx={{ mt: 0, mb: 2, fontSize: { xs: 20, md: 26 }, fontWeight: 600 }}>Email Templates</H3>
      </FlexBox>
      
      <Container sx={{ px: '0 !important', maxWidth: { lg: "lg", xl: "xl" } }}>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={3} pb={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                label={'Select'}
                className="select"
                value={selectedValue}
                onChange={(e) => handleChangeFilter(e.target.value)}
              >
                {
                  menuItems && menuItems.map((item: any, index: number) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    )
                  }
                  )
                }

                {/* <MenuItem key={0} value={'customer_register'}>
                  {'Customer Registration'}
                </MenuItem>

                <MenuItem key={1} value={'seller_register'}>
                  {'Seller Registration'}
                </MenuItem>

                <MenuItem key={2} value={'seller_approve'}>
                  {'Seller Approve'}
                </MenuItem>

                <MenuItem key={3} value={'seller_reject'}>
                  {'Seller Reject'}
                </MenuItem> */}
              </TextField>
            </Grid>
          </Grid>
            <Divider/>
          <Box pt={2}>
            {
              !loading ? 
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Grid container spacing={3}>
                  <Grid container spacing={2} size={12}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextBox
                        type={"text"}
                        fullWidth={true}
                        placeholder={t("subject")} 
                        name={"subject"} 
                        handleBlur={handleBlur} 
                        handleChange={handleChange} 
                        value={values.subject}
                        helperText={touched.subject && typeof errors.subject === "string" ? errors.subject : ""} 
                        error={Boolean(touched.subject && errors.subject)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextBox
                        type={"text"}
                        fullWidth={true}
                        placeholder={t("subjectSp")} 
                        name={"subjectSp"} 
                        handleBlur={handleBlur} 
                        handleChange={handleChange} 
                        value={values.subjectSp}
                        helperText={touched.subjectSp && typeof errors.subjectSp === "string" ? errors.subjectSp : ""} 
                        error={Boolean(touched.subjectSp && errors.subjectSp)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container size={12}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <EditComponent setHtmlData={setHtmlData} value={values.html} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <EditComponent setHtmlData={setHtmlDataSp} value={values.htmlSp} />
                    </Grid>
                  </Grid>
                  <Grid size={{ xs: 12, }}>
                    <Button type='submit' variant='contained'>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
              :
              <Stack spacing={1}>
              {/* For variant="text", adjust the height via font-size */}
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width={210} height={60} />
              {/* <Skeleton variant="rounded" width={210} height={60} /> */}
            </Stack>
            }
          </Box>
        </Card>
      </Container >
    </>
)
};

export default EmailTemplates;
