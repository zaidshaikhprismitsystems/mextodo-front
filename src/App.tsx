import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { routes } from './routes';
import { store } from "./services/store/store";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AuthLoader } from "./components/authLoader";
import { createCustomTheme } from './theme';

import './App.css';

function App() {
  const router = createBrowserRouter(routes());
  const theme = createCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthLoader>
          <CssBaseline />
          <RouterProvider router={router} />
          <ToastContainer />
        </AuthLoader>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
