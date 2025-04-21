import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
// CUSTOM COMPONENT
import FlexRowAlign from '../flexbox/FlexRowAlign'
import { useTranslation } from 'react-i18next'

export default function TableDataNotFound() {
  const {t} = useTranslation();
  return (
    <TableRow>
      <TableCell colSpan={10}>
        <FlexRowAlign
          m={2}
          fontSize={18}
          minHeight={300}
          fontWeight={700}
          borderRadius={2}
          bgcolor="action.selected"
        >
          {t("data_not_found")}
        </FlexRowAlign>
      </TableCell>
    </TableRow>
  )
}
