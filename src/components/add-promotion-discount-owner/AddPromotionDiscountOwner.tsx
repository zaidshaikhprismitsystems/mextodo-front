import {
  Box,
  Grid,
} from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../utils/toast";
import ApiService from "../../services/apiServices/apiService";
import { PromotionAndDiscountFormOwner } from "../promotion-discount-form-owner";

export default function AddPromotionDiscountOwner() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [products, setOwnerProducts] = useState<any[]>([]);

  const getAllOwnerProducts = async () => {
    try {
      const res = await ApiService.getAllOwnerProducts();
      setOwnerProducts(res.data);
    } catch (error: any) {
      Toast.showErrorMessage(error.response?.data?.message || "Failed to fetch products");
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOwnerProducts();
  }, []);

  const validationSchema = Yup.object({
    code: Yup.string().required('Coupon Code is required!'),
    description: Yup.string(),
    discountType: Yup.string().oneOf(['percentage', 'fixed'], 'Invalid Discount Type').required('Discount Type is required!'),
    discountValue: Yup.number().typeError('Discount Value must be a number').required('Discount Value is required!'),
    startDate: Yup.date().typeError('Start Date is required').required('Start Date is required!'),
    endDate: Yup.date()
      .typeError('End Date is required')
      .min(Yup.ref('startDate'), 'End Date must be after Start Date')
      .required('End Date is required!'),
    usageLimit: Yup.number().optional(),
    product_id: Yup.number().required('Product selection is required'),
  });

  const getInitialValues = () => ({
    code: '',
    description: '',
    discountType : 'percentage',
    discountValue: 0,
    startDate: '',
    endDate: '',
    usageLimit: 1,
    product_id: '',
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
        setIsSubmitting(true);
        const couponData = {
          ...values,
        };
        await ApiService.addVendorPromotion(couponData);
        Toast.showSuccessMessage('Coupon Added Successfully');
        navigate('/dashboard/promotion-discount');
      } catch (error: any) {
        Toast.showErrorMessage(error?.response?.data?.message || "Failed to add coupon.");
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <Box sx={{ py: 5, display: "flex", justifyContent: "start" }}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          {
            !loading ?
            <PromotionAndDiscountFormOwner
              action="add"
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              values={values}
              touched={touched}
              errors={errors}
              products={products}
            />
            : ''
          }
        </Grid>
      </Grid>
    </Box>
  );
}
