import { lazy } from 'react';
import Loadable from './loadable';
import AdminLayout from '../layouts/adminLayout';

const AdminDashboard = Loadable(lazy(() => import('../pages/admin/dashboard')));
const AddCategories = Loadable(lazy(() => import('../pages/admin/categories/add-categories')));
const Categories = Loadable(lazy(() => import('../pages/admin/categories/categories')));
const AddAttributes = Loadable(lazy(() => import('../pages/admin/attributes/add-attributes')));
const Attributes = Loadable(lazy(() => import('../pages/admin/attributes/attributes')));
const AddCategoryAttributes = Loadable(lazy(() => import('../pages/admin/categoryattributes/add-categoryattributes')));
const Products = Loadable(lazy(() => import('../pages/admin/products/products')));
const ManageUsers = Loadable(lazy(() => import('../pages/admin/users/users')));
const ManageVendors = Loadable(lazy(() => import('../pages/admin/vendors/vendors')));
const ManageTickets = Loadable(lazy(() => import('../pages/admin/tickets/tickets')));
const PromotionDiscount = Loadable(lazy(() => import('../pages/admin/promotions-discounts/promotions-discounts')));
const Reports = Loadable(lazy(() => import('../pages/admin/reports')));

export const AdminDashboardRoutes = [
  {
    path: '/admindashboard',
    element: <AdminLayout />,
    children: [
      { path: '', element: <AdminDashboard /> },
      { path: 'categories', element: <Categories /> },
      { path: 'add-categories', element: <AddCategories /> },
      { path: 'attributes', element: <Attributes /> },
      { path: 'add-attributes', element: <AddAttributes /> },
      { path: 'add-category-attributes', element: <AddCategoryAttributes /> },
      { path: 'products', element: <Products /> },
      { path: 'manage-vendors', element: <ManageVendors /> },
      { path: 'manage-users', element: <ManageUsers /> },
      { path: 'manage-tickets', element: <ManageTickets /> },
      { path: 'promotion-discounts', element: <PromotionDiscount /> },
      { path: 'reports', element: <Reports /> },
    ],
  },
];