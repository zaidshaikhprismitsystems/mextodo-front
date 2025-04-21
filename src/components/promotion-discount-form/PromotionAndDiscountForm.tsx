import { Box, Button, Card, FormControlLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Fragment } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from "react-i18next";

import { TextBox } from '../textbox';
import { FlexBox } from '.././flexbox';
import { H6 } from '../typography';
import DatasetIcon from '@mui/icons-material/Dataset';
import IconWrapper from '../icon-wrapper'
import DiscountIcon from '@mui/icons-material/Discount';

export default function CouponForm({
  action,
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  isUpdate,
  isSubmitting,
  handleClose,
  setFieldValue
}: any) {
  const { t } = useTranslation();

  return (
    <Box sx={{ padding: 0, marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={3} alignItems="start">
            <Grid size={12}>
              <FlexBox gap={0.5} alignItems="center">
                <IconWrapper>
                  <DiscountIcon color="primary" />
                </IconWrapper>
                <H6 sx={{ m: 0 }} fontSize={16}>{t("create_new_coupon")}</H6>
              </FlexBox>
            </Grid>

            <Grid container spacing={2} size={{ md: 12, xs: 12 }}>
              <Grid size={12}>
                <H6 sx={{ my: 1 }} fontSize={16}>{t("main_parameters")}</H6>
              </Grid>

              <Grid size={{ sm: 12, xs: 12 }}>
                <TextBox
                  type="text"
                  fullWidth
                  placeholder={t("coupon_code")}
                  name="code"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.code}
                  error={Boolean(touched.code && errors.code)}
                  helperText={touched.code && typeof errors.code === "string" ? errors.code : ""}
                />
              </Grid>

              <Grid size={{ sm: 12, xs: 12 }}>
                <TextBox
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  placeholder={t("description")}
                  name="description"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.description}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && typeof errors.description === "string" ? errors.description : ""}
                  
                />
              </Grid>

              <Grid size={{ sm: 6, xs: 12 }}>
                <TextField
                  select
                  fullWidth
                  label={t("discount_type")}
                  name="discountType"
                  value={values.discountType}
                  onChange={(e) => setFieldValue("discountType", e.target.value)}
                  
                  error={Boolean(touched.discountType && errors.discountType)}
                  helperText={touched.discountType && typeof errors.discountType === "string" ? errors.discountType : ""}
                >
                  <MenuItem value="percentage">{t("percentage")}</MenuItem>
                  <MenuItem value="fixed">{t("fixed")}</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ sm: 6, xs: 12 }}>
                <TextBox
                  type="number"
                  fullWidth
                  placeholder={t("discount_value")}
                  name="discountValue"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.discountValue}
                  error={Boolean(touched.discountValue && errors.discountValue)}
                  helperText={touched.discountValue && typeof errors.discountValue === "string" ? errors.discountValue : ""}
                  
                />
              </Grid>

              <Grid size={{ sm: 6, xs: 12 }}>
                <TextBox
                  type="number"
                  fullWidth
                  placeholder={t("minimum_order_amount")}
                  name="minOrderAmount"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.minOrderAmount}
                  error={Boolean(touched.minOrderAmount && errors.minOrderAmount)}
                  helperText={touched.minOrderAmount && typeof errors.minOrderAmount === "string" ? errors.minOrderAmount : ""}
                  
                />
              </Grid>

              <Grid size={{ sm: 6, xs: 12 }}>
                <TextBox
                  type="number"
                  fullWidth
                  placeholder={t("max_discount")}
                  name="maxDiscount"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.maxDiscount}
                  error={Boolean(touched.maxDiscount && errors.maxDiscount)}
                  helperText={touched.maxDiscount && typeof errors.maxDiscount === "string" ? errors.maxDiscount : ""}
                  
                />
              </Grid>

              <Grid size={{ sm: 6, xs: 12 }}>
                <TextBox
                  type="datetime-local"
                  fullWidth
                  name="startDate"
                  placeholder={t("start_time")}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.startDate}
                  error={Boolean(touched.startDate && errors.startDate)}
                  helperText={touched.startDate && typeof errors.startDate === "string" ? errors.startDate : ""}
                  
                />
              </Grid>

              <Grid size={{ sm: 6, xs: 12 }}>
                <TextBox
                  type="datetime-local"
                  fullWidth
                  name="endDate"
                  placeholder={t("end_date")}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.endDate}
                  error={Boolean(touched.endDate && errors.endDate)}
                  helperText={touched.endDate && typeof errors.endDate === "string" ? errors.endDate : ""}
                  
                />
              </Grid>

              <Grid size={{ sm: 6, xs: 12 }}>
                <TextBox
                  type="number"
                  fullWidth
                  placeholder={t("usage_limit")}
                  name="usageLimit"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.usageLimit}
                  error={Boolean(touched.usageLimit && errors.usageLimit)}
                  helperText={touched.usageLimit && typeof errors.usageLimit === "string" ? errors.usageLimit : ""}
                />
              </Grid>

              {
                action === 'update' ?
                <Grid>
                  <label id="demo-row-radio-buttons-group-label">{t('status')}</label>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value={true} 
                      control={<Radio checked={values.isActive === true} onChange={(e: any) => {setFieldValue("isActive", e.target.checked)}} />} label="True" />
                    <FormControlLabel value={false} 
                      control={<Radio checked={values.isActive === false} onChange={(e: any) => {setFieldValue("isActive", !e.target.checked)}} />} label="False" />
                  </RadioGroup>
                </Grid>
                : ''
              }

            </Grid>

            {(
              <Grid size={12} mt={3}>
                <FlexBox gap={2} flexWrap="wrap">
                  <LoadingButton loading={isSubmitting} type="submit" variant="contained">
                    {action === 'update' ? t("update_coupon") : t("add_coupon")}
                  </LoadingButton>
                  <Button onClick={handleClose} variant="outlined">
                    {t("cancel")}
                  </Button>
                </FlexBox>
              </Grid>
            )}
          </Grid>
        </Card>
      </form>
    </Box>
  );
}
