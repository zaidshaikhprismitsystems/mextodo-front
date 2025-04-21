import Avatar from '@mui/material/Avatar';
import styled from '@mui/material/styles/styled';

import { isDark } from '../../utils/constants';

interface StyledAvatarProps {
  borderSize: number;
  deg: number;
}

export const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'deg' && prop !== 'borderSize',
})<StyledAvatarProps>(({ theme, borderSize, deg }) => ({
  padding: '3px',
  backgroundOrigin: 'border-box',
  border: `double ${borderSize}px transparent`,
  backgroundClip: 'padding-box, border-box',
  backgroundImage: `linear-gradient(white, white), conic-gradient(from 0deg, ${theme.palette.primary.main} ${deg}deg, ${theme.palette.grey[200]} 0deg)`,
  ...(isDark(theme) && {
    backgroundImage: `linear-gradient(${theme.palette.grey[800]}, ${theme.palette.grey[800]}), conic-gradient(from 0deg, ${theme.palette.primary.main} ${deg}deg, ${theme.palette.grey[800]} 0deg)`,
  }),
}));
