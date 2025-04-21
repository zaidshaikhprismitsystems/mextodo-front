import React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import AdminEcommerce from '../../icons/duotone/AdminEcommerce'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Folder from '../../icons/duotone/Folder';
import { NestedListItem } from '../../components/nested-listitem';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../services/store/hooks/hooks';
import { RootState } from '../../services/store/store';
import { Typography } from '@mui/material';

export default function ListContent() {
  
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  const productRoutes = [
    {
      name: t("products"),
      onClick: () => {
        navigate("products")
      },
      active: location.pathname === "/dashboard/products" ? true : false
    },
    {
      name: t("create_new_products"),
      onClick: () => {
        navigate("add-products")
      },
      active: location.pathname === "/dashboard/add-products" ? true : false
    }
  ];

  const orderRoutes = [
    {
      name: t("orders"),
      onClick: () => {
        navigate("orders")
      },
      active: location.pathname === "/dashboard/orders" ? true : false
    }
  ];

  const pickupRoutes = [
    {
      name: t("pickup"),
      onClick: () => {
        navigate("pickup")
      },
      active: location.pathname === "/dashboard/pickup" ? true : false
    }
  ];

  const promotionDiscountRoutes = [
    {
      name: t("promotion_discounts"),
      onClick: () => {
        navigate("promotion-discount")
      },
      active: location.pathname === "/dashboard/promotion-discount" ? true : false
    },
    {
      name: t("add_promotion_discounts"),
      onClick: () => {
        navigate("add-promotion-discount")
      },
      active: location.pathname === "/dashboard/add-promotion-discount" ? true : false
    }
  ];

  const ticketsRoutes = [
    {
      name: t("tickets"),
      onClick: () => {
        navigate("tickets")
      },
      active: location.pathname === "/dashboard/tickets" ? true : false
    }
  ];

  const [openPromotion, setOpenPromotion] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
  const [openOrders, setOpenOrders] = React.useState(false);
  const [openPickup, setOpenPickup] = React.useState(false);
  const [openTicket, setOpenTicket] = React.useState(false);
  
  const userData: any = useAppSelector((state: RootState) => state.user)
  
  return (
    <Box height="100%" px={2}>
    
    <Typography component="p"   sx={{fontSize: '12px', margin: '20px 0 10px 0px',fontWeight: 600,marginBottom: '10px',textTransform: 'uppercase', color: 'rgb(17, 24, 39)',}}>
      {t("owner_account")} { userData?.userDetails?.store_name ? ` - ${userData?.userDetails?.store_name}` : '' }
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

            <ListItemButton sx={{ backgroundColor: location.pathname === "/dashboard/pickup" ? "primary.100" : "" }} onClick={() => {setOpenPickup(!openPickup)}}>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary={t("pickup")} />
              {openPickup ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Categories Attributes List Item */}
            <NestedListItem open={openPickup} list={pickupRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/dashboard/promotion-discount" || location.pathname === "/dashboard/add-promotion-discount" ? "primary.100" : "" }} onClick={() => {setOpenPromotion(!openPromotion)}}>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary={t("promotion_discounts")} />
              {openPromotion ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Categories Attributes List Item */}
            <NestedListItem open={openPromotion} list={promotionDiscountRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/dashboard/tickets" || location.pathname === "/dashboard/view-ticket" ? 
              "primary.100" : "" }} onClick={() => {setOpenTicket(!openTicket)}}>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary={t("tickets")} />
              {openTicket ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Categories Attributes List Item */}
            <NestedListItem open={openTicket} list={ticketsRoutes} />

        </List>
      
    </Box>
  )
}