// import { forwardRef, ReactNode } from 'react';
// import { Badge, BadgeProps } from '@mui/material';
// import { styled } from '@mui/material/styles';

// // Extend MUI BadgeProps to include width and height
// interface AvatarBadgeProps extends Omit<BadgeProps, 'width' | 'height'> {
//   children: ReactNode;
//   width?: number;
//   height?: number;
// }

// // StyledBadge with custom width and height properties
// const StyledBadge = styled(Badge, {
//   shouldForwardProp: (prop) => prop !== 'width' && prop !== 'height',
// })<AvatarBadgeProps>(({ width, height }) => ({
//   width,
//   height,
// }));

// const AvatarBadge = forwardRef<HTMLSpanElement, AvatarBadgeProps>(
//   ({ children, width = 25, height = 25, ...others }, ref) => {
//     return (
//       <StyledBadge
//         ref={ref}
//         width={width}
//         height={height}
//         overlap="circular"
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         {...others}
//       >
//         {children}
//       </StyledBadge>
//     );
//   }
// );

// export default AvatarBadge;
import { forwardRef } from 'react'
import { BadgeProps } from '@mui/material/Badge'
// STYLED COMPONENT
import { StyledBadge } from './styles'

// ===================================================================
interface Props extends BadgeProps {
  width?: number
  height?: number
}
// ===================================================================

const AvatarBadge = forwardRef<HTMLSpanElement, Props>((props, ref) => {
  const { children, width = 25, height = 25, ...others } = props

  return (
    <StyledBadge
      ref={ref}
      width={width}
      height={height}
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      {...others}
    >
      {children}
    </StyledBadge>
  )
})

export default AvatarBadge
