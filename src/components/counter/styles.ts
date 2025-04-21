import InputBase from '@mui/material/InputBase'
import styled from '@mui/material/styles/styled'
// CUSTOM UTILS METHOD
// import { isDark } from '@/utils/constants'
// COMPONENT PROPS TYPE
import { CounterProps } from './Counter'

// STYLED COMPONENT
export const StyledInputBase = styled(InputBase)<CounterProps>(
  ({ theme, colors, variant, button }) => ({
    padding: 4,
    borderRadius: variant === 'circular' ? 32 : 6,
    border: `1px solid ${theme.palette.divider}`,
    '& .MuiInputBase-input': {
      maxWidth: 30,
      fontSize: 14,
      fontWeight: 500,
      textAlign: 'center',
    },

    '& .MuiIconButton-root': {
      color: theme.palette.grey[400],
      borderRadius: variant === 'circular' ? 32 : 4,
      backgroundColor: colors === 'dark' ? 'white' : theme.palette.grey[100],
    },

    ...(colors === 'dark' && {
      border: 0,
      backgroundColor: theme.palette.grey[100],
    }),

    ...(button === 'outlined' && {
      '& .MuiIconButton-root': {
        backgroundColor: 'white',
        color: theme.palette.grey[400],
        borderRadius: variant === 'circular' ? 32 : 4,
        border: `1px solid ${theme.palette.grey[200]}`,
      },
    }),
  })
)
