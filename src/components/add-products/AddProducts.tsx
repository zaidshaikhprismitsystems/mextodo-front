import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useEffect, useState } from "react";
import ApiService from "../../services/apiServices/apiService";
import { category_url } from "../../config/config";
import { ProductPreview } from "../product-preview";
import { ProductForm } from "../product-form";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppSelector } from "../../services/store/hooks/hooks";
import { RootState } from "../../services/store/store";

export default function AddProducts() {
  const { t, i18n } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [categoryList, setcategoryList] = useState([]);
  const [displayImages, setDisplayImages] = useState<any>([]);
  const [featuredImage, setFeatured] = useState<any>();
  const [video, setVideo] = useState<any>();

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

          resolve({ image: reader.result.toString().split(",")[1], mimetype: file.type });
        };
        reader.onerror = () => reject(reader.error);
      });
    });

    Promise.all(promises)
      .then(() => {
        setDisplayImages((prevImages: any) => [...prevImages, ...showImages]);
      })
      .catch((error) => console.error("Error processing files:", error));
  };

  const handleDropFeaturedImage = (event: any) => {
    const file = event[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (reader.result) {
        setFeatured(reader.result.toString());
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  const removeFeaturedImage = () => {
    setFeatured("");
  };

  const handleDropVideo = (event: any) => {
    const file = event[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (reader.result) {
        setVideo(reader.result.toString());
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  const removeVideo = () => {
    setVideo("");
  };

  const removeImage = (index: number) => {
    setDisplayImages((prevImages: any) => prevImages.filter((_: any, i: number) => i !== index));
  };

  useEffect(() => {
    // Fetch categories
    const getCategories = async () => {
      try {
        let categories = await ApiService.getCategories();
        setcategoryList(categories.data);
      } catch (error: any) {
        Toast.showErrorMessage(error.response.data.message);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      {selectedCategory && selectedCategory !== null ? (
        <Button variant="contained" onClick={() => setSelectedCategory(null)}>
          <ArrowBackIosNewIcon sx={{ fontSize: "14px" }} />
          {t("back")}
        </Button>
      ) : (
        ""
      )}
      <Box sx={{ py: 4 }}>
        {selectedCategory && selectedCategory !== null ? (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ProductForm
                action={"add"}
                handleDropFile={handleDropFile}
                removeImage={removeImage}
                featuredImage={featuredImage}
                handleDropFeaturedImage={handleDropFeaturedImage}
                removeFeaturedImage={removeFeaturedImage}
                handleDropVideo={handleDropVideo}
                removeVideo={removeVideo}
                video={video}
                displayImages={displayImages}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <ProductPreview
                featuredImage={featuredImage}
                images={displayImages}
                video={video}
              />
            </Grid>
          </Grid>
        ) : (
          <Box>
            <Typography mb={3} variant="h5" textAlign={"center"} fontWeight={600}>
              {t("choose_listing_type")}
            </Typography>
            <Grid container spacing={3} justifyContent={"center"}>
              {categoryList.map((data: any) => (
                <Grid size={{ xs: 6, sm: 4, md: 4, lg: 3 }} key={data.id}>
                  <Card>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={`${category_url}/${data.image}`}
                      title="category"
                    />
                    <Typography variant="h6" textAlign={"center"} fontSize={16} fontWeight={600}>
                      {i18n.language === "en" ? data.nameEn : data.nameSp}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
}