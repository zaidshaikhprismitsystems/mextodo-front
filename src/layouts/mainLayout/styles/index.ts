import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ButtonBase from '@mui/material/ButtonBase';
import styled from '@mui/material/styles/styled';

import { Paragraph, Span } from '../../../components/typography';

import ChevronRight from '../../../icons/ChevronRight';

import { isDark } from '../../../utils/constants';

export const SidebarWrapper = styled('div', {
  shouldForwardProp: prop => prop !== 'compact'
})(({
  theme,
  compact
}: any) => ({
  width: 280,
  height: '100vh',
  position: 'fixed',
  zIndex: theme.zIndex.drawer,
  backgroundColor: '#fff',
  transition: 'width 200ms ease',
  borderRight: `1px dashed ${theme.palette.grey[200]}`,
  ...(compact && {
    width: 86,
    '&:hover': {
      width: 280
    }
  }),
  ...(isDark(theme) && {
    border: 0,
    backgroundColor: theme.palette.background.default
  })
})); // COMMON ICON STYLE

export const ICON_STYLE = (active: any) => ({
  fontSize: 18,
  color: active ? 'primary.main' : 'text.secondary'
}); // SIDEBAR ACCORDION RELATED STYLED COMPONENTS

export const AccordionExpandPanel = styled('div')({
  '&.expand': {
    '& .expand': {
      paddingLeft: 8
    }
  }
});
export const BulletIcon = styled('div', {
  shouldForwardProp: prop => prop !== 'active'
})(({
  theme,
  active
}: any) => ({
  width: 4,
  height: 4,
  marginLeft: '10px',
  marginRight: '8px',
  overflow: 'hidden',
  borderRadius: '50%',
  background: theme.palette.text.secondary,
  ...(active && {
    background: theme.palette.primary.main,
    boxShadow: `0px 0px 0px 3px ${isDark(theme) ? theme.palette.grey[700] : theme.palette.primary[100]}`
  })
}));

export const AccordionButton = styled(ButtonBase)(({
  theme,
  active
}: any) => ({
  height: 44,
  width: '100%',
  padding: '0 12px',
  marginBottom: 5,
  borderRadius: '10px',
  justifyContent: 'space-between',
  '& .icon': {
    fontSize: 18,
    color: theme.palette.text.secondary
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    '& span, & .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    }
  },
  ...(active && {
    backgroundColor: theme.palette.action.hover
  })
}));

export const ChevronRightStyled = styled(ChevronRight, {
  shouldForwardProp: prop => prop !== 'collapsed' && prop !== 'compact' && prop !== 'active'
})(({
  collapsed,
  compact,
  active,
  theme
}: any) => ({
  fontSize: 18,
  color: theme.palette.grey[400],
  transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
  transform: collapsed ? 'rotate(90deg)' : 'rotate(0deg)',
  ...(compact && {
    opacity: 0,
    width: 0
  }),
  ...(active && {
    color: theme.palette.primary.main
  }),
  ...(theme.direction === 'rtl' && {
    rotate: '180deg',
    transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)'
  })
}));

export const ItemText = styled(Span, {
  shouldForwardProp: prop => prop !== 'compact' && prop !== 'active'
})(({
  theme,
  compact,
  active
}: any) => ({
  fontSize: 14,
  fontWeight: 500,
  whiteSpace: 'nowrap',
  paddingLeft: '0.8rem',
  transition: 'all 0.15s ease',
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  ...(compact && {
    opacity: 0,
    width: 0,
    paddingLeft: 0
  })
}));

export const NavItemButton = styled(ButtonBase, {
  shouldForwardProp: prop => prop !== 'active'
})(({
  theme,
  active
}: any) => ({
  height: 44,
  width: '100%',
  marginBottom: 4,
  padding: '0 18px',
  justifyContent: 'flex-start',
  '&.Mui-disabled': {
    opacity: 0.6
  },
  ...(active && {
    borderRadius: '10px',
    color: theme.palette.primary.main,
    backgroundColor: isDark(theme) ? theme.palette.grey[800] : theme.palette.primary[25]
  }),
  '&:hover': {
    borderRadius: '10px',
    backgroundColor: theme.palette.action.hover,
    '& > span, & > .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    }
  }
}));

export const ListLabel = styled(Paragraph, {
  shouldForwardProp: prop => prop !== 'compact'
})(({
  theme,
  compact
}) => ({
  fontSize: 12,
  marginTop: 20,
  marginLeft: 15,
  fontWeight: 600,
  marginBottom: 10,
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  ...(compact && {
    opacity: 0,
    width: 0
  })
}));

export const ExternalLink = styled('a')(({
  theme
}) => ({
  overflow: 'hidden',
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  color: theme.palette.text.primary
}));

export const DashboardHeaderRoot = styled(AppBar)({
  paddingTop: '1rem',
  paddingBottom: '1rem',
  backdropFilter: 'blur(6px)',
  backgroundColor:'transparent',
  boxShadow:'none'
});

export const StyledToolBar = styled(Toolbar)({
  '@media (min-width: 0px)': {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: 'auto'
  }
});