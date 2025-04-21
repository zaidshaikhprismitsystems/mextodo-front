import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Rating, styled } from "@mui/material"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { isMobile } from 'react-device-detect';
import { useEffect, useState } from "react";
import ApiService from "../../services/apiServices/apiService";
import { useTranslation } from "react-i18next";
import { category_url, product_url } from "../../config/config";
import { Link } from "react-router-dom";

const StyledSwiper = styled(Swiper)({
  "& .swiper-button-next, & .swiper-button-prev": {
    color: "#fff",
    background: "#024042",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    "&::after": {
      fontSize: "20px",
    },
  },
  '& .swiper-pagination':{
    bottom:0 ,
    background: "#ffffff94",
  },
  "& .swiper-pagination-bullet": {
    background: "#000",
    opacity: 0.5,
    "&.swiper-pagination-bullet-active": {
      opacity: 1,
    },
  }
})

const categories = [
  { title: "Digital Products", image: "/images/img1.webp?height=200&width=200" },
  { title: "Vehicles", image: "/images/img2.jpg?height=200&width=200" },
  { title: "Properties", image: "/images/img3.jpg?height=200&width=200" },
  { title: "Fashion", image: "/images/img1.webp?height=200&width=200" },
  { title: "Pysical Product", image: "/images/img1.webp?height=200&width=200" },
]

const products = [
  {
    title: "Product Name",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 1227,
    rating: 4,
    image: "/images/img1.webp?height=200&width=200",
  },
].concat(
  Array(4).fill({
    title: "Product Name",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 1227,
    rating: 4,
    image: "/images/img2.jpg?height=200&width=200",
  }),
)

const heroSlides = [
  { image: "images/slide1.png?height=400&width=1200", title: "Slide 1" },
  { image: "images/slide2.png?height=400&width=1200", title: "Slide 2" },
  { image: "images/slide3.png?height=400&width=1200", title: "Slide 3" },
  { image: "images/slide4.png?height=400&width=1200", title: "Slide 4" },
]

const heroSlidesMobile = [
  { image: "images/mobile1.png?height=400&width=100%", title: "Slide 1" },
  { image: "images/mobile2.png?height=400&width=100%", title: "Slide 2" },
  { image: "images/mobile3.png?height=400&width=100%", title: "Slide 3" },
  { image: "images/mobile4.png?height=400&width=100%", title: "Slide 4" },
]

let slider = isMobile ? heroSlidesMobile : heroSlides;

export default function Home() {

  const [homeProducts, setHomeProduct] = useState<any>({});
  console.log('homeProducts: ', homeProducts);
  const [categoryList, setcategoryList] = useState([]);
  console.log('categoryList: ', categoryList);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    getHomeProducts();
    getCategories();
  }, [])

  const getHomeProducts = async () => {
    try{
      let productsData = await ApiService.gteHomeProduct();
      setHomeProduct(productsData.data);
    }catch(e){
      console.log(e);
    }
  }

  const getCategories = async () => {
    try {
      let categories = await ApiService.getCategories();
      setcategoryList(categories.data);
    } catch (error: any) {
      console.log('error: ', error);
      // Toast.showErrorMessage(error.response.data.message);
    }
  }

  return (
    <Box sx={{ pb: 8, maxWidth:'100%' }}>
      {/* Hero Slider */}
      <Box sx={{ mb:{xs:4, md:6, lg:10}, maxWidth:'100%'  } }>
        <Container sx={{maxWidth:{lg:"lg", xl:"xl"}, px:{xs:0, lg:3}}}>
          <StyledSwiper modules={[Navigation, Pagination, Autoplay]}  pagination={{ clickable: true }} autoplay={{ delay: 3000, disableOnInteraction: false }} loop>
            {slider.map((slide, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    height: { xs: "250px", sm: "250px", md: "350px", lg: "440px", xl: "596px" },
                    position: "relative",
                  }}
                >
                  <Box
                    component="img"
                    src={slide.image}
                    alt={slide.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </Container>
      </Box>

      {/* Categories */}
      <Container  sx={{maxWidth:{lg:"lg", xl:"xl"}, mb:{xs:4, md:6, lg:10}, }}>
        <Box  >
            <StyledSwiper modules={[Navigation, Autoplay]}
              navigation
              // autoplay={{ delay: 3000, disableOnInteraction: false }}
              // loop
              spaceBetween={8}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 10
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}>
              {
              categoryList && categoryList.length > 0 && categoryList.map((category: any, index: number) => (
                <SwiperSlide key={index} style={{height:'auto', paddingBottom:'10px'}}>
                  <Box  key={index} height={'100%'}>
                    <Card   
                      sx={{height: '100%', m:1,
                        '&:hover .MuiCardMedia-media': {
                          transform: 'scale(1.05)',
                        },
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    >
                    <Box sx={{ aspectRatio: '1/0.8', width: '100%', overflow:"hidden" }}>
                      <CardMedia component="img" image={`${category_url}/${category.image}`} alt={i18n.language === 'en' ? category.nameEn : category.nameSp} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease-in-out', className: 'card-media',}} />
                    </Box>
                      <CardContent sx={{pb:'16px !important'}}>
                        <Typography variant="h5" color="primary" fontWeight={700} fontSize={{xs:'18px', md:'22px', lg:'24px'}} gutterBottom>
                          {i18n.language === 'en' ? category.nameEn : category.nameSp}
                        </Typography>
                        <Button color="success" variant="text"  sx={{ ml:-1.5, '&:hover': {ml:-0,}, transition: 'all 0.3s ease-in-out',  }} endIcon={<ArrowForwardIcon />}>
                          See more
                        </Button>
                      </CardContent>
                    </Card>
                  </Box>
                </SwiperSlide>
              ))
              }
              {
                categoryList.length <= 0 ? 'No Categories Found' : ''
              }
              
            </StyledSwiper>
        </Box>
      </Container>

    {/* Discounts Section */}
    <ProductSection title="Discounts" products={homeProducts?.discounted} language={i18n.language} />

    {/* Best Selling Section */}
    <ProductSection title="Best selling" products={homeProducts?.bestSelling} language={i18n.language} />

    </Box>
  )
}

function ProductSection({ title, products, language }: { title: string; products: any[], language: string }) {
  return (
    <Container  sx={{maxWidth:{lg:"lg", xl:"xl"}, mb:{xs:4, md:6, lg:10},}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h2" component="h2" fontWeight={800} fontSize={{xs:24, md:30, lg:36}} textTransform={'capitalize'}> 
          {title}
        </Typography>
        <Button  color="success" variant="text" sx={{ }} endIcon={<ArrowForwardIcon />}>
          See more
        </Button>
      </Box>
      
      <Box >
      {
        products && products.length > 0 ?
        <StyledSwiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <Card component={Link} to={`/product?id=${product.id}`} sx={{mb:1}}> 
                <CardMedia component="img"  image={`${product_url}/${product.featuredImage}`} alt={language === 'en' ? product.titleEn : product.titleSp} sx={{aspectRatio: '1/0.8', width: '100%', overflow:"hidden"}} />
                <CardContent sx={{pb:2,}}>
                  <Typography variant="h3" gutterBottom fontSize={{xs:18, md:20}} fontWeight={600} color="black" lineHeight={1}>
                    {language === 'en' ? product.titleEn : product.titleSp}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontSize={{xs:14, md:16}} sx={{ mb: 1 }}>
                    {product.description}
                  </Typography>
                  <Rating value={product?.avgRating} precision={0.5} readOnly sx={{ mb: 1 }} />
                  <Box display={'flex'} flexWrap={'wrap'} alignItems={"center"} justifyContent={"space-between"} gap={2} >
                    <Typography variant="h6" color="black" gutterBottom mb={0} lineHeight={1} sx={{fontSize:{xs:22, sm:20, md:22}}}>
                      ${product.price.toLocaleString()}
                    </Typography>
                    <Button variant="contained" color="success"  sx={{}} >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </StyledSwiper>
        : 'No Products Found'
      }
      </Box>
    </Container>
  )
}