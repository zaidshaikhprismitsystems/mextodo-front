import { lazy } from 'react'; // CUSTOM COMPONENTS

import Loadable from './loadable';

// import { AuthGuard } from '@/components/auth';

// import useSettings from '../hooks/useSettings';

import AdminLayout from '../layouts/adminLayout';

const AdminDashboard = Loadable(lazy(() => import('../pages/admin/dashboard')));
const AddCategories = Loadable(lazy(() => import('../pages/admin/categories/add-categories')));
const Categories = Loadable(lazy(() => import('../pages/admin/categories/categories')));
const AddAttributes = Loadable(lazy(() => import('../pages/admin/attributes/add-attributes')));
const Attributes = Loadable(lazy(() => import('../pages/admin/attributes/attributes')));
const AddCategoryAttributes = Loadable(lazy(() => import('../pages/admin/categoryattributes/add-categoryattributes')));
const CategoryAttributes = Loadable(lazy(() => import('../pages/admin/categoryattributes/categoryattributes')));
const AddProducts = Loadable(lazy(() => import('../pages/admin/products/add-products')));
const Products = Loadable(lazy(() => import('../pages/admin/products/products')));
const ManageUsers = Loadable(lazy(() => import('../pages/admin/users/users')));
const ManageVendors = Loadable(lazy(() => import('../pages/admin/vendors/vendors')));
const ManageTickets = Loadable(lazy(() => import('../pages/admin/tickets/tickets')));
const AddTicket = Loadable(lazy(() => import('../pages/admin/tickets/add-ticket')));
const AddPromotionDiscount = Loadable(lazy(() => import('../pages/admin/promotions-discounts/add-promotions-discounts')));
const PromotionDiscount = Loadable(lazy(() => import('../pages/admin/promotions-discounts/promotions-discounts')));
const OrderListPageView = Loadable(lazy(() => import('../pages/orders')));
const OrderDetailsPageView = Loadable(lazy(() => import('../pages/order-details')));
const ManageTicket = Loadable(lazy(() => import('../pages/admin/tickets/manage-ticket')));
const Settings = Loadable(lazy(() => import('../pages/admin/settings')));
const Pages = Loadable(lazy(() => import('../pages/admin/pages')));
const EmailTemplates = Loadable(lazy(() => import('../pages/admin/email-templates')));
const Reports = Loadable(lazy(() => import('../pages/admin/reports')));
const Visitors = Loadable(lazy(() => import('../pages/admin/visitors')));

export const AdminDashboardRoutes = [{
  path: '/admindashboard',
  element: 
    // <AuthGuard>
        <AdminLayout />,
    // </AuthGuard>,
  children: [
    {
      path: '',
      element: <AdminDashboard />
    },
    {
      path: 'categories',
      element: <Categories />
    },
    {
      path: 'add-categories',
      element: <AddCategories />
    },
    {
      path: 'attributes',
      element: <Attributes />
    },
    {
      path: 'add-attributes',
      element: <AddAttributes />
    },
    // {
    //   path: 'category-attributes',
    //   element: <CategoryAttributes />
    // },
    {
      path: 'add-category-attributes',
      element: <AddCategoryAttributes />
    },
    {
      path: 'products',
      element: <Products />
    },
    {
      path: 'add-products',
      element: <AddProducts />
    },
    {
      path: 'orders',
      element: <OrderListPageView />
    },
    {
      path: 'order-details',
      element: <OrderDetailsPageView />
    },
    {
      path: 'manage-vendors',
      element: <ManageVendors />
    },
    {
      path: 'manage-users',
      element: <ManageUsers />
    },
    {
      path: 'manage-tickets',
      element: <ManageTickets />
    },
    {
      path: 'manage-ticket',
      element: <ManageTicket />
    },
    {
      path: 'add-ticket',
      element: <AddTicket />
    },
    {
      path: 'promotion-discounts',
      element: <PromotionDiscount />
    },
    {
      path: 'add-promotion-discounts',
      element: <AddPromotionDiscount />
    },
    {
      path: 'settings',
      element: <Settings />
    },
    {
      path: 'pages',
      element: <Pages />
    },
    {
      path: 'email-templates',
      element: <EmailTemplates />
    },
    {
      path: 'reports',
      element: <Reports />
    },
    {
      path: 'visitors',
      element: <Visitors />
    }
]
}];