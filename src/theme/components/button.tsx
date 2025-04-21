import { alpha } from '@mui/system/colorManipulator';
// CUSTOM UTILS METHOD
import { isDark } from '../../utils/constants';
export const Button = (theme: any) => {
  const {
    error,
    primary,
    text,
    success,
    warning,
    info
  } = theme.palette;
  return {
    defaultProps: {
      variant: 'contained',
      color: 'primary'
    },
    styleOverrides: {
      root: {
        fontWeight: 500,
        borderRadius: 10,
        color: 'inherit',
        boxShadow: 'none',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textTransform: 'none',
        textOverflow: 'ellipsis',
        '&.Mui-disabled': {
          color: theme.palette.grey[400]
        }
      },
      // contained variants
      contained: {
        color: 'white',
        ':hover': {
          boxShadow: 'none'
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.grey[isDark(theme) ? 600 : 200]
        }
      },
      containedError: {
        ':hover': {
          backgroundColor: error[600]
        }
      },
      containedPrimary: {
        ':hover': {
          backgroundColor: primary[600]
        }
      },
      containedSuccess: {
        ':hover': {
          backgroundColor: success[700]
        }
      },
      containedWarning: {
        ':hover': {
          backgroundColor: warning[500]
        }
      },
      containedSecondary: {
        transition: 'none',
        color: text.primary,
        ':hover': {
          backgroundColor: theme.palette.grey[200]
        },
        ...(isDark(theme) && {
          backgroundColor: theme.palette.grey[700],
          ':hover': {
            backgroundColor: theme.palette.grey[600]
          }
        })
      },
      containedInherit: {
        backgroundColor: text.primary,
        ':hover': {
          backgroundColor: alpha(text.primary, 0.9)
        },
        ...(isDark(theme) && {
          color: 'black'
        })
      },
      // outlined variants
      outlinedError: {
        color: error.main
      },
      outlinedPrimary: {
        color: primary.main
      },
      outlinedSuccess: {
        color: success.main
      },
      outlinedWarning: {
        color: warning.main
      },
      outlinedSecondary: {
        transition: 'none',
        borderColor: theme.palette.grey[200],
        ...(isDark(theme) && {
          borderColor: theme.palette.grey[700]
        })
      },
      // text variants
      textPrimary: {
        color: primary.main
      },
      textSecondary: {
        color: theme.palette.grey[600]
      },
      textSuccess: {
        color: success.main
      },
      textWarning: {
        color: warning.main
      },
      textError: {
        color: error.main
      },
      textInfo: {
        color: info.main
      },
      // sizes
      sizeSmall: {
        padding: '0.25rem .5rem',
        height: 30
      },
      sizeMedium: {
        padding: '6px 14px'
      },
      sizeLarge: {
        padding: '8px 16px',
        height: 48
      }
    }
  };
};
export const ButtonBase = (theme: any )=> {
  return {
    styleOverrides: {
      root: {
        fontFamily: theme.typography.fontFamily
      }
    }
  };
};
export const ButtonGroup = (theme: any ) => {
  const {
    primary,
    success,
    error,
    warning,
    secondary,
    info
  } = theme.palette;
  return {
    styleOverrides: {
      root: {
        boxShadow: 'none'
      },
      groupedContainedPrimary: {
        '&:not(:last-of-type)': {
          borderColor: primary[600]
        }
      },
      groupedContained: ({
        ownerState: {
          color
        }
      }:any) => ({ ...(color === 'success' && {
          '&:not(:last-of-type)': {
            borderColor: success[600]
          }
        }),
        ...(color === 'error' && {
          '&:not(:last-of-type)': {
            borderColor: error[400]
          }
        }),
        ...(color === 'info' && {
          '&:not(:last-of-type)': {
            borderColor: info[400]
          }
        }),
        ...(color === 'warning' && {
          '&:not(:last-of-type)': {
            borderColor: warning[400]
          }
        })
      }),
      groupedContainedSecondary: {
        backgroundColor: secondary[isDark(theme) ? 700 : 200],
        '&:not(:last-of-type)': {
          borderColor: secondary[300]
        },
        ':hover': {
          backgroundColor: secondary[isDark(theme) ? 800 : 300]
        }
      },
      groupedOutlinedSecondary: {
        ':hover': {
          borderColor: secondary[isDark(theme) ? 700 : 200],
          backgroundColor: secondary[isDark(theme) ? 800 : 200]
        }
      },
      groupedTextSecondary: {
        '&:not(:last-of-type)': {
          borderColor: secondary[300]
        }
      }
    }
  };
};
export const IconButton = (theme: any) => {
  return {
    styleOverrides: {
      colorSecondary: {
        color: theme.palette.grey[400],
        ':hover': {
          color: theme.palette.primary.main
        }
      }
    }
  };
};
export const LoadingButton = (theme:any) => {
  return {
    defaultProps: {
      variant: 'contained'
    },
    styleOverrides: {
      root: {
        '.MuiLoadingButton-loadingIndicator': {
          color: theme.palette.grey[400]
        }
      }
    }
  };
};