import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '../../components/link';
import Scrollbar from '../../components/scrollbar';
import FlexBetween from '../../components/flexbox/FlexBetween';
import ArrowLeftToLine from '../../icons/duotone/ArrowLeftToLine';
import CategoryIcon from '@mui/icons-material/Category';
import HubIcon from '@mui/icons-material/Hub';
import AdminEcommerce from '../../icons/duotone/AdminEcommerce';
import LayerGroup from '../../icons/duotone/LayerGroup';
import { NestedListItem } from '../../components/nested-listitem';
import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Folder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TOP_HEADER_AREA = 72;

export default function AdminDashboardSidebar() {
  const navigate = useNavigate();

  const handleSidebarCompactToggle = () => {};

  const categoryRoutes = [
    {
      name: "Categories",
      onClick: () => {
        navigate("categories");
      },
      active: location.pathname === "/admindashboard/categories",
    },
    {
      name: "Create New Category",
      onClick: () => {
        navigate("add-categories");
      },
      active: location.pathname === "/admindashboard/add-categories",
    },
  ];

  const attributeRoutes = [
    {
      name: "Attributes",
      onClick: () => {
        navigate("attributes");
      },
      active: location.pathname === "/admindashboard/attributes",
    },
    {
      name: "Create New Attributes",
      onClick: () => {
        navigate("add-attributes");
      },
      active: location.pathname === "/admindashboard/add-attributes",
    },
  ];

  const categoryAttributesRoutes = [
    {
      name: "Category Attributes",
      onClick: () => {
        navigate("category-attributes");
      },
      active: location.pathname === "/admindashboard/category-attributes",
    },
    {
      name: "Add Category Attributes",
      onClick: () => {
        navigate("add-category-attributes");
      },
      active: location.pathname === "/admindashboard/add-category-attributes",
    },
  ];

  const productRoutes = [
    {
      name: "Products",
      onClick: () => {
        navigate("products");
      },
      active: location.pathname === "/admindashboard/products",
    },
    {
      name: "Create New Products",
      onClick: () => {
        navigate("add-products");
      },
      active: location.pathname === "/admindashboard/add-products",
    },
  ];

  const orderRoutes = [
    {
      name: "Orders",
      onClick: () => {
        navigate("orders");
      },
      active: location.pathname === "/admindashboard/orders",
    },
    {
      name: "Order Details",
      onClick: () => {
        navigate("order-details");
      },
      active: location.pathname === "/admindashboard/order-details",
    },
  ];

  const [openAttributes, setOpenAttributes] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [openCategoryAttributes, setOpenCategoryAttributes] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);

  return (
    <Box>
      <FlexBetween padding="1rem">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="img" src="../../../public/logo.svg" alt="logo" width={100} />
        </Link>
        <IconButton onClick={handleSidebarCompactToggle}>
          <ArrowLeftToLine />
        </IconButton>
      </FlexBetween>

      <Scrollbar
        autoHide
        clickOnTrack={false}
        sx={{
          overflowX: 'hidden',
          maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`,
        }}
      >
        <Box height="100%" px={2}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              py: 0,
              "& .MuiButtonBase-root ": {
                borderRadius: 50,
                marginBottom: 1,
                color: 'primary.main',
                '& .MuiTypography-root': {
                  color: 'grey.500',
                },
                "& .MuiListItemIcon-root": {
                  minWidth: 'inherit',
                  "& .MuiSvgIcon-root": {
                    width: "18px",
                    height: "18px",
                    color: 'grey.400',
                  },
                },
                "& .MuiListItemText-root": {
                  my: 0,
                  pl: 1,
                  '& .MuiTypography-root': {
                    color: 'grey.500',
                    fontSize: "14px",
                    fontWeight: 500,
                  },
                },
                '&:hover ': {
                  '& .MuiSvgIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiTypography-root': {
                    color: 'primary.main',
                  },
                },
              },
              "& .MuiCollapse-root": {
                width: '100%',
              },
            }}
          >
            <ListItemButton
              sx={{
                backgroundColor:
                  location.pathname === "/admindashboard/categories" ||
                  location.pathname === "/admindashboard/add-categories"
                    ? "primary.100"
                    : "",
              }}
              onClick={() => {
                setOpenCategories(!openCategories);
              }}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
              {openCategories ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <NestedListItem open={openCategories} list={categoryRoutes} />

            <ListItemButton
              sx={{
                backgroundColor:
                  location.pathname === "/admindashboard/attributes" ||
                  location.pathname === "/admindashboard/add-attributes"
                    ? "primary.100"
                    : "",
              }}
              onClick={() => {
                setOpenAttributes(!openAttributes);
              }}
            >
              <ListItemIcon>
                <HubIcon />
              </ListItemIcon>
              <ListItemText primary="Attributes" />
              {openAttributes ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <NestedListItem open={openAttributes} list={attributeRoutes} />

            <ListItemButton
              sx={{
                backgroundColor:
                  location.pathname === "/admindashboard/category-attributes" ||
                  location.pathname === "/admindashboard/add-category-attributes"
                    ? "primary.100"
                    : "",
              }}
              onClick={() => {
                setOpenCategoryAttributes(!openCategoryAttributes);
              }}
            >
              <ListItemIcon>
                <LayerGroup />
              </ListItemIcon>
              <ListItemText primary="Category Attributes" />
              {openCategoryAttributes ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <NestedListItem open={openCategoryAttributes} list={categoryAttributesRoutes} />

            <ListItemButton
              sx={{
                backgroundColor:
                  location.pathname === "/admindashboard/products" ||
                  location.pathname === "/admindashboard/add-products"
                    ? "primary.100"
                    : "",
              }}
              onClick={() => {
                setOpenProducts(!openProducts);
              }}
            >
              <ListItemIcon>
                <AdminEcommerce />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {openProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <NestedListItem open={openProducts} list={productRoutes} />

            <ListItemButton
              sx={{
                backgroundColor:
                  location.pathname === "/admindashboard/orders"
                    ? "primary.100"
                    : "",
              }}
              onClick={() => {
                setOpenOrders(!openOrders);
              }}
            >
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary="Orders" />
              {openOrders ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <NestedListItem open={openOrders} list={orderRoutes} />
          </List>
        </Box>
      </Scrollbar>
    </Box>
  );
}