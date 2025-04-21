import { useTranslation } from 'react-i18next'
// MUI
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import styled from '@mui/material/styles/styled'
// CUSTOM ICON COMPONENTS
import { useEffect } from 'react'
import { FlexBetween } from '../flexbox'
import Grid from '@mui/material/Grid2';

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
  filter: { entity: string; toDate: any; fromDate: any; }
}
// ==============================================================

export default function ReportsActions({ filter, handleChangeFilter }: TableActionsProps) {
  const { t } = useTranslation();

  const FILTER_VALUES = [
      { id: 1, name: t("users"), value: 'users' },
      { id: 2, name: t("orders"), value: 'orders' },
      { id: 3, name: t("products"), value: 'products' },
      { id: 4, name: t("owners"), value: 'owners' }
  ]
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleChangeFilter('search', '')
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <FlexBetween gap='1rem' flexWrap='wrap' fleDirection='{xs:column, sm:row}'>
    <Wrapper sx={{p:0, width:{xs:'100%', md:'auto'},  maxWidth: '700px', flex:{xs:'1 1 100%', md:'1'}}}>
    <Grid>
      <TextField
        select
        fullWidth
        label={t("status")}
        className="select"
        value={filter.entity}
        onChange={(e) => handleChangeFilter('entity', e.target.value)}
      >
        {FILTER_VALUES.map(({ id, name, value }) => (
          <MenuItem key={id} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
    <Grid>
      <TextField
        type={"date"}
        fullWidth
        variant='outlined'
        label={t("from_date")}
        value={filter.fromDate}
        onChange={(e) => handleChangeFilter('fromDate', e.target.value)}
      />
    </Grid>
    <Grid>
      <TextField
        type={"date"}
        fullWidth
        variant='outlined'
        label={t("to_date")}
        value={filter.toDate}
        onChange={(e) => handleChangeFilter('toDate', e.target.value)}
      />
  </Grid>
  </Wrapper>

</FlexBetween>

  )
}
