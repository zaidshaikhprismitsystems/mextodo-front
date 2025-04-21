import { SvgIconComponent } from '@mui/icons-material'
// CUSTOM COMPONENTS
import { FlexBox } from "../flexbox"
import { Paragraph } from '../typography'

// ==============================================================
interface Props {
  title: string
  Icon: SvgIconComponent
}
// ==============================================================

export default function InfoItem({ title, Icon }: Props) {
  return (
    <FlexBox alignItems="center" gap={1} color="grey.500">
      <Icon sx={{ fontSize: 18 }} />
      <Paragraph>{title}</Paragraph>
    </FlexBox>
  )
}
