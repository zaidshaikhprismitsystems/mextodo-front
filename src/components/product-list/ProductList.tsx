import React from 'react';

const ProductList = () => {
  return (
    <div>
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
    </div>
  );
};

export default ProductList;
