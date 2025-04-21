import { lazy } from 'react';
import Loadable from './loadable';
// import { AuthRoutes } from './auth';
// import { PublicRoutes } from './public';
import { OwnerDashboardRoutes } from './ownerDashboardRoutes';
import { AdminDashboardRoutes } from './adminDashboardRoutes';
// import { ComponentRoutes } from './components';
import MainLayout from '../layouts/mainLayout';

const ErrorPage = Loadable(lazy(() => import('../pages/404')));
const Landing = Loadable(lazy(() => import('../pages/index')));
const Login = Loadable(lazy(() => import('../pages/login')));
const AdminLogin = Loadable(lazy(() => import('../pages/adminlogin')));
const Register = Loadable(lazy(() => import('../pages/register')));
const VerifyUser = Loadable(lazy(() => import('../pages/verifyuser')));
const ForgetPassword = Loadable(lazy(() => import('../pages/forget-password')));
const ResetPassword = Loadable(lazy(() => import('../pages/reset-password')));
const SellerRegister = Loadable(lazy(() => import('../pages/seller-register')));
const Profile = Loadable(lazy(() => import('../pages/profile')));
const Account = Loadable(lazy(() => import('../pages/account')));
const RegisterMessage = Loadable(lazy(() => import('../pages/register-message')));
const Product = Loadable(lazy(() => import('../pages/product')));
const Products = Loadable(lazy(() => import('../pages/products')));

export const routes = () => {
  return [
  {
    path: '/',
      element: 
        <MainLayout />,
        children: [
          {
            path: '',
            element: <Landing />
          }, 
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'forget-password',
            element: <ForgetPassword />
          },
          {
            path: 'verifyuser',
            element: <VerifyUser />
          },
          {
            path: "reset-password",
            element: <ResetPassword />
          },
          {
            path: "seller-register",
            element: <SellerRegister />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "account",
            element: <Account />
          },
          {
            path: "register-success-message",
            element: <RegisterMessage />
          },
          {
            path: "product",
            element: <Product />
          },
          {
            path: "product-list",
            element: <Products />
          }
      ]
  },
  {
    path: '/adminlogin',
    element: <AdminLogin />
  },
  ...OwnerDashboardRoutes,
  ...AdminDashboardRoutes,
  {
    path: '*',
    element: <ErrorPage />
  }
] 
  // AUTHENTICATION PAGES ROUTES & DIFFERENT AUTH DEMO PAGES ROUTES
//   ...AuthRoutes, // COMPONENTS PAGES ROUTES
//   ...ComponentRoutes, // INSIDE DASHBOARD PAGES ROUTES
//   ...PublicRoutes];
};