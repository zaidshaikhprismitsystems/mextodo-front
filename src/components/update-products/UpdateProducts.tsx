import { Box, Card, CardMedia, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { FlexBox } from "../flexbox"
import IconWrapper from '../icon-wrapper'
import { H2, H6, Paragraph } from "../typography"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { TextBox } from "../textbox";
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import CategoryIcon from '@mui/icons-material/Category';
import ApiService from "../../services/apiServices/apiService";
import AdminEcommerce from "../../icons/duotone/AdminEcommerce";
import Carousel from '../carousel'
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import DropZone from "../dropzone";
import Stack from '@mui/material/Stack'
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { ProductPreview } from "../product-preview";
// STYLED COMPONENTS
import IconButton from '@mui/material/IconButton'
import styled from '@mui/material/styles/styled'
import { ProductForm } from "../product-form";

import { category_url, phyical_name, product_url, digital_name, vehicle_name, property_name } from "../../config/config"

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

export default function UpdateProduct({product, handleClose, attributes, onSuccess}: any) {
  
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); 

  const [productData, setProductData] = useState<any>(product);

  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryList, setcategoryList] = useState([]);
  // const [attributes, setAttributeList] = useState<any>([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState(product.category.nameEn);
  
  const [country, setCountry] = useState<any>();
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  
  const [digital, setDigital] = useState<any>(`${product_url}/${product?.digitalProduct}`);
  const [featuredImage, setFeatured] = useState<any>(`${product_url}/${product?.featuredImage}`);
  const [video, setVideo] = useState<any>(`${product_url}/${product?.video}`);

  const [displayImages, setDisplayImages] = useState<any>(product.images.map((image: any) => `${product_url}/${image}`));
 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    titleEn: Yup.string().required('Title in English is Required!'),
    titleSp: Yup.string().required('Title in Spanish is Required!'),
    descriptionEn: Yup.string().required('Description in English is Required!'),
    descriptionSp: Yup.string().required('Description in Spanish is Required!'),
    images: Yup.array().min(5, 'You need to upload at least 5 images.')
    .max(14, 'You can only upload up to 14 images.')
    .required('Images are Required!'),
    price: Yup.number().required('Price is Required!'),
    stock: Yup.number().required('Stock is Required!'),
    status: Yup.string().optional(),
    digitalProduct: selectedCategoryName === digital_name ? Yup.mixed().required('Digital Product is Required!') : Yup.mixed().notRequired(),
    digitalProductType: selectedCategoryName === digital_name ? Yup.mixed().required('Digital Product Type is Required!') : Yup.mixed().notRequired(),
    rentOrSale: selectedCategoryName === vehicle_name || selectedCategoryName === property_name ? Yup.string().required('Rent Or Sale is Required!') : Yup.string().notRequired(),
    featuredImage: Yup.mixed().required('Featured image is Required!'),
    // video: Yup.mixed().required("Video is Required!"),
    video: selectedCategoryName !== digital_name ? Yup.mixed().required("Video is Required!") : Yup.mixed().notRequired(),
    discountPrice:Yup.number().required('Discount Price is Required!'),
    packType: selectedCategoryName === phyical_name ? Yup.string().required('Pack Type is Required!') : Yup.string().notRequired(),
    content: selectedCategoryName === phyical_name ? Yup.string().required('Content is Required!') : Yup.string().notRequired(),
    boxQuantity: selectedCategoryName === phyical_name ? Yup.string().required('Box Quantity is Required!') : Yup.string().notRequired(),
    ...attributes.reduce((acc: any, attr: any) => {
      acc[attr.name] = Yup.string().required(`${i18n.language === "en" ? attr.name : attr.nameSp } is required`);
      return acc;
    }, {})
  });

  const getInitialValues = () => {
    let initialValues: any = {
      titleEn: productData?.titleEn,
      titleSp: productData?.titleSp,
      descriptionEn: productData?.descriptionEn,
      descriptionSp: productData?.descriptionSp,
      images: productData?.images,
      price: productData?.price,
      stock: productData?.stock,
      discountPrice: productData?.discountPrice,
      featuredImage: productData?.featuredImage,
      video: productData?.video,
      digitalProduct: productData?.digitalProduct,
      digitalProductType: productData?.digitalProductType,
      weight_type: productData?.attributes?.weight_type,
      dimensions_type: productData?.attributes?.dimensions_type,
      unit: productData?.attributes?.unit,
      length: productData?.attributes?.length,
      width: productData?.attributes?.width,
      height: productData?.attributes?.height,
      weight: productData?.attributes?.weight,
      country: productData?.country,
      state: productData?.stateId,
      city: productData?.cityId,
      rentOrSale: productData?.rentOrSale,
      packType: productData?.packType,
      content: productData?.content,
      boxQuantity: productData?.boxQuantity,
      status: productData.status
    };
    attributes.map((obj: any) => {
      initialValues[obj.name] = obj.value;
    })
    return initialValues;
  };

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
        let attributesData: Record<string, any> = {};
        if (attributes && attributes.length > 0) {
          attributesData = attributes.map((attr: any) => {
            return {
              [attr.name]: values[attr.name]
            };
          }).reduce((acc: any, obj: any) => ({ ...acc, ...obj }), {});
        }
      
        // When physical name matches the selected category name, add product dimensions and weight
        if (phyical_name === selectedCategoryName) {
          attributesData["dimensions_type"] = values.dimensions_type;  
          attributesData["weight_type"] = values.weight_type;   
          attributesData["unit"] = values.unit;                 
          attributesData["length"] = values.length;             
          attributesData["width"] = values.width;              
          attributesData["height"] = values.height;           
          attributesData["weight"] = values.weight;
        }
        
        let productDataForm = {
          product_id: productData.id,
          titleEn: values.titleEn,
          titleSp: values.titleSp,
          descriptionEn: values.descriptionEn,
          descriptionSp: values.descriptionSp,
          price: values.price,
          discountPrice: values.discountPrice,
          images: values.images,
          stock: values.stock,
          attributes: attributesData,
          categoryId: selectedCategory,
          featuredImage: values.featuredImage,
          video: values.video,
          rentOrSale: values.rentOrSale,
          digitalProductType: values.digitalProductType,
          digitalProduct: values.digitalProduct,
          stateId: values.state,
          cityId: values.city,
          packType: values.packType,
          content: values.content,
          boxQuantity: values.boxQuantity,
          status: values.status
        };
        
        let updateProduct = await ApiService.updateProduct(productDataForm);
        Toast.showSuccessMessage('Product Updated Successfully');
        handleClose(true);
        onSuccess();
        // navigate('/dashboard/products');
      } catch (error: any) {
        console.log('Error caught: ', error);
        // Safeguard: check if error.response exists before accessing error.response.data
        if (error?.response?.data?.message) {
          Toast.showErrorMessage(error.response.data.message);
        } else if (error?.message) {
          Toast.showErrorMessage(`Error: ${error.message}`);
        } else {
          Toast.showErrorMessage('An unexpected error occurred');
        }
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

  const removeImage = (index: number) => {
    setDisplayImages((prevImages: any) => prevImages.filter((_: any, i: number) => i !== index));
    setFieldValue("images", values.images.filter((_: any, i: number) => i !== index));
  }

  const handleDropFeaturedImage = (event: any) => {
    const file = event[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
        if (reader.result) {
            const base64String = reader.result.toString().split(",")[1];
            const mimetype = file.type;

            setFeatured(reader.result.toString()); 
            setFieldValue("featuredImage", { image: base64String, mimetype }); 
        }
    };

    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };
  };

  const removeFeaturedImage = () => {
    setFeatured("");
    setFieldValue("featuredImage", "");
  }

  const handleDropVideo = (event: any) => {
    const file = event[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
        if (reader.result) {
            const base64String = reader.result.toString().split(",")[1];
            const mimetype = file.type;

            setVideo(reader.result.toString()); 
            setFieldValue("video", { data: base64String, mimetype }); 
        }
    };

    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };
  };

  const removeVideo = () => {
    setVideo("");
    setFieldValue("video", "");
  }

  const removeDigitalProduct = () => {
    setFieldValue("digitalProduct", "");
  }

  const handleDropDigital = (event: any) => {
    const file = event[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
        if (reader.result) {
            const base64String = reader.result.toString().split(",")[1];
            const mimetype = file.type;
            if(values.digitalProductType === "documents" || values.digitalProductType === "compresed_files"){
              setDigital(file.name);
            }else{
              setDigital(reader.result.toString());
            }
            setFieldValue("digitalProduct", { data: base64String, mimetype });
        }
    };

    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };
  };

  const handleRentOrSale = (value: string) => {
    setFieldValue("rentOrSale", value);
  }
  
  return (
    <Box sx={{py: 5, marginTop: "0", display: "flex", justifyContent: "start", alignItems: "start"}}>
      
        <Grid container spacing={3}>
           <Grid size={{xs:12}}>
              <ProductForm
                action={"update"}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                touched={touched}
                errors={errors}
                handleDropFile={handleDropFile}
                removeImage={removeImage}
                featuredImage={featuredImage}
                handleDropFeaturedImage={handleDropFeaturedImage}
                removeFeaturedImage={removeFeaturedImage}
                handleDropVideo={handleDropVideo}
                removeVideo={removeVideo}
                video={video}
                attributes={attributes}
                displayImages={displayImages}
                categoryName={selectedCategoryName}
                handleChangeUnit={handleChangeUnit}
                digitalProduct={digital}
                digitalProductType={values.digitalProductType}
                handleDropDigital={handleDropDigital}
                removeDigitalProduct={removeDigitalProduct}
                states={states}
                cities={cities}
                handleRentOrSale={handleRentOrSale}
                isUpdate={true}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
              />
          </Grid>
        </Grid>
    </Box>
  )
}