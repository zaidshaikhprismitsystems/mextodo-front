import Box from '@mui/material/Box'
// CUSTOM COMPONENTS
import { Typography } from '../../components/typography'

export default function ProductDescription() {
  return (
    <Box padding={3}>
      <Typography variant="h6" mb={0.5} fontSize={14}>
        Specification:
      </Typography>

      <Typography variant="body1" mb={3}>
        You can't go wrong with a pair of Jordan sneakers. Crafted from black and white leather,
        these Air Jordan 1 Mid SE sneakers are a timeless Easy as that.{' '}
      </Typography>

      <Typography variant="h6" mb={0.5} fontSize={14}>
        MATERIAL AND WASHING INSTRUCTIONS
      </Typography>

      <Typography variant="body1">
        Shoeupper: 54% bovine leather,46% polyurethane. Lining: 65% polyester,35% cotton. Insole:
        100% polyurethane. Sole: 100% thermoplastic. Fixing sole: 100% glued
      </Typography>
    </Box>
  )
}
