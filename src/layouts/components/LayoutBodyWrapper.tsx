// MUI
import Container from '@mui/material/Container';
import styled from '@mui/material/styles/styled'; // LAYOUT BASED HOOK

import useLayout from '../mainLayout/context/useLayout'; // STYLED COMPONENT

const RootBox = styled('div', {
  shouldForwardProp: prop => prop !== 'compact'
})(({
  theme,
  compact
}: any) => ({
  marginLeft: compact ? 86 : 280,
  transition: 'margin-left 0.3s ease-in-out',
  [theme.breakpoints.down(1200)]: {
    marginLeft: 0
  }
}));
export default function LayoutBodyWrapper({
  children
}: any) {
  const {
    sidebarCompact
  } = useLayout();
  //@ts-ignore
  return <RootBox compact={sidebarCompact ? 1 : 0}>
      <Container maxWidth="lg">{children}</Container>
    </RootBox>;
}