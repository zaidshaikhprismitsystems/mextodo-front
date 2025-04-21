import Box from '@mui/material/Box';
import Scrollbar from '../../components/scrollbar';
import ListContent from './ListContent';

const TOP_HEADER_AREA = 50;

export default function OwnerDashboardSidebar() {
  return (
      <Box position={'sticky'} top={169}>
        <Scrollbar autoHide clickOnTrack={false} 
          sx={{
            height:'100%',
            overflowX: 'hidden',
            maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`
          }}>
          <ListContent />
        </Scrollbar>
      </Box>
  )
}