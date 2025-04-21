import { Box, Button, Card, CardMedia, Typography } from "@mui/material"
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
import { category_url } from "../../config/config"
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { phyical_name } from "../../config/config";

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

export default function ProductPreview({
  categoryName, 
  featuredImage, 
  video, 
  images, 
  title, 
  titleSp, 
  descriptionSp, 
  price, 
  discountPrice, 
  description, 
  attributes, 
  length, 
  width, 
  height, 
  weight, 
  weight_type, 
  unit  
}: any) {
  
  const carouselRef = useRef<any>(null)
  const [selectedSlide, setSelectedSlide] = useState(0);
  const { t, i18n } =useTranslation();

  const handleChangeSlide = (index: number) => {
    carouselRef.current!.slickGoTo(index)
    setSelectedSlide(index)
  }

  return (
    <Card sx={{ padding: 2, minHeight:'100%' }} >
      <H6 sx={{m: 0,}} fontSize={16}> {t("product_preview")}</H6>
      <Grid container spacing={3} mt={2}>
        {/* PRODUCT IMAGE  */}
        <Grid size={{ md: 7, xs: 12 }}>
          <CarouselRoot className="product-img-preview" sx={{aspectRatio:'1/1','& > *':{height:'100%',}, borderRadius:'8px', border:'1px solid rgb(201, 201, 201)', backgroundColor:'grey.100' }}>
            <Carousel 
              dots={false}
              slidesToShow={1}
              ref={carouselRef}
              afterChange={(slideNo: any) => setSelectedSlide(slideNo)}
              >
              {featuredImage && featuredImage !== null && <img className="slide" src={featuredImage} />}
              {video && video !== null && <video controls className="slide" src={video} />}
              {
              images && images.length > 0 ?
                images.map((item: any) => (
                  <img key={item} className="slide" src={item} />
                ))
                :
                [0, 1, 2].map((item) => (
                  <img key={item} className="slide" src="/public/images/img1.webp" />
                ))
              }
            </Carousel>
          </CarouselRoot>
          {/* SLIDE THUMBS */}
            <Stack justifyContent="center" direction="row" spacing={2} mt={1}>
              {featuredImage && featuredImage !== null &&
                <SlideThumb
                  key={0}
                  onClick={() => handleChangeSlide(0)}
                  className={selectedSlide === 0 ? 'active' : ''}
                >
                  <img className="slide" src={featuredImage} />
                </SlideThumb>
              }
              {video && video !== null && 
              <SlideThumb
                  key={featuredImage ? 1 : 0}
                  onClick={() => handleChangeSlide(featuredImage ? 1 : 0)}
                  className={selectedSlide === (featuredImage ? 1 : 0) ? 'active' : ''}
                >
                  <video className="slide" src={video} /> 
                </SlideThumb>
              }
              {
              images && images.length > 0 ?
              images.map((item: any, index: number) => (
                <SlideThumb
                  key={featuredImage && video ? index+2 : featuredImage || video ? index+1 : index}
                  onClick={() => handleChangeSlide(featuredImage && video ? index+2 : featuredImage || video ? index+1 : index )}
                  className={selectedSlide === (featuredImage && video ? index+2 : featuredImage || video ? index+1 : index ) ? 'active' : ''}
                >
                  <img src={item} />
                </SlideThumb>
              ))
              :
              [0, 1, 2].map((item, index) => (
                <SlideThumb
                  key={item}
                  onClick={() => handleChangeSlide(index)}
                  className={selectedSlide === index ? 'active' : ''}
                >
                  <img src="/public/images/img1.webp" />
                </SlideThumb>
              ))
              }
            </Stack>
          </Grid>

        {/* INFORMATION */}
        <Grid size={{ md: 5, xs: 12 }} >

          {/* PRODUCT NAME */}
          {
            i18n.language === "en" ?
              <Typography variant="h5" fontWeight={600} color="black" mb={1}>{title !== '' && title !== undefined ? title : t("product_title")}</Typography>
              :
              <Typography variant="h5" fontWeight={600} color="black" mb={1}>{titleSp !== '' && titleSp !== undefined ? titleSp : t("product_title")}</Typography>
          }

          {/* PRODUCT PRICE */}
          <Typography variant="h3" color="primary.main" my={2} fontSize={36} fontWeight={800}>
            ${price !== 0 ? price : 350}
          </Typography>

          {/* Description */}
          <Box >
          <Typography variant="h6" component="h6" fontWeight={600} mb={1}>
            {t("description")}:
          </Typography>
          {
            i18n.language === "en" ?
            <Typography variant="body2" component="p" mb={3}>{description !== '' && description !== undefined ? description : t("product_desc_preview")}</Typography>
            :
            <Typography variant="body2" component="p" mb={3}>{descriptionSp !== '' && descriptionSp !== undefined ? descriptionSp : t("product_desc_preview")}</Typography>
          }
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          {/* Product Details */}
          <Box sx={{}}>
              <Typography variant="h6" component="h6" fontWeight={600} mb={1}>
                {t("product_details")}:
              </Typography>
              
              <Grid container spacing={1}>
                {
                  attributes.map((attribute: any, index: number) => {
                    return(
                    <Grid key={index} size={12} >
                      <Typography variant="body2" component="p">
                        <strong>{i18n.language === 'en' ? attribute.name: attribute.nameSp}:</strong> {attribute.value}
                      </Typography>
                    </Grid>
                    )
                  })
                }
                {
                  categoryName === phyical_name ?
                  <>
                    <Grid  size={12} >
                      <Typography variant="body2" component="p">
                        <strong>{t("unit")}:</strong> {unit}
                      </Typography>
                    </Grid>
                    <Grid  size={12} >
                      <Typography variant="body2" component="p">
                        <strong>{t("length")}:</strong> {length}
                      </Typography>
                    </Grid>
                    <Grid  size={12} >
                      <Typography variant="body2" component="p">
                        <strong>{t("width")}:</strong> {width}
                      </Typography>
                    </Grid>
                    <Grid  size={12} >
                      <Typography variant="body2" component="p">
                        <strong>{t("height")}:</strong> {height}
                      </Typography>
                    </Grid>
                    <Grid  size={12} >
                      <Typography variant="body2" component="p">
                        <strong>{t("weight_type")}:</strong> {weight_type}
                      </Typography>
                    </Grid>
                    <Grid  size={12} >
                      <Typography variant="body2" component="p">
                        <strong>{t("weight")}:</strong> {weight}
                      </Typography>
                    </Grid>
                  </>
                  : ''
                }
              </Grid>
              </Box>
        </Grid>
      </Grid>
    </Card>
  )
}