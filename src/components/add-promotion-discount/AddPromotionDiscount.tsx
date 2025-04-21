import { Box } from "@mui/material"
import Grid from '@mui/material/Grid2';
import * as Yup from 'yup';
import { useFormik } from "formik";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ApiService from "../../services/apiServices/apiService";
import { PromotionAndDiscountForm } from "../promotion-discount-form";

// STYLED COMPONENTS
import IconButton from '@mui/material/IconButton'
import styled from '@mui/material/styles/styled'

// STYLED COMPONENTS
export const CarouselRoot = styled('div')(() => ({
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
}))

export default function AddPromotionDiscount() {
  
  const navigate = useNavigate();

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
  });

  const getInitialValues = () => ({
    code: '',
    description: '',
    discountType: 'percentage', // default option
    discountValue: 0,
    minOrderAmount: 0,
    maxDiscount: 0,
    startDate: '',
    endDate: '',
    usageLimit: 1,
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
          code: values.code,
          description: values.description,
          discountType: values.discountType,
          discountValue: values.discountValue,
          minOrderAmount: values.minOrderAmount,
          maxDiscount: values.maxDiscount,
          startDate: values.startDate,
          endDate: values.endDate,
          usageLimit: values.usageLimit,
        };

        await ApiService.addPromotion(couponData);
        Toast.showSuccessMessage('Coupon Added Successfully');
        navigate('/admindashboard/promotion-discounts');
      } catch (error: any) {
        Toast.showErrorMessage(error.response.data.message);
      }
    }
  });
  
  useEffect(() => {
    getStates();
  }, [] )

  const getStates = async () => {
    try{
      let data = await ApiService.getStates();
      setFieldValue("country", data.data.id)
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    if(values.state){
      getCities(values.state);
    }
  }, [values.state]);

  const getCities = async (id: number) => {
    try{
      let data = await ApiService.getCities(id);
      setFieldValue("state", id)
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
      getCategories();
    }, [])

    const getCategories = async () => {
      try {
        let categories = await ApiService.getCategories();
      } catch (error: any) {
        Toast.showErrorMessage(error.response.data.message);
      }
    }

  return (
    <Box sx={{py: 5, marginTop: "0", display: "flex", justifyContent: "start", alignItems: "start"}}>
      
        <Grid container spacing={3} alignItems={"start"}>
           <Grid size={{xs:12}}>
            <PromotionAndDiscountForm
              action={"add"}
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
  )
}