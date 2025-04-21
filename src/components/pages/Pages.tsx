import { useEffect, useState } from 'react';
import {
  Box, Card, Container, Divider, MenuItem, TextField, Button
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import FlexBox from '../flexbox/FlexBox';
import { H3 } from '../typography';
import ApiService from '../../services/apiServices/apiService';
import EditComponent from '../edit-component/EditComponent';
import Toast from '../../utils/toast';

const Pages = () => {
  const { t } = useTranslation();

  const [selectedValue, setSelectedValue] = useState('privacy-policy');
  const [pageData, setPageData] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeFilter = (value: string) => {
    setSelectedValue(value);
    setFieldValue("slug", value);
    setFieldValue("title", toTitleCase(value));
  };

  const toTitleCase = (str: string) => {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getPageContent = async () => {
    try {
      let response = await ApiService.getPageContent(selectedValue);
      setPageData(response.data);
    } catch (error) {
      console.error("Error fetching page data", error);
    }
  };

  useEffect(() => {
    getPageContent();
  }, [selectedValue]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    slug: Yup.string().required('Slug is required'),
    content: Yup.string().required('Content is required'),
    contentSp: Yup.string().required('Content in spanish is required')
  });

  const initialValues = {
    name: pageData?.name || selectedValue,
    slug: pageData?.slug || selectedValue,
    title: pageData?.title,
    content: pageData?.content || '',
    contentSp: pageData?.contentSp || '',
  };

  const {
    values,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: async (values: any) => {
      try {
        setIsSubmitting(true);
        await ApiService.updatePageContent({
          slug: values.slug,
          title: values.title,
          content: values.content,
          contentSp: values.contentSp
        });
        Toast.showSuccessMessage("Page saved successfully");
      } catch (error: any) {
        console.error(error);
        Toast.showErrorMessage(error?.response?.data?.message || 'Something went wrong');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const setHtmlData = (html: any) => {
    setFieldValue("content", html);
  };

  const setHtmlSpData = (html: any) => {
    setFieldValue("contentSp", html);
  };

  const list = [
    { value: "privacy-policy", label: t("privacy_policy") },
    { value: "terms-condition", label: t("terms_condition") }
  ]

  return (
    <>
      <FlexBox gap={0.5} alignItems="center">
        <H3 sx={{ mt: 0, mb: 2, fontSize: { xs: 20, md: 26 }, fontWeight: 600 }}>
          {t("Pages")}
        </H3>
      </FlexBox>

      <Container sx={{ px: '0 !important', maxWidth: { lg: "lg", xl: "xl" } }}>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={3} pb={2}>
            <Grid size={{ xs: 12, }}>
              <TextField
                select
                fullWidth
                label={t("Select Page")}
                value={selectedValue}
                onChange={(e) => handleChangeFilter(e.target.value)}
              >
                {
                  list.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    )
                  })
                }
              </TextField>
            </Grid>
          </Grid>

          <Divider />

          <Box pt={2}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <EditComponent setHtmlData={setHtmlData} value={values.content} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <EditComponent setHtmlData={setHtmlSpData} value={values.contentSp} />
                </Grid>
                <Grid size={{ xs: 12, }}>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? t("Saving...") : t("Save")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Pages;
