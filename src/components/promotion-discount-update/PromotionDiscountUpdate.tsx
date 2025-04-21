import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import * as Yup from 'yup';
import { useFormik } from "formik";
import Toast from "../../utils/toast";
import ApiService from "../../services/apiServices/apiService";
import { PromotionAndDiscountForm } from "../promotion-discount-form";
import dayjs from "dayjs";

export default function PromotionDiscountUpdate({ promotion, onSuccess }: any) {
  const validationSchema = Yup.object({
    code: Yup.string().required('Coupon Code is required!'),
    description: Yup.string().required('Description is required!'),
    discountType: Yup.string().oneOf(['percentage', 'fixed'], 'Invalid Discount Type').required('Discount Type is required!'),
    discountValue: Yup.number().typeError('Discount Value must be a number').required('Discount Value is required!'),
    minOrderAmount: Yup.number().optional(),
    maxDiscount: Yup.number().typeError('Max Discount must be a number').required('Max Discount is required!'),
    startDate: Yup.date().typeError('Start Date is required').required('Start Date is required!'),
    endDate: Yup.date()
      .typeError('End Date is required')
      .min(Yup.ref('startDate'), 'End Date must be after Start Date')
      .required('End Date is required!'),
    usageLimit: Yup.number().typeError('Usage Limit must be a number').required('Usage Limit is required!'),
    isActive: Yup.boolean()
  });

  const getInitialValues = () => ({
    code: promotion.code,
    description: promotion.description,
    discountType: promotion.discountType,
    discountValue: promotion.discountValue,
    minOrderAmount: promotion.minOrderAmount,
    maxDiscount: promotion.maxDiscount,
    startDate: dayjs(promotion.startDate).format("YYYY-MM-DDTHH:mm"),
    endDate: dayjs(promotion.endDate).format("YYYY-MM-DDTHH:mm"),
    usageLimit: promotion.usageLimit,
    isActive: promotion.isActive
  });

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
        const couponData = {
          id: promotion.id,
          code: values.code,
          description: values.description,
          discountType: values.discountType,
          discountValue: values.discountValue,
          minOrderAmount: values.minOrderAmount,
          maxDiscount: values.maxDiscount,
          startDate: values.startDate,
          endDate: values.endDate,
          usageLimit: values.usageLimit,
          isActive: values.isActive
        };
        const updateCoupon = await ApiService.updatePromotion(couponData);
        onSuccess(updateCoupon.data);
        Toast.showSuccessMessage('Coupon Updated Successfully');
      } catch (error: any) {
        Toast.showErrorMessage(error.response.data.message);
      }
    }
  });

  return (
    <Box sx={{ py: 5, marginTop: "0", display: "flex", justifyContent: "start", alignItems: "start" }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <PromotionAndDiscountForm
            action={"update"}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            values={values}
            touched={touched}
            errors={errors}
          />
        </Grid>
      </Grid>
    </Box>
  );
}