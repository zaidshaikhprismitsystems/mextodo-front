// CUSTOM UTILS METHOD
import { isDark } from '../../utils/constants';

const ChipStyles = (theme: any) => {
  const {
    common,
    grey
  } = theme.palette;
  return {
    defaultProps: {
      color: 'primary'
    },
    styleOverrides: {
      root: {
        fontWeight: 500,
        borderRadius: 16
      },
      filled: ({
        ownerState: {
          color
        }
      }: { ownerState: { color: string } }) => ({
        color: common.white,
        ...(color === 'default' && {
          backgroundColor: grey[500]
        })
      }),
      outlined: ({
        ownerState: {
          color
        }
      }: { ownerState: { color: string } }) => ({ ...(color === 'default' && {
          color: grey[400]
        })
      }),
      filledSecondary: {
        color: isDark(theme) ? grey[50] : grey[700],
        backgroundColor: isDark(theme) ? grey[700] : grey[100]
      },
      outlinedSecondary: {
        color: grey[700],
        borderColor: grey[700]
      },
      avatar: {
        ':has(img[src])': {
          backgroundColor: 'transparent'
        }
      },
      deleteIcon: ({
        ownerState: {
          variant,
          color,
          size
        }
      }: { ownerState: { variant: string; color: string; size: string } }) => ({
        opacity: 0.8,
        fontSize: 18,
        ':hover': {
          opacity: 1,
          color: 'inherit'
        },
        ...(variant === 'outlined' && {
          color: 'inherit'
        }),
        ...(variant === 'filled' && {
          color: color === 'secondary' ? 'inherit' : 'white'
        }),
        ...(size === 'small' && {
          fontSize: 16
        })
      }),
      clickable: ({
        ownerState: {
          color
        }
      }: { ownerState: { color: string } }) => ({ ...(color === 'default' && {
          ':hover': {
            backgroundColor: grey[700]
          }
        })
      }),
      sizeSmall: {
        fontSize: 13
      }
    }
  };
};

const getChipColor = ({ color }: { color: string }) => ({
  // ...existing code...
});

const getChipVariant = ({ variant, color }: { variant: string; color: string }) => ({
  // ...existing code...
});

const getChipSize = ({ size }: { size: string }) => ({
  // ...existing code...
});

export default ChipStyles;