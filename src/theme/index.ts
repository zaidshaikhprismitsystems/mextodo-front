// import { createTheme, responsiveFontSizes, ThemeOptions, Theme } from '@mui/material/styles';
// import merge from 'lodash.merge';
// import shadows from './shadows';
import componentsOverride from './components';
// import themesOptions from './themeOptions';
// import { THEMES } from '../utils/constants';
// // import '@fontsource/inter/400.css';
// // import '@fontsource/inter/500.css';
// // import '@fontsource/inter/600.css';
// // import '@fontsource/inter/700.css';

// interface ThemeSettings {
//   theme: keyof typeof THEMES;
//   direction: 'ltr' | 'rtl';
//   responsiveFontSizes?: boolean;
// }

// const baseOptions: ThemeOptions = {
//   direction: 'ltr',
//   typography: {
//     fontFamily: "'Inter', sans-serif",
//   },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// };

// export const createCustomTheme = (settings: any) => {
//   let themeOption = themesOptions[settings.theme] || themesOptions[THEMES.LIGHT];

//   const mergedThemeOptions = merge({}, baseOptions, themeOption, {
//     direction: settings.direction,
//   });

  // let theme = createTheme(mergedThemeOptions);
  // theme.shadows = shadows(theme);
//   theme.components = componentsOverride(theme);

//   if (settings.responsiveFontSizes) {
//     theme = responsiveFontSizes(theme);
//   }

//   return theme;
// };

import themesOptions from './themeOptions';
import { createTheme } from "@mui/material/styles"

// let theme = createTheme(themesOptions);
// theme.shadows = shadows(theme);

// const theme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1308,
//       xl: 1768,
//     },
//   },
//   ...themesOptions,
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           borderRadius: "4px",
//         },
//         contained: {
//           boxShadow: "none",
//           "&:hover": {
//             boxShadow: "none",
//           },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         },
//       },
//     },
//   },
//  ...componentsOverride(theme)
// })

export const createCustomTheme = () => {
  /**
   * settings.theme value is 'light' or 'dark'
   * update settings in contexts/settingsContext.tsx
   */
  // let themeOption = themesOptions[settings.theme]

  // if (!themeOption) {
  //   themeOption = themesOptions[THEMES.LIGHT]
  // }

  // const mergedThemeOptions = merge({}, baseOptions, themeOption, {
  //   direction: settings.direction,
  // })

  let theme: any = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1308,
        xl: 1768,
      },
    },
    ...themesOptions,
  })

  // OVERRIDE SHADOWS
  // theme.shadows = shadows(theme)

  // OVERRIDE COMPONENTS
  theme.components = componentsOverride(theme)

  // if (settings.responsiveFontSizes) {
  //   theme = responsiveFontSizes(theme)
  // }

  return theme
}
