import { useState } from 'react'; // Removed unused imports: useNavigate, IconButton, Apps, FormatBullets, Button, AddIcon
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import styled from '@mui/material/styles/styled'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FlexBetween } from '../flexbox'

//  STYLED COMPONENTS
const Wrapper = styled('div')(({ theme }) => ({
  gap: '1rem',
  display: 'flex',
  alignItems: 'center',
  paddingBlock: '1.5rem',
  paddingInline: '1rem',
  '.select': { flex: '1 1 200px' },
  '.navigation': {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down(440)]: { display: 'none' },
  },
}))

// ==============================================================
interface TableActionsProps {
  handleChangeFilter: (key: string, value: string) => void
  filter: { search: string; status: string; }
}
// ==============================================================

export default function TicketsTableActions({ handleChangeFilter, filter }: TableActionsProps) {
  
  const { t } = useTranslation();

  const FILTER_VALUES = [
    { id: 1, name: t("all"), value: '' },
    { id: 2, name: t("pending"), value: 'pending' },
    { id: 3, name: t("open"), value: 'open' },
    { id: 4, name: t("inProgress"), value: 'inProgress' },
    { id: 5, name: t("closed"), value: 'closed' },
  ]

  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      handleChangeFilter('search', debouncedSearch)
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [debouncedSearch]);

  return (
    <FlexBetween gap='1rem' flexWrap='wrap' fleDirection='{xs:column, sm:row}'>
    <Wrapper sx={{p:0, width:{xs:'100%', md:'auto'},  maxWidth: '700px', flex:{xs:'1 1 100%', md:'1'}}}>
      <TextField
        select
        fullWidth
        label={t("status")}
        className="select"
        value={filter.status}
        onChange={(e) => handleChangeFilter('status', e.target.value)}
      >
        {FILTER_VALUES.map(({ id, name, value }) => (
          <MenuItem key={id} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label={t("search_by_issue_name")}
        value={debouncedSearch}
        onChange={(e) => setDebouncedSearch(e.target.value)}
      />
      </Wrapper>
</FlexBetween>
  )
}
