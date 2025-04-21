import React, { useRef, useState } from 'react';
import { Card, Grid, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ProductPreview({
  categoryName,
  featuredImage,
  video,
  images,
  title,
  titleSp,
  descriptionSp,
  price,
  description,
  attributes,
  length,
  width,
  height,
  weight,
  unit,
  pysicalAttributes,
  packType,
  content,
  boxQuantity,
  isView,
}: any) {
  const carouselRef = useRef<any>(null);
  const carouselthumbRef = useRef<any>(null);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const { t, i18n } = useTranslation();

  const handleChangeSlide = (index: number) => {
    carouselRef.current!.slickGoTo(index);
    setSelectedSlide(index);
  };

  return (
    <Card>
      {/* ...existing code... */}
    </Card>
  );
}