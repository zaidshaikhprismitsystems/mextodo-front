import { useNavigate } from 'react-router-dom'
// MUI
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import styled from '@mui/material/styles/styled'
// CUSTOM ICON COMPONENTS
import Apps from '../../icons/Apps'
import FormatBullets from '../../icons/FormatBullets'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

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

export default function UsersTableActions({ handleChangeFilter, filter }: TableActionsProps) {
  const navigate = useNavigate()
  const { t } = useTranslation();

  const FILTER_VALUES = [
    { id: 1, name: t("all"), value: '' },
    { id: 2, name: t("enabled"), value: 'enabled' },
    { id: 5, name: t("disabled"), value: 'disabled' },
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
    <Wrapper>
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
        label={t("search_by_user_name_or_email")}
        value={debouncedSearch}
        onChange={(e) => setDebouncedSearch(e.target.value)}
      />
    </Wrapper>
  )
}
