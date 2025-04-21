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
import AdminEcommerce from '../../icons/duotone/AdminEcommerce';
import Folder from '../../icons/duotone/Folder';
import { NestedListItem } from '../../components/nested-listitem';
import React from 'react';

import { useTranslation } from 'react-i18next';

const TOP_HEADER_AREA = 50;

export default function OwnerDashboardSidebar() {
  
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  const productRoutes = [
    {
      name: t("products"),
      onClick: () => {
        navigate("products");
      },
      active: location.pathname === "/dashboard/products" ? true : false
    },
    {
      name: t("create_new_products"),
      onClick: () => {
        navigate("add-products");
      },
      active: location.pathname === "/dashboard/add-products" ? true : false
    }
  ];

  const orderRoutes = [
    {
      name: t("orders"),
      onClick: () => {
        navigate("orders");
      },
      active: location.pathname === "/dashboard/orders" ? true : false
    },
    {
      name: t("order_details"),
      onClick: () => {
        navigate("order-details");
      },
      active: location.pathname === "/dashboard/order-details" ? true : false
    }
  ];

  const [openProducts, setOpenProducts] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  
  return (
      <Box position={'sticky'} top={169}>
        <Scrollbar autoHide clickOnTrack={false} 
          sx={{
            height:'100%',
            overflowX: 'hidden',
            maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`
          }}>
          <Box height="100%" px={2}>
          
          <Typography component="p"   sx={{fontSize: '12px', margin: '20px 0 10px 0px',fontWeight: 600,marginBottom: '10px',textTransform: 'uppercase', color: 'rgb(17, 24, 39)',}}>
            {t("owner_account")}
          </Typography>
              
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', py:0,
                  "& .MuiButtonBase-root ":{
                    borderRadius:50,
                    marginBottom:1,
                    "& .MuiListItemIcon-root":{
                      minWidth:'inherit',

                      "& .MuiSvgIcon-root":{
                        width:"18px",
                        height:"18px"
                      },
                    },
                    "& .MuiListItemText-root":{
                      my:0,
                      pl:1,
                      '& .MuiTypography-root':{
                        fontSize:"14px",
                        fontWeight:500,
                        },
                    },
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
                  <ListItemButton sx={{ backgroundColor: location.pathname === "/dashboard/products" || location.pathname === "/dashboard/add-products" ? "primary.100" : "" }} onClick={() => {setOpenProducts(!openProducts)}}>
                    <ListItemIcon>
                      <AdminEcommerce />
                    </ListItemIcon>
                    <ListItemText primary={t("products")} />
                    {openProducts ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {/* Categories Attributes List Item */}
                  <NestedListItem open={openProducts} list={productRoutes} />

                  <ListItemButton sx={{ backgroundColor: location.pathname === "/dashboard/orders" ? "primary.100" : "" }} onClick={() => {setOpenOrders(!openOrders)}}>
                    <ListItemIcon>
                      <Folder />
                    </ListItemIcon>
                    <ListItemText primary={t("orders")} />
                    {openOrders ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {/* Categories Attributes List Item */}
                  <NestedListItem open={openOrders} list={orderRoutes} />

                </List>
            
          </Box>
        </Scrollbar>
      </Box>
  );
}