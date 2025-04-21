import styled from '@mui/material/styles/styled';
// Replace '@/components/typography' with the correct path
import { Paragraph } from '../../typography';
// Replace '@/utils/constants' with the correct path
import { isDark } from '../../utils/constants';
// CUSTOM DATA TYPE
import { Type } from './StatusBadge';

// STYLED COMPONENT
export const Status = styled(Paragraph, {
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: Type }>(({ theme, type }) => ({
  borderRadius: 6,
  padding: '.2rem .7rem',
  display: 'inline-block',
  ...(type === 'warning' && {
    color: theme.palette.warning[600],
    backgroundColor: theme.palette.warning[50],
  }),
  ...(type === 'success' && {
    color: theme.palette.success[600],
    backgroundColor: theme.palette.success[50],
  }),
  ...(type === 'primary' && {
    color: theme.palette.primary[500],
    backgroundColor: theme.palette.primary[50],
  }),
  ...(type === 'error' && {
    color: theme.palette.error[500],
    backgroundColor: theme.palette.error[50],
  }),

  ...(isDark(theme) && {
    backgroundColor: `${theme.palette.grey[700]} !important`,
  }),
}));
