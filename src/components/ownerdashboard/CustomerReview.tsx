import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Rating from '@mui/material/Rating'
import LinearProgress from '@mui/material/LinearProgress'
// CUSTOM COMPONENTS
import { Paragraph } from '../typography'
import { FlexBetween, FlexBox, FlexRowAlign } from '../flexbox'
import { useTranslation } from 'react-i18next'

export default function CustomerReview({avgRatting, ratingCounts, totalRattings}: any) {

  const { t } = useTranslation();

  return (
    <Card sx={{p:3, height:'100%' }}>
      <FlexRowAlign p={3} borderRadius={2} flexDirection="column" bgcolor="action.selected">
        <Rating size="large" name="read-only" value={avgRatting} precision={0.5} readOnly />

        <Paragraph py={1} lineHeight={1} fontWeight={600} fontSize={20}>
          {avgRatting && avgRatting.toFixed(2)}/5
        </Paragraph>

        <Paragraph color="text.secondary">{t("total")} {totalRattings} {t("customer_review")}</Paragraph>
      </FlexRowAlign>

      <Stack spacing={3} mt={4}>
        {[5, 4, 3, 2, 1].map((item) => (
          <FlexBetween gap={4} key={item}>
            <FlexBox gap={1} flex={1} alignItems="center">
              <Paragraph color="text.secondary" lineHeight={1}>
                {item} {t("star")}
              </Paragraph>
              <LinearProgress value={ ratingCounts[item] ? (ratingCounts[item] * 100) / totalRattings : 0 } variant="determinate" sx={{height:6, flexGrow:1, borderRadius:6, backgroundColor:'grey.200'}} />
            </FlexBox>
            <Paragraph lineHeight={1} color="text.secondary">
              {ratingCounts && ratingCounts !== undefined && ratingCounts[item] && ratingCounts[item] !== undefined ? ratingCounts[item] : 0}
            </Paragraph>
          </FlexBetween>
        ))}
      </Stack>
    </Card>
  )
}
