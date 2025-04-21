// CUSTOM COMPONENTS
import FlexBox from '../../../../flexbox/FlexBox';
import { Paragraph } from '../../../../typography'; // ==============================================================

// ==============================================================
export default function InfoItem({
  title,
  Icon
}: any) {
  return <FlexBox alignItems="center" gap={1} color="grey.500">
      <Icon sx={{
      fontSize: 18
    }} />
      <Paragraph>{title}</Paragraph>
    </FlexBox>;
}