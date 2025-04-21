// MUI ICON COMPONENTS
import Info from '@mui/icons-material/Info';
import Error from '@mui/icons-material/Error';
import Warning from '@mui/icons-material/Warning';
import CheckCircle from '@mui/icons-material/CheckCircle';

import { Theme } from '@mui/material/styles';
import { AlertProps } from '@mui/material/Alert';
import { PaletteColor } from '@mui/material/styles/createPalette';
import { isDark } from '../../utils/constants';

const standardStyle = (color: PaletteColor) => ({
  color: color.main,
  backgroundColor: color.light || color.main, // Fixed indexing
});

const outlinedStyle = (color: PaletteColor) => ({
  color: color.main,
  borderColor: color.main,
  backgroundColor: color.light || color.main, // Fixed indexing
});

const actionBtnStyle = (info: string, secondary: string) => ({
  '& .btn-group button': {
    ':first-of-type': {
      border: `1px solid ${secondary}`,
      marginRight: '1rem',
    },
    ':last-of-type': {
      backgroundColor: secondary,
      color: info,
    },
  },
});

const Alert = (theme: Theme) => {
  const { info, success, error, warning, common, grey } = theme.palette;
  return {
    defaultProps: {
      iconMapping: {
        info: <Info />,
        error: <Error />,
        success: <CheckCircle />,
        warning: <Warning />,
      },
    },
    styleOverrides: {
      root: {
        borderRadius: 16,
        fontSize: 12,
        fontWeight: 600,
        alignItems: 'center',
      },
      standardError: standardStyle(error),
      standardSuccess: standardStyle(success),
      standardWarning: standardStyle(warning),
      standardInfo: {
        ...standardStyle(info),
        '& .MuiAlert-icon': {
          color: info.light,
        },
      },
      outlinedError: outlinedStyle(error),
      outlinedSuccess: outlinedStyle(success),
      outlinedWarning: outlinedStyle(warning),
      outlinedInfo: {
        ...outlinedStyle(info),
        '& .MuiAlert-icon': {
          color: info.main,
        },
        ...(isDark(theme) && {
          backgroundColor: grey[700],
        }),
      },
      filledError: {
        color: common.white,
        backgroundColor: error.main,
      },
      filledSuccess: {
        color: common.white,
        backgroundColor: success.main,
      },
      filledInfo: {
        color: common.white,
        backgroundColor: info.main,
      },
      filledWarning: {
        color: common.white,
        backgroundColor: warning.main,
      },
      action: ({
        ownerState,
      }: {
        ownerState: Pick<AlertProps, 'severity' | 'variant'>;
      }) => ({
        ':has( > .btn-group)': {
          padding: 0,
          '& button': {
            borderRadius: 10,
            padding: '.5rem 1rem',
            fontWeight: 600,
          },
        },
        ...(ownerState.severity === 'info' && {
          ...(ownerState.variant === 'filled' && actionBtnStyle(info.main, common.white)),
          ...(ownerState.variant === 'outlined' && actionBtnStyle(common.white, info.main)),
          ...(ownerState.variant === 'standard' && actionBtnStyle(common.white, info.main)),
        }),
        ...(ownerState.severity === 'error' && {
          ...(ownerState.variant === 'filled' && actionBtnStyle(error.main, common.white)),
          ...(ownerState.variant === 'outlined' && actionBtnStyle(common.white, error.main)),
          ...(ownerState.variant === 'standard' && actionBtnStyle(common.white, error.main)),
        }),
        ...(ownerState.severity === 'success' && {
          ...(ownerState.variant === 'filled' && actionBtnStyle(success.main, common.white)),
          ...(ownerState.variant === 'outlined' && actionBtnStyle(common.white, success.main)),
          ...(ownerState.variant === 'standard' && actionBtnStyle(common.white, success.main)),
        }),
        ...(ownerState.severity === 'warning' && {
          ...(ownerState.variant === 'filled' && actionBtnStyle(warning.main, common.white)),
          ...(ownerState.variant === 'outlined' && actionBtnStyle(common.white, warning.main)),
          ...(ownerState.variant === 'standard' && actionBtnStyle(common.white, warning.main)),
        }),
      }),
    },
  };
};

export default Alert;
