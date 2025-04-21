import { ChangeEvent, useEffect, useRef, useState } from 'react'
// MUI
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
// CUSTOM COMPONENTS
import Counter from '../../components/counter'
import Carousel from '../../components/carousel'
// import ColorRadio from '@/components/color-radio'
import FlexBox from '../../components/flexbox/FlexBox'
import { H2, H6, Paragraph } from '../../components/typography'
// CUSTOM ICON COMPONENTS
import Heart from '../../icons/Heart'
import Twitter from '../../icons/social/Twitter'
import ChevronDown from '../../icons/ChevronDown'
import Facebook from '../../icons/social/Facebook'
import Instagram from '../../icons/social/Instagram'
// STYLED COMPONENTS
import { CarouselRoot, SlideThumb, StyledIconButton } from './style/index'
import { Box, Container, Tab, Tabs } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import React from 'react'
import ProductReviews from '../product-review'
import ProductDescription from './ProductDescription'
import ApiService from '../../services/apiServices/apiService'
import { useSearchParams } from 'react-router-dom'
import { product_url } from '../../config/config'
import { useTranslation } from 'react-i18next'

const Product = () => {

  const carouselthumbRef = useRef<any>(null)

  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [active, setActive] = useState('General Settings');
  // const downMd = useMediaQuery(theme => theme.breakpoints.down('md'));

  const carouselRef = useRef<any>(null)
  const [colorSelect, setColorSelect] = useState('red')
  const [selectedSlide, setSelectedSlide] = useState(0)

  const [product, setProduct] = useState<any>({});
  console.log('product: ', product);

  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');

  useEffect(() => {
    if(productId !== null && productId !== undefined){
      getProductDetails(parseInt(productId));
    }
  }, [productId])

  const getProductDetails = async(id: number) => {
    try{
      let product = await ApiService.getProductById(id);
      setProduct(product.data);
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  // // HANDLE CHANGE PRODUCT COLOR
  // const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
  //   setColorSelect(event.target.value)
  // }

  const handleChangeSlide = (index: number) => {
    carouselRef.current!.slickGoTo(index)
    setSelectedSlide(index)
  }

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  const {t, i18n} = useTranslation();

  return (
    <Container sx={{ py: { xs: 5, md: 8 }}}>
      {
        product && product !== undefined && Object.entries(product).length > 0 ?
        <Grid container spacing={8}>
          
        <Grid size={12} sx={{width: '100%' }}>
          <Grid container spacing={3}>
            {/* PRODUCT IMAGE  */}
            <Grid size={{ md: 7, xs: 12 }}>
              <CarouselRoot className="product-img-preview" sx={{ aspectRatio: '16/12', '& > *': { height: '100%', }, borderRadius: '8px', border: '1px solid rgb(201, 201, 201)', backgroundColor: 'grey.100' }}>
                <Carousel
                  dots={false}
                  slidesToShow={1}
                  ref={carouselRef}
                  asNavFor={carouselthumbRef.current}
                  afterChange={(slideNo: any) => setSelectedSlide(slideNo)}
                >
                  {
                    product && product.featuredImage ?
                    <img key={product.featuredImage} className="slide" src={`${product_url}/${product.featuredImage}`} />
                    : ''
                  }
                  {
                    product && product.featuredImage ?
                    <video key={product.video} controls className="slide" src={`${product_url}/${product.video}`} />
                    : ''
                  }
                  {
                    product && product.images.map((image: any, index: number) => (
                      <img key={index} className="slide" src={`${product_url}/${image}`} />
                    ))
                  }
                </Carousel>
              </CarouselRoot>
              {/* SLIDE THUMBS */}
              <Box mt={1} width={'100%'}>
                <CarouselRoot>
                  <Carousel
                    dots={false}
                    arrows={true}
                    infinite={false}
                    slidesToShow={6}
                    responsive={[
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 5,
                        },
                      },
                      {
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 4,
                        },
                      },
                      {
                        breakpoint: 480,
                        settings: {
                          slidesToShow: 4,
                        },
                      },
                    ]}
                    ref={carouselthumbRef}
                    asNavFor={carouselRef.current}
                    afterChange={(slideNo: any) => setSelectedSlide(slideNo)}
                  >
                    {
                      product && product.featuredImage ?
                      <SlideThumb sx={{ aspectRatio: '1/1', height: 'auto' }}
                          key={product.featuredImage}
                          onClick={() => handleChangeSlide(0)}
                          className={selectedSlide === 0 ? 'active' : ''}
                        >
                          <img key={product.featuredImage} className="slide" src={`${product_url}/${product.featuredImage}`} />
                        </SlideThumb>
                      : ''
                    }
                    {
                      product && product.video ?
                      <SlideThumb sx={{ aspectRatio: '1/1', height: 'auto' }}
                          key={product.video}
                          onClick={() => handleChangeSlide(1)}
                          className={selectedSlide === 1 ? 'active' : ''}
                        >
                          <video controls key={product.video} className="slide" src={`${product_url}/${product.video}`} />
                        </SlideThumb>
                      : ''
                    }
                    {
                      product && product.images.map((item: any, index: number) => (
                        <SlideThumb sx={{ aspectRatio: '1/1', height: 'auto' }}
                          key={item}
                          onClick={() => handleChangeSlide(product.featuredImage && product.video ? index+2 : product.featuredImage || product.video ? index +1 : index)}
                          className={selectedSlide === (product.featuredImage && product.video ? index+2 : product.featuredImage || product.video ? index +1 : index) ? 'active' : ''}
                        >
                          <img key={index} className="slide" src={`${product_url}/${item}`} />
                        </SlideThumb>
                      ))
                    }
                  </Carousel>
                </CarouselRoot>
              </Box>
            </Grid>

            {/* PRODUCT INFORMATION */}
            <Grid size={{ md: 5, xs: 12 }}>
              <Chip color={product.stock > 0 ? "success" : "error"} size="small" label={product.stock > 0 ? t("in_stock") : t("out_of_stock")} />

              {/* PRODUCT CATEGORY */}
              <Paragraph color="text.secondary" mt={2}>
                {i18n.language === "en" ? product.category.nameEn : product.category.nameSp}
              </Paragraph>

              {/* PRODUCT NAME */}
              <H6>{i18n.language === "en" ? product.titleEn : product.titleSp}</H6>

              {/* PRODUCT PRICE */}
              <H2 color="primary.main" my={2}>
                {product.discountPrice ? 
                <>
                <del>${product.price}</del>
                ${product.discountPrice}
                </> 
                : product.price } 
              </H2>

              {/* PRODUCT COLOR */}
              {/* <FlexBox alignItems="center" gap={3}>
            <H6 fontSize={16}>Colors:</H6>

            <RadioGroup row value={colorSelect} onChange={handleChangeColor} sx={{ gap: 1 }}>
              <ColorRadio value="red" icon_color="#FF316F" />
              <ColorRadio value="pumpkin" icon_color="#FE8969" />
              <ColorRadio value="purple" icon_color="#8C8DFF" />
              <ColorRadio value="green" icon_color="#27CE88" />
            </RadioGroup>
          </FlexBox> */}

              {/* PRODUCT SIZE */}
              {/* <FlexBox alignItems="center" gap={3} mt={3}>
                <H6 fontSize={16}>Select size:</H6>

                <TextField
                  select
                  size="small"
                  variant="outlined"
                  slotProps={{
                    select: {
                      native: true,
                      IconComponent: ChevronDown,
                    },
                  }}
                  sx={{
                    '.MuiNativeSelect-select': { lineHeight: 1 },
                  }}
                >
                  <option value="42">42</option>
                  <option value="41">41</option>
                  <option value="40">40</option>
                </TextField>
              </FlexBox> */}

              {/* PRODUCT QUANTITY */}
              <FlexBox alignItems="center" gap={3} mt={3}>
                <H6 fontSize={16}>Quantity:</H6>
                <Counter />
                <Paragraph color="text.secondary">Available: {product.stock}</Paragraph>
              </FlexBox>

              {/* PRODUCT ADD TO CART BUTTON */}
              <FlexBox alignItems="center" gap={3} mt={3}>
                <Button variant="contained">Add to cart</Button>
                <Button variant="contained" color="success">
                  Buy Now
                </Button>
              </FlexBox>

              {/* SOCIAL LINK BUTTONS */}
              <FlexBox mt={2}>
                <IconButton onClick={() => {
                  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                  window.open(facebookUrl, '_blank');
                }}>
                  <Facebook sx={{ color: 'text.secondary' }} />
                </IconButton>

                <IconButton onClick={() => {
                  alert("Instagram does not support web link sharing. Please share manually or via Instagram app.");
                }}>
                  <Instagram sx={{ color: 'text.secondary' }} />
                </IconButton>

                <IconButton onClick={() => {
                  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(i18n.language === 'en' ? product.titleEn : product.titleSp)}`;
                  window.open(twitterUrl, '_blank');
                }}>
                  <Twitter sx={{ color: 'text.secondary' }} />
                </IconButton>
              </FlexBox>
            </Grid>
          </Grid>
        
        </Grid>

        <Grid size={12} sx={{width: '100%' }}>
          <H6 sx={{mb:3}}>Additional Information</H6>
        <TabContext value={value} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Description" value="1" />
              <Tab label="Review" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{my:2}}>
            <ProductDescription description={i18n.language === 'en' ? product?.descriptionEn : product?.descriptionSp} />
          </TabPanel>
          <TabPanel value="2" sx={{my:2}}>
            <ProductReviews reviews={product?.reviews} ratingSummary={product?.ratingSummary} />
          </TabPanel>
        </TabContext>
        </Grid>
        </Grid>
        : 
        'Product Not Found'
      }
    </Container>
  )
};

export default Product;
