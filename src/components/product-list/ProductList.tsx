import { ChangeEvent, useRef, useState } from 'react'
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
import Counter from '../counter'
import Carousel from '../carousel'
// import ColorRadio from '@/components/color-radio'
import FlexBox from '../flexbox/FlexBox'
import { H2, H6, Paragraph } from '../typography'
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

const ProductList = () => {

  return (
    <Container sx={{ py: { xs: 5, md: 8 }}}>
      <Grid container spacing={8}>
        
        <Grid size={{ xs: 0, md: 4 }}>
          filters
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          List
        </Grid>

      </Grid>
    </Container>
  )
};

export default ProductList;
