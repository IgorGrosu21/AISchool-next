'use client'

import { Button, Typography } from '@mui/material';
import { format, isSameMonth } from 'date-fns';
import { useMemo } from 'react';
import { ru } from 'date-fns/locale/ru';

interface MonthButtonProps {
  month: Date
  activeMonth: Date
  onClick: () => void
}

export function MonthButton({month, activeMonth, onClick}: MonthButtonProps) {
  const isActive = useMemo(() => isSameMonth(activeMonth, month), [activeMonth, month])

  const monthName = useMemo(() => {
    const name = format(month, 'LLLL', { locale: ru }) //somehow it returns lowercase
    return name.charAt(0).toUpperCase() + name.slice(1)
  }, [month])

  return <Button color={isActive ? 'secondary' : 'primary'} onClick={onClick}>
    <Typography variant='h5' sx={{textAlign: 'center'}}>{monthName}</Typography>
  </Button>
}