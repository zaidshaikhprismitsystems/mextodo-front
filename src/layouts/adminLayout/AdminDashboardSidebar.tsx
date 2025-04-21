import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'; // LAYOUT BASED HOOK
import Link from '../../components/link';
import Scrollbar from '../../components/scrollbar';
import FlexBetween from '../../components/flexbox/FlexBetween';
import ArrowLeftToLine from '../../icons/duotone/ArrowLeftToLine';

import ListContent from './ListContent';

const TOP_HEADER_AREA = 72;

export default function AdminDashboardSidebar() {
  
  const handleSidebarCompactToggle =() => {
  }
  
  return (
      <Box>
        <FlexBetween padding="1rem" >
          <Link href="/admindashboard" style={{display: 'flex', alignItems: 'center', gap: 1}}>
            <Box component="img" src="../../../public/logo.svg" alt="logo" width={100} />
          </Link>
          {
          <IconButton onClick={handleSidebarCompactToggle}>
              <ArrowLeftToLine />
            </IconButton>
          }
        </FlexBetween>

        <Scrollbar autoHide clickOnTrack={false} 
          sx={{
            overflowX: 'hidden',
            maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`
          }}>
          <ListContent />
        </Scrollbar>
      </Box>
    )
}