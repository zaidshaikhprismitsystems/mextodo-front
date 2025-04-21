import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import styled from '@mui/material/styles/styled'
import { useEffect, useState, useTransition } from 'react'
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
  filter: { search: string; orderStatus: string, paymentStatus: string }
  handleChangeFilter: (key: string, value: string) => void
}
// ==============================================================

export default function InvoiceTableActions({ handleChangeFilter, filter }: TableActionsProps) {

  const { t } = useTranslation();

  const ORDER_STATUS = [
    { id: 1, name: t("all"), value: '' },
    { id: 2, name: t("pending"), value: 'pending' },
    { id: 3, name: t("completed"), value: 'completed' },
    { id: 4, name: t("canceled"), value: 'canceled' },
    { id: 5, name: t("refunded"), value: 'refunded' },
    { id: 5, name: t("returned"), value: 'returned' },
    { id: 5, name: t("processing"), value: 'processing' },
    { id: 5, name: t("shipped"), value: 'shipped' },
    { id: 5, name: t("out_for_delivery"), value: 'out_for_delivery' },
    { id: 5, name: t("delivered"), value: 'delivered' },
    { id: 5, name: t("refund_requested"), value: 'refund_requested' },
    { id: 5, name: t("refunded"), value: 'refunded' }
  ]

  const PAYMENT_STATUS = [
    { id: 1, name: t("all"), value: '' },
    { id: 2, name: t("pending"), value: 'pending' },
    { id: 3, name: t("processing"), value: 'processing' },
    { id: 4, name: t("paid"), value: 'paid' },
    { id: 5, name: t("completed"), value: 'completed' },
    { id: 6, name: t("canceled"), value: 'failed' },
    { id: 7, name: t("partially_refunded"), value: 'partially_refunded' },
    { id: 8, name: t("refunded"), value: 'refunded' },
    { id: 9, name: t("disputed"), value: 'disputed' }
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
        label={t("order_status")}
        className="select"
        value={filter.orderStatus}
        onChange={(e) => handleChangeFilter('orderStatus', e.target.value)}
      >
        {ORDER_STATUS.map(({ id, name, value }) => (
          <MenuItem key={id} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        label={t("payment_status")}
        className="select"
        value={filter.paymentStatus}
        onChange={(e) => handleChangeFilter('paymentStatus', e.target.value)}
      >
        {PAYMENT_STATUS.map(({ id, name, value }) => (
          <MenuItem key={id} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={debouncedSearch}
        label={t("search_order_by_email")}
        onChange={(e) => setDebouncedSearch(e.target.value)}
      />
    </Wrapper>
  )
}
