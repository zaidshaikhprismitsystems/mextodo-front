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
import { Typography } from '@mui/material';
import LayerGroup from '../../icons/duotone/LayerGroup'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from '@mui/icons-material/People';
import TokenIcon from '@mui/icons-material/Token';
import DiscountIcon from '@mui/icons-material/Discount';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import DatasetIcon from '@mui/icons-material/Dataset';
import SettingsIcon from '@mui/icons-material/Settings';
export default function ListContent() {
  
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  
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
    // {
    //   name: "Category Attributes",
    //   onClick: () => {
    //     navigate("category-attributes")
    //   },
    //   active: location.pathname === "/admindashboard/category-attributes" ? true : false
    // },
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
      name: t("products"),
      onClick: () => {
        navigate("products")
      },
      active: location.pathname === "/admindashboard/products" ? true : false
    },
    {
      name: t("create_new_products"),
      onClick: () => {
        navigate("add-products")
      },
      active: location.pathname === "/admindashboard/add-products" ? true : false
    }
  ];

  const orderRoutes = [
    {
      name: t("orders"),
      onClick: () => {
        navigate("orders")
      },
      active: location.pathname === "/admindashboard/orders" ? true : false
    }
  ];

  const manageVendorsRoutes = [
    {
      name: t("manage_vendors"),
      onClick: () => {
        navigate("manage-vendors")
      },
      active: location.pathname === "/admindashboard/manage-vendors" ? true : false
    }
  ];

  const manageUserRoutes = [
    {
      name: t("manage_users"),
      onClick: () => {
        navigate("manage-users")
      },
      active: location.pathname === "/admindashboard/manage-users" ? true : false
    }
  ];

  const ticketRoutes = [
    {
      name: t("manage_tickets"),
      onClick: () => {
        navigate("manage-tickets")
      },
      active: location.pathname === "/admindashboard/manage-tickets" ? true : false
    },
    // {
    //   name: t("add_ticket"),
    //   onClick: () => {
    //     navigate("add-ticket")
    //   },
    //   active: location.pathname === "/admindashboard/add-ticket" ? true : false
    // }
  ];

  const promotionDiscountRoutes = [
    {
      name: t("promotion_discounts"),
      onClick: () => {
        navigate("promotion-discounts")
      },
      active: location.pathname === "/admindashboard/promotion-discounts" ? true : false
    },
    {
      name: t("add_promotion_discounts"),
      onClick: () => {
        navigate("add-promotion-discounts")
      },
      active: location.pathname === "/admindashboard/add-promotion-discounts" ? true : false
    },
  ];

  const settingRoutes = [
    {
      name: t("settings"),
      onClick: () => {
        navigate("settings")
      },
      active: location.pathname === "/admindashboard/settings" ? true : false
    },
  ];

  const pagesRoutes = [
    {
      name: t("pages"),
      onClick: () => {
        navigate("pages")
      },
      active: location.pathname === "/admindashboard/pages" ? true : false
    },
  ];

  const emailTemplateRoutes = [
    {
      name: t("email_template"),
      onClick: () => {
        navigate("email-templates")
      },
      active: location.pathname === "/admindashboard/email-templates" ? true : false
    },
  ];

  const reportsRoutes = [
    {
      name: t("reports"),
      onClick: () => {
        navigate("reports")
      },
      active: location.pathname === "/admindashboard/reports" ? true : false
    },
  ];

  const visitorsRoutes = [
    {
      name: t("visitors"),
      onClick: () => {
        navigate("visitors")
      },
      active: location.pathname === "/admindashboard/visitors" ? true : false
    },
  ];

    const [openAttributes, setOpenAttributes] = React.useState(false);
    const [openCategories, setOpenCategories] = React.useState(false);
    const [openCategoryAttributes, setOpenCategoryAttributes] = React.useState(false);
    const [openProducts, setOpenProducts] = React.useState(false);
    const [openOrders, setOpenOrders] = React.useState(false);
    const [openUser, setOpenUser] = React.useState(false);
    const [openVendors, setOpenVendors] = React.useState(false);
    const [openTicket, setOpenTicket] = React.useState(false);
    const [openPromotionDiscount, setOpenPromotionDiscount] = React.useState(false);
    const [openSetting, setOpenSetting] = React.useState(false);
    const [openPages, setOpenPages] = React.useState(false);
    const [openEmailTemplate, setOpenEmailTemplate] = React.useState(false);
    const [openReports, setOpenReports] = React.useState(false);
    const [openVisitors, setOpenVisitors] = React.useState(false);
    
  return (
    <Box height="100%" px={2}>
          
    <Typography component="p"   sx={{fontSize: '12px', margin: '20px 0 10px 0px',fontWeight: 600,marginBottom: '10px',textTransform: 'uppercase', color: 'rgb(17, 24, 39)',}}>
      { t("admin_account") }
    </Typography>
        
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
                <DatasetIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
              {openCategories ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Categories List Item */}
            <NestedListItem open={openCategories} list={categoryRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/attributes" || location.pathname === "/admindashboard/add-attributes" ? "primary.100" : "" }} onClick={() => {setOpenAttributes(!openAttributes)}}>
              <ListItemIcon>
                <DeviceHubIcon />
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
              <ListItemText primary={t("products")} />
              {openProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Products List Item */}
            <NestedListItem open={openProducts} list={productRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/orders" ? "primary.100" : "" }} onClick={() => {setOpenOrders(!openOrders)}}>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary={t("orders")} />
              {openOrders ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Orders List Item */}
            <NestedListItem open={openOrders} list={orderRoutes} />


            <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/manage-vendors" ? "primary.100" : "" }} onClick={() => {setOpenVendors(!openVendors)}}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={t("manage_vendors")} />
              {openVendors ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* User Manage List Item */}
            <NestedListItem open={openVendors} list={manageVendorsRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/manage-users" ? "primary.100" : "" }} onClick={() => {setOpenUser(!openUser)}}>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary={t("manage_users")} />
              {openUser ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* User Manage List Item */}
            <NestedListItem open={openUser} list={manageUserRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/add-ticket" ? "primary.100" : "" }} onClick={() => {setOpenTicket(!openTicket)}}>
              <ListItemIcon>
                <TokenIcon />
              </ListItemIcon>
              <ListItemText primary={t("manage_tickets")} />
              {openTicket ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Add Ticket List Item */}
            <NestedListItem open={openTicket} list={ticketRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/promotion-discounts" ? "primary.100" : "" }} onClick={() => {setOpenPromotionDiscount(!openPromotionDiscount)}}>
              <ListItemIcon>
                <DiscountIcon />
              </ListItemIcon>
              <ListItemText primary={t("promotion_discounts")} />
              {openPromotionDiscount ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Promotion Disccount List Item */}
            <NestedListItem open={openPromotionDiscount} list={promotionDiscountRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/reports" ? "primary.100" : "" }} 
              onClick={() => {setOpenReports(!openReports)}}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t("reports")} />
              {openReports ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <NestedListItem open={openReports} list={reportsRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/settings" ? "primary.100" : "" }} 
              onClick={() => {setOpenSetting(!openSetting)}}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t("settings")} />
              {openSetting ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Promotion Disccount List Item */}
            <NestedListItem open={openSetting} list={settingRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/pages" ? "primary.100" : "" }} 
              onClick={() => {setOpenPages(!openPages)}}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t("pages")} />
              {openPages ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Promotion Disccount List Item */}
            <NestedListItem open={openPages} list={pagesRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/email-templates" ? "primary.100" : "" }} 
              onClick={() => {setOpenEmailTemplate(!openEmailTemplate)}}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t("email_template")} />
              {openEmailTemplate ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <NestedListItem open={openEmailTemplate} list={emailTemplateRoutes} />

            <ListItemButton sx={{ backgroundColor: location.pathname === "/admindashboard/visitors" ? "primary.100" : "" }} 
              onClick={() => {setOpenVisitors(!openVisitors)}}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t("visitors")} />
              {openVisitors ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <NestedListItem open={openVisitors} list={visitorsRoutes} />

          </List>
      
    </Box>
  )
}