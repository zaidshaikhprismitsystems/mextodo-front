import { Box, Card, CardMedia, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ApiService from "../../services/apiServices/apiService";
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { category_url, phyical_name, digital_name, vehicle_name, property_name } from "../../config/config"
import { ProductPreview } from "../product-preview";
// STYLED COMPONENTS
import IconButton from '@mui/material/IconButton'
import styled from '@mui/material/styles/styled'
import { ProductForm } from "../product-form";


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
  // '&:hover': { backgroundColor: theme.palette.grey[400] },
}))

export default function AddTicket() {
  
  const { t, i18n } = useTranslation();
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
    titleEn: Yup.string().required('Title in English is Required!'),
    titleSp: Yup.string().required('Title in Spanish is Required!'),
    descriptionEn: Yup.string().required('Description in English is Required!'),
    descriptionSp: Yup.string().required('Description in Spanish is Required!'),
    images: Yup.array().min(5, 'You need to upload at least 5 images.')
    .max(14, 'You can only upload up to 14 images.')
    .required('Images are Required!'),
    price: Yup.number().required('Price is Required!'),
    stock: Yup.number().required('Stock is Required!'),
    digitalProduct: selectedCategoryName === digital_name 
      ? Yup.mixed().required('Digital Product is Required!') 
      : Yup.mixed().notRequired(),
    digitalProductType: selectedCategoryName === digital_name
      ? Yup.mixed().required('Digital Product Type is Required!') 
      : Yup.mixed().notRequired(),
    rentOrSale: selectedCategoryName === vehicle_name || selectedCategoryName === property_name
      ? Yup.string().required('Rent Or Sale is Required!') 
      : Yup.string().notRequired(),
    featuredImage: Yup.mixed().required('Featured image is Required!'),
    video: Yup.mixed().required("Video is Required!"),
    discountPrice:Yup.number().required('Discount Price is Required!'),
    ...attributes.reduce((acc: any, attr: any) => {
      acc[attr.attribute.nameEn] = Yup.string().required(`${i18n.language === "en" ? attr.attribute.nameEn : attr.attribute.nameSp } is required`);
      return acc;
    }, {})
  });

  const getInitialValues = () => {
    let initialValues: any = {
      titleEn: '',
      titleSp: '',
      descriptionEn: '',
      descriptionSp: '',
      images: [],
      price: 0,
      stock: 0,
      discountPrice: 0,
      featuredImage: '',
      digitalProduct: '',
      digitalProductType: 'image',
      video: '',
      weight_type: 'KG',
      dimensions_type: 'CM',
      unit: 'KG/CM',
      length: '',
      width: '',
      height: '',
      weight: '',
      country: '',
      states: '',
      city: '',
      rentOrSale: ''
    };
    
    attributes.forEach((attr: any) => {
      initialValues[attr.attribute.nameEn] = '';
    });
    
    return initialValues;
  };

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
              [attr.attribute.nameEn]: values[attr.attribute.nameEn]
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
        
        let productData = {
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
          digitalProduct: values.digitalProduct
        };
        
        let addProduct = await ApiService.addProduct(productData);
        Toast.showSuccessMessage('Product Added Successfully');
        navigate('/admindashboard/products');
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

  console.log(errors);
  

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

  const handleDropDigital = (event: any) => {
    const file = event[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
        if (reader.result) {
            const base64String = reader.result.toString().split(",")[1];
            const mimetype = file.type;

            setDigital(reader.result.toString()); 
            setFieldValue("digitalProduct", { data: base64String, mimetype }); 
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

  const removeImage = (index: number) => {
    setDisplayImages((prevImages: any) => prevImages.filter((_: any, i: number) => i !== index));
    setFieldValue("images", values.images.filter((_: any, i: number) => i !== index));
  }

  const handleRentOrSale = (value: string) => {
    setFieldValue("rentOrSale", value);
  }

  return (
    <Box sx={{py: 5, marginTop: "0", display: "flex", justifyContent: "start", alignItems: "start"}}>
      {
        selectedCategory && selectedCategory !== null ?
        <Grid container spacing={3} alignItems={"start"}>
           <Grid size={{xs:12, md:4}}>
           
            <ProductForm
              action={"add"}
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
              attributes={attributes.map((obj: any) => {
                return { name: obj.attribute.nameEn, nameSp: obj.attribute.nameSp, value: values[obj.attribute.nameEn] };
              })}
              displayImages={displayImages}
              categoryName={selectedCategoryName}
              handleChangeUnit={handleChangeUnit}
              digitalProduct={digital}
              handleDropDigital={handleDropDigital}
              digitalProductType={values.digitalProductType}
              removeDigitalProduct={removeDigitalProduct}
              states={states}
              cities={cities}
              handleRentOrSale={handleRentOrSale}
            />
          </Grid>

          <Grid size={{xs:12, md:8}}>
          {/* PREVIEW */}
            <ProductPreview 
              categoryName={selectedCategoryName} 
              featuredImage={featuredImage}
              images={displayImages}
              video={video}
              title={values.titleEn} 
              description={values.descriptionEn} 
              titleSp={values.titleSp} 
              descriptionSp={values.descriptionSp} 
              price={values.price} 
              discountPrice={values.discount_price} 
              attributes={attributes.map((data: any) => { return { name: data.attribute.nameEn, nameSp: data.attribute.nameSp, value: values[data.attribute.nameEn]  }  })}
              length={values.length}
              width={values.width}
              height={values.height}
              weight={values.weight}
              weight_type={values.weight_type}
              unit={values.unit}
              // digitalProduct={values.digitalProduct}
              // digitalProductType={values.digitalProductType}
          />
          </Grid>
        </Grid>
        : 
        <Box sx={{width:'100%', display: "flex", justifyContent: "start", alignItems: "start",}}>
          <Box sx={{width:'100%', m:'auto'}}>
          <Typography mb={3} variant="h5" textAlign={"center"} fontWeight={600} textTransform={'capitalize'}>{t("choose_listing_type")}</Typography>
          <Grid container spacing={3} justifyContent={"center"}>
          {
            categoryList && categoryList.length > 0 ?
            categoryList.map((data: any, index: number) => {
              return(
                <Grid  size={{xs:6, sm:4, md:4, lg:3}}>
                <Card>
                  <CardActionArea 
                    onClick={() => {setSelectedCategory(data.id); setSelectedCategoryName(data.nameEn)}}
                    sx={{
                      color:'primary',
                      height: '100%',
                      '&[data-active]': {
                        backgroundColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                        },
                      },
                    }}
                  >
                    <CardMedia
                      sx={{ height: 140 }}
                      image={`${category_url}/${data.image}`}
                      title="apple watch">
                    </CardMedia>
                    <CardContent sx={{ height: '100%' }}>
                    <Typography variant="h6" component="div" textTransform={'capitalize'} textAlign={"center"} fontSize={16} fontWeight={600} color={"black"}>
                        {i18n.language === "en" ? data.nameEn : data.nameSp}
                      </Typography>
                      <Typography  component="p" textAlign={"center"} fontSize={14} fontWeight={400} color="grey.500">
                        {i18n.language === "en" ? data.descriptionEn : data.descriptionSp}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              )
            })
            : ''
          }
          </Grid>
        </Box>
      </Box>
      }
    </Box>
  )
}