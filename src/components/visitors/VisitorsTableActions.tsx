import { useEffect, useState } from 'react'
import { TextField, MenuItem } from '@mui/material'
import styled from '@mui/material/styles/styled'
import { useTranslation } from 'react-i18next'
import { FlexBetween } from '../flexbox'

// STYLED COMPONENT
const Wrapper = styled('div')(({ theme }) => ({
  gap: '1rem',
  display: 'flex',
  alignItems: 'center',
  paddingBlock: '1.5rem',
  paddingInline: '1rem',
  flexWrap: 'wrap',
  '.select': { flex: '1 1 200px' }
}))

// ==============================================================
// Props
interface VisitorTableActionsProps {
  handleChangeFilter: (key: string, value: string) => void
  filter: {
    search: string
    // status: string
    country: string
    region: string
    city: string
  }
}
// ==============================================================

export default function VisitorsTableActions({ handleChangeFilter, filter }: VisitorTableActionsProps) {
  const { t } = useTranslation()

  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [debouncedSearchCountry, setDebouncedSearchCountry] = useState('')
  const [debouncedSearchRegion, setDebouncedSearchRegion] = useState('')
  const [debouncedSearchCity, setDebouncedSearchCity] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      handleChangeFilter('search', debouncedSearch)
    }, 800)

    return () => clearTimeout(timer)
  }, [debouncedSearch])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleChangeFilter('country', debouncedSearchCountry)
    }, 800)

    return () => clearTimeout(timer)
  }, [debouncedSearchCountry])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleChangeFilter('region', debouncedSearchRegion)
    }, 800)

    return () => clearTimeout(timer)
  }, [debouncedSearchRegion])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleChangeFilter('city', debouncedSearchCity)
    }, 800)

    return () => clearTimeout(timer)
  }, [debouncedSearchCity])

  return (
    <Wrapper>

      <TextField
        fullWidth
        label={t('search_by_ip')}
        value={debouncedSearch}
        onChange={(e) => setDebouncedSearch(e.target.value)}
      />

      <TextField
        label={t('country')}
        value={filter.country}
        onChange={(e) => setDebouncedSearchCountry(e.target.value)}
      />

      <TextField
        label={t('region')}
        value={filter.region}
        onChange={(e) => setDebouncedSearchRegion(e.target.value)}
      />

      <TextField
        label={t('city')}
        value={filter.city}
        onChange={(e) => setDebouncedSearchCity(e.target.value)}
      />
      
    </Wrapper>
  )
}
