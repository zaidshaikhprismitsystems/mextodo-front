import { Box } from "@mui/material"
import Grid from '@mui/material/Grid2';
import * as Yup from 'yup';
import { useFormik } from "formik";
import Toast from "../../utils/toast";
import { useEffect, useState } from "react";
import ApiService from "../../services/apiServices/apiService";
import { PromotionAndDiscountFormOwner } from "../promotion-discount-form-owner";
import dayjs from "dayjs";

// STYLED COMPONENTS
import IconButton from '@mui/material/IconButton'
import styled from '@mui/material/styles/styled'

// STYLED COMPONENTS
export const CarouselRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  '& .slide': { objectFit: 'cover', borderRadius: 8 },
}))

export const SlideThumb = styled('div')(({ theme }) => ({
  width: 60,
  height: 55,
  opacity: 0.6,
  borderRadius: 4,
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  '&.active': { opacity: 1 },
  '&.active::after': { height: 3 },
  '&::after': {
    left: 0,
    height: 0,
    bottom: 0,
    content: '""',
    width: '100%',
    position: 'absolute',
    transition: '0.3s ease-in-out',
    backgroundColor: theme.palette.primary.main,
  },
  '& img': {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
  },
}))

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  top: 10,
  right: 10,
  position: 'absolute',
  backgroundColor: theme.palette.grey[200],
  // '&:hover': { backgroundColor: theme.palette.grey[400] },
}))

export default function PromotionDiscountUpdateOwner({isUpdate, enableUpdate, promotion, handleClose, onSuccess, checkVendorByPincode, addressData, isAddressDone}: any) {

  const [country, setCountry] = useState<any>();
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  
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
    description: Yup.string().required('Description is required!'),
    discountType: Yup.string().oneOf(['percentage', 'fixed'], 'Invalid Discount Type').required('Discount Type is required!'),
    discountValue: Yup.number().typeError('Discount Value must be a number').required('Discount Value is required!'),
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
    product_id: promotion.product_id,
    description: promotion.description,
    discountType: promotion.discountType,
    discountValue: promotion.discountValue,
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
        setIsSubmitting(true);
        const couponData = {
          id: promotion.id,
          product_id: values.product_id,
          code: values.code,
          description: values.description,
          discountType: values.discountType,
          discountValue: values.discountValue,
          startDate: values.startDate,
          endDate: values.endDate,
          usageLimit: values.usageLimit,
          isActive: values.isActive
        };
        
        let updateCoupon = await ApiService.updateVendorPromotion(couponData);
        onSuccess(updateCoupon.data);
        Toast.showSuccessMessage('Coupon Added Successfully');
      } catch (error: any) {
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      }finally{
        setIsSubmitting(false);
      }
    }
  });

  return (
    <Box sx={{py: 5, marginTop: "0", display: "flex", justifyContent: "start", alignItems: "start"}}>
      
        <Grid container spacing={3}>
           <Grid size={{xs:12}}>
              <PromotionAndDiscountFormOwner
                action={"update"}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                values={values}
                touched={touched}
                errors={errors}
                products={products}
              />
          </Grid>
        </Grid>
    </Box>
  )
}