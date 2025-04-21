import { Box, Button, Card, CardMedia, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ApiService from "../../services/apiServices/apiService";
import { phyical_name, digital_name, vehicle_name, property_name } from "../../config/config"
// STYLED COMPONENTS
import IconButton from '@mui/material/IconButton'
import styled from '@mui/material/styles/styled'
import { PromotionAndDiscountForm } from "../promotion-discount-form";


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

export default function AddPromotionDiscount() {
  
  // const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const carouselRef = useRef<any>(null)
  const [colorSelect, setColorSelect] = useState('red')
  const [selectedSlide, setSelectedSlide] = useState(0)

  // HANDLE CHANGE PRODUCT COLOR
  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    setColorSelect(event.target.value)
  }

  const handleChangeSlide = (index: number) => {
    carouselRef.current!.slickGoTo(index)
    setSelectedSlide(index)
  }

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCategoryName, setSelectedCategoryName] = useState();
  const [categoryList, setcategoryList] = useState([]);
  const [attributes, setAttributeList] = useState<any>([]);

  const [displayImages, setDisplayImages] = useState<any>([]);
  const [featuredImage, setFeatured] = useState<any>();
  const [video, setVideo] = useState<any>();
  const [digital, setDigital] = useState<any>();

  const [country, setCountry] = useState<any>();
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  
  const [ mainImages, setMainImages ] = useState<any>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);
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

        let addCoupon = await ApiService.addPromotion(couponData);
        Toast.showSuccessMessage('Coupon Added Successfully');
        navigate('/admindashboard/promotion-discounts');
      } catch (error: any) {
        Toast.showErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      }finally{
        setIsSubmitting(false);
      }
    }
  });
  
  useEffect(() => {
    getStates();
  }, [] )

  const getStates = async () => {
    try{
      let data = await ApiService.getStates();
      setCountry({id: data.data.id, name: data.data.name});
      setFieldValue("country", data.data.id)
      setStates(data.data.states);
    }catch(e){
      console.log(e);
    }
    finally{
      // setIsLoading(false);
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
      setCities(data.data);
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
        setcategoryList(categories.data);
      } catch (error: any) {
        Toast.showErrorMessage(error.response.data.message);
      }
    }

    const handleChangeUnit = async (e: any) => {
      setFieldValue("unit", e.target.innerText);
      if(e.target.innerText === "KG/CM"){
        setFieldValue("weight_type", "KG")
        setFieldValue("dimensions_type", "CM")
      }else{
        setFieldValue("weight_type", "LB")
        setFieldValue("dimensions_type", "IN")
      }
    }

    useEffect(() => {
      if(selectedCategory && selectedCategory !== null && selectedCategory !== undefined){
        fetchCategoryAttributes();
      }
    }, [selectedCategory])

    const fetchCategoryAttributes = async () => {
      try {
        let categoryAttributes = await ApiService.fetchCategoryAttributes(selectedCategory);
        setAttributeList(categoryAttributes.data);
        console.log('categoryAttributes.data: ', categoryAttributes.data);
      } catch (error: any) {
        Toast.showErrorMessage(error.response.data.message);
      }
    }

  const handleDropFile = (event: any) => {
    const files = event;
    
    const showImages: string[] = [];

    const promises = files.map((file: any) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          
          reader.onloadend = () => {
              if (!reader.result) return reject("Failed to read file");

              showImages.push(reader.result.toString());

              const base64String = reader.result.toString().split(",")[1];
              if (!base64String) return reject("Invalid base64 string");

              const mimetype = file.type;
              resolve({ image: base64String, mimetype });
          };
          reader.onerror = () => reject(reader.error);
      });
  });

  Promise.all(promises)
      .then((images) => {
          setDisplayImages((prevImages: any) => [...prevImages, ...showImages]);
          setFieldValue("images", [...values.images, ...images]);

      })
      .catch((error) => console.error("Error processing files:", error));
  };

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