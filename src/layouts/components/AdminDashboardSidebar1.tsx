import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'; // LAYOUT BASED HOOK

// import useLayout from '@/layouts/layout-1/context/useLayout'; // CUSTOM COMPONENTS

import MultiLevelMenu from './MultiLevelMenu';
import Link from '../../components/link';
import Scrollbar from '../../components/scrollbar';
import FlexBetween from '../../components/flexbox/FlexBetween';
// import UserAccount from '@/layouts/layout-parts/UserAccount'; // CUSTOM ICON COMPONENT

import ArrowLeftToLine from '../../icons/duotone/ArrowLeftToLine';

// import { SidebarWrapper } from '@/layouts/layout-1/styles';
import { Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import CategoryIcon from '@mui/icons-material/Category';
import HubIcon from '@mui/icons-material/Hub';
import AdminEcommerce from '../../icons/duotone/AdminEcommerce'
import LayerGroup from '../../icons/duotone/LayerGroup'
import { NestedListItem } from '../../components/nested-listitem';
import React from 'react';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Folder } from '@mui/icons-material';

const TOP_HEADER_AREA = 50;

export default function AdminDashboardSidebar() {
  
  const navigate = useNavigate();

  const handleSidebarCompactToggle =() => {
  }

  const categoryRoutes = [
    {
      name: "Categories",
      onClick: () => {
        navigate("categories")
      },
      active: location.pathname === "/admindashboard/categories" ? true : false
    },
    {
      name: "Create New Category",
      onClick: () => {
        navigate("add-categories")
      },
      active: location.pathname === "/admindashboard/add-categories" ? true : false
    }
  ];
  
  const attributeRoutes = [
    {
      name: "Attributes",
      onClick: () => {
        navigate("attributes")
      },
      active: location.pathname === "/admindashboard/attributes" ? true : false
    },
    {
      name: "Create New Attributes",
      onClick: () => {
        navigate("add-attributes")
      },
      active: location.pathname === "/admindashboard/add-attributes" ? true : false
    }
  ];
  
  const categoryAttributesRoutes = [
    {
      name: "Category Attributes",
      onClick: () => {
        navigate("category-attributes")
      },
      active: location.pathname === "/admindashboard/category-attributes" ? true : false
    },
    {
      name: "Add Category Attributes",
      onClick: () => {
        navigate("add-category-attributes")
      },
      active: location.pathname === "/admindashboard/add-category-attributes" ? true : false
    }
  ];
  
  const productRoutes = [
    {
      name: "Products",
      onClick: () => {
        navigate("products")
      },
      active: location.pathname === "/admindashboard/products" ? true : false
    },
    {
      name: "Create New Products",
      onClick: () => {
        navigate("add-products")
      },
      active: location.pathname === "/admindashboard/add-products" ? true : false
    }
  ];

  const orderRoutes = [
    {
      name: "Orders",
      onClick: () => {
        navigate("orders")
      },
      active: location.pathname === "/admindashboard/orders" ? true : false
    },
    {
      name: "Order Details",
      onClick: () => {
        navigate("order-details")
      },
      active: location.pathname === "/admindashboard/order-details" ? true : false
    }
  ];

 

  const [onHover, setOnHover] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [openAttributes, setOpenAttributes] = React.useState(false);
  const [openCategories, setOpenCategories] = React.useState(false);
  const [openCategoryAttributes, setOpenCategoryAttributes] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
  const [openOrders, setOpenOrders] = React.useState(false);
  

  // const COMPACT = sidebarCompact && !onHover ? 1 : 0;
  return (
    // compact={sidebarCompact ? 1 : 0}
    // onMouseLeave={() => sidebarCompact && setOnHover(false)}
      <Box>
        <FlexBetween padding="1.5rem 1rem .5rem 1.8rem" height={TOP_HEADER_AREA}>
          {
          /* LOGO */
        }
          <Link href="/">
            <Box component="img" src="../../../public/logo.svg" alt="logo" width={100} />
          </Link>

          {
          /* SIDEBAR COLLAPSE BUTTON */
        }
          {/* {!COMPACT ? <IconButton onClick={handleSidebarCompactToggle}>
              <ArrowLeftToLine />
            </IconButton> : null} */}
            {
            <IconButton onClick={handleSidebarCompactToggle}>
                <ArrowLeftToLine />
              </IconButton>
            }
        </FlexBetween>

        <Scrollbar autoHide clickOnTrack={false} 
          sx={{
            overflowX: 'hidden',
            maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`
          }}>
          <Box height="100%" px={2}>
          
          <Typography component="p"   sx={{fontSize: '12px', margin: '20px 0 10px 15px',fontWeight: 600,marginBottom: '10px',textTransform: 'uppercase', color: 'rgb(17, 24, 39)',}}>Admin Account</Typography>
              
              <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  
                  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', py:0,
                    "& .MuiButtonBase-root ":{
                      borderRadius:50,
                      marginBottom:1,
                      color:'primary.main',

                      '& .MuiTypography-root':{
                        color:'grey.500'
                       },
                     
                      "& .MuiListItemIcon-root":{
                        minWidth:'inherit',

                        "& .MuiSvgIcon-root":{
                          width:"18px",
                          height:"18px",
                          color:'grey.400',
                          
                        },
                      },
                      "& .MuiListItemText-root":{
                        my:0,
                        pl:1,

                        '& .MuiTypography-root':{
                          color:'grey.500',
                          fontSize:"14px",
                          fontWeight:500,
                         },
                       
                        
                      },
                    //  hover

                      '&:hover ': {
                        '& .MuiSvgIcon-root':{
                          color:'primary.main',
                        },
                        '& .MuiTypography-root':{
                          color:'primary.main',
                         },
                      },
                    },
                    "& .MuiCollapse-root":{
                        width:'100%',
                      },
                    
                  }}
                >

                  <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/categories" || location.pathname === "/admindashboard/add-categories" ? "primary.100" : "" }} onClick={() => {setOpenCategories(!openCategories)}}>
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                    {openCategories ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {/* Categories List Item */}
                  <NestedListItem open={openCategories} list={categoryRoutes} />

                  <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/attributes" || location.pathname === "/admindashboard/add-attributes" ? "primary.100" : "" }} onClick={() => {setOpenAttributes(!openAttributes)}}>
                    <ListItemIcon>
                      <HubIcon />
                    </ListItemIcon>
                    <ListItemText primary="Attributes" />
                    {openAttributes ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {/* Attributes List Item */}
                  <NestedListItem open={openAttributes} list={attributeRoutes} />

                  <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/category-attributes" || location.pathname === "/admindashboard/add-category-attributes" ? "primary.100" : "" }} onClick={() => {setOpenCategoryAttributes(!openCategoryAttributes)}}>
                    <ListItemIcon>
                      <LayerGroup />
                    </ListItemIcon>
                    <ListItemText primary="Category Attributes" />
                    {openCategoryAttributes ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {/* Categories Attributes List Item */}
                  <NestedListItem open={openCategoryAttributes} list={categoryAttributesRoutes} />

                  <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/products" || location.pathname === "/admindashboard/add-products" ? "primary.100" : "" }} onClick={() => {setOpenProducts(!openProducts)}}>
                    <ListItemIcon>
                      <AdminEcommerce />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                    {openProducts ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {/* Categories Attributes List Item */}
                  <NestedListItem open={openProducts} list={productRoutes} />

                  <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/orders" ? "primary.100" : "" }} onClick={() => {setOpenOrders(!openOrders)}}>
                    <ListItemIcon>
                      <Folder />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                    {openOrders ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {/* Categories Attributes List Item */}
                  <NestedListItem open={openOrders} list={orderRoutes} />

                </List>
            
          </Box>
        </Scrollbar>
      </Box>
      // </SidebarWrapper>
    )
}