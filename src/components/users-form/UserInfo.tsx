import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
// MUI ICON COMPONENTS
import CameraAlt from '@mui/icons-material/CameraAlt'
import MoreHoriz from '@mui/icons-material/MoreHoriz'
// CUSTOM ICON COMPONENTS
import DateRange from '../../icons/DateRange'
import Bratislava from '../../icons/Bratislava'
import MapMarkerIcon from '../../icons/MapMarkerIcon'
// CUSTOM COMPONENTS
import InfoItem from './InfoItem'
import AvatarBadge from '../avatar-badge'
import AvatarLoading from '../avatar-loading'
import { FlexBetween, FlexBox } from '../flexbox'
import { H6, Paragraph, Small } from '../typography'
// STYLED COMPONENTS
import { ProgressWrapper, ContentWrapper } from './styles'
import { grey } from '@mui/material/colors'
import { format } from 'date-fns'

export default function UserInfo({isUpdate, enableUpdate, createdAt}: any) {
  return (
    <ContentWrapper>
      <FlexBox justifyContent="center">
        <AvatarBadge
          badgeContent={
            <label htmlFor="icon-button-file">
              <input
                type="file"
                accept="image/*"
                id="icon-button-file"
                style={{ display: 'none' }}
              />

              <IconButton aria-label="upload picture" component="span">
                <CameraAlt sx={{ fontSize: 16, color: 'grey.400' }} />
              </IconButton>
            </label>
          }
        >
          <AvatarLoading
            borderSize={2}
            percentage={60}
            alt="Team Member"
            src="/user-11.png"
            sx={{ width: 100, height: 100 }}
          />
        </AvatarBadge>
      </FlexBox>

      <Box mt={2}>
        <H6 fontSize={18} textAlign="center">
          Pixy Krovasky
        </H6>

        <FlexBetween maxWidth={360} flexWrap="wrap" margin="auto" mt={1}>
          <InfoItem Icon={Bratislava} title="Developer" />
          <InfoItem Icon={MapMarkerIcon} title="New York" />
          <InfoItem Icon={DateRange} title={`Joined ${format(createdAt, 'MMMM dd')}`} />
        </FlexBetween>

        <FlexBetween marginTop={6} flexWrap="wrap">
          <ProgressWrapper>
            <Paragraph mb={0.5}>Profile Completion</Paragraph>

            <FlexBox alignItems="center" gap={1}>
              <LinearProgress value={60} color="success" variant="determinate" sx={{width:'100%'}} />
              <Small fontWeight={500}>60%</Small>
            </FlexBox>
          </ProgressWrapper>

          <FlexBox gap={1}>
            {
              !isUpdate ?
              <Button onClick={enableUpdate} size="small" color="success">
                Update
              </Button>
              : ''
            }

            {/* <Button size="small" color='inherit'  sx={{ minWidth: 0, backgroundColor:'grey.200', color:'#000000', '&:hover':{backgroundColor:'grey.200',} }}>
              <MoreHoriz fontSize="small" />
            </Button> */}
          </FlexBox>
        </FlexBetween>
      </Box>
    </ContentWrapper>
  )
}
