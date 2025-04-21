import { THEMES } from '../utils/constants';
import { darkPalette, lightPalette } from './colors';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
const themesOptions = {
  // [THEMES.LIGHT]: {
  //   palette: lightPalette
  // },
  // [THEMES.DARK]: {
  //   palette: darkPalette
  // }
  palette: lightPalette,
  typography: {
    fontFamily: "'Inter', sans-serif"
  },
};
export default themesOptions;