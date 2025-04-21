import { useState, useEffect } from 'react';
import { Container, Grid, Chip, Typography, Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApiService from '../../services/apiServices/apiService';

const Product = () => {
  const [product, setProduct] = useState<any>({});
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (productId) {
      getProductDetails(parseInt(productId));
    }
  }, [productId]);

  const getProductDetails = async (id: number) => {
    try {
      const product = await ApiService.getProductById(id);
      setProduct(product.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      {product && Object.keys(product).length > 0 ? (
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item md={7} xs={12}>
                <Box
                  sx={{
                    aspectRatio: '16/12',
                    borderRadius: '8px',
                    border: '1px solid rgb(201, 201, 201)',
                    backgroundColor: 'grey.100',
                  }}
                >
                  {product.featuredImage && (
                    <img
                      src={`${process.env.REACT_APP_PRODUCT_URL}/${product.featuredImage}`}
                      alt={product.titleEn}
                      style={{ width: '100%', height: '100%' }}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item md={5} xs={12}>
                <Chip
                  color={product.stock > 0 ? 'success' : 'error'}
                  size="small"
                  label={product.stock > 0 ? t('in_stock') : t('out_of_stock')}
                />
                <Typography variant="body2" color="text.secondary" mt={2}>
                  {i18n.language === 'en'
                    ? product.category.nameEn
                    : product.category.nameSp}
                </Typography>
                <Typography variant="h6">
                  {i18n.language === 'en'
                    ? product.titleEn
                    : product.titleSp}
                </Typography>
                <Typography variant="h4" color="primary" my={2}>
                  {product.discountPrice ? (
                    <>
                      <del>${product.price}</del> ${product.discountPrice}
                    </>
                  ) : (
                    `$${product.price}`
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        'Product Not Found'
      )}
    </Container>
  );
};

export default Product;
