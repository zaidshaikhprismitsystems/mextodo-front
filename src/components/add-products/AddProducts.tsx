import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTranslation } from "react-i18next";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../../services/apiServices/apiService";
import { category_url, phyical_name, digital_name, vehicle_name, property_name } from "../../config/config";
import { ProductPreview } from "../product-preview";
import { ProductForm } from "../product-form";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppSelector } from "../../services/store/hooks/hooks";
import { RootState } from "../../services/store/store";

export default function AddProducts() {
  const userData = useAppSelector((state: RootState) => state.user);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [selectedCategoryName, setSelectedCategoryName] = useState<any>();
  const [categoryList, setcategoryList] = useState([]);
  const [attributes, setAttributeList] = useState<any>([]);
  const [displayImages, setDisplayImages] = useState<any>([]);
  const [featuredImage, setFeatured] = useState<any>();
  const [video, setVideo] = useState<any>();
  const [digital, setDigital] = useState<any>();
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      country: null,
      state: null,
      city: null,
      rentOrSale: '',
      packType: '',
      content: '',
      whatsappNumber: '',
      boxQuantity: 0,
      vendorId: ''
    };

    attributes.forEach((attr: any) => {
      initialValues[attr.attribute.nameEn] = '';
    });

    return initialValues;
  };

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
        const base64String = reader.result.toString().split(",")[1];
        const mimetype = file.type;

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
        const base64String = reader.result.toString().split(",")[1];
        const mimetype = file.type;

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

  const handleRentOrSale = (value: string) => {
    // Logic for handling rent or sale
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
                categoryName={selectedCategoryName}
                handleRentOrSale={handleRentOrSale}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <ProductPreview
                categoryName={selectedCategoryName}
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