import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles/createTheme';

interface StyledButtonProps {
  active?: boolean;
}

interface TableCellProps {
  theme: Theme;
}

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyledButtonProps>(({ theme, active }) => ({
  borderRadius: 0,
  fontWeight: 500,
  position: 'relative',
  padding: '0.6rem 1.5rem',
  justifyContent: 'flex-start',
  color: theme.palette.grey[500],
  ...(active && {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&::before': {
      left: 0,
      width: 4,
      content: '""',
      height: '100%',
      borderRadius: 4,
      position: 'absolute',
      transition: 'all 0.3s',
      backgroundColor: theme.palette.primary.main,
    },
  }),
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&::before': {
      left: 0,
      width: 4,
      content: '""',
      height: '100%',
      borderRadius: 4,
      position: 'absolute',
      transition: 'all 0.3s',
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const COMMON = {
  paddingBlock: '1.5rem',
  '&:first-of-type': {
    paddingLeft: 24,
  },
  '&:last-of-type': {
    paddingRight: 24,
  },
};

export const BodyTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  ...COMMON,
  color: theme.palette.text.primary,
}));

export const HeadTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  ...COMMON,
  fontWeight: 500,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.action.selected,
}));

export const BodyTableRow = styled(TableRow)<TableCellProps>(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  ':last-of-type': {
    borderBottom: 0,
  },
}));

export const BodyTableCellV2 = styled(TableCell)<TableCellProps>(({ theme }) => ({
  paddingBlock: '1.5rem',
  '&:last-of-type': {
    paddingRight: 24,
    maxWidth: 90,
  },
  '&:first-of-type': {
    paddingLeft: 24,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
}));

export const HeadTableCellV2 = styled(BodyTableCellV2)<TableCellProps>(({ theme }) => ({
  fontWeight: 600,
  paddingBlock: '1.5rem',
  color: theme.palette.text.primary,
}));
