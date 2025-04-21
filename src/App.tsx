import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

// import { AuthProvider } from './context/authContext';

import { routes } from './routes';
import { store } from "./services/store/store";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import ThemeProvider from '@mui/material/styles/ThemeProvider';

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import { useAppDispatch, useAppSelector } from './services/store/hooks/hooks';
import { AuthLoader } from "./components/authLoader"
// import theme from './theme';
import { createCustomTheme } from './theme'

import './App.css'
// import { useEffect } from 'react';
// import ApiService from './services/apiServices/apiService';

function App() {

  const router = createBrowserRouter(routes());
  const theme = createCustomTheme();

  // useEffect(() => {
  //   let logVistors = ApiService.logVisitors();
  //   console.log("log visitors");
  //   }, [])

  return (
    // <AuthProvider>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
          <AuthLoader>
            <CssBaseline />
            <RouterProvider router={router} />
            <ToastContainer />
          </AuthLoader>
      </Provider>
    </ThemeProvider>
    // </AuthProvider>
  )
}

export default App
